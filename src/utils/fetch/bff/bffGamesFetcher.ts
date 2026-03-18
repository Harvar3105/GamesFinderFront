import { ECurrency } from "@/domain/enums/ECurrency";
import { HttpClient } from "../httpClient";
import { HttpError } from "../httpError";
import Game from "@/domain/entities/Game";

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
  ): Promise<Game[]> {
    try {
      const result = await this.post<Game[]>("/api/games", {
        page: page,
        pageSize: pageSize,
        currency: currency,
      });
      return Array.isArray(result) ? result : [];
    } catch (error) {
      if (error instanceof HttpError) {
        console.error("HTTP Error:", error);
        return [];
      }
      throw error;
    }
  }
}

export const bffGamesFetcher = new BffGamesFetcher();
