// Checked both on the auth pages and in the BFF routes. Each function returns an error message, or
// undefined when the value is valid. Password rules are not repeated here: Identity owns the password
// policy and reports violations itself.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const USERNAME_MAX_LENGTH = 128;

export const INVALID_EMAIL_MESSAGE = "Invalid email address. Use the format name@example.com.";

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}

/** The sign-in identifier: an email when it contains "@", otherwise a username. Expects a trimmed value. */
export function validateLogin(login: string): string | undefined {
  if (!login) return "Enter your email or username.";
  if (login.includes("@") && !isValidEmail(login)) return INVALID_EMAIL_MESSAGE;
  return undefined;
}

// "@" and "." are forbidden so that a username is never taken for an email at sign-in.
/** Expects a trimmed value. */
export function validateUsername(username: string): string | undefined {
  if (!username) return "Enter a username.";
  if (username.length > USERNAME_MAX_LENGTH)
    return `Username must be at most ${USERNAME_MAX_LENGTH} characters.`;
  if (username.includes("@") || username.includes(".")) return "Username can’t contain “@” or “.”.";
  return undefined;
}

/** Expects a trimmed value. */
export function validateEmail(email: string): string | undefined {
  if (!email) return "Enter your email.";
  if (!isValidEmail(email)) return INVALID_EMAIL_MESSAGE;
  return undefined;
}
