/**
 * GuaranteeBlock — Hormozi's 3-tier risk reversal, fully rendered.
 *
 * The single most powerful conversion component in the stack.
 * Hormozi: "The guarantee should scare you a little. If it doesn't,
 * it's not strong enough."
 *
 * Place on: service pages, contact page, hero sections, /the-offer.
 * Use compact variant in trust bars and CTA bands.
 */

import { motion } from "framer-motion";

interface GuaranteeBlockProps {
  variant?: "full" | "compact";
  className?: string;
}

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const GUARANTEES = [
  {
    num: "01",
    name: "The Worksite Guarantee",
    promise:
      "If our site is not visibly cleaner than we found it when we arrived, the work is free.",
    note: "Not a canned exception. Just the rule.",
  },
  {
    num: "02",
    name: "The Touch-Up Guarantee",
    promise:
      "Any finish issue within 14 days: we return at zero cost. No argument. No second invoice.",
    note: "In writing on every quote.",
  },
  {
    num: "03",
    name: "The 15-Year Structural Guarantee",
    promise:
      "Any structural work we complete is warranted for 15 years in writing on every invoice.",
    note: "Industry standard is 1–2 years.",
  },
] as const;

// ─── Full 3-panel variant ────────────────────────────────────────────────────
const FullGuarantee = ({ className = "" }: { className?: string }) => (
  <section
    className={["bg-[#1F2F4D] py-20 md:py-28 overflow-hidden", className].join(
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
        <div className="inline-block rounded-full border border-[#8B6B4A]/35 bg-[#8B6B4A]/10 px-4 py-1.5 mb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#C9A87C]">
            The Guarantee
          </span>
        </div>
        <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] tracking-[-0.015em] text-white font-light italic max-w-xl">
          Three guarantees. All of them in writing. None of them negotiable.
        </h2>
      </motion.div>

      {/* Three guarantee panels */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {GUARANTEES.map(({ num, name, promise, note }) => (
          <motion.div key={num} variants={staggerChild}>
            {/* Outer bezel */}
            <div className="ring-1 ring-white/08 rounded-[1.5rem] p-1.5 bg-white/[0.03] h-full">
              {/* Inner core */}
              <div className="rounded-[calc(1.5rem-0.375rem)] p-8 bg-[#0B1120] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] h-full flex flex-col justify-between">
                <div>
                  <span
                    className="font-display text-[4.5rem] leading-none italic text-[#8B6B4A]/25 select-none block"
                    aria-hidden
                  >
                    {num}
                  </span>
                  <h3 className="font-display text-[1.375rem] leading-[1.2] tracking-[-0.01em] text-white font-light italic mt-[-0.5rem]">
                    {name}
                  </h3>
                  <p className="mt-5 font-body text-[1rem] leading-[1.75] text-white/65 font-light">
                    {promise}
                  </p>
                </div>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
                  {note}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-6 rounded-xl bg-[#8B6B4A]/12 py-4 px-6"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55 text-center">
          All three guarantees are in writing. On every invoice.
          Non-negotiable.
        </p>
      </motion.div>
    </div>
  </section>
);

// ─── Compact 3-chip variant ───────────────────────────────────────────────────
const CompactGuarantee = ({ className = "" }: { className?: string }) => (
  <div
    className={[
      "flex flex-wrap gap-3 justify-center md:justify-start",
      className,
    ].join(" ")}
  >
    {GUARANTEES.map(({ name }) => (
      <div
        key={name}
        className="inline-flex items-center gap-2 rounded-full
          border border-[#8B6B4A]/30 bg-[#8B6B4A]/08 px-4 py-1.5"
      >
        {/* Shield check icon */}
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className="w-3.5 h-3.5 text-[#C9A87C] flex-shrink-0"
          aria-hidden
        >
          <path
            d="M8 1.5L2 4v4c0 3.5 2.5 6.75 6 7.5C11.5 14.75 14 11.5 14 8V4L8 1.5z"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          <path
            d="M5.5 8l2 2 3-3"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C9A87C]">
          {name}
        </span>
      </div>
    ))}
  </div>
);

// ─── Export ───────────────────────────────────────────────────────────────────
export const GuaranteeBlock = ({
  variant = "full",
  className = "",
}: GuaranteeBlockProps) => {
  if (variant === "compact") return <CompactGuarantee className={className} />;
  return <FullGuarantee className={className} />;
};
