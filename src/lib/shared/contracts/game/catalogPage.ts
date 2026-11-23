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

/** Query of GET /api/games and of the backend Game/getCatalogPage. */
export interface CatalogPageRequest extends GamesFilter {
  /** Case-insensitive part of the game name; omitted for the catalog start page. */
  name?: string;
  page: number;
  pageSize: number;
  /** Required: the backend compares and filters prices only among offers in this currency, without conversion. */
  currency: ECurrency;
}

export interface CatalogGame {
  /** Comes without offers. */
  game: Game;
  /** In the requested currency; null when the game has no priced offer in it. */
  lowestPrice: number | null;
  /** Vendors with an available offer for the game, regardless of the currency and vendor filter. */
  availableVendors: EVendor[];
}

/** Response of GET /api/games and of the backend Game/getCatalogPage. */
export interface CatalogPageResponse {
  games: CatalogGame[];
  totalGamesCount: number;
}
