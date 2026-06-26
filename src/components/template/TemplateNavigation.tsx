import { Link, useLocation } from "react-router-dom";
import PrefetchLink from "./PrefetchLink";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { MasterLogo } from "@/master";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { SloganHeartbeat } from "@/components/template/bespoke";
import type { BookingClickHandler } from "@/config/drywall-booking";

interface Props {
  onBookClick?: BookingClickHandler;
}

const TemplateNavigation = ({ onBookClick }: Props) => {
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
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Desktop trims to the load-bearing pages; mobile drawer carries the full set.
  const desktop = TEMPLATE_COPY.nav.filter((n) =>
    ["/", "/services", "/areas-we-serve", "/pricing", "/gallery", "/reviews", "/about"].includes(n.path),
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled ? "bg-bone/95 backdrop-blur-md border-b border-seam" : "bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-forest focus:text-primary-foreground focus:rounded-sm"
      >
        Skip to content
      </a>
      {/* Slogan micro-eyebrow — visible only when NOT scrolled, fades on scroll */}
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: scrolled ? 0 : 30, opacity: scrolled ? 0 : 1 }}
        aria-hidden
      >
        <div className="container mx-auto px-6 pt-1.5">
          <SloganHeartbeat variant="nav" />
        </div>
      </div>

      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link to="/" aria-label="Cochrane Master Builders — home" className="inline-flex items-center">
          <MasterLogo slot="nav" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {desktop.map((link) => {
            const active = pathname === link.path;
            return (
              <PrefetchLink
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-caption uppercase tracking-[0.18em] transition-colors ${
                  active ? "text-charcoal" : "text-graphite hover:text-charcoal"
                }`}
              >
                {link.label}
                {active && <span className="absolute -bottom-0.5 left-4 right-4 h-px bg-forest" />}
              </PrefetchLink>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <button
            type="button"
            onClick={() => onBookClick?.({ source: "Nav → Book Now" })}
            className="cta-forest inline-flex rounded-sm bg-forest px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-forest-deep"
          >
            Book Now
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 inline-flex items-center justify-center p-3 text-charcoal lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-seam bg-bone">
          {/* Slogan — first line of the mobile drawer */}
          <div className="container mx-auto px-6 py-4 border-b border-seam">
            <SloganHeartbeat variant="nav" />
          </div>
          <ul className="container mx-auto flex flex-col gap-px bg-seam px-0">
            {TEMPLATE_COPY.nav.map((link) => (
              <li key={link.path} className="bg-bone">
                <PrefetchLink
                  to={link.path}
                  className={`block px-6 py-4 text-body ${pathname === link.path ? "text-forest" : "text-charcoal"}`}
                >
                  {link.label}
                </PrefetchLink>
              </li>
            ))}
            <li className="bg-bone p-6">
              <button
                type="button"
                onClick={() => { setOpen(false); onBookClick?.({ source: "Mobile nav → Book Now" }); }}
                className="cta-forest w-full rounded-sm bg-forest px-5 py-3 text-sm font-medium text-primary-foreground"
              >
                Book Now
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default TemplateNavigation;
