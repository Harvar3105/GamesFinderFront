import Entity from "./entity";
import type { ECurrency } from "./enums/ECurrency";
import type { Offer } from "./offer";

export class GameStoreMetadata {
  public tags: string[];
  public genres: string[];
  public positiveReviews: number;
  public negativeReviews: number;
  public positiveReviewsPercent: number;

  constructor(
    tags: string[] = [],
    genres: string[] = [],
    positiveReviews: number = 0,
    negativeReviews: number = 0,
    positiveReviewsPercent: number = 0,
  ) {
    this.tags = tags;
    this.genres = genres;
    this.positiveReviews = positiveReviews;
    this.negativeReviews = negativeReviews;
    this.positiveReviewsPercent = positiveReviewsPercent;
  }

  public toString(): string {
    return `Tags: ${this.tags.join(", ")}, Genres: ${this.genres.join(", ")}, PositiveReviews: ${this.positiveReviews}, NegativeReviews: ${this.negativeReviews}, PositiveReviewsPercent: ${this.positiveReviewsPercent}%`;
  }
}

export class Game extends Entity {
  public name: string;
  public steamURL: string | null;
  public steamID: number;
  public inPackages: number[];
  public isDLC: boolean;
  public description: string | null;
  public headerImage: string | null;
  public offers?: Offer[] | null;
  public isReleased: boolean;
  public initialPrice: number | null;
  public initialCurrency: ECurrency | null;
  public storeMetadata: GameStoreMetadata | null;

  constructor(
    id: string,
    createdAt: Date,
    name: string,
    steamID: number,
    initialOffers?: Offer[],
    description?: string | null,
    steamURL?: string | null,
    headerImage?: string | null,
    storeMetadata?: GameStoreMetadata | null,
  ) {
    super(id, createdAt);
    this.name = name;
    this.steamID = steamID;
    this.steamURL = steamURL ?? null;
    this.inPackages = [];
    this.isDLC = false;
    this.description = description ?? null;
    this.headerImage = headerImage ?? null;
    this.offers = initialOffers ?? [];
    this.isReleased = false;
    this.initialPrice = null;
    this.initialCurrency = null;
    this.storeMetadata = storeMetadata ?? null;
  }

  public toString(): string {
    return `Game:\n${super.toString()}, name: ${this.name}, steamID: ${this.steamID}, offers count: ${this.offers ? this.offers.length : "N/A"}\n\tsteamURL: ${this.steamURL}\n\tmetadata: ${this.storeMetadata}`;
  }
}
