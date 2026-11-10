import type { Entity } from "./entity";
import type { ECurrency } from "./enums/ECurrency";
import type { EVendor } from "./enums/EVendor";

export interface Offer extends Entity {
  gameId: string;
  vendorsGameId: string;
  vendor: EVendor;
  vendorsUrl: string;
  available: boolean;
  amount: number | null;
  currency: ECurrency | null;
  offerName: string;
}
