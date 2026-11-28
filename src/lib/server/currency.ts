import "server-only";
import { cookies } from "next/headers";
import { DEFAULT_CURRENCY } from "@/config/catalog";
import { PreferenceCookies } from "@/config/cookies";
import { type ECurrency, readCurrency } from "@/domain/entities/enums/ECurrency";

export function resolveCurrency(
  urlValue: string | string[] | null | undefined,
  cookieValue: string | null | undefined,
): ECurrency {
  const fromUrl = Array.isArray(urlValue) ? urlValue[0] : urlValue;
  return readCurrency(fromUrl) ?? readCurrency(cookieValue) ?? DEFAULT_CURRENCY;
}

/**
 * The currency a page shows: the `?currency=` page parameter, then the currency cookie, then the default.
 * Resolve it once when rendering the page and pass it explicitly to the BFF requests. Pages without the
 * parameter pass `undefined`.
 */
export async function readPageCurrency(urlValue?: string | string[]): Promise<ECurrency> {
  return resolveCurrency(urlValue, (await cookies()).get(PreferenceCookies.currency)?.value);
}
