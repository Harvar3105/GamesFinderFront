import { HttpClient } from "../httpClient";
import { HttpError } from "../httpError";
import { GamesFetchData } from "../gamesAndOffersFetcher";
import { GetGamesPagedParams } from "../contracts/gnoContracts";

class BffGamesFetcher extends HttpClient {
  constructor() {
    super({
      baseUrl: "",
    });
  }

  public async getGamesPaged(params: GetGamesPagedParams): Promise<GamesFetchData> {
    try {
      const result = await this.post<GamesFetchData>("/api/games", params);
      return Array.isArray(result.games) ? result : { games: [], totalGamesCount: 0 };
    } catch (error) {
      if (error instanceof HttpError) {
        console.error("HTTP Error:", error);
        return { games: [], totalGamesCount: 0 };
      }
      throw error;
    }
  }
}

export const bffGamesFetcher = new BffGamesFetcher();
