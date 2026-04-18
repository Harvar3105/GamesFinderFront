import { ECurrency } from "@/domain/enums/ECurrency";
import { HttpClient } from "../httpClient";
import { HttpError } from "../httpError";
import Game from "@/domain/entities/Game";
import { GamesFetchData } from "../gamesAndOffersFetcher";

class BffGamesFetcher extends HttpClient {
  constructor() {
    super({
      baseUrl: "",
    });
  }

  public async getGamesPaged(
    page: number,
    pageSize: number,
    currency?: ECurrency,
  ): Promise<GamesFetchData> {
    try {
      const result = await this.post<GamesFetchData>("/api/games", {
        page: page,
        pageSize: pageSize,
        currency: currency,
      });
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
