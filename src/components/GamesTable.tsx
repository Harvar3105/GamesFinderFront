"use client";

import Image from "next/image";
import { EVendor } from "@/domain/enums/EVendor";
import Game from "@/domain/entities/Game";
import GameOffer from "@/domain/entities/GameOffer";

interface GamesTableProps {
  pageGames: Game[];
}

export default function GamesTable({ pageGames }: GamesTableProps) {
  const getOfferPrice = (game: Game, vendor: EVendor): string => {
    const offer = game.offers?.find((o: GameOffer) => o.vendor === vendor);
    if (!offer || !offer.available) return "N/A";
    return offer.amount ? `${offer.amount}` : "N/A";
  };

  console.log("Game with offer:", pageGames.find((g) => g.offers?.length > 0) ?? "Not found");
  console.log("Game example:", pageGames[0] ?? "No games");

  return (
    <div className="w-full overflow-x-auto p-4" data-table-root>
      <table className="w-full border-collapse bg-white dark:bg-gray-900 shadow-sm rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
            <th className="p-4 text-left font-semibold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-700 whitespace-nowrap">
              Image
            </th>
            <th className="p-4 text-left font-semibold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-700 whitespace-nowrap">
              Name
            </th>
            <th className="p-4 text-left font-semibold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-700 whitespace-nowrap">
              Description
            </th>
            <th className="p-4 text-left font-semibold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-700 whitespace-nowrap">
              Initial price
            </th>
            <th className="p-4 text-left font-semibold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-700 whitespace-nowrap">
              {EVendor.Steam}
            </th>
            <th className="p-4 text-left font-semibold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-700 whitespace-nowrap">
              {EVendor.InstantGaming}
            </th>
            <th className="p-4 text-left font-semibold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-700 whitespace-nowrap">
              {EVendor.G2A}
            </th>
          </tr>
        </thead>
        <tbody>
          {pageGames.map((game: Game) => (
            <tr
              key={game.id}
              className="border-b border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td className="p-3 text-center">
                {game.headerImage ? (
                  <a
                    href={game.steamURL || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block transition-transform hover:scale-160"
                    title={`Open ${game.name} on Steam`}
                  >
                    <Image
                      src={game.headerImage}
                      alt={game.name}
                      width={80}
                      height={45}
                      className="rounded object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder-game.png";
                      }}
                    />
                  </a>
                ) : (
                  <div className="w-20 h-11 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-500 dark:text-gray-400 text-center">
                    No image
                  </div>
                )}
              </td>
              <td className="p-4 max-w-xs">
                <a
                  href={game.steamURL || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 no-underline font-medium transition-colors hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
                >
                  {game.name}
                </a>
              </td>
              <td className="p-4 max-w-sm">
                <div className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                  {game.description || "No description"}
                </div>
              </td>
              <td className="text-gray-600 dark:text-gray-300 p-4 text-right font-medium whitespace-nowrap">
                {game.initialPrice !== undefined && game.initialPrice !== null
                  ? `${game.initialPrice}`
                  : "N/A"}
              </td>
              <td className="text-gray-600 dark:text-gray-300 p-4 text-right font-medium whitespace-nowrap">
                {getOfferPrice(game, EVendor.Steam)}
              </td>
              <td className="text-gray-600 dark:text-gray-300 p-4 text-right font-medium whitespace-nowrap">
                {getOfferPrice(game, EVendor.InstantGaming)}
              </td>
              <td className="text-gray-600 dark:text-gray-300 p-4 text-right font-medium whitespace-nowrap">
                {getOfferPrice(game, EVendor.G2A)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
