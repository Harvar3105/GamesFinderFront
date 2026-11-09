import { NextRequest, NextResponse } from "next/server";
import { toErrorResponse } from "@/lib/server/errors";
import { gameClient } from "@/lib/server/game/gameClient";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const game = await gameClient.getGame(id);
    return NextResponse.json(game, { status: 200 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
