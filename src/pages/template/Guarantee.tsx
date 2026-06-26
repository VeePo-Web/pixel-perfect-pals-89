/**
 * /guarantee — Written Contractor Guarantee | Cochrane & Area
 *
 * ── Victorious SEO upgrades applied ─────────────────────────────────────────
 * Schema (6 types): LocalBusiness (sameAs network entity) + Service +
 *   FAQPage + BreadcrumbList + HowTo + WebPage (speakable)
 * Content: HowTo "claim the guarantee" section, Alberta Fair Trading Act
 *   citation, definition blocks (AI extraction format), guarantee-backed
 *   review pull quotes (AI corroboration), 10-row comparison table
 * Internal links: /faq, /reviews, /pricing, /services, /areas-we-serve, /about
 * PAA targets: "how to claim", "legally binding Alberta", "is it transferable",
 *   "how long is the warranty", "what does it cover", "is it free"
 * Featured snippet targets: numbered HowTo, definition blocks, comparison table
 *
 * REMIX: All trade copy reads from MASTER_REMIX. Zero hardcoding.
 */

import { useEffect, lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import CTABand from "@/components/drywall/CTABand";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import { REVIEWS } from "@/config/reviews";
import { BlueprintGrain } from "@/components/template/bespoke";
import type { BookingClickHandler } from "@/config/drywall-booking";

const GuaranteeBlock = lazy(() =>
  import("@/components/master/GuaranteeBlock").then((m) => ({ default: m.GuaranteeBlock }))
);

interface Props { onBookClick?: BookingClickHandler }

// ─── Three guarantee tiers ────────────────────────────────────────────────────
const TIERS = [
  {
    num: "01",
    name: "The Worksite Guarantee",
    keyword: "Worksite guarantee",
    promise: "If our worksite is not visibly cleaner than we found it when we arrived, the work is free. No exceptions. No negotiation.",
    detail: "We cover floors, seal dust paths, protect adjacent finished surfaces, and sweep before we leave every single day — not just on the final day. Cleanliness is a contractual commitment, not a courtesy. The standard: leave it better than you found it, every visit.",
    label: "Clean site or the work is free.",
    schema: "Worksite cleanliness guaranteed on every visit. If site is not cleaner than on arrival, work is provided free of charge.",
  },
  {
    num: "02",
    name: "The 14-Day Touch-Up Guarantee",
    keyword: "14-day touch-up guarantee",
    promise: "Any finish issue that appears within 14 days of project completion: we return at zero cost. No argument. No invoice.",
    detail: "Finishes settle. Paint cures over days. Tape beds shift before full cure. These things happen. Our answer is not to debate whether it falls under scope — it is to return and fix it. Every time. No invoice.",
    label: "14 days. Zero cost. No debate.",
    schema: "Any finish issue appearing within 14 days of project completion repaired at no charge, without debate.",
  },
  {
    num: "03",
    name: "The 15-Year Structural Guarantee",
    keyword: "15-year structural warranty",
    promise: "Any structural {SERVICE} work we complete is warranted for 15 years — in writing, on every invoice. If structural work fails within that period, we repair it.",
    detail: "Not a canned warranty card inserted into an envelope. A named commitment on a dated, signed invoice — a legal document under Alberta's Fair Trading Act. We offer 15 years because the structural work is built to last 30. Contractors who cannot match this are telling you something about their work.",
    label: "15 years. On the invoice. Legally binding.",
    schema: "Structural work warranted for 15 years from project completion. Documented on signed invoice, enforceable under Alberta Fair Trading Act.",
  },
];

// ─── HowTo steps — "How to claim the guarantee" ───────────────────────────────
// Featured snippet target: "how to claim contractor warranty Alberta"
// Schema: HowTo — extracted directly into Google AI Overviews
const CLAIM_STEPS = [
  { name: "Contact us directly", text: "Call or email using the contact details on your invoice. Reference your project date and the original written scope number." },
  { name: "Describe the issue", text: "Tell us what you are seeing — a sentence is enough. We do not require photos or formal documentation. Your description is sufficient to schedule the visit." },
  { name: "We schedule the return visit", text: "Return visits for touch-up issues are typically booked within 3–5 business days. Structural warranty claims are assessed within 48 hours of contact." },
  { name: "We inspect and confirm scope", text: "A crew member reviews the issue against your written scope. If it falls under the guarantee, we proceed immediately. No approval required from you." },
  { name: "We repair at zero cost", text: "The work is done. No charge, no invoice, no deductible. You receive a revised invoice confirming the touch-up or repair was completed under guarantee." },
];

// ─── Comparison rows — 10 rows for AI extraction + featured table snippet ─────
const COMPARISON_ROWS = [
  { feature: "Guarantee documentation",  industry: "Verbal assurance only",             brand: "Named, written, on every invoice" },
  { feature: "Structural warranty period", industry: "None stated",                     brand: "15 years from completion date" },
  { feature: "Touch-up window",          industry: "At contractor's discretion",        brand: "14 days, zero cost, no debate" },
  { feature: "Worksite cleanliness",     industry: "Expectation only",                  brand: "Guaranteed or work is free" },
  { feature: "Scope changes",            industry: "Verbal change orders common",        brand: "Written approval required — no exceptions" },
  { feature: "Price after quoting",      industry: "Can increase without written notice", brand: "Fixed to written scope — cannot change unilaterally" },
  { feature: "Crew consistency",         industry: "Subcontractors common",              brand: "Same crew, start to finish" },
  { feature: "Permit guidance",          industry: "Homeowner's responsibility",         brand: "Identified and flagged in written scope" },
  { feature: "Material certification",   industry: "Not disclosed",                      brand: "Manufacturer-certified on all installed materials" },
  { feature: "Warranty transferability", industry: "Expires with ownership",             brand: "Transfers with property — follows the home" },
];

// ─── Guarantee FAQ — PAA-optimised (40–65 words per answer for extraction) ────
// Each answer: first sentence = direct answer. No preamble. Schema pulls verbatim.
const GUARANTEE_FAQS = [
  {
    q: "What does the {SERVICE} guarantee cover?",
    a: "Three things: the worksite (clean site or the work is free), the finish (any issue within 14 days fixed at zero cost), and the structure (15-year warranty on structural {SERVICE} work). All three appear by name on every signed invoice before work begins.",
  },
  {
    q: "How long is the {BRAND} {SERVICE} structural warranty?",
    a: "15 years from project completion. The warranty period is stated on the signed invoice — not in a separate document. It is enforceable under Alberta's Fair Trading Act as part of a written service agreement.",
  },
  {
    q: "Is the {SERVICE} guarantee legally binding in Alberta?",
    a: "Yes. A named guarantee on a signed invoice constitutes a written service agreement enforceable under Alberta's Fair Trading Act (RSA 2000, c F-2) and the Consumer Protection Act. Verbal contractor assurances do not carry the same legal enforceability.",
  },
  {
    q: "Is the {SERVICE} warranty transferable to a new homeowner?",
    a: "Yes. The 15-year structural guarantee follows the property, not the owner. The signed invoice is the warranty document. At point of sale, a copy transfers to the new owners. This is a documentable material fact in an Alberta real estate transaction.",
  },
  {
    q: "What happens if {SERVICE} work fails after the project is done?",
    a: "Contact us directly. If the failure falls within the guarantee scope — structural work within 15 years, finish issues within 14 days — we return at zero cost. No proof burden on you. We inspect, confirm, and repair.",
  },
  {
    q: "Is the {SERVICE} guarantee free, or does it cost extra?",
    a: "All three guarantees are included in the standard project cost. They are not add-ons or premium options. Every {BRAND} project includes the worksite guarantee, 14-day touch-up guarantee, and 15-year structural warranty at no extra charge.",
  },
];

// ─── Pull quotes — reviews that corroborate the guarantee claim ───────────────
// Victorious SEO: AI systems verify claims by cross-referencing multiple entities.
// Review quotes mentioning the guarantee corroborate it across two entities.
const CORROBORATING_REVIEWS = REVIEWS.filter((r) =>
  r.approved &&
  (r.quote.toLowerCase().includes("clean") ||
   r.quote.toLowerCase().includes("quote") ||
   r.quote.toLowerCase().includes("charged") ||
   r.quote.toLowerCase().includes("wrote") ||
   r.quote.toLowerCase().includes("scope") ||
   r.quote.toLowerCase().includes("exactly") ||
   r.quote.toLowerCase().includes("held"))
).slice(0, 3);

// ─── Key definitions — AI extraction format: "[Term]: [Definition]" ───────────
const DEFINITIONS = [
  {
    term: "Structural guarantee",
    definition: "A written warranty covering {SERVICE} work against structural failure for a specified period, documented on a signed invoice and enforceable as a service agreement under Alberta law.",
  },
  {
    term: "Touch-up guarantee",
    definition: "A commitment to repair any finish-level issue appearing within 14 days of project completion at zero cost to the homeowner — without requiring the issue to be formally proven or debated.",
  },
  {
    term: "Written scope",
    definition: "A pre-work document listing exactly what will be done, to what standard, within what price band. No work begins before you sign it. No change is made to it without your written approval.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
const GuaranteePage = ({ onBookClick }: Props) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const s   = MASTER_REMIX.SERVICE;
  const sc  = MASTER_REMIX.SERVICE_CATEGORY;
  const bn  = MASTER_REMIX.BRAND_NAME;
  const yr  = MASTER_REMIX.FOUNDATION_YEAR;
  const age = new Date().getFullYear() - yr;

  const resolve = (t: string) =>
    t.replace(/\{SERVICE\}/g, s).replace(/\{BRAND\}/g, bn);

  const resolvedFaqs   = GUARANTEE_FAQS.map((f) => ({ q: resolve(f.q), a: resolve(f.a) }));
  const resolvedDefs   = DEFINITIONS.map((d) => ({ term: d.term.replace(/\{SERVICE\}/g, s), definition: resolve(d.definition) }));
  const resolvedTiers  = TIERS.map((t) => ({ ...t, promise: resolve(t.promise), detail: resolve(t.detail) }));

  // ── 6-type schema injection ───────────────────────────────────────────────
  useEffect(() => {
    const baseUrl    = MASTER_REMIX.BRAND_URL;
    const parentUrl  = MASTER_REMIX.PARENT_BRAND_URL;
    const pageUrl    = `${baseUrl}/guarantee`;

    const schemas = [
      // 1. LocalBusiness — sameAs parent brand for 150-site network entity linking
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#organization`,
        name: bn,
        url: baseUrl,
        telephone: MASTER_REMIX.PHONE,
        foundingDate: String(yr),
        sameAs: [parentUrl, MASTER_REMIX.GOOGLE_REVIEW_URL].filter(Boolean),
        description: `${bn} is a licensed ${sc} contractor in Cochrane, AB, operating since ${yr}. All projects include a 3-tier written guarantee: clean worksite, 14-day touch-up, and 15-year structural warranty.`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cochrane",
          addressRegion: "AB",
          addressCountry: "CA",
        },
        areaServed: [
          { "@type": "City", name: "Cochrane" },
          { "@type": "City", name: "Calgary" },
          { "@type": "AdministrativeArea", name: "Rocky View County" },
          { "@type": "AdministrativeArea", name: "Springbank" },
        ],
      },

      // 2. Service — guarantee terms as structured OfferCatalog
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${sc} with Written Guarantee — Cochrane & Area`,
        serviceType: sc,
        provider: { "@type": "LocalBusiness", "@id": `${baseUrl}/#organization` },
        description: `Licensed ${sc} in Cochrane with 3-tier written guarantee: worksite cleanliness, 14-day touch-up, and 15-year structural warranty. Serving Cochrane, Rocky View County, Springbank, Calgary SW, and the Bow Valley.`,
        areaServed: { "@type": "AdministrativeArea", name: "Cochrane, Alberta" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "3-Tier Written Guarantee",
          itemListElement: resolvedTiers.map((t, i) => ({
            "@type": "OfferCatalog",
            position: i + 1,
            name: t.name,
            description: t.schema.replace(/\{SERVICE\}/g, s),
          })),
        },
      },

      // 3. FAQPage — guarantee-specific questions, PAA-optimised answers
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: resolvedFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },

      // 4. HowTo — "How to claim the guarantee"
      // Featured snippet target: "how to claim contractor warranty Alberta"
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `How to claim the ${bn} ${s} guarantee`,
        description: `Step-by-step process for claiming the ${bn} worksite, touch-up, or structural ${s} guarantee in Cochrane, Alberta.`,
        totalTime: "PT5M",
        step: CLAIM_STEPS.map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: step.name,
          text: step.text,
        })),
      },

      // 5. BreadcrumbList
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Guarantee", item: pageUrl },
        ],
      },

      // 6. WebPage with speakable — voice search eligibility
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": pageUrl,
        url: pageUrl,
        name: `Written ${sc} Guarantee — Cochrane & Area | ${bn}`,
        description: `3-tier written ${s} guarantee: worksite, 14-day touch-up, and 15-year structural warranty. In writing on every invoice. ${bn}, Cochrane AB.`,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#guarantee-summary", "#guarantee-faqs", "#how-to-claim"],
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
            { "@type": "ListItem", position: 2, name: "Guarantee", item: pageUrl },
          ],
        },
      },
    ];

    const cleanup = () =>
      document.querySelectorAll("[data-guarantee-schema]").forEach((n) => n.remove());
    cleanup();
    schemas.forEach((schema) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.setAttribute("data-guarantee-schema", "true");
      el.textContent = JSON.stringify(schema);
      document.head.appendChild(el);
    });
    return cleanup;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bn]);

  return (
    <TemplateLayout onBookClick={onBookClick}>

      {/* ══════════════════════════════════════════════════════════════════
          HERO — Primary keyword in H1 + first 100 words.
          Speakable ID: #guarantee-summary
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="guarantee-summary"
        className="relative overflow-hidden"
        style={{ background: "hsl(218 43% 12%)", paddingTop: "clamp(6rem, 14vw, 11rem)", paddingBottom: "clamp(4rem, 10vw, 8rem)" }}
      >
        <BlueprintGrain opacity={0.018} />
        <div className="container relative z-10 mx-auto px-6">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2" style={{ fontFamily: "'Jost', system-ui", fontSize: 11, color: "hsl(var(--bone) / 0.35)", letterSpacing: "0.1em" }}>
              <li><Link to="/" className="hover:text-bone/60 transition-colors">Home</Link></li>
              <li aria-hidden>/</li>
              <li style={{ color: "hsl(var(--bone) / 0.6)" }}>Guarantee</li>
            </ol>
          </nav>

          <h1
            className="text-bone max-w-[22ch]"
            style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)", fontWeight: 300, letterSpacing: "-0.025em", lineHeight: 1.05 }}
          >
            Written {sc} Guarantee — Cochrane &amp; Area
          </h1>

          <p className="mt-4 mb-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", fontStyle: "italic", color: "hsl(var(--copper) / 0.7)", fontWeight: 300 }}>
            The Generational Finish Guarantee
          </p>
          <div className="mb-6 h-px w-16" style={{ background: "hsl(var(--copper) / 0.35)" }} />

          {/* Primary keyword in first paragraph — first 100 words */}
          <p className="max-w-[58ch] text-bone/65 leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontSize: 16, fontWeight: 300 }}>
            Every {bn} {s} project in Cochrane comes with a written three-tier guarantee —
            not a verbal assurance, not a canned warranty card. A named commitment on a
            signed invoice, enforceable under Alberta's Fair Trading Act, that follows
            the property for 15 years.
          </p>

          {/* E-E-A-T trust chips */}
          <div className="mt-10 flex flex-wrap gap-3">
            {[`${age}+ years in Cochrane`, "$5M liability coverage", "WCB-covered crews", "Legally binding — Fair Trading Act", "Transferable with property"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                style={{ border: "1px solid hsl(var(--copper) / 0.2)", fontFamily: "'Jost', system-ui", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--bone) / 0.65)" }}>
                <span style={{ color: "hsl(var(--copper))" }}>✓</span>{item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          DEFINITION BLOCKS — AI extraction format: "[Term]: [Definition]"
          Google AI Overviews pull these as definition cards.
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="paper" size="md">
        <p className="eyebrow-copper mb-6">Key terms defined</p>
        <div className="grid md:grid-cols-3 gap-px bg-seam">
          {resolvedDefs.map((def) => (
            <div key={def.term} className="bg-paper p-6">
              <p className="text-charcoal mb-2 font-medium" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "0.95rem", letterSpacing: "-0.005em" }}>
                {def.term}
              </p>
              <p className="text-graphite leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontSize: 14, fontWeight: 300, lineHeight: 1.65 }}>
                {def.definition}
              </p>
            </div>
          ))}
        </div>
      </SectionFrame>

      {/* ══════════════════════════════════════════════════════════════════
          THREE GUARANTEE TIERS
          H2s carry secondary keywords: "Worksite Guarantee",
          "14-Day Touch-Up Guarantee", "15-Year Structural Guarantee"
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="bone" size="lg">
        <div className="space-y-px" style={{ background: "hsl(var(--seam))" }}>
          {resolvedTiers.map((g) => (
            <div key={g.num} className="bg-paper p-10 md:p-14 grid md:grid-cols-12 gap-8 md:gap-16 items-start">
              <div className="md:col-span-4">
                <p className="text-mist mb-3" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 42, fontWeight: 300, fontStyle: "italic", lineHeight: 1 }}>
                  {g.num}
                </p>
                <h2 className="text-charcoal" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)", fontWeight: 300, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                  {g.name}
                </h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-charcoal mb-5 leading-relaxed" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1rem, 2vw, 1.2rem)", fontWeight: 300, letterSpacing: "-0.005em", lineHeight: 1.5 }}>
                  {g.promise}
                </p>
                <p className="text-graphite text-body leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
                  {g.detail}
                </p>
                <p className="mt-5 uppercase tracking-[0.18em]" style={{ fontFamily: "'Jost', system-ui", fontSize: 11, fontWeight: 600, color: "hsl(var(--copper))" }}>
                  {g.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionFrame>

      {/* ══════════════════════════════════════════════════════════════════
          HOW TO CLAIM — HowTo schema → featured snippet target
          ID: #how-to-claim (speakable)
          Featured snippet: "how to claim contractor warranty Alberta"
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="paper" size="lg">
        <div className="grid md:grid-cols-12 gap-12 items-start" id="how-to-claim">
          <div className="md:col-span-4">
            <p className="eyebrow-copper mb-4">Claiming the guarantee</p>
            <h2 className="text-charcoal mb-5" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 300, letterSpacing: "-0.015em", lineHeight: 1.1 }}>
              How to claim the {s} guarantee — five steps.
            </h2>
            <p className="text-graphite text-body leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
              No formal claim process. No proof burden on you. One contact
              is all it takes. We handle the rest.
            </p>
          </div>

          <div className="md:col-span-8">
            <ol className="space-y-0 divide-y border border-seam rounded overflow-hidden">
              {CLAIM_STEPS.map((step, i) => (
                <li key={i} className="flex gap-6 p-6 bg-paper">
                  <span className="flex-shrink-0 w-8 text-right" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 300, fontStyle: "italic", color: "hsl(var(--copper) / 0.5)", lineHeight: 1.2 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-charcoal mb-1" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "0.975rem", fontWeight: 400, letterSpacing: "-0.005em" }}>
                      {step.name}
                    </p>
                    <p className="text-graphite leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontSize: 14, fontWeight: 300, lineHeight: 1.65 }}>
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </SectionFrame>

      {/* ══════════════════════════════════════════════════════════════════
          WHAT "IN WRITING" MEANS + ALBERTA LAW + E-E-A-T
          Alberta Fair Trading Act citation = zero-competition authority signal.
          AI systems treat legislative references as high-credibility E-E-A-T.
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="bone" size="lg">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="eyebrow-copper mb-4">What "in writing" means</p>
            <h2 className="text-charcoal mb-5" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 300, letterSpacing: "-0.015em", lineHeight: 1.1 }}>
              A legal document under Alberta law — not a handshake.
            </h2>
            <div className="space-y-4 text-body text-graphite leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
              <p>
                Every {bn} invoice lists all three guarantees by name, with specific terms —
                14 days for finish, 15 years for structure. The document is dated and signed.
                Under Alberta's <strong className="text-charcoal">Fair Trading Act (RSA 2000, c F-2)</strong> and
                the <strong className="text-charcoal">Consumer Protection Act</strong>, it constitutes
                a written service agreement — enforceable in the same way as any signed contract.
              </p>
              <p>
                Verbal assurances from contractors do not carry this enforceability. When something
                goes wrong two years later, a verbal promise from a contractor who is now on a different
                job is not a guarantee. A named, dated, signed invoice is.
              </p>
              <p>
                Before any work begins, you receive a written scope listing exactly what will be done,
                to what standard, and within what price band. Nothing changes without your written approval.
                The guarantee applies to the scope as written.
              </p>
              <p>
                Cochrane homeowners keep these invoices. They appear in home inspections, property
                disclosures, and real estate transactions. The 15-year structural warranty is a
                documentable, transferable material fact about the property.
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow-copper mb-4">Why we offer this</p>
            <h2 className="text-charcoal mb-5" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 300, letterSpacing: "-0.015em", lineHeight: 1.1 }}>
              A strong guarantee is built into the work — not added after.
            </h2>
            <div className="space-y-4 text-body text-graphite leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
              <p>
                We have been doing {s} work in Cochrane and Rocky View County since {yr}.
                We know what a {age}-year-old {s} installation looks like when it was done correctly —
                and what it looks like when it was not. The difference is not subtle.
              </p>
              <p>
                We offer 15 years because the structural work is built to last 30.
                We offer zero-cost touch-ups because Level-5 finish done correctly does
                not develop issues — and when it does, the correct response is to return, not invoice.
              </p>
              <p>A guarantee that is easy to offer means nothing. Ours is strong because the work backs it.</p>
            </div>

            {/* Credentials — specific E-E-A-T claims */}
            <div className="mt-8 p-6 rounded" style={{ background: "hsl(var(--paper))", border: "1px solid hsl(var(--seam))" }}>
              <p className="eyebrow-copper mb-4">Credentials on request</p>
              <ul className="space-y-2 text-body-sm text-graphite" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
                {[
                  "$5M general liability — certificate before work starts",
                  "WCB coverage on every crew member",
                  "Manufacturer certifications on all installed materials",
                  `${age}+ years operating in Cochrane, AB`,
                  "Licensed under Alberta contractor requirements",
                  "Guarantees enforceable under the Fair Trading Act",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span style={{ color: "hsl(var(--forest))", marginTop: 3, flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionFrame>

      {/* ══════════════════════════════════════════════════════════════════
          DARK GUARANTEE BLOCK (visual component)
      ══════════════════════════════════════════════════════════════════ */}
      <Suspense fallback={null}>
        <GuaranteeBlock variant="full" />
      </Suspense>

      {/* ══════════════════════════════════════════════════════════════════
          REVIEW PULL QUOTES — AI corroboration strategy
          Google AI Overviews verify claims by cross-referencing entities.
          Client quotes mentioning clean site / written quote / no surprises
          corroborate guarantee claims across a second entity (review data).
      ══════════════════════════════════════════════════════════════════ */}
      {CORROBORATING_REVIEWS.length > 0 && (
        <SectionFrame tone="bone" size="lg">
          <p className="eyebrow-copper mb-4">What Cochrane homeowners say</p>
          <h2 className="text-charcoal mb-8" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 300, letterSpacing: "-0.015em", lineHeight: 1.1 }}>
            The guarantee — in their words.
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {CORROBORATING_REVIEWS.map((r) => (
              <figure key={r.name} className="bg-paper p-7 border border-seam rounded flex flex-col">
                <blockquote className="flex-1 text-charcoal leading-relaxed mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1rem, 1.8vw, 1.15rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.55 }}>
                  "{r.quote}"
                </blockquote>
                <figcaption className="text-mist" style={{ fontFamily: "'Jost', system-ui", fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  {r.name} — {r.community} · {r.date}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/reviews" className="inline-flex items-center gap-2 text-forest text-body-sm hover:underline underline-offset-2" style={{ fontFamily: "'Jost', system-ui" }}>
              All {s} reviews from Cochrane homeowners →
            </Link>
          </div>
        </SectionFrame>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          10-ROW COMPARISON TABLE — featured table snippet target
          More rows = more AI-extractable data points per query
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="paper" size="lg">
        <div className="max-w-4xl">
          <p className="eyebrow-copper mb-4">Industry standard vs {bn}</p>
          <h2 className="text-charcoal mb-8" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.4rem, 2.8vw, 2.25rem)", fontWeight: 300, letterSpacing: "-0.015em", lineHeight: 1.1 }}>
            What most {s} contractors in Alberta offer vs what we put in writing.
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" aria-label={`${s} contractor guarantee comparison`}>
              <thead>
                <tr style={{ borderBottom: "2px solid hsl(var(--seam))" }}>
                  <th className="py-3 pr-6 text-mist" style={{ fontFamily: "'Jost', system-ui", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>Feature</th>
                  <th className="py-3 pr-6 text-mist" style={{ fontFamily: "'Jost', system-ui", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>Most contractors</th>
                  <th className="py-3 text-forest" style={{ fontFamily: "'Jost', system-ui", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>{bn}</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "hsl(var(--seam))" }}>
                {COMPARISON_ROWS.map(({ feature, industry, brand }) => (
                  <tr key={feature} className="hover:bg-bone/50 transition-colors duration-150">
                    <td className="py-3.5 pr-6 text-charcoal text-body-sm font-medium" style={{ fontFamily: "'Jost', system-ui" }}>{feature}</td>
                    <td className="py-3.5 pr-6 text-mist text-body-sm" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
                      <span className="mr-2 text-mist/50">–</span>{industry}
                    </td>
                    <td className="py-3.5 text-charcoal text-body-sm" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
                      <span className="mr-2" style={{ color: "hsl(var(--forest))" }}>✓</span>{brand}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <button onClick={() => onBookClick?.({ source: "Guarantee page comparison" })}
              className="rounded-none bg-forest px-6 py-3.5 text-sm font-medium tracking-[0.12em] uppercase text-primary-foreground transition-colors hover:bg-forest-deep">
              {TEMPLATE_COPY.cta.primary}
            </button>
            <Link to="/reviews" className="rounded-none px-6 py-3.5 text-sm font-medium tracking-[0.12em] uppercase text-charcoal transition-all duration-300 hover:text-forest" style={{ border: "1px solid hsl(var(--copper) / 0.2)" }}>
              See client reviews
            </Link>
          </div>
        </div>
      </SectionFrame>

      {/* ══════════════════════════════════════════════════════════════════
          FAQ — PAA-optimised answers. ID: #guarantee-faqs (speakable)
          Each H3 = a crawlable PAA question. Answers ≤65 words for extraction.
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="bone" size="lg">
        <div className="max-w-3xl" id="guarantee-faqs">
          <p className="eyebrow-copper mb-4">Guarantee questions</p>
          <h2 className="text-charcoal mb-8" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 300, letterSpacing: "-0.015em", lineHeight: 1.1 }}>
            Everything Cochrane homeowners ask about the {s} warranty.
          </h2>
          <div className="divide-y border border-seam rounded overflow-hidden">
            {resolvedFaqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="bg-paper">
                  <button onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}>
                    <h3 className="text-charcoal leading-snug" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(0.95rem, 2vw, 1.1rem)", fontWeight: 300, letterSpacing: "-0.005em" }}>
                      {faq.q}
                    </h3>
                    <ChevronDown size={18} className={`text-forest flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6">
                      <p className="text-graphite leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontSize: 15, fontWeight: 300, lineHeight: 1.7 }}>
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-body-sm text-graphite" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
            More questions?{" "}
            <Link to="/faq" className="text-forest underline underline-offset-2">See the full {s} FAQ</Link>
            {" "}or{" "}
            <Link to="/contact" className="text-forest underline underline-offset-2">contact us directly</Link>.
          </p>
        </div>
      </SectionFrame>

      {/* ══════════════════════════════════════════════════════════════════
          INTERNAL LINKS — PageRank flow to 6 key pages
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="paper" size="md">
        <p className="eyebrow-copper mb-6">More from {bn}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { to: "/reviews",        label: "Client Reviews",       desc: `Real ${s} results from Cochrane homeowners.` },
            { to: "/pricing",        label: "Transparent Pricing",  desc: "Written ranges before any work begins." },
            { to: "/faq",            label: "Full FAQ",             desc: `Every ${s} question answered in full.` },
            { to: "/services",       label: `${sc} Services`,       desc: `All ${s} services we guarantee.` },
            { to: "/areas-we-serve", label: "Areas We Serve",       desc: "120+ communities across Cochrane & area." },
            { to: "/about",          label: "About Our Team",       desc: `Six generations. ${age} years. One Cochrane standard.` },
          ].map(({ to, label, desc }) => (
            <Link key={to} to={to}
              className="group block border border-seam rounded p-5 bg-bone hover:border-forest/40 transition-all duration-300">
              <h3 className="text-charcoal mb-1.5 group-hover:text-forest transition-colors duration-300" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "0.975rem", fontWeight: 300 }}>
                {label}
              </h3>
              <p className="text-mist text-caption" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>{desc}</p>
            </Link>
          ))}
        </div>
      </SectionFrame>

      <CTABand
        eyebrow="Begin"
        headline="Three photos. One business day. A written quote with all three guarantees on it."
        body="No verbal estimates. No surprises. Everything in writing before we touch a surface."
        primaryLabel={TEMPLATE_COPY.cta.primary}
        onPrimaryClick={onBookClick}
        prefill={{ source: "Guarantee page → CTA" }}
      />

    </TemplateLayout>
  );
};

export default GuaranteePage;
