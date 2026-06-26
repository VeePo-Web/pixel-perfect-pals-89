/**
 * AREAS WE SERVE — Community Page  (Tier 3 of 3) — The SEO Powerhouse
 * Route: /areas-we-serve/:region/:community
 *
 * REMIX GUIDE ─────────────────────────────────────────────────────────────────
 * Every service reference reads from MASTER_REMIX. To remix for a new trade:
 *   1. Update trade.config.ts → MASTER_REMIX picks it up automatically.
 *   2. The H1, meta title, FAQs, schema, and CTA all update everywhere.
 *   3. To customise the services grid, update MASTER_REMIX.SUB_SERVICES.
 *
 * SEO ARCHITECTURE PER PAGE ───────────────────────────────────────────────────
 *   • H1:  "{serviceCategory} in {Community}, {City}"
 *   • Title: "{serviceCategory} Contractor {Community} {City} | {BrandName} | Alberta"
 *   • Meta description: unique per community, mentions nearest communities
 *   • Schema: LocalBusiness + BreadcrumbList + FAQPage + Service  (4 types)
 *   • Google Map: coordinates-based iframe, no API key required
 *   • FAQs: dynamically generated per community + service — never stale
 *   • Internal links: 4 nearest communities + all sub-services
 *   • Breadcrumb: Home → Areas We Serve → {Region} → {Community}
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin, ChevronDown } from "lucide-react";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import GoogleMap from "@/components/areas/GoogleMap";
import NearbyAreasWidget from "@/components/areas/NearbyAreasWidget";
import AreasSEOSchema from "@/components/areas/AreasSEOSchema";
import GuidesForLocation from "@/components/blog/GuidesForLocation";
import { getPostsAboutCommunity } from "@/lib/blogData";
import { getCommunity, getRegion, getCommunity as gc, resolveCommunityHeroImage } from "@/data/communities";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { setPageMeta } from "@/lib/seo";
import type { BookingClickHandler, BookingPrefill } from "@/config/template/booking-schema";
import type { FAQ } from "@/config/template/remix-variables";

interface CommunityPageProps {
  onBookClick?: BookingClickHandler;
}

/**
 * Generates 4 community-specific FAQs using the current trade's service name.
 * These are injected into both the FAQ accordion AND the FAQPage JSON-LD schema.
 * All service references come from MASTER_REMIX — zero hardcoded trade language.
 */
function buildFAQs(
  community: NonNullable<ReturnType<typeof getCommunity>>,
  service: string,
  brandName: string,
): FAQ[] {
  const streetA = community.streets[0] ?? "local streets";
  const streetB = community.streets[1] ?? community.streets[0] ?? "nearby roads";
  const streetC = community.streets[2] ?? streetB;

  return [
    {
      question: `Do you provide ${service} services in ${community.name}, ${community.city}?`,
      answer:
        `Yes — ${community.name} is a core service area for ${brandName}. ` +
        `${community.name} is typically on our schedule within 1–3 weeks of estimate acceptance. ` +
        `We cover the full community, from the established streets to the newest developments.`,
    },
    {
      question: `What ${service} work is most common in ${community.name}?`,
      answer:
        `${community.name}'s ${community.tier === 1 ? "premium estate and family" : community.tier === 2 ? "established" : "residential"} ` +
        `homes typically need ${service} work for renovations, new construction finishing, ` +
        `basement developments, and quality upgrades. We adapt our scope to the build standard ` +
        `that ${community.name} homeowners expect — which is consistently high.`,
    },
    {
      question: `Do you work on streets like ${streetA} and ${streetB} in ${community.name}?`,
      answer:
        `Yes — we've completed ${service} projects throughout ${community.name}, including on ` +
        `${streetA}, ${streetB}, and ${streetC}. If you live anywhere in ${community.name}, ` +
        `we serve your area. Send us your address and project scope to confirm.`,
    },
    {
      question: `How long does a ${service} project take in ${community.name}?`,
      answer:
        `Timeline depends on project scope. Small repairs are typically done within a day. ` +
        `A full-room renovation takes 2–5 days. A whole-home or basement development is quoted ` +
        `with a specific timeline in the written estimate — we never promise what we can't keep. ` +
        `We schedule ${community.name} projects alongside other nearby communities for efficiency.`,
    },
  ];
}

