// TODO: Check the fields against the backend offer contract.
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
