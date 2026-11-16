import Link from "next/link";
import { formatPrice, formatTimeAgo } from "@/components/helpers/format";
import { Table, TableCell, TableHeader, ZoomThumb } from "@/components/ui";
import { NavPages } from "@/config/navPages";
import type { ECurrency } from "@/domain/entities/enums/ECurrency";
import type { GameWithLowestPrice } from "@/lib/shared/contracts/game/gamesFiltered";

// TODO: [Stage3] Bring back the "Sources" column (vendor chips, at most 2 and "+N") once the backend
// GetPagedWithLowestFiltered returns the vendors of every game: it returns games without offers.
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
          <TableHeader align="right">Original price</TableHeader>
          <TableHeader align="right">Lowest price</TableHeader>
          <TableHeader>Updated</TableHeader>
        </tr>
      </thead>
      <tbody>
        {items.map(({ game, lowestPrice }) => (
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
