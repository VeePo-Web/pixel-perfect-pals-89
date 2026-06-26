interface PricingTier {
  scope: string;
  range: string;
}

interface PricingTableProps {
  title?: string;
  tiers: readonly PricingTier[] | PricingTier[];
  note?: string;
}

const PricingTable = ({ title, tiers, note }: PricingTableProps) => {
  return (
    <div className="border border-seam bg-paper">
      {title && (
        <div className="border-b border-seam px-6 py-4">
          <h3 className="font-display text-display-sm text-charcoal">{title}</h3>
        </div>
      )}
      <ul className="divide-y divide-seam">
        {tiers.map((tier, i) => (
          <li key={i} className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-baseline sm:justify-between">
            <span className="text-body text-graphite">{tier.scope}</span>
            <span className="font-display text-display-sm text-forest">{tier.range}</span>
          </li>
        ))}
      </ul>
      {note && (
        <div className="border-t border-seam bg-bone px-6 py-4">
          <p className="text-caption text-mist">{note}</p>
        </div>
      )}
    </div>
  );
};

export default PricingTable;
