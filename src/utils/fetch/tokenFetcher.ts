import { Config, config } from "utils/config";
import { HttpClient } from "./httpClient";
import { User } from "domain/entities/User";

class TokenFetcher extends HttpClient {
  private readonly config: Config;

  constructor(config: Config) {
    super({
      baseUrl: config.identityUrl,
    });

    this.config = config;
  }

  public refreshToken(jwt: string, refreshToken: string) {
    return this.post<{ jwt: string; refreshToken: string }>(this.config.tokenRefreshEndpoint, {
      jwt: jwt,
      refreshToken: refreshToken,
    });
  }

  public validateToken(token: string) {
    return this.post<{ valid: boolean }>(this.config.tokenValidateEndpoint, {
      token,
    });
  }

  public refresh(refreshToken: string) {
    return this.post<{ accessToken: string; refreshToken?: string }>(
      this.config.tokenRefreshEndpoint,
      { refreshToken },
    );
  }
}

export const tokenFetcher = new TokenFetcher(config);
