import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StickyBookingBarProps {
  onBookClick?: () => void;
}

const StickyBookingBar = ({ onBookClick }: StickyBookingBarProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[60] lg:hidden"
        >
          <div className="h-10 bg-gradient-to-t from-asphalt/95 to-transparent" />
          <div className="px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-1 bg-asphalt/95 backdrop-blur-md border-t border-copper/10">
            <button
              onClick={onBookClick}
              className="w-full py-3.5 rounded-full bg-copper text-primary-foreground font-body text-label uppercase tracking-[0.15em] hover:bg-copper-glow cta-copper-glow active:scale-[0.97] transition-all duration-[400ms]"
            >
              Book Your Reset
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBookingBar;
