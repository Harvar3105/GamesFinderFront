"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CONTACT_EMAIL_HREF } from "@/config/externalLinks";
import {
  hasErrors,
  INVALID_EMAIL_MESSAGE,
  isValidEmail,
} from "@/components/helpers/authValidations";
import { useUser } from "@/components/providers/userProvider";
import { Button, Checkbox, Field, Input } from "@/components/ui";
import AlreadySignedIn from "@/components/widgets/alreadySignedIn";
import AuthPanel from "@/components/widgets/authPanel";
import RequestErrorAlert from "@/components/widgets/requestErrorAlert";
import { LoginPayload } from "@/domain/contracts/in/auth";
import { User } from "@/domain/entities/user";
import { NavPages } from "@/config/navPages";
import BFFFetch, { FetchError } from "@/lib/client/fetch/bffFetch";

interface LoginErrors {
  login?: string;
  password?: string;
}

function validate(login: string, password: string): LoginErrors {
  const trimmed = login.trim();
  return {
    login: !trimmed
      ? "Enter your email or username."
      : trimmed.includes("@") && !isValidEmail(trimmed)
        ? INVALID_EMAIL_MESSAGE
        : undefined,
    password: password ? undefined : "Enter your password.",
  };
}

export default function LoginPage() {
  const router = useRouter();
  const { authUser, isLoggedIn } = useUser();
  // Checked once on open: signing in on this page must not show the "already signed in" message.
  const [signedInOnOpen] = useState(isLoggedIn);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const mutation = useMutation<User, FetchError, LoginPayload>({
    mutationFn: (data) =>
      BFFFetch<User, LoginPayload>({
        uri: "/api/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
    onSuccess: (user) => {
      authUser(user);
      router.replace(NavPages.home);
    },
  });

  if (signedInOnOpen) return <AlreadySignedIn title="Sign in" />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.reset();

    const nextErrors = validate(login, password);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;

    const trimmed = login.trim();
    mutation.mutate({
      login: trimmed,
      password,
      usesEmail: trimmed.includes("@"),
      keepSignedIn,
    });
  };

  return (
    <AuthPanel
      titleId="login-title"
      title="Sign in"
      description="Sign in to your GamesFinder account."
      onSubmit={handleSubmit}
      className="max-w-[440px]"
    >
      {mutation.error && (
        <RequestErrorAlert
          error={mutation.error}
          failureTitle="Sign-in failed"
          serverErrorText="We couldn’t reach the sign-in server, so your credentials were not checked. Please try again in a few minutes."
        />
      )}

      <div className="flex flex-col gap-related-md">
        <Field
          label="Email or username"
          htmlFor="login-email"
          error={errors.login}
          errorId="login-email-error"
        >
          <Input
            id="login-email"
            type="text"
            autoComplete="username"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            invalid={Boolean(errors.login)}
            aria-describedby={errors.login ? "login-email-error" : undefined}
          />
        </Field>
        <Field
          label="Password"
          htmlFor="login-password"
          error={errors.password}
          errorId="login-password-error"
        >
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "login-password-error" : undefined}
          />
        </Field>
        <Checkbox
          label="Remember me"
          checked={keepSignedIn}
          onChange={(e) => setKeepSignedIn(e.target.checked)}
        />
      </div>

      <div className="flex flex-col gap-related-md">
        <Button type="submit" variant="primary" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Signing in…" : mutation.isError ? "Try again" : "Sign in"}
        </Button>
        {mutation.isError && (
          <p className="text-center">
            Problem persists?{" "}
            <a href={CONTACT_EMAIL_HREF} className="font-semibold">
              Contact us
            </a>
          </p>
        )}
        <p className="text-center">
          No account?{" "}
          <Link href={NavPages.registration} className="font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </AuthPanel>
  );
}
