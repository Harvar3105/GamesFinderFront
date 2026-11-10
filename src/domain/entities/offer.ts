import Entity from "./entity";
import { ECurrency } from "./enums/ECurrency";
import type { EVendor } from "./enums/EVendor";

export class Offer extends Entity {
  public gameId: string;
  public vendorsGameId: string;
  public vendor: EVendor;
  public vendorsUrl: string;
  public available: boolean;
  public amount: number | null;
  public currency: ECurrency | null;
  public offerName: string;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date | undefined,
    gameId: string,
    vendorsGameId: string,
    vendor: EVendor,
    vendorsUrl: string,
    available: boolean,
    offerName: string,
    amount?: number,
    currency?: ECurrency,
  ) {
    super(id, createdAt, updatedAt);
    this.gameId = gameId;
    this.vendorsGameId = vendorsGameId;
    this.vendor = vendor;
    this.vendorsUrl = vendorsUrl;
    this.available = available;
    this.amount = amount ?? null;
    this.currency = currency ?? null;
    this.offerName = offerName;
  }
}
