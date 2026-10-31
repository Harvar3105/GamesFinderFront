import PageContainer from "@/components/layouts/pageContainer";
import { Chip, PageHeading, Panel } from "@/components/ui";
import CatalogFilters from "@/components/widgets/catalog/catalogFilters";
import CatalogTable from "@/components/widgets/catalog/catalogTable";
import type { Product } from "@/domain/entities/product";
import Pagination from "@/components/widgets/pagination";
import { PAGE_SIZE_OPTIONS } from "@/config/pagination";

// FIXME: [Stage3] Load sources from GameOffer/vendors.
// TODO: [Stage3] The backend has no endpoint for the tag and genre lists yet; these are mockup values.
const SOURCES: string[] = [];
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

// FIXME: [Stage3] Load the page from Game/GetPagedWithLowestFiltered ({ games: [{ game, lowestPrice }],
// totalGamesCount }) in the user's preferred currency.
const PRODUCTS: Product[] = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
  id: `placeholder-${n}`,
  name: `[Product name ${n}]`,
  description: "[Short product description]",
  imageUrl: null,
  originalPrice: 0,
  lowestPrice: 0,
  currency: "EUR",
  sources: ["[Source A]", "[Source B]", "[Source C]"],
  updatedAt: new Date(),
}));

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
  const totalItems = PRODUCTS.length;

  return (
    <PageContainer>
      <PageHeading title="Catalog" spread aside={<Chip>{totalItems} products found</Chip>} />

      <Panel as="section" aria-label="Filters and sorting">
        <CatalogFilters sources={SOURCES} tags={TAGS} genres={GENRES} />
      </Panel>

      <Panel as="section" padding="none" aria-label="Product list">
        <CatalogTable products={PRODUCTS} />
      </Panel>

      <Pagination page={page} pageSize={pageSize} totalItems={totalItems} />
    </PageContainer>
  );
}
