import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface EditorialImageProps {
  src: string;
  alt: string;
  caption?: string;
  /** Tailwind aspect class. Default 'aspect-[4/5]'. */
  aspect?: string;
  className?: string;
}

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

/**
 * Editorial side-image with a top→bottom clip-path reveal on scroll.
 * On-brand: "surface refinement" motion, hairline border, paper caption.
 */
const EditorialImage = ({
  src,
  alt,
  caption,
  aspect = "aspect-[4/5]",
  className = "",
}: EditorialImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <figure className={`space-y-3 ${className}`}>
      <div
        ref={ref}
        className={`relative overflow-hidden border border-seam ${aspect}`}
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover will-change-[clip-path]"
          initial={{
            clipPath: reduced ? "inset(0)" : "inset(100% 0 0 0)",
            scale: reduced ? 1 : 1.04,
          }}
          animate={
            inView
              ? { clipPath: "inset(0% 0 0 0)", scale: 1 }
              : { clipPath: "inset(100% 0 0 0)", scale: 1.04 }
          }
          transition={{ duration: reduced ? 0 : 1.0, ease: EASE }}
        />
      </div>
      {caption && (
        <figcaption className="text-caption text-mist">{caption}</figcaption>
      )}
    </figure>
  );
};

export default EditorialImage;
