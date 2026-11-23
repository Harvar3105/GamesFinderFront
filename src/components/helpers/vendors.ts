import { EVendor } from "@/domain/entities/enums/EVendor";

const VENDOR_LABELS: Record<EVendor, string> = {
  [EVendor.STEAM]: "Steam",
  [EVendor.INSTANT_GAMING]: "Instant Gaming",
  [EVendor.G2A]: "G2A",
};

// TODO: Show vendor icons (logos) instead of the names in the catalog and on the game page.
/** Display name of a vendor; an unknown value from the backend is shown as is. */
export function vendorLabel(vendor: EVendor): string {
  return VENDOR_LABELS[vendor] ?? vendor;
}
