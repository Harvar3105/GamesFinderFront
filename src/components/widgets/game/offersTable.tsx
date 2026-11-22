import { formatPrice, formatTimeAgo } from "@/components/helpers/format";
import { ButtonLink, Icon, Table, TableCell, TableHeader } from "@/components/ui";
import type { ECurrency } from "@/domain/entities/enums/ECurrency";
import type { Offer } from "@/domain/entities/offer";

interface OffersTableProps {
  offers: Offer[];
  /**
   * Currency the offers are compared in: the backend compares prices only within one currency, without
   * conversion.
   */
  currency: ECurrency;
}

// FIXME: [Stage3] Does not compile: reads `price` and `url`, while Offer has `amount`, `currency` and `vendorsUrl`.
export default function OffersTable({ offers }: OffersTableProps) {
  // FIXME: [Stage3] Compare only the offers in `currency`. Order: available offers with a price, cheapest first;
  // then offers without a price (`amount` / `currency` are nullable); then unavailable ones with an "Unavailable"
  // badge and without the vendor button. Only an available offer with a price may be marked as the lowest.
  const sorted = [...offers].sort((a, b) => a.price - b.price);

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
        {sorted.map((offer, index) => {
          const isLowest = index === 0;
          return (
            <tr key={offer.id}>
              {/* FIXME: [Stage3] Show vendorLabel(offer.vendor) instead of the raw enum value. */}
              <TableCell className="font-semibold">{offer.vendor}</TableCell>
              <TableCell
                className={
                  isLowest
                    ? "text-right font-code font-semibold whitespace-nowrap"
                    : "text-right font-code whitespace-nowrap"
                }
              >
                {formatPrice(offer.price, offer.currency)}
              </TableCell>
              <TableCell className="whitespace-nowrap">{formatTimeAgo(offer.updatedAt)}</TableCell>
              <TableCell className="text-right">
                <ButtonLink
                  href={offer.url}
                  variant={isLowest ? "primary" : "secondary"}
                  aria-label={`Go to ${offer.vendor}`}
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
