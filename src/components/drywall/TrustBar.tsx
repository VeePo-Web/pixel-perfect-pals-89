import { Check } from "lucide-react";

interface TrustBarProps {
  items?: string[];
}

const DEFAULT_ITEMS = [
  "Cochrane local",
  "Small jobs welcome",
  "Photo-quote in 24h",
  "Clean, contained worksites",
];

const TrustBar = ({ items = DEFAULT_ITEMS }: TrustBarProps) => {
  return (
    <div className="border-y border-seam bg-paper">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-5 text-sm text-graphite">
        {items.map((item) => (
          <span key={item} className="inline-flex items-center gap-2">
            <Check className="h-4 w-4 text-forest" aria-hidden />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TrustBar;
