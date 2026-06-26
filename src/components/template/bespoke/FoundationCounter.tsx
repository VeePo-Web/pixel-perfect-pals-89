/**
 * FoundationCounter — "Foundations laid since XXXX"
 *
 * On scroll into view, the year counts up once over 3 seconds ease-out.
 * Reads from MASTER_REMIX.FOUNDATION_YEAR — every trade inherits the
 * framing; only the year changes per remix.
 *
 * Numerals rendered with tabular-nums lining-nums for mechanical precision.
 * The framing copy is trade-agnostic — "Foundations laid since" works for
 * a tile site, an insulation site, and a roofing site equally.
 */

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { MASTER_REMIX } from "@/config/template/remix-variables";

interface FoundationCounterProps {
  className?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const FoundationCounter = ({ className = "" }: FoundationCounterProps) => {
  const endYear = MASTER_REMIX.FOUNDATION_YEAR;
  const startYear = endYear - 30;
  const durationMs = 3000;

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [displayed, setDisplayed] = useState(startYear);
  const [done, setDone] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView || done) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = easeOutCubic(progress);
      setDisplayed(Math.round(startYear + (endYear - startYear) * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [inView, done, endYear]);

  return (
    <div ref={ref} className={`flex flex-col items-start gap-0.5 ${className}`}>
      <p
        className="tabular-nums"
        style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 300,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          color: "hsl(var(--charcoal))",
          fontVariantNumeric: "tabular-nums lining-nums",
        }}
      >
        {displayed}
      </p>
      <p
        style={{
          fontFamily: "'Jost', system-ui, sans-serif",
          fontSize: 11,
          fontWeight: 400,
          letterSpacing: "0.20em",
          textTransform: "uppercase",
          color: "hsl(var(--copper) / 0.70)",
        }}
      >
        Foundations laid since
      </p>
    </div>
  );
};

export default FoundationCounter;
