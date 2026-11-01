import { Panel } from "@/components/ui";

export default function PlaceholderSection() {
  return (
    <Panel
      as="section"
      aria-label="Future content"
      className="flex min-h-60 items-center justify-center border border-dashed border-text text-center"
    >
      {/* FIX: Section content is not defined yet. */}
      <p>[Section content to be defined]</p>
    </Panel>
  );
}
