import "server-only";

import { config } from "@/lib/config";
import ApiClient from "../apiClient";
import type { GamesPagedRequest, GamesPagedResponse } from "@/shared/contracts/game/gamesPaged";

/** Backend games API. GET endpoints do not require a JWT. */
export class GameClient extends ApiClient {
  constructor(uri: string) {
    super(uri);
  }

  async getGamesPaged(params: GamesPagedRequest): Promise<GamesPagedResponse> {
    return this.get<GamesPagedResponse>(config.getGamesPaged, { params });
  }
}

const globalForClient = globalThis as unknown as {
  gameClient?: GameClient;
};

export const gameClient = globalForClient.gameClient ?? new GameClient(config.backendUrl);

globalForClient.gameClient = gameClient;
