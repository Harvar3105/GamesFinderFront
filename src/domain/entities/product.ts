import type { Offer } from "./offer";

// FIXME: [Stage3] Map from the backend Game + lowestPrice: name, description, headerImage, initialPrice and
// initialCurrency (original price), steamId, steamUrl, storeMetadata (tags, genres, reviews), isDLC, isReleased,
// updatedAt. Currency is "EUR" | "USD".
export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  /** Price in the original store. */
  originalPrice: number | null;
  lowestPrice: number;
  /** ISO 4217 code, e.g. "EUR". */
  currency: string;
  /** Names of the sources (vendors) that have an offer. */
  // TODO: [Stage3] The catalog endpoint returns no offers, so sources are unknown; ask the backend or drop them.
  sources: string[];
  updatedAt: Date | string;
}

// FIXME: [Stage4] storeId and storeUrl are Game.steamId and Game.steamUrl; offers come from
// GameOffer/getGameOffers (Game.offers is always empty).
export interface ProductDetails extends Product {
  /** Product ID in the original store. */
  storeId: string;
  /** Product page in the original store. */
  storeUrl: string;
  offers: Offer[];
}
