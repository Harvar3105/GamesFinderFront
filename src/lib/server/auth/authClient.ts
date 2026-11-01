import "server-only";

import { config } from "@/lib/config";
import ApiClient from "../apiClient";
import type { IdentityAuthResponse, IdentityLoginRequest } from "@/lib/server/contracts/auth/login";
import type { IdentityRegistrationRequest } from "@/lib/server/contracts/auth/registration";
import type {
  IdentityTokenRefreshRequest,
  IdentityTokens,
} from "@/lib/server/contracts/auth/token";

// TODO: [Stage2] Identity rate-limits /api/auth/* per IP, and every request comes from the BFF IP, so all users
// share one limit. Needs ForwardedHeaders in Identity and X-Forwarded-For from the BFF.
export class AuthClient extends ApiClient {
  constructor(uri: string) {
    super(uri);
  }

  async register(data: IdentityRegistrationRequest): Promise<IdentityAuthResponse> {
    return this.post<IdentityAuthResponse, IdentityRegistrationRequest>(
      config.userRegisterEndpoint,
      data,
    );
  }

  async login(data: IdentityLoginRequest): Promise<IdentityAuthResponse> {
    return this.post<IdentityAuthResponse, IdentityLoginRequest>(config.userLoginEndpoint, data);
  }

  // Call only through refreshSession() from lib/server/session: it serializes refreshes of one session,
  // and a refresh token used twice makes Identity revoke every session of the user.
  async refresh(data: IdentityTokenRefreshRequest): Promise<IdentityTokens> {
    return this.post<IdentityTokens, IdentityTokenRefreshRequest>(
      config.tokenRefreshEndpoint,
      data,
    );
  }
}

const globalForClient = globalThis as unknown as {
  authClient?: AuthClient;
};

export const authClient = globalForClient.authClient ?? new AuthClient(config.identityUri);

globalForClient.authClient = authClient;
