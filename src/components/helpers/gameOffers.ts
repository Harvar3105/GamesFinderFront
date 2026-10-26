import type { Offer } from "@/domain/entities/offer";

export function findLowestOffer(offers: Offer[] | null | undefined): Offer | null {
  return (offers ?? []).reduce<Offer | null>(
    (lowest, offer) => (lowest === null || offer.price < lowest.price ? offer : lowest),
    null,
  );
}
