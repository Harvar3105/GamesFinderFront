"use client";

import React, { useState, useEffect } from "react";
import GamesTable from "@/components/GamesTable";
import Game from "@/domain/entities/Game";
import { bffGamesFetcher } from "@/utils/fetch/bff/bffGamesFetcher";

export default function GamesPageClient() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);

        const games = await bffGamesFetcher.getGamesPaged(1, 25);

        setGames(Array.isArray(games) ? games : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading games");
        console.error("Client Games fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="min-h-screen py-8 md:py-12">
      <h1 className="px-8 md:px-8 mb-8 md:mb-8 text-4xl md:text-2xl font-bold text-gray-900 dark:text-white">
        Games List
      </h1>

      {loading && (
        <div className="px-8 py-4 text-center text-gray-600 dark:text-gray-400">Загрузка...</div>
      )}

      {error && (
        <div className="px-8 py-4 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded">
          Error loading games: {error}
        </div>
      )}

      {!loading && !error && <GamesTable games={games} />}
    </div>
  );
}
