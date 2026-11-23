import type { Game } from "@/domain/entities/game";

export interface BackendGameRequest {
  gameId: string;
}

/** Response of the backend Game/getGame; the BFF answers with the game itself. */
export interface BackendGameResponse {
  readonly game: Game;
}
