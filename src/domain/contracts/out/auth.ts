import type { UserDTO } from "@/domain/entities/user";

// Identity ResponseDTO: every endpoint fills only some of the fields, the rest come as null.
// TODO: [Stage2] Login with a refresh token returns the roles as "roles", not "userRoles"; ask Identity to unify.
export interface IdentityAuthModel {
  readonly user: IdentityUser;
  readonly userRoles: string[] | null;
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface IdentityTokens {
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
  password?: string;
  accessToken?: string;
  refreshTokenHash?: string;
}

export interface TokenRefreshRequest {
  refreshTokenHash: string;
}

export interface RegistrationRequest {
  username: string;
  email: string;
  password: string;
}

export interface Session {
  accessToken: string;
  refreshToken: string;
  user: UserDTO;
  keepSignedIn: boolean;
}
