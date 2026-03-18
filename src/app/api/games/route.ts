import { NextRequest, NextResponse } from "next/server";
import { backendFetcher } from "utils/fetch/gamesAndOffersFetcher";
import handleHttpError from "utils/fetch/httpErrorHandle";

export async function POST(request: NextRequest) {
  try {
    const { page, pageSize, currency } = await request.json();

    const result = await backendFetcher.getGamesPaged(page, pageSize, currency);
    return NextResponse.json(result);
  } catch (error) {
    return handleHttpError(error);
  }
}
