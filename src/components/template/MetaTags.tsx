/**
 * MetaTags — Singleton <head> injector.
 *
 * Mounted once in App.tsx. Uses react-helmet-async to inject per-route
 * meta on top of the static defaults in `index.html`.
 *
 * Routing logic:
 *   /areas-we-serve/* → skip (those pages inject their own head + schema)
 *   /blog*            → skip (BlogHub/BlogHubPage inject their own head)
 *   exact match in META_CONFIG → use it
 *   catch-all         → brand-level fallback
 */

import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { META_CONFIG } from "@/config/template/meta-config";
import { MASTER_REMIX } from "@/config/template/remix-variables";

export const MetaTags = () => {
  const { pathname } = useLocation();

  // Routes that own their own head — don't double-render.
  if (pathname.startsWith("/areas-we-serve")) return null;
  if (pathname.startsWith("/blog")) return null;

  const meta = META_CONFIG[pathname] ?? {
    title: `${MASTER_REMIX.BRAND_NAME} — ${MASTER_REMIX.SERVICE_CATEGORY}`,
    description: `${MASTER_REMIX.SERVICE_CATEGORY} — ${MASTER_REMIX.BRAND_NAME}. Send photos for a written quote.`,
  };

  const origin = MASTER_REMIX.BRAND_URL || "";
  const canonical = meta.canonical ?? `${origin}${pathname}`;
  const ogTitle = meta.ogTitle ?? meta.title;
  const ogDescription = meta.ogDescription ?? meta.description;
  const ogImage = MASTER_REMIX.OG_IMAGE || "/og-image.jpg";

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="robots" content="index, follow" />

      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={MASTER_REMIX.BRAND_NAME} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};
