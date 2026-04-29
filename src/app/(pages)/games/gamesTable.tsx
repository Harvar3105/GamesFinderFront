"use client";

import Image from "next/image";
import { EVendor } from "@/domain/enums/eVendor";
import Game from "@/domain/entities/game";
import GameOffer from "@/domain/entities/gameOffer";

interface GamesTableProps {
  pageGames: Game[];
}

export default function GamesTable({ pageGames }: GamesTableProps) {
  const getVendorOffers = (game: Game, vendor: EVendor): GameOffer[] => {
    return (game.offers ?? []).filter(
      (offer: GameOffer) => offer.vendor === vendor && offer.available,
    );
  };

  const formatOfferPrice = (offer: GameOffer): string => {
    if (offer.amount === undefined || offer.amount === null) return "N/A";
    return offer.currency ? `${offer.amount} ${offer.currency}` : `${offer.amount}`;
  };

  const getOfferPrice = (game: Game, vendor: EVendor): string => {
    const offers = getVendorOffers(game, vendor);
    if (offers.length === 0) return "N/A";

    const pricedOffers = offers.filter(
      (offer) => offer.amount !== undefined && offer.amount !== null,
    );
    if (pricedOffers.length === 0) return "N/A";

    const lowestOffer = pricedOffers.reduce((currentLowest, offer) =>
      (offer.amount ?? Number.POSITIVE_INFINITY) <
      (currentLowest.amount ?? Number.POSITIVE_INFINITY)
        ? offer
        : currentLowest,
    );

    return formatOfferPrice(lowestOffer);
  };

  const renderVendorOffersCell = (game: Game, vendor: EVendor) => {
    const offers = getVendorOffers(game, vendor);

    if (offers.length === 0) {
      return <span>N/A</span>;
    }

    return (
      <details className="group inline-block min-w-[160px] text-left">
        <summary className="list-none cursor-pointer text-right font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          <span>{getOfferPrice(game, vendor)}</span>
          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">({offers.length})</span>
        </summary>
        <div className="mt-2 rounded-md border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <ul className="space-y-2 text-sm">
            {offers.map((offer) => (
              <li key={offer.id} className="flex items-start justify-between gap-3">
                <a
                  href={offer.vendorsUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-0 truncate text-blue-600 hover:underline dark:text-blue-400"
                  title={offer.vendorsGameId}
                >
                  {/* //TODO: Update DB data via latest backend version. Then update game_offer.ts entity and use offer name here */}
                  {offer.vendorsUrl || "Offer"}
                </a>
                <span className="whitespace-nowrap text-gray-700 dark:text-gray-200">
                  {formatOfferPrice(offer)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </details>
    );
  };

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
                {renderVendorOffersCell(game, EVendor.Steam)}
              </td>
              <td className="text-gray-600 dark:text-gray-300 p-4 text-right font-medium whitespace-nowrap">
                {renderVendorOffersCell(game, EVendor.InstantGaming)}
              </td>
              <td className="text-gray-600 dark:text-gray-300 p-4 text-right font-medium whitespace-nowrap">
                {renderVendorOffersCell(game, EVendor.G2A)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
