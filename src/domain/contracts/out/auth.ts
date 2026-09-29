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
  refreshToken?: string;
}

export interface RegistrationRequest {
  username: string;
  email: string;
  password: string;
}

export interface SessionTokens {
  at: string;
  atExpireAt?: Date;
  rt: string;
}
