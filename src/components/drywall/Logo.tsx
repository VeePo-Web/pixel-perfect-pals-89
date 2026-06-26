import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  variant?: "full" | "mark";
}

/**
 * Cochrane Drywall & Insulation Masters — "Trowel & Seam" lockup
 *
 * The mark is built from the two physical gestures of a master drywaller:
 *   1. The trowel arc — a single confident sweep across a joint
 *   2. The seam       — a precise hairline that disappears into a finished wall
 *   3. The mastery dot — the moment the trowel lifts cleanly at the apex
 *
 * Stroke-only construction. No closed shapes, no gradients, no luxury cues.
 * Inherits color via currentColor so it adapts to forest / charcoal / bone.
 */
const TrowelMark = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* The trowel arc — a confident sweep, lower-left to upper-right */}
    <path
      d="M4 22 Q 16 4, 28 14"
      strokeWidth="1.5"
    />

    {/* The mastery dot — the moment the trowel lifts at the apex */}
    <circle cx="28" cy="14" r="1" fill="currentColor" stroke="none" />

    {/* The seam — a precise horizontal hairline beneath the arc */}
    <line x1="6" y1="26" x2="26" y2="26" strokeWidth="0.75" />
    {/* Joint endpoints — micro tick marks */}
    <line x1="6" y1="24.5" x2="6" y2="27.5" strokeWidth="0.75" />
    <line x1="26" y1="24.5" x2="26" y2="27.5" strokeWidth="0.75" />
  </svg>
);

const Logo = ({ className = "", variant = "full" }: LogoProps) => {
  if (variant === "mark") {
    return (
      <span className={`inline-flex text-forest ${className}`}>
        <TrowelMark className="h-7 w-7" />
      </span>
    );
  }

  return (
    <Link
      to="/"
      aria-label="Cochrane Drywall & Insulation Masters — home"
      className={`group inline-flex items-center gap-3 text-charcoal ${className}`}
    >
      <span className="text-forest transition-transform duration-500 ease-out group-hover:-translate-y-px">
        <TrowelMark className="h-8 w-8" />
      </span>

      <span className="flex flex-col leading-none">
        {/* Line 1 — full legal lockup. On very small screens, "& Insulation"
            collapses so the navbar never wraps; the aria-label keeps the
            full name accessible to screen readers and SEO. */}
        <span className="font-display text-[1.0625rem] font-normal leading-[1.05] tracking-tight">
          <span className="text-charcoal">Cochrane Drywall</span>
          <span className="text-graphite hidden sm:inline"> &amp; Insulation</span>
        </span>

        {/* Hairline seam between the two lines — right-aligned, echoes the mark */}
        <span
          aria-hidden
          className="mt-1 ml-auto h-px w-12 bg-forest/30"
        />

        {/* Line 2 — the "Masters" tier signal, italic forest, right-aligned */}
        <span className="mt-1 ml-auto font-display text-[0.8125rem] font-medium italic leading-none text-forest tracking-[0.04em]">
          Masters
        </span>
      </span>
    </Link>
  );
};

export default Logo;
