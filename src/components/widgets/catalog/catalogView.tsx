"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Chip, PageHeading, Panel } from "@/components/ui";
import CatalogFilters from "@/components/widgets/catalog/catalogFilters";
import CatalogTable from "@/components/widgets/catalog/catalogTable";
import Pagination from "@/components/widgets/pagination";
import RequestErrorAlert from "@/components/widgets/requestErrorAlert";
import { EVendor } from "@/domain/entities/enums/EVendor";
import BFFFetch, { type FetchError } from "@/lib/client/fetch/bffFetch";
import { toQueryString } from "@/lib/toQueryString";
import type { GamesPagedResponse } from "@/shared/contracts/game/gamesPaged";

interface CatalogViewProps {
  page: number;
  pageSize: number;
  tags: string[];
  genres: string[];
}

export default function CatalogView({ page, pageSize, tags, genres }: CatalogViewProps) {
  const query = useQuery<GamesPagedResponse, FetchError>({
    queryKey: ["games", page, pageSize],
    queryFn: () =>
      BFFFetch<GamesPagedResponse>({
        uri: `/api/games?${toQueryString({ page, pageSize })}`,
        method: "GET",
      }),
    placeholderData: keepPreviousData,
  });

  const totalItems = query.data?.totalGamesCount ?? 0;
  const games = query.data?.games ?? [];

  return (
    <>
      <PageHeading
        title="Catalog"
        spread
        aside={<Chip>{query.isPending ? "Loading…" : `${totalItems} products found`}</Chip>}
      />

      <Panel as="section" aria-label="Filters and sorting">
        <CatalogFilters sources={Object.values(EVendor)} tags={tags} genres={genres} />
      </Panel>

      {query.isError && (
        <RequestErrorAlert
          error={query.error}
          failureTitle="Failed to load the catalog"
          serverErrorText="The catalog is currently unavailable. Please try again later."
        />
      )}

      <Panel
        as="section"
        padding="none"
        aria-label="Product list"
        aria-busy={query.isFetching}
        className={query.isPlaceholderData ? "opacity-60" : undefined}
      >
        {query.isPending ? (
          <p className="p-related-lg">Loading…</p>
        ) : games.length === 0 ? (
          <p className="p-related-lg">No products found.</p>
        ) : (
          <CatalogTable games={games} />
        )}
      </Panel>

      <Pagination page={page} pageSize={pageSize} totalItems={totalItems} />
    </>
  );
}
