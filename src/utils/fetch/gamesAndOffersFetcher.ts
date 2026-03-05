import { config, Config } from "../config";
import { HttpClient } from "./httpClient";

class GamesAndOffersFetcher extends HttpClient {
  private readonly config: Config;

  constructor(config: Config) {
    super({
      baseUrl: config.backendUrl,
    });

    this.config = config;
  }

  public checkGameExists(steamId: number, getGame = false, init?: RequestInit) {
    let params = `steamId=${steamId}`;
    if (getGame) {
      params += `&getGame=true`;
    }
    return this.get(`${this.config.checkGameEndpoint}?${params}`, init);
  }

  public checkSteamOfferExists(steamId: number, init?: RequestInit) {
    return this.get(`${this.config.checkSteamOfferEndpoint}?steamId=${steamId}`, init);
  }

  public checkInstantGamingOfferExists(vendorId: string, init?: RequestInit) {
    return this.get(`${this.config.checkInstantGamingOfferEndpoint}?steamId=${vendorId}`, init);
  }

  public getGameIdBySteamId(steamId: number, init?: RequestInit) {
    return this.get(`${this.config.getGammeIdEndpoint}?steamId=${steamId}`, init);
  }

  public getInstantGamingOfferId(gameId?: string, vendorId?: string, init?: RequestInit) {
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
    return this.get(`${this.config.getInstantGamingOfferIdEndpoint}?${params}`, init);
  }

  public getSteamOfferId(gameId?: string, steamId?: number, init?: RequestInit) {
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
    return this.get(`${this.config.getSteamOfferIdEndpoint}?${params}`, init);
  }
}

export const backendFetcher = new GamesAndOffersFetcher(config);
