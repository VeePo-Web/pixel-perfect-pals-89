/**
 * MetaTags — Singleton <head> injector.
 *
 * Mounted once in App.tsx, just above <ScrollToTop />.
 * Uses react-helmet-async to inject per-route meta without FOUC or
 * double-render issues in React 18 + Suspense.
 *
 * Routing logic:
 *   Exact match       → META_CONFIG[pathname]
 *   /services/:slug   → META_SERVICE_DETAIL(slug)
 *   /areas-we-serve/* → skip (those pages inject their own schema)
 *   /thank-you        → noindex, nofollow
 *   catch-all (*)     → generic brand title only
 */

import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { META_CONFIG, META_SERVICE_DETAIL } from "@/config/template/meta-config";
import { MASTER_REMIX } from "@/config/template/remix-variables";

// ─── Resolve meta for the current pathname ────────────────────────────────────
const resolveMeta = (pathname: string) => {
  // Exact match
  if (META_CONFIG[pathname]) return { meta: META_CONFIG[pathname], noindex: false };

  // /services/:slug
  const serviceMatch = pathname.match(/^\/services\/([^/]+)$/);
  if (serviceMatch) {
    return { meta: META_SERVICE_DETAIL(serviceMatch[1]), noindex: false };
  }

  // Areas — skip, those pages handle their own schema
  if (pathname.startsWith("/areas-we-serve")) return null;

  // /thank-you — already in META_CONFIG but enforce noindex here too
  if (pathname === "/thank-you") {
    return {
      meta: META_CONFIG["/thank-you"] ?? {
        title: `Request Received | ${MASTER_REMIX.BRAND_NAME}`,
        description: "Your project request has been received.",
      },
      noindex: true,
    };
  }

  // Generic fallback
  return {
    meta: {
      title: MASTER_REMIX.BRAND_NAME,
      description: `${MASTER_REMIX.SERVICE_CATEGORY} in Cochrane, AB. ${MASTER_REMIX.BRAND_NAME} — written scope, 15-year structural guarantee. Send photos for a quote.`,
    },
    noindex: false,
  };
};

export const MetaTags = () => {
  const { pathname } = useLocation();
  const resolved = resolveMeta(pathname);

  // Area pages handle their own head — don't double-render
  if (resolved === null) return null;

  const { meta, noindex } = resolved;
  const title = meta.title;
  const description = meta.description;
  const ogTitle = meta.ogTitle ?? title;
  const ogDescription = meta.ogDescription ?? description;
  const canonical = meta.canonical;
  const isThankYou = pathname === "/thank-you";
  const robotsContent =
    isThankYou || noindex ? "noindex, nofollow" : "index, follow";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}

      {/* OG image — required for social sharing; falls back to brand default */}
      <meta property="og:image" content={MASTER_REMIX.OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={MASTER_REMIX.OG_IMAGE} />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
};
