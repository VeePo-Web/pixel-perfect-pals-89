/**
 * GrandSlamOffer — Hormozi's $100M Offers value stack, fully rendered.
 *
 * A Grand Slam Offer is not a price. It is a NAMED PACKAGE with:
 *   - A value stack (each item worth more than you charge for it)
 *   - A price anchor (what inferior alternatives cost)
 *   - A named guarantee
 *   - A "who this is for / not for" pre-qualification
 *
 * Config-driven — adapts to any trade by changing offer.config.ts.
 */

import { motion } from "framer-motion";
import { GRAND_SLAM_OFFER } from "@/config/offer.config";
import { GuaranteeBlock } from "./GuaranteeBlock";

interface GrandSlamOfferProps {
  onBookClick?: () => void;
  showGuarantee?: boolean;
  className?: string;
}

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.85, ease: EASE, delay },
});

// ─── Checkmark icon ───────────────────────────────────────────────────────────
const Check = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    className="w-5 h-5 flex-shrink-0 mt-0.5"
    aria-hidden
  >
    <circle cx="10" cy="10" r="9" stroke="#8B6B4A" strokeWidth="1.25" strokeOpacity="0.4" />
    <path
      d="M6.5 10.5l2.5 2.5 4.5-5"
      stroke="#8B6B4A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const GrandSlamOffer = ({
  onBookClick,
  showGuarantee = false,
  className = "",
}: GrandSlamOfferProps) => {
  const offer = GRAND_SLAM_OFFER;

  return (
    <div className={className}>
      {/* ── Value Stack Section ─────────────────────────────────────── */}
      <section className="bg-[#FDFBF7] py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
            {/* Left — header + value stack */}
            <div className="col-span-12 md:col-span-7">
              <motion.div {...fadeUp()}>
                <div className="inline-block rounded-full border border-[#1F2F4D]/12 bg-[#1F2F4D]/06 px-4 py-1.5 mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5C6B8A]">
                    The Offer
                  </span>
                </div>
                <h2 className="font-display text-[clamp(2rem,3.5vw,3.25rem)] leading-[1.08] tracking-[-0.018em] text-[#1F2F4D]">
                  {offer.offerName}
                </h2>
                <p className="mt-4 font-body text-[1.0625rem] leading-[1.75] text-[#5C6B8A] font-light max-w-xl">
                  {offer.tagline}
                </p>
              </motion.div>

              {/* Value stack items */}
              <div className="mt-10 space-y-0">
                {offer.items.map((item, i) => (
                  <motion.div
                    key={item.label}
                    {...fadeUp(0.08 + i * 0.08)}
                  >
                    <div className={[
                      "flex items-start gap-4 py-6",
                      i < offer.items.length - 1
                        ? "border-b border-[#EDE9E1]"
                        : "",
                    ].join(" ")}>
                      <Check />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-[1.25rem] leading-[1.2] tracking-[-0.01em] text-[#1F2F4D]">
                          {item.label}
                        </h3>
                        <p className="mt-2 font-body text-[0.9375rem] leading-[1.7] text-[#5C6B8A] font-light">
                          {item.description}
                        </p>
                        <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#8B6B4A]">
                          {item.valueNote}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Price anchor */}
              {offer.priceAnchor && (
                <motion.div {...fadeUp(0.08 + offer.items.length * 0.08)}>
                  <div className="mt-8 rounded-[1.25rem] border border-[#1F2F4D]/08 bg-[#1F2F4D]/04 p-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#5C6B8A] mb-2">
                      Price Anchor
                    </p>
                    <p className="font-body text-[0.9375rem] leading-[1.7] text-[#1F2F4D] font-light">
                      {offer.priceAnchor}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right — summary card + CTA */}
            <motion.div
              {...fadeUp(0.2)}
              className="col-span-12 md:col-span-5 md:sticky md:top-24"
            >
              {/* Double-Bezel summary card */}
              <div className="ring-1 ring-[#1F2F4D]/07 rounded-[2rem] p-2 bg-[#EDE9E1]/60">
                <div className="rounded-[calc(2rem-0.5rem)] p-8 bg-[#FDFBF7] shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)]">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#8B6B4A] mb-5">
                    What's included
                  </p>
                  <ul className="space-y-3">
                    {offer.items.map((item) => (
                      <li key={item.label} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8B6B4A] flex-shrink-0" aria-hidden />
                        <span className="font-body text-[0.875rem] text-[#1F2F4D] font-light leading-[1.4]">
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 w-full h-px bg-[#EDE9E1]" aria-hidden />

                  <p className="mt-6 font-display text-[1rem] leading-[1.4] tracking-[-0.005em] text-[#1F2F4D] italic">
                    All of this. On every project. In writing.
                  </p>

                  {/* Primary CTA — Button-in-Button */}
                  <button
                    onClick={onBookClick}
                    className="group mt-7 w-full inline-flex items-center justify-center gap-3
                      rounded-full bg-[#8B6B4A] px-6 py-4 font-body text-[0.875rem]
                      tracking-[0.06em] uppercase text-white
                      transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
                      hover:bg-[#9E7B58]
                      hover:shadow-[0_8px_32px_rgba(139,107,74,0.3)]
                      active:scale-[0.98]"
                  >
                    {offer.ctaLabel}
                    <span
                      className="w-7 h-7 rounded-full bg-white/15 flex items-center
                        justify-center transition-transform duration-500
                        group-hover:translate-x-1 group-hover:-translate-y-[1px]"
                      aria-hidden
                    >
                      →
                    </span>
                  </button>

                  <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-[#7A8BAA] text-center">
                    Free · No obligation · In writing
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Who This Is For / Not For ───────────────────────────────── */}
      <section className="bg-[#1F2F4D] py-16 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Who for */}
            <motion.div {...fadeUp()}>
              <div className="ring-1 ring-white/08 rounded-[1.5rem] p-1.5 bg-[#8B6B4A]/06">
                <div className="rounded-[calc(1.5rem-0.375rem)] p-8 bg-[#0B1120] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#C9A87C]/60 mb-4">
                    This is for you if
                  </p>
                  <p className="font-body text-[1rem] leading-[1.8] text-white/70 font-light">
                    {offer.whoFor}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Who not for */}
            <motion.div {...fadeUp(0.1)}>
              <div className="ring-1 ring-white/06 rounded-[1.5rem] p-1.5 bg-white/[0.02]">
                <div className="rounded-[calc(1.5rem-0.375rem)] p-8 bg-[#0B1120]/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/25 mb-4">
                    This is not for you if
                  </p>
                  <p className="font-body text-[1rem] leading-[1.8] text-white/40 font-light">
                    {offer.whoNotFor}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Optional guarantee block */}
      {showGuarantee && <GuaranteeBlock variant="full" />}
    </div>
  );
};
