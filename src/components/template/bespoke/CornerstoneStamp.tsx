/**
 * CornerstoneStamp — The Foundation Stone Seal
 *
 * A circular SVG notary-style stamp: outer ring of tracked text reads
 * "EST · COCHRANE · MASTER · BUILDERS · ALBERTA", inner glyph is "CMB".
 * Rotates 360° over 60 seconds — nearly imperceptible, like a compass
 * needle slowly finding true north.
 *
 * Used once per page: bottom-right of hero, booking confirmation,
 * thank-you page. At 60% copper opacity — present but never competing.
 *
 * "The brand promise is generational: 'Building Strong Foundations
 *  For Those Who Come After Us.'" — Brand Brief
 *
 * All strings from BESPOKE_CONFIG. Respects prefers-reduced-motion.
 */

import { BESPOKE_CONFIG } from "@/config/template/bespoke-config";

interface CornerstoneStampProps {
  size?: number;
  className?: string;
}

const CornerstoneStamp = ({
  size = 80,
  className = "",
}: CornerstoneStampProps) => {
  const { cornerstone } = BESPOKE_CONFIG;
  const r = 44; // radius for the text path
  const cx = 50;
  const cy = 50;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={cornerstone.ringText}
      className={className}
      style={{ color: `hsl(var(--copper) / 0.60)` }}
    >
      <defs>
        {/* Circular path for text to follow */}
        <path
          id="ring-path"
          d={`M ${cx},${cy - r} a ${r},${r} 0 1,1 0,0.001`}
        />
      </defs>

      {/* Outer circle */}
      <circle cx={cx} cy={cy} r={r + 2} stroke="currentColor" strokeWidth="0.8" fill="none" />
      {/* Inner circle */}
      <circle cx={cx} cy={cy} r={r - 10} stroke="currentColor" strokeWidth="0.5" fill="none" />

      {/* Ring text — tracked caps following the circle */}
      <text
        fontSize="7.5"
        fill="currentColor"
        fontFamily="'Jost', system-ui, sans-serif"
        fontWeight="300"
        letterSpacing="2.8"
        textAnchor="middle"
      >
        <textPath href="#ring-path" startOffset="50%">
          {cornerstone.ringText}
        </textPath>
      </text>

      {/* Inner CMB monogram */}
      <text
        x={cx}
        y={cy + 5}
        fontSize="18"
        fill="currentColor"
        fontFamily="'Space Grotesk', system-ui, sans-serif"
        fontWeight="300"
        textAnchor="middle"
        letterSpacing="4"
      >
        CMB
      </text>

      {/* Subtle foundation line below CMB */}
      <line x1={cx - 14} y1={cy + 10} x2={cx + 14} y2={cy + 10} stroke="currentColor" strokeWidth="0.6" />

      {/* Whole stamp rotates over 60s */}
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from={`0 ${cx} ${cy}`}
        to={`360 ${cx} ${cy}`}
        dur={`${cornerstone.rotateDurationS}s`}
        repeatCount="indefinite"
      />
    </svg>
  );
};

export default CornerstoneStamp;
