import { NextRequest, NextResponse } from "next/server";
import handleHttpError from "utils/fetch/httpErrorHandle";
import { userFetcher } from "utils/fetch/userFetcher";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      username,
      email,
      password,
      accessToken,
      useRefresh,
    }: {
      username: string;
      email?: string;
      password: string;
      accessToken: string;
      useRefresh: boolean;
    } = body;

    if ((username || email) && !password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }
    let refreshTokenHash = undefined;
    if (useRefresh) {
      refreshTokenHash = request.cookies.get("refreshToken")?.value;
    }

    const response = await userFetcher.login({
      username: username,
      email: email,
      password: password,
      accessToken: accessToken,
      refreshTokenHash: refreshTokenHash,
    });

    const nextResponse = NextResponse.json({
      user: response.user,
      accessToken: response.accessToken,
    });

    if (response.refreshToken) {
      nextResponse.cookies.set("refreshToken", response.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });
    }
    return nextResponse;
  } catch (error) {
    return handleHttpError(error);
  }
}
