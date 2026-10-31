import { config } from "@/lib/config";
import ApiClient from "../apiClient";
import { LoginPayload, RegistrationPayload } from "@/domain/contracts/in/auth";
import {
  IdentityAuthModel,
  IdentityTokens,
  LoginRequest,
  TokenRefreshRequest,
} from "@/domain/contracts/out/auth";

// TODO: [Stage2] Identity rate-limits /api/auth/* per IP, and every request comes from the BFF IP, so all users
// share one limit. Needs ForwardedHeaders in Identity and X-Forwarded-For from the BFF.
export class AuthClient extends ApiClient {
  constructor(uri: string) {
    super(uri);
  }

  async register(data: RegistrationPayload): Promise<IdentityAuthModel> {
    return this.post<IdentityAuthModel, RegistrationPayload>(config.userRegisterEndpoint, data);
  }

  async login(data: LoginRequest): Promise<IdentityAuthModel> {
    return this.post<IdentityAuthModel, LoginRequest>(config.userLoginEndpoint, data);
  }

  // Call only through refreshSession() from lib/server/session: it serializes refreshes of one session,
  // and a refresh token used twice makes Identity revoke every session of the user.
  async refresh(data: TokenRefreshRequest): Promise<IdentityTokens> {
    return this.post<IdentityTokens, TokenRefreshRequest>(config.tokenRefreshEndpoint, data);
  }
}

const globalForClient = globalThis as unknown as {
  authClient?: AuthClient;
};

export const authClient = globalForClient.authClient ?? new AuthClient(config.identityUri);

globalForClient.authClient = authClient;
