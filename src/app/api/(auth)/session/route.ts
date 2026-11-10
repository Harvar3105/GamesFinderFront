import { NextResponse } from "next/server";
import { toErrorResponse } from "@/lib/server/errors";
import {
  deleteSessionCookie,
  extendSession,
  getSessionStatus,
  readSessionId,
  SESSION_EXPIRED_MESSAGE,
  setSessionCookie,
} from "@/lib/server/session";

// proxy.ts skips this route: GET must not extend the session, and POST sets the cookie itself.

export async function GET() {
  const sessionId = await readSessionId();
  if (!sessionId) return sessionExpired();

  try {
    const status = await getSessionStatus(sessionId);
    if (status === null) return sessionExpired();

    return NextResponse.json(status);
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST() {
  const sessionId = await readSessionId();
  if (!sessionId) return sessionExpired();

  try {
    const keepSignedIn = await extendSession(sessionId);
    if (keepSignedIn === null) return sessionExpired();

    await setSessionCookie(sessionId, keepSignedIn);
    const status = await getSessionStatus(sessionId);
    if (status === null) return sessionExpired();

    return NextResponse.json(status);
  } catch (error) {
    return toErrorResponse(error);
  }
}

async function sessionExpired(): Promise<NextResponse> {
  await deleteSessionCookie();
  return NextResponse.json(SESSION_EXPIRED_MESSAGE, { status: 401 });
}
