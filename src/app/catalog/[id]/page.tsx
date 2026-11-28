import PageContainer from "@/components/layouts/pageContainer";
import { ButtonLink, Icon } from "@/components/ui";
import GameView from "@/components/widgets/game/gameView";
import { NavPages } from "@/config/navPages";
import { readPageCurrency } from "@/lib/server/currency";

export default async function GamePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const currency = await readPageCurrency((await searchParams).currency);

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

      <GameView id={id} currency={currency} />
    </PageContainer>
  );
}
