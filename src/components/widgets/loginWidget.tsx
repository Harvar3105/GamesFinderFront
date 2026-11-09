"use client";

import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { isServerError, readErrorMessage } from "@/components/helpers/fetchErrors";
import { isAdmin } from "@/components/helpers/userRoles";
import { useNotifications } from "@/components/providers/notificationProvider";
import { useUser } from "@/components/providers/userProvider";
import { Avatar, Badge, Button, ButtonLink } from "@/components/ui";
import { NavPages } from "@/config/navPages";
import BFFFetch, { type FetchError } from "@/lib/client/fetch/bffFetch";

export default function LoginWidget() {
  const { user, isLoggedIn, logout } = useUser();
  const { notify } = useNotifications();
  const pathname = usePathname();
  const router = useRouter();

  const mutation = useMutation<unknown, FetchError>({
    mutationFn: () => BFFFetch({ uri: "/api/logout", method: "POST" }),
    onSuccess: () => {
      logout();
      router.replace(NavPages.home);
    },
    onError: (error) =>
      notify({
        type: "error",
        text: isServerError(error)
          ? "We couldn’t reach the server, so you are still signed in. Please try again."
          : readErrorMessage(error),
        actions: [
          {
            label: "Try again",
            onClick: (dismiss) => {
              dismiss();
              mutation.mutate();
            },
          },
        ],
      }),
  });

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
