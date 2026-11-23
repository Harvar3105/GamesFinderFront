"use client";

import { useCatalogPage } from "@/components/hooks/useGames";
import GameCard from "@/components/widgets/gameCard";
import RequestErrorAlert from "@/components/widgets/requestErrorAlert";
import { DEFAULT_CURRENCY, RECENT_GAMES_COUNT } from "@/config/catalog";
import { ESort } from "@/domain/entities/enums/ESort";

export default function RecentGames() {
  const query = useCatalogPage({
    page: 1,
    pageSize: RECENT_GAMES_COUNT,
    sort: ESort.NEWEST_UPDATED,
    currency: DEFAULT_CURRENCY,
  });

  if (query.isPending) return <p aria-busy>Loading…</p>;

  if (query.isError) {
    return (
      <RequestErrorAlert
        error={query.error}
        failureTitle="Failed to load recently updated products"
        serverErrorText="Products are currently unavailable. Please try again later."
      />
    );
  }

  if (query.data.games.length === 0) return <p>No products yet.</p>;

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-related-lg">
      {query.data.games.map((item) => (
        <GameCard key={item.game.id} item={item} currency={DEFAULT_CURRENCY} />
      ))}
    </div>
  );
}
