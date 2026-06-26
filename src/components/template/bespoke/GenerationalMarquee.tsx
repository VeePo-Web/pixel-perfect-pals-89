/**
 * GenerationalMarquee — The Slogan In Perpetual Motion
 *
 * Ultra-slow horizontal marquee (90s loop) of the brand slogan
 * repeated with copper diamond separators:
 *
 *   BUILDING STRONG FOUNDATIONS FOR THOSE WHO COME AFTER US  ◆  BUILDING STRONG…
 *
 * 12px tracked Jost, charcoal/30. Pauses on hover.
 * Respects prefers-reduced-motion — falls back to a static single line.
 *
 * "The brand promise is generational." — Brand Brief
 * Slogan sourced from MASTER_REMIX — never hard-coded.
 */

import { MASTER_REMIX } from "@/config/template/remix-variables";

interface GenerationalMarqueeProps {
  className?: string;
}

const SEPARATOR = "  ◆  ";
const REPEATS = 6; // enough to fill any screen at the scroll speed

const GenerationalMarquee = ({ className = "" }: GenerationalMarqueeProps) => {
  const slogan = MASTER_REMIX.BRAND_SLOGAN.toUpperCase();
  const track = Array(REPEATS).fill(slogan + SEPARATOR).join("");

  return (
    <div
      className={`overflow-hidden w-full ${className}`}
      style={{ contain: "paint" }}
    >
      {/* Reduced-motion: static line */}
      <p
        className="hidden"
        aria-label={slogan}
        style={{
          fontFamily: "'Jost', system-ui, sans-serif",
          fontSize: 12,
          fontWeight: 300,
          letterSpacing: "0.20em",
          color: "hsl(var(--charcoal) / 0.30)",
        }}
      >
        {slogan}
      </p>

      {/* Default: animated marquee */}
      <div
        className="flex whitespace-nowrap motion-safe:animate-none"
        style={{
          /* Two copies side-by-side so the loop is seamless */
          width: "max-content",
          animation: "marquee-scroll 90s linear infinite",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = "running";
        }}
        aria-hidden
      >
        {[track, track].map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Jost', system-ui, sans-serif",
              fontSize: 12,
              fontWeight: 300,
              letterSpacing: "0.20em",
              color: "hsl(var(--charcoal) / 0.30)",
              paddingRight: "0.5em",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GenerationalMarquee;
