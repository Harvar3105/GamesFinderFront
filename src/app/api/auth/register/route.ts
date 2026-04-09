import { NextRequest, NextResponse } from "next/server";
import handleHttpError from "utils/fetch/httpErrorHandle";
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
    return handleHttpError(error);
  }
}
