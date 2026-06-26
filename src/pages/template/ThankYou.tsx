/**
 * ThankYou — /thank-you
 *
 * Reached after every successful booking submission.
 * Above the fold: silence and gratitude. No CTAs.
 * Below the fold: exactly 3 strategic cross-links from cross-sell-map.ts.
 */

import { useSearchParams, Link } from "react-router-dom";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import { PlumbLineDivider, BlueprintGrain, SloganHeartbeat } from "@/components/template/bespoke";
import { getCrossSell } from "@/config/template/cross-sell-map";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import type { BookingClickHandler } from "@/config/template/booking-schema";

interface Props { onBookClick?: BookingClickHandler }

const ThankYou = ({ onBookClick }: Props) => {
  const [params] = useSearchParams();
  const serviceSlug = params.get("service") ?? undefined;
  const cross = getCrossSell(serviceSlug);

  return (
    <TemplateLayout onBookClick={onBookClick}>
      {/* ── Above the fold — silence ─────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "70dvh", background: "hsl(218 43% 12%)" }}
      >
        <BlueprintGrain opacity={0.018} />

        <div className="container relative z-10 mx-auto flex min-h-[70dvh] flex-col justify-center px-6 py-24">
          {/* Eyebrow */}
          <p
            className="mb-8 uppercase tracking-[0.28em]"
            style={{
              fontFamily: "'Jost', system-ui",
              fontSize: 11,
              color: "hsl(var(--copper) / 0.70)",
            }}
          >
            {MASTER_REMIX.BRAND_NAME}
          </p>

          {/* Heading */}
          <h1
            className="text-bone"
            style={{
              fontFamily: "'Space Grotesk', system-ui",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              lineHeight: 0.95,
            }}
          >
            Thank you.
          </h1>

          {/* Copper underline — drawn */}
          <div
            className="mt-8 mb-10 h-px w-20"
            style={{
              background: "linear-gradient(90deg, hsl(var(--copper) / 0.8) 0%, hsl(var(--copper) / 0) 100%)",
            }}
          />

          {/* Body — generous leading, Jost Light */}
          <p
            className="max-w-[52ch] text-bone/70 leading-relaxed"
            style={{ fontFamily: "'Jost', system-ui", fontSize: 17, fontWeight: 300 }}
          >
            Your message has reached us. We are honoured to be in relation with you.
            A member of our family will personally respond — usually within one business day.
          </p>

          {/* Secondary quiet line */}
          <p
            className="mt-5 text-bone/40"
            style={{ fontFamily: "'Jost', system-ui", fontSize: 13, fontWeight: 300 }}
          >
            No action is needed on your end. We have everything we need to reach you.
          </p>

          {/* Generational slogan — closing inscription */}
          <div className="mt-12 pt-8 border-t border-copper/15 max-w-xl">
            <p
              className="uppercase text-bone/55"
              style={{
                fontFamily: "'Jost', system-ui",
                fontSize: 12,
                fontWeight: 400,
                letterSpacing: "0.26em",
              }}
            >
              <span aria-hidden style={{ color: "hsl(var(--copper))", marginRight: "0.6em" }}>▪</span>
              {MASTER_REMIX.BRAND_SLOGAN}
            </p>
          </div>
        </div>
      </section>

      {/* ── Divider ─────────────────────────────────────────────────── */}
      <PlumbLineDivider className="py-2" />

      {/* ── Cross-links bento ────────────────────────────────────────── */}
      <SectionFrame tone="bone" size="lg" grain>
        {/* Editorial question */}
        <p
          className="mb-12 text-charcoal"
          style={{
            fontFamily: "'Space Grotesk', system-ui",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            maxWidth: "32ch",
          }}
        >
          {cross.question}
        </p>

        {/* 3-block bento — 1/2/2 responsive */}
        <div className="grid gap-px bg-seam md:grid-cols-3">
          {cross.recommendations.map((rec, i) => (
            <div
              key={rec.name}
              className="group relative bg-paper p-8 transition-colors duration-300 hover:bg-bone"
            >
              {/* Index eyebrow */}
              <span
                className="text-mist uppercase tracking-[0.18em]"
                style={{ fontFamily: "'Jost', system-ui", fontSize: 11 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Trade name */}
              <h3
                className="mt-4 text-charcoal"
                style={{
                  fontFamily: "'Space Grotesk', system-ui",
                  fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.15,
                }}
              >
                {rec.name}
              </h3>

              {/* Value prop */}
              <p
                className="mt-3 max-w-[28ch] text-graphite leading-relaxed"
                style={{ fontFamily: "'Jost', system-ui", fontSize: 13, fontWeight: 300 }}
              >
                {rec.valueProp}
              </p>

              {/* Copper underline link */}
              <a
                href={rec.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-charcoal transition-colors duration-300 group-hover:text-forest"
                style={{
                  fontFamily: "'Jost', system-ui",
                  fontSize: 12,
                  fontWeight: 400,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  borderBottom: "1px solid hsl(var(--copper) / 0.30)",
                  paddingBottom: 2,
                }}
              >
                Visit →
              </a>
            </div>
          ))}
        </div>
      </SectionFrame>

      {/* ── Review invite — only renders when Google URL is configured ── */}
      {MASTER_REMIX.GOOGLE_REVIEW_URL && (
        <SectionFrame tone="bone" size="md">
          <div
            className="max-w-lg border-l-2 pl-6"
            style={{ borderColor: "hsl(var(--copper) / 0.35)" }}
          >
            <p
              className="text-charcoal mb-3 leading-snug"
              style={{
                fontFamily: "'Space Grotesk', system-ui",
                fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
                fontWeight: 300,
                letterSpacing: "-0.01em",
              }}
            >
              If the work exceeded your expectations — a Google review helps the next homeowner find a crew they can trust.
            </p>
            <p
              className="text-graphite mb-5"
              style={{ fontFamily: "'Jost', system-ui", fontSize: 13, fontWeight: 300, lineHeight: 1.6 }}
            >
              One sentence. 45 seconds. That is all it takes.
            </p>
            <a
              href={MASTER_REMIX.GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors duration-300"
              style={{
                fontFamily: "'Jost', system-ui",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "hsl(var(--forest))",
                borderBottom: "1px solid hsl(var(--forest) / 0.25)",
                paddingBottom: 2,
              }}
            >
              Leave a Google review →
            </a>
          </div>
        </SectionFrame>
      )}

      {/* ── Quiet back link ─────────────────────────────────────────── */}
      <SectionFrame tone="paper" size="sm">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-caption uppercase tracking-[0.18em] text-graphite transition-colors hover:text-charcoal"
          >
            ← Back to home
          </Link>
          <span className="text-seam">·</span>
          <Link
            to="/services"
            className="text-caption uppercase tracking-[0.18em] text-graphite transition-colors hover:text-charcoal"
          >
            All services
          </Link>
        </div>
      </SectionFrame>
    </TemplateLayout>
  );
};

export default ThankYou;
