export interface IdentityTokenRefreshRequest {
  /** The raw refresh token: Identity keeps the old field name. */
  refreshTokenHash: string;
}

export interface IdentityTokens {
  readonly accessToken: string;
  readonly refreshToken: string;
}
