import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  loading?: "lazy" | "eager";
  hoverScale?: boolean;
}

const EASE = [0.25, 0.1, 0.25, 1.0] as [number, number, number, number];

const RevealImage = ({
  src,
  alt,
  className = "",
  aspectRatio = "aspect-[4/3]",
  loading = "lazy",
  hoverScale = true,
}: RevealImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={`overflow-hidden ${aspectRatio} ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        className={`w-full h-full object-cover will-change-[clip-path,filter] ${hoverScale ? "hover:scale-[1.02] transition-transform duration-700 ease-out" : ""} ${inView ? "reveal-image-ken-burns" : ""}`}
        initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.05, filter: "blur(4px)" }}
        animate={inView ? { clipPath: "inset(0% 0 0 0)", scale: 1, filter: "blur(0px)" } : { clipPath: "inset(100% 0 0 0)", scale: 1.05, filter: "blur(4px)" }}
        transition={{ duration: 1.0, ease: EASE }}
      />
    </div>
  );
};

export default RevealImage;
