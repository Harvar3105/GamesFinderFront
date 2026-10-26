const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const INVALID_EMAIL_MESSAGE = "Invalid email address. Use the format name@example.com.";

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}

export function hasErrors(errors: object): boolean {
  return Object.values(errors).some(Boolean);
}
