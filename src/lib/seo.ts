/**
 * SEO utilities for per-page meta tags.
 * Call setPageMeta() in each page's useEffect to set title, description, and OG tags.
 * BASE_URL and OG_IMAGE read from MASTER_REMIX so every trade site gets its own domain.
 */

import { MASTER_REMIX } from "@/config/template/remix-variables";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

export function setPageMeta({ title, description, path, ogImage }: PageMeta) {
  const baseUrl = MASTER_REMIX.BRAND_URL;
  const image = ogImage ?? MASTER_REMIX.OG_IMAGE;

  document.title = title;
  setMetaTag("name", "description", description);
  setLinkTag("canonical", `${baseUrl}${path}`);
  setMetaTag("property", "og:title", title);
  setMetaTag("property", "og:description", description);
  setMetaTag("property", "og:url", `${baseUrl}${path}`);
  setMetaTag("property", "og:image", image);
  setMetaTag("name", "twitter:title", title);
  setMetaTag("name", "twitter:description", description);
  setMetaTag("name", "twitter:image", image);
}

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLinkTag(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}
