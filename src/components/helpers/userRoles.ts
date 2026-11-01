import type { UserDTO } from "@/domain/entities/user";

// FIXME: [Stage2] The backend requires "admin_gfp" (Authorize(Roles = "admin_gfp")).
const ADMIN_ROLE = "admin";

export function isAdmin(user: UserDTO | null | undefined): boolean {
  return user?.roles.includes(ADMIN_ROLE) ?? false;
}
