import { signOut } from "@/lib/server/auth/signOut";

// FIXME: [Stage5] Add a "Sign out of all devices" button to the account page.
export async function POST() {
  return signOut(true);
}
