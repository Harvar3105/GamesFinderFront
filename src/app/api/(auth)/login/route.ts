import { authClient } from "@/lib/server/auth/authClient";
import { parseLoginPayload } from "@/lib/server/auth/authPayloads";
import type { IdentityLoginRequest } from "@/lib/server/contracts/auth/login";
import { toErrorResponse } from "@/lib/server/errors";
import { logger } from "@/lib/server/logger";
import { startSession } from "@/lib/server/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    logger.warn({ msg: "Login request body is not JSON" });
    return NextResponse.json("Invalid request body.", { status: 400 });
  }

  const parsed = parseLoginPayload(body);
  if (!parsed.ok) {
    logger.warn({ msg: "Invalid login data", ctx: { reason: parsed.message } });
    return NextResponse.json(parsed.message, { status: 400 });
  }
  const { login, password, keepSignedIn } = parsed.value;

  const identityLogin: IdentityLoginRequest = login.includes("@")
    ? { email: login, password }
    : { username: login, password };

  try {
    const response = await authClient.login(identityLogin);

    // FIXME: [Stage5] Load UserData from the backend (GET UserData/userData) with the new access token.

    const user = await startSession(response, keepSignedIn);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    // Identity explains the failure itself: 401 "Invalid credentials", 429 lockout, 400 missing fields.
    return toErrorResponse(error);
  }
}
