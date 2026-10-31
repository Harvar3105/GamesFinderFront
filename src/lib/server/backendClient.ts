import "server-only";

import type { AxiosRequestConfig } from "axios";
import { config } from "@/lib/config";
import ApiClient from "@/lib/server/apiClient";
import { withAccessToken } from "@/lib/server/session";

// Endpoint methods are added together with the pages that use them (Stage3 and later).
export class BackendClient extends ApiClient {
  constructor(uri: string) {
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

const globalForClient = globalThis as unknown as {
  backendClient?: BackendClient;
};

export const backendClient = globalForClient.backendClient ?? new BackendClient(config.backendUrl);

globalForClient.backendClient = backendClient;
