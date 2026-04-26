import { ECurrency } from "@/domain/enums/ECurrency";
import { GamesFiltersObject } from "@/domain/types/GamesFilters";

export interface GetGamesPagedParams {
  page: number;
  pageSize: number;
  currency?: ECurrency;
  filters?: GamesFiltersObject;
}
