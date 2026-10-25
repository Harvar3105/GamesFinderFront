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
