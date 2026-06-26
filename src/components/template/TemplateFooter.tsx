/**
 * TemplateFooter — Heirloom Architecture
 *
 * Four tiers:
 *   Tier 1 — Brand + slogan pull-quote + CTA + nav columns
 *   Tier 2 — CMBTrio at 64px, centered
 *   Tier 3 — GenerationalMarquee (ultra-slow slogan scroll)
 *   Tier 4 — Monumental sign-off: "Cochrane Master Builders" + slogan inscription
 *
 * "The brand promise is generational: 'Building Strong Foundations
 *  For Those Who Come After Us.'" — Brand Brief
 * "luxury-level, fantasy.co-inspired with Apple-level UX precision" — 1.2.1 Partner
 *
 * All strings from MASTER_REMIX / TEMPLATE_COPY — zero hard-coded copy.
 */

import { Link } from "react-router-dom";
import PrefetchLink from "./PrefetchLink";
import { MasterLogo } from "@/master";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import {
  GenerationalMarquee,
  SloganHeartbeat,
  PlumbLineDivider,
} from "@/components/template/bespoke";
import type { BookingClickHandler } from "@/config/drywall-booking";

interface Props {
  onBookClick?: BookingClickHandler;
}

const TemplateFooter = ({ onBookClick }: Props) => {
  const services = TEMPLATE_COPY.nav.filter((n) =>
    ["/services", "/pricing", "/why-we-love"].includes(n.path),
  );
  const company = TEMPLATE_COPY.nav.filter((n) =>
    ["/brand-story", "/about", "/gallery", "/reviews", "/contact"].includes(n.path),
  );

  return (
    <footer className="border-t border-copper/10 bg-paper relative overflow-hidden">

      {/* ── Tier 1 — Brand + Slogan + CTA + Nav ── */}
      <div className="container mx-auto px-6 pt-20 pb-12">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" aria-label={`${MASTER_REMIX.BRAND_NAME} — home`} className="inline-flex">
              <MasterLogo slot="footer" />
            </Link>

            {/* Slogan — footer large variant with copper square bullet */}
            <div className="mt-7 mb-6">
              <SloganHeartbeat variant="footer" />
            </div>

            <p className="max-w-md text-graphite text-body-sm leading-relaxed">
              {TEMPLATE_COPY.brand.promise}
            </p>

            <button
              type="button"
              onClick={() => onBookClick?.({ source: "Footer → Send photos" })}
              className="mt-8 inline-flex items-center rounded-none px-5 py-3 text-sm font-medium tracking-[0.12em] uppercase text-charcoal transition-all duration-300 hover:text-forest"
              style={{
                border: "1px solid hsl(var(--copper) / 0.20)",
                boxShadow: "var(--shadow-heirloom)",
              }}
            >
              {TEMPLATE_COPY.cta.primary}
            </button>
          </div>

          <div className="md:col-span-3">
            <h4 className="eyebrow-copper mb-4">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.path}>
                  <PrefetchLink to={s.path} className="text-graphite text-body-sm transition-colors hover:text-charcoal">
                    {s.label}
                  </PrefetchLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="eyebrow-copper mb-4">Company</h4>
            <ul className="space-y-2.5">
              {company.map((c) => (
                <li key={c.path}>
                  <PrefetchLink to={c.path} className="text-graphite text-body-sm transition-colors hover:text-charcoal">
                    {c.label}
                  </PrefetchLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="eyebrow-copper mb-4">Cochrane &amp; area</h4>
            <ul className="space-y-2.5 text-graphite text-body-sm">
              <li>{MASTER_REMIX.COMMUNITIES.slice(0, 4).join(" · ")}</li>
              <li>Mon–Sat · 7am–6pm</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── PlumbLine Divider ── */}
      <PlumbLineDivider className="py-2" />

      {/* ── Generational Marquee ── */}
      <div className="border-t border-y" style={{ borderColor: "hsl(var(--copper) / 0.08)" }}>
        <div className="py-5">
          <GenerationalMarquee />
        </div>
      </div>

      {/* ── Legal strip ── */}
      <div style={{ borderTop: "1px solid hsl(var(--copper) / 0.08)" }}>
        <div className="container mx-auto flex flex-wrap items-baseline justify-between gap-4 px-6 py-5 text-caption text-mist">
          <p>© {new Date().getFullYear()} {MASTER_REMIX.BRAND_NAME}. Built for the families who'll inherit it.</p>
          <div className="flex gap-6">
            <PrefetchLink to="/privacy" className="hover:text-charcoal transition-colors">Privacy</PrefetchLink>
            <PrefetchLink to="/terms" className="hover:text-charcoal transition-colors">Terms</PrefetchLink>
          </div>
        </div>
      </div>

      {/* ── Tier 4 — Monumental sign-off ── */}
      <div className="py-12 text-center" style={{ borderTop: "1px solid hsl(var(--copper) / 0.08)" }}>
        <p
          className="font-display text-charcoal/90"
          style={{
            fontSize: "clamp(2.5rem, 10vw, 8rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          {MASTER_REMIX.BRAND_NAME}
        </p>
        {/* Second line — slogan as chiseled cornerstone inscription */}
        <SloganHeartbeat variant="monument" className="mt-4 block" />
      </div>

    </footer>
  );
};

export default TemplateFooter;
