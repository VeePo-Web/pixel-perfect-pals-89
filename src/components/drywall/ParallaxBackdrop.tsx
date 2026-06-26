import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxBackdropProps {
  image: string;
  alt?: string;
  /** CSS height of the divider section. Default '60vh'. */
  height?: string;
  /** Optional headline floated over the backdrop. */
  headline?: string;
  /** Optional eyebrow above the headline. */
  eyebrow?: string;
  /** Headline alignment. Default 'center'. */
  align?: "center" | "left";
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Full-bleed atmospheric divider used between sections.
 * Uses a 130%-tall image translated -15% → +15% on scroll for full coverage
 * with no exposed background. Bone gradient feathers into adjacent sections.
 */
const ParallaxBackdrop = ({
  image,
  alt = "",
  height = "60vh",
  headline,
  eyebrow,
  align = "center",
}: ParallaxBackdropProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const decorative = !headline && !eyebrow;
  const isCenter = align === "center";

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden bg-bone"
      style={{ height }}
      aria-hidden={decorative ? "true" : undefined}
    >
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: "-15%",
          height: "130%",
          y: reduced ? 0 : y,
          willChange: "transform",
        }}
      >
        <img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Top + bottom bone feather so the divider melts into adjacent sections */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-bone via-bone/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bone via-bone/60 to-transparent" />

      {/* Soft vignette for paper feel */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(67,61,57,0.10)_100%)]" />

      {(headline || eyebrow) && (
        <div className="relative z-10 flex h-full items-center">
          <div className={`container mx-auto px-6 ${isCenter ? "text-center" : ""}`}>
            <div className={`max-w-3xl ${isCenter ? "mx-auto" : ""}`}>
              {eyebrow && <p className="font-eyebrow mb-4">{eyebrow}</p>}
              {headline && (
                <h2 className="text-display-lg text-charcoal">{headline}</h2>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParallaxBackdrop;
