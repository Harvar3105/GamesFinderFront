import type { Game } from "@/domain/entities/game";

/** Query parameters of the backend paged games endpoint. */
export interface GamesPagedRequest {
  page: number;
  pageSize: number;
}

/** `offers` may be missing on the games. */
export interface GamesPagedResponse {
  games: Game[];
  totalGamesCount: number;
}
