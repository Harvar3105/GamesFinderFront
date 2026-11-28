import { PREFERENCE_COOKIE_MAX_AGE_SECONDS, type PreferenceCookie } from "@/config/cookies";

/** Saves a preference cookie in the browser, so that the server renders the next pages with it. */
export function writePreferenceCookie(name: PreferenceCookie, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${PREFERENCE_COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
}
