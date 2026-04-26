import { ESortOption } from "@/domain/enums/ESortOption";

export interface PriceRange {
  min?: number;
  max?: number;
}

export interface AvailabilityFilter {
  steam?: boolean;
  instantGaming?: boolean;
}

export interface GamesFiltersObject {
  query?: string;
  filters?: {
    availability?: AvailabilityFilter;
    priceRange?: PriceRange;
  };
  sort?: ESortOption;
}
