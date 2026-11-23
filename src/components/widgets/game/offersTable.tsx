import { formatPrice, formatTimeAgo } from "@/components/helpers/format";
import { vendorLabel } from "@/components/helpers/vendors";
import { ButtonLink, Icon, Table, TableCell, TableHeader } from "@/components/ui";
import type { Offer } from "@/domain/entities/offer";

interface OffersTableProps {
  /** Available offers in one currency: the backend filters them by availability and currency. */
  offers: Offer[];
}

/** Cheapest first; offers without a price last. */
function sortOffers(offers: Offer[]): Offer[] {
  return [...offers].sort((a, b) => {
    if (a.amount === null || b.amount === null) {
      return Number(a.amount === null) - Number(b.amount === null);
    }
    return a.amount - b.amount;
  });
}

function offerPrice(offer: Offer): string {
  return offer.amount === null || offer.currency === null
    ? "—"
    : formatPrice(offer.amount, offer.currency);
}

export default function OffersTable({ offers }: OffersTableProps) {
  const sorted = sortOffers(offers);
  const lowest = sorted.length > 0 && sorted[0].amount !== null ? sorted[0] : null;

  return (
    <Table minWidth={640}>
      <thead>
        <tr>
          <TableHeader>Vendor</TableHeader>
          <TableHeader align="right">Price</TableHeader>
          <TableHeader>Updated</TableHeader>
          <TableHeader align="right">
            <span className="sr-only">Action</span>
          </TableHeader>
        </tr>
      </thead>
      <tbody>
        {sorted.map((offer) => {
          const isLowest = offer === lowest;
          const vendor = vendorLabel(offer.vendor);
          return (
            <tr key={offer.id}>
              <TableCell className="font-semibold">{vendor}</TableCell>
              <TableCell
                className={
                  isLowest
                    ? "text-right font-code font-semibold whitespace-nowrap"
                    : "text-right font-code whitespace-nowrap"
                }
              >
                {offerPrice(offer)}
              </TableCell>
              <TableCell className="whitespace-nowrap">{formatTimeAgo(offer.updatedAt)}</TableCell>
              <TableCell className="text-right">
                <ButtonLink
                  href={offer.vendorsUrl}
                  variant={isLowest ? "primary" : "secondary"}
                  aria-label={`Go to ${vendor}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Go to vendor
                  <Icon name="arrow_forward" />
                </ButtonLink>
              </TableCell>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
