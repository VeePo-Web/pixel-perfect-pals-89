import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  imageSrc: string;
  alt: string;
  height?: string;
  variant?: "default" | "deep" | "warm";
}

const gradientOverlays = {
  default: "bg-gradient-to-b from-asphalt/40 via-transparent to-asphalt/60",
  deep: "bg-gradient-to-b from-asphalt/50 via-asphalt/10 to-asphalt/60",
  warm: "",
};

const SectionDivider = ({ imageSrc, alt, height = "50vh", variant = "default" }: SectionDividerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden grain-overlay"
      style={{ height }}
      role="img"
      aria-label={alt}
    >
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <img
          src={imageSrc}
          alt={alt}
          className="absolute -top-[15%] w-full h-[130%] object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Base gradient overlay — variant-specific */}
      <div className={`absolute inset-0 pointer-events-none ${gradientOverlays[variant]}`} />

      {/* Warm variant: amber-tinted overlay */}
      {variant === "warm" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, hsl(25 40% 12% / 0.3) 0%, transparent 40%, hsl(220 8% 12% / 0.5) 100%)",
          }}
        />
      )}

      {/* Vignette */}
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Deep variant: radial copper ambient glow */}
      {variant === "deep" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, hsl(25 60% 55% / 0.05) 0%, transparent 55%)" }}
        />
      )}

      {/* Warm variant: subtle warm radial glow */}
      {variant === "warm" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 60%, hsl(25 50% 45% / 0.06) 0%, transparent 50%)" }}
        />
      )}

      {/* Tapered copper horizon lines with shimmer */}
      <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none">
        <div className="divider-horizon-line h-[2px] w-2/5 bg-gradient-to-r from-transparent via-copper/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none">
        <div className="divider-horizon-line h-[2px] w-2/5 bg-gradient-to-r from-transparent via-copper/20 to-transparent" />
      </div>
    </div>
  );
};

export default SectionDivider;
