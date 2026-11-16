import { ExternalLinks } from "@/config/externalLinksConfig";
import { ButtonLink, Icon } from "@/components/ui";

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-related-lg bg-container px-edge-x py-attention-sm">
      <span className="font-code">© 2026 GAMES FINDER</span>
      <div className="flex flex-wrap items-center gap-related-sm">
        <ButtonLink href={ExternalLinks.github} variant="ghost">
          <Icon name="code_xml" />
          GitHub
        </ButtonLink>
        <ButtonLink href={ExternalLinks.contactEmailHref} variant="secondary">
          <Icon name="mail" />
          Contact us
        </ButtonLink>
        <ButtonLink href={ExternalLinks.portfolio} variant="ghost">
          <Icon name="language" />
          Portfolio
        </ButtonLink>
      </div>
    </footer>
  );
}
