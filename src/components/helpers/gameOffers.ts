import type { Offer } from "@/domain/entities/offer";

export function findLowestOffer(offers: Offer[] = []): Offer | null {
  return offers.reduce<Offer | null>(
    (lowest, offer) => (lowest === null || offer.price < lowest.price ? offer : lowest),
    null,
  );
}
