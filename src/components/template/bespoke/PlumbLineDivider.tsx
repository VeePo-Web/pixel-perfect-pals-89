/**
 * PlumbLineDivider — The Heirloom Section Divider
 *
 * A copper hairline with a single 6px copper diamond suspended from
 * a 24px vertical hairline — a plumb-bob. On scroll into view, the
 * diamond drops 24px on a spring (stiffness 260, damping 18) into its
 * resting position. Between sections, a centered editorial composition:
 *
 *   ——————————— ◆ ———————————
 *
 * The plumb-bob reads as a builder's instrument: level, plumb, square.
 * Trade-agnostic — it references craft, not any specific trade.
 *
 * "slow, deliberate, heavy animations as opposed to fast, bouncy,
 *  cheap animations" — 1.5.1 UX Psychology System Partner
 *
 * Can optionally render the slogan in 10px tracked caps below.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface PlumbLineDividerProps {
  showSlogan?: boolean;
  slogan?: string;
  className?: string;
}

const PlumbLineDivider = ({
  showSlogan = false,
  slogan = "",
  className = "",
}: PlumbLineDividerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-0 py-2 select-none ${className}`}
      aria-hidden
    >
      {/* Plumb vertical drop line */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={inView ? { height: 24, opacity: 1 } : {}}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-px bg-copper/60"
        style={{ minHeight: inView ? 24 : 0 }}
      />

      {/* ◆ Diamond — the plumb bob weight */}
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 18,
          delay: 0.3,
        }}
        style={{
          width: 8,
          height: 8,
          background: "hsl(var(--copper))",
          transform: "rotate(45deg)",
          flexShrink: 0,
        }}
      />

      {/* Editorial hairline row: ——— ◆ ——— */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 mt-1"
        style={{ transformOrigin: "center" }}
      >
        <div className="hairline-copper w-24 md:w-40" />
        <span
          style={{
            width: 4,
            height: 4,
            background: "hsl(var(--copper))",
            transform: "rotate(45deg)",
            display: "block",
            flexShrink: 0,
          }}
        />
        <div className="hairline-copper w-24 md:w-40" />
      </motion.div>

      {/* Optional slogan — 10px tracked caps */}
      {showSlogan && slogan && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-3 text-center"
          style={{
            fontFamily: "'Jost', system-ui, sans-serif",
            fontSize: 10,
            fontWeight: 400,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "hsl(var(--copper) / 0.50)",
          }}
        >
          {slogan}
        </motion.p>
      )}
    </div>
  );
};

export default PlumbLineDivider;
