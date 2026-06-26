import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  scale?: number;
  once?: boolean;
}

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  y = 12,
  scale,
  once = true,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const initial: Record<string, number> = { opacity: 0, y };
  const visible: Record<string, number> = { opacity: 1, y: 0 };
  if (scale !== undefined) {
    initial.scale = scale;
    visible.scale = 1;
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? visible : initial}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
