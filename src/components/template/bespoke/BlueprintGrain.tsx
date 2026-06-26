/**
 * BlueprintGrain — Architectural Pattern Overlay
 *
 * Pure SVG <pattern> of faint blueprint marks: grid lines, corner ticks,
 * and T-square reference marks. Sits at 1–2% opacity behind hero sections
 * and the footer — it should be invisible at a glance and unmissable on close
 * inspection. The blueprint-ink layer that separates this brand from any
 * other contractor site.
 *
 * "bespoke, warm, authoritative tradition executed with fantasy.co polish"
 * — 1.5 Brand Identity North Star Partner
 *
 * No images. Pure SVG. Zero performance cost.
 * Uses --ink-blueprint token (hsl 215 25% 18%).
 */

interface BlueprintGrainProps {
  opacity?: number;   // default 0.015
  className?: string;
}

const BlueprintGrain = ({ opacity = 0.015, className = "" }: BlueprintGrainProps) => (
  <svg
    aria-hidden
    className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity }}
  >
    <defs>
      <pattern
        id="blueprint-pattern"
        patternUnits="userSpaceOnUse"
        width="120"
        height="120"
      >
        {/* ── Primary grid lines — horizontal ── */}
        <line x1="0" y1="0"   x2="120" y2="0"   stroke="hsl(215 25% 18%)" strokeWidth="0.5" opacity="0.8" />
        <line x1="0" y1="30"  x2="120" y2="30"  stroke="hsl(215 25% 18%)" strokeWidth="0.4" opacity="0.5" />
        <line x1="0" y1="60"  x2="120" y2="60"  stroke="hsl(215 25% 18%)" strokeWidth="0.5" opacity="0.8" />
        <line x1="0" y1="90"  x2="120" y2="90"  stroke="hsl(215 25% 18%)" strokeWidth="0.4" opacity="0.5" />
        <line x1="0" y1="120" x2="120" y2="120" stroke="hsl(215 25% 18%)" strokeWidth="0.5" opacity="0.8" />

        {/* ── Primary grid lines — vertical ── */}
        <line x1="0"   y1="0" x2="0"   y2="120" stroke="hsl(215 25% 18%)" strokeWidth="0.5" opacity="0.8" />
        <line x1="30"  y1="0" x2="30"  y2="120" stroke="hsl(215 25% 18%)" strokeWidth="0.4" opacity="0.5" />
        <line x1="60"  y1="0" x2="60"  y2="120" stroke="hsl(215 25% 18%)" strokeWidth="0.5" opacity="0.8" />
        <line x1="90"  y1="0" x2="90"  y2="120" stroke="hsl(215 25% 18%)" strokeWidth="0.4" opacity="0.5" />
        <line x1="120" y1="0" x2="120" y2="120" stroke="hsl(215 25% 18%)" strokeWidth="0.5" opacity="0.8" />

        {/* ── Corner ticks — 45° marks at grid intersections ── */}
        <line x1="0"  y1="4"  x2="4"  y2="0"  stroke="hsl(215 25% 18%)" strokeWidth="0.8" opacity="1" />
        <line x1="60" y1="4"  x2="64" y2="0"  stroke="hsl(215 25% 18%)" strokeWidth="0.8" opacity="1" />
        <line x1="0"  y1="64" x2="4"  y2="60" stroke="hsl(215 25% 18%)" strokeWidth="0.8" opacity="1" />
        <line x1="60" y1="64" x2="64" y2="60" stroke="hsl(215 25% 18%)" strokeWidth="0.8" opacity="1" />

        {/* ── Dimension arrow mark — horizontal ── */}
        <line x1="10" y1="15" x2="50" y2="15" stroke="hsl(215 25% 18%)" strokeWidth="0.4" opacity="0.6" />
        <line x1="10" y1="12" x2="10" y2="18" stroke="hsl(215 25% 18%)" strokeWidth="0.4" opacity="0.6" />
        <line x1="50" y1="12" x2="50" y2="18" stroke="hsl(215 25% 18%)" strokeWidth="0.4" opacity="0.6" />

        {/* ── T-square crosshair ── */}
        <line x1="90" y1="75" x2="110" y2="75" stroke="hsl(215 25% 18%)" strokeWidth="0.4" opacity="0.5" />
        <line x1="100" y1="65" x2="100" y2="85" stroke="hsl(215 25% 18%)" strokeWidth="0.4" opacity="0.5" />
        <circle cx="100" cy="75" r="1.5" fill="none" stroke="hsl(215 25% 18%)" strokeWidth="0.4" opacity="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#blueprint-pattern)" />
  </svg>
);

export default BlueprintGrain;
