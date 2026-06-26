import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";

interface RevealTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

const EASE = [0.25, 0.1, 0.25, 1.0] as [number, number, number, number];

const RevealText = ({
  text,
  as: Tag = "h1",
  className = "",
  delay = 0,
  staggerDelay = 0.04,
}: RevealTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const words = useMemo(() => text.split(" "), [text]);

  return (
    <Tag className={className} ref={ref as any}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0, scale: 1.02 }}
            animate={inView ? { y: "0%", opacity: 1, scale: 1 } : { y: "100%", opacity: 0, scale: 1.02 }}
            transition={{
              duration: 0.6,
              delay: delay + i * staggerDelay,
              ease: EASE,
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
};

export default RevealText;
