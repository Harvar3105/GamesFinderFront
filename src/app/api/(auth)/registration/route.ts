import { authClient } from "@/lib/server/auth/authClient";
import { parseRegistrationPayload } from "@/lib/server/auth/authPayloads";
import type { IdentityRegistrationRequest } from "@/lib/server/contracts/auth/registration";
import { toErrorResponse } from "@/lib/server/errors";
import { logger } from "@/lib/server/logger";
import { startSession } from "@/lib/server/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    logger.warn({ msg: "Registration request body is not JSON" });
    return NextResponse.json("Invalid request body.", { status: 400 });
  }

  const parsed = parseRegistrationPayload(body);
  if (!parsed.ok) {
    logger.warn({ msg: "Invalid registration data", ctx: { reason: parsed.message } });
    return NextResponse.json(parsed.message, { status: 400 });
  }
  const { username, email, password, keepSignedIn } = parsed.value;

  const registration: IdentityRegistrationRequest = { username, email, password };

  try {
    const response = await authClient.register(registration);
    const user = await startSession(response, keepSignedIn);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    // Identity reports password policy and duplicate username / email as IdentityError[].
    return toErrorResponse(error);
  }
}
