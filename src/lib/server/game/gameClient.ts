import "server-only";

import { isAxiosError } from "axios";
import type { Game } from "@/domain/entities/game";
import { config } from "@/lib/config";
import BackendClient from "@/lib/server/backendClient";
import type { BackendGameRequest, BackendGameResponse } from "@/lib/server/contracts/game/game";
import { logger } from "@/lib/server/logger";
import type {
  CatalogPageRequest,
  CatalogPageResponse,
} from "@/lib/shared/contracts/game/catalogPage";
import type { GameOffersRequest, GameOffersResponse } from "@/lib/shared/contracts/game/gameOffers";
import type { TagsResponse } from "@/lib/shared/contracts/game/tags";
import type { VendorsResponse } from "@/lib/shared/contracts/game/vendors";

/** Backend games and offers API. GET endpoints do not require a JWT. */
export class GameClient extends BackendClient {
  constructor(uri: string) {
    super(uri);
  }

  /** The backend answers 400 to invalid paging or price bounds. */
  async getCatalogPage(params: CatalogPageRequest): Promise<CatalogPageResponse> {
    try {
      return await this.get<CatalogPageResponse>(config.catalogPageEndpoint, { params });
    } catch (error) {
      // getCatalogPage answers 404 when no game matches. The log keeps a wrong endpoint path visible, since
      // it also ends up as an empty page.
      if (isAxiosError(error) && error.response?.status === 404) {
        logger.info({
          msg: "Backend catalog page answered 404, returning an empty page",
          ctx: { url: error.config?.url, params },
        });
        return { games: [], totalGamesCount: 0 };
      }
      throw error;
    }
  }

  /** The backend answers 400 to a malformed id and 404 to an unknown one. */
  async getGame(id: string): Promise<Game> {
    const params: BackendGameRequest = { gameId: id };
    const response = await this.get<BackendGameResponse>(config.gameEndpoint, { params });
    return response.game;
  }

  async getGameOffers(params: GameOffersRequest): Promise<GameOffersResponse> {
    return this.get<GameOffersResponse>(config.gameOffersEndpoint, { params });
  }

  async getVendors(): Promise<VendorsResponse> {
    return this.get<VendorsResponse>(config.vendorsEndpoint);
  }

  /** The backend caches the list, so a newly stored tag may appear with a delay. */
  async getTags(): Promise<TagsResponse> {
    return this.get<TagsResponse>(config.tagsEndpoint);
  }
}

export const gameClient = new GameClient(config.backendUrl);
