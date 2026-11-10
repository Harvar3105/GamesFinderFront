"use client";

import { useEffect, useEffectEvent } from "react";
import { BffRoutes } from "@/config/bffRoutes";
import { isServerError, readErrorMessage } from "@/components/helpers/fetchErrors";
import { useSignOut } from "@/components/hooks/useSignOut";
import { useNotifications } from "@/components/providers/notificationProvider";
import { useUser } from "@/components/providers/userProvider";
import type SessionStatus from "@/lib/client/contracts/auth/sessionStatus";
import BFFFetch, { FetchError } from "@/lib/client/fetch/bffFetch";

const RETRY_AFTER_ERROR_SECONDS = 60;

const isSessionGone = (error: unknown) => error instanceof FetchError && error.status === 401;

/**
 * Short sessions (without "Remember me") expire after a period of inactivity. Before that the user gets a
 * banner offering to stay signed in or to sign out; without an answer the user is cleared once the session
 * expires. Every request to the BFF extends the session, so the remaining time is always read from the BFF.
 */
export default function SessionExpiryWatcher() {
  const { user, logout } = useUser();
  const { notify, dismiss } = useNotifications();
  const signOut = useSignOut();
  const userId = user?.id ?? null;

  const onExpired = useEffectEvent(() => {
    logout();
    notify({
      type: "notice",
      text: "Your session has expired due to inactivity. Please sign in again.",
    });
  });

  const onSignOut = useEffectEvent(() => signOut.mutate());

  const onExtendFailed = useEffectEvent((error: unknown) =>
    notify({
      type: "error",
      text:
        error instanceof FetchError && !isServerError(error)
          ? readErrorMessage(error)
          : "We couldn’t reach the server to extend your session. Please try again.",
      durationMs: 8000,
    }),
  );

  useEffect(() => {
    if (userId === null) return;

    let active = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let warningId: number | null = null;

    const closeWarning = () => {
      if (warningId === null) return;
      dismiss(warningId);
      warningId = null;
    };

    const checkIn = (seconds: number) => {
      clearTimeout(timer);
      timer = setTimeout(check, seconds * 1000);
    };

    const expire = () => {
      clearTimeout(timer);
      closeWarning();
      onExpired();
    };

    const apply = (status: SessionStatus) => {
      if (!active) return;
      if (status.keepSignedIn) {
        closeWarning();
        return;
      }

      const secondsUntilWarning = status.expiresInSeconds - status.warnBeforeExpirySeconds;
      if (secondsUntilWarning > 0) {
        closeWarning();
        checkIn(secondsUntilWarning);
        return;
      }

      if (warningId === null) showWarning(status.expiresInSeconds);
      // One check right after the expiry: it either confirms that the session is gone or finds it
      // extended by activity elsewhere (another tab) and closes the warning.
      checkIn(status.expiresInSeconds + 1);
    };

    const check = () => {
      BFFFetch<SessionStatus>({ uri: BffRoutes.session, method: "GET" }).then(apply, (error) => {
        if (!active) return;
        if (isSessionGone(error)) expire();
        else checkIn(RETRY_AFTER_ERROR_SECONDS);
      });
    };

    const extend = () => {
      BFFFetch<SessionStatus>({ uri: BffRoutes.session, method: "POST" }).then(apply, (error) => {
        if (!active) return;
        if (isSessionGone(error)) expire();
        else onExtendFailed(error);
      });
    };

    const showWarning = (expiresInSeconds: number) => {
      const minutes = Math.max(1, Math.ceil(expiresInSeconds / 60));
      warningId = notify({
        type: "notice",
        text: `You have been inactive for a while. Your session will expire in ${minutes} min.`,
        actions: [
          { label: "Stay signed in", variant: "primary", onClick: extend },
          {
            label: "Sign out",
            onClick: (dismissBanner) => {
              dismissBanner();
              warningId = null;
              onSignOut();
            },
          },
        ],
      });
    };

    check();

    return () => {
      active = false;
      clearTimeout(timer);
      closeWarning();
    };
  }, [userId, notify, dismiss]);

  return null;
}
