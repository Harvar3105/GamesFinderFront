"use client";

import { useMutation } from "@tanstack/react-query";
import { BffRoutes } from "@/config/bffRoutes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CONTACT_EMAIL_HREF } from "@/config/externalLinks";
import { hasErrors } from "@/components/helpers/authValidations";
import { USERNAME_MAX_LENGTH, validateEmail, validateUsername } from "@/lib/shared/authValidation";
import { useUser } from "@/components/providers/userProvider";
import { Button, Checkbox, Field, Input } from "@/components/ui";
import AlreadySignedIn from "@/components/widgets/alreadySignedIn";
import AuthPanel from "@/components/widgets/authPanel";
import RequestErrorAlert from "@/components/widgets/requestErrorAlert";
import type RegistrationPayload from "@/lib/client/contracts/auth/registrationPayload";
import type { User } from "@/domain/entities/user";
import { NavPages } from "@/config/navPages";
import BFFFetch, { FetchError } from "@/lib/client/fetch/bffFetch";

// Mirrors the Identity Security:Password config; Identity checks the password and reports a violation itself.
const PASSWORD_REQUIREMENTS =
  "At least 8 characters, with an uppercase letter, a lowercase letter and a digit.";

interface RegistrationForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type RegistrationErrors = Partial<Record<keyof RegistrationForm, string>>;

function validate(form: RegistrationForm): RegistrationErrors {
  return {
    username: validateUsername(form.username.trim()),
    email: validateEmail(form.email.trim()),
    password: form.password ? undefined : "Enter a password.",
    confirmPassword:
      form.password && form.password !== form.confirmPassword
        ? "Passwords don’t match."
        : undefined,
  };
}

const EMPTY_FORM: RegistrationForm = { username: "", email: "", password: "", confirmPassword: "" };

export default function RegistrationPage() {
  const router = useRouter();
  const { authUser, isLoggedIn } = useUser();
  // Checked once on open: signing up on this page must not show the "already signed in" message.
  const [signedInOnOpen] = useState(isLoggedIn);

  const [form, setForm] = useState<RegistrationForm>(EMPTY_FORM);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [errors, setErrors] = useState<RegistrationErrors>({});

  const mutation = useMutation<User, FetchError, RegistrationPayload>({
    mutationFn: (data) =>
      BFFFetch<User, RegistrationPayload>({
        uri: BffRoutes.registration,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
    onSuccess: (user) => {
      authUser(user);
      router.replace(NavPages.home);
    },
  });

  if (signedInOnOpen) return <AlreadySignedIn title="Sign up" />;

  const update = (key: keyof RegistrationForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((current) => ({ ...current, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.reset();

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;

    mutation.mutate({
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password,
      keepSignedIn,
    });
  };

  const describedBy = (key: keyof RegistrationForm, extra?: string) =>
    [errors[key] ? `reg-${key}-error` : undefined, extra].filter(Boolean).join(" ") || undefined;

  return (
    <AuthPanel
      titleId="reg-title"
      title="Sign up"
      description="Create a GamesFinder account."
      onSubmit={handleSubmit}
      className="max-w-[480px]"
    >
      {mutation.error && (
        <RequestErrorAlert
          error={mutation.error}
          failureTitle="Sign-up failed"
          serverErrorText="We couldn’t reach the server, so your account was not created. Please try again in a few minutes."
        />
      )}

      <div className="flex flex-col gap-related-md">
        <Field
          label="Username"
          htmlFor="reg-username"
          error={errors.username}
          errorId="reg-username-error"
        >
          <Input
            id="reg-username"
            type="text"
            autoComplete="username"
            maxLength={USERNAME_MAX_LENGTH}
            value={form.username}
            onChange={update("username")}
            invalid={Boolean(errors.username)}
            aria-describedby={describedBy("username")}
          />
        </Field>
        <Field label="Email" htmlFor="reg-email" error={errors.email} errorId="reg-email-error">
          <Input
            id="reg-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={update("email")}
            invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
          />
        </Field>
        <Field
          label="Password"
          htmlFor="reg-password"
          hint={PASSWORD_REQUIREMENTS}
          hintId="reg-password-hint"
          error={errors.password}
          errorId="reg-password-error"
        >
          <Input
            id="reg-password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={update("password")}
            invalid={Boolean(errors.password)}
            aria-describedby={describedBy("password", "reg-password-hint")}
          />
        </Field>
        <Field
          label="Repeat password"
          htmlFor="reg-confirmPassword"
          error={errors.confirmPassword}
          errorId="reg-confirmPassword-error"
        >
          <Input
            id="reg-confirmPassword"
            type="password"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={update("confirmPassword")}
            invalid={Boolean(errors.confirmPassword)}
            aria-describedby={describedBy("confirmPassword")}
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
          {mutation.isPending
            ? "Creating account…"
            : mutation.isError
              ? "Try again"
              : "Create account"}
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
          Already have an account?{" "}
          <Link href={NavPages.login} className="font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </AuthPanel>
  );
}
