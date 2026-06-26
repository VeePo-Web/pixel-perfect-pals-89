import { useEffect } from "react";
import type { Community } from "@/data/communities";
import type { FAQ } from "@/config/template/remix-variables";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import {
  breadcrumbNode,
  faqPageNode,
  localBusinessNode,
  serviceNode,
  stringifyGraph,
} from "@/lib/seoGraph";

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
    const path = `/areas-we-serve/${community.region}/${community.slug}`;
    const graphJson = stringifyGraph([
      localBusinessNode({
        brandName,
        phone: MASTER_REMIX.PHONE,
        community,
        serviceCategory,
      }),
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Areas We Serve", path: "/areas-we-serve" },
        { name: regionName, path: `/areas-we-serve/${community.region}` },
        { name: community.name, path },
      ]),
      faqPageNode({ path, faqs }),
      serviceNode({
        path,
        name: `${serviceCategory} in ${community.name}`,
        serviceType: serviceCategory,
        brandName,
        areaServed: {
          type: "Place",
          name: community.name,
          geo: community.coordinates,
          address: {
            locality: community.city,
            region: community.province,
            country: community.country ?? "",
          },
        },
      }),
    ]);

    const cleanup = () => {
      document.querySelectorAll('[data-areas-schema="true"]').forEach((el) => el.remove());
    };
    cleanup();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-areas-schema", "true");
    script.textContent = graphJson;
    document.head.appendChild(script);
    return cleanup;
  }, [community, regionName, brandName, service, serviceCategory, faqs]);

  return null;
};

export default AreasSEOSchema;
