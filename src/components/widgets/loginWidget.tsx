"use client";

import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { isAdmin } from "@/components/helpers/userRoles";
import { useUser } from "@/components/providers/userProvider";
import { Avatar, Badge, Button, ButtonLink } from "@/components/ui";
import { NavPages } from "@/domain/navPages";
import BFFFetch from "@/lib/client/fetch/bffFetch";

export default function LoginWidget() {
  const { user, logout } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () => BFFFetch({ uri: "/api/logout", method: "POST" }),
    onSuccess: () => {
      logout();
      router.replace(NavPages.home);
    },
    // TODO: On error show a notification. Notification widgets are not implemented yet.
  });

  if (!user) {
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
      <ButtonLink href={NavPages.account} variant="ghost" className="px-related-sm">
        <Avatar user={user} />
        {user.username}
      </ButtonLink>
      {isAdmin(user) && <Badge>admin</Badge>}
      <Button variant="secondary" onClick={() => mutation.mutate()} disabled={mutation.isPending}>
        Sign out
      </Button>
    </>
  );
}
