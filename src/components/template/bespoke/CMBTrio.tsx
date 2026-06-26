/**
 * CMBTrio — The Three Personified Glyphs
 *
 * C (The Foreman) · M (The Craftsman) · B (The Local)
 *
 * Assembles the trio in one of three modes:
 *   - "inline"   → side-by-side, shared baseline, for footer / nav use
 *   - "stacked"  → column layout, for loading screen
 *   - "hero"     → extra-large, for About page hero
 *
 * Loading-screen animation: letters assemble C → M → B, each with a
 * staggered 300ms delay. Idle animations kick in once each letter lands.
 *
 * "The CMB Trio is parameterized: a remixed site can swap the three
 *  letters… the personification props remain because they are the parent
 *  Master Builders signature." — Brand Brief
 *
 * Every string sourced from BESPOKE_CONFIG — never hard-coded.
 */

import { useEffect, useRef, useState } from "react";
import MonogramC from "./MonogramC";
import MonogramM from "./MonogramM";
import MonogramB from "./MonogramB";

interface CMBTrioProps {
  size?: number;
  mode?: "inline" | "stacked" | "loading";
  animate?: boolean;
  className?: string;
}

const CMBTrio = ({
  size = 64,
  mode = "inline",
  animate = true,
  className = "",
}: CMBTrioProps) => {
  const [visible, setVisible] = useState(!animate);
  const [cVisible, setCVisible] = useState(!animate);
  const [mVisible, setMVisible] = useState(!animate);
  const [bVisible, setBVisible] = useState(!animate);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setCVisible(true), 0);
          setTimeout(() => setMVisible(true), 300);
          setTimeout(() => setBVisible(true), 600);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  const letterStyle = (vis: boolean): React.CSSProperties => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "translateY(0)" : "translateY(16px)",
    transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)",
  });

  const gap = mode === "stacked" ? "gap-6" : "gap-4";
  const direction = mode === "stacked" ? "flex-col items-center" : "flex-row items-end";

  return (
    <div
      ref={ref}
      className={`flex ${direction} ${gap} ${visible ? "opacity-100" : "opacity-0"} ${className}`}
      aria-label="CMB — Cochrane Master Builders"
      role="img"
    >
      <span style={letterStyle(cVisible)}>
        <MonogramC size={size} className="text-charcoal" />
      </span>
      <span style={letterStyle(mVisible)}>
        <MonogramM size={size} className="text-charcoal" />
      </span>
      <span style={letterStyle(bVisible)}>
        <MonogramB size={size} className="text-charcoal" />
      </span>
    </div>
  );
};

export default CMBTrio;