const CommunityPage = ({ onBookClick }: CommunityPageProps) => {
  const { region: regionSlug = "", community: communitySlug = "" } = useParams<{ region: string; community: string }>();

  const community = getCommunity(communitySlug);
  const region    = getRegion(regionSlug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const s   = MASTER_REMIX.SERVICE;
  const sc  = MASTER_REMIX.SERVICE_CATEGORY;
  const bn  = MASTER_REMIX.BRAND_NAME;
  const sbs = MASTER_REMIX.SUB_SERVICES;

  /* Dynamic FAQs — never reference a specific trade in stored community data */
  const faqs: FAQ[] = community ? buildFAQs(community, s, bn) : [];
  const guides = community ? getPostsAboutCommunity(community.slug) : [];

  useEffect(() => {
    if (!community || !region) return;

    const nearest = community.nearestCommunities.slice(0, 2)
      .map((sl) => gc(sl)?.name)
      .filter(Boolean);

    setPageMeta({
      title: `${sc} ${community.name}, ${community.city} | ${bn}`,
      description:
        `Looking for ${s} in ${community.name}? ${bn} serves ${community.name}` +
        (nearest.length ? ` and nearby ${nearest.join(", ")}` : "") +
        `. Written estimate within 24 hours.`,
      path: `/areas-we-serve/${regionSlug}/${communitySlug}`,
    });
  }, [community, region, regionSlug, communitySlug, s, sc, bn]);

  /* ── 404 ── */
  if (!community || !region) {
    return (
      <TemplateLayout onBookClick={onBookClick}>
        <SectionFrame tone="bone" size="lg">
          <div className="text-center max-w-lg mx-auto">
            <h1 className="font-display text-display-lg text-charcoal mb-4">Community Not Found</h1>
            <p className="text-body text-graphite mb-8">
              We couldn't find that community. Browse all our service areas.
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

  const prefill: BookingPrefill = {
    description: `${sc} project in ${community.name}, ${community.city}`,
    source: `areas-we-serve/${community.region}/${community.slug}`,
  };

  // Hero image priority: community inline → lookup map → region → solid forest colour
  const heroImg = resolveCommunityHeroImage(community) ?? region.heroImage;

  return (
    <TemplateLayout onBookClick={onBookClick}>

      {/* ── JSON-LD Schema — 4 types injected into <head> ── */}
      <AreasSEOSchema
        community={community}
        regionName={region.name}
        brandName={bn}
        service={s}
        serviceCategory={sc}
        faqs={faqs}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — BREADCRUMB + HERO
          H1 pattern: "{serviceCategory} in {Community}, {City}"
          Hero image: community.heroImage → region.heroImage → solid forest fallback
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-forest text-primary-foreground py-32 md:py-48">
        {/* Real copyright-free photo as background — SEO: image alt text adds geo signal */}
        {heroImg && (
          <>
            <img
              src={heroImg.url}
              alt={`${sc} in ${community.name}, ${community.city} — ${heroImg.alt}`}
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="eager"
              width="1920"
              height="1080"
            />
            {/* Forest overlay keeps all text readable against any photo */}
            <div className="absolute inset-0 bg-forest/80" aria-hidden />
          </>
        )}

        <div className="container relative z-10 mx-auto px-6">

          {/* Breadcrumb — also generates BreadcrumbList schema via AreasSEOSchema */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-caption text-primary-foreground/50">
              <li><Link to="/" className="hover:text-primary-foreground/80 transition-colors">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link to="/areas-we-serve" className="hover:text-primary-foreground/80 transition-colors">Areas We Serve</Link></li>
              <li aria-hidden>/</li>
              <li><Link to={`/areas-we-serve/${regionSlug}`} className="hover:text-primary-foreground/80 transition-colors">{region.name}</Link></li>
              <li aria-hidden>/</li>
              <li className="text-primary-foreground/80">{community.name}</li>
            </ol>
          </nav>

          {/* Location eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={14} className="text-primary-foreground/50" />
            <p className="font-eyebrow text-primary-foreground/60 uppercase tracking-[0.18em]">
              {community.name} · {region.name} · {community.city}{community.province ? `, ${community.province}` : ""}
            </p>
          </div>

          {/* H1 — the money SEO tag */}
          <h1 className="font-display text-display-xl text-primary-foreground mb-5">
            {sc} in {community.name}, {community.city}
          </h1>

          <p className="text-body-lg text-primary-foreground/75 max-w-[52ch] mb-10">
            {community.shortDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onBookClick?.(prefill)}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full
                         bg-clay text-white font-body text-label uppercase tracking-[0.15em]
                         hover:bg-clay/90 transition-colors duration-300"
            >
              {TEMPLATE_COPY.cta.primary}
              <ArrowRight size={16} />
            </button>
            <Link to={`/areas-we-serve/${regionSlug}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full
                         border border-primary-foreground/30 text-primary-foreground/70
                         font-body text-label uppercase tracking-[0.15em]
                         hover:border-primary-foreground/60 hover:text-primary-foreground
                         transition-all duration-300">
              <ArrowLeft size={16} /> Back to {region.shortName}
            </Link>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — ABOUT THIS COMMUNITY  (The Primary SEO Content Section)
          Contains: geographic intelligence, street-level proof, landmarks
      ══════════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="paper" size="lg">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Body — geo intelligence + street-level proof */}
          <div className="lg:col-span-2">
            <p className="font-eyebrow text-forest mb-4">About This Community</p>
            <h2 className="font-display text-display-md text-charcoal mb-6">
              {sc} Contractor Serving {community.name}
            </h2>

            {/* Geographic intelligence paragraph — from communities.ts */}
            <p className="text-body text-graphite mb-5 leading-relaxed">
              {community.fullDescription}
            </p>

            {/* Street-level proof paragraph — hyper-local SEO signal */}
            {community.streets.length > 0 && (
              <p className="text-body text-graphite mb-5 leading-relaxed">
                We regularly complete {s} projects in homes throughout {community.name}, including
                along {community.streets.slice(0, -1).join(", ")}
                {community.streets.length > 1 && `, and ${community.streets[community.streets.length - 1]}`}.
                If you live on any of these streets — or anywhere in {community.name} — we're your
                local {s} contractor.
              </p>
            )}

            {/* Landmarks paragraph */}
            {community.landmarks.length > 0 && (
              <p className="text-body text-graphite mb-5 leading-relaxed">
                {community.name} homeowners near {community.landmarks.slice(0, 3).join(", ")} know
                us well. We've worked across projects throughout the community and understand the
                property types, build standards, and finish quality that {community.name} expects.
              </p>
            )}

            {/* Distance signal */}
            <p className="text-body text-graphite leading-relaxed">
              {community.name} is a straightforward drive for our team. No travel delay
              fees, no scheduling complications. Just a local provider who shows up on
              time with a written scope.
            </p>
          </div>

          {/* Sidebar — quick facts + streets */}
          <div>
            <div className="bg-bone rounded border border-seam p-6">
              <p className="font-eyebrow text-forest mb-4">Quick Facts</p>
              <dl className="space-y-4">
                <div>
                  <dt className="text-caption text-mist uppercase tracking-[0.1em]">Community</dt>
                  <dd className="text-body-sm text-charcoal">{community.name}</dd>
                </div>
                <div>
                  <dt className="text-caption text-mist uppercase tracking-[0.1em]">Region</dt>
                  <dd className="text-body-sm text-charcoal">{region.name}</dd>
                </div>
                <div>
                  <dt className="text-caption text-mist uppercase tracking-[0.1em]">City / Municipality</dt>
                  <dd className="text-body-sm text-charcoal">{community.city}, {community.province}</dd>
                </div>
                <div>
                  <dt className="text-caption text-mist uppercase tracking-[0.1em]">Coordinates</dt>
                  <dd className="text-body-sm text-charcoal font-mono text-xs">
                    {community.coordinates.lat.toFixed(4)}°N,{" "}
                    {Math.abs(community.coordinates.lng).toFixed(4)}°W
                  </dd>
                </div>
                <div>
                  <dt className="text-caption text-mist uppercase tracking-[0.1em]">Key Landmarks</dt>
                  <dd className="text-body-sm text-charcoal">{community.landmarks.slice(0, 3).join(" · ")}</dd>
                </div>
              </dl>

              {/* Streets we work on */}
              <div className="mt-5 pt-5 border-t border-seam">
                <p className="text-caption text-mist uppercase tracking-[0.1em] mb-3">Streets We Work On</p>
                <ul className="space-y-1.5">
                  {community.streets.slice(0, 6).map((street) => (
                    <li key={street} className="text-body-sm text-graphite flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-forest/40 flex-shrink-0 mt-2" />
                      {street}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </SectionFrame>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3 — GOOGLE MAP
          Free iframe embed — coordinates from communities.ts — no API key
      ══════════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="bone" size="sm">
        <div className="max-w-4xl">
          <p className="font-eyebrow text-forest mb-3">Location</p>
          <h2 className="font-display text-display-sm text-charcoal mb-5">
            Where We Work in {community.name}
          </h2>
          <GoogleMap
            lat={community.coordinates.lat}
            lng={community.coordinates.lng}
            title={community.name}
            zoom={community.tier === 1 ? 14 : 13}
            className="shadow-editorial"
          />
          <p className="text-caption text-mist mt-3">
            {community.name} · {community.city}{community.province ? `, ${community.province}` : ""} ·{" "}
            {community.coordinates.lat.toFixed(4)}°N, {Math.abs(community.coordinates.lng).toFixed(4)}°W
          </p>
        </div>
      </SectionFrame>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4 — SERVICES IN THIS COMMUNITY
          REMIX: Update MASTER_REMIX.SUB_SERVICES to reflect your trade.
          Links go to /services page for full detail.
      ══════════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="paper" size="lg">
        <p className="font-eyebrow text-forest mb-4">What We Do Here</p>
        <h2 className="font-display text-display-md text-charcoal mb-3">
          {sc} Services in {community.name}
        </h2>
        <p className="text-body text-graphite mb-10 max-w-[48ch]">
          Every service we offer in {community.name} comes with a written quote and a
          fixed price band — the same standard that applies across all {bn} projects.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {sbs.map((service, i) => (
            <Link key={i} to="/services"
              className="group block border border-seam rounded p-5 bg-bone
                         hover:border-forest/40 hover:shadow-subtle transition-all duration-300">
              <h3 className="font-display text-display-sm text-charcoal mb-2
                             group-hover:text-forest transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-body-sm text-graphite mb-3 leading-relaxed line-clamp-2">
                {service.summary}
              </p>
              {service.range && (
                <p className="text-caption text-forest font-medium">{service.range}</p>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link to="/services"
            className="inline-flex items-center gap-2 text-forest text-body hover:underline">
            View all {sc} services <ArrowRight size={16} />
          </Link>
        </div>
      </SectionFrame>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 5 — FAQ (dynamically generated — always trade-accurate)
          Also powers FAQPage JSON-LD schema injected by AreasSEOSchema above.
      ══════════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="bone" size="lg">
        <div className="max-w-3xl">
          <p className="font-eyebrow text-forest mb-4">Common Questions</p>
          <h2 className="font-display text-display-md text-charcoal mb-8">
            {sc} in {community.name} — FAQ
          </h2>

          <div className="divide-y divide-seam border border-seam rounded overflow-hidden">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-paper">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={openFaq === i}
                >
                  <span className="faq-question font-display text-display-sm text-charcoal leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown size={18}
                    className={`text-forest flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="faq-answer text-body text-graphite leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Link to full FAQ page */}
          <div className="mt-6">
            <Link to="/pricing"
              className="inline-flex items-center gap-2 text-forest text-body-sm hover:underline">
              More questions? See our pricing &amp; process <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </SectionFrame>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 6 — NEARBY COMMUNITIES (Internal linking engine)
          Pulls nearestCommunities[] from communities.ts for PageRank flow.
      ══════════════════════════════════════════════════════════════════════ */}
      <NearbyAreasWidget currentSlug={community.slug} communityName={community.name} />

      {/* ── Editorial posts geo-bound to this community (Victorious-SEO bridge) ── */}
      <GuidesForLocation locationName={community.name} posts={guides} />

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 7 — COMMUNITY-SPECIFIC CTA
          Pre-fills booking modal with community name + service for CRM routing.
      ══════════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="forest" size="lg" grain>
        <div className="max-w-2xl">
          <p className="font-eyebrow text-primary-foreground/60 mb-4">Begin</p>
          <h2 className="font-display text-display-lg text-primary-foreground mb-5">
            Ready to start your {s} project in {community.name}?
          </h2>
          <p className="text-body-lg text-primary-foreground/75 mb-8">
            {/* REMIX: Update to reflect your trade's local credibility signal */}
            We know {community.name} — the streets, the property types, the build standard.
            Send three photos and receive a written estimate within 24 hours. No sales call.
            No pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onBookClick?.(prefill)}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full
                         bg-clay text-white font-body text-label uppercase tracking-[0.15em]
                         hover:bg-clay/90 transition-colors duration-300"
            >
              {TEMPLATE_COPY.cta.primary}
              <ArrowRight size={16} />
            </button>
            <Link to="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full
                         border border-primary-foreground/30 text-primary-foreground/70
                         font-body text-label uppercase tracking-[0.15em]
                         hover:border-primary-foreground/60 hover:text-primary-foreground
                         transition-all duration-300">
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </SectionFrame>

    </TemplateLayout>
  );
};

export default CommunityPage;
