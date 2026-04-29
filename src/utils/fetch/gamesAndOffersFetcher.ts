import { config, Config } from "../config";
import { HttpClient } from "./httpClient";
import Game from "@/domain/entities/game";
import { GetGamesPagedParams } from "./contracts/gnoContracts";
import { toQueryString } from "../toQueryString";

class GamesAndOffersFetcher extends HttpClient {
  private readonly config: Config;

  constructor(config: Config) {
    super({
      baseUrl: config.backendUrl,
    });

    this.config = config;
  }

  public async checkGameExists(steamId: number, getGame = false, init?: RequestInit) {
    let params = `steamId=${steamId}`;
    if (getGame) {
      params += `&getGame=true`;
    }
    return await this.get(`${this.config.checkGameEndpoint}?${params}`, init);
  }

  public async checkSteamOfferExists(steamId: number, init?: RequestInit) {
    return await this.get(`${this.config.checkSteamOfferEndpoint}?steamId=${steamId}`, init);
  }

  public async checkInstantGamingOfferExists(vendorId: string, init?: RequestInit) {
    return await this.get(
      `${this.config.checkInstantGamingOfferEndpoint}?steamId=${vendorId}`,
      init,
    );
  }

  public async getGameIdBySteamId(steamId: number, init?: RequestInit) {
    return await this.get(`${this.config.getGammeIdEndpoint}?steamId=${steamId}`, init);
  }

  public async getInstantGamingOfferId(gameId?: string, vendorId?: string, init?: RequestInit) {
    if (!gameId && !vendorId)
      throw new Error("⚠️At least one of gameId or vendorId must be provided");

    let params = "";
    if (gameId) {
      params += `gameId=${gameId}`;
    }
    if (vendorId) {
      if (params) {
        params += `&`;
      }
      params += `vendorId=${vendorId}`;
    }
    return await this.get(`${this.config.getInstantGamingOfferIdEndpoint}?${params}`, init);
  }

  public async getSteamOfferId(gameId?: string, steamId?: number, init?: RequestInit) {
    if (!gameId && !steamId)
      throw new Error("⚠️At least one of gameId or steamId must be provided");

    let params = "";
    if (gameId) {
      params += `gameId=${gameId}`;
    }
    if (steamId) {
      if (params) {
        params += `&`;
      }
      params += `steamId=${steamId}`;
    }
    return await this.get(`${this.config.getSteamOfferIdEndpoint}?${params}`, init);
  }

  public async getGamesPaged(params: GetGamesPagedParams): Promise<GamesFetchData | null> {
    const flattered = toQueryString(params);
    const response = await this.get<GamesFetchData>(
      `${this.config.getGamesWithCurrencyPaged}?${flattered.toString()}`,
    );
    return response ?? { games: [], totalGamesCount: 0 };
  }
}

export type GamesFetchData = {
  games: Game[];
  totalGamesCount: number;
};

export const backendFetcher = new GamesAndOffersFetcher(config);
