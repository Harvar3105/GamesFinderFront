/** Both logout endpoints need the access token as Bearer and answer 204 with no body. */
export interface IdentityLogoutRequest {
  /** The raw refresh token of the session to revoke. */
  refreshToken: string;
}
