import type { UserDTO } from "@/domain/entities/user";

// Identity roles: "ADMIN", "USER". Identity normalizes role names, so they are compared case-insensitively.
// TODO: [Stage2] The backend still checks Authorize(Roles = "admin_gfp"); it must switch to "ADMIN".
const ADMIN_ROLE = "ADMIN";

export function isAdmin(user: UserDTO | null | undefined): boolean {
  return user?.roles.some((role) => role.toUpperCase() === ADMIN_ROLE) ?? false;
}
