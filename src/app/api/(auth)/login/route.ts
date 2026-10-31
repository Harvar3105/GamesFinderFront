import { LoginPayload } from "@/domain/contracts/in/auth";
import { LoginRequest } from "@/domain/contracts/out/auth";
import { User } from "@/domain/entities/user";
import { authClient } from "@/lib/server/auth/authClient";
import { logger } from "@/lib/server/auth/logger";
import { createSession, setSessionCookie } from "@/lib/server/session";
import { NextRequest, NextResponse } from "next/server";

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

  // FIXME: [Stage2] Handle Identity errors: 401 invalid credentials, 429 account lockout or rate limit,
  // 400 missing fields. Now any axios error becomes an unhandled 500.
  const response = await authClient.login(login);

  const clientUser: User = new User(
    response.user.id,
    response.user.createdAt,
    response.user.username,
    response.user.email,
    response.user.lastLogin,
    response.userRoles ?? [],
  );

  // FIXME: [Stage5] Load UserData from the backend (GET UserData/userData) with the new access token.

  let sessionId;
  try {
    sessionId = await createSession({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      user: clientUser,
      keepSignedIn: body.keepSignedIn,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error({ msg: "Cannot connect to redis!", data: error });
    }
    return NextResponse.json("Server is currently unavailable", { status: 500 });
  }

  // FIXME: [Stage2] Respect keepSignedIn: no maxAge (session cookie) when it is false.
  await setSessionCookie(sessionId);

  return NextResponse.json(clientUser, {
    status: 200,
  });
}
