import Link from "next/link";
import { formatPrice, formatTimeAgo } from "@/components/helpers/format";
import { findLowestOffer } from "@/components/helpers/gameOffers";
import { Chip, Table, TableCell, TableHeader, ZoomThumb } from "@/components/ui";
import { NavPages } from "@/config/navPages";
import type { Game } from "@/domain/entities/game";

const VISIBLE_SOURCES = 2;

function SourceChips({ sources }: { sources: string[] }) {
  const hidden = sources.length - VISIBLE_SOURCES;

  return (
    <div className="flex flex-wrap gap-related-xs">
      {sources.slice(0, VISIBLE_SOURCES).map((source) => (
        <Chip key={source}>{source}</Chip>
      ))}
      {hidden > 0 && <Chip>+{hidden}</Chip>}
    </div>
  );
}

export default function CatalogTable({ games }: { games: Game[] }) {
  return (
    <Table highlightHover>
      <thead>
        <tr>
          <TableHeader className="w-30">Photo</TableHeader>
          <TableHeader>Name</TableHeader>
          <TableHeader>Description</TableHeader>
          <TableHeader align="right">Original price</TableHeader>
          <TableHeader align="right">Lowest price</TableHeader>
          <TableHeader>Sources</TableHeader>
          <TableHeader>Updated</TableHeader>
        </tr>
      </thead>
      <tbody>
        {games.map((game) => {
          const lowestOffer = findLowestOffer(game.offers);
          return (
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
                {lowestOffer === null ? "—" : formatPrice(lowestOffer.price, lowestOffer.currency)}
              </TableCell>
              <TableCell>
                <SourceChips sources={(game.offers ?? []).map((offer) => offer.vendor)} />
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {formatTimeAgo(game.updatedAt ?? game.createdAt)}
              </TableCell>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
