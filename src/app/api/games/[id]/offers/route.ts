import { NextRequest, NextResponse } from "next/server";
import { ECurrency } from "@/domain/entities/enums/ECurrency";
import { toErrorResponse } from "@/lib/server/errors";
import { gameClient } from "@/lib/server/game/gameClient";

function isCurrency(value: string): value is ECurrency {
  return (Object.values(ECurrency) as string[]).includes(value);
}

function readBoolean(value: string | null): boolean | undefined | null {
  if (value === null) return undefined;
  if (value === "true") return true;
  if (value === "false") return false;
  return null;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const searchParams = request.nextUrl.searchParams;
  const currency = searchParams.get("currency");
  const isAvailable = readBoolean(searchParams.get("isAvailable"));

  if (currency !== null && !isCurrency(currency)) {
    return NextResponse.json("Unknown currency", { status: 400 });
  }

  if (isAvailable === null) {
    return NextResponse.json("isAvailable must be true or false", { status: 400 });
  }

  try {
    const response = await gameClient.getGameOffers({
      gameId: id,
      currency: currency ?? undefined,
      isAvailable,
    });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
