"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { isServerError, readErrorMessage } from "@/components/helpers/fetchErrors";
import { useNotifications } from "@/components/providers/notificationProvider";
import { useUser } from "@/components/providers/userProvider";
import { NavPages } from "@/config/navPages";
import BFFFetch, { type FetchError } from "@/lib/client/fetch/bffFetch";

/** Ends the session in the BFF, clears the user and goes home; a failure is shown as a banner with a retry. */
export function useSignOut() {
  const { logout } = useUser();
  const { notify } = useNotifications();
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

  return mutation;
}
