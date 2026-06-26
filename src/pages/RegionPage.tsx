/**
 * AREAS WE SERVE — Region Page  (Tier 2 of 3)
 * Route: /areas-we-serve/:region
 *
 * REMIX GUIDE ─────────────────────────────────────────────────────────────────
 * Service references read from MASTER_REMIX automatically.
 * No manual edits needed when remixing — only update trade.config.ts.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import CommunityCard from "@/components/areas/CommunityCard";
import { getRegion, getRegionCommunities, REGIONS } from "@/data/communities";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { setPageMeta } from "@/lib/seo";
import type { BookingClickHandler } from "@/config/drywall-booking";

interface RegionPageProps {
  onBookClick?: BookingClickHandler;
}

const RegionPage = ({ onBookClick }: RegionPageProps) => {
  const { region: regionSlug = "" } = useParams<{ region: string }>();
  const region      = getRegion(regionSlug);
  const communities = getRegionCommunities(regionSlug);

  const s  = MASTER_REMIX.SERVICE;
  const sc = MASTER_REMIX.SERVICE_CATEGORY;
  const bn = MASTER_REMIX.BRAND_NAME;
  const BASE_URL = MASTER_REMIX.BRAND_URL;

  useEffect(() => {
    if (!region) return;

    const regionLocale = [region.province, region.country].filter(Boolean).join(", ");
    setPageMeta({
      title: `${sc} — ${region.name}${regionLocale ? `, ${regionLocale}` : ""} | ${bn}`,
      description:
        `${bn} serves ${communities.length} communities in ${region.name}` +
        `${regionLocale ? `, ${regionLocale}` : ""}. ${sc} — ` +
        communities.slice(0, 4).map((c) => c.name).join(", ") + " and more.",
      path: `/areas-we-serve/${regionSlug}`,
    });

    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home",           item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Areas We Serve", item: `${BASE_URL}/areas-we-serve` },
          { "@type": "ListItem", position: 3, name: region.name,      item: `${BASE_URL}/areas-we-serve/${regionSlug}` },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${sc} in ${region.name}`,
        serviceType: sc,
        provider: { "@type": "LocalBusiness", name: bn },
        areaServed: {
          "@type": "AdministrativeArea",
          name: region.name,
          containsPlace: communities.slice(0, 10).map((c) => ({ "@type": "Place", name: c.name })),
        },
      },
    ];

    const cleanup = () => { document.querySelectorAll('[data-region-schema="true"]').forEach((el) => el.remove()); };
    cleanup();
    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-region-schema", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
    return cleanup;
  }, [region, regionSlug, communities, s, sc, bn]);

  /* ── 404 for unknown region ── */
  if (!region) {
    return (
      <TemplateLayout onBookClick={onBookClick}>
        <SectionFrame tone="bone" size="lg">
          <div className="text-center max-w-lg mx-auto">
            <h1 className="font-display text-display-lg text-charcoal mb-4">Region Not Found</h1>
            <p className="text-body text-graphite mb-8">
              We couldn't find that region. Browse all our service areas below.
            </p>
            <Link to="/areas-we-serve"
              className="inline-flex items-center gap-2 text-forest text-body">
              <ArrowLeft size={16} /> View All Areas
            </Link>
          </div>
        </SectionFrame>
      </TemplateLayout>
    );
  }

  const adjacentRegions = REGIONS.filter((r) => region.adjacentRegions.includes(r.slug));
  const tier1 = communities.filter((c) => c.tier === 1);
  const tier2 = communities.filter((c) => c.tier === 2);
  const tier3 = communities.filter((c) => c.tier === 3);
  const heroImg = region.heroImage; // verified copyright-free from communities.ts

  return (
    <TemplateLayout onBookClick={onBookClick}>

      {/* ── Hero — real photo background where available, solid forest fallback ── */}
      <section className="relative overflow-hidden bg-forest text-primary-foreground py-32 md:py-48">
        {heroImg && (
          <>
            <img
              src={heroImg.url}
              alt={`${sc} services across ${region.name} — ${heroImg.alt}`}
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="eager"
              width="1920"
              height="1080"
            />
            <div className="absolute inset-0 bg-forest/80" aria-hidden />
          </>
        )}

        <div className="container relative z-10 mx-auto px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-caption text-primary-foreground/50">
              <li><Link to="/" className="hover:text-primary-foreground/80 transition-colors">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link to="/areas-we-serve" className="hover:text-primary-foreground/80 transition-colors">Areas We Serve</Link></li>
              <li aria-hidden>/</li>
              <li className="text-primary-foreground/80">{region.name}</li>
            </ol>
          </nav>

          <p className="font-eyebrow text-primary-foreground/60 mb-4">
            {communities.length} Communities
          </p>
          <h1 className="font-display text-display-xl text-primary-foreground mb-5">
            {sc} in {region.name}{region.province ? `, ${region.province}` : ""}
          </h1>
          <p className="text-body-lg text-primary-foreground/75 max-w-[52ch] mb-10">
            {region.description} We bring {s} to every community in this region.
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
      </section>

      {/* ── Region Context ── */}
      <SectionFrame tone="paper" size="sm">
        <div className="max-w-3xl text-body text-graphite space-y-4">
          <p>
            {bn} serves <strong>{communities.length} communities</strong> across {region.name} —
            from Tier 1 high-priority areas where we maintain consistent project volume, to smaller
            areas where we deliver the same quality of {s} work at every scale.
          </p>
          {tier1.length > 0 && (
            <p>
              {/* REMIX: Update this copy for your specific trade + region character */}
              Our primary {region.name} communities include{" "}
              {tier1.slice(0, 5).map((c, i, arr) => (
                <span key={c.slug}>
                  {i > 0 && i < arr.length - 1 ? ", " : i === arr.length - 1 && i > 0 ? ", and " : ""}
                  <Link to={`/areas-we-serve/${c.region}/${c.slug}`}
                    className="text-forest hover:underline">{c.name}</Link>
                </span>
              ))}
              {tier1.length > 5 ? ` and ${tier1.length - 5} more` : ""}. These are the areas
              where we maintain deep knowledge of local build standards and property expectations.
            </p>
          )}
          <p>
            Every community page in this region includes a Google Map centred on that community,
            specific street references that prove we know the neighbourhood, local landmark callouts,
            and {s}-specific FAQ answers — because local credibility is built on detail.
          </p>
        </div>
      </SectionFrame>

      {/* ── Community Directory ── */}
      <SectionFrame tone="bone" size="lg">

        {tier1.length > 0 && (
          <div className="mb-16">
            <p className="font-eyebrow text-forest mb-3">Primary Communities</p>
            <h2 className="font-display text-display-md text-charcoal mb-8">
              Highest-Priority {region.shortName} Areas
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {tier1.map((c) => <CommunityCard key={c.slug} community={c} />)}
            </div>
          </div>
        )}

        {tier2.length > 0 && (
          <div className="mb-16">
            <p className="font-eyebrow text-forest mb-3">Regional Communities</p>
            <h2 className="font-display text-display-md text-charcoal mb-8">
              All {region.shortName} Communities We Serve
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {tier2.map((c) => <CommunityCard key={c.slug} community={c} />)}
            </div>
          </div>
        )}

        {tier3.length > 0 && (
          <div>
            <p className="font-eyebrow text-forest mb-3">Local Communities</p>
            <h2 className="font-display text-display-md text-charcoal mb-8">
              Smaller {region.shortName} Communities &amp; Hamlets
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {tier3.map((c) => <CommunityCard key={c.slug} community={c} />)}
            </div>
          </div>
        )}

      </SectionFrame>

      {/* ── Why Us in This Region ── */}
      <SectionFrame tone="paper" size="md">
        <div className="max-w-3xl">
          <p className="font-eyebrow text-forest mb-4">Why Us</p>
          <h2 className="font-display text-display-md text-charcoal mb-8">
            Why {region.shortName} Homeowners Choose {bn}
          </h2>
          {/* REMIX: Customise these 3 trust points for your trade's strengths in this region */}
          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <p className="font-display text-display-sm text-charcoal mb-2">We Know the Build Standard</p>
              <p className="text-body-sm text-graphite">
                Every {region.shortName} community has specific property types and finish expectations.
                We know the standard and work to it — not a generic version of it.
              </p>
            </div>
            <div>
              <p className="font-display text-display-sm text-charcoal mb-2">Local. Close By.</p>
              <p className="text-body-sm text-graphite">
                No long travel fees, no delayed start times. We're local to the
                communities in {region.name} — and it shows in our response time.
              </p>
            </div>
            <div>
              <p className="font-display text-display-sm text-charcoal mb-2">Written Estimates. Always.</p>
              <p className="text-body-sm text-graphite">
                Every {region.shortName} project gets a written scope before we start. No surprises,
                no scope creep, no verbal-only promises.
              </p>
            </div>
          </div>
        </div>
      </SectionFrame>

      {/* ── Adjacent Regions ── */}
      {adjacentRegions.length > 0 && (
        <SectionFrame tone="bone" size="sm">
          <p className="font-eyebrow text-forest mb-6">Also Serving</p>
          <div className="flex flex-wrap gap-3">
            {adjacentRegions.map((r) => (
              <Link key={r.slug} to={`/areas-we-serve/${r.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-seam rounded-full
                           text-body-sm text-graphite hover:border-forest/40 hover:text-forest
                           transition-all duration-300">
                {r.name}<ArrowRight size={14} />
              </Link>
            ))}
            <Link to="/areas-we-serve"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-seam rounded-full
                         text-body-sm text-graphite hover:border-forest/40 hover:text-forest
                         transition-all duration-300">
              All Regions <ArrowRight size={14} />
            </Link>
          </div>
        </SectionFrame>
      )}

      {/* ── CTA ── */}
      <SectionFrame tone="forest" size="lg" grain>
        <div className="max-w-2xl">
          <p className="font-eyebrow text-primary-foreground/60 mb-4">Begin</p>
          <h2 className="font-display text-display-lg text-primary-foreground mb-5">
            Ready to start your project in {region.shortName}?
          </h2>
          <p className="text-body-lg text-primary-foreground/75 mb-8">
            We serve every community in {region.name}. Send your address and project
            scope — we'll get back to you within hours.
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

export default RegionPage;
