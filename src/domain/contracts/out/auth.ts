// FIXME: [Stage1] Match the Identity ResponseDTO: register returns no userRoles, so the field is optional.
// TODO: [Stage2] Login with a refresh token returns the roles as "roles", not "userRoles"; ask Identity to unify.
export interface IdentityAuthModel {
  readonly user: IdentityUser;
  readonly userRoles: string[];
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

export interface LoginRequest {
  username?: string;
  email?: string;
  password: string;
  accessToken?: string;
  // FIXME: [Stage1] Identity reads the refresh token from "refreshTokenHash" (it carries the raw token).
  refreshToken?: string;
}

export interface RegistrationRequest {
  username: string;
  email: string;
  password: string;
}

// FIXME: [Stage1] Store the whole session: { at, rt, user, keepSignedIn }, so the layout can restore the user
// without calling Identity.
export interface SessionTokens {
  at: string;
  atExpireAt?: Date;
  rt: string;
}
