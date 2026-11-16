import { ECurrency } from "@/domain/entities/enums/ECurrency";
import { ESort } from "@/domain/entities/enums/ESort";

// TODO: [Stage5] Default to the signed-in user's UserData.preferredCurrency.
export const DEFAULT_CURRENCY = ECurrency.USD;
/** The backend default sort. */
export const DEFAULT_SORT = ESort.NEWEST_UPDATED;
/** Games in the "Recently updated" block of the home page. */
export const RECENT_GAMES_COUNT = 4;
