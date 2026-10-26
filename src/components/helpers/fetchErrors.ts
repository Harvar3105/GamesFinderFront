import type { FetchError } from "@/lib/client/fetch/bffFetch";

export function isServerError(error: FetchError): boolean {
  return error.status >= 500;
}

export function readErrorMessage(error: FetchError): string {
  try {
    const parsed: unknown = JSON.parse(error.message);
    if (typeof parsed === "string") return parsed;
  } catch {
    console.warn("Recieved message was not json nor plain text");
  }
  return error.message;
}
