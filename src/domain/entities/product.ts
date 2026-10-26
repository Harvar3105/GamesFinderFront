import type { Offer } from "./offer";

// TODO: Check the fields against the backend catalog contract.
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
  sources: string[];
  updatedAt: Date | string;
}

// TODO: Check the fields against the backend product details contract.
export interface ProductDetails extends Product {
  /** Product ID in the original store. */
  storeId: string;
  /** Product page in the original store. */
  storeUrl: string;
  offers: Offer[];
}
