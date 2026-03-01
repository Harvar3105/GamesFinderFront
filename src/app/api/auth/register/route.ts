import { NextRequest, NextResponse } from "next/server";
import { HttpError } from "utils/fetch/httpError";
import { userFetcher } from "utils/fetch/userFetcher";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const response = await userFetcher.register({
      username: username,
      email: email,
      password: password,
    });
    return NextResponse.json(response);
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
