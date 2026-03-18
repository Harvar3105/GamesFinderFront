import GamesPageContent from "@/components/GamesPageContent";
import Game from "@/domain/entities/Game";
import { backendFetcher } from "@/utils/fetch/gamesAndOffersFetcher";

// Server component for SEO and initial data fetching
export default async function GamesPage() {
  let initialGames: Game[] = [];
  let error: string | null = null;

  try {
    initialGames = (await backendFetcher.getGamesPaged(1, 25)) ?? [];
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load games";
    console.error("Server Games fetcher error:", err);
  }

  if (error && initialGames.length === 0) {
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
      <GamesPageContent initialGames={initialGames} />
    </div>
  );
}
