import { useEffect, useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Kept for API compatibility; ignored. */
  duration?: number;
  /** Kept for API compatibility; ignored. */
  y?: number;
  /** Kept for API compatibility; ignored. */
  once?: boolean;
}

// One shared observer for every ScrollReveal on the page. Keeps overhead
// flat regardless of how many reveals a page mounts.
type Entry = { el: Element; delay: number };
const queue = new Map<Element, Entry>();
let sharedObserver: IntersectionObserver | null = null;

const getObserver = () => {
  if (sharedObserver || typeof IntersectionObserver === "undefined") return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries, obs) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const item = queue.get(e.target);
        const reveal = () => (e.target as HTMLElement).setAttribute("data-revealed", "true");
        if (item && item.delay > 0) window.setTimeout(reveal, item.delay);
        else reveal();
        queue.delete(e.target);
        obs.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
  );
  return sharedObserver;
};

/**
 * Pure-CSS scroll reveal driven by a single IntersectionObserver.
 * Replaces the previous per-element framer-motion implementation.
 */
const ScrollReveal = ({ children, className = "", delay = 0 }: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      node.setAttribute("data-revealed", "true");
      return;
    }
    const obs = getObserver();
    if (!obs) {
      node.setAttribute("data-revealed", "true");
      return;
    }
    queue.set(node, { el: node, delay: delay * 1000 });
    obs.observe(node);
    return () => {
      queue.delete(node);
      obs.unobserve(node);
    };
  }, [delay]);

  return (
    <div ref={ref} data-reveal className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
