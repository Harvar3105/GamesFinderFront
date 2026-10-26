import Link from "next/link";
import { formatPrice, formatTimeAgo } from "@/components/helpers/format";
import { findLowestOffer } from "@/components/helpers/gameOffers";
import { Chip, Thumb, panelClass } from "@/components/ui";
import { NavPages } from "@/config/navPages";
import type { Game } from "@/domain/entities/game";

export default function GameCard({ game }: { game: Game }) {
  const lowestOffer = findLowestOffer(game.offers);
  const vendorsCount = game.offers?.length ?? 0;

  return (
    <Link
      href={NavPages.game(game.id)}
      className={panelClass("related", "flex flex-col gap-related-md no-underline")}
    >
      <Thumb
        src={game.headerImage}
        alt=""
        className="aspect-video w-full"
        sizes="(min-width: 600px) 25vw, 100vw"
      />
      <div className="flex flex-col gap-related-xs">
        <span className="font-semibold">{game.name}</span>
        <span className="font-code">
          {lowestOffer === null
            ? "—"
            : `from ${formatPrice(lowestOffer.price, lowestOffer.currency)}`}
        </span>
      </div>
      <div className="flex flex-wrap justify-between gap-related-sm">
        <Chip>
          {vendorsCount} {vendorsCount === 1 ? "source" : "sources"}
        </Chip>
        <span className="typo-small">{formatTimeAgo(game.updatedAt ?? game.createdAt)}</span>
      </div>
    </Link>
  );
}
