import { HttpClient } from "../httpClient";
import { HttpError } from "../httpError";
import { UserFetcherResponse } from "../userFetcher";

/**
 * BFF (Backend for Frontend) User Fetcher
 * Makes requests to Next.js API routes instead of directly to the backend
 * This hides the identity server endpoints from the client
 */
class BffUserFetcher extends HttpClient {
  constructor() {
    super({
      baseUrl: "",
    });
  }

  public async register({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }): Promise<UserFetcherResponse | HttpError> {
    try {
      return await this.post<UserFetcherResponse>("/api/auth/register", {
        username: username,
        email: email,
        password: password,
      });
    } catch (error) {
      if (error instanceof HttpError) {
        return error;
      }
      throw error;
    }
  }

  public async login({
    username,
    email,
    password,
  }: {
    password: string;
    username?: string;
    email?: string;
  }): Promise<UserFetcherResponse | HttpError> {
    try {
      return await this.post<UserFetcherResponse>("/api/auth/login", {
        username: username,
        email: email,
        password: password,
      });
    } catch (error) {
      if (error instanceof HttpError) {
        return error;
      }
      throw error;
    }
  }
}

export const bffUserFetcher = new BffUserFetcher();
