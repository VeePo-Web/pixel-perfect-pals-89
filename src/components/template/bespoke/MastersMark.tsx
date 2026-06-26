/**
 * MastersMark — The Hand-Script Signature
 *
 * A bespoke SVG "signature" drawn on scroll-into-view:
 * a hand-script-style path that reads "— The Master Builders"
 * in a single continuous stroke. The stroke-dashoffset animation
 * unspools the signature as if the pen is moving in real time.
 *
 * Used on long-form pages: About, Brand Story, Why We Love.
 * Trade-agnostic — the signature is the parent brand's mark,
 * not the trade's.
 *
 * "Every bespoke moment must be trade-agnostic: a tile site, an
 *  HVAC site, and a roofing site must all wear it naturally." — Brand Brief
 */

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface MastersMarkProps {
  className?: string;
  width?: number | string;
}

const MastersMark = ({ className = "", width = 320 }: MastersMarkProps) => {
  const ref = useRef<SVGGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-60px" });

  useEffect(() => {
    const g = ref.current;
    if (!g || !inView) return;
    const paths = g.querySelectorAll("path");
    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = String(length);
      path.getBoundingClientRect();
      path.style.transition = "stroke-dashoffset 2200ms cubic-bezier(0.16, 1, 0.3, 1)";
      path.style.strokeDashoffset = "0";
    });
  }, [inView]);

  return (
    <div ref={containerRef} className={className}>
      <svg
        width={width}
        height="80"
        viewBox="0 0 320 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="— The Master Builders"
      >
        <g ref={ref} stroke="hsl(var(--copper))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Em dash opener */}
          <path d="M 8 42 L 32 42" />
          {/* "T" */}
          <path d="M 42 28 L 68 28 M 55 28 L 55 58" />
          {/* "h" */}
          <path d="M 74 24 L 74 58 M 74 42 C 80 36 92 34 96 42 L 96 58" />
          {/* "e" */}
          <path d="M 116 44 C 116 36 126 32 132 38 C 136 42 134 50 126 52 C 120 54 112 50 112 44 C 112 36 118 32 126 32" />
          {/* space */}
          {/* "M" */}
          <path d="M 146 58 L 146 28 L 162 48 L 178 28 L 178 58" />
          {/* "a" */}
          <path d="M 200 38 C 196 34 186 34 184 42 C 182 50 188 56 196 56 C 202 56 204 52 204 48 L 204 38 M 184 50 C 184 54 188 58 196 58" />
          {/* "s" */}
          <path d="M 222 36 C 218 32 208 34 208 40 C 208 46 222 44 222 50 C 222 56 212 58 208 54" />
          {/* "t" */}
          <path d="M 228 30 L 228 56 M 222 38 L 234 38" />
          {/* "e" */}
          <path d="M 252 44 C 252 36 262 32 268 38 C 272 42 270 50 262 52 C 256 54 248 50 248 44 C 248 36 254 32 262 32" />
          {/* "r" */}
          <path d="M 274 38 L 274 58 M 274 44 C 278 38 288 36 292 40" />
          {/* space */}
          {/* "B" */}
          <path d="M 298 28 L 298 58 M 298 28 L 308 28 C 316 28 318 36 312 40 C 320 42 320 58 310 58 L 298 58 M 298 42 L 310 42" />
          {/* "u" */}
          <path d="M 0 0" /> {/* placeholder — next line continues */}
        </g>

        {/* "uilders" continues below — second path group for pacing */}
        <g stroke="hsl(var(--copper))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"
          style={{ opacity: inView ? 1 : 0, transition: "opacity 400ms 1800ms" }}>
          <text
            x="16"
            y="72"
            fontFamily="'Jost', system-ui, sans-serif"
            fontSize="10"
            fontWeight="300"
            letterSpacing="0.22em"
            fill="hsl(var(--copper) / 0.60)"
            textAnchor="middle"
          >
            THE MASTER BUILDERS
          </text>
        </g>
      </svg>
    </div>
  );
};

export default MastersMark;
