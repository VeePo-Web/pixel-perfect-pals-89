/**
 * MonogramB — "The Local"
 *
 * The B letterform whose lower bowl cradles a Tim Hortons–style to-go
 * coffee cup (generic — no logo, just a cup with three steam wisps).
 * The steam drifts upward on a 7s loop: opacity 0 → 0.6 → 0.
 *
 * "luxury-level, fantasy.co-inspired website with Apple-level UX precision
 *  and bespoke motion polish" — 1.2.1 Family Legacy Standard Partner
 *
 * Stroke-based, currentColor, reads cleanly at 24px → 480px.
 */

interface MonogramBProps {
  size?: number;
  className?: string;
}

const MonogramB = ({ size = 64, className = "" }: MonogramBProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    data-bespoke-animate
    className={className}
  >
    {/* ── B vertical stroke ── */}
    <line x1="14" y1="10" x2="14" y2="90" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" />

    {/* ── Upper bowl ── */}
    <path
      d="M 14 10 L 50 10 C 68 10 72 22 72 32 C 72 42 68 50 50 50 L 14 50"
      stroke="currentColor"
      strokeWidth="6.5"
      strokeLinecap="round"
      fill="none"
    />

    {/* ── Lower bowl — slightly larger, cradles the cup ── */}
    <path
      d="M 14 50 L 52 50 C 72 50 78 64 78 73 C 78 82 72 90 52 90 L 14 90"
      stroke="currentColor"
      strokeWidth="6.5"
      strokeLinecap="round"
      fill="none"
    />

    {/* ── Copper accent dot ── */}
    <circle cx="22" cy="50" r="3.5" fill="hsl(var(--copper))" />

    {/* ── Coffee cup — cradled in lower bowl ── */}
    <g data-coffee>
      {/* cup body — tapered trapezoid */}
      <path
        d="M 52 66 L 56 66 L 58 82 L 50 82 Z"
        fill="currentColor"
        opacity="0.85"
      />
      {/* cup sleeve band */}
      <rect x="50.5" y="71" width="7" height="4" rx="0.5" fill="currentColor" opacity="0.4" />
      {/* lid */}
      <rect x="50" y="63" width="9" height="3.5" rx="1.5" fill="currentColor" opacity="0.9" />
      {/* drink spout */}
      <rect x="53" y="60" width="3" height="4" rx="1" fill="currentColor" opacity="0.7" />
    </g>

    {/* ── Steam wisps — three parallel, staggered ── */}
    {/* Wis 1 — center */}
    <path
      d="M 54 58 Q 52 52 54 46"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
      style={{
        animationName: "steam-drift",
        animationDuration: "7s",
        animationTimingFunction: "ease-out",
        animationIterationCount: "infinite",
        animationDelay: "0s",
        opacity: 0,
      }}
    />
    {/* Wis 2 — left */}
    <path
      d="M 51 59 Q 49 53 51 47"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
      style={{
        animationName: "steam-drift",
        animationDuration: "7s",
        animationTimingFunction: "ease-out",
        animationIterationCount: "infinite",
        animationDelay: "2.3s",
        opacity: 0,
      }}
    />
    {/* Wis 3 — right */}
    <path
      d="M 57 59 Q 59 53 57 47"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
      style={{
        animationName: "steam-drift",
        animationDuration: "7s",
        animationTimingFunction: "ease-out",
        animationIterationCount: "infinite",
        animationDelay: "4.6s",
        opacity: 0,
      }}
    />
  </svg>
);

export default MonogramB;
