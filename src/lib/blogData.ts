/**
 * blogData — Generic SEO Remix Template
 *
 * Source of truth for every blog post. Two scaffold posts ship by
 * default (one pillar, one spoke). Replace these with real content per
 * trade. All copy uses `{TOKEN}` placeholders so a remix author sees
 * exactly what to swap.
 */

import type { HubGovernanceData } from "./hubRegistry";

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
}

/** Convenience selector for the cross-surface "Guides for {Community}" rail. */
export const getPostsAboutCommunity = (communitySlug: string): BlogPost[] =>
  blogPosts.filter((p) => p.about?.communitySlug === communitySlug);

/** Convenience selector for the cross-surface "Field Notes for {Region}" rail. */
export const getPostsAboutRegion = (regionSlug: string): BlogPost[] =>
  blogPosts.filter((p) => p.about?.regionSlug === regionSlug);

/**
 * The blog ships hub-only — no individual posts. The structure stays
 * so a future remix can drop posts into this array without touching
 * any component. Hubs (topical clusters) live in `hubRegistry.ts`.
 */
export const blogPosts: BlogPost[] = [];

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