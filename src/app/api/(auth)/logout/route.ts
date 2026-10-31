import { logger } from "@/lib/server/auth/logger";
import { deleteSession, deleteSessionCookie, readSessionId } from "@/lib/server/session";
import { NextResponse } from "next/server";

export async function POST() {
  const sessionId = await readSessionId();

  if (!sessionId) {
    logger.error({ msg: "Cannot login, no sessionId found!" });
    return NextResponse.json("User not logged in", { status: 400 });
  }

  // TODO: [Stage2] Identity has no logout/revoke endpoint yet, so the refresh token stays active until it expires.
  await deleteSession(sessionId);
  await deleteSessionCookie();

  return NextResponse.json({ success: true });
}
