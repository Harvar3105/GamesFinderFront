"use client";

import BFFFetch, { FetchError } from "@/lib/client/fetch/bffFetch";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { NavPages } from "@/domain/navPages";
import { User } from "@/domain/entities/user";
import { useUser } from "@/components/providers/userProvider";
import Link from "next/link";
import { LoginPayload } from "@/domain/contracts/in/auth";

export default function LoginPage() {
  const router = useRouter();
  const { authUser } = useUser();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const mutation = useMutation<User, FetchError, LoginPayload>({
    mutationFn: (data) =>
      BFFFetch<User, LoginPayload>({
        uri: "/api/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),

    onSuccess: async (user) => {
      authUser(user);
      router.replace(NavPages.home);
    },
    onError: (error) => {
      if (error instanceof FetchError) {
        setErrorMsg(error.message);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMsg(null);
    mutation.reset();

    if (!login.trim()) {
      setErrorMsg("LOGIN IS REQUIRED! ACCESS DENIED!");
      return;
    }

    if (!password) {
      setErrorMsg("PASSWORD IS NOT PROVIDED! ACCESS DENIED!");
      return;
    }

    mutation.mutate({
      login: login,
      password: password,
      usesEmail: login.includes("@") && login.includes("."),
      keepSignedIn: keepSignedIn,
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg relative bg-surface-container-lowest border border-surface-container-highest shadow-2xl rounded-lg overflow-hidden">
        <div className="retro-decor absolute top-2 left-3 text-[10px] font-label-sm text-outline-variant select-none pointer-events-none">
          ◤ 01
        </div>
        <div className="retro-decor absolute top-2 right-3 text-[10px] font-label-sm text-outline-variant select-none pointer-events-none">
          ◥ 88
        </div>
        <div className="retro-decor absolute bottom-2 left-3 text-[10px] font-label-sm text-outline-variant select-none pointer-events-none">
          ◣ SEC_09
        </div>
        <div className="retro-decor absolute bottom-2 right-3 text-[10px] font-label-sm text-outline-variant select-none pointer-events-none">
          ◢ 44
        </div>

        <div className="px-4 py-2.5 bg-surface-container-high/70 border-b border-surface-container-highest flex items-center justify-between text-xs font-label-sm text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
            <span className="text-error font-bold">SYS_SEC: RESTRICTED</span>
          </div>
          <span className="text-[11px] font-mono text-outline">PORT: 8089 :: AUTH_v2.0</span>
        </div>

        <div className="p-6 sm:p-8 text-center border-b border-surface-container-highest">
          <h1
            id="login-main-title"
            className="font-bitcount text-3xl sm:text-4xl font-bold text-primary tracking-wide"
          >
            &gt;/ ACCESS TERMINAL
          </h1>
          <p className="text-xs font-code text-on-surface-variant mt-1.5 uppercase tracking-wider">
            INITIALIZE USER SESSION ■ STEAM WISHLIST RADAR
          </p>
        </div>

        {errorMsg && (
          <div className="mx-6 sm:mx-8 mt-4 p-3 bg-error-container/20 border border-error/50 rounded text-xs font-code text-error flex items-center gap-2">
            <span>[ERR]</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          <div>
            <label className="block text-[10px] font-label-sm text-outline uppercase mb-1">
              OPERATOR_IDENTIFIER (EMAIL // USERNAME):
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold font-code text-xs">
                &gt;
              </span>
              <input
                type="text"
                id="login-identifier-input"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="e.g. agent3567@netwrok.com"
                className="w-full pl-8 pr-3 py-2.5 bg-surface-container-low border border-outline-variant/60 focus:border-primary rounded text-xs sm:text-sm font-code text-on-surface placeholder:text-outline-variant focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-label-sm text-outline uppercase">
                ACCESS_CIPHER // PASSWORD:
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[10px] font-label-sm text-secondary hover:underline cursor-pointer"
              >
                {showPassword ? "[HIDE]" : "[REVEAL]"}
              </button>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold font-code text-xs">
                *
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="login-cipher-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="secret password that only owner knows"
                className="w-full pl-8 pr-3 py-2.5 bg-surface-container-low border border-outline-variant/60 focus:border-primary rounded text-xs sm:text-sm font-code text-on-surface placeholder:text-outline-variant focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-code pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-on-surface-variant hover:text-on-surface select-none">
              <input
                type="checkbox"
                id="persist-session-checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="w-4 h-4 rounded bg-surface-container border-outline-variant accent-primary cursor-pointer"
              />
              <span className="text-[11px]">PERSIST SESSION BUFFER</span>
            </label>
            <span className="text-[11px] text-tertiary">FIDO2 HARDWARE OK</span>
          </div>

          <button
            type="submit"
            id="execute-login-btn"
            disabled={mutation.isPending}
            className="w-full py-3.5 px-4 bg-primary text-on-primary-container font-label-lg font-bold text-sm tracking-wider uppercase rounded hover:bg-primary-fixed transition-all cursor-pointer shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {mutation.isPending ? (
              <>
                <span className="w-3.5 h-3.5 rounded-full border-2 border-on-primary-container border-t-transparent animate-spin" />
                <span>AUTHENTICATING TELEMETRY...</span>
              </>
            ) : (
              <span>[ EXECUTE // LOGIN ]</span>
            )}
          </button>
        </form>

        <div className="p-4 bg-surface-container-high/40 border-t border-surface-container-highest text-center text-xs font-code text-on-surface-variant flex items-center justify-between">
          <span>NO RADAR CREDENTIALS?</span>
          <Link
            id="to-register-deck-btn"
            href={NavPages.registration}
            className="text-primary hover:text-primary-fixed font-label-sm font-bold tracking-wider hover:underline cursor-pointer"
          >
            [ REGISTER_NEW_OPERATOR ] →
          </Link>
        </div>

        <div className="px-4 py-2 bg-surface-container-lowest border-t border-surface-container-highest text-[10px] font-label-sm text-outline flex items-center justify-between">
          <span>AUTH_DAEMON: READY</span>
          <span className="text-tertiary">TLS_1.3_ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
