// NEXT_PUBLIC_* values are inlined at build time, so a change requires a rebuild.
// Each variable must be read as a literal `process.env.NAME`: dynamic lookups are not inlined.
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "jupetr3105@outlook.com";

export const ExternalLinks = {
  github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/Harvar3105",
  contactEmail,
  contactEmailHref: `mailto:${contactEmail}`,
  portfolio: process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? "https://harvar3105.github.io/en",
};
