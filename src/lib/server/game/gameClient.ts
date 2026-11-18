import "server-only";

import { isAxiosError } from "axios";
import type { Game } from "@/domain/entities/game";
import { config } from "@/lib/config";
import BackendClient from "@/lib/server/backendClient";
import type {
  GamesFilteredRequest,
  GamesFilteredResponse,
} from "@/lib/shared/contracts/game/gamesFiltered";
import type { TagsResponse } from "@/lib/shared/contracts/game/tags";
import type { VendorsResponse } from "@/lib/shared/contracts/game/vendors";

/** Backend games and offers API. GET endpoints do not require a JWT. */
export class GameClient extends BackendClient {
  constructor(uri: string) {
    super(uri);
  }

  /** The backend answers 400 to invalid paging or price bounds. */
  async getGamesFiltered({
    name,
    ...params
  }: GamesFilteredRequest): Promise<GamesFilteredResponse> {
    if (!name) {
      return this.get<GamesFilteredResponse>(config.gamesFilteredPagedEndpoint, { params });
    }

    try {
      return await this.get<GamesFilteredResponse>(config.catalogPageEndpoint, {
        params: { ...params, name },
      });
    } catch (error) {
      // getCatalogPage answers 404 when no game matches, GetPagedWithLowestFiltered an empty page.
      if (isAxiosError(error) && error.response?.status === 404) {
        return { games: [], totalGamesCount: 0 };
      }
      throw error;
    }
  }

  /** The backend answers 400 to a malformed id and 404 to an unknown one. */
  async getGame(id: string): Promise<Game> {
    return this.get<Game>(config.gameEndpoint, { params: { id } });
  }

  async getVendors(): Promise<VendorsResponse> {
    return this.get<VendorsResponse>(config.vendorsEndpoint);
  }

  /** The backend caches the list, so a newly stored tag may appear with a delay. */
  async getTags(): Promise<TagsResponse> {
    return this.get<TagsResponse>(config.tagsEndpoint);
  }
}

const globalForClient = globalThis as unknown as {
  gameClient?: GameClient;
};

export const gameClient = globalForClient.gameClient ?? new GameClient(config.backendUrl);

globalForClient.gameClient = gameClient;
