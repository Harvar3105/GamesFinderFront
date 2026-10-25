import { User } from "@/domain/entities/user";

export interface LoginPayload {
  login: string;
  password: string;
  keepSignedIn: boolean;
  usesEmail: boolean;
}

export interface RegistrationPayload {
  username: string;
  email: string;
  password: string;
  roles: string[];
}
