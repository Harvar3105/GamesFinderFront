import PageContainer from "@/components/layouts/pageContainer";
import { ButtonLink, Icon } from "@/components/ui";
import GameView from "@/components/widgets/game/gameView";
import { NavPages } from "@/config/navPages";

export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

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

      <GameView id={id} />
    </PageContainer>
  );
}
