/**
 * BookingBrandStack — left region of the booking modal (desktop only).
 *
 * Reads entirely from MASTER_REMIX. Zero hard-coded copy.
 * Remixes change remix-variables.ts; this component never changes.
 */

import { MASTER_REMIX } from "@/config/template/remix-variables";
import { SloganHeartbeat } from "@/components/template/bespoke";
import type { BookingPrefill } from "@/config/template/booking-schema";

interface Props {
  prefill?: BookingPrefill;
}

export const BookingBrandStack = ({ prefill }: Props) => {
  const serviceLabel = prefill?.serviceSlug
    ? prefill.serviceSlug.replace(/-/g, " ")
    : MASTER_REMIX.SERVICE;

  return (
    <div
      className="hidden lg:flex flex-col justify-between w-[420px] flex-shrink-0 p-10 relative overflow-hidden"
      style={{ background: "hsl(218 43% 12%)" }}
      aria-hidden="true"
    >
      {/* Blueprint grain overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 39px, hsl(var(--copper) / 0.04) 40px), " +
            "repeating-linear-gradient(90deg, transparent, transparent 39px, hsl(var(--copper) / 0.04) 40px)",
        }}
      />

      {/* Top: monogram + service name */}
      <div className="relative z-10">
        {/* Brand monogram — three letters, Cormorant italic */}
        <p
          className="text-bone/40"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 36,
            fontStyle: "italic",
            fontWeight: 300,
            letterSpacing: "0.18em",
            lineHeight: 1,
          }}
        >
          {MASTER_REMIX.MONOGRAM_LETTERS.join("")}
        </p>

        <p
          className="mt-10 text-bone/40 uppercase tracking-[0.22em]"
          style={{ fontFamily: "'Jost', system-ui", fontSize: 11 }}
        >
          {MASTER_REMIX.SERVICE_CATEGORY || "Trade Services"}
        </p>

        <h2
          className="mt-3 text-bone leading-[0.95]"
          style={{
            fontFamily: "'Space Grotesk', system-ui",
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
          }}
        >
          {MASTER_REMIX.BRAND_NAME}
        </h2>

        {/* Copper rule */}
        <div
          className="mt-6 mb-8 h-px w-12"
          style={{ background: "hsl(var(--copper) / 0.4)" }}
        />

        {/* Trust statement */}
        <p
          className="max-w-[28ch] text-bone/70 leading-relaxed"
          style={{ fontFamily: "'Jost', system-ui", fontSize: 14, fontWeight: 300 }}
        >
          Family-built. Generationally accountable.
          We answer for this work — in writing, and in person.
        </p>
      </div>

      {/* Middle: trust numbers */}
      <div className="relative z-10 space-y-4">
        {MASTER_REMIX.TRUST_NUMBERS.slice(0, 3).map((t) => (
          <div key={t.label} className="flex items-baseline gap-3">
            <span
              className="tabular-nums text-bone"
              style={{
                fontFamily: "'Space Grotesk', system-ui",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
              }}
            >
              {t.number}
            </span>
            <span
              className="text-bone/50 uppercase tracking-[0.16em]"
              style={{ fontFamily: "'Jost', system-ui", fontSize: 11 }}
            >
              {t.label}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom: slogan */}
      <div className="relative z-10">
        {/* Animated copper seam — breathing hairline */}
        <div
          className="mb-8 h-px w-full"
          style={{
            background: "linear-gradient(90deg, hsl(var(--copper) / 0) 0%, hsl(var(--copper) / 0.35) 50%, hsl(var(--copper) / 0) 100%)",
            animation: "hairline-draw 8s ease-in-out infinite alternate",
          }}
        />
        <SloganHeartbeat variant="whisper" className="block opacity-60" />
      </div>
    </div>
  );
};
