import type { TrustNumber } from "@/config/template/remix-variables";

interface TrustNumbersProps {
  items: TrustNumber[];
  variant?: "row" | "grid";
}

/**
 * The numerical proof bar. Hormozi: every claim must reduce to a number
 * the prospect can quote back. Renders as a single hairline-divided row
 * (variant 'row') or a 2x2 grid for the Reviews page (variant 'grid').
 */
const TrustNumbers = ({ items, variant = "row" }: TrustNumbersProps) => {
  if (variant === "grid") {
    return (
      <div className="grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className="bg-paper p-8">
            <p className="font-display text-display-md text-forest">{it.number}</p>
            <p className="font-eyebrow mt-3 text-mist">{it.label}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 divide-x divide-y divide-seam/60 border-y border-seam/60 md:grid-cols-4 md:divide-y-0">
      {items.map((it) => (
        <li
          key={it.label}
          className="flex flex-col items-start px-5 py-7 md:px-8 md:py-8"
        >
          <p className="font-display tabular-nums leading-[0.95] tracking-[-0.02em] text-forest text-[clamp(2rem,4vw,3.25rem)]">
            {it.number}
          </p>
          <span aria-hidden className="my-3 block h-px w-6 bg-copper/60" />
          <p className="font-eyebrow max-w-[16ch] text-[11px] uppercase leading-[1.35] tracking-[0.14em] text-mist md:text-[11px]">
            {it.label}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default TrustNumbers;
