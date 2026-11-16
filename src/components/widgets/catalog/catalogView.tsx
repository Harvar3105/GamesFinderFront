"use client";

import { usePathname, useRouter } from "next/navigation";
import { useGamesFiltered, useVendors } from "@/components/hooks/useGames";
import { Chip, PageHeading, Panel } from "@/components/ui";
import CatalogFilters from "@/components/widgets/catalog/catalogFilters";
import CatalogTable from "@/components/widgets/catalog/catalogTable";
import Pagination from "@/components/widgets/pagination";
import RequestErrorAlert from "@/components/widgets/requestErrorAlert";
import { DEFAULT_CURRENCY } from "@/config/catalog";
import type { GamesFilterWithCurrency } from "@/lib/shared/gamesFilterParams";
import { toQueryString } from "@/lib/toQueryString";

interface CatalogViewProps {
  page: number;
  pageSize: number;
  /** The filter from the page URL. */
  filter: GamesFilterWithCurrency;
  tags: string[];
  genres: string[];
}

export default function CatalogView({ page, pageSize, filter, tags, genres }: CatalogViewProps) {
  const router = useRouter();
  const pathname = usePathname();

  const currency = filter.currency ?? DEFAULT_CURRENCY;
  const query = useGamesFiltered({ page, pageSize, ...filter, currency });
  const vendorsQuery = useVendors();

  const totalItems = query.data?.totalGamesCount ?? 0;
  const items = query.data?.games ?? [];

  // The filter lives in the URL, so pagination links and the browser history keep it. A new filter starts
  // from the first page.
  const applyFilter = (next: GamesFilterWithCurrency) =>
    router.push(`${pathname}?${toQueryString({ ...next, perPage: pageSize })}`);

  return (
    <>
      <PageHeading
        title="Catalog"
        spread
        aside={<Chip>{query.isPending ? "Loading…" : `${totalItems} products found`}</Chip>}
      />

      <Panel as="section" aria-label="Filters and sorting">
        <CatalogFilters
          key={toQueryString(filter).toString()}
          filter={filter}
          vendors={vendorsQuery.data?.vendors ?? []}
          tags={tags}
          genres={genres}
          onApply={applyFilter}
        />
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
        ) : items.length === 0 ? (
          <p className="p-related-lg">No products found.</p>
        ) : (
          <CatalogTable items={items} currency={currency} />
        )}
      </Panel>

      <Pagination page={page} pageSize={pageSize} totalItems={totalItems} />
    </>
  );
}
