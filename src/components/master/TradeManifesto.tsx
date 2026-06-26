/**
 * TradeManifesto — "Why We Love [X]" full editorial page component.
 *
 * Renders a complete 5-section manifesto from a ManifestoConfig.
 * Taste-skill spec: Editorial Luxury vibe + Z-Axis Cascade layout.
 * Framer Motion whileInView reveals, Double-Bezel architecture throughout.
 *
 * To create a new trade manifesto:
 *   1. Fill in src/config/manifesto/[trade].manifesto.ts
 *   2. <TradeManifesto config={yourConfig} onBookClick={...} />
 *   Zero component code changes required.
 */

import { motion } from "framer-motion";
import type { ManifestoConfig } from "@/config/manifesto/manifesto.types";
import { GenerationalBadge, CraftsmanCredo, GenerationalPromise } from "./StoryBrandTheme";

interface TradeManifestoProps {
  config: ManifestoConfig;
  onBookClick?: () => void;
}

// ─── Motion constants ────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.9, ease: EASE, delay },
});

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const staggerChild = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

// ─── Render a string that may contain \n as <br> splits ──────────────────────
const renderWithBreaks = (text: string) =>
  text.split("\n").map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </span>
  ));

// ─── Light Double-Bezel wrapper ───────────────────────────────────────────────
const LightBezel = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={[
      "ring-1 ring-[#1F2F4D]/06 rounded-[1.5rem] p-1.5 bg-white/80",
      className,
    ].join(" ")}
  >
    <div className="rounded-[calc(1.5rem-0.375rem)] p-8 md:p-10 bg-[#FDFBF7] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
      {children}
    </div>
  </div>
);

// ─── Large Double-Bezel (for §4 why it matters) ───────────────────────────────
const LargeBezel = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={[
      "ring-1 ring-[#1F2F4D]/07 rounded-[2rem] p-2 bg-[#EDE9E1]/60",
      className,
    ].join(" ")}
  >
    <div className="rounded-[calc(2rem-0.5rem)] p-10 md:p-14 bg-[#FDFBF7] shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)]">
      {children}
    </div>
  </div>
);

