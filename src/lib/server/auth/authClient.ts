import { config } from "@/lib/config";
import ApiClient from "../apiClient";
import { LoginPayload, RegistrationPayload } from "@/domain/contracts/in/auth";
import { IdentityAuthModel, LoginRequest } from "@/domain/contracts/out/auth";

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
