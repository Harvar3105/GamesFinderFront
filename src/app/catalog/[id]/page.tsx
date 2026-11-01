import { formatPrice } from "@/components/helpers/format";
import PageContainer from "@/components/layouts/pageContainer";
import { ButtonLink, Chip, Icon, Panel, SectionHeading, Thumb } from "@/components/ui";
import OffersTable from "@/components/widgets/game/offersTable";
import { NavPages } from "@/config/navPages";
import { ECurrency } from "@/domain/entities/enums/ECurrency";
import { EVendor } from "@/domain/entities/enums/EVendor";
import { Game } from "@/domain/entities/game";

// FIXME: Placeholder game. Load the game by id from the BFF once the endpoint exists
// (and call notFound() when it does not exist).
function getPlaceholderGame(id: string): Game {
  const offers = Object.values(EVendor).map((vendor) => ({
    id: `placeholder-offer-${vendor}`,
    vendor,
    price: 0,
    currency: "EUR",
    url: "#",
    updatedAt: new Date(),
  }));
  const game = new Game(
    id,
    new Date(),
    "[Product name]",
    0,
    offers,
    "[Product description from the original store]",
    "#",
  );
  game.initialPrice = 0;
  game.initialCurrency = ECurrency.EUR;
  return game;
}

export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = getPlaceholderGame(id);
  const offers = game.offers ?? [];
  const offersCount = offers.length;

  return (
    <PageContainer>
      <ButtonLink
        href={NavPages.catalog}
        variant="ghost"
        size="compact"
        className="-ml-related-sm self-start"
      >
        <Icon name="arrow_back" />
        Back to catalog
      </ButtonLink>

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
    </PageContainer>
  );
}
