import "server-only";

import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { randomBytes, randomUUID } from "node:crypto";
import { setTimeout as sleep } from "node:timers/promises";
import { User, type UserDTO } from "@/domain/entities/user";
import type SessionStatus from "@/lib/client/contracts/auth/sessionStatus";
import { config } from "@/lib/config";
import { authClient } from "@/lib/server/auth/authClient";
import type { IdentityAuthResponse, IdentityUser } from "@/lib/server/contracts/auth/login";
import { BffError, SERVER_UNAVAILABLE_MESSAGE } from "@/lib/server/errors";
import { logger } from "@/lib/server/logger";
import { redis } from "@/lib/server/redisClient";

export interface Session {
  accessToken: string;
  refreshToken: string;
  keepSignedIn: boolean;
}

export const SESSION_COOKIE = "sessionId";
export const SESSION_EXPIRED_MESSAGE = "Your session has expired, please sign in again.";

const REFRESH_LOCK_MS = 10_000;
const REFRESH_WAIT_STEP_MS = 100;

const sessionKey = (sessionId: string) => `session:${sessionId}`;
const refreshLockKey = (sessionId: string) => `session-refresh-lock:${sessionId}`;

const ttlSeconds = (keepSignedIn: boolean) =>
  keepSignedIn ? config.sessionPersistentTtlSeconds : config.sessionShortTtlSeconds;

const sessionTtlSeconds = (session: Session) => ttlSeconds(session.keepSignedIn);

async function saveSession(sessionId: string, session: Session): Promise<void> {
  await redis.set(sessionKey(sessionId), JSON.stringify(session), sessionTtlSeconds(session));
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

/**
 * Sliding expiration, called by proxy.ts on every request: extends the Redis record by its full TTL.
 * Returns the session's keepSignedIn for the cookie, or null when the session no longer exists.
 */
export async function extendSession(sessionId: string): Promise<boolean | null> {
  const session = await getSession(sessionId);
  if (session === null) return null;

  await redis.expire(sessionKey(sessionId), sessionTtlSeconds(session));

  return session.keepSignedIn;
}

/** Reads the remaining lifetime without extending it. Returns null when the session no longer exists. */
export async function getSessionStatus(sessionId: string): Promise<SessionStatus | null> {
  const session = await getSession(sessionId);
  if (session === null) return null;

  const expiresInSeconds = await redis.ttl(sessionKey(sessionId));
  if (expiresInSeconds < 0) return null;

  return {
    keepSignedIn: session.keepSignedIn,
    expiresInSeconds,
    warnBeforeExpirySeconds: config.sessionShortTtlSeconds - config.sessionShortNotifyTtlSeconds,
  };
}

function toUser({ user, roles }: { user: IdentityUser; roles: string[] }): UserDTO {
  return new User(user.id, user.createdAt, user.username, user.email, user.lastLogin, roles);
}

export async function fetchCurrentUser(): Promise<UserDTO | null> {
  const sessionId = await readSessionId();
  if (!sessionId) return null;

  try {
    // Only the access token is sent: with a refresh token Identity would rotate the tokens itself,
    // bypassing the refresh lock.
    const restored = await withAccessToken(sessionId, (accessToken) =>
      authClient.session({ accessToken }),
    );
    return toUser(restored);
  } catch (error) {
    if (error instanceof BffError && error.status === 401) return null;

    logger.error({
      msg: "Cannot restore the user from the session",
      data: isAxiosError(error)
        ? { status: error.response?.status, code: error.code }
        : error instanceof Error
          ? error
          : { error },
    });
    return null;
  }
}

export async function deleteSession(sessionId: string): Promise<void> {
  await redis.delete(sessionKey(sessionId));
}

export async function readSessionId(): Promise<string | undefined> {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}

// The cookie lives as long as the Redis record, and proxy.ts extends both on every request.
export function sessionCookieOptions(keepSignedIn: boolean) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ttlSeconds(keepSignedIn),
  } as const;
}

export async function setSessionCookie(sessionId: string, keepSignedIn: boolean): Promise<void> {
  (await cookies()).set(SESSION_COOKIE, sessionId, sessionCookieOptions(keepSignedIn));
}

export async function deleteSessionCookie(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function startSession(
  auth: IdentityAuthResponse,
  keepSignedIn: boolean,
): Promise<UserDTO> {
  const sessionId = await createSession({
    accessToken: auth.accessToken,
    refreshToken: auth.refreshToken,
    keepSignedIn,
  });
  await setSessionCookie(sessionId, keepSignedIn);

  return toUser(auth);
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

    const tokens = await authClient.refresh({ refreshToken: session.refreshToken });
    const refreshed: Session = {
      ...session,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
    await saveSession(sessionId, refreshed);

    return refreshed;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      logger.warn({ msg: "Refresh token rejected, the session is closed", data: { status: 401 } });
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
  return withSession(sessionId, (session) => call(session.accessToken));
}

// Like withAccessToken, for calls that also need the refresh token: after a refresh the call gets the
// rotated tokens.
async function withSession<TResult>(
  sessionId: string,
  call: (session: Session) => Promise<TResult>,
): Promise<TResult> {
  const session = await getSession(sessionId);
  if (session === null) throw new BffError(401, SESSION_EXPIRED_MESSAGE);

  try {
    return await call(session);
  } catch (error) {
    if (!isAxiosError(error) || error.response?.status !== 401) throw error;
  }

  const refreshed = await refreshSession(sessionId, session.accessToken);
  if (refreshed === null) throw new BffError(401, SESSION_EXPIRED_MESSAGE);

  return call(refreshed);
}

export async function endSession(sessionId: string, everywhere: boolean): Promise<void> {
  try {
    await withSession(sessionId, (session) =>
      everywhere
        ? authClient.logoutAll(session.accessToken)
        : authClient.logout(session.accessToken, { refreshToken: session.refreshToken }),
    );
  } catch (error) {
    logger.warn({
      msg: "Cannot revoke the session tokens in Identity",
      data: isAxiosError(error)
        ? { status: error.response?.status, code: error.code }
        : error instanceof Error
          ? error
          : { error },
    });
  }

  await deleteSession(sessionId);
}
