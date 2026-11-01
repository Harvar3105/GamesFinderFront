import "server-only";

import { config } from "@/lib/config";
import ApiClient from "../apiClient";
import type { GamesPagedRequest, GamesPagedResponse } from "@/lib/shared/contracts/game/gamesPaged";

// FIXME: [Stage3] Split the responsibilities of GameClient and BackendClient: both call the backend.
/** Backend games API. GET endpoints do not require a JWT. */
export class GameClient extends ApiClient {
  constructor(uri: string) {
    super(uri);
  }

  async getGamesPaged(params: GamesPagedRequest): Promise<GamesPagedResponse> {
    return this.get<GamesPagedResponse>(config.gamesPagedEndpoint, { params });
  }
}

const globalForClient = globalThis as unknown as {
  gameClient?: GameClient;
};

export const gameClient = globalForClient.gameClient ?? new GameClient(config.backendUrl);

globalForClient.gameClient = gameClient;
