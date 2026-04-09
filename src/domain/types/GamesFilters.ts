import { ESortOption } from "@/domain/enums/ESortOption";

export interface PriceRange {
  min?: number;
  max?: number;
}

export interface AvailabilityFilter {
  steam?: boolean;
  instantGaming?: boolean;
}

export interface SearchParams {
  query?: string;
  searchByName?: boolean;
  searchByDescription?: boolean;
  searchByVendorId?: boolean;
}

export interface GamesFiltersObject {
  search?: SearchParams;
  filters?: {
    availability?: AvailabilityFilter;
    priceRange?: PriceRange;
  };
  sort?: ESortOption;
}
