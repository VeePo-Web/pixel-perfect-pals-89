/**
 * AREAS WE SERVE — Hub Page  (Tier 1 of 3)
 * Route: /areas-we-serve
 *
 * REMIX GUIDE ─────────────────────────────────────────────────────────────────
 * This page reads every service-specific token from MASTER_REMIX.
 * When remixing for a new trade (e.g. Cochrane Tile Masters):
 *   1. Update MASTER_REMIX.BRAND_NAME  → "Cochrane Tile Masters"
 *   2. Update MASTER_REMIX.SERVICE     → "tile"
 *   3. Update MASTER_REMIX.SERVICE_PLURAL → "tile work"
 *   Nothing on this page needs manual editing — it reflects the remix config.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Shield, Users, Wrench, Star } from "lucide-react";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import CommunityCard from "@/components/areas/CommunityCard";
import { REGIONS, COMMUNITIES, getRegionCommunities, getCommunity } from "@/data/communities";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { setPageMeta } from "@/lib/seo";
import type { BookingClickHandler } from "@/config/drywall-booking";

interface AreasHubProps {
  onBookClick?: BookingClickHandler;
}

// ── REMIX: swap these slugs for the communities most relevant to your trade ──
const FEATURED_SLUGS = [
  "heritage-hills",
  "riversong",
  "gleneagles",
  "bearspaw-watermark",
  "elbow-valley",
  "springbank-hill",
];

const TRUST_STATS = [
  { icon: MapPin,   label: "120+ Communities Served" },
  { icon: Users,    label: "Cochrane-Based, Family Owned" },
  { icon: Wrench,   label: "{SERVICE_CATEGORY} Specialists" },
  { icon: Shield,   label: "Licensed & Insured" },
  { icon: Star,     label: "15-Year Structural Guarantee" },
];

const AreasHub = ({ onBookClick }: AreasHubProps) => {
  const s   = MASTER_REMIX.SERVICE;          // "{SERVICE}" in template preview
  const sp  = MASTER_REMIX.SERVICE_PLURAL;   // "{SERVICE_PLURAL}"
  const bn  = MASTER_REMIX.BRAND_NAME;       // "Cochrane Master Builders"
  const sc  = MASTER_REMIX.SERVICE_CATEGORY; // "{SERVICE_CATEGORY}"

  useEffect(() => {
    setPageMeta({
      title: `${sc} Contractor — Areas We Serve | ${bn}`,
      description:
        `${bn} provides professional ${s} services to 120+ communities across Cochrane, Calgary SW, Springbank, Elbow Valley, Rocky View County, the Bow Valley, and Canmore. Family-owned and Cochrane-based.`,
      path: "/areas-we-serve",
    });

    // Hub-level LocalBusiness schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: bn,
      address: { "@type": "PostalAddress", addressLocality: "Cochrane", addressRegion: "AB", addressCountry: "CA" },
      areaServed: [
        { "@type": "City", name: "Cochrane" },
        { "@type": "City", name: "Calgary" },
        { "@type": "City", name: "Canmore" },
        { "@type": "AdministrativeArea", name: "Rocky View County" },
        { "@type": "AdministrativeArea", name: "Springbank" },
      ],
      serviceType: sc,
    };
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-hub-schema", "true");
    el.textContent = JSON.stringify(schema);
    document.head.appendChild(el);
    return () => { document.querySelectorAll('[data-hub-schema="true"]').forEach((n) => n.remove()); };
  }, [s, sp, bn, sc]);

  const featured = FEATURED_SLUGS.map((sl) => getCommunity(sl)).filter(Boolean) as NonNullable<ReturnType<typeof getCommunity>>[];

  return (
    <TemplateLayout onBookClick={onBookClick}>

      {/* ── Hero ── */}
      <SectionFrame tone="forest" size="xl" grain>
        <p className="font-eyebrow text-primary-foreground/60 mb-4">Where We Work</p>
        <h1 className="font-display text-display-xl text-primary-foreground mb-6 max-w-[18ch]">
          {sp} Across Cochrane,<br className="hidden sm:block" /> Calgary &amp; the Bow Valley
        </h1>
        <p className="text-body-lg text-primary-foreground/75 max-w-[52ch] mb-10">
          From the foothills of Cochrane to the estate communities of Springbank and the
          mountain hamlets of the Bow Valley — {bn} brings master-craft {s} to over
          120 communities across Alberta.
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {TRUST_STATS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon size={18} className="text-forest flex-shrink-0" />
              <span className="text-body-sm text-graphite">{label.replace("{SERVICE_CATEGORY}", sc)}</span>
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
            Our Highest-Priority {sc} Areas
          </h2>
          <p className="text-body-lg text-graphite max-w-[50ch]">
            These communities represent our heaviest concentration of work — premium estate
            homes, custom builds, and renovation projects that demand master-craft {s}.
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
            A Local {sc} Contractor You Can Actually Call on Monday Morning
          </h2>
          {/* ── REMIX NOTE ────────────────────────────────────────────────────────
              Replace the editorial body below with trade-specific coverage copy
              when remixing. Keep the geographic references — they are the SEO
              foundation. Only the service type references need updating.
              ──────────────────────────────────────────────────────────────────── */}
          <div className="space-y-5 text-body text-graphite">
            <p>
              {bn} is a Cochrane-based {s} contractor serving over 120 communities from
              the Bow Valley to southeast Calgary. We work in <strong>Cochrane's</strong> established
              neighbourhoods — Heritage Hills, Sunset Ridge, Riversong, GlenEagles, Heartland,
              and Fireside — and across <strong>Rocky View County</strong> in Bearspaw, Watermark,
              Silverhorn, and Heritage Pointe.
            </p>
            <p>
              West of Calgary, we are one of the most active {s} contractors in <strong>Springbank</strong> —
              Aventerra Estates, Devonian Ridge, Pinnacle Ridge, Swift Creek, Mackenas Country Estates,
              Morgan's Rise, and more than 35 additional acreage communities. The <strong>Elbow Valley</strong> corridor —
              Stonepine, Lott Creek Estates, Pinebrook Estates, Swift Creek Villas — is a regular
              part of our schedule.
            </p>
            <p>
              In <strong>Calgary's southwest</strong>, we serve Aspen Woods, Springbank Hill, Discovery Ridge,
              Signal Hill, West Springs, Cougar Ridge, Crestmont, and the inner-city estate communities
              of Britannia, Bel-Aire, Eagle Ridge, and Upper Mount Royal. <strong>Calgary NW</strong> includes
              Arbour Lake, Crestmont View, and Rockland Park. <strong>Calgary SE</strong> includes Auburn Bay,
              Mahogany, Cranston, and Seton.
            </p>
            <p>
              Along the <strong>Bow Valley corridor</strong>, we serve CottageClub at Ghost Lake, Ghost Lake Village,
              Waiparous Village, Exshaw, Lac des Arcs, Dead Man's Flats, and Harvie Heights. In <strong>Canmore</strong>,
              we work in Silvertip Resort, Three Sisters Mountain Village, Spring Creek Mountain Village,
              Benchlands, Eagle Terrace, Quarry Pines, Cougar Creek, Rundleview, Larch, and Peaks of Grassi.
            </p>
            <p>
              Every community page includes a Google Map, specific street references, local landmarks, and
              frequently asked questions — because knowing the neighbourhood is what separates a genuine
              local contractor from a directory listing.
            </p>
          </div>
        </div>
      </SectionFrame>

      {/* ── CTA ── */}
      <SectionFrame tone="forest" size="lg" grain>
        <div className="max-w-2xl">
          <p className="font-eyebrow text-primary-foreground/60 mb-4">Begin</p>
          <h2 className="font-display text-display-lg text-primary-foreground mb-5">
            Don't see your community?
          </h2>
          <p className="text-body-lg text-primary-foreground/75 mb-8">
            If you're in Cochrane, Calgary, Rocky View County, the Bow Valley, or Canmore — we
            work there. Send your address and project scope. We'll confirm within hours.
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
        </div>
      </SectionFrame>

    </TemplateLayout>
  );
};

export default AreasHub;
