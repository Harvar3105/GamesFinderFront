import { ECurrency } from "domain/enums/ECurrency";
import { EVendor } from "domain/enums/EVendor";
import Entity from "./entity";

export default class GameOffer extends Entity {
  public gameId: string;
  public vendorsGameId: string;
  public vendor: EVendor;
  public vendorsUrl: string;
  public available: boolean;
  public amount?: number;
  public currency?: ECurrency;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    gameId: string,
    vendorsGameId: string,
    vendor: EVendor,
    vendorsUrl: string,
    available: boolean,
    amount?: number,
    currency?: ECurrency,
  ) {
    super(id, createdAt, updatedAt);
    this.gameId = gameId;
    this.vendorsGameId = vendorsGameId;
    this.vendor = vendor;
    this.vendorsUrl = vendorsUrl;
    this.available = available;
    this.amount = amount;
    this.currency = currency;
  }
}
