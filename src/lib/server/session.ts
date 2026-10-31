import "server-only";

import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { randomBytes, randomUUID } from "node:crypto";
import { setTimeout as sleep } from "node:timers/promises";
import type { Session } from "@/domain/contracts/out/auth";
import { authClient } from "@/lib/server/auth/authClient";
import { logger } from "@/lib/server/auth/logger";
import { BffError, SERVER_UNAVAILABLE_MESSAGE } from "@/lib/server/errors";
import { redis } from "@/lib/server/redisClient";

const SESSION_COOKIE = "sessionId";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const SESSION_EXPIRED_MESSAGE = "Your session has expired, please sign in again.";

const REFRESH_LOCK_MS = 10_000;
const REFRESH_WAIT_STEP_MS = 100;

const sessionKey = (sessionId: string) => `session:${sessionId}`;
const refreshLockKey = (sessionId: string) => `session-refresh-lock:${sessionId}`;

async function saveSession(sessionId: string, session: Session): Promise<void> {
  await redis.set(sessionKey(sessionId), JSON.stringify(session), SESSION_MAX_AGE_SECONDS);
}

export async function createSession(session: Session): Promise<string> {
  const sessionId = randomBytes(32).toString("base64url");
  await saveSession(sessionId, session);

  return sessionId;
}

export async function getSession(sessionId: string): Promise<Session | null> {
  const stored = await redis.get(sessionKey(sessionId));

  return stored === null ? null : (JSON.parse(stored) as Session);
}

export async function deleteSession(sessionId: string): Promise<void> {
  await redis.delete(sessionKey(sessionId));
}

export async function readSessionId(): Promise<string | undefined> {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}

export async function setSessionCookie(sessionId: string): Promise<void> {
  (await cookies()).set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function deleteSessionCookie(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}

// Refresh tokens are single-use, and presenting a revoked one makes Identity revoke every session of the
// user. So only the request holding the lock rotates the tokens; the others wait and reuse its result.
// Returns null when the session is gone or its refresh token is no longer valid.
export async function refreshSession(
  sessionId: string,
  staleAccessToken: string,
): Promise<Session | null> {
  const lockKey = refreshLockKey(sessionId);
  const lockOwner = randomUUID();
  const deadline = Date.now() + REFRESH_LOCK_MS;

  while (!(await redis.setIfAbsent(lockKey, lockOwner, REFRESH_LOCK_MS))) {
    if (Date.now() > deadline) throw new BffError(503, SERVER_UNAVAILABLE_MESSAGE);

    await sleep(REFRESH_WAIT_STEP_MS);
    const session = await getSession(sessionId);
    if (session === null || session.accessToken !== staleAccessToken) return session;
  }

  try {
    const session = await getSession(sessionId);
    if (session === null || session.accessToken !== staleAccessToken) return session;

    const tokens = await authClient.refresh({ refreshTokenHash: session.refreshToken });
    const refreshed: Session = {
      ...session,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
    await saveSession(sessionId, refreshed);

    return refreshed;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 400) {
      logger.warn({ msg: "Refresh token rejected, the session is closed", data: { status: 400 } });
      await deleteSession(sessionId);
      return null;
    }
    throw error;
  } finally {
    await redis.deleteIfEquals(lockKey, lockOwner);
  }
}

export async function withAccessToken<TResult>(
  sessionId: string,
  call: (accessToken: string) => Promise<TResult>,
): Promise<TResult> {
  const session = await getSession(sessionId);
  if (session === null) throw new BffError(401, SESSION_EXPIRED_MESSAGE);

  try {
    return await call(session.accessToken);
  } catch (error) {
    if (!isAxiosError(error) || error.response?.status !== 401) throw error;
  }

  const refreshed = await refreshSession(sessionId, session.accessToken);
  if (refreshed === null) throw new BffError(401, SESSION_EXPIRED_MESSAGE);

  return call(refreshed.accessToken);
}
