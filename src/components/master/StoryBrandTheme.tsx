/**
 * StoryBrand Theme — Portable cross-site identity system.
 *
 * Exports five components that attach to every VeePo Master Builder sub-site:
 *   <MasterBrandStrip>      — slim top-of-page ecosystem identity bar
 *   <GenerationalBadge>     — floating pill badge for heroes / CTAs
 *   <GenerationalPromise>   — footer band with the north-star slogan
 *   <StoryBrandHero>        — full hero section, configurable per sub-brand
 *   <CraftsmanCredo>        — 3-statement belief block, above GenerationalPromise
 */

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];
const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};
const STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

// ─── Shield SVG icon ─────────────────────────────────────────────────────────
const ShieldIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
  </svg>
);

// ─── 1. MasterBrandStrip ─────────────────────────────────────────────────────
export interface MasterBrandStripProps {
  serviceName?: string;
}

/**
 * Slim 40px identity bar above every sub-site's own navigation.
 * Unifies the entire VeePo ecosystem at a glance.
 */
export const MasterBrandStrip = ({
  serviceName = "Master Builders",
}: MasterBrandStripProps) => (
  <div className="w-full bg-[#1F2F4D] py-2 px-6 flex items-center justify-between">
    <span
      className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/50 hidden sm:block"
      aria-label="Cochrane Master Builders Family"
    >
      Cochrane {serviceName} Family
    </span>
    <span className="font-display text-[0.875rem] italic text-white/70 mx-auto sm:mx-0">
      Building for generations
    </span>
    <a
      href="/our-story"
      className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C9A87C]/70
        hover:text-[#C9A87C] transition-colors duration-300 hidden md:block"
    >
      Our Story
    </a>
  </div>
);

// ─── 2. GenerationalBadge ────────────────────────────────────────────────────
export interface GenerationalBadgeProps {
  serviceName: string;
  variant?: "dark" | "light";
  className?: string;
}

/**
 * Pill badge that appears in heroes and above section headlines.
 * Carries the legacy signal on every page of every sub-site.
 */
export const GenerationalBadge = ({
  serviceName,
  variant = "dark",
  className = "",
}: GenerationalBadgeProps) => {
  const isDark = variant === "dark";
  return (
    <div
      className={[
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5",
        isDark
          ? "border border-[#8B6B4A]/40 bg-[#8B6B4A]/10"
          : "border border-[#1F2F4D]/15 bg-[#1F2F4D]/05",
        className,
      ].join(" ")}
    >
      <ShieldIcon
        className={[
          "w-3 h-3 flex-shrink-0",
          isDark ? "text-[#C9A87C]" : "text-[#8B6B4A]",
        ].join(" ")}
      />
      <span
        className={[
          "font-mono text-[9px] uppercase tracking-[0.22em]",
          isDark ? "text-[#C9A87C]" : "text-[#8B6B4A]",
        ].join(" ")}
      >
        Cochrane {serviceName} · Built for Generations
      </span>
    </div>
  );
};

// ─── 3. GenerationalPromise ───────────────────────────────────────────────────
export interface GenerationalPromiseProps {
  serviceName: string;
  serviceDescription: string;
}

/**
 * Footer band that closes every sub-site with the north-star brand promise.
 * The emotional anchor — the last thing every visitor reads.
 */
export const GenerationalPromise = ({
  serviceName,
  serviceDescription,
}: GenerationalPromiseProps) => (
  <section className="relative bg-[#0B1120] overflow-hidden">
    {/* Bronze top rule */}
    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#8B6B4A]/60 to-transparent" />

    <motion.div
      className="max-w-4xl mx-auto px-6 py-20 text-center"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={STAGGER}
    >
      {/* Decorative quotation mark */}
      <motion.div
        variants={FADE_UP}
        className="font-display text-[7rem] leading-none text-[#8B6B4A]/15 mb-[-3.5rem] select-none"
        aria-hidden
      >
        "
      </motion.div>

      <motion.blockquote
        variants={FADE_UP}
        className="font-display text-[clamp(1.625rem,3.5vw,2.75rem)] leading-[1.2]
          tracking-[-0.015em] text-white/85 italic font-light"
      >
        Building strong foundations for those who come after us.
      </motion.blockquote>

      <motion.div
        variants={FADE_UP}
        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
          {serviceName}
        </span>
        <span className="hidden sm:block w-px h-3 bg-[#8B6B4A]/40" aria-hidden />
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/30">
          {serviceDescription}
        </span>
        <span className="hidden sm:block w-px h-3 bg-[#8B6B4A]/40" aria-hidden />
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#C9A87C]/50">
          Est. Cochrane · Family Legacy
        </span>
      </motion.div>
    </motion.div>

    {/* Bronze bottom rule */}
    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#8B6B4A]/60 to-transparent" />
  </section>
);

// ─── 4. StoryBrandHero ────────────────────────────────────────────────────────
export interface StoryBrandHeroProps {
  serviceName: string;
  tradeDescriptor: string;
  heroImage: string;
  heroImageAlt?: string;
  onBookClick?: () => void;
}

