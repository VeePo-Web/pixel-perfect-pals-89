import { Link } from "react-router-dom";
import { MasterLogo } from "@/master";
import { SITE_STRUCTURE, BUSINESS, TRADE } from "@/config";

interface FooterProps {
  onBookClick?: () => void;
}

const Footer = ({ onBookClick }: FooterProps) => {
  const services = SITE_STRUCTURE.nav.filter((n) =>
    ["/drywall-repair", "/drywall-installation", "/painting", "/garage-packages", "/basement-packages"].includes(n.path),
  );
  const company = SITE_STRUCTURE.nav.filter((n) =>
    ["/about", "/pricing-process", "/gallery", "/contact"].includes(n.path),
  );

  return (
    <footer className="bg-paper border-t border-seam">
      {/* Top — brand + CTA */}
      <div className="container mx-auto px-6 pt-20 pb-12">
        <div className="grid gap-12 md:grid-cols-12 max-md:gap-0 max-md:divide-y max-md:divide-seam md:max-lg:grid-cols-2">
          <div className="md:col-span-5 max-md:pb-8">
            <Link to="/" aria-label="Cochrane Master Builders — home" className="inline-flex">
              <MasterLogo slot="footer" />
            </Link>
            <p className="mt-6 max-w-md text-graphite">
              Practical residential interior finishing for Cochrane homeowners. Drywall, paint, and insulation — small jobs welcome.
            </p>
            <button
              type="button"
              onClick={onBookClick}
              className="cta-forest mt-8 inline-flex rounded-sm bg-forest px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-forest-deep max-md:w-full max-md:justify-center"
            >
              Send Photos for a Quote
            </button>
          </div>

          <div className="md:col-span-3 max-md:py-8">
            <h4 className="font-eyebrow mb-4">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.path}>
                  <Link to={s.path} className="text-graphite transition-colors hover:text-charcoal">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 max-md:py-8">
            <h4 className="font-eyebrow mb-4">Company</h4>
            <ul className="space-y-2.5">
              {company.map((c) => (
                <li key={c.path}>
                  <Link to={c.path} className="text-graphite transition-colors hover:text-charcoal">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 max-md:py-8">
            <h4 className="font-eyebrow mb-4">Contact</h4>
            <ul className="space-y-2.5 text-graphite">
              <li>{BUSINESS.serviceArea.primary}</li>
              <li>{TRADE.contact.hours}</li>
              {TRADE.contact.phone && (
                <li>
                  <a href={`tel:${TRADE.contact.phone}`} className="hover:text-charcoal">
                    {TRADE.contact.phone}
                  </a>
                </li>
              )}
              {TRADE.contact.email && (
                <li>
                  <a href={`mailto:${TRADE.contact.email}`} className="hover:text-charcoal">
                    {TRADE.contact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Monumental sign-off */}
      <div className="border-t border-seam">
        <div className="container mx-auto px-6 py-10">
          <p className="font-display text-display-sm text-charcoal/80">
            Damage out. Comfort in.
          </p>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-seam">
        <div className="container mx-auto flex flex-col items-start justify-between gap-3 px-6 py-5 text-caption text-mist md:flex-row md:items-center max-md:items-start">
          <p>© {new Date().getFullYear()} Cochrane Drywall &amp; Insulation. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-charcoal">Privacy</Link>
            <Link to="/terms" className="hover:text-charcoal">Terms</Link>
            <a href="https://veepo.ca/case-studies" target="_blank" rel="noreferrer" className="hover:text-charcoal">
              Site by VeePo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
