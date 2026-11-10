import { signOut } from "@/lib/server/auth/signOut";

export async function POST() {
  return signOut(false);
}