/**
 * Plug-in hero section for any VeePo sub-site.
 * Editorial Luxury vibe + Double-Bezel image + Button-in-Button CTA.
 * All motion pre-wired via Framer Motion whileInView.
 */
export const StoryBrandHero = ({
  serviceName,
  tradeDescriptor,
  heroImage,
  heroImageAlt = "Craftsman at work",
  onBookClick,
}: StoryBrandHeroProps) => (
  <section className="relative bg-[#0B1120] min-h-[100dvh] flex items-center overflow-hidden">
    {/* Background image — low opacity atmospheric */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroImage})`,
        opacity: 0.12,
        filter: "saturate(0.6)",
      }}
      aria-hidden
    />
    {/* Gradient overlay */}
    <div
      className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/60 via-transparent to-[#0B1120]/80"
      aria-hidden
    />

    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-40">
      <motion.div
        className="max-w-3xl"
        initial="hidden"
        animate="show"
        variants={STAGGER}
      >
        {/* Eyebrow badge */}
        <motion.div variants={FADE_UP}>
          <GenerationalBadge serviceName={serviceName} variant="dark" className="mb-8" />
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={FADE_UP}
          className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[1.02]
            tracking-[-0.02em] text-white font-light"
        >
          Building{" "}
          <em className="italic text-white/80">{tradeDescriptor}</em>
          <br />
          that lasts generations.
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={FADE_UP}
          className="mt-8 max-w-xl text-[1.125rem] leading-[1.75] text-white/55 font-light
            font-body"
        >
          {serviceName}. Cochrane born and raised. Built for the families who
          understand the difference between a job done and a job done right.
        </motion.p>

        {/* CTA group */}
        <motion.div
          variants={FADE_UP}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          {/* Primary — Button-in-Button */}
          <button
            onClick={onBookClick}
            className="group inline-flex items-center gap-3 rounded-full
              bg-[#8B6B4A] px-7 py-4 font-body text-[0.875rem] tracking-[0.06em]
              uppercase text-white transition-all duration-700
              ease-[cubic-bezier(0.32,0.72,0,1)]
              hover:bg-[#9E7B58] hover:shadow-[0_8px_32px_rgba(139,107,74,0.35)]
              active:scale-[0.98]"
          >
            Get Your Free Estimate
            <span
              className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center
                transition-transform duration-500
                group-hover:translate-x-1 group-hover:-translate-y-[1px]"
              aria-hidden
            >
              →
            </span>
          </button>

          {/* Secondary */}
          <a
            href="/our-story"
            className="inline-flex items-center gap-2 font-body text-[0.875rem]
              tracking-[0.06em] uppercase text-white/50
              hover:text-white/80 transition-colors duration-400"
          >
            Our Story
            <span aria-hidden className="text-[0.75rem]">↗</span>
          </a>
        </motion.div>

        {/* Trust anchors */}
        <motion.div
          variants={FADE_UP}
          className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
        >
          {["Free Estimate", "Cochrane-Based", "Guaranteed in Writing"].map(
            (anchor) => (
              <span
                key={anchor}
                className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/25"
              >
                {anchor}
              </span>
            )
          )}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// ─── 5. CraftsmanCredo ────────────────────────────────────────────────────────
export interface CraftsmanCredoProps {
  variant?: "dark" | "light";
  className?: string;
}

const CREDO_STATEMENTS = [
  {
    statement: "We build to last.",
    support: "Not to finish quickly. To finish correctly, once.",
  },
  {
    statement: "We stay until it's finished.",
    support: "Not patched. Not 'good enough.' Finished.",
  },
  {
    statement: "Our name is on it.",
    support:
      "Four generations have maintained that standard. We're not about to stop.",
  },
] as const;

/**
 * Compact three-statement belief block.
 * Place between the last content section and <GenerationalPromise> on any sub-site.
 * Universal across all 150 Master Builder websites — copy never changes.
 */
export const CraftsmanCredo = ({
  variant = "light",
  className = "",
}: CraftsmanCredoProps) => {
  const isDark = variant === "dark";

  return (
    <section
      className={[
        "py-20 md:py-28",
        isDark ? "bg-[#0B1120]" : "bg-[#FDFBF7]",
        className,
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.14 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12"
        >
          {CREDO_STATEMENTS.map(({ statement, support }) => (
            <motion.div
              key={statement}
              variants={FADE_UP}
              className="flex flex-col"
            >
              {/* Bronze top rule */}
              <div className="w-full h-px bg-[#8B6B4A]/40 mb-6" aria-hidden />

              <p
                className={[
                  "font-display text-[1.375rem] leading-[1.25] tracking-[-0.01em] italic",
                  isDark ? "text-white/85" : "text-[#1F2F4D]",
                ].join(" ")}
              >
                {statement}
              </p>

              <p
                className={[
                  "mt-3 font-body text-[0.875rem] leading-[1.7] font-light",
                  isDark ? "text-white/45" : "text-[#5C6B8A]",
                ].join(" ")}
              >
                {support}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
