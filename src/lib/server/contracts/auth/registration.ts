/** The response is IdentityAuthResponse. Identity ignores roles and assigns Roles:Initial. */
export interface IdentityRegistrationRequest {
  username: string;
  email: string;
  password: string;
}
