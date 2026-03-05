import { NextRequest, NextResponse } from "next/server";
import { HttpError } from "utils/fetch/httpError";
import { config } from "utils/config";

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    const response = await fetch(config.identityUrl + config.tokenRefreshEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    });
    console.log(response);
    console.log(config.identityUrl + config.tokenRefreshEndpoint);
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to refresh token" }, { status: response.status });
    }

    const data = await response.json();

    const nextResponse = NextResponse.json({
      accessToken: data.jwt || data.accessToken,
      user: data.user || null,
    });

    if (data.refreshToken) {
      nextResponse.cookies.set("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });
    }

    return nextResponse;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
