import { formatPrice, formatTimeAgo } from "@/components/helpers/format";
import { ButtonLink, Icon, Table, TableCell, TableHeader } from "@/components/ui";
import type { Offer } from "@/domain/entities/offer";

export default function OffersTable({ offers }: { offers: Offer[] }) {
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
