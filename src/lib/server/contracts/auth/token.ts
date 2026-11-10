export interface IdentityTokenRefreshRequest {
  refreshToken: string;
}

export interface IdentityTokens {
  readonly accessToken: string;
  readonly refreshToken: string;
}
