"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BffRoutes } from "@/config/bffRoutes";
import BFFFetch, { type FetchError } from "@/lib/client/fetch/bffFetch";
import { toQueryString } from "@/lib/toQueryString";
import type {
  CatalogPageRequest,
  CatalogPageResponse,
} from "@/lib/shared/contracts/game/catalogPage";
import type { GameOffersRequest, GameOffersResponse } from "@/lib/shared/contracts/game/gameOffers";
import type { TagsResponse } from "@/lib/shared/contracts/game/tags";
import type { VendorsResponse } from "@/lib/shared/contracts/game/vendors";

/** A page of games with their lowest prices (`GET /api/games`). Keeps the previous page while the next loads. */
export function useCatalogPage(request: CatalogPageRequest) {
  return useQuery<CatalogPageResponse, FetchError>({
    queryKey: ["games", request],
    queryFn: () =>
      BFFFetch<CatalogPageResponse>({
        uri: `${BffRoutes.games}?${toQueryString(request)}`,
        method: "GET",
      }),
    placeholderData: keepPreviousData,
  });
}

/** Offers of one game (`GET /api/games/<id>/offers`); unset filter fields do not filter. */
export function useGameOffers({ gameId, ...filter }: GameOffersRequest) {
  return useQuery<GameOffersResponse, FetchError>({
    queryKey: ["gameOffers", gameId, filter],
    queryFn: () =>
      BFFFetch<GameOffersResponse>({
        uri: `${BffRoutes.gameOffers(gameId)}?${toQueryString(filter)}`,
        method: "GET",
      }),
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

/** Tags of the stored games (`GET /api/tags`). The backend caches the list for an hour. */
export function useTags() {
  return useQuery<TagsResponse, FetchError>({
    queryKey: ["tags"],
    queryFn: () => BFFFetch<TagsResponse>({ uri: BffRoutes.tags, method: "GET" }),
    staleTime: 60 * 60 * 1000,
  });
}
