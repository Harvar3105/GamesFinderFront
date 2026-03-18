"use client";

import React, { useState } from "react";
import GamesTable from "@/components/GamesTable";
import Game from "@/domain/entities/Game";
import { bffGamesFetcher } from "@/utils/fetch/bff/bffGamesFetcher";

interface GamesPageContentProps {
  initialGames: Game[];
}

export default function GamesPageContent({ initialGames }: GamesPageContentProps) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Get pagination info from API as request metadata
  const ITEMS_PER_PAGE = 25;
  const totalPages = Math.ceil(games.length / ITEMS_PER_PAGE);

  const handlePageChange = async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      const newGames = await bffGamesFetcher.getGamesPaged(page, ITEMS_PER_PAGE);
      setGames(newGames);
      setCurrentPage(page);

      const tableElement = document.querySelector("[data-table-root]");
      if (tableElement) {
        tableElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load games for this page");
      console.error("Page change error:", err);
    } finally {
      setLoading(false);
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
        <GamesTable
          games={games}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
}
