"use client";

import { useQuery } from "@tanstack/react-query";
import { formatPrice } from "@/components/helpers/format";
import { ButtonLink, Chip, Icon, Panel, SectionHeading, Thumb } from "@/components/ui";
import OffersTable from "@/components/widgets/game/offersTable";
import RequestErrorAlert from "@/components/widgets/requestErrorAlert";
import type { Game } from "@/domain/entities/game";
import BFFFetch, { type FetchError } from "@/lib/client/fetch/bffFetch";

export default function GameView({ id }: { id: string }) {
  const query = useQuery<Game, FetchError>({
    queryKey: ["game", id],
    queryFn: () =>
      BFFFetch<Game>({
        uri: `/api/games/${encodeURIComponent(id)}`,
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
  const offers = game.offers ?? [];
  const offersCount = offers.length;

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

      <section aria-labelledby="offers-title" className="flex flex-col gap-related-lg">
        <SectionHeading
          id="offers-title"
          title="Offers"
          aside={
            <Chip>
              {offersCount} {offersCount === 1 ? "offer" : "offers"} · lowest price first
            </Chip>
          }
        />
        <Panel padding="none">
          <OffersTable offers={offers} />
        </Panel>
      </section>
    </>
  );
}
