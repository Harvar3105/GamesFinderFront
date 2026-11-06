import "server-only";

import type LoginPayload from "@/lib/client/contracts/auth/loginPayload";
import type RegistrationPayload from "@/lib/client/contracts/auth/registrationPayload";
import { validateEmail, validateLogin, validateUsername } from "@/lib/shared/authValidation";

export type ParseResult<T> = { ok: true; value: T } | { ok: false; message: string };

const INVALID_BODY_MESSAGE = "Invalid request body.";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readTrimmed = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

// Missing means "no"; any other non-boolean value is a malformed request.
function readKeepSignedIn(value: unknown): boolean | null {
  if (value === undefined) return false;
  return typeof value === "boolean" ? value : null;
}

export function parseLoginPayload(body: unknown): ParseResult<LoginPayload> {
  if (!isRecord(body)) return { ok: false, message: INVALID_BODY_MESSAGE };

  const login = readTrimmed(body.login);
  const loginError = validateLogin(login);
  if (loginError) return { ok: false, message: loginError };

  if (typeof body.password !== "string" || !body.password)
    return { ok: false, message: "Enter your password." };

  const keepSignedIn = readKeepSignedIn(body.keepSignedIn);
  if (keepSignedIn === null) return { ok: false, message: INVALID_BODY_MESSAGE };

  return { ok: true, value: { login, password: body.password, keepSignedIn } };
}

export function parseRegistrationPayload(body: unknown): ParseResult<RegistrationPayload> {
  if (!isRecord(body)) return { ok: false, message: INVALID_BODY_MESSAGE };

  const username = readTrimmed(body.username);
  const usernameError = validateUsername(username);
  if (usernameError) return { ok: false, message: usernameError };

  const email = readTrimmed(body.email);
  const emailError = validateEmail(email);
  if (emailError) return { ok: false, message: emailError };

  if (typeof body.password !== "string" || !body.password)
    return { ok: false, message: "Enter a password." };

  const keepSignedIn = readKeepSignedIn(body.keepSignedIn);
  if (keepSignedIn === null) return { ok: false, message: INVALID_BODY_MESSAGE };

  return { ok: true, value: { username, email, password: body.password, keepSignedIn } };
}
