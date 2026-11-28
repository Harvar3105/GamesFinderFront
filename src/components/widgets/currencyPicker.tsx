"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { writePreferenceCookie } from "@/components/helpers/preferenceCookies";
import { Select } from "@/components/ui";
import { PreferenceCookies } from "@/config/cookies";
import { ECurrency, readCurrency } from "@/domain/entities/enums/ECurrency";

interface CurrencyPickerProps {
  /** The currency resolved from the cookie when the layout was rendered. */
  savedCurrency: ECurrency;
}

/**
 * Site-wide currency picker. Shows the `?currency=` page parameter when the page has one, otherwise the saved
 * currency. A pick is saved in the cookie; a page with the parameter gets it rewritten, any other page is
 * re-rendered on the server with the new cookie.
 */
export default function CurrencyPicker({
  savedCurrency: initialSavedCurrency,
}: CurrencyPickerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // The layout is not re-rendered on navigation, so the picker keeps the saved currency itself.
  const [savedCurrency, setSavedCurrency] = useState(initialSavedCurrency);

  const urlCurrency = readCurrency(searchParams.get("currency"));
  const currency = urlCurrency ?? savedCurrency;

  const pickCurrency = (next: ECurrency) => {
    setSavedCurrency(next);
    writePreferenceCookie(PreferenceCookies.currency, next);

    if (urlCurrency === undefined) {
      router.refresh();
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.set("currency", next);
    router.replace(`${pathname}?${params}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-related-sm">
      <label htmlFor="site-currency" className="typo-label">
        Currency
      </label>
      <Select
        id="site-currency"
        controlSize="sm"
        fullWidth={false}
        value={currency}
        onChange={(e) => pickCurrency(e.target.value as ECurrency)}
      >
        {Object.values(ECurrency).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
}
