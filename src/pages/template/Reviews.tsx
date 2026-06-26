import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import InnerHero from "@/components/drywall/InnerHero";
import EditorialQuote from "@/components/drywall/EditorialQuote";
import TrustNumbers from "@/components/template/TrustNumbers";
import CTABand from "@/components/drywall/CTABand";
import RemixSlot from "@/components/template/RemixSlot";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import { useReviews } from "@/hooks/use-reviews";
import type { BookingClickHandler } from "@/config/drywall-booking";

const SocialProofEngine = lazy(() =>
  import("@/components/master/SocialProofEngine").then((m) => ({
    default: m.SocialProofEngine,
  }))
);

interface Props {
  onBookClick?: BookingClickHandler;
}

// ─── Star row ─────────────────────────────────────────────────────────────────
const Stars = ({ rating, size = 18 }: { rating: number; size?: number }) => (
  <div className="flex items-center gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        viewBox="0 0 12 12"
        style={{ width: size, height: size }}
        fill={s <= Math.round(rating) ? "hsl(var(--copper))" : "hsl(var(--copper) / 0.2)"}
        aria-hidden
      >
        <path d="M6 1l1.4 3h3.1l-2.5 1.9.9 3L6 7.3 4.1 9 5 5.9 2.5 4H5.6z" />
      </svg>
    ))}
  </div>
);

// ─── Aggregate badge ──────────────────────────────────────────────────────────
const AggregateBadge = () => {
  const { aggregate } = useReviews({ maxItems: 1 });
  if (!aggregate || aggregate.totalReviews < 1) return null;

  return (
    <div className="flex flex-wrap items-center gap-6 mt-8">
      {/* Rating pill */}
      <div
        className="flex items-center gap-3 rounded-full px-5 py-3 border"
        style={{ borderColor: "hsl(var(--copper) / 0.2)", background: "hsl(var(--copper) / 0.04)" }}
      >
        <span
          className="text-charcoal tabular-nums"
          style={{
            fontFamily: "'Space Grotesk', system-ui",
            fontSize: 28,
            fontWeight: 300,
            letterSpacing: "-0.02em",
          }}
        >
          {aggregate.averageRating.toFixed(1)}
        </span>
        <div>
          <Stars rating={aggregate.averageRating} size={14} />
          <p className="text-mist mt-1" style={{ fontFamily: "'Jost', system-ui", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            {aggregate.totalReviews} verified {aggregate.totalReviews === 1 ? "review" : "reviews"}
          </p>
        </div>
      </div>

      {/* Five-star count */}
      {aggregate.fiveStarCount > 0 && (
        <div className="text-graphite" style={{ fontFamily: "'Jost', system-ui", fontSize: 13, fontWeight: 300 }}>
          <span className="text-charcoal font-medium">{aggregate.fiveStarCount}</span> five-star{" "}
          {aggregate.fiveStarCount === 1 ? "rating" : "ratings"} · All from Cochrane and area
        </div>
      )}
    </div>
  );
};

// ─── Google review CTA ────────────────────────────────────────────────────────
const GoogleReviewCTA = () => {
  const hasUrl = Boolean(MASTER_REMIX.GOOGLE_REVIEW_URL);
  if (!hasUrl) return null;

  return (
    <a
      href={MASTER_REMIX.GOOGLE_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 rounded-none px-6 py-3 transition-colors duration-300"
      style={{
        border: "1px solid hsl(var(--copper) / 0.3)",
        fontFamily: "'Jost', system-ui",
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "hsl(var(--charcoal))",
      }}
    >
      {/* Google G mark — inline SVG, no external dependency */}
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Leave a Google review
    </a>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const Reviews = ({ onBookClick }: Props) => {
  const c = TEMPLATE_COPY.reviews;

  return (
    <TemplateLayout onBookClick={onBookClick}>

      {/* ── Hero with aggregate rating ── */}
      <section
        className="relative overflow-hidden bg-bone border-b"
        style={{ borderColor: "hsl(var(--copper) / 0.1)", paddingTop: "clamp(5rem, 12vw, 9rem)", paddingBottom: "clamp(3rem, 8vw, 6rem)" }}
      >
        <div className="container mx-auto px-6">
          <p className="eyebrow-copper mb-5">{c.hero.eyebrow}</p>
          <h1
            className="text-charcoal max-w-[18ch]"
            style={{
              fontFamily: "'Space Grotesk', system-ui",
              fontSize: "clamp(2.25rem, 5vw, 4rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            {c.hero.title}
          </h1>
          <p className="mt-4 max-w-[52ch] text-graphite text-body leading-relaxed">{c.hero.lede}</p>

          {/* Live aggregate badge */}
          <AggregateBadge />

          {/* Google review link — only shows when GOOGLE_REVIEW_URL is set */}
          <div className="mt-6">
            <GoogleReviewCTA />
          </div>
        </div>
      </section>

      {/* ── All reviews ── */}
      <SectionFrame tone="paper" size="lg">
        <Suspense fallback={null}>
          <SocialProofEngine variant="grid" maxItems={12} />
        </Suspense>
      </SectionFrame>

      {/* ── Editorial quote ── */}
      <RemixSlot name="REVIEWS_HERO">
        <EditorialQuote
          quote="The crack other contractors kept calling 'just settling' is gone. The wall reads as one unbroken surface."
          attribution="Jordan M. — Sunset Ridge"
          image={MASTER_REMIX.REVIEWS_HERO}
        />
      </RemixSlot>

      {/* ── Trust numbers ── */}
      <SectionFrame tone="bone" size="md">
        <RemixSlot name="TRUST_NUMBERS">
          <TrustNumbers items={MASTER_REMIX.TRUST_NUMBERS} variant="grid" />
        </RemixSlot>
      </SectionFrame>

      {/* ── Google review invite — visible when URL is set ── */}
      {MASTER_REMIX.GOOGLE_REVIEW_URL && (
        <SectionFrame tone="paper" size="lg">
          <div className="max-w-xl">
            <p className="eyebrow-copper mb-4">Share your experience</p>
            <h2
              className="text-charcoal mb-3"
              style={{
                fontFamily: "'Space Grotesk', system-ui",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
              }}
            >
              A Google review helps the next homeowner find a crew they can trust.
            </h2>
            <p className="text-graphite text-body leading-relaxed mb-6" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
              It takes about 45 seconds. One sentence about what we did and whether we did it right.
              That is everything the next person needs to make their decision.
            </p>
            <GoogleReviewCTA />
          </div>
        </SectionFrame>
      )}

      {/* ── Final CTA ── */}
      <CTABand
        eyebrow="Begin"
        headline="Add your wall to the proof."
        body="Send three photos. Receive a written quote. Add the after-photo to this page when the work is done."
        primaryLabel={TEMPLATE_COPY.cta.primary}
        onPrimaryClick={onBookClick}
        prefill={{ source: "Reviews → Final CTA" }}
      />

    </TemplateLayout>
  );
};

export default Reviews;
