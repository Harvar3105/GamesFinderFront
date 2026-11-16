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
  /** A game must have every listed genre. */
  genres?: string[];
}

/** Query of GET /api/games and of the backend Game/GetPagedWithLowestFiltered endpoint. */
export interface GamesFilteredRequest extends GamesFilter {
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
}

/** Response of GET /api/games and of the backend Game/GetPagedWithLowestFiltered endpoint. */
export interface GamesFilteredResponse {
  games: GameWithLowestPrice[];
  totalGamesCount: number;
}
