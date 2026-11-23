import type { Entity } from "./entity";
import type { ECurrency } from "./enums/ECurrency";

export interface GameStoreMetadata {
  tags: string[];
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
  isReleased: boolean;
  initialPrice: number | null;
  initialCurrency: ECurrency | null;
  storeMetadata: GameStoreMetadata | null;
}
