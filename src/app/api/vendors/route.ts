import { NextResponse } from "next/server";
import { toErrorResponse } from "@/lib/server/errors";
import { gameClient } from "@/lib/server/game/gameClient";

export async function GET() {
  try {
    const response = await gameClient.getVendors();
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
