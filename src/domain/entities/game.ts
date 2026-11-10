import type { Entity } from "./entity";
import type { ECurrency } from "./enums/ECurrency";
import type { Offer } from "./offer";

export interface GameStoreMetadata {
  tags: string[];
  genres: string[];
  positiveReviews: number;
  negativeReviews: number;
  positiveReviewsPercent: number;
}

export interface Game extends Entity {
  name: string;
  steamURL: string | null;
  steamID: number;
  inPackages: number[];
  isDLC: boolean;
  description: string | null;
  headerImage: string | null;
  /** Empty or missing when the endpoint returns games without offers (e.g. the paged list). */
  offers?: Offer[] | null;
  isReleased: boolean;
  initialPrice: number | null;
  initialCurrency: ECurrency | null;
  storeMetadata: GameStoreMetadata | null;
}
