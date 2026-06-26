/**
 * MasterBuilderSeal — Pure SVG notarial-quality mark.
 *
 * Circular badge with curved "COCHRANE MASTER BUILDERS · EST. LEGACY" text,
 * inner MB shield mark, and four diamond separator glyphs.
 * Zero images, zero external assets — scales infinitely at any size.
 *
 * Usage:
 *   <MasterBuilderSeal size={128} variant="navy" />
 *   <MasterBuilderSeal size={64} variant="bronze" animate />
 */

interface MasterBuilderSealProps {
  size?: 32 | 64 | 128 | 200;
  variant?: "navy" | "bronze" | "cream" | "ghost";
  animate?: boolean;
  className?: string;
  "aria-label"?: string;
}

const COLORS: Record<string, string> = {
  navy: "#1F2F4D",
  bronze: "#8B6B4A",
  cream: "#FDFBF7",
  ghost: "currentColor",
};

export const MasterBuilderSeal = ({
  size = 64,
  variant = "navy",
  animate = false,
  className = "",
  "aria-label": ariaLabel = "Cochrane Master Builders — Est. Legacy",
}: MasterBuilderSealProps) => {
  const color = COLORS[variant];
  const cx = 100;
  const cy = 100;
  const r = 100;

  // Text path radius — slightly inside the outer ring
  const textR = 80;
  const textCircleId = `seal-text-path-${variant}-${size}`;
  const rotateId = `seal-rotate-${variant}-${size}`;

  // Outer text circle path (for <textPath>)
  const textPath = `M ${cx},${cy - textR} A ${textR},${textR} 0 1,1 ${cx - 0.01},${cy - textR}`;

  // Inner thin ring radius
  const innerRingR = 62;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <path id={textCircleId} d={textPath} />
        {animate && (
          <animateTransform
            xlinkHref={`#${rotateId}`}
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from={`0 ${cx} ${cy}`}
            to={`360 ${cx} ${cy}`}
            dur="60s"
            repeatCount="indefinite"
          />
        )}
      </defs>

      {/* ── Outer thin hairline ring ──────────────────────────────── */}
      <circle
        cx={cx}
        cy={cy}
        r={92}
        stroke={color}
        strokeWidth="0.75"
        strokeOpacity="0.35"
        fill="none"
      />

      {/* ── Outer text ring ───────────────────────────────────────── */}
      <g id={animate ? rotateId : undefined}>
        <text
          fontSize="10.5"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="400"
          letterSpacing="3.2"
          fill={color}
          fillOpacity="0.85"
        >
          <textPath href={`#${textCircleId}`} startOffset="0%">
            COCHRANE MASTER BUILDERS · EST. LEGACY · COCHRANE ·
          </textPath>
        </text>
      </g>

      {/* ── Inner decorative ring ─────────────────────────────────── */}
      <circle
        cx={cx}
        cy={cy}
        r={innerRingR}
        stroke={color}
        strokeWidth="0.75"
        strokeOpacity="0.25"
        fill="none"
      />

      {/* ── MB Shield mark (simplified geometric) ────────────────── */}
      {/* Shield outline */}
      <path
        d="M100 44 L128 56 L128 82 C128 98 115 108 100 114 C85 108 72 98 72 82 L72 56 Z"
        stroke={color}
        strokeWidth="1.25"
        strokeLinejoin="round"
        fill="none"
        strokeOpacity="0.9"
      />
      {/* Inner shield bevel */}
      <path
        d="M100 51 L122 61 L122 82 C122 95 112 103 100 108 C88 103 78 95 78 82 L78 61 Z"
        stroke={color}
        strokeWidth="0.6"
        strokeLinejoin="round"
        fill="none"
        strokeOpacity="0.4"
      />
      {/* M letterform — geometric, two peaks */}
      <path
        d="M86 97 L86 71 L100 85 L114 71 L114 97"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeOpacity="0.9"
      />

      {/* ── Four diamond separators at cardinal points ────────────── */}
      {[0, 90, 180, 270].map((deg) => {
        const rad = ((deg - 90) * Math.PI) / 180;
        const dx = cx + 88 * Math.cos(rad);
        const dy = cy + 88 * Math.sin(rad);
        return (
          <g key={deg} transform={`translate(${dx}, ${dy}) rotate(${deg})`}>
            <path
              d="M0,-2.5 L1.5,0 L0,2.5 L-1.5,0 Z"
              fill={color}
              fillOpacity="0.6"
            />
          </g>
        );
      })}
    </svg>
  );
};
