"use client";

import { useQuery } from "@tanstack/react-query";
import { BffRoutes } from "@/config/bffRoutes";
import { formatPrice } from "@/components/helpers/format";
import { useGameOffers } from "@/components/hooks/useGames";
import { ButtonLink, Chip, Icon, Panel, SectionHeading, Thumb } from "@/components/ui";
import OffersTable from "@/components/widgets/game/offersTable";
import RequestErrorAlert from "@/components/widgets/requestErrorAlert";
import type { ECurrency } from "@/domain/entities/enums/ECurrency";
import type { Game } from "@/domain/entities/game";
import BFFFetch, { type FetchError } from "@/lib/client/fetch/bffFetch";

interface GameViewProps {
  id: string;
  /** Currency of the shown offers, resolved by the page. */
  currency: ECurrency;
}

export default function GameView({ id, currency }: GameViewProps) {
  const query = useQuery<Game, FetchError>({
    queryKey: ["game", id],
    queryFn: () =>
      BFFFetch<Game>({
        uri: BffRoutes.game(id),
        method: "GET",
      }),
  });

  if (query.isPending) {
    return (
      <Panel as="section" aria-busy>
        <p>Loading…</p>
      </Panel>
    );
  }

  if (query.isError) {
    return (
      <RequestErrorAlert
        error={query.error}
        failureTitle="Failed to load the product"
        serverErrorText="The product is currently unavailable. Please try again later."
      />
    );
  }

  const game = query.data;

  return (
    <>
      <Panel
        as="section"
        padding="attention"
        aria-labelledby="product-title"
        className="flex flex-wrap gap-attention-sm"
      >
        <Thumb
          src={game.headerImage}
          alt={game.name}
          placeholder="Product image"
          sizes="(min-width: 840px) 640px, 100vw"
          fit="contain"
          className="aspect-video max-w-[640px] flex-[1_1_420px]"
        />

        <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-attention-sm">
          <div className="flex flex-col gap-related-sm">
            <h1 id="product-title" className="typo-h1">
              {game.name}
            </h1>
            <div className="flex flex-wrap items-center gap-related-sm">
              <span className="typo-small">Store ID:</span>
              <Chip mono>{game.steamID}</Chip>
            </div>
          </div>

          <dl className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-related-lg">
            <div className="flex flex-col gap-related-xs">
              <dt className="typo-small">Original price</dt>
              <dd className="typo-price-lg">
                {game.initialPrice === null || game.initialCurrency === null
                  ? "—"
                  : formatPrice(game.initialPrice, game.initialCurrency)}
              </dd>
            </div>
            <div className="flex flex-col gap-related-xs">
              <dt className="typo-small">Original store</dt>
              <dd>
                {game.steamURL === null ? (
                  "—"
                ) : (
                  <ButtonLink
                    href={game.steamURL}
                    variant="secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in store
                    <Icon name="arrow_forward" />
                  </ButtonLink>
                )}
              </dd>
            </div>
          </dl>

          <div className="flex flex-col gap-related-sm">
            <h2 className="typo-h2">Description</h2>
            <p className="max-w-[72ch]">{game.description}</p>
          </div>
        </div>
      </Panel>

      <GameOffers gameId={game.id} currency={currency} />
    </>
  );
}

function GameOffers({ gameId, currency }: { gameId: string; currency: ECurrency }) {
  const query = useGameOffers({ gameId, currency, isAvailable: true });
  const offersCount = query.data?.offers.length;

  return (
    <section aria-labelledby="offers-title" className="flex flex-col gap-related-lg">
      <SectionHeading
        id="offers-title"
        title="Offers"
        aside={
          offersCount !== undefined && (
            <Chip>
              {offersCount} {offersCount === 1 ? "offer" : "offers"} · lowest price first
            </Chip>
          )
        }
      />
      {query.isPending ? (
        <p aria-busy>Loading…</p>
      ) : query.isError ? (
        <RequestErrorAlert
          error={query.error}
          failureTitle="Failed to load the offers"
          serverErrorText="Offers are currently unavailable. Please try again later."
        />
      ) : (
        <Panel padding="none">
          <OffersTable offers={query.data.offers} />
        </Panel>
      )}
    </section>
  );
}
