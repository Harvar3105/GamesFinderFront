import "server-only";

import { NextResponse } from "next/server";
import { toErrorResponse } from "@/lib/server/errors";
import { logger } from "@/lib/server/logger";
import { deleteSessionCookie, endSession, readSessionId } from "@/lib/server/session";

export async function signOut(everywhere: boolean): Promise<NextResponse> {
  const sessionId = await readSessionId();
  await deleteSessionCookie();

  if (!sessionId) {
    logger.warn({ msg: "Cannot log out, no sessionId found" });
    return NextResponse.json("User not logged in", { status: 400 });
  }

  try {
    await endSession(sessionId, everywhere);
  } catch (error) {
    return toErrorResponse(error);
  }

  return NextResponse.json({ success: true });
}
