import { config } from "@/lib/config";
import ApiClient from "../apiClient";
import { RegistrationPayload } from "@/shared/contracts/auth/auth";
import { IdentityAuthModel, LoginRequest } from "@/shared/contracts/auth/auth";

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
}

const globalForClient = globalThis as unknown as {
  authClient?: AuthClient;
};

export const authClient = globalForClient.authClient ?? new AuthClient(config.identityUri);

globalForClient.authClient = authClient;
