/** Exactly one of username or email identifies the user. */
export interface IdentityLoginRequest {
  username?: string;
  email?: string;
  password: string;
}

/** Returned by register and password login: the user, their roles and the tokens of a new session. */
export interface IdentityAuthResponse {
  readonly user: IdentityUser;
  readonly roles: string[];
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface IdentityUser {
  readonly id: string;
  readonly createdAt: Date;
  readonly lastLogin: Date | null;
  /** Nullable in the Identity UserDTO, but registration requires both, so they are always set. */
  readonly username: string;
  readonly email: string;
}
