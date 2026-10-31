"use client";

import { useState } from "react";
import { Button, Field, Input, Select } from "@/components/ui";
import TagPicker from "@/components/widgets/tagPicker";

export type CatalogSort = "updated" | "price-asc" | "price-desc" | "name-asc";

// FIXME: [Stage3] Match the backend GamesFilter: min, max, vendor (Steam | InstantGaming | G2A), sort (ESort),
// tags[], genres[]. Sort keys: updated -> newestUpdated, price-asc -> priceAsc, price-desc -> priceDesc,
// name-asc -> name.
export interface CatalogFilterValues {
  // TODO: [Stage3] The backend has no name search yet.
  search: string;
  /** Empty string means all sources. */
  source: string;
  priceFrom: string;
  priceTo: string;
  sort: CatalogSort;
  tags: string[];
  genres: string[];
}

const SORT_OPTIONS: { value: CatalogSort; label: string }[] = [
  { value: "updated", label: "Recently updated first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name-asc", label: "Name: A–Z" },
];

const EMPTY_FILTERS: CatalogFilterValues = {
  search: "",
  source: "",
  priceFrom: "",
  priceTo: "",
  sort: "updated",
  tags: [],
  genres: [],
};

interface CatalogFiltersProps {
  sources: string[];
  tags: string[];
  genres: string[];
}

export default function CatalogFilters({ sources, tags, genres }: CatalogFiltersProps) {
  const [filters, setFilters] = useState<CatalogFilterValues>(EMPTY_FILTERS);

  const set = <K extends keyof CatalogFilterValues>(key: K, value: CatalogFilterValues[K]) =>
    setFilters((current) => ({ ...current, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // FIXME: [Stage3] Apply the filters through the URL query and the BFF catalog route.
  };

  return (
    <div className="flex flex-col gap-related-lg">
      <form
        onSubmit={handleSubmit}
        onReset={() => setFilters(EMPTY_FILTERS)}
        className="flex flex-wrap items-end gap-related-md"
      >
        <Field label="Search" htmlFor="filter-search" className="flex-[3_1_260px]">
          <Input
            id="filter-search"
            type="search"
            placeholder="Product name"
            value={filters.search}
            onChange={(e) => set("search", e.target.value)}
          />
        </Field>
        <Field label="Source" htmlFor="filter-source" className="flex-[1_1_180px]">
          <Select
            id="filter-source"
            value={filters.source}
            onChange={(e) => set("source", e.target.value)}
          >
            <option value="">All sources</option>
            {sources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Lowest price" labelId="filter-price-label" className="flex-[1_1_200px]">
          <div role="group" aria-labelledby="filter-price-label" className="flex gap-related-sm">
            <Input
              type="text"
              inputMode="decimal"
              placeholder="from"
              aria-label="Price from"
              mono
              value={filters.priceFrom}
              onChange={(e) => set("priceFrom", e.target.value)}
            />
            <Input
              type="text"
              inputMode="decimal"
              placeholder="to"
              aria-label="Price to"
              mono
              value={filters.priceTo}
              onChange={(e) => set("priceTo", e.target.value)}
            />
          </div>
        </Field>
        <Field label="Sort by" htmlFor="filter-sort" className="flex-[1_1_200px]">
          <Select
            id="filter-sort"
            value={filters.sort}
            onChange={(e) => set("sort", e.target.value as CatalogSort)}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
        <div className="flex gap-related-sm">
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
          selected={filters.tags}
          onChange={(value) => set("tags", value)}
          searchPlaceholder="Find tag"
        />
        <TagPicker
          label="Genres"
          options={genres}
          selected={filters.genres}
          onChange={(value) => set("genres", value)}
          searchPlaceholder="Find genre"
        />
      </div>
    </div>
  );
}
