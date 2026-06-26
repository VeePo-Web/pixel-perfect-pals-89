import { Link } from "react-router-dom";
import veepoLogo from "@/assets/veepo-logo.png";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LogoMark from "./LogoMark";
import ScrollReveal from "./ScrollReveal";

interface FooterProps {
  onBookClick?: () => void;
}

const Footer = ({ onBookClick }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const brandRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: brandRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);

  return (
    <footer className="bg-asphalt text-porcelain/80 grain-overlay pb-20 lg:pb-0" role="contentinfo">
      {/* Copper separator — intentional seam between content and footer */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-copper/10 to-transparent" />

      {/* Tier 1 — Brand + CTA */}
      <div className="container mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">
          {/* Brand */}
          <ScrollReveal>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5 text-porcelain">
                <LogoMark size={28} />
                <h3 className="font-display text-display-sm text-porcelain">
                  Cochrane Master Builders
                </h3>
              </div>
              <p className="font-body text-caption text-porcelain/30">
                Calgary · Airdrie · Cochrane · Alberta
              </p>
              <div className="w-12 h-px bg-copper/30" />
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={0.15}>
            <button
              onClick={onBookClick}
              className="px-8 py-3 rounded-full border border-copper/30 text-copper font-body text-label uppercase tracking-[0.15em] hover:bg-copper/10 transition-all duration-300 cursor-pointer"
            >
              Book Your Reset →
            </button>
          </ScrollReveal>
        </div>
      </div>

      {/* Tier 2 — Navigation Columns */}
      <div className="border-t border-porcelain/6">
        <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-20">
              {/* Navigate */}
              <div>
                <p className="font-body text-label uppercase text-copper/40 mb-5">
                  Navigate
                </p>
                <nav className="flex flex-col space-y-2.5" aria-label="Footer navigation">
                  {[
                    { name: "Services", path: "/services" },
                    { name: "Results", path: "/results" },
                    { name: "About", path: "/about" },
                    { name: "Service Area", path: "/service-area" },
                    { name: "FAQ", path: "/faq" },
                  ].map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="font-body text-body-sm text-porcelain/40 hover:text-porcelain/70 transition-colors duration-300 w-fit"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Connect */}
              <div>
                <p className="font-body text-label uppercase text-copper/40 mb-5">
                  Connect
                </p>
                <div className="flex flex-col space-y-2.5">
                  <a
                    href="mailto:hello@cochranemasterbuilders.ca"
                    className="font-body text-body-sm text-porcelain/40 hover:text-porcelain/70 transition-colors duration-300 w-fit"
                  >
                    hello@cochranemasterbuilders.ca
                  </a>
                  <a
                    href="tel:+13062097804"
                    className="font-body text-body-sm text-porcelain/40 hover:text-porcelain/70 transition-colors duration-300 w-fit"
                  >
                    (306) 209-7804
                  </a>
                  <span className="font-body text-caption text-porcelain/30 -mt-1">
                    Call or text — text is fastest.
                  </span>
                  <a
                    href="https://instagram.com/cochranemasterbuilders"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-body-sm text-porcelain/40 hover:text-porcelain/70 transition-colors duration-300 w-fit"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Tier 3 — Monumental sign-off */}
      <div ref={brandRef} className="container mx-auto px-6 lg:px-8 pb-16 overflow-hidden">
        <ScrollReveal delay={0.2}>
          <motion.p
            style={{ x }}
            className="font-display text-[clamp(3rem,10vw,8rem)] leading-none text-porcelain/[0.08] select-none transition-all duration-700 hover:text-porcelain/[0.12] hover:scale-[1.005] origin-left"
            aria-hidden="true"
          >
            Cochrane Master Builders
          </motion.p>
        </ScrollReveal>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-porcelain/8">
        <div className="container mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-caption text-porcelain/40">
            © {currentYear} Cochrane Master Builders · Calgary, Alberta
          </p>
          <div className="flex items-center gap-2">
            <Link to="/privacy" className="font-body text-caption text-porcelain/40 hover:text-porcelain/60 transition-colors">
              Privacy
            </Link>
            <span className="text-porcelain/20" aria-hidden="true">·</span>
            <Link to="/terms" className="font-body text-caption text-porcelain/40 hover:text-porcelain/60 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Veepo Agency Credit */}
      <div className="border-t border-porcelain/[0.04]">
        <div className="container mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <ScrollReveal delay={0.25}>
            <a
              href="https://veepo.ca/case-studies"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block max-w-md mx-auto rounded-2xl border border-porcelain/[0.08] bg-[#0a0a0a] overflow-hidden transition-all duration-500 hover:border-[#FF8C2A]/20 hover:scale-[1.03] hover:shadow-[0_0_60px_-10px_rgba(255,140,42,0.25),0_0_60px_-10px_rgba(46,175,75,0.2)]"
            >
              {/* Gradient border glow overlay */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,140,42,0.08), transparent 40%, transparent 60%, rgba(46,175,75,0.08))' }} />

              {/* Top gradient accent */}
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#FF8C2A] to-[#2EAF4B] opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Shimmer sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-[#FF8C2A]/[0.04] to-transparent pointer-events-none" />

              {/* Content */}
              <div className="flex flex-col items-center gap-5 px-8 py-10">
                <p className="font-body text-caption tracking-[0.25em] uppercase text-porcelain/40">
                  This experience was crafted locally by
                </p>

                <div className="w-16 h-px bg-gradient-to-r from-[#FF8C2A] to-[#2EAF4B] opacity-70 group-hover:opacity-100 group-hover:w-24 transition-all duration-500" />

                <img
                  src={veepoLogo}
                  alt="Veepo — Digital Agency"
                  className="h-14 md:h-20 w-auto object-contain transition-all duration-500"
                  style={{ filter: 'drop-shadow(0 0 0 transparent)' }}
                  onMouseEnter={() => {}}
                />
                <style>{`
                  .group:hover img[alt="Veepo — Digital Agency"] {
                    filter: drop-shadow(0 0 16px rgba(255,140,42,0.4)) drop-shadow(0 -4px 12px rgba(46,175,75,0.3)) !important;
                  }
                `}</style>

                <p className="font-body text-caption tracking-[0.3em] uppercase text-porcelain/30 group-hover:text-[#FF8C2A]/60 transition-colors duration-300">
                  veepo.ca
                </p>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500">
                  <p className="font-body text-caption tracking-[0.15em] text-[#2EAF4B]/70" style={{ textShadow: '0 0 12px rgba(46,175,75,0.3)' }}>
                    Where Vision Meets Precision
                  </p>
                  <svg className="w-3 h-3 text-[#2EAF4B]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>

              {/* Bottom gradient accent */}
              <div className="h-[2px] w-full bg-gradient-to-r from-[#2EAF4B] via-[#FF8C2A] to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          </ScrollReveal>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
