import GamesPageContent from "@/components/GamesPageContent";
import { backendFetcher, GamesFetchData } from "@/utils/fetch/gamesAndOffersFetcher";

// Server component for SEO and initial data fetching
export default async function GamesPage() {
  let initialData: GamesFetchData = { games: [], totalGamesCount: 0 };
  let error: string | null = null;

  try {
    initialData = (await backendFetcher.getGamesPaged({ page: 1, pageSize: 25 })) ?? {
      games: [],
      totalGamesCount: 0,
    };
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load games";
    console.error("Server Games fetcher error:", err);
  }

  if (error && initialData.games.length === 0) {
    return (
      <div className="min-h-screen py-8 md:py-12">
        <h1 className="px-8 md:px-8 mb-8 md:mb-8 text-4xl md:text-2xl font-bold text-gray-900 dark:text-white">
          Games List
        </h1>
        <div className="px-8 py-4 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded">
          Error loading games: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <h1 className="px-8 md:px-8 mb-8 md:mb-8 text-4xl md:text-2xl font-bold text-gray-900 dark:text-white">
        Games List
      </h1>
      <GamesPageContent
        initialGames={initialData.games}
        initialCount={initialData.totalGamesCount}
      />
    </div>
  );
}
