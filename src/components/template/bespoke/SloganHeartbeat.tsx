/**
 * SloganHeartbeat — The Slogan in Five Size Variants
 *
 * A utility wrapper that renders the BRAND_SLOGAN in a consistent
 * typographic treatment across its seven placements. Five variants:
 *
 *   "nav"     — 9px Jost, letter-spacing 0.30em, copper/40
 *   "whisper" — 11px Jost uppercase, copper/50, beneath hero H1
 *   "divider" — 10px tracked caps, copper/50, between sections
 *   "footer"  — clamp(1.25–2rem) Space Grotesk Light Italic, charcoal
 *   "monument"— clamp(0.9–1.6rem) Jost tracked, cornerstone inscription
 *
 * All slogan text sourced from MASTER_REMIX.BRAND_SLOGAN.
 * Rule: never animate with bounce. Only fade, draw, clip-path reveal.
 * Sacred type.
 *
 * "The slogan must appear as a recurring visual heartbeat —
 *  not a single tagline lost in the footer." — Brand Brief
 */

import { MASTER_REMIX } from "@/config/template/remix-variables";

type SloganVariant = "nav" | "whisper" | "divider" | "footer" | "monument";

interface SloganHeartbeatProps {
  variant: SloganVariant;
  className?: string;
  animate?: boolean;
}

const VARIANT_STYLES: Record<SloganVariant, React.CSSProperties> = {
  nav: {
    fontFamily: "'Jost', system-ui, sans-serif",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.28em",
    textTransform: "uppercase",
    // deepened copper for legibility — ~4.3:1 on bone (was copper/40 ≈ 1.5:1)
    color: "hsl(30 58% 40%)",
    display: "block",
  },
  whisper: {
    fontFamily: "'Jost', system-ui, sans-serif",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "hsl(30 58% 40%)",
    display: "block",
  },
  divider: {
    fontFamily: "'Jost', system-ui, sans-serif",
    fontSize: 11,
    fontWeight: 400,
    letterSpacing: "0.20em",
    textTransform: "uppercase",
    color: "hsl(30 58% 42%)",
    display: "block",
    textAlign: "center",
  },
  footer: {
    fontFamily: "'Space Grotesk', system-ui, sans-serif",
    fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
    fontWeight: 300,
    fontStyle: "italic",
    lineHeight: 1.35,
    color: "hsl(var(--charcoal))",
    display: "block",
  },
  monument: {
    fontFamily: "'Jost', system-ui, sans-serif",
    fontSize: "clamp(0.9rem, 2.4vw, 1.6rem)",
    fontWeight: 300,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "hsl(var(--charcoal) / 0.72)",
    display: "block",
  },
};

const SloganHeartbeat = ({
  variant,
  className = "",
  animate = true,
}: SloganHeartbeatProps) => {
  const slogan = MASTER_REMIX.BRAND_SLOGAN;

  return (
    <span
      data-slogan-variant={variant}
      className={className}
      style={{
        ...VARIANT_STYLES[variant],
        ...(animate
          ? { animationName: "none" } // entrances handled by parent ScrollReveal
          : {}),
      }}
    >
      {variant === "footer" && (
        <span
          style={{
            color: "hsl(var(--copper))",
            marginRight: "0.5em",
          }}
          aria-hidden
        >
          ▪
        </span>
      )}
      {slogan}
    </span>
  );
};

export default SloganHeartbeat;
