/**
 * AREAS WE SERVE — Hub Page  (Tier 1 of 3)
 * Route: /areas-we-serve
 *
 * REMIX GUIDE ─────────────────────────────────────────────────────────────────
 * Everything renders from MASTER_REMIX (service, brand, geography taglines)
 * plus the REGIONS / COMMUNITIES arrays in `src/data/communities.ts`.
 * To remix: edit those two files. This page does not need manual edits.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Shield, Wrench, Star } from "lucide-react";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import CommunityCard from "@/components/areas/CommunityCard";
import { REGIONS, COMMUNITIES, getRegionCommunities } from "@/data/communities";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { setPageMeta } from "@/lib/seo";
import { itemListNode, stringifyGraph } from "@/lib/seoGraph";
import ConversionBar from "@/components/template/ConversionBar";
import type { BookingClickHandler } from "@/config/template/booking-schema";

interface AreasHubProps {
  onBookClick?: BookingClickHandler;
}

const AreasHub = ({ onBookClick }: AreasHubProps) => {
  const s   = MASTER_REMIX.SERVICE;
  const sp  = MASTER_REMIX.SERVICE_PLURAL;
  const bn  = MASTER_REMIX.BRAND_NAME;
  const sc  = MASTER_REMIX.SERVICE_CATEGORY;
  const tagline = MASTER_REMIX.SERVICE_REGION_TAGLINE;

  const [labelCommunities, labelLocation, labelCertification, labelGuarantee] =
    MASTER_REMIX.TRUST_STATS_LABELS;
  const trustStats = [
    { icon: MapPin,  label: labelCommunities },
    { icon: Wrench,  label: labelLocation },
    { icon: Shield,  label: labelCertification },
    { icon: Star,    label: labelGuarantee },
  ];

  // Featured = first 6 communities in COMMUNITIES (data-driven, not hardcoded).
  const featured = COMMUNITIES.slice(0, 6);

  useEffect(() => {
    setPageMeta({
      title: `${sc} — Areas We Serve | ${bn}`,
      description:
        `${bn} provides ${s} services across ${COMMUNITIES.length} communities in ${REGIONS.length} regions. ` +
        `See the full list of areas we serve.`,
      path: "/areas-we-serve",
    });

    // Stitched JSON-LD graph: LocalBusiness + ItemList of every region.
    const graphJson = stringifyGraph([
      {
        "@type": "LocalBusiness",
        "@id": "/#organization",
        name: bn,
        serviceType: sc,
        areaServed: REGIONS.map((r) => ({ "@type": "AdministrativeArea", name: r.name })),
      },
      itemListNode({
        path: "/areas-we-serve",
        name: `Regions served by ${bn}`,
        items: REGIONS.map((r) => ({ name: r.name, path: `/areas-we-serve/${r.slug}` })),
      }),
    ]);
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-hub-schema", "true");
    el.textContent = graphJson;
    document.head.appendChild(el);
    return () => { document.querySelectorAll('[data-hub-schema="true"]').forEach((n) => n.remove()); };
  }, [s, sp, bn, sc]);

  return (
    <TemplateLayout onBookClick={onBookClick}>

      {/* ── Hero ── */}
      <SectionFrame tone="forest" size="xl" grain>
        <p className="font-eyebrow text-primary-foreground/60 mb-4">Where We Work</p>
        <h1 className="font-display text-display-xl text-primary-foreground mb-6 max-w-[18ch]">
          {sp} Across {tagline}
        </h1>
        <p className="text-body-lg text-primary-foreground/75 max-w-[52ch] mb-10">
          {bn} brings {s} to {COMMUNITIES.length} communities across {REGIONS.length} regions.
          Every region has its own page, every community has its own page, and the whole
          system is staged to scale to as many areas as you need.
        </p>
        <p className="text-caption text-primary-foreground/60 uppercase tracking-[0.18em] mb-8">
          {MASTER_REMIX.RESPONSE_PROMISE}
        </p>
        <button
          onClick={() => onBookClick?.()}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-clay text-white
                     font-body text-label uppercase tracking-[0.15em]
                     hover:bg-clay/90 transition-colors duration-300"
        >
          {TEMPLATE_COPY.cta.primary}
          <ArrowRight size={16} />
        </button>
      </SectionFrame>

      {/* ── Trust Strip ── */}
      <SectionFrame tone="paper" size="sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {trustStats.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon size={18} className="text-forest flex-shrink-0" />
              <span className="text-body-sm text-graphite">{label}</span>
            </div>
          ))}
        </div>
      </SectionFrame>

      {/* ── Region Grid ── */}
      <SectionFrame tone="bone" size="lg">
        <div className="mb-12">
          <p className="font-eyebrow text-forest mb-3">Regions</p>
          <h2 className="font-display text-display-lg text-charcoal mb-4">
            Every Region We Work In
          </h2>
          <p className="text-body-lg text-graphite max-w-[50ch]">
            Select a region to browse every community we serve — each with its own page,
            Google Map, local landmarks, and {s}-specific pricing context.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REGIONS.map((region) => {
            const count = getRegionCommunities(region.slug).length;
            return (
              <Link
                key={region.slug}
                to={`/areas-we-serve/${region.slug}`}
                className="group block border border-seam rounded p-6 bg-paper
                           hover:border-forest/40 hover:shadow-editorial transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-caption text-mist uppercase tracking-[0.1em]">
                    {count} {count === 1 ? "community" : "communities"}
                  </span>
                  <ArrowRight size={16}
                    className="text-forest/40 group-hover:text-forest group-hover:translate-x-1
                               transition-all duration-300 flex-shrink-0 mt-0.5" />
                </div>
                <h3 className="font-display text-display-sm text-charcoal mb-2
                               group-hover:text-forest transition-colors duration-300">
                  {region.name}
                </h3>
                <p className="text-body-sm text-graphite line-clamp-2">{region.description}</p>
              </Link>
            );
          })}
        </div>
      </SectionFrame>

      {/* ── Featured Communities ── */}
      <SectionFrame tone="paper" size="lg">
        <div className="mb-12">
          <p className="font-eyebrow text-forest mb-3">Featured Communities</p>
          <h2 className="font-display text-display-lg text-charcoal mb-4">
            Highlighted {sc} Areas
          </h2>
          <p className="text-body-lg text-graphite max-w-[50ch]">
            A handful of communities we want to highlight first — adjust the curated list
            from the data layer to match where your work concentrates.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((c) => (
            <CommunityCard key={c.slug} community={c} showRegion />
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-body text-graphite mb-5">
            Don't see your community? Browse all {COMMUNITIES.length} communities above, or just ask.
          </p>
          <button
            onClick={() => onBookClick?.()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-forest
                       text-forest text-label uppercase tracking-[0.15em]
                       hover:bg-forest hover:text-white transition-all duration-300"
          >
            Ask About Your Area
          </button>
        </div>
      </SectionFrame>

      {/* ── SEO Editorial Block ── */}
      <SectionFrame tone="bone" size="lg">
        <div className="max-w-3xl">
          <p className="font-eyebrow text-forest mb-4">Our Coverage</p>
          <h2 className="font-display text-display-md text-charcoal mb-6">
            A Local {sc} Team You Can Actually Reach
          </h2>
          <div className="space-y-5 text-body text-graphite">
            <p>{MASTER_REMIX.COVERAGE_BLURB}</p>
            <p>
              Every community page includes a Google Map, specific street references, local
              landmarks, and frequently asked questions — because knowing the neighbourhood
              is what separates a genuine local provider from a directory listing.
            </p>
          </div>
        </div>
      </SectionFrame>

      {/* ── ConversionBar — neutral, token-driven ── */}
      <ConversionBar
        headline={`If you're in ${tagline}, we can quote your project.`}
      />

    </TemplateLayout>
  );
};

export default AreasHub;
