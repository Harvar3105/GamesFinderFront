// FIXME: [Stage4] Match the backend GameOffer: gameId, vendor (Steam | InstantGaming | G2A), vendorsGameId,
// vendorsUrl, available, amount (nullable), currency (nullable), offerName.
export interface Offer {
  id: string;
  vendor: string;
  price: number;
  /** ISO 4217 code, e.g. "EUR". */
  currency: string;
  /** Product page on the vendor's site. */
  url: string;
  updatedAt: Date | string;
}
