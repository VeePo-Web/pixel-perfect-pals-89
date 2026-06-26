import { motion, useReducedMotion } from "framer-motion";

interface AmbientBackdropProps {
  image: string;
  /** 0–1. Default 0.10. */
  opacity?: number;
  /** Where the bone mask anchors. Default 'center'. */
  position?: "top" | "center" | "bottom";
}

/**
 * Section-scoped atmospheric backdrop. Parent must be `relative`.
 * Sits at the back of the section at low opacity with a slow Ken-Burns drift.
 * Decorative — fully aria-hidden, pointer-events disabled.
 */
const AmbientBackdrop = ({
  image,
  opacity = 0.1,
  position = "center",
}: AmbientBackdropProps) => {
  const reduced = useReducedMotion();

  const maskClass =
    position === "top"
      ? "bg-gradient-to-b from-transparent via-bone/40 to-bone/80"
      : position === "bottom"
      ? "bg-gradient-to-t from-transparent via-bone/40 to-bone/80"
      : "bg-gradient-to-b from-bone/60 via-transparent to-bone/60";

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.img
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity }}
        initial={{ scale: 1 }}
        animate={reduced ? { scale: 1 } : { scale: 1.06 }}
        transition={
          reduced
            ? { duration: 0 }
            : {
                duration: 20,
                ease: "linear",
                repeat: Infinity,
                repeatType: "mirror",
              }
        }
      />
      <div className={`absolute inset-0 ${maskClass}`} />
    </div>
  );
};

export default AmbientBackdrop;
