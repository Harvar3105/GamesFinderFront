import type { UserDTO } from "@/domain/entities/user";

// TODO: Roles are in development. Replace with the real administrator role name from the backend.
const ADMIN_ROLE = "admin";

export function isAdmin(user: UserDTO | null | undefined): boolean {
  return user?.roles.includes(ADMIN_ROLE) ?? false;
}
