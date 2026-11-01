import type { FetchError } from "@/lib/client/fetch/bffFetch";

export function isServerError(error: FetchError): boolean {
  return error.status >= 500;
}

// FIXME: [Stage1] Identity returns IdentityError[] ({ code, description }) on registration, the backend returns
// ProblemDetails on 500, and rate limiting returns 429 with an empty body. Normalize them in the BFF so the
// client always receives a string.
export function readErrorMessage(error: FetchError): string {
  try {
    const parsed: unknown = JSON.parse(error.message);
    if (typeof parsed === "string") return parsed;
  } catch {
    console.warn("Recieved message was not json nor plain text");
  }
  return error.message;
}
