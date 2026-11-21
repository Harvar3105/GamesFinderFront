import type { Game } from "@/domain/entities/game";
import type { ECurrency } from "@/domain/entities/enums/ECurrency";
import type { ESort } from "@/domain/entities/enums/ESort";
import type { EVendor } from "@/domain/entities/enums/EVendor";

/** The backend GamesFilter. Prices are compared with the lowest offer price in the requested currency. */
export interface GamesFilter {
  min?: number;
  max?: number;
  /** Only offers of this vendor count for the price filter, the price sort and the lowest price. */
  vendor?: EVendor;
  sort?: ESort;
  /** A game must have every listed tag. */
  tags?: string[];
}

/**
 * Query of GET /api/games. Without `name` it goes to the backend Game/GetPagedWithLowestFiltered, with it to
 * Game/getCatalogPage, which takes the same filter.
 */
export interface GamesFilteredRequest extends GamesFilter {
  /** Case-insensitive part of the game name. */
  name?: string;
  page: number;
  pageSize: number;
  /** The backend defaults to USD. */
  currency?: ECurrency;
}

export interface GameWithLowestPrice {
  /** Comes without offers. */
  game: Game;
  /** In the requested currency; null when the game has no priced offer in it. */
  lowestPrice: number | null;
  /**
   * Vendors with an available offer for the game, regardless of the currency and vendor filter. Null when the
   * backend endpoint does not return them.
   */
  // FIXME: [Stage3] Backend Game/GetPagedWithLowestFiltered does not return availableVendors, only
  // Game/getCatalogPage does, so they are null without a name.
  availableVendors: EVendor[] | null;
}

/** Response of GET /api/games and of the backend Game/GetPagedWithLowestFiltered and Game/getCatalogPage. */
export interface GamesFilteredResponse {
  games: GameWithLowestPrice[];
  totalGamesCount: number;
}
