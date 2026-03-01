import { Config, config } from "utils/config";
import { HttpClient } from "./httpClient";
import { User } from "domain/entities/User";

export interface UserFetcherResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

class UserFetcher extends HttpClient {
  private readonly config: Config;

  constructor(config: Config) {
    super({
      baseUrl: config.identityUrl,
    });

    this.config = config;
  }

  public register({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    return this.post<UserFetcherResponse>(this.config.userRegisterEndpoint, {
      username: username,
      email: email,
      password: password,
    });
  }

  public login({
    username,
    email,
    password,
  }: {
    password: string;
    username?: string;
    email?: string;
  }) {
    return this.post<UserFetcherResponse>(this.config.userLoginEndpoint, {
      username: username,
      email: email,
      password: password,
    });
  }
}

export const userFetcher = new UserFetcher(config);
