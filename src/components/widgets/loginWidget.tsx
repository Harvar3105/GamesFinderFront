"use client";

import { usePathname } from "next/navigation";
import { useSignOut } from "@/components/hooks/useSignOut";
import { isAdmin } from "@/components/helpers/userRoles";
import { useUser } from "@/components/providers/userProvider";
import { Avatar, Badge, Button, ButtonLink } from "@/components/ui";
import { NavPages } from "@/config/navPages";

export default function LoginWidget() {
  const { user, isLoggedIn } = useUser();
  const pathname = usePathname();
  const signOut = useSignOut();

  // `!user` narrows the type for the code below; isLoggedIn() is the source of truth.
  if (!isLoggedIn() || !user) {
    return (
      <>
        {pathname !== NavPages.login && (
          <ButtonLink href={NavPages.login} variant="ghost">
            Sign in
          </ButtonLink>
        )}
        {pathname !== NavPages.registration && (
          <ButtonLink href={NavPages.registration} variant="primary">
            Sign up
          </ButtonLink>
        )}
      </>
    );
  }

  return (
    <>
      <ButtonLink href={NavPages.account} variant="ghost" size="compact">
        <Avatar userId={user.id} />
        {user.username}
      </ButtonLink>
      {isAdmin(user) && <Badge>admin</Badge>}
      <Button variant="secondary" onClick={() => signOut.mutate()} disabled={signOut.isPending}>
        Sign out
      </Button>
    </>
  );
}
