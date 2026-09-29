import { RegistrationPayload } from "@/domain/contracts/in/auth";
import { config } from "@/lib/config";
import { logger } from "@/lib/server/auth/logger";
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

  if (
    !body.roles.includes("user_gfp") ||
    body.username.includes("@") ||
    body.username.includes(".")
  ) {
    logger.warn({ msg: "Invalid data provided", data: body });
    return NextResponse.json("Invalid data provided", { status: 400 });
  }

  const response = await fetch(`${config.identityUri}${config.userRegisterEndpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
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
