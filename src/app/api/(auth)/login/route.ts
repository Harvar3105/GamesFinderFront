import { LoginPayload } from "@/shared/contracts/auth/auth";
import { LoginRequest, SessionTokens } from "@/shared/contracts/auth/auth";
import { User } from "@/domain/entities/user";
import { authClient } from "@/lib/server/auth/authClient";
import { logger } from "@/lib/server/auth/logger";
import { redis } from "@/lib/server/redisClient";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";

export async function POST(request: NextRequest) {
  let body;
  try {
    body = (await request.json()) as LoginPayload;
  } catch (error) {
    if (error instanceof Error)
      logger.error({ msg: "Failed to parse incoming request data", data: error });
    return NextResponse.json("Failed to parse incoming request data", { status: 500 });
  }

  if (!body.login) {
    logger.error({ msg: "No login were provided" });
    return NextResponse.json("No login were provided", { status: 400 });
  }

  const login: LoginRequest = {
    password: body.password,
  };
  if (body.login.includes("@")) login.email = body.login;
  else login.username = body.login;

  const response = await authClient.login(login);

  const clientUser: User = new User(
    response.user.id,
    response.user.createdAt,
    response.user.username,
    response.user.email,
    response.user.lastLogin,
    response.userRoles,
  );

  //TODO: add userDataClient

  const sessionId = randomBytes(32).toString("base64url");
  const sessionTokens: SessionTokens = {
    at: response.accessToken,
    rt: response.refreshToken,
  };

  (await cookies()).set("sessionId", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  try {
    await redis.set(sessionId, JSON.stringify(sessionTokens));
  } catch (error) {
    if (error instanceof Error) {
      logger.error({ msg: "Cannot connect to redis!", data: error });
    }
    return NextResponse.json("Server is currently unavailable", { status: 500 });
  }

  return NextResponse.json(clientUser, {
    status: 200,
  });
}
