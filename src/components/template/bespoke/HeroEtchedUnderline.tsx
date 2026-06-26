/**
 * HeroEtchedUnderline — The Hand-Etched Copper Hairline
 *
 * An SVG path that draws itself beneath the hero H1 on mount —
 * a slightly imperfect bezier (not a straight line) in copper,
 * 1.4s ease-out, single-shot. The imperfection is intentional:
 * it reads as hand-drawn, etched by a craftsman, not laser-cut.
 *
 * "Hero H1 always closes with an SVG path that draws itself —
 *  a slightly imperfect copper underline." — Brand Brief
 *
 * Rule: never animate with bounce or playful motion.
 * It fades and draws. Sacred type, sacred line.
 */

import { useEffect, useRef } from "react";

interface HeroEtchedUnderlineProps {
  width?: number | string;
  className?: string;
}

const HeroEtchedUnderline = ({
  width = "100%",
  className = "",
}: HeroEtchedUnderlineProps) => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);
    // Force a reflow, then animate
    path.getBoundingClientRect();
    path.style.transition = "stroke-dashoffset 1400ms cubic-bezier(0.16, 1, 0.3, 1)";
    path.style.strokeDashoffset = "0";
  }, []);

  return (
    <svg
      width={width}
      height="12"
      viewBox="0 0 400 12"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      {/*
        A hand-drawn-looking bezier — slightly wavy, not straight.
        The control points are asymmetric to mimic a real hand stroke.
      */}
      <path
        ref={pathRef}
        d="M 0 7 C 40 4, 80 10, 140 7 C 200 4, 260 9, 320 6 C 360 4, 380 8, 400 6"
        stroke="hsl(var(--copper))"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

export default HeroEtchedUnderline;
