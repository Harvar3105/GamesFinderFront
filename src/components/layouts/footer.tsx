import { CONTACT_EMAIL_HREF, GITHUB_URL } from "@/config/externalLinks";
import { ButtonLink, Icon } from "@/components/ui";

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-related-lg bg-container px-edge-x py-attention-sm">
      <span className="font-code">© 2026 GAMES FINDER</span>
      <div className="flex flex-wrap items-center gap-related-sm">
        <ButtonLink href={GITHUB_URL} variant="ghost">
          <Icon name="code_xml" />
          GitHub
        </ButtonLink>
        <ButtonLink href={CONTACT_EMAIL_HREF} variant="secondary">
          <Icon name="mail" />
          Contact us
        </ButtonLink>
      </div>
    </footer>
  );
}
