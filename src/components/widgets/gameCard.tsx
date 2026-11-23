import Link from "next/link";
import { formatPrice, formatTimeAgo } from "@/components/helpers/format";
import { vendorLabel } from "@/components/helpers/vendors";
import { Chip, Thumb, panelClass } from "@/components/ui";
import { NavPages } from "@/config/navPages";
import type { ECurrency } from "@/domain/entities/enums/ECurrency";
import type { CatalogGame } from "@/lib/shared/contracts/game/catalogPage";

interface GameCardProps {
  item: CatalogGame;
  /** Currency of the lowest price. */
  currency: ECurrency;
}

export default function GameCard({
  item: { game, lowestPrice, availableVendors },
  currency,
}: GameCardProps) {
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
          {lowestPrice === null ? "—" : `from ${formatPrice(lowestPrice, currency)}`}
        </span>
      </div>
      <div className="mt-auto flex items-center justify-between gap-related-sm">
        <span className="typo-small">{formatTimeAgo(game.updatedAt)}</span>
        {availableVendors.length > 0 && (
          <Chip title={availableVendors.map(vendorLabel).join(", ")}>
            {availableVendors.length} {availableVendors.length === 1 ? "source" : "sources"}
          </Chip>
        )}
      </div>
    </Link>
  );
}
