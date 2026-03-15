import { NextResponse } from "next/server";
import { HttpError } from "./httpError";

export default function handleHttpError(error: unknown) {
  if (error instanceof HttpError) {
    return NextResponse.json({ error: error.message, body: error.body }, { status: error.status });
  }
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
