import Link from "next/link";
import { formatPrice, formatTimeAgo } from "@/components/helpers/format";
import { vendorLabel } from "@/components/helpers/vendors";
import { Chip, Table, TableCell, TableHeader, ZoomThumb } from "@/components/ui";
import { NavPages } from "@/config/navPages";
import type { ECurrency } from "@/domain/entities/enums/ECurrency";
import type { EVendor } from "@/domain/entities/enums/EVendor";
import type { GameWithLowestPrice } from "@/lib/shared/contracts/game/gamesFiltered";

const MAX_VISIBLE_VENDORS = 2;

function VendorChips({ vendors }: { vendors: EVendor[] | null }) {
  if (vendors === null || vendors.length === 0) return <>—</>;

  const visible = vendors.slice(0, MAX_VISIBLE_VENDORS);
  const hidden = vendors.slice(MAX_VISIBLE_VENDORS);

  return (
    <div className="flex flex-wrap gap-related-xs">
      {visible.map((vendor) => (
        <Chip key={vendor}>{vendorLabel(vendor)}</Chip>
      ))}
      {hidden.length > 0 && (
        <Chip title={hidden.map(vendorLabel).join(", ")}>+{hidden.length}</Chip>
      )}
    </div>
  );
}

interface CatalogTableProps {
  items: GameWithLowestPrice[];
  /** Currency of the lowest prices. */
  currency: ECurrency;
}

export default function CatalogTable({ items, currency }: CatalogTableProps) {
  return (
    <Table highlightHover>
      <thead>
        <tr>
          <TableHeader className="w-30">Photo</TableHeader>
          <TableHeader>Name</TableHeader>
          <TableHeader>Description</TableHeader>
          <TableHeader>Sources</TableHeader>
          <TableHeader align="right">Original price</TableHeader>
          <TableHeader align="right">Lowest price</TableHeader>
          <TableHeader>Updated</TableHeader>
        </tr>
      </thead>
      <tbody>
        {items.map(({ game, lowestPrice, availableVendors }) => (
          <tr key={game.id}>
            <TableCell>
              <ZoomThumb
                src={game.headerImage}
                alt=""
                placeholder="Photo"
                sizes="96px"
                className="aspect-video w-24"
              />
            </TableCell>
            <TableCell>
              <Link href={NavPages.game(game.id)} className="font-semibold">
                {game.name}
              </Link>
            </TableCell>
            <TableCell className="max-w-[360px]">{game.description}</TableCell>
            <TableCell>
              <VendorChips vendors={availableVendors} />
            </TableCell>
            <TableCell className="text-right font-code whitespace-nowrap">
              {game.initialPrice === null || game.initialCurrency === null
                ? "—"
                : formatPrice(game.initialPrice, game.initialCurrency)}
            </TableCell>
            <TableCell className="text-right font-code font-semibold whitespace-nowrap">
              {lowestPrice === null ? "—" : formatPrice(lowestPrice, currency)}
            </TableCell>
            <TableCell className="whitespace-nowrap">{formatTimeAgo(game.updatedAt)}</TableCell>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
