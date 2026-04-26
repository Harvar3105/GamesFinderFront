"use client";

import { useState } from "react";
import GamesTable from "@/components/GamesTable";
import { bffGamesFetcher } from "@/utils/fetch/bff/bffGamesFetcher";
import Game from "@/domain/entities/Game";
import GamesFiltersWidget from "./widgets/GamesFiltersWidget";
import TablePageSwitcher from "./widgets/TablePageSwitcher";
import { GamesFetchData } from "@/utils/fetch/gamesAndOffersFetcher";
import { GamesFiltersObject } from "@/domain/types/GamesFilters";

interface GamesPageContentProps {
  initialGames: Game[];
  initialCount: number;
}

export default function GamesPageContent({ initialGames, initialCount }: GamesPageContentProps) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalGames, setTotalGames] = useState(initialCount);
  const [activeFilters, setActiveFilters] = useState<GamesFiltersObject>({});

  // Get pagination info from API as request metadata
  const ITEMS_PER_PAGE = 25;
  const totalPages = Math.ceil(totalGames / ITEMS_PER_PAGE);

  const handleFiltersSubmit = async (filters: GamesFiltersObject) => {
    try {
      setLoading(true);
      setError(null);

      const fetchData: GamesFetchData | null = await bffGamesFetcher.getGamesPaged({
        page: 1,
        pageSize: ITEMS_PER_PAGE,
        filters: filters,
      });
      setGames(fetchData.games);
      setTotalGames(fetchData.totalGamesCount);
      setCurrentPage(1);
      setActiveFilters(filters);

      makeTransition();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to apply filters");
      console.error("Filters submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      const fetchData: GamesFetchData | null = await bffGamesFetcher.getGamesPaged({
        page: page,
        pageSize: ITEMS_PER_PAGE,
      });
      setGames(fetchData.games);
      setTotalGames(fetchData.totalGamesCount);
      setCurrentPage(page);

      makeTransition();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load games for this page");
      console.error("Page change error:", err);
    } finally {
      setLoading(false);
    }
  };

  const makeTransition = () => {
    const tableElement = document.querySelector("[data-table-root]");
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {error && (
        <div className="mx-8 mb-6 p-4 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded">
          Error loading games: {error}
        </div>
      )}

      {loading && (
        <div className="mx-8 mb-6 p-4 text-center text-gray-600 dark:text-gray-400">Loading...</div>
      )}

      {!loading && (
        <>
          <GamesFiltersWidget onFiltersSubmit={handleFiltersSubmit} />
          <GamesTable pageGames={games} />
          <TablePageSwitcher
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
}
