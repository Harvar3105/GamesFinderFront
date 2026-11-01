import type RegistrationPayload from "@/lib/client/contracts/auth/registrationPayload";
import { config } from "@/lib/config";
import type { IdentityRegistrationRequest } from "@/lib/server/contracts/auth/registration";
import { logger } from "@/lib/server/logger";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body;
  try {
    body = (await request.json()) as RegistrationPayload;
  } catch (error) {
    if (error instanceof Error)
      logger.error({ msg: "Failed to parse incoming request data", data: error });
    return NextResponse.json("Failed to parse incoming request data", { status: 500 });
  }

  if (body.username.includes("@") || body.username.includes(".")) {
    logger.warn({ msg: "Invalid data provided", ctx: { username: body.username } });
    return NextResponse.json("Invalid data provided", { status: 400 });
  }

  const registration: IdentityRegistrationRequest = {
    username: body.username,
    email: body.email,
    password: body.password,
  };

  // FIXME: [Stage2] Use authClient.register, create a session from the returned tokens like login does
  // (respecting keepSignedIn), return the UserDTO the page expects, and map IdentityError[] to a message.
  const response = await fetch(`${config.identityUri}${config.userRegisterEndpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registration),
  });

  let data;
  try {
    data = await response.json();
  } catch (error) {
    if (error instanceof Error)
      logger.error({ msg: "Failed to parse incoming request data", data: error });
    return NextResponse.json("Failed to parse response data", { status: 500 });
  }

  return NextResponse.json(data, {
    status: response.status,
  });
}
