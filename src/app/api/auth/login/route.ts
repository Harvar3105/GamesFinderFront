import { NextRequest, NextResponse } from "next/server";
import { HttpError } from "utils/fetch/httpError";
import { userFetcher } from "utils/fetch/userFetcher";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password }: { username: string; email?: string; password: string } =
      body;

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    if (!username && !email) {
      return NextResponse.json({ error: "Username or email is required" }, { status: 400 });
    }

    const response = await userFetcher.login({
      username: username,
      email: email,
      password: password,
    });

    const nextResponse = NextResponse.json({
      user: response.user,
      accessToken: response.accessToken,
    });

    nextResponse.cookies.set("refreshToken", response.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 Days
      path: "/",
    });
    return nextResponse;
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { error: error.message, body: error.body },
        { status: error.status },
      );
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
