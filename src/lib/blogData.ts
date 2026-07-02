/**
 * blogData — Generic SEO Remix Template
 *
 * Source of truth for every blog post. Two scaffold posts ship by
 * default (one pillar, one spoke). Replace these with real content per
 * trade. All copy uses `{TOKEN}` placeholders so a remix author sees
 * exactly what to swap.
 */

import type { HubGovernanceData } from "./hubRegistry";

/** Real `<table>` block — renders <caption>/<thead>/<th>/<tbody> (3–4 cols). */
export interface PostTable {
  caption: string;
  columns: string[];
  rows: string[][];
}

/**
 * One extraction-grade article section (the unit AI retrieval cites).
 * Renders: <section> → question <h2 id> → 40–60w answer <p> → expansion.
 */
export interface PostSection {
  /** Anchor id — the TOC links to #id. */
  id: string;
  /** QUESTION-phrased heading mirroring the exact user query. */
  h2: string;
  /** 40–60 word self-contained direct answer (snippet + AI-citation target). */
  answer: string;
  /** Optional expansion prose (~80–110w → full passage ≈130–170w). Blank-line separated paragraphs. */
  body?: string;
  /** Real <ul>/<ol> list-snippet block (5–10 items, one sentence each). */
  list?: { ordered: boolean; items: string[] };
  /** Real <table> table-snippet block (comparison/pricing). */
  table?: PostTable;
}

/** Outbound source reference — rendered in the "Sources" section + BlogPosting.citation. */
export interface PostCitation {
  label: string;
  url: string;
  publisher?: string;
  year?: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  /** Markdown body. Supports `[download:slug]` markers (no-op until enabled)
   *  and `![image-key]` markers resolved through blogImages.ts. */
  content: string;
  author: {
    name: string;
    role: string;
    image: string;
    bio: string;
  };
  publishedAt: string;
  modifiedAt: string;
  readingTime: number;
  category: string;
  tags: string[];
  featured: boolean;
  featuredImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
    /** Optional — renders a <figure>/<figcaption> pair when present. */
    caption?: string;
  };
  ogImage?: string;
  twitterImage?: string;
  inlineImages?: string[];
  faq?: Array<{
    question: string;
    answer: string;
    intent?: "informational" | "transactional" | "navigational" | "local";
  }>;
  faqLastUpdated?: string;
  ctaConfig?: {
    midPost?: { headline: string; body: string };
    bottomPost?: { headline: string; subheadline: string; body: string };
  };
  hubGovernance?: HubGovernanceData;
  /**
   * Victorious-SEO extras — all optional, surfaced when present:
   *  • about      → forward-link to a served region/community ("Serving X")
   *  • tldr       → 1–2 sentence summary above the fold
   *  • outline    → H2 list, rendered as the table-of-contents
   *  • wordCount  → fed into BlogPosting.wordCount JSON-LD
   */
  about?: { regionSlug?: string; communitySlug?: string };
  tldr?: string;
  outline?: string[];
  wordCount?: number;
  /**
   * Phase-2 extraction model (docs/seo/FABLE5-PHASE2-PROMPT.md) — all
   * optional, fully backward-compatible with the legacy string `content`:
   *  • postType        → rendering + governance variant. "listicle" renders
   *                      sections as a numbered <ol> series + ItemList JSON-LD.
   *  • sections        → typed blocks → real semantic HTML (question <h2 id>,
   *                      40–60w answer <p>, real <ul>/<ol>/<table>). When
   *                      present the renderer uses sections and ignores
   *                      `content`; the TOC anchor-links to each section id.
   *  • keyTakeaways    → 5–7 quotable bullets, rendered near the top.
   *  • citations       → outbound sources → "Sources" section + schema citation.
   *  • comparisonTable → listicle-only master table before the first item.
   */
  postType?: "pillar" | "spoke" | "listicle" | "original-data";
  sections?: PostSection[];
  keyTakeaways?: string[];
  citations?: PostCitation[];
  comparisonTable?: PostTable;
}

/** Convenience selector for the cross-surface "Guides for {Community}" rail. */
export const getPostsAboutCommunity = (communitySlug: string): BlogPost[] =>
  blogPosts.filter((p) => p.about?.communitySlug === communitySlug);

/** Convenience selector for the cross-surface "Field Notes for {Region}" rail. */
export const getPostsAboutRegion = (regionSlug: string): BlogPost[] =>
  blogPosts.filter((p) => p.about?.regionSlug === regionSlug);

/**
 * Posts are assembled per master database under src/data/blog/ — one
 * geo-bound local guide per published community (batch pipeline:
 * docs/seo/master-databases/04-fable5-batch-expansion-prompt.md).
 * Hubs (topical clusters) live in `hubRegistry.ts`.
 *
 * Dormant, tokenized examples for the future Python blog agent live at
 * `src/data/blog/template-blog-posts.ts`. They are intentionally not
 * imported here because `{TOKEN}` placeholders should never publish.
 */
import { NS_BLOG_POSTS } from "../data/blog/nova-scotia-posts";
import { AB_BLOG_POSTS } from "../data/blog/alberta-posts";

export const blogPosts: BlogPost[] = [...NS_BLOG_POSTS, ...AB_BLOG_POSTS];

// ── Selectors ──────────────────────────────────────────────────────────────

export const getAllPosts = (): BlogPost[] =>
  [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

export const getFeaturedPost = (): BlogPost | undefined =>
  blogPosts.find((p) => p.featured) ?? blogPosts[0];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);

export const getPostsByHub = (hubId: string): BlogPost[] =>
  blogPosts.filter((p) => p.hubGovernance?.hubId === hubId);

export const getPostsByHubSlug = (hubSlug: string): BlogPost[] =>
  blogPosts.filter((p) => p.hubGovernance?.hubSlug === hubSlug);

export const getPostsByCategory = (category: string): BlogPost[] =>
  blogPosts.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase(),
  );

export const getRelatedPosts = (currentSlug: string, limit = 3): BlogPost[] => {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  const scored = blogPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => {
      let score = 0;
      if (p.hubGovernance?.hubId === current.hubGovernance?.hubId) score += 5;
      if (p.category === current.category) score += 2;
      const sharedTags = p.tags.filter((t) => current.tags.includes(t)).length;
      score += sharedTags;
      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.post);
};
