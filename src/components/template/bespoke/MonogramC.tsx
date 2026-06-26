/**
 * MonogramC — "The Foreman"
 *
 * The C letterform rendered as a master builder who wears a hardhat.
 * The hardhat lifts ~2px every 10 seconds as if tipped in greeting —
 * an ultra-subtle idle animation that whispers, never waves.
 *
 * "The aesthetic ceiling is heirloom craftsmanship — leather-bound,
 *  blueprint-ink, hand-stamped feel rendered in pure CSS/SVG." — Brand Brief
 *
 * Stroke-based, single-color (currentColor), renders cleanly at 24px → 480px.
 * All animation governed by CSS keyframes defined in index.css.
 * Respects prefers-reduced-motion via [data-bespoke-animate].
 */

interface MonogramCProps {
  size?: number;
  className?: string;
}

const MonogramC = ({ size = 64, className = "" }: MonogramCProps) => (
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
    {/* ── C letterform — open arc, stroke-based ── */}
    <path
      d="M 78 28 C 68 16 52 10 38 13 C 22 17 12 31 12 50 C 12 69 22 83 38 87 C 52 90 68 84 78 72"
      stroke="currentColor"
      strokeWidth="6.5"
      strokeLinecap="round"
      fill="none"
    />

    {/* ── Copper accent dot — brand signature ── */}
    <circle cx="80" cy="50" r="3.5" fill="hsl(var(--copper))" />

    {/* ── Hardhat — animated group ── */}
    <g
      data-hardhat
      style={{
        animationName: "hat-tip",
        animationDuration: "10s",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        transformOrigin: "52px 8px",
      }}
    >
      {/* brim — wide horizontal line */}
      <rect x="26" y="11" width="42" height="3.5" rx="1.5" fill="currentColor" />
      {/* crown — trapezoid dome */}
      <path
        d="M 32 12 L 36 2 L 62 2 L 66 12 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      {/* inner brim detail */}
      <rect x="30" y="14" width="38" height="1.5" rx="0.75" fill="currentColor" opacity="0.35" />
    </g>
  </svg>
);

export default MonogramC;