// ─── Dark callout box (for specificFact) ─────────────────────────────────────
const FactCallout = ({ children }: { children: React.ReactNode }) => (
  <div className="ring-1 ring-[#8B6B4A]/20 rounded-[1.5rem] p-1.5 bg-[#8B6B4A]/06 mt-10">
    <div className="rounded-[calc(1.5rem-0.375rem)] bg-[#0B1120] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="border-l-2 border-[#8B6B4A]/60 px-8 py-8 md:px-10 md:py-9">
        <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#C9A87C]/60 mb-4">
          The Honest Truth
        </p>
        {children}
      </div>
    </div>
  </div>
);

// ─── Eyebrow pill ─────────────────────────────────────────────────────────────
const Eyebrow = ({
  children,
  variant = "bronze",
}: {
  children: React.ReactNode;
  variant?: "bronze" | "navy" | "light";
}) => {
  const styles: Record<string, string> = {
    bronze: "border border-[#8B6B4A]/35 bg-[#8B6B4A]/10 text-[#C9A87C]",
    navy: "border border-[#1F2F4D]/12 bg-[#1F2F4D]/06 text-[#5C6B8A]",
    light: "border border-white/15 bg-white/06 text-white/50",
  };
  return (
    <div
      className={[
        "inline-block rounded-full px-4 py-1.5 mb-6",
        "font-mono text-[10px] uppercase tracking-[0.28em]",
        styles[variant],
      ].join(" ")}
    >
      {children}
    </div>
  );
};

// ─── The component ────────────────────────────────────────────────────────────
export const TradeManifesto = ({
  config,
  onBookClick,
}: TradeManifestoProps) => {
  const {
    tradeName,
    tradeNounPlural,
    serviceFullName,
    subtitle,
    hook,
    escalation,
    originStory,
    whyItMatters,
    close,
    heroImage,
    atmosphericImage,
  } = config;

  return (
    <article>
      {/* ════════════════════════════════════════════════════════════
          §0 — OPENING HEADER
          min-h-[100dvh], dark navy, atmospheric hero image
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100dvh] flex items-center bg-[#0B1120] overflow-hidden">
        {/* Atmospheric background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
            opacity: 0.1,
            filter: "saturate(0.4) blur(1px)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/60 via-transparent to-[#0B1120]/90"
          aria-hidden
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-40">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            {/* Eyebrow */}
            <motion.div variants={staggerChild}>
              <Eyebrow variant="bronze">
                Why we love · {tradeName} · An honest confession
              </Eyebrow>
            </motion.div>

            {/* H1 — three-line structure */}
            <motion.h1
              variants={staggerChild}
              className="font-display font-light leading-[1.0] tracking-[-0.025em]"
            >
              {/* Line 1 */}
              <span className="block text-[clamp(3rem,8vw,8rem)] text-white/90">
                Why we love
              </span>
              {/* Line 2 — trade name, italic, bronze-tinted */}
              <span className="block text-[clamp(3.5rem,9vw,9rem)] text-[#C9A87C] italic">
                {tradeName}
              </span>
              {/* Line 3 — fade, lighter */}
              <span className="block text-[clamp(2.5rem,6vw,6rem)] text-white/35">
                so much.
              </span>
            </motion.h1>

            {/* Subtitle — mono, small caps */}
            <motion.p
              variants={staggerChild}
              className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-[#C9A87C]/55"
            >
              {subtitle}
            </motion.p>

            {/* Scroll indicator — thin animated line */}
            <motion.div
              variants={staggerChild}
              className="mt-16 flex justify-start"
              aria-hidden
            >
              <div className="w-px h-16 bg-gradient-to-b from-[#8B6B4A]/50 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          §1 — THE HOOK — What we see
          Background: warm parchment #FDFBF7
          Max editorial measure, centered
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#FDFBF7] py-32 md:py-48 overflow-hidden">
        <div className="max-w-3xl mx-auto px-6">
          {/* Casual view — muted italic */}
          <motion.p
            {...fadeUp()}
            className="font-body text-[1.0625rem] leading-[1.8] text-[#7A8BAA]
              font-light italic"
          >
            {hook.casualView}
          </motion.p>

          {/* Bronze rule */}
          <motion.div
            {...fadeUp(0.1)}
            className="w-12 h-px bg-[#8B6B4A]/40 my-10"
            aria-hidden
          />

          {/* Obsessive view — large Cormorant */}
          <motion.p
            {...fadeUp(0.15)}
            className="font-display text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.45]
              tracking-[-0.01em] text-[#1F2F4D] font-light"
          >
            {hook.obsessiveView}
          </motion.p>

          {/* Gift / benefit — Double-Bezel box */}
          <motion.div {...fadeUp(0.25)}>
            <LightBezel className="mt-12">
              <p
                className="font-display text-[1.375rem] leading-[1.4] tracking-[-0.008em]
                  text-[#1F2F4D] italic text-center"
              >
                {hook.giftStatement}
              </p>
              <p
                className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em]
                  text-[#8B6B4A] text-center"
              >
                {hook.benefitStatement}
              </p>
            </LightBezel>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          §2 — ESCALATION — The obsession
          Background: brand navy #1F2F4D
          Staggered numbered list + FactCallout
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#1F2F4D] py-32 md:py-44 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...fadeUp()}>
            <Eyebrow variant="bronze">The obsession</Eyebrow>
          </motion.div>

          {/* Three unknown knowledge items */}
          <div className="mt-4 space-y-8">
            {escalation.unknownKnowledgeItems.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="flex items-start gap-6"
              >
                <span
                  className="font-display text-[5rem] leading-none italic
                    text-[#8B6B4A]/22 select-none flex-shrink-0 w-24 text-right
                    mt-[-0.75rem]"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className="font-body text-[1.0625rem] leading-[1.8]
                    text-white/62 font-light pt-1"
                >
                  The average homeowner will never know{" "}
                  <span className="text-white/80">{item}</span>.
                </p>
              </motion.div>
            ))}
          </div>

          {/* Brand claim */}
          <motion.p
            {...fadeUp(0.35)}
            className="mt-14 font-display text-[clamp(1.375rem,2.5vw,1.75rem)]
              leading-[1.4] tracking-[-0.01em] text-white italic font-light
              max-w-2xl"
          >
            {escalation.brandClaim}
          </motion.p>

          {/* Specific fact callout */}
          <motion.div {...fadeUp(0.45)}>
            <FactCallout>
              <p
                className="font-body text-[1rem] leading-[1.85]
                  text-white/70 font-light"
              >
                {escalation.specificFact}
              </p>
            </FactCallout>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          §3 — ORIGIN STORY — The moment we knew
          Full-bleed atmospheric photo + #0B1120/75 overlay
          Centered editorial pull-quote treatment
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-40 md:py-56 overflow-hidden">
        {atmosphericImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${atmosphericImage})` }}
            aria-hidden
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: atmosphericImage ? "rgba(11,17,32,0.75)" : "#0B1120" }}
          aria-hidden
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <motion.div {...fadeUp()}>
            <Eyebrow variant="light">The origin story</Eyebrow>
          </motion.div>

          {/* Decorative opening quote */}
          <motion.div
            {...fadeUp(0.08)}
            className="font-display text-[9rem] leading-none text-[#8B6B4A]/15
              mb-[-4.5rem] select-none"
            aria-hidden
          >
            "
          </motion.div>

          {/* Story paragraph */}
          <motion.p
            {...fadeUp(0.15)}
            className="font-display text-[clamp(1.25rem,2.2vw,1.625rem)]
              leading-[1.55] tracking-[-0.008em] text-white/82 font-light"
          >
            {originStory.paragraph}
          </motion.p>

          {/* Bronze rule */}
          <motion.div
            {...fadeUp(0.22)}
            className="w-8 h-px bg-[#8B6B4A]/50 my-8 mx-auto"
            aria-hidden
          />

          {/* Punchline */}
          <motion.p
            {...fadeUp(0.28)}
            className="font-display text-[clamp(1.125rem,2vw,1.375rem)]
              leading-[1.55] tracking-[-0.005em] text-white/50 italic font-light"
          >
            {originStory.punchline}
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          §4 — WHY IT MATTERS — For the customer
          Background: warm parchment
          Large Double-Bezel block — maximum commercial weight
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#FDFBF7] py-32 md:py-44 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...fadeUp()}>
            <Eyebrow variant="navy">Why this matters for your home</Eyebrow>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <LargeBezel className="mt-6">
              <p
                className="font-display text-[clamp(1.375rem,2.2vw,1.75rem)]
                  leading-[1.55] tracking-[-0.008em] text-[#1F2F4D] font-light"
              >
                {whyItMatters}
              </p>

              {/* Micro proof pillars */}
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
                {["Done correctly", "Done once", "Guaranteed in writing"].map(
                  (p, i) => (
                    <span key={p} className="flex items-center gap-2">
                      {i > 0 && (
                        <span
                          className="w-1 h-1 rounded-full bg-[#8B6B4A]/50"
                          aria-hidden
                        />
                      )}
                      <span
                        className="font-mono text-[9px] uppercase tracking-[0.22em]
                          text-[#8B6B4A]"
                      >
                        {p}
                      </span>
                    </span>
                  )
                )}
              </div>
            </LargeBezel>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          §5 — THE CLOSE
          Background: #0B1120 — darkest navy
          The kicker gets maximum visual real estate
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0B1120] py-40 md:py-56 overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto px-6 text-center"
        >
          {/* Awareness line */}
          <motion.p
            variants={staggerChild}
            className="font-body text-[1.0625rem] leading-[1.8]
              text-white/40 font-light"
          >
            {close.awarenessLine}
          </motion.p>

          {/* No change statement — elevated Cormorant */}
          <motion.p
            variants={staggerChild}
            className="mt-6 font-display text-[1.75rem] leading-[1.25]
              tracking-[-0.01em] text-white/75 italic"
          >
            {close.noChangeStatement}
          </motion.p>

          {/* Alternative acknowledgment */}
          <motion.p
            variants={staggerChild}
            className="mt-6 font-body text-[0.9375rem] leading-[1.8]
              text-white/30 font-light"
          >
            {close.alternativeAcknowledgment}
          </motion.p>

          {/* Bronze rule */}
          <motion.div
            variants={staggerChild}
            className="w-16 h-px bg-[#8B6B4A]/40 my-10 mx-auto"
            aria-hidden
          />

          {/* THE KICKER — maximum weight */}
          <motion.p
            variants={staggerChild}
            className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)]
              leading-[1.3] tracking-[-0.015em] text-white italic font-light"
          >
            {renderWithBreaks(close.finalLine)}
          </motion.p>

          {/* CTA group */}
          <motion.div variants={staggerChild} className="mt-16">
            <button
              onClick={onBookClick}
              className="group inline-flex items-center gap-3 rounded-full
                bg-[#8B6B4A] px-8 py-5 font-body text-[0.875rem]
                tracking-[0.08em] uppercase text-white
                transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
                hover:bg-[#9E7B58]
                hover:shadow-[0_8px_32px_rgba(139,107,74,0.35)]
                active:scale-[0.98]"
            >
              Work with people who love this
              <span
                className="w-8 h-8 rounded-full bg-white/12 flex items-center
                  justify-center transition-transform duration-500
                  group-hover:translate-x-1 group-hover:-translate-y-[1px]"
                aria-hidden
              >
                →
              </span>
            </button>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div variants={staggerChild} className="mt-4">
            <a
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full
                border border-white/12 px-7 py-3 font-body text-[0.875rem]
                tracking-[0.08em] uppercase text-white/45
                hover:border-white/25 hover:text-white/75
                transition-all duration-500"
            >
              See our work
              <span aria-hidden className="text-[0.75rem]">↗</span>
            </a>
          </motion.div>

          {/* Trust anchors */}
          <motion.div
            variants={staggerChild}
            className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2"
          >
            {["Free Estimate", "Cochrane Team", "Guaranteed in Writing"].map(
              (anchor) => (
                <span
                  key={anchor}
                  className="font-mono text-[9px] uppercase tracking-[0.22em]
                    text-white/22"
                >
                  {anchor}
                </span>
              )
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CREDO + PROMISE — Universal ecosystem closers
      ═══════════════════════════════════════════════════════════════ */}
      <CraftsmanCredo variant="light" />
      <GenerationalPromise
        serviceName={serviceFullName}
        serviceDescription={tradeNounPlural}
      />
    </article>
  );
};
