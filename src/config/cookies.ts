// TODO: Add cookie consent management: let the user choose which cookies may be used.
// TODO: Group the cookies by purpose (strictly necessary / preferences / analytics), so that consent
//  is given per group.

/**
 * Preference cookies: readable by the client, read by the server when rendering. The httpOnly session
 * cookie is owned by `lib/server/session.ts`.
 */
export const PreferenceCookies = {
  theme: "theme",
  /** The last currency the user picked; the `?currency=` page parameter takes precedence over it. */
  currency: "currency",
} as const;

export type PreferenceCookie = (typeof PreferenceCookies)[keyof typeof PreferenceCookies];

export const PREFERENCE_COOKIE_MAX_AGE_SECONDS = 365 * 24 * 60 * 60;
