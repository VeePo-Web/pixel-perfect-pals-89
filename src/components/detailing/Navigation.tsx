import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LogoMark from "./LogoMark";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Results", path: "/results" },
  { name: "Areas We Serve", path: "/areas-we-serve" },
  { name: "About", path: "/about" },
  { name: "FAQ", path: "/faq" },
];

interface NavigationProps {
  onBookClick?: () => void;
}

const Navigation = ({ onBookClick }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    setScrolled(currentY > 80);
    if (currentY > 300 && currentY > lastScrollY + 5) {
      setHidden(true);
    } else if (currentY < lastScrollY - 5 || currentY < 100) {
      setHidden(false);
    }
    setLastScrollY(currentY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
      >
        Skip to content
      </a>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden && !isOpen ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "bg-asphalt/95 backdrop-blur-md border-b border-porcelain/5"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className={`relative z-10 flex items-center gap-2.5 transition-colors duration-300 ${
              scrolled ? "text-porcelain" : "text-white"
            }`}>
              <LogoMark size={28} />
              <span className="font-display text-lg font-medium tracking-tight truncate">
                Cochrane Master Builders
              </span>
            </Link>

            {/* Desktop links */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`nav-link-luxury relative px-4 py-2 font-body text-label uppercase tracking-[0.15em] font-normal transition-all duration-300 group ${
                        scrolled ? "text-porcelain/80 hover:text-porcelain" : "text-white/80 hover:text-white"
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 right-0 h-px bg-copper"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      {!isActive && (
                        <span className="absolute -bottom-1 left-0 right-0 h-px overflow-hidden">
                          <span className="nav-shimmer-line block h-full w-full" />
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Book Now CTA */}
            <div className="hidden lg:block">
              <button
                onClick={onBookClick}
                className="relative inline-flex items-center px-6 py-2.5 text-label uppercase tracking-[0.15em] font-body font-normal rounded-full bg-copper text-primary-foreground hover:bg-copper-glow cta-copper-glow transition-all duration-300 overflow-hidden group"
              >
                <span className="relative z-10">Book Now</span>
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden relative z-[60] p-3 transition-colors duration-200 ${
                isOpen ? "text-porcelain" : scrolled ? "text-porcelain" : "text-white"
              }`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile fullscreen overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-asphalt grain-overlay flex flex-col items-center justify-center"
            >
              <ul className="flex flex-col items-center gap-6">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.path}
                    initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                    animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`font-display text-display-md transition-colors ${
                        location.pathname === link.path ? "text-copper" : "text-porcelain hover:text-copper-light"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                  animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
                  transition={{ delay: 0.1 + navLinks.length * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <button
                    onClick={() => { setIsOpen(false); onBookClick?.(); }}
                    className="mt-4 px-8 py-3 rounded-full bg-copper text-primary-foreground font-body text-label uppercase tracking-[0.15em] hover:bg-copper-glow cta-copper-glow transition-colors"
                  >
                    Book Now
                  </button>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navigation;
