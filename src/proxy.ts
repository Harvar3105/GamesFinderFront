import { NextResponse, type NextRequest } from "next/server";
import { logger } from "@/lib/server/logger";
import { extendSession, SESSION_COOKIE, sessionCookieOptions } from "@/lib/server/session";

// Sliding session expiration: every request extends the Redis record and the cookie by their full TTL.
export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const sessionId = request.cookies.get(SESSION_COOKIE)?.value;
  if (!sessionId) return response;

  try {
    const keepSignedIn = await extendSession(sessionId);

    if (keepSignedIn === null) response.cookies.delete(SESSION_COOKIE);
    else response.cookies.set(SESSION_COOKIE, sessionId, sessionCookieOptions(keepSignedIn));
  } catch (error) {
    logger.error({
      msg: "Cannot extend the session",
      data: error instanceof Error ? error : { error },
    });
  }

  return response;
}

export const config = {
  matcher: [
    // Static files are skipped. The auth routes set or delete the cookie themselves, and a second
    // Set-Cookie from here would conflict with theirs.
    "/((?!_next/static|_next/image|favicon.ico|pfp.jpg|api/login|api/registration|api/logout).*)",
  ],
};
