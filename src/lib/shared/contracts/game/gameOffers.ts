import type { ECurrency } from "@/domain/entities/enums/ECurrency";
import type { Offer } from "@/domain/entities/offer";

/** Query of the backend GameOffer/getGameOffers. */
export interface GameOffersRequest {
  gameId: string;
  /** Only offers in this currency; omitted for offers in every currency. */
  currency?: ECurrency;
  /** true for available offers only, false for unavailable ones only; omitted for both. */
  isAvailable?: boolean;
}

/** Response of GET /api/games/<id>/offers and of the backend GameOffer/getGameOffers. */
export interface GameOffersResponse {
  offers: Offer[];
}
