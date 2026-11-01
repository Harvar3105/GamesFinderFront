import type { Game } from "@/domain/entities/game";

/** Query of GET /api/games and of the backend Game/getPaged endpoint. */
export interface GamesPagedRequest {
  page: number;
  pageSize: number;
}

/** Response of GET /api/games and of the backend Game/getPaged endpoint. Games come without offers. */
export interface GamesPagedResponse {
  games: Game[];
  totalGamesCount: number;
}
