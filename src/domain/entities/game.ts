import { ECurrency } from "domain/enums/ECurrency";
import Entity from "./entity";
import GameOffer from "./gameOffer";

export default class Game extends Entity {
  public name: string;
  public steamUrl?: string;
  public steamId?: number;
  public inPackages: number[] = [];
  public isDLC: boolean;
  public Description?: string;
  public headerImage?: string;
  public offers: GameOffer[] = [];
  public isReleased: boolean;
  public initialPrice?: number;
  public initialCurrency?: ECurrency;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    isDLC: boolean,
    isReleased: boolean,
    steamUrl?: string,
    steamId?: number,
    Description?: string,
    headerImage?: string,
    initialPrice?: number,
    initialCurrency?: ECurrency,
    initialOffers?: GameOffer[],
  ) {
    super(id, createdAt, updatedAt);
    this.name = name;
    this.isDLC = isDLC;
    this.isReleased = isReleased;
    this.steamUrl = steamUrl;
    this.steamId = steamId;
    this.Description = Description;
    this.headerImage = headerImage;
    this.initialPrice = initialPrice;
    this.initialCurrency = initialCurrency;
    if (initialOffers) this.offers = initialOffers;
  }
}
