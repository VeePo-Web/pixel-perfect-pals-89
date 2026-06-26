/**
 * ObjectionSection — Hormozi + Brunson false belief destruction.
 *
 * NOT a FAQ. An active objection handler. Brunson: before someone buys,
 * three false beliefs must be broken. Hormozi: address each with
 * a pattern interrupt headline + price anchor + risk reversal.
 *
 * Universal across all 150 Master Builder sites.
 * The three objections never change — only the trade-specific examples do.
 */

import { motion } from "framer-motion";

interface Objection {
  num: string;
  falseBelief: string;
  headline: string;
  body: string;
  resolution: string;
}

interface ObjectionSectionProps {
  objections?: Objection[];
  className?: string;
}

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

const DEFAULT_OBJECTIONS: Objection[] = [
  {
    num: "01",
    falseBelief: "Quality construction is always more expensive than I can afford.",
    headline: "The expensive option is paying twice.",
    body: "A general contractor charges $4,000–$8,000 for a basement installation package. Our range is $1,800–$3,200 for the same scope — because we specialize in exactly this, and we don't bring six trades when two will do. The 15-year structural guarantee means you pay once. That's the math.",
    resolution:
      "A written quote tied to your specific scope. A guarantee that means you never pay for the same job again. The investment you make is the last one you make.",
  },
  {
    num: "02",
    falseBelief: "All contractors say they're different. None of them are.",
    headline: "We know. That's why everything is in writing.",
    body: "We've heard this from almost every client who called us after a bad experience. Jordan M. in Sunset Ridge had a crack other contractors kept calling 'just settling.' We patched it properly. You cannot find it. The difference is not a slogan — it's a Level 5 finish standard and a 15-year structural guarantee on the invoice.",
    resolution:
      "We work on that assumption every single time we quote a job. The quote is written. The guarantee is written. The timeline is agreed before any work starts. Which is why the guarantee goes on the invoice.",
  },
  {
    num: "03",
    falseBelief: "I can deal with this later. It's not that urgent.",
    headline: "The wall will not fix itself.",
    body: "Small drywall damage becomes structural compromise when moisture gets in. The job that costs $350 today costs $900 next year. The crack that you've been meaning to address for two winters is now a conversation about insulation and vapour barrier. The right time to fix it was six months ago. The second-best time is now.",
    resolution:
      "The job is cheaper now than it will be in two years. The house is quieter now than it will feel after another winter of noticing it. The right time is always slightly in the past.",
  },
];

export const ObjectionSection = ({
  objections = DEFAULT_OBJECTIONS,
  className = "",
}: ObjectionSectionProps) => {
  return (
    <section
      className={["bg-[#1F2F4D] py-20 md:py-32 overflow-hidden", className].join(
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
          className="mb-14"
        >
          <div className="inline-block rounded-full border border-[#8B6B4A]/35 bg-[#8B6B4A]/10 px-4 py-1.5 mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#C9A87C]">
              The real questions
            </span>
          </div>
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] tracking-[-0.015em] text-white font-light italic max-w-xl">
            What people actually want to know before they hire us.
          </h2>
        </motion.div>

        {/* Three objection panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {objections.map(({ num, falseBelief, headline, body, resolution }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
            >
              {/* Dark Double-Bezel */}
              <div className="ring-1 ring-white/08 rounded-[1.5rem] p-1.5 bg-white/[0.02] h-full">
                <div className="rounded-[calc(1.5rem-0.375rem)] p-8 bg-[#0B1120] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] h-full flex flex-col">
                  {/* Number + false belief label */}
                  <div>
                    <span
                      className="font-display text-[4rem] leading-none italic text-[#8B6B4A]/22 select-none block"
                      aria-hidden
                    >
                      {num}
                    </span>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mt-1">
                      The false belief: "{falseBelief}"
                    </p>
                  </div>

                  {/* Pattern interrupt headline */}
                  <h3 className="font-display text-[1.5rem] leading-[1.2] tracking-[-0.01em] text-white italic font-light mt-6">
                    {headline}
                  </h3>

                  {/* Body */}
                  <p className="mt-5 font-body text-[0.9375rem] leading-[1.8] text-white/60 font-light flex-1">
                    {body}
                  </p>

                  {/* Resolution — bronze, slightly elevated */}
                  <div className="mt-7 border-t border-white/06 pt-6">
                    <p className="font-display text-[1rem] leading-[1.5] tracking-[-0.005em] text-[#C9A87C]/80 italic font-light">
                      {resolution}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
