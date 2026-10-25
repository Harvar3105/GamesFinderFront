"use client";

import { NavPages } from "@/domain/navPages";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "../providers/userProvider";
import { usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import BFFFetch from "@/lib/client/fetch/bffFetch";
import router from "next/router";

export default function LoginWidget() {
  const { user, logout, isLoggedIn } = useUser();
  const currentView = usePathname();

  const mutation = useMutation({
    mutationFn: async () => {
      BFFFetch({
        uri: "/api/logout",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    onSuccess: () => {
      logout();
      router.replace("/");
    },

    // TODO: On Error show warning widget. Implement notification widgets.
  });

  const handleLogout = () => {
    mutation.mutate();
  };

  return (
    <div>
      {isLoggedIn() ? (
        <div className="flex items-center gap-2">
          <Link
            id="user-profile-header-btn"
            href={NavPages.profile}
            className={`flex items-center gap-2.5 px-2.5 py-1 rounded border transition-all cursor-pointer ${
              currentView === "user-profile"
                ? "border-tertiary bg-tertiary/10 text-tertiary"
                : "border-surface-container-highest bg-surface-container-low hover:border-primary/40 text-on-surface"
            }`}
            title="Access Operator Terminal"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-outline-variant/60">
              <Image
                src={
                  user!.data?.pfpContent && user!.data?.pfpExt
                    ? `data:image/${user!.data?.pfpExt};base64,${user!.data?.pfpContent}`
                    : "/pfp.jpg"
                }
                width={50}
                height={50}
                alt={user?.data?.pfpName ?? "No avatar"}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-tertiary ring-1 ring-surface-container-lowest animate-pulse" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-label-md uppercase tracking-wider font-semibold">
                  {user?.username}
                </span>
                <span className="text-[9px] px-1 py-0.2 bg-primary/20 text-primary border border-primary/30 rounded font-label-sm">
                  {user?.roles[0]}
                </span>
              </div>
              <span className="text-[9px] text-tertiary font-label-sm block">
                ONLINE [NODE #8841]
              </span>
            </div>
          </Link>

          <button
            id="logout-btn"
            onClick={handleLogout}
            className="hidden sm:inline-flex px-2 py-1 text-[11px] font-label-sm text-error hover:bg-error/10 border border-error/30 hover:border-error rounded transition-colors cursor-pointer"
            title="Terminate Session"
          >
            LOGOUT
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            id="login-header-btn"
            href={NavPages.login}
            className="px-3 py-1.5 text-xs font-label-md text-primary hover:text-on-primary hover:bg-primary/20 border border-primary/40 rounded transition-all cursor-pointer"
          >
            LOGIN
          </Link>
          <Link
            id="register-header-btn"
            href={NavPages.registration}
            className="hidden sm:inline-flex px-3 py-1.5 text-xs font-label-md text-on-tertiary-fixed bg-tertiary hover:bg-tertiary-fixed border border-tertiary rounded transition-all cursor-pointer font-bold"
          >
            REGISTRATION
          </Link>
        </div>
      )}
    </div>
  );
}
