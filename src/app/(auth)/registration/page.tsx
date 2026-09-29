"use client";

import { useUser } from "@/components/providers/userProvider";
import RegistrationRequest from "@/domain/contracts/auth/registration";
import { User } from "@/domain/entities/user";
import { NavPages } from "@/domain/navPages";
import BFFFetch, { FetchError } from "@/lib/client/fetch/bffFetch";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegistrationPage() {
  const router = useRouter();
  const { authUser } = useUser();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const mutation = useMutation<User, FetchError, RegistrationRequest>({
    mutationFn: (data) =>
      BFFFetch<User, RegistrationRequest>({
        uri: "/api/registration",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),

    onSuccess: async (user) => {
      authUser(user);
      await router.replace(NavPages.home);
    },

    onError: (error) => {
      if (error instanceof FetchError) {
        setErrorMsg(error.message);
      }
    },
  });

  const getEntropyScore = (pwd: string) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const entropyScore = getEntropyScore(password);
  const entropyLabels = ["PENDING", "WEAK", "NOMINAL", "STRONG", "MAXIMUM"];
  const entropyLabel = password.length === 0 ? "PENDING" : entropyLabels[entropyScore] || "NOMINAL";

  const isMatch = password && confirmPassword && password === confirmPassword;
  const isMismatch = password && confirmPassword && password !== confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMsg(null);
    mutation.reset();

    if (!username.trim() || !email.trim() || !password.trim()) {
      setErrorMsg("ALL FIELDS ARE MANDATORY FOR REGISTRATION.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("PASSWORDS CONFIRMATION DOES NOT MATCH.");
      return;
    }

    if (!acceptTerms) {
      setErrorMsg("YOU MUST ACCEPT RADAR TELEMETRY PROTOCOLS.");
      return;
    }

    // Might be changed later
    if (username.includes("@") || username.includes(".")) {
      setErrorMsg("USSAGE OF '@' or '.' IN USERNAME IS FORBIDDEN");
      return;
    }

    mutation.mutate({
      username,
      email,
      password,
      roles: ["user_gfp"],
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
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-secondary font-bold">
              [ PROTOCOL: ENLIST_OPERATOR // REGISTRATION_DECK ]
            </span>
          </div>
          <span className="text-[11px] font-mono text-outline">256-BIT SSL ACTIVE</span>
        </div>

        <div className="p-6 sm:p-8 text-center border-b border-surface-container-highest">
          <h1
            id="main-title"
            className="font-bitcount text-3xl sm:text-4xl font-bold text-primary tracking-wide"
          >
            &gt;/ CREATE ACCOUNT
          </h1>
          <p className="text-xs font-code text-on-surface-variant mt-1.5 uppercase tracking-wider">
            REGISTER NEW RADAR OPERATOR // SYNC WISHLIST ALERTS
          </p>
        </div>

        {errorMsg && (
          <div className="mx-6 sm:mx-8 mt-4 p-3 bg-error-container/20 border border-error/50 rounded text-xs font-code text-error flex items-center gap-2">
            <span>[ERR]</span>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          <div>
            <label className="block text-[10px] font-label-sm text-outline uppercase mb-1">
              OPERATOR_HANDLE // USERNAME:
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold font-code text-xs">
                &gt;
              </span>
              <input
                type="text"
                id="username-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. cyber_scout"
                className="w-full pl-8 pr-3 py-2.5 bg-surface-container-low border border-outline-variant/60 focus:border-primary rounded text-xs sm:text-sm font-code text-on-surface placeholder:text-outline-variant focus:outline-none"
                required
                maxLength={128}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-label-sm text-outline uppercase mb-1">
              COMMUNICATION_LINK // EMAIL:
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold font-code text-xs">
                @
              </span>
              <input
                type="email"
                id="email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. scout@matrix.net"
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
                id="password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full pl-8 pr-3 py-2.5 bg-surface-container-low border border-outline-variant/60 focus:border-primary rounded text-xs sm:text-sm font-code text-on-surface placeholder:text-outline-variant focus:outline-none"
                required
              />
            </div>

            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-[10px] font-label-sm">
                <span className="text-outline">CIPHER_ENTROPY:</span>
                <span
                  className={
                    entropyScore >= 3
                      ? "text-tertiary font-bold"
                      : entropyScore >= 2
                        ? "text-secondary font-bold"
                        : "text-error font-bold"
                  }
                >
                  {entropyLabel}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full bg-surface-container-high rounded overflow-hidden">
                <div
                  className={`h-full transition-colors ${
                    entropyScore >= 1
                      ? entropyScore >= 3
                        ? "bg-tertiary"
                        : "bg-primary"
                      : "bg-surface-container-highest"
                  }`}
                />
                <div
                  className={`h-full transition-colors ${
                    entropyScore >= 2
                      ? entropyScore >= 3
                        ? "bg-tertiary"
                        : "bg-primary"
                      : "bg-surface-container-highest"
                  }`}
                />
                <div
                  className={`h-full transition-colors ${
                    entropyScore >= 3 ? "bg-tertiary" : "bg-surface-container-highest"
                  }`}
                />
                <div
                  className={`h-full transition-colors ${
                    entropyScore >= 4 ? "bg-tertiary" : "bg-surface-container-highest"
                  }`}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-label-sm text-outline uppercase">
                VERIFY_ACCESS_CIPHER:
              </label>
              {isMatch && (
                <span className="text-[10px] font-label-sm text-tertiary font-bold">
                  VERIFIED [MATCH]
                </span>
              )}
              {isMismatch && (
                <span className="text-[10px] font-label-sm text-error font-bold">
                  MISMATCH [ERR]
                </span>
              )}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold font-code text-xs">
                *
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="confirm-password-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full pl-8 pr-3 py-2.5 bg-surface-container-low border border-outline-variant/60 focus:border-primary rounded text-xs sm:text-sm font-code text-on-surface placeholder:text-outline-variant focus:outline-none"
                required
              />
            </div>
          </div>

          {/* TODO: create terms and conditions. */}
          <div className="pt-1">
            <label className="flex items-start gap-2 cursor-pointer text-on-surface-variant hover:text-on-surface select-none">
              <input
                type="checkbox"
                id="accept-terms-checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded bg-surface-container border-outline-variant accent-primary cursor-pointer"
              />
              <span className="text-xs font-code">
                I accept radar telemetry monitoring &amp; wishlist price drop alert triggers.
              </span>
            </label>
          </div>

          <button
            type="submit"
            id="execute-btn"
            disabled={mutation.isPending}
            className="w-full py-3.5 px-4 bg-primary text-on-primary-container font-label-lg font-bold text-sm tracking-wider uppercase rounded hover:bg-primary-fixed transition-all cursor-pointer shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {mutation.isPending ? (
              <>
                <span className="w-3.5 h-3.5 rounded-full border-2 border-on-primary-container border-t-transparent animate-spin" />
                <span>GENERATING ENCRYPTED KEYPAIR...</span>
              </>
            ) : (
              <span>[ COMPLETE REGISTRATION // JOIN ]</span>
            )}
          </button>
        </form>

        {/* Link to Login Terminal */}
        <div className="p-4 bg-surface-container-high/40 border-t border-surface-container-highest text-center text-xs font-code text-on-surface-variant flex items-center justify-between">
          <span>ALREADY REGISTERED?</span>
          <Link
            id="to-login-btn"
            href={NavPages.login}
            className="text-primary hover:text-primary-fixed font-label-sm font-bold tracking-wider hover:underline cursor-pointer"
          >
            [ AUTHENTICATE // LOGIN ] →
          </Link>
        </div>

        {/* Daemon Status Bar */}
        <div className="px-4 py-2 bg-surface-container-lowest border-t border-surface-container-highest text-[10px] font-label-sm text-outline flex items-center justify-between">
          <span>ENLIST_DAEMON: READY</span>
          <span className="text-tertiary">SESSION_TOKEN_PENDING</span>
        </div>
      </div>
    </div>
  );
}
