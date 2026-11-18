"use client";

import { useState } from "react";
import { vendorLabel } from "@/components/helpers/vendors";
import { Button, Field, Input, Select } from "@/components/ui";
import TagPicker from "@/components/widgets/tagPicker";
import { DEFAULT_CURRENCY, DEFAULT_SORT } from "@/config/catalog";
import { ECurrency } from "@/domain/entities/enums/ECurrency";
import { ESort } from "@/domain/entities/enums/ESort";
import type { EVendor } from "@/domain/entities/enums/EVendor";
import { type GamesFilterWithCurrency, validatePriceRange } from "@/lib/shared/gamesFilterParams";

const SORT_OPTIONS: { value: ESort; label: string }[] = [
  { value: ESort.NEWEST_UPDATED, label: "Recently updated first" },
  { value: ESort.OLDEST_UPDATED, label: "Least recently updated first" },
  { value: ESort.NEWEST, label: "Recently added first" },
  { value: ESort.OLDEST, label: "Earliest added first" },
  { value: ESort.PRICE_ASC, label: "Price: low to high" },
  { value: ESort.PRICE_DESC, label: "Price: high to low" },
  { value: ESort.NAME, label: "Name: A–Z" },
  { value: ESort.NAME_REVERSED, label: "Name: Z–A" },
];

/** Form state: prices stay as typed until the filter is applied. */
interface FilterDraft {
  /** Empty string means all vendors. */
  vendor: EVendor | "";
  currency: ECurrency;
  priceFrom: string;
  priceTo: string;
  sort: ESort;
  tags: string[];
}

function toDraft(filter: GamesFilterWithCurrency): FilterDraft {
  return {
    vendor: filter.vendor ?? "",
    currency: filter.currency ?? DEFAULT_CURRENCY,
    priceFrom: filter.min === undefined ? "" : String(filter.min),
    priceTo: filter.max === undefined ? "" : String(filter.max),
    sort: filter.sort ?? DEFAULT_SORT,
    tags: filter.tags ?? [],
  };
}

/** Empty input -> undefined, not a number -> null. A decimal comma is accepted. */
function parsePrice(value: string): number | undefined | null {
  const trimmed = value.trim().replace(",", ".");
  if (trimmed === "") return undefined;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

interface CatalogFiltersProps {
  /** The applied filter. Remount the component (`key`) when it changes to reset the form. */
  filter: GamesFilterWithCurrency;
  vendors: EVendor[];
  tags: string[];
  onApply: (filter: GamesFilterWithCurrency) => void;
}

export default function CatalogFilters({ filter, vendors, tags, onApply }: CatalogFiltersProps) {
  const [draft, setDraft] = useState<FilterDraft>(() => toDraft(filter));
  const [priceError, setPriceError] = useState<string | null>(null);

  const set = <K extends keyof FilterDraft>(key: K, value: FilterDraft[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const min = parsePrice(draft.priceFrom);
    const max = parsePrice(draft.priceTo);
    if (min === null || max === null) {
      setPriceError("Enter prices as numbers.");
      return;
    }
    const rangeError = validatePriceRange(min, max);
    setPriceError(rangeError);
    if (rangeError !== null) return;

    onApply({
      min,
      max,
      vendor: draft.vendor || undefined,
      currency: draft.currency,
      sort: draft.sort,
      tags: draft.tags,
    });
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    // The URL may already hold no filter, and then the component is not remounted.
    setDraft(toDraft({}));
    setPriceError(null);
    onApply({});
  };

  return (
    <div className="flex flex-col gap-related-lg">
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="flex flex-wrap items-start gap-related-md"
      >
        {/* TODO: [Stage3] Name search: the backend Game/searchByName takes no GamesFilter and returns no lowest
            price, so it waits for a name field in GamesFilter of GetPagedWithLowestFiltered. */}
        <Field label="Source" htmlFor="filter-vendor" className="flex-[1_1_180px]">
          <Select
            id="filter-vendor"
            value={draft.vendor}
            onChange={(e) => set("vendor", e.target.value as EVendor | "")}
          >
            <option value="">All sources</option>
            {vendors.map((vendor) => (
              <option key={vendor} value={vendor}>
                {vendorLabel(vendor)}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Currency" htmlFor="filter-currency" className="flex-[1_1_120px]">
          <Select
            id="filter-currency"
            value={draft.currency}
            onChange={(e) => set("currency", e.target.value as ECurrency)}
          >
            {Object.values(ECurrency).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </Select>
        </Field>
        <Field
          label="Lowest price"
          labelId="filter-price-label"
          error={priceError}
          errorId="filter-price-error"
          className="flex-[1_1_200px]"
        >
          <div role="group" aria-labelledby="filter-price-label" className="flex gap-related-sm">
            <Input
              type="text"
              inputMode="decimal"
              placeholder="from"
              aria-label="Price from"
              aria-describedby={priceError ? "filter-price-error" : undefined}
              invalid={priceError !== null}
              mono
              value={draft.priceFrom}
              onChange={(e) => set("priceFrom", e.target.value)}
            />
            <Input
              type="text"
              inputMode="decimal"
              placeholder="to"
              aria-label="Price to"
              aria-describedby={priceError ? "filter-price-error" : undefined}
              invalid={priceError !== null}
              mono
              value={draft.priceTo}
              onChange={(e) => set("priceTo", e.target.value)}
            />
          </div>
        </Field>
        <Field label="Sort by" htmlFor="filter-sort" className="flex-[1_1_200px]">
          <Select
            id="filter-sort"
            value={draft.sort}
            onChange={(e) => set("sort", e.target.value as ESort)}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
        <div className="flex gap-related-sm self-end">
          <Button type="submit" variant="primary">
            Apply
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </form>

      <div className="flex flex-col gap-related-md border-t border-component pt-related-md">
        <TagPicker
          label="Tags"
          options={tags}
          selected={draft.tags}
          onChange={(value) => set("tags", value)}
          searchPlaceholder="Find tag"
        />
      </div>
    </div>
  );
}
