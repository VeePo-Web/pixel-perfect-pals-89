import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { MasterLogo } from "@/master";
import { SITE_STRUCTURE } from "@/config";

interface NavigationProps {
  onBookClick?: () => void;
}

const SERVICE_PATHS = new Set([
  "/drywall-repair",
  "/drywall-installation",
  "/painting",
  "/garage-packages",
  "/basement-packages",
]);

const Navigation = ({ onBookClick }: NavigationProps) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while drawer is open (mobile only — drawer is hidden on lg)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Trim nav for desktop — full list available in mobile drawer + footer
  const desktopNav = SITE_STRUCTURE.nav.filter((n) =>
    ["/", "/drywall-repair", "/drywall-installation", "/painting", "/pricing-process", "/gallery", "/reviews", "/favourite-things", "/about"].includes(n.path),
  );

  // Mobile drawer groups
  const { servicesGroup, companyGroup } = useMemo(() => {
    const services = SITE_STRUCTURE.nav.filter((n) => SERVICE_PATHS.has(n.path));
    const company = SITE_STRUCTURE.nav.filter((n) => !SERVICE_PATHS.has(n.path));
    return { servicesGroup: services, companyGroup: company };
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-bone/95 backdrop-blur-md border-b border-seam" : "bg-bone/0 border-b border-transparent"
        }`}
      >
        <nav className="container mx-auto flex h-20 items-center justify-between px-6">
          <Link to="/" aria-label="Cochrane Master Builders — home" className="inline-flex items-center">
            <MasterLogo slot="nav" />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {desktopNav.slice(1).map((item) => {
              const active = pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`story-link text-sm font-medium tracking-wide transition-colors ${
                      active ? "text-forest" : "text-graphite hover:text-charcoal"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBookClick}
              className="cta-forest hidden rounded-sm bg-forest px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-forest-deep md:inline-flex"
            >
              Get a Quote
            </button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-seam text-charcoal transition-colors active:bg-seam/60 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer — full-height bottom-anchored sheet with sticky CTA */}
      {open && (
        <div className="fixed inset-0 z-30 flex flex-col bg-bone pt-20 lg:hidden">
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <p className="font-eyebrow mt-4 mb-2">Services</p>
            <ul className="divide-y divide-seam">
              {servicesGroup.map((item) => {
                const active = pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex min-h-[56px] items-center font-display text-2xl ${
                        active ? "text-forest" : "text-charcoal"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <p className="font-eyebrow mt-8 mb-2">Company</p>
            <ul className="divide-y divide-seam">
              {companyGroup.map((item) => {
                const active = pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex min-h-[56px] items-center font-display text-2xl ${
                        active ? "text-forest" : "text-charcoal"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Sticky drawer CTA — always within thumb reach */}
          <div className="safe-bottom border-t border-seam bg-bone px-6 pt-4">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onBookClick?.();
              }}
              className="cta-forest w-full rounded-sm bg-forest px-5 py-3.5 text-sm font-medium text-primary-foreground"
            >
              Get a Quote
            </button>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div aria-hidden className="h-20" />
    </>
  );
};

export default Navigation;
