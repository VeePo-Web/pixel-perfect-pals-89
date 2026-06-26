import type { ReactNode } from "react";

interface SectionFrameProps {
  id?: string;
  /** Background tone. Default 'bone'. */
  tone?: "bone" | "paper" | "charcoal" | "forest";
  /** Vertical rhythm. */
  size?: "sm" | "md" | "lg" | "xl";
  /** Adds the shared paper-grain texture. */
  grain?: boolean;
  className?: string;
  children: ReactNode;
}

const TONE: Record<NonNullable<SectionFrameProps["tone"]>, string> = {
  bone: "bg-bone text-charcoal",
  paper: "bg-paper text-charcoal",
  charcoal: "bg-charcoal text-bone",
  forest: "bg-forest text-primary-foreground",
};

const SIZE: Record<NonNullable<SectionFrameProps["size"]>, string> = {
  sm: "py-14 md:py-20",
  md: "py-20 md:py-28",
  lg: "py-24 md:py-36",
  xl: "py-32 md:py-48",
};

/**
 * The single vertical-rhythm wrapper used by every template section.
 * Keeps padding, container, and tone consistent across 150 future remixes.
 */
const SectionFrame = ({
  id,
  tone = "bone",
  size = "lg",
  grain = false,
  className = "",
  children,
}: SectionFrameProps) => {
  return (
    <section
      id={id}
      className={`relative overflow-hidden ${TONE[tone]} ${SIZE[size]} ${grain ? "paper-grain" : ""} ${className}`}
    >
      <div className="container relative z-10 mx-auto px-6">{children}</div>
    </section>
  );
};

export default SectionFrame;
