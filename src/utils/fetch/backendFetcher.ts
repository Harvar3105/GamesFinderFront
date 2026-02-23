import { config, Config } from "../config";
import { HttpClient } from "./httpClient";

class BackendFetcher extends HttpClient {
  private readonly config: Config;

  constructor(config: Config) {
    super({
      baseUrl: config.backendUrl,
    });

    this.config = config;
  }

  public checkGameExists(steamId: number, getGame = false) {
    let params = `steamId=${steamId}`;
    if (getGame) {
      params += `&getGame=true`;
    }
    return this.get(`${this.config.checkGameEndpoint}?${params}`);
  }

  public checkSteamOfferExists(steamId: number) {
    return this.get(`${this.config.checkSteamOfferEndpoint}?steamId=${steamId}`);
  }

  public checkInstantGamingOfferExists(vendorId: string) {
    return this.get(`${this.config.checkInstantGamingOfferEndpoint}?steamId=${vendorId}`);
  }

  public getGameIdBySteamId(steamId: number) {
    return this.get(`${this.config.getGammeIdEndpoint}?steamId=${steamId}`);
  }

  public getInstantGamingOfferId(gameId?: string, vendorId?: string) {
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
    return this.get(`${this.config.getInstantGamingOfferIdEndpoint}?${params}`);
  }

  public getSteamOfferId(gameId?: string, steamId?: number) {
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
    return this.get(`${this.config.getSteamOfferIdEndpoint}?${params}`);
  }
}

export const backendFetcher = new BackendFetcher(config);
