/**
 * seoGraph.ts — JSON-LD graph builders (Victorious-SEO pattern).
 *
 * Every node carries a stable `@id` derived from its URL, so the
 * sitewide Organization + WebSite declared in `index.html` link
 * cleanly with the per-page WebPage / BlogPosting / Service nodes
 * emitted at runtime. This is the "entity graph" pattern: search
 * engines see one coherent business, not a pile of detached blocks.
 *
 * Pure builders — no React, no DOM. Pages serialize the output into
 * a `<script type="application/ld+json">` tag (via Helmet or a
 * direct head append).
 */

import { MASTER_REMIX } from "@/config/template/remix-variables";

const origin = (): string => (MASTER_REMIX.BRAND_URL || "").replace(/\/$/, "");
const abs = (path: string): string => `${origin()}${path.startsWith("/") ? path : `/${path}`}`;

export const ORG_ID = "/#organization";
export const SITE_ID = "/#website";

export interface BreadcrumbTrail {
  name: string;
  /** Absolute path (e.g. "/areas-we-serve/region-one"). */
  path: string;
}

export const breadcrumbNode = (trail: BreadcrumbTrail[]) => ({
  "@type": "BreadcrumbList",
  "@id": `${abs(trail[trail.length - 1]?.path ?? "/")}#breadcrumb`,
  itemListElement: trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: abs(t.path),
  })),
});

export const webPageNode = (args: {
  path: string;
  name: string;
  description: string;
  breadcrumb?: BreadcrumbTrail[];
}) => ({
  "@type": "WebPage",
  "@id": `${abs(args.path)}#webpage`,
  url: abs(args.path),
  name: args.name,
  description: args.description,
  isPartOf: { "@id": SITE_ID },
  inLanguage: "en",
  ...(args.breadcrumb ? { breadcrumb: { "@id": `${abs(args.path)}#breadcrumb` } } : {}),
});

export const collectionPageNode = (args: {
  path: string;
  name: string;
  description: string;
  hasPart?: Array<{ "@type": string; "@id": string; headline?: string; url?: string }>;
}) => ({
  "@type": "CollectionPage",
  "@id": `${abs(args.path)}#webpage`,
  url: abs(args.path),
  name: args.name,
  description: args.description,
  isPartOf: { "@id": SITE_ID },
  inLanguage: "en",
  ...(args.hasPart && args.hasPart.length ? { hasPart: args.hasPart } : {}),
});

export const itemListNode = (args: {
  path: string;
  name: string;
  items: Array<{ name: string; path: string }>;
}) => ({
  "@type": "ItemList",
  "@id": `${abs(args.path)}#itemlist`,
  name: args.name,
  numberOfItems: args.items.length,
  itemListElement: args.items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    url: abs(it.path),
  })),
});

export const serviceNode = (args: {
  path: string;
  name: string;
  serviceType: string;
  brandName: string;
  areaServed: {
    name: string;
    type: "Place" | "AdministrativeArea";
    containsPlace?: string[];
    geo?: { lat: number; lng: number };
    address?: { locality: string; region: string; country: string };
  };
}) => ({
  "@type": "Service",
  "@id": `${abs(args.path)}#service`,
  name: args.name,
  serviceType: args.serviceType,
  provider: { "@type": "LocalBusiness", "@id": ORG_ID, name: args.brandName },
  areaServed: {
    "@type": args.areaServed.type,
    name: args.areaServed.name,
    ...(args.areaServed.containsPlace
      ? { containsPlace: args.areaServed.containsPlace.map((n) => ({ "@type": "Place", name: n })) }
      : {}),
    ...(args.areaServed.geo
      ? { geo: { "@type": "GeoCoordinates", latitude: args.areaServed.geo.lat, longitude: args.areaServed.geo.lng } }
      : {}),
    ...(args.areaServed.address
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: args.areaServed.address.locality,
            addressRegion: args.areaServed.address.region,
            addressCountry: args.areaServed.address.country,
          },
        }
      : {}),
  },
});

export const localBusinessNode = (args: {
  brandName: string;
  phone?: string;
  community: {
    name: string;
    city: string;
    province: string;
    country?: string;
    coordinates: { lat: number; lng: number };
  };
  serviceCategory: string;
}) => ({
  "@type": "LocalBusiness",
  "@id": ORG_ID,
  name: args.brandName,
  ...(args.phone ? { telephone: args.phone } : {}),
  address: {
    "@type": "PostalAddress",
    addressLocality: args.community.city,
    addressRegion: args.community.province,
    addressCountry: args.community.country ?? "",
  },
  areaServed: {
    "@type": "Place",
    name: args.community.name,
    geo: {
      "@type": "GeoCoordinates",
      latitude: args.community.coordinates.lat,
      longitude: args.community.coordinates.lng,
    },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: `${args.serviceCategory} in ${args.community.name}`,
  },
});

/**
 * FAQPage with `speakable` selectors — assistant / voice-search ready.
 * The CSS selectors must exist in the rendered DOM for crawlers to
 * map the spoken answer back to the visible block.
 */
export const faqPageNode = (args: {
  path: string;
  faqs: Array<{ question: string; answer: string }>;
}) => ({
  "@type": "FAQPage",
  "@id": `${abs(args.path)}#faq`,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".faq-question", ".faq-answer"],
  },
  mainEntity: args.faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

/**
 * Compose a `@graph` document. Always pass the full set of nodes a
 * page needs; the graph wrapper makes the entity links resolvable.
 */
export const buildGraph = (nodes: Array<Record<string, unknown>>) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});

/** Convenience: serialize a graph for `<script>` body insertion. */
export const stringifyGraph = (nodes: Array<Record<string, unknown>>): string =>
  JSON.stringify(buildGraph(nodes));