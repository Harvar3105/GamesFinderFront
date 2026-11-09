import type { IdentityUser } from "@/lib/server/contracts/auth/login";

/**
 * Identity checks the access token first and uses (and rotates) the refresh token only when the access
 * token is missing or invalid. At least one of them is required.
 */
export interface IdentitySessionRequest {
  accessToken?: string;
  refreshToken?: string;
}

export interface IdentitySessionResponse {
  readonly user: IdentityUser;
  readonly roles: string[];
  /** Set only when the session was restored by the refresh token: both tokens were rotated. */
  readonly accessToken: string | null;
  readonly refreshToken: string | null;
}
