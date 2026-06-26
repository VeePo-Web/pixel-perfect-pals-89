/**
 * generate-sitemap.ts — Runs before `vite dev` and `vite build`
 * (predev/prebuild hooks); writes public/sitemap.xml.
 *
 * Entries are pulled from the live data layer so the sitemap stays
 * in sync with the app: every Region + Community + Blog Hub route is
 * generated automatically.
 */

import { writeFileSync } from "fs";
import { resolve } from "path";
import { REGIONS, COMMUNITIES, resolveCommunityHeroImage } from "../src/data/communities";
import { hubRegistry } from "../src/lib/hubRegistry";
import { blogPosts } from "../src/lib/blogData";
import { MASTER_REMIX } from "../src/config/template/remix-variables";

const BASE_URL = MASTER_REMIX.BRAND_URL?.replace(/\/$/, "") || "";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
  images?: Array<{ loc: string; caption?: string }>;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/areas-we-serve", changefreq: "weekly", priority: "0.9" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  ...REGIONS.map<SitemapEntry>((r) => ({
    path: `/areas-we-serve/${r.slug}`,
    changefreq: "monthly",
    priority: "0.8",
    images: r.heroImage?.url ? [{ loc: r.heroImage.url, caption: r.heroImage.alt }] : undefined,
  })),
  ...COMMUNITIES.map<SitemapEntry>((c) => {
    const img = resolveCommunityHeroImage(c);
    return {
      path: `/areas-we-serve/${c.region}/${c.slug}`,
      changefreq: "monthly",
      priority: "0.7",
      images: img?.url ? [{ loc: img.url, caption: img.alt }] : undefined,
    };
  }),
  ...hubRegistry.map<SitemapEntry>((h) => ({
    path: `/blog/${h.slug}`,
    changefreq: "weekly",
    priority: "0.7",
  })),
  ...blogPosts.map<SitemapEntry>((p) => ({
    path: `/blog/${p.hubGovernance?.hubSlug ?? "post"}/${p.slug}`,
    lastmod: p.modifiedAt || p.publishedAt,
    changefreq: "monthly",
    priority: "0.6",
  })),
];

function build(entries: SitemapEntry[]): string {
  const urls = entries.map((e) =>
    [
      "  <url>",
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      ...(e.images ?? []).map((img) =>
        [
          "    <image:image>",
          `      <image:loc>${img.loc}</image:loc>`,
          img.caption ? `      <image:caption>${img.caption.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</image:caption>` : null,
          "    </image:image>",
        ].filter(Boolean).join("\n"),
      ),
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n"),
  );
  const header = BASE_URL
    ? ""
    : "<!-- TODO: set MASTER_REMIX.BRAND_URL so <loc> values are absolute -->\n";
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    header + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...urls,
    "</urlset>",
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), build(entries));
console.log(`sitemap.xml written (${entries.length} entries${BASE_URL ? "" : ", relative URLs"})`);