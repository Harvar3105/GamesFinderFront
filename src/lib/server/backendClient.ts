import "server-only";

import type { AxiosRequestConfig } from "axios";
import ApiClient from "@/lib/server/apiClient";
import { withAccessToken } from "@/lib/server/session";

/**
 * Base of the backend (GamesFinderOrchester) clients: one client per backend area (games, user data,
 * scraping), each with its own endpoints. Anonymous endpoints use the plain `get` / `post` …, the ones that
 * require a JWT use `authorizedRequest`.
 */
export default abstract class BackendClient extends ApiClient {
  protected constructor(uri: string) {
    super(uri);
  }

  protected authorizedRequest<TResponse>(
    sessionId: string,
    requestConfig: AxiosRequestConfig,
  ): Promise<TResponse> {
    return withAccessToken(sessionId, (accessToken) =>
      this.request<TResponse>({
        ...requestConfig,
        headers: { ...requestConfig.headers, Authorization: `Bearer ${accessToken}` },
      }),
    );
  }
}
