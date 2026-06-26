/**
 * MonogramM — "The Craftsman"
 *
 * The M letterform where the two peaks are shoulders, and a carpenter's
 * pencil rests behind the right peak — tucked behind the ear.
 * Idle: the pencil rotates 4° and back over 9 seconds, like being
 * tucked tighter before a measurement.
 *
 * "slow, deliberate, heavy animations as opposed to fast, bouncy,
 *  cheap animations" — 1.5.1 UX Psychology System
 *
 * Stroke-based, single-color (currentColor), reads at 24px → 480px.
 */

interface MonogramMProps {
  size?: number;
  className?: string;
}

const MonogramM = ({ size = 64, className = "" }: MonogramMProps) => (
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
    {/* ── M letterform — two peaks forming "shoulders" ── */}
    <path
      d="M 10 85 L 10 18 L 50 60 L 90 18 L 90 85"
      stroke="currentColor"
      strokeWidth="6.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* ── Copper accent dot ── */}
    <circle cx="50" cy="62" r="3.5" fill="hsl(var(--copper))" />

    {/* ── Carpenter's pencil — animated, rests behind right peak ── */}
    <g
      data-pencil
      style={{
        animationName: "pencil-tuck",
        animationDuration: "9s",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        transformOrigin: "86px 22px",
      }}
    >
      {/* pencil body */}
      <rect
        x="83" y="-4" width="6" height="30" rx="1"
        fill="currentColor"
        transform="rotate(8 86 11)"
      />
      {/* pencil tip */}
      <polygon
        points="83,27 89,27 86,34"
        fill="hsl(var(--copper))"
        transform="rotate(8 86 11)"
      />
      {/* eraser end */}
      <rect
        x="83" y="-6" width="6" height="3" rx="1"
        fill="currentColor"
        opacity="0.5"
        transform="rotate(8 86 11)"
      />
    </g>
  </svg>
);

export default MonogramM;
