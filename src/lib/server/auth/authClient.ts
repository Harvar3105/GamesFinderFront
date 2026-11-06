import "server-only";

import type { AxiosRequestConfig } from "axios";
import { headers } from "next/headers";
import { config } from "@/lib/config";
import ApiClient from "../apiClient";
import type { IdentityAuthResponse, IdentityLoginRequest } from "@/lib/server/contracts/auth/login";
import type { IdentityLogoutRequest } from "@/lib/server/contracts/auth/logout";
import type { IdentityRegistrationRequest } from "@/lib/server/contracts/auth/registration";
import type {
  IdentityTokenRefreshRequest,
  IdentityTokens,
} from "@/lib/server/contracts/auth/token";

// Identity rate-limits /api/auth/* per IP, and every request comes from the BFF IP, so the client IP is
// forwarded in X-Forwarded-For. Next.js fills the header with the socket address only when it is absent,
// so in production the BFF must sit behind a reverse proxy that sets it; otherwise a client can spoof it.
// TODO: [Stage2] Identity must enable ForwardedHeaders and trust only the BFF, until then all users share one limit.
async function identityRequestConfig(accessToken?: string): Promise<AxiosRequestConfig> {
  const clientIp = (await headers()).get("x-forwarded-for");
  const requestHeaders: Record<string, string> = {};
  if (clientIp) requestHeaders["X-Forwarded-For"] = clientIp;
  if (accessToken) requestHeaders.Authorization = `Bearer ${accessToken}`;

  return { headers: requestHeaders };
}

export class AuthClient extends ApiClient {
  constructor(uri: string) {
    super(uri);
  }

  async register(data: IdentityRegistrationRequest): Promise<IdentityAuthResponse> {
    return this.post<IdentityAuthResponse, IdentityRegistrationRequest>(
      config.userRegisterEndpoint,
      data,
      await identityRequestConfig(),
    );
  }

  async login(data: IdentityLoginRequest): Promise<IdentityAuthResponse> {
    return this.post<IdentityAuthResponse, IdentityLoginRequest>(
      config.userLoginEndpoint,
      data,
      await identityRequestConfig(),
    );
  }

  async logout(accessToken: string, data: IdentityLogoutRequest): Promise<void> {
    await this.post<void, IdentityLogoutRequest>(
      config.userLogoutEndpoint,
      data,
      await identityRequestConfig(accessToken),
    );
  }

  async logoutAll(accessToken: string): Promise<void> {
    await this.post<void>(
      config.userLogoutAllEndpoint,
      undefined,
      await identityRequestConfig(accessToken),
    );
  }

  // Call only through refreshSession() from lib/server/session: it serializes refreshes of one session,
  // and a refresh token used twice makes Identity revoke every session of the user.
  async refresh(data: IdentityTokenRefreshRequest): Promise<IdentityTokens> {
    return this.post<IdentityTokens, IdentityTokenRefreshRequest>(
      config.tokenRefreshEndpoint,
      data,
      await identityRequestConfig(),
    );
  }
}

const globalForClient = globalThis as unknown as {
  authClient?: AuthClient;
};

export const authClient = globalForClient.authClient ?? new AuthClient(config.identityUri);

globalForClient.authClient = authClient;
