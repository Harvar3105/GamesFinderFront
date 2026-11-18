import PageContainer from "@/components/layouts/pageContainer";
import CatalogView from "@/components/widgets/catalog/catalogView";
import { PAGE_SIZE_OPTIONS } from "@/config/pagination";
import { readGamesFilter } from "@/lib/shared/gamesFilterParams";
import { toQueryString } from "@/lib/toQueryString";

// TODO: [Stage3] Load tags from the BFF once the backend lists them; example values from the mockup for
// now. The backend matches them exactly against the Steam store tags.
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
  const filter = readGamesFilter(toQueryString(params));

  return (
    <PageContainer>
      <CatalogView page={page} pageSize={pageSize} filter={filter} tags={TAGS} />
    </PageContainer>
  );
}
