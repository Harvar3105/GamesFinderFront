import PageContainer from "@/components/layouts/pageContainer";
import { Chip, PageHeading, Panel } from "@/components/ui";
import CatalogFilters from "@/components/widgets/catalog/catalogFilters";
import CatalogTable from "@/components/widgets/catalog/catalogTable";
import { EVendor } from "@/domain/entities/enums/EVendor";
import { Game } from "@/domain/entities/game";
import Pagination from "@/components/widgets/pagination";
import { PAGE_SIZE_OPTIONS } from "@/config/pagination";

// FIXME: Example values from the mockup. Replace with sources, tags and genres from the BFF.
const TAGS = [
  "Singleplayer",
  "Multiplayer",
  "Co-op",
  "Online Co-op",
  "PvP",
  "Open World",
  "Story Rich",
  "Indie",
  "Early Access",
  "Free to Play",
  "Controller Support",
  "VR",
  "Pixel Graphics",
  "Atmospheric",
  "Sandbox",
  "Survival",
  "Roguelike",
  "Difficult",
  "Casual",
  "Family Friendly",
  "Fantasy",
  "Sci-fi",
  "Horror",
  "Anime",
];
const GENRES = [
  "Action",
  "Adventure",
  "RPG",
  "Strategy",
  "Simulation",
  "Sports",
  "Racing",
  "Puzzle",
  "Platformer",
  "Shooter",
  "Fighting",
  "Stealth",
  "Rhythm",
  "Card Game",
  "MMO",
  "Visual Novel",
  "Tower Defense",
  "City Builder",
  "Metroidvania",
  "Battle Royale",
];

// FIXME: Placeholder games. Replace with the catalog page from the BFF once the endpoint exists.
const GAMES: Game[] = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
  const offers = Object.values(EVendor).map((vendor) => ({
    id: `placeholder-offer-${n}-${vendor}`,
    vendor,
    price: 0,
    currency: "EUR",
    url: "#",
    updatedAt: new Date(),
  }));
  return new Game(
    `placeholder-${n}`,
    new Date(),
    `[Product name ${n}]`,
    n,
    offers,
    "[Short product description]",
  );
});

function readPositiveInt(value: string | string[] | undefined, fallback: number): number {
  const parsed = Number(Array.isArray(value) ? value[0] : value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const perPage = readPositiveInt(params.perPage, PAGE_SIZE_OPTIONS[0]);
  const pageSize = PAGE_SIZE_OPTIONS.includes(perPage) ? perPage : PAGE_SIZE_OPTIONS[0];
  const page = readPositiveInt(params.page, 1);
  const totalItems = GAMES.length;

  return (
    <PageContainer>
      <PageHeading title="Catalog" spread aside={<Chip>{totalItems} products found</Chip>} />

      <Panel as="section" aria-label="Filters and sorting">
        <CatalogFilters sources={Object.values(EVendor)} tags={TAGS} genres={GENRES} />
      </Panel>

      <Panel as="section" padding="none" aria-label="Product list">
        <CatalogTable games={GAMES} />
      </Panel>

      <Pagination page={page} pageSize={pageSize} totalItems={totalItems} />
    </PageContainer>
  );
}
