import { ECurrency } from "@/domain/enums/eCurrency";
import { GamesFiltersObject } from "@/domain/types/gamesFilters";

export interface GetGamesPagedParams {
  page: number;
  pageSize: number;
  currency?: ECurrency;
  filters?: GamesFiltersObject;
}
