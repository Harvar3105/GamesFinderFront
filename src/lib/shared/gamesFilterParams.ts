import { ECurrency } from "@/domain/entities/enums/ECurrency";
import { ESort } from "@/domain/entities/enums/ESort";
import { EVendor } from "@/domain/entities/enums/EVendor";
import type { GamesFilter } from "@/lib/shared/contracts/game/gamesFiltered";

export interface GamesFilterWithCurrency extends GamesFilter {
  currency?: ECurrency;
}

function readEnum<T extends string>(
  values: Record<string, T>,
  value: string | null,
): T | undefined {
  return Object.values(values).find((item) => item === value);
}

function readNumber(value: string | null): number | undefined {
  if (value === null || value.trim() === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function readList(params: URLSearchParams, key: string): string[] | undefined {
  const values = params.getAll(key).filter((value) => value.trim() !== "");
  return values.length > 0 ? values : undefined;
}

/**
 * Reads the filter from the catalog page URL or the GET /api/games query. Unknown and malformed values are
 * dropped; the price range is checked separately with `validatePriceRange`.
 */
export function readGamesFilter(params: URLSearchParams): GamesFilterWithCurrency {
  return {
    min: readNumber(params.get("min")),
    max: readNumber(params.get("max")),
    vendor: readEnum(EVendor, params.get("vendor")),
    sort: readEnum(ESort, params.get("sort")),
    tags: readList(params, "tags"),
    genres: readList(params, "genres"),
    currency: readEnum(ECurrency, params.get("currency")),
  };
}

/** The backend rules of GamesFilter.Min / Max: the backend answers 400 to a range that breaks them. */
export function validatePriceRange(
  min: number | undefined,
  max: number | undefined,
): string | null {
  if (min !== undefined && min < 0) return "The lower price must not be negative.";
  if (max !== undefined && max < 1) return "The upper price must be at least 1.";
  if (min !== undefined && max !== undefined && min >= max) {
    return "The lower price must be less than the upper price.";
  }
  return null;
}
