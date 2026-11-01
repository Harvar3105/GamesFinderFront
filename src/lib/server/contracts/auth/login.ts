export interface IdentityLoginRequest {
  username?: string;
  email?: string;
  password?: string;
  accessToken?: string;
  /** The raw refresh token: Identity keeps the old field name. */
  refreshTokenHash?: string;
}

// Identity ResponseDTO, returned by login and register. Every endpoint fills only some of the fields,
// the rest come as null.
// TODO: [Stage2] Login with a refresh token returns the roles as "roles", not "userRoles"; ask Identity to unify.
export interface IdentityAuthResponse {
  readonly user: IdentityUser;
  /** null in the register response. */
  readonly userRoles: string[] | null;
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface IdentityUser {
  readonly id: string;
  readonly createdAt: Date;
  readonly lastLogin: Date | null;
  readonly username: string;
  readonly email: string;
}
