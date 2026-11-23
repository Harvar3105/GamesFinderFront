import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/config";
import { toErrorResponse } from "@/lib/server/errors";
import { gameClient } from "@/lib/server/game/gameClient";
import { logger } from "@/lib/server/logger";
import { readGamesFilter, validatePriceRange } from "@/lib/shared/gamesFilterParams";

function readPositiveInt(value: string | null): number | null {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const page = readPositiveInt(params.get("page"));
  const pageSize = readPositiveInt(params.get("pageSize"));

  if (page === null || pageSize === null) {
    logger.warn({ msg: "Invalid paging parameters", ctx: { url: request.url } });
    return NextResponse.json("page and pageSize must be positive integers", { status: 400 });
  }

  if (pageSize > config.maxPageSize) {
    logger.warn({
      msg: "Page size above the limit",
      ctx: { url: request.url, maxPageSize: config.maxPageSize },
    });
    return NextResponse.json(`pageSize must not exceed ${config.maxPageSize}`, { status: 400 });
  }

  const { currency, ...filter } = readGamesFilter(params);
  if (currency === undefined) {
    return NextResponse.json("currency is required", { status: 400 });
  }

  const priceRangeError = validatePriceRange(filter.min, filter.max);
  if (priceRangeError !== null) {
    return NextResponse.json(priceRangeError, { status: 400 });
  }

  try {
    const response = await gameClient.getCatalogPage({ page, pageSize, ...filter, currency });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
