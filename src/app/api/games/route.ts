import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { gameClient } from "@/lib/server/game/gameClient";
import { logger } from "@/lib/server/logger";

function readPositiveInt(value: string | null): number | null {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export async function GET(request: NextRequest) {
  const page = readPositiveInt(request.nextUrl.searchParams.get("page"));
  const pageSize = readPositiveInt(request.nextUrl.searchParams.get("pageSize"));

  if (page === null || pageSize === null) {
    logger.warn({ msg: "Invalid paging parameters", ctx: { url: request.url } });
    return NextResponse.json("page and pageSize must be positive integers", { status: 400 });
  }

  try {
    const response = await gameClient.getGamesPaged({ page, pageSize });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      logger.error({
        msg: "Backend rejected the paged games request",
        ctx: { page, pageSize, status: error.response.status },
        data: error.response.data,
      });
      return NextResponse.json(error.response.data ?? "Failed to load games", {
        status: error.response.status,
      });
    }

    if (error instanceof Error) {
      logger.error({ msg: "Backend is unreachable", ctx: { page, pageSize }, data: error });
    }
    return NextResponse.json("Server is currently unavailable", { status: 503 });
  }
}
