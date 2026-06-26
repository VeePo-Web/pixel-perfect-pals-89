import PricingTable from "@/components/drywall/PricingTable";
import type { PriceBand } from "@/config/template/remix-variables";

interface PriceBandsTableProps {
  title?: string;
  bands: PriceBand[];
  note?: string;
}

/** Thin wrapper over the existing master PricingTable so the template
 * binds to the {PRICE_BANDS[]} remix variable directly. */
const PriceBandsTable = ({ title, bands, note }: PriceBandsTableProps) => (
  <PricingTable title={title} tiers={bands} note={note} />
);

export default PriceBandsTable;
