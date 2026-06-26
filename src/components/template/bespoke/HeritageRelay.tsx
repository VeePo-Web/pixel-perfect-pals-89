/**
 * HeritageRelay — the About-page spine.
 *
 * Reframes the brand from a single family's three-generation story to the
 * town's long line of builders: foundations laid by people who built for
 * people they would never meet. A dated relay (01–04) culminating in the
 * "turn" that hands the line to the reader.
 *
 * The copy lives in TEMPLATE_COPY.about.story so every remix swaps its own
 * town's heritage; this component is generic. Ghost numerals ascend
 * (Benoist). Copper-tick year labels echo the trust-bar hairline. Motion is
 * opacity/transform only and respects prefers-reduced-motion.
 */
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { TEMPLATE_COPY } from "@/config/template/template-copy";

const HeritageRelay = () => {
  const story = TEMPLATE_COPY.about.story;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const rise = (i: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : undefined,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  });

  return (
    <div ref={ref}>
      {/* Intro */}
      <motion.div {...rise(0)} className="max-w-2xl">
        <div className="mb-4 flex items-center gap-3">
          <span aria-hidden className="h-px w-6 flex-shrink-0 bg-copper/40" />
          <p className="font-eyebrow">{story.eyebrow}</p>
        </div>
        <h2 className="text-display-lg text-charcoal">{story.headline}</h2>
        <p className="mt-6 text-body-lg text-graphite">{story.lede}</p>
      </motion.div>

      {/* The relay — one beat per generation of builders */}
      <ol className="mt-16 grid gap-px bg-seam">
        {story.beats.map((beat, i) => (
          <motion.li
            key={beat.year}
            {...rise(i + 1)}
            className="relative overflow-hidden bg-paper px-6 py-10 sm:px-10"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-3 -top-8 select-none font-display leading-none"
              style={{ fontSize: "clamp(7rem, 16vw, 14rem)", color: "hsl(var(--copper) / 0.06)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="relative max-w-2xl">
              <div className="mb-3 flex items-center gap-3">
                <span aria-hidden className="h-px w-8 flex-shrink-0 bg-copper" />
                <p className="font-eyebrow">{beat.year} — {beat.label}</p>
              </div>
              <p className="text-body-lg text-charcoal">{beat.body}</p>
            </div>
          </motion.li>
        ))}
      </ol>

      {/* The turn — the line is handed to the reader */}
      <motion.div {...rise(story.beats.length + 1)} className="mt-16 border-t border-copper/30 pt-10">
        <p className="max-w-3xl font-display text-display-md text-charcoal">{story.turn}</p>
      </motion.div>
    </div>
  );
};

export default HeritageRelay;
