import { useEffect } from "react";
import type { Community } from "@/data/communities";
import type { FAQ } from "@/config/template/remix-variables";
import { MASTER_REMIX } from "@/config/template/remix-variables";

/**
 * Injects 4 JSON-LD schema types into document.head for a community page.
 * Service-agnostic: brandName, service, and FAQs are injected as props
 * so every remix gets accurate, trade-specific structured data.
 */
interface AreasSEOSchemaProps {
  community: Community;
  regionName: string;
  brandName: string;       // e.g. "Cochrane Tile Masters"
  service: string;         // e.g. "tile" — from MASTER_REMIX.SERVICE
  serviceCategory: string; // e.g. "Interior Finishing"
  faqs: FAQ[];             // generated dynamically by the page
}

const AreasSEOSchema = ({
  community,
  regionName,
  brandName,
  service,
  serviceCategory,
  faqs,
}: AreasSEOSchemaProps) => {
  useEffect(() => {
    const BASE_URL = MASTER_REMIX.BRAND_URL;
    const PHONE    = MASTER_REMIX.PHONE;
    const schemas = [
      // 1. LocalBusiness — declares this community as a served area
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: brandName,
        telephone: PHONE,
        address: {
          "@type": "PostalAddress",
          addressLocality: community.city,
          addressRegion: community.province,
          addressCountry: community.country ?? "",
        },
        areaServed: {
          "@type": "Place",
          name: community.name,
          geo: {
            "@type": "GeoCoordinates",
            latitude: community.coordinates.lat,
            longitude: community.coordinates.lng,
          },
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${serviceCategory} in ${community.name}`,
        },
      },

      // 2. BreadcrumbList — 4-level breadcrumb
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Areas We Serve", item: `${BASE_URL}/areas-we-serve` },
          { "@type": "ListItem", position: 3, name: regionName, item: `${BASE_URL}/areas-we-serve/${community.region}` },
          { "@type": "ListItem", position: 4, name: community.name, item: `${BASE_URL}/areas-we-serve/${community.region}/${community.slug}` },
        ],
      },

      // 3. FAQPage — generated dynamically, always service-accurate
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },

      // 4. Service — with geo coordinates for local pack ranking
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${serviceCategory} in ${community.name}`,
        serviceType: serviceCategory,
        provider: { "@type": "LocalBusiness", name: brandName },
        areaServed: {
          "@type": "Place",
          name: community.name,
          address: {
            "@type": "PostalAddress",
            addressLocality: community.city,
            addressRegion: community.province,
            addressCountry: community.country ?? "",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: community.coordinates.lat,
            longitude: community.coordinates.lng,
          },
        },
      },
    ];

    const cleanup = () => {
      document.querySelectorAll('[data-areas-schema="true"]').forEach((el) => el.remove());
    };

    cleanup();
    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-areas-schema", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return cleanup;
  }, [community, regionName, brandName, service, serviceCategory, faqs]);

  return null;
};

export default AreasSEOSchema;
