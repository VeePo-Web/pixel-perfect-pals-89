/**
 * COCHRANE DRYWALL & INSULATION — Business Description (canonical)
 *
 * SOURCE OF TRUTH — distilled from `1.2_Cochrane_Drywall_Insulation_--_bus_desc.docx`.
 * Strategic narrative, differentiators, services with planning ranges,
 * vision, mission, service area. This file governs every service price,
 * package description, and positional claim on the site.
 */

export const BUSINESS = {
  // ── The Strategic Narrative (3 paragraphs, near-verbatim) ──────────────
  narrative: {
    paragraph1:
      "Cochrane Drywall & Insulation is a residential interior finishing company built to serve homeowners who want reliable, well-scoped work without the confusion, delays, or inflated complexity that often come with larger renovation firms or broad handyman services. The business is intentionally focused on four practical service categories that naturally work together: drywall patching, drywall sheet installation, interior painting, and insulation for basements, garages, and small residential improvement projects. That focus is the strength of the brand.",
    paragraph2:
      "At its core, the business solves a very specific homeowner problem: many interior projects are too important to leave unfinished, but too small or too straightforward for a large general contractor to prioritize. Cochrane Drywall & Insulation fills that gap with a practical, service-driven model — handling everything from damaged walls and repair cuts to garage boarding, basement wall installation, repaint work, and insulation packages.",
    paragraph3:
      "The professional identity is clear, local, and disciplined: a company that helps homeowners move interior spaces from damaged, exposed, or unfinished to clean, prepared, and functional. Not a full-scale renovation company. Not a catch-all handyman brand. A focused residential finishing business with clarity of scope and straightforward quoting.",
  },

  // ── Core Differentiators (5 USPs from the document) ────────────────────
  differentiators: [
    {
      label: "Focused residential finishing model",
      description:
        "Built around drywall, painting, and insulation — not trying to compete as a general renovation company or broad handyman service.",
    },
    {
      label: "A clear service ladder",
      description:
        "Begins with fast-cash repair and repaint jobs, scales into larger basement and garage packages.",
    },
    {
      label: "Practical, high-demand services",
      description:
        "Solves common homeowner needs: patching damaged walls, boarding unfinished spaces, repainting refreshed interiors, and insulating basements or garages before drywall.",
    },
    {
      label: "Built-in upsell logic",
      description:
        "Patching leads to painting, drywall installation leads to insulation packages, small jobs create pathways into larger projects.",
    },
    {
      label: "Owner-operator structure",
      description:
        "Designed for control, responsiveness, and manageable execution in the early growth stage of the company.",
    },
  ],

  // ── Services (4 core + packages) with planning ranges ──────────────────
  services: {
    drywallPatching: {
      slug: "drywall-repair",
      label: "Drywall Patching",
      shortLabel: "Drywall Repair",
      summary:
        "Professional wall and ceiling repairs for the damage homeowners deal with most often — door knob holes, medium wall damage, cut-open drywall from plumbing or electrical repairs, crack repair, and similar repair areas.",
      positioning:
        "Clean patches, smooth finishing, paint-ready results, quick-turn residential repair work. The most accessible entry-point service.",
      planningRanges: [
        { scope: "Small patch", range: "$150–$250" },
        { scope: "Medium patch", range: "$250–$450" },
        { scope: "Larger repair or multi-visit patch", range: "$450–$900+" },
      ],
    },
    drywallInstallation: {
      slug: "drywall-installation",
      label: "Drywall Sheet Installation",
      shortLabel: "Drywall Installation",
      summary:
        "Installation services for basement walls, garage boarding, ceilings, utility rooms, repair sections too large for patching, and smaller room or partition projects.",
      positioning:
        "Turns exposed framing or incomplete areas into spaces that feel visibly closer to completion. A core revenue service that supports more substantial project values.",
      planningRanges: [
        {
          scope: "Smaller install jobs or repair sections",
          range: "$900–$1,500 minimum",
        },
        {
          scope: "Larger wall and ceiling work",
          range: "Quoted by square foot or package",
        },
      ],
    },
    interiorPainting: {
      slug: "painting",
      label: "Interior Painting",
      shortLabel: "Painting",
      summary:
        "Interior repainting that pairs naturally with drywall work — single-room repaints, ceilings, touch-ups after patching, trim and wall refreshes, basement repaints, move-out or turnover refresh jobs.",
      positioning:
        "Adds professional finish value to repair and installation work while standing on its own as a practical service for homeowners wanting a cleaner, updated space.",
      planningRanges: [
        { scope: "Small room repaint", range: "$400–$900" },
        { scope: "Medium room repaint", range: "$700–$1,400" },
        { scope: "Wall and ceiling combinations", range: "$900–$1,800+" },
      ],
    },
    insulation: {
      slug: "insulation",
      label: "Insulation Services",
      shortLabel: "Insulation",
      summary:
        "Insulation work for basements, garages, and related residential interior projects — batt insulation for basement perimeter walls, garage insulation, basement ceiling sound insulation, poly or vapour barrier as part of broader packages.",
      positioning:
        "Most strategically used as a value-adding component tied to unfinished space development, rather than the company's primary standalone identity.",
      planningRanges: [
        {
          scope: "Quoted by area, access, and scope",
          range: "Best as part of basement or garage packages",
        },
      ],
    },
  },

  // ── Packages (commercial bundles) ──────────────────────────────────────
  packages: {
    garage: {
      slug: "garage-packages",
      label: "Garage Drywall & Insulation Packages",
      summary:
        "Insulation, drywall sheet installation, patching, and painting bundled for garages — fewer gaps between trades, clearer project flow, a more efficient path from unfinished to usable space.",
    },
    basement: {
      slug: "basement-packages",
      label: "Basement Starter Packages",
      summary:
        "Walls-only, ceiling-only, or full basement starter scopes for homeowners who want to start improving the basement without committing to a full renovation.",
    },
  },

  // ── Service Area ───────────────────────────────────────────────────────
  serviceArea: {
    primary: "Cochrane, Alberta",
    description:
      "Local residential service business focused on Cochrane, Alberta — homeowners needing interior finishing for walls, ceilings, basements, garages, utility rooms, and small residential project areas.",
  },

  // ── Vision & Mission ───────────────────────────────────────────────────
  vision:
    "To become the trusted local name in Cochrane for practical residential interior finishing work — helping homeowners transform damaged, unfinished, or underused spaces into clean, completed, and functional parts of the home through focused drywall, painting, and insulation services.",
  mission:
    "Cochrane Drywall & Insulation exists to provide homeowners in Cochrane with clear, dependable drywall patching, drywall sheet installation, interior painting, and insulation services for basements, garages, and small residential projects — delivering straightforward workmanship that improves the condition, usability, and finish of interior spaces without unnecessary complexity.",

  // ── Contact (placeholders — pending real values) ───────────────────────
  contact: {
    phone: null as string | null,
    email: null as string | null,
    instagram: null as string | null,
    facebook: null as string | null,
    website: null as string | null,
  },
} as const;

export type ServiceKey = keyof typeof BUSINESS.services;
export type Service = typeof BUSINESS.services[ServiceKey];
