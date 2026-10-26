import PageContainer from "@/components/layouts/pageContainer";
import CatalogView from "@/components/widgets/catalog/catalogView";
import { PAGE_SIZE_OPTIONS } from "@/config/pagination";

// FIXME: Example values from the mockup. Replace with tags and genres from the BFF.
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

  return (
    <PageContainer>
      <CatalogView page={page} pageSize={pageSize} tags={TAGS} genres={GENRES} />
    </PageContainer>
  );
}
