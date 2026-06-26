import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface EditorialQuoteProps {
  quote: string;
  attribution?: string;
  image: string;
  /** CSS height. Default '48vh'. */
  height?: string;
}

/**
 * Pull-quote layered over a blurred plate with subtle parallax drift.
 * The image sits at low opacity beneath a bone overlay so the forest
 * serif quote stays AAA-legible without manual contrast tuning per page.
 */
const EditorialQuote = ({
  quote,
  attribution,
  image,
  height = "48vh",
}: EditorialQuoteProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Half-strength drift compared to ParallaxBackdrop
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <figure
      ref={ref}
      className="relative w-full overflow-hidden bg-bone"
      style={{ height }}
    >
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: "-10%",
          height: "120%",
          y: reduced ? 0 : y,
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          style={{ opacity: 0.28 }}
        />
      </motion.div>

      {/* Bone wash for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-bone/55" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-bone to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bone to-transparent" />

      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-6 text-center">
          <blockquote className="mx-auto max-w-3xl">
            <p className="font-display text-pull-quote text-forest">“{quote}”</p>
            {attribution && (
              <footer className="font-eyebrow mt-6">{attribution}</footer>
            )}
          </blockquote>
        </div>
      </div>
    </figure>
  );
};

export default EditorialQuote;
