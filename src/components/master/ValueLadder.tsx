/**
 * ValueLadder — Brunson's visual ascension model.
 *
 * Shows the customer where they are on the service path and what's next.
 * Brunson: "Every customer should have a clear path from entry to premium."
 *
 * Desktop: horizontal progression with connecting arrows.
 * Mobile: vertical timeline with left-side bronze connector line.
 */

import { motion } from "framer-motion";

export interface LadderTier {
  label: string;
  priceRange: string;
  description: string;
  idealFor: string;
  href?: string;
}

interface ValueLadderProps {
  tiers?: LadderTier[];
  highlightIndex?: number;
  showStrip?: boolean;
  className?: string;
}

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

const DEFAULT_TIERS: LadderTier[] = [
  {
    label: "The Repair Visit",
    priceRange: "$150–$450",
    description: "Patches, cracks, holes, water-damaged sections. In and out in a day.",
    idealFor: "First project. Fast fix. See the standard first-hand.",
    href: "/drywall-repair",
  },
  {
    label: "The Installation Job",
    priceRange: "$900–$3,500",
    description: "New walls, ceilings, boarding over framing. The step up from repair.",
    idealFor: "Unfinished spaces, renovation sections, full rooms.",
    href: "/drywall-installation",
  },
  {
    label: "The Starter Package",
    priceRange: "$1,800–$4,500",
    description: "Insulation + boarding + finishing. A complete functional space.",
    idealFor: "Basement or garage transformation from scratch.",
    href: "/garage-packages",
  },
  {
    label: "The Full Project",
    priceRange: "$3,500–$8,000+",
    description: "Full scope: framing, insulation, drywall, tape, finish, paint.",
    idealFor: "Complete basement or multi-room renovation.",
    href: "/basement-packages",
  },
];

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5 text-[#8B6B4A]/40"
    aria-hidden
  >
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ValueLadder = ({
  tiers = DEFAULT_TIERS,
  highlightIndex = 0,
  showStrip = true,
  className = "",
}: ValueLadderProps) => {
  return (
    <section
      className={["bg-[#FDFBF7] py-20 md:py-28 overflow-hidden", className].join(
        " "
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-12"
        >
          <div className="inline-block rounded-full border border-[#1F2F4D]/12 bg-[#1F2F4D]/06 px-4 py-1.5 mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#5C6B8A]">
              The Path
            </span>
          </div>
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] tracking-[-0.015em] text-[#1F2F4D] font-light max-w-lg">
            Start where you need to. Move up when you're ready.
          </h2>
        </motion.div>

        {/* Desktop: horizontal progression */}
        <div className="hidden md:flex items-stretch gap-0">
          {tiers.map((tier, i) => {
            const isHighlighted = i === highlightIndex;
            return (
              <div key={tier.label} className="flex items-center flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.75, ease: EASE, delay: i * 0.1 }}
                  className="flex-1"
                >
                  {/* Tier card */}
                  {isHighlighted ? (
                    /* Highlighted tier — dark navy */
                    <div className="ring-1 ring-[#1F2F4D]/15 rounded-[1.5rem] p-1.5 bg-[#1F2F4D]/08 h-full">
                      <div className="rounded-[calc(1.5rem-0.375rem)] p-7 bg-[#1F2F4D] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] h-full flex flex-col">
                        <span className="font-display text-[3.5rem] leading-none italic text-[#8B6B4A]/40 select-none" aria-hidden>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-[1.25rem] leading-[1.2] tracking-[-0.01em] text-white font-light mt-[-0.5rem]">
                          {tier.label}
                        </h3>
                        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#C9A87C]">
                          {tier.priceRange}
                        </p>
                        <p className="mt-4 font-body text-[0.875rem] leading-[1.65] text-white/60 font-light flex-1">
                          {tier.description}
                        </p>
                        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
                          {tier.idealFor}
                        </p>
                        {tier.href && (
                          <a
                            href={tier.href}
                            className="mt-5 inline-flex items-center gap-1 font-mono text-[11px]
                              uppercase tracking-[0.2em] text-[#C9A87C]/70 hover:text-[#C9A87C]
                              transition-colors"
                          >
                            Learn more ↗
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Non-highlighted tier — light bezel */
                    <div className="ring-1 ring-[#1F2F4D]/06 rounded-[1.5rem] p-1.5 bg-white/80 h-full">
                      <div className="rounded-[calc(1.5rem-0.375rem)] p-7 bg-[#FDFBF7] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] h-full flex flex-col">
                        <span className="font-display text-[3.5rem] leading-none italic text-[#8B6B4A]/20 select-none" aria-hidden>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-[1.25rem] leading-[1.2] tracking-[-0.01em] text-[#1F2F4D] font-light mt-[-0.5rem]">
                          {tier.label}
                        </h3>
                        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#8B6B4A]">
                          {tier.priceRange}
                        </p>
                        <p className="mt-4 font-body text-[0.875rem] leading-[1.65] text-[#5C6B8A] font-light flex-1">
                          {tier.description}
                        </p>
                        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#7A8BAA]">
                          {tier.idealFor}
                        </p>
                        {tier.href && (
                          <a
                            href={tier.href}
                            className="mt-5 inline-flex items-center gap-1 font-mono text-[11px]
                              uppercase tracking-[0.2em] text-[#8B6B4A]/60 hover:text-[#8B6B4A]
                              transition-colors"
                          >
                            Learn more ↗
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Arrow connector between cards */}
                {i < tiers.length - 1 && (
                  <div className="flex-shrink-0 px-2" aria-hidden>
                    <ArrowIcon />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden space-y-0">
          {tiers.map((tier, i) => {
            const isHighlighted = i === highlightIndex;
            const isLast = i === tiers.length - 1;

            return (
              <div key={tier.label} className="flex gap-4">
                {/* Timeline connector */}
                <div className="flex flex-col items-center flex-shrink-0 pt-6">
                  <div className={[
                    "w-2 h-2 rounded-full flex-shrink-0",
                    isHighlighted ? "bg-[#8B6B4A]" : "bg-[#8B6B4A]/30",
                  ].join(" ")} />
                  {!isLast && (
                    <div className="w-px flex-1 bg-[#8B6B4A]/20 mt-1 mb-0 min-h-[2rem]" />
                  )}
                </div>

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                  className="flex-1 pb-4"
                >
                  <div className={[
                    "ring-1 rounded-[1.25rem] p-1.5",
                    isHighlighted ? "ring-[#1F2F4D]/15 bg-[#1F2F4D]/08" : "ring-[#1F2F4D]/06 bg-white/80",
                  ].join(" ")}>
                    <div className={[
                      "rounded-[calc(1.25rem-0.375rem)] p-5",
                      isHighlighted
                        ? "bg-[#1F2F4D] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                        : "bg-[#FDFBF7] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]",
                    ].join(" ")}>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className={[
                          "font-display text-[1.125rem] leading-[1.2] tracking-[-0.01em] font-light",
                          isHighlighted ? "text-white" : "text-[#1F2F4D]",
                        ].join(" ")}>
                          {tier.label}
                        </h3>
                        <span className={[
                          "font-mono text-[11px] uppercase tracking-[0.2em] flex-shrink-0",
                          isHighlighted ? "text-[#C9A87C]" : "text-[#8B6B4A]",
                        ].join(" ")}>
                          {tier.priceRange}
                        </span>
                      </div>
                      <p className={[
                        "mt-3 font-body text-[0.875rem] leading-[1.65] font-light",
                        isHighlighted ? "text-white/60" : "text-[#5C6B8A]",
                      ].join(" ")}>
                        {tier.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Bottom strip */}
        {showStrip && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-[#7A8BAA] text-center"
          >
            Most clients start with 01. Most come back for 02 and 03.
          </motion.p>
        )}
      </div>
    </section>
  );
};
