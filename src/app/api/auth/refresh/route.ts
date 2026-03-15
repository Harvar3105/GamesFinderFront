import { NextRequest, NextResponse } from "next/server";
import { config } from "utils/config";
import handleHttpError from "utils/fetch/httpErrorHandle";

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }
    console.log(refreshToken);
    const response = await fetch(config.identityUrl + config.tokenRefreshEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshTokenHash: refreshToken,
      }),
    });

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
    return handleHttpError(error);
  }
}
