import { ECurrency } from "domain/enums/ECurrency";
import { HttpClient } from "../httpClient";
import { HttpError } from "../httpError";

class BffGamesFetcher extends HttpClient {
  constructor() {
    super({
      baseUrl: "",
    });
  }

  public async getGamesPaged(page: number, pageSize: number, currency?: ECurrency) {
    try {
      return await this.post("/api/games", {
        page: page,
        pageSize: pageSize,
        currency: currency,
      });
    } catch (error) {
      if (error instanceof HttpError) {
        return error;
      }
      throw error;
    }
  }
}
