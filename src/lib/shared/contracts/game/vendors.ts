import type { EVendor } from "@/domain/entities/enums/EVendor";

/** Response of GET /api/vendors and of the backend GameOffer/vendors endpoint. */
export interface VendorsResponse {
  vendors: EVendor[];
}
