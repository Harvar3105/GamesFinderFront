import { ButtonLink, Icon } from "@/components/ui";

// TODO: Replace with the real repository URL.
const GITHUB_URL = "https://github.com/";
// TODO: Replace with the real contact email.
const CONTACT_EMAIL = "mailto:";

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-related-lg bg-container px-edge-x py-attention-sm">
      <span className="font-code">© 2026 GAMES FINDER</span>
      <div className="flex flex-wrap items-center gap-related-sm">
        <ButtonLink href={GITHUB_URL} variant="ghost">
          <Icon name="code_xml" />
          GitHub
        </ButtonLink>
        <ButtonLink href={CONTACT_EMAIL} variant="secondary">
          <Icon name="mail" />
          Contact us
        </ButtonLink>
      </div>
    </footer>
  );
}
