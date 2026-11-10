import "server-only";

import type { AxiosRequestConfig } from "axios";
import { headers } from "next/headers";
import { config } from "@/lib/config";
import ApiClient from "../apiClient";
import type { IdentityAuthResponse, IdentityLoginRequest } from "@/lib/server/contracts/auth/login";
import type { IdentityLogoutRequest } from "@/lib/server/contracts/auth/logout";
import type { IdentityRegistrationRequest } from "@/lib/server/contracts/auth/registration";
import type {
  IdentitySessionRequest,
  IdentitySessionResponse,
} from "@/lib/server/contracts/auth/session";
import type {
  IdentityTokenRefreshRequest,
  IdentityTokens,
} from "@/lib/server/contracts/auth/token";

// The incoming X-Forwarded-For is client-controlled: Next.js fills it with the socket address only when it
// is absent. In production the BFF must be reachable only through a reverse proxy that overwrites X-Real-IP
// with the peer address (nginx: `proxy_set_header X-Real-IP $remote_addr;`).
// TODO: Set up an edge reverse proxy on the hosting (TLS, X-Real-IP overwrite, no direct access to the BFF),
// until then production requests reach Identity without the client IP.
async function resolveClientIp(): Promise<string | undefined> {
  const requestHeaders = await headers();

  const realIp = requestHeaders.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  // Without a proxy (development) the rightmost entry is the one appended closest to the BFF.
  if (process.env.NODE_ENV !== "production") {
    return requestHeaders.get("x-forwarded-for")?.split(",").pop()?.trim() || undefined;
  }

  return undefined;
}

// Identity rate-limits /api/auth/* per IP, and every request comes from the BFF IP, so the client IP is
// forwarded as a single X-Forwarded-For value rather than the incoming chain.
async function identityRequestConfig(accessToken?: string): Promise<AxiosRequestConfig> {
  const clientIp = await resolveClientIp();
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

  async session(data: IdentitySessionRequest): Promise<IdentitySessionResponse> {
    return this.post<IdentitySessionResponse, IdentitySessionRequest>(
      config.userSessionEndpoint,
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
