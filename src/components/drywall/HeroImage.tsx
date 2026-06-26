import { motion, useReducedMotion } from "framer-motion";

interface HeroImageProps {
  src: string;
  alt: string;
  /** Side the gradient anchors to (where copy sits). Default 'left'. */
  gradientFrom?: "left" | "right" | "bottom";
  /** Image opacity 0–100. Default 35. Tune per page. */
  opacity?: number;
  /** Eager-load above the fold. Default true. */
  priority?: boolean;
  /** Optional CSS blur amount (px). Default 0. */
  blurAmount?: number;
  /** Optional pattern overlay. Default 'none'. */
  overlayPattern?: "paper-grain" | "none";
}

/**
 * Full-bleed hero backdrop image, sits behind the paper-grain layer of
 * Hero/InnerHero. Calibrated bone gradient ensures headline copy retains
 * AAA contrast regardless of what the image shows. Subtle Ken-Burns drift,
 * disabled under prefers-reduced-motion.
 */
const HeroImage = ({
  src,
  alt,
  gradientFrom = "left",
  opacity = 35,
  priority = true,
  blurAmount = 0,
  overlayPattern = "none",
}: HeroImageProps) => {
  const reduced = useReducedMotion();

  const gradientClass =
    gradientFrom === "left"
      ? "bg-gradient-to-r from-bone via-bone/85 to-bone/40"
      : gradientFrom === "right"
      ? "bg-gradient-to-l from-bone via-bone/85 to-bone/40"
      : "bg-gradient-to-t from-bone via-bone/80 to-bone/30";

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        // @ts-expect-error - fetchpriority is valid HTML5
        fetchpriority={priority ? "high" : "low"}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          opacity: opacity / 100,
          filter: blurAmount > 0 ? `blur(${blurAmount}px)` : undefined,
        }}
        initial={{ scale: reduced ? 1 : 1.04 }}
        animate={{ scale: 1 }}
        transition={{ duration: reduced ? 0 : 9, ease: "easeOut" }}
      />
      {/* Bone overlay — guarantees text legibility */}
      <div className={`absolute inset-0 ${gradientClass}`} />
      {/* Faint vignette at the very edges to reinforce paper feel */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(67,61,57,0.08)_100%)]" />
      {overlayPattern === "paper-grain" && (
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "180px 180px",
          }}
        />
      )}
    </div>
  );
};

export default HeroImage;
