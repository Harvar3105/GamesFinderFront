import { config } from "@/lib/config";
import ApiClient from "../apiClient";
import { LoginPayload, RegistrationPayload } from "@/domain/contracts/in/auth";
import { IdentityAuthModel, LoginRequest } from "@/domain/contracts/out/auth";

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

  // FIXME: [Stage1] Add refresh(): POST config.tokenRefreshEndpoint with { refreshTokenHash: rt }, returns
  // { accessToken, refreshToken }. Refresh tokens are single-use and presenting a revoked one revokes every
  // session of the user, so concurrent refreshes of one session must be serialized (Redis lock per sessionId).
}

const globalForClient = globalThis as unknown as {
  authClient?: AuthClient;
};

export const authClient = globalForClient.authClient ?? new AuthClient(config.identityUri);

globalForClient.authClient = authClient;
