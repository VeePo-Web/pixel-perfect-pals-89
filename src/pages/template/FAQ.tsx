/**
 * /faq — [Trade] FAQ — Cochrane & Area
 *
 * ── Victorious SEO upgrades applied ─────────────────────────────────────────
 * Answer length: All answers trimmed to 40–65 words (PAA extraction threshold).
 *   First sentence = direct answer. No preamble. Schema pulls verbatim.
 * Question clusters: 8 intent groups covering every PAA box category:
 *   Cost · Process · Quality · Credentials · Seasonal · Permits ·
 *   Comparison · Post-project
 * Schema (3 types): FAQPage (all Q&As) + LocalBusiness (sameAs network) +
 *   BreadcrumbList + HowTo (quote process)
 * Definition callout: AI extraction format for key trade terms
 * sameAs: parent brand entity for 150-site network authority compounding
 * Internal links: /guarantee, /pricing, /reviews, /areas-we-serve, /about
 *
 * REMIX: Trade FAQs from MASTER_REMIX.FAQS. All placeholders resolved at render.
 *   {SERVICE} {BRAND} {YEAR} {AGE} {SC} substituted from MASTER_REMIX.
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import CTABand from "@/components/drywall/CTABand";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import type { BookingClickHandler } from "@/config/drywall-booking";

interface Props { onBookClick?: BookingClickHandler }

// ─────────────────────────────────────────────────────────────────────────────
// QUESTION BANK — 8 intent clusters
//
// VICTORIOUS SEO RULE: Every question is written as the exact search query a
// Cochrane homeowner types. First sentence of every answer = the direct answer
// (40–65 words). Google's PAA algorithm pulls the first complete answer unit.
// No preamble. No "Great question." Answer immediately.
//
// Placeholder tokens resolved at render: {SERVICE} {BRAND} {YEAR} {AGE} {SC}
// ─────────────────────────────────────────────────────────────────────────────

const COST_FAQS = [
  {
    q: "How much does {SERVICE} cost in Cochrane?",
    a: "Most residential {SERVICE} projects in Cochrane range from $150 for small repairs to $8,000+ for whole-home or basement work. Single rooms typically run $900–$3,500. Written price ranges specific to your project are provided within one business day of sending photos — no call required.",
  },
  {
    q: "Do {SERVICE} contractors in Cochrane charge by the hour or by the project?",
    a: "{BRAND} quotes by project scope, not by the hour. Hourly billing incentivises slow work. A fixed written quote means the cost is known before any work begins and does not change unless the scope changes — which requires your written approval.",
  },
  {
    q: "Is there a minimum job size for {SERVICE} in Cochrane?",
    a: "No. {BRAND} handles single-patch repairs, crack fills, and small tile replacements — there is no minimum project size. The smallest job receives the same finish standard and written guarantee as the largest.",
  },
  {
    q: "Do you require a deposit for {SERVICE} work?",
    a: "No deposit is required for standard residential {SERVICE} projects. Payment is due on completion. Large multi-phase projects may have milestone payments — disclosed in the written scope before work begins, never added after.",
  },
  {
    q: "Does the {SERVICE} estimate change after work starts?",
    a: "No. The written quote is the price. If something unexpected is discovered during the work — a structural issue, a hidden substrate problem — we stop, document it, and get your written approval before proceeding. The original quote does not increase without that approval.",
  },
];

const PROCESS_FAQS = [
  {
    q: "How do I get a {SERVICE} quote in Cochrane?",
    a: "Send 2–3 photos through the booking form: the surface, the lighting, and the room. You receive a written price range within one business day. No sales call, no site visit required to get a number. The entire process starts with photos.",
  },
  {
    q: "How long does {SERVICE} work take in Cochrane?",
    a: "Small repairs take a single visit. Full-room projects take 2–5 days. Whole-home or basement work is quoted with a specific timeline — we do not give optimistic windows. If the scope is 8 days, the quote says 8 days.",
  },
  {
    q: "Do I need to be home during the {SERVICE} work?",
    a: "Not required. Many Cochrane homeowners provide access and leave for the day. We send a confirmation before arrival and a sign-off message on completion. If you prefer to be present, we work around your schedule.",
  },
  {
    q: "How far ahead should I book {SERVICE} in Cochrane?",
    a: "Currently booking 2–4 weeks out for standard residential projects. Seasonal demand shifts this window. Send your project scope and we confirm the current booking window with your written quote — no obligation to proceed.",
  },
  {
    q: "What do I need to prepare before the {SERVICE} crew arrives?",
    a: "Clear the work area of furniture and personal items. That is all. Floor protection, dust containment, and worksite setup are handled by the crew. Specific prep requirements, if any, are listed in your written scope.",
  },
  {
    q: "How do I get a written quote — what information do you need?",
    a: "2–3 photos and one sentence describing the project. That is the complete requirement. Surface type, room dimensions, and scope are assessed from the photos. You do not need to know the technical specifications — that is our job.",
  },
];

const QUALITY_FAQS = [
  {
    q: "What is Level 5 finish and why does it matter for {SERVICE}?",
    a: "Level 5 is the highest drywall grade under ASTM C840. It requires a full skim coat over the entire surface — not just at joints — eliminating texture variation visible under raking or oblique light. {BRAND} applies Level 5 on every project. Most contractors offer Level 4 and charge extra for 5.",
  },
  {
    q: "What is the TCNA standard for tile installation?",
    a: "TCNA is the Tile Council of North America handbook — the industry authority for installation methods, substrate requirements, grout joint widths, and mortar coverage. {BRAND} follows TCNA standards on every tile project. It is not a premium option — it is the baseline.",
  },
  {
    q: "What is the difference between {SERVICE} contractors in Cochrane?",
    a: "Primarily finish standard, worksite discipline, and what they put in writing. Level 3 work with a verbal assurance is a different product from Level 5 work with a written 15-year structural warranty. The first is cheaper today. The second is cheaper over time.",
  },
  {
    q: "How do I know if my {SERVICE} was done correctly?",
    a: "Three indicators: no visible texture variation under raking light, no hollow spots when tapped (for tile or drywall), and no seam lines visible after paint. We walk through these with you at sign-off. If you notice anything within 14 days, we return at zero cost.",
  },
  {
    q: "What materials does {BRAND} use for {SERVICE} in Cochrane?",
    a: "{BRAND} uses manufacturer-certified materials with documented performance ratings appropriate for each substrate and environment. Material specifications are listed in the written scope before work begins — you know exactly what goes into your home before we order it.",
  },
];

const CREDENTIALS_FAQS = [
  {
    q: "Is {BRAND} licensed and insured for {SERVICE} in Cochrane, Alberta?",
    a: "{BRAND} carries $5M general liability insurance and WCB coverage on all crew members. Manufacturer certifications are current on all installed materials. Insurance certificates and credentials are available before any work begins — just ask.",
  },
  {
    q: "Does {BRAND} have workers' compensation coverage in Alberta?",
    a: "Yes. Every {BRAND} crew member is covered under WCB Alberta. This is not optional coverage — it protects you as the homeowner from liability if a worker is injured on your property. We provide the WCB certificate on request.",
  },
  {
    q: "How long has {BRAND} been doing {SERVICE} work in Cochrane?",
    a: "{BRAND} has been operating in Cochrane and Rocky View County since {YEAR} — {AGE}+ years. In that time we have completed projects across Heritage Hills, Sunset Ridge, Riversong, GlenEagles, Heartland, Fireside, and newer Cochrane developments.",
  },
  {
    q: "What areas does {BRAND} serve beyond Cochrane?",
    a: "{BRAND} serves 120+ communities across Cochrane, Rocky View County, Springbank, Elbow Valley, Calgary SW/NW/SE, the Bow Valley, and Canmore. We are based in Cochrane — most service areas are a straightforward drive with no travel delay fees.",
  },
];

const SEASONAL_FAQS = [
  {
    q: "Can {SERVICE} work be done in winter in Cochrane, Alberta?",
    a: "Yes. Interior {SERVICE} work is weather-independent. We work year-round in Cochrane. Winter scheduling is often faster — fewer projects compete for crew time — and interior conditions are controlled regardless of outside temperature.",
  },
  {
    q: "What time of year is best for {SERVICE} work in Cochrane?",
    a: "Interior {SERVICE} work can be completed any time of year. Spring and summer book fastest — schedule 4–6 weeks ahead if possible. Winter and early spring typically have shorter lead times. There is no quality difference by season for interior work.",
  },
  {
    q: "How far in advance should I book {SERVICE} work in Cochrane?",
    a: "2–4 weeks for most residential projects. Larger projects — basement developments, whole-home installations — benefit from 4–6 weeks advance booking, especially April through September. Send your scope and we confirm the current window immediately.",
  },
];

const PERMIT_FAQS = [
  {
    q: "Do I need a building permit for {SERVICE} work in Cochrane?",
    a: "Most residential interior {SERVICE} finishing work in Cochrane does not require a permit. Work involving structural modifications or changes to a permitted build may require one. {BRAND} identifies permit requirements during scoping — disclosed in the written quote before signing.",
  },
  {
    q: "Who pulls the building permit — the homeowner or the contractor?",
    a: "When a permit is required, {BRAND} pulls it on your behalf. Permit costs are included in the written quote. We handle all associated inspections. You do not need to navigate the permit process — that is part of the service.",
  },
  {
    q: "What inspections are required for {SERVICE} work in Cochrane?",
    a: "Inspection requirements depend on scope and location. Projects requiring a permit will have associated inspections — these are scheduled and managed by {BRAND}. Projects not requiring permits have no mandatory inspections. All work is held to ASTM/TCNA standard regardless.",
  },
  {
    q: "Does {SERVICE} work in Rocky View County require a permit?",
    a: "Rocky View County has its own permit jurisdiction — requirements can differ from the Town of Cochrane. {BRAND} operates throughout Rocky View County and identifies the applicable permit requirements for each project during scoping, included in the written quote.",
  },
];

const COMPARISON_FAQS = [
  {
    q: "Should I DIY {SERVICE} or hire a contractor in Cochrane?",
    a: "DIY {SERVICE} is possible for small, non-structural repairs where finish quality is not critical. For anything visible after paint, structural, or warranted work, the quality gap between DIY and professional Level-5 work is significant — and DIY carries no guarantee.",
  },
  {
    q: "How do I compare {SERVICE} quotes from different Cochrane contractors?",
    a: "Compare three things: whether the quote is written (verbal quotes are unenforceable), what finish level is specified (Level 3 vs Level 5 is a visible, lasting difference), and what guarantee is in writing. A lower quote with no written terms is rarely cheaper over time.",
  },
  {
    q: "What questions should I ask a {SERVICE} contractor before hiring?",
    a: "Is the quote in writing? What finish level? Is the structural work warranted, and for how long — in writing? Are you WCB-covered? Do you handle permits? If any of these questions get vague answers, the answers tell you what you need to know.",
  },
  {
    q: "Why is {BRAND} more expensive than other {SERVICE} contractors in Cochrane?",
    a: "The written 15-year structural guarantee, Level-5 finish standard, same-crew consistency, $5M insurance coverage, and WCB on every crew member are not free to provide. The question is not the upfront cost — it is whether you pay once for work done right, or twice for work redone.",
  },
];

const POSTPROJECT_FAQS = [
  {
    q: "What should I look for in a final {SERVICE} walkthrough?",
    a: "Check surfaces under raking or oblique light for texture variation or visible joints. Tap tiled surfaces — a hollow sound indicates adhesion failure. Inspect corners and edges for clean, tight lines. {BRAND} walks through all of these with you at sign-off.",
  },
  {
    q: "When can I paint after {SERVICE} work in Cochrane?",
    a: "Drywall and plaster: primer after 24 hours, paint after 48–72 hours once completely dry. The specific cure window depends on ambient humidity and temperature — noted in your sign-off documentation. Painting too early traps moisture and affects adhesion.",
  },
  {
    q: "How do I know if {SERVICE} work has failed after the project is complete?",
    a: "Signs of failure: visible cracking at joints (not hairline surface cracks), hollow sound when tapping tiled surfaces, lifting or separating edges, or visible movement at structural connections. If you notice any of these within 15 years, contact us — it falls under the structural guarantee.",
  },
  {
    q: "What maintenance does {SERVICE} work require after completion?",
    a: "Interior {SERVICE} finishing requires no routine maintenance. The 15-year structural guarantee covers failures from workmanship — not from homeowner modification of the work. Normal household use, painting over drywall, and cleaning tiled surfaces do not affect the guarantee.",
  },
];

// ─── HowTo steps — "How to get a quote" — HowTo schema ───────────────────────
// Featured snippet target: "how to get a [trade] quote Cochrane"
const QUOTE_STEPS = [
  { name: "Take 2–3 photos", text: "The surface you want worked on, the room lighting, and the context around it. Phone camera quality is fine. These are all we need to provide an accurate written range." },
  { name: "Submit through the booking form", text: "Paste or upload the photos. Add one sentence describing the project — 'patch two holes in the hallway' or 'tile the master bathroom shower'. That is the full ask." },
  { name: "Receive a written range within 24 hours", text: "We review every submission and reply with a written price range specific to your scope, tied to our 3-tier guarantee. No call required unless you prefer it." },
  { name: "Review and approve", text: "The written quote lists exactly what will be done, to what standard, and at what cost. Nothing begins until you sign it. No pressure — the quote is yours to keep." },
  { name: "We begin on the agreed window", text: "Same crew, start to finish. Worksite clean on arrival and cleaner on departure — or the work is free." },
];

// ─── Key definitions — AI extraction: [Term]: [definition] ───────────────────
const DEFINITIONS = [
  { term: "Level 5 finish", definition: "The highest drywall grade (ASTM C840) — a full skim coat applied over the entire board surface, not only at joints. Eliminates texture variation under raking or oblique light. Required by {BRAND} on every project." },
  { term: "Written scope", definition: "A pre-work document listing exactly what will be done, to what standard, and within what price band. Signed before any work begins. No changes made without written homeowner approval." },
  { term: "15-year structural warranty", definition: "A written guarantee covering structural {SERVICE} work for 15 years from project completion. Named on the signed invoice and enforceable under Alberta's Fair Trading Act." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
const FAQPage = ({ onBookClick }: Props) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const s   = MASTER_REMIX.SERVICE;
  const sc  = MASTER_REMIX.SERVICE_CATEGORY;
  const bn  = MASTER_REMIX.BRAND_NAME;
  const yr  = MASTER_REMIX.FOUNDATION_YEAR;
  const age = new Date().getFullYear() - yr;

  const resolve = (text: string) =>
    text
      .replace(/\{SERVICE\}/g, s)
      .replace(/\{SC\}/g, sc)
      .replace(/\{BRAND\}/g, bn)
      .replace(/\{YEAR\}/g, String(yr))
      .replace(/\{AGE\}/g, String(age));

  // Intent clusters — each targets a distinct PAA/search intent cluster
  const categories = [
    { id: "cost",        label: "Cost & pricing",           h2: `How much does ${s} cost in Cochrane?`,            faqs: COST_FAQS },
    { id: "process",     label: "Process & timeline",       h2: `How does the ${s} process work?`,                 faqs: PROCESS_FAQS },
    { id: "quality",     label: "Finish quality",           h2: `What finish standard does ${bn} deliver?`,        faqs: QUALITY_FAQS },
    { id: "credentials", label: "Credentials & coverage",   h2: `Is ${bn} licensed and insured in Alberta?`,       faqs: CREDENTIALS_FAQS },
    { id: "seasonal",    label: "Seasonal & timing",        h2: `When is the best time for ${s} work in Cochrane?`, faqs: SEASONAL_FAQS },
    { id: "permits",     label: "Permits & regulations",    h2: `Do you need a permit for ${s} in Cochrane?`,      faqs: PERMIT_FAQS },
    { id: "comparison",  label: "Comparing contractors",    h2: `How do you compare ${s} contractors in Cochrane?`, faqs: COMPARISON_FAQS },
    { id: "postproject", label: "After the project",        h2: `What happens after the ${s} project is complete?`, faqs: POSTPROJECT_FAQS },
  ];

  // Merge trade FAQs from MASTER_REMIX — deduplicate against universal questions
  const universalQs = categories.flatMap((c) => c.faqs).map((f) => resolve(f.q).toLowerCase());
  const tradeFaqs = MASTER_REMIX.FAQS.filter(
    (f) => !universalQs.includes(f.question.toLowerCase())
  );

  // All FAQs for schema — PAA-optimised short answers
  const allForSchema = [
    ...tradeFaqs.map((f) => ({ q: f.question, a: f.answer })),
    ...categories.flatMap((c) => c.faqs.map((f) => ({ q: resolve(f.q), a: resolve(f.a) }))),
  ];

  // Schema injection
  useEffect(() => {
    const baseUrl   = MASTER_REMIX.BRAND_URL;
    const parentUrl = MASTER_REMIX.PARENT_BRAND_URL;

    const schemas = [
      // FAQPage — all 35+ questions, PAA-optimised answers
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: allForSchema.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },

      // HowTo — "How to get a quote"
      // Featured snippet: "how to get a [trade] quote Cochrane"
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `How to get a written ${s} quote in Cochrane`,
        description: `Step-by-step process for getting a written ${s} quote from ${bn} in Cochrane, Alberta.`,
        totalTime: "PT24H",
        step: QUOTE_STEPS.map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: step.name,
          text: step.text,
        })),
      },

      // LocalBusiness — sameAs network entity for 150-site compounding
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#organization`,
        name: bn,
        url: baseUrl,
        telephone: MASTER_REMIX.PHONE,
        foundingDate: String(yr),
        sameAs: [parentUrl, MASTER_REMIX.GOOGLE_REVIEW_URL].filter(Boolean),
        description: `${bn} is a licensed and insured ${sc} contractor in Cochrane, AB, serving 120+ communities since ${yr}. Written quotes within 24 hours. 3-tier written guarantee on every project.`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cochrane",
          addressRegion: "AB",
          addressCountry: "CA",
        },
        areaServed: [
          { "@type": "City", name: "Cochrane" },
          { "@type": "City", name: "Calgary" },
          { "@type": "City", name: "Canmore" },
          { "@type": "AdministrativeArea", name: "Rocky View County" },
        ],
      },

      // BreadcrumbList
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "FAQ",  item: `${baseUrl}/faq` },
        ],
      },
    ];

    const cleanup = () =>
      document.querySelectorAll("[data-faq-schema]").forEach((n) => n.remove());
    cleanup();
    schemas.forEach((schema) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.setAttribute("data-faq-schema", "true");
      el.textContent = JSON.stringify(schema);
      document.head.appendChild(el);
    });
    return cleanup;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bn]);

  return (
    <TemplateLayout onBookClick={onBookClick}>

      {/* ══════════════════════════════════════════════════════════════════
          HERO — H1 keyword: "[Trade] FAQ — Cochrane & Area"
          Primary keyword in H1 + first 100 words of body.
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden bg-bone border-b"
        style={{ borderColor: "hsl(var(--copper) / 0.1)", paddingTop: "clamp(5rem, 12vw, 9rem)", paddingBottom: "clamp(3rem, 8vw, 5rem)" }}
      >
        <div className="container mx-auto px-6">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2" style={{ fontFamily: "'Jost', system-ui", fontSize: 11, color: "hsl(var(--mist))", letterSpacing: "0.1em" }}>
              <li><Link to="/" className="hover:text-graphite transition-colors">Home</Link></li>
              <li aria-hidden>/</li>
              <li>FAQ</li>
            </ol>
          </nav>

          <h1 className="text-charcoal max-w-[24ch]" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(2.25rem, 5vw, 3.75rem)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
            {sc} FAQ — Cochrane &amp; Area
          </h1>

          {/* Primary keyword + brand in first 100 words */}
          <p className="mt-5 max-w-[58ch] text-graphite leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontSize: 16, fontWeight: 300 }}>
            Every question Cochrane homeowners ask about {s} work — cost, process,
            quality standards, permits, and what {bn} puts in writing on every project.
            {categories.length * 4}+ questions across {categories.length} topic areas.
            One answer gets you a written quote.
          </p>

          {/* Jump links — UX + crawl signal for intent clustering */}
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <a key={cat.id} href={`#${cat.id}`}
                className="inline-flex items-center rounded-full px-4 py-1.5 transition-all duration-200 hover:border-forest/40 hover:text-forest"
                style={{ border: "1px solid hsl(var(--seam))", fontFamily: "'Jost', system-ui", fontSize: 12, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "hsl(var(--graphite))" }}>
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          DEFINITION BLOCKS — AI extraction format
          Google AI Overviews pull these as definition cards verbatim.
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="paper" size="md">
        <p className="eyebrow-copper mb-5">Key terms defined</p>
        <div className="grid md:grid-cols-3 gap-px bg-seam">
          {DEFINITIONS.map((def) => (
            <div key={def.term} className="bg-paper p-6">
              <p className="text-charcoal mb-2 font-medium" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "0.95rem", letterSpacing: "-0.005em" }}>
                {resolve(def.term)}
              </p>
              <p className="text-graphite leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontSize: 14, fontWeight: 300, lineHeight: 1.65 }}>
                {resolve(def.definition)}
              </p>
            </div>
          ))}
        </div>
      </SectionFrame>

      {/* ══════════════════════════════════════════════════════════════════
          HOW TO GET A QUOTE — HowTo schema + featured snippet
          Featured snippet: "how to get a [trade] quote Cochrane"
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="bone" size="lg">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4">
            <p className="eyebrow-copper mb-4">Getting started</p>
            <h2 className="text-charcoal mb-4" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 300, letterSpacing: "-0.015em", lineHeight: 1.1 }}>
              How to get a written {s} quote in Cochrane.
            </h2>
            <p className="text-graphite text-body" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300, lineHeight: 1.65 }}>
              Five steps. The first takes 2 minutes. You get a written
              number within one business day — no call required.
            </p>
          </div>
          <div className="md:col-span-8">
            <ol className="divide-y border border-seam rounded overflow-hidden">
              {QUOTE_STEPS.map((step, i) => (
                <li key={i} className="flex gap-6 p-6 bg-paper">
                  <span className="flex-shrink-0 w-8 text-right" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 300, fontStyle: "italic", color: "hsl(var(--copper) / 0.5)", lineHeight: 1.2 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-charcoal mb-1" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "0.95rem", fontWeight: 400, letterSpacing: "-0.005em" }}>
                      {step.name}
                    </p>
                    <p className="text-graphite" style={{ fontFamily: "'Jost', system-ui", fontSize: 14, fontWeight: 300, lineHeight: 1.65 }}>
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
          TRADE-SPECIFIC FAQs — from MASTER_REMIX.FAQS
      ══════════════════════════════════════════════════════════════════ */}
      {tradeFaqs.length > 0 && (
        <SectionFrame tone="paper" size="lg">
          <div className="max-w-3xl" id="trade">
            <p className="eyebrow-copper mb-3">About the work</p>
            <h2 className="text-charcoal mb-8" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", fontWeight: 300, letterSpacing: "-0.01em" }}>
              {sc}-specific questions
            </h2>
            <div className="divide-y border border-seam rounded overflow-hidden">
              {tradeFaqs.map((faq, i) => (
                <FAQItem key={`trade-${i}`} id={`trade-${i}`} question={faq.question} answer={faq.answer} openId={openId} setOpenId={setOpenId} />
              ))}
            </div>
          </div>
        </SectionFrame>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          8 INTENT-GROUPED CLUSTERS
          Each H2 carries the intent keyword. Alternating bone/paper tone.
          Jump link IDs match hero navigation anchors.
      ══════════════════════════════════════════════════════════════════ */}
      {categories.map((cat, catIdx) => (
        <SectionFrame key={cat.id} tone={catIdx % 2 === 0 ? "paper" : "bone"} size="lg">
          <div className="max-w-3xl" id={cat.id}>
            <p className="eyebrow-copper mb-3">{cat.label}</p>
            <h2 className="text-charcoal mb-8" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", fontWeight: 300, letterSpacing: "-0.01em", lineHeight: 1.15 }}>
              {cat.h2}
            </h2>
            <div className="divide-y border border-seam rounded overflow-hidden">
              {cat.faqs.map((faq, i) => (
                <FAQItem
                  key={`${cat.id}-${i}`}
                  id={`${cat.id}-${i}`}
                  question={resolve(faq.q)}
                  answer={resolve(faq.a)}
                  openId={openId}
                  setOpenId={setOpenId}
                />
              ))}
            </div>
          </div>
        </SectionFrame>
      ))}

      {/* ══════════════════════════════════════════════════════════════════
          STILL HAVE A QUESTION + INTERNAL LINKS (6 pages)
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="paper" size="lg">
        <div className="max-w-3xl">
          <div className="p-8 border-l-2 mb-12" style={{ borderColor: "hsl(var(--copper) / 0.35)", background: "hsl(var(--bone))" }}>
            <p className="text-charcoal mb-3" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.1rem, 2vw, 1.35rem)", fontWeight: 300, letterSpacing: "-0.01em" }}>
              Still have a question about {s} work in Cochrane?
            </p>
            <p className="text-graphite text-body mb-5" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
              Send it through the booking form or{" "}
              <Link to="/contact" className="text-forest underline underline-offset-2">contact us directly</Link>.
              Every question gets a reply within one business day.
            </p>
            <button onClick={() => onBookClick?.({ source: "FAQ page — still have a question" })}
              className="rounded-none bg-forest px-6 py-3 text-sm font-medium tracking-[0.12em] uppercase text-primary-foreground transition-colors hover:bg-forest-deep">
              {TEMPLATE_COPY.cta.primary}
            </button>
          </div>

          <p className="eyebrow-copper mb-6">Dig deeper</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { to: "/guarantee",      label: "Written Guarantee",   desc: "The 3-tier warranty in full detail." },
              { to: "/pricing",        label: "Transparent Pricing", desc: "Written ranges before work starts." },
              { to: "/reviews",        label: "Client Reviews",      desc: "Real Cochrane homeowners." },
              { to: "/services",       label: `${sc} Services`,      desc: `Every ${s} service we offer.` },
              { to: "/areas-we-serve", label: "Areas We Serve",      desc: "120+ communities across Cochrane & area." },
              { to: "/about",          label: "About Our Crew",      desc: `${age}+ years. Same standard. Every project.` },
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
        </div>
      </SectionFrame>

      <CTABand
        eyebrow="Begin"
        headline={`Get a written ${s} quote in Cochrane within 24 hours.`}
        body="No call required. Send three photos. Receive a written range specific to your project, with all three guarantees included."
        primaryLabel={TEMPLATE_COPY.cta.primary}
        onPrimaryClick={onBookClick}
        prefill={{ source: "FAQ → CTA" }}
      />

    </TemplateLayout>
  );
};

// ─── Accordion item — H3 is the crawlable PAA question ───────────────────────
const FAQItem = ({
  id, question, answer, openId, setOpenId,
}: {
  id: string; question: string; answer: string;
  openId: string | null; setOpenId: (id: string | null) => void;
}) => {
  const isOpen = openId === id;
  return (
    <div className="bg-paper">
      <button onClick={() => setOpenId(isOpen ? null : id)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}>
        {/* H3 — crawlable, indexable, PAA-eligible */}
        <h3 className="text-charcoal leading-snug"
          style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(0.925rem, 1.8vw, 1.05rem)", fontWeight: 300, letterSpacing: "-0.003em" }}>
          {question}
        </h3>
        <ChevronDown size={17} className={`text-forest flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-6 pt-1">
          <p className="text-graphite leading-relaxed"
            style={{ fontFamily: "'Jost', system-ui", fontSize: 15, fontWeight: 300, lineHeight: 1.72 }}>
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default FAQPage;
