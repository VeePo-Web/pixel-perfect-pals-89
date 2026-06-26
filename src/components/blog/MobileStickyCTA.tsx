import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { BookingClickHandler } from "@/config/template/booking-schema";

interface MobileStickyCTAProps {
  bottomCtaSelector?: string;
  showAfterScrollY?: number;
  onBookClick?: BookingClickHandler;
}

/**
 * Mobile-only conversion bar. Slides up after the hero, hides when the
 * bottom CTA enters the viewport. Hidden at lg+ so desktop is byte-identical.
 */
export const MobileStickyCTA = ({
  bottomCtaSelector = '[data-cta="blog-bottom"]',
  showAfterScrollY = 480,
  onBookClick,
}: MobileStickyCTAProps) => {
  const reduce = useReducedMotion();
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [bottomCtaInView, setBottomCtaInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolledPastHero(window.scrollY > showAfterScrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfterScrollY]);

  useEffect(() => {
    const target = document.querySelector(bottomCtaSelector);
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setBottomCtaInView(entry.isIntersecting),
      { rootMargin: "0px 0px -25% 0px", threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [bottomCtaSelector]);

  const visible = scrolledPastHero && !bottomCtaInView;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="blog-mobile-cta"
          initial={reduce ? { opacity: 0 } : { y: 100, opacity: 0 }}
          animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-seam bg-bone/95 backdrop-blur-md lg:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          role="region"
          aria-label="Send photos"
        >
          <div className="flex items-center gap-2 px-3 py-3">
            <button
              type="button"
              onClick={() => onBookClick?.({ source: "Blog mobile sticky → Book Now" })}
              className="group inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 bg-forest px-4 py-3 text-sm font-medium uppercase tracking-[0.12em] text-primary-foreground transition-colors active:bg-forest-deep"
            >
              Send Photos
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileStickyCTA;