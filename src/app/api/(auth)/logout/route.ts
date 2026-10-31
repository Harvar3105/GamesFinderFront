import { logger } from "@/lib/server/auth/logger";
import { redis } from "@/lib/server/redisClient";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    logger.error({ msg: "Cannot login, no sessionId found!" });
    return NextResponse.json("User not logged in", { status: 400 });
  }

  // TODO: [Stage2] Identity has no logout/revoke endpoint yet, so the refresh token stays active until it expires.
  await redis.delete(sessionId);
  cookieStore.delete("sessionId");

  return NextResponse.json({ success: true });
}
