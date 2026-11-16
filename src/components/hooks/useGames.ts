"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BffRoutes } from "@/config/bffRoutes";
import BFFFetch, { type FetchError } from "@/lib/client/fetch/bffFetch";
import { toQueryString } from "@/lib/toQueryString";
import type {
  GamesFilteredRequest,
  GamesFilteredResponse,
} from "@/lib/shared/contracts/game/gamesFiltered";
import type { VendorsResponse } from "@/lib/shared/contracts/game/vendors";

/** A page of games with their lowest prices (`GET /api/games`). Keeps the previous page while the next loads. */
export function useGamesFiltered(request: GamesFilteredRequest) {
  return useQuery<GamesFilteredResponse, FetchError>({
    queryKey: ["games", request],
    queryFn: () =>
      BFFFetch<GamesFilteredResponse>({
        uri: `${BffRoutes.games}?${toQueryString(request)}`,
        method: "GET",
      }),
    placeholderData: keepPreviousData,
  });
}

/** Offer vendors (`GET /api/vendors`). The list changes only with a backend release. */
export function useVendors() {
  return useQuery<VendorsResponse, FetchError>({
    queryKey: ["vendors"],
    queryFn: () => BFFFetch<VendorsResponse>({ uri: BffRoutes.vendors, method: "GET" }),
    staleTime: Infinity,
  });
}
