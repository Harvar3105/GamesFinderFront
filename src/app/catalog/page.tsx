import PageContainer from "@/components/layouts/pageContainer";
import CatalogView from "@/components/widgets/catalog/catalogView";
import { PAGE_SIZE_OPTIONS } from "@/config/pagination";
import { readPageCurrency } from "@/lib/server/currency";
import { readGamesFilter } from "@/lib/shared/gamesFilterParams";
import { toQueryString } from "@/lib/toQueryString";

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
  const filter = {
    ...readGamesFilter(toQueryString(params)),
    currency: await readPageCurrency(params.currency),
  };

  return (
    <PageContainer>
      <CatalogView page={page} pageSize={pageSize} filter={filter} />
    </PageContainer>
  );
}
