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
}

const PLACEHOLDER_AUTHOR = {
  name: "{AUTHOR_NAME}",
  role: "{AUTHOR_ROLE}",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&q=80",
  bio: "Replace {AUTHOR_NAME} with the byline owner. Two-sentence editorial bio — what they do, what they have done long enough to be trusted.",
};

const PLACEHOLDER_HERO = {
  url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop&q=80",
  alt: "Editorial hero placeholder — replace per post",
  width: 1600,
  height: 900,
};

export const blogPosts: BlogPost[] = [
  {
    slug: "pillar-one",
    title: "{PILLAR_POST_TITLE} — The Complete Guide",
    metaTitle: "{PILLAR_POST_META_TITLE} | {BRAND_NAME}",
    metaDescription:
      "{PILLAR_POST_META_DESCRIPTION} — a 140–155 character editorial summary that names the topic, the outcome, and the geography you serve.",
    excerpt:
      "{PILLAR_POST_EXCERPT} — one editorial sentence the speakable selector can read aloud. Names the topic, the audience, and the promise.",
    content: `Welcome to the {PILLAR_POST_TITLE} pillar. Replace this body in \`src/lib/blogData.ts\`.

## Why this matters

A pillar post sits at the top of a hub. It defines the topic, links down to every spoke, and earns the bulk of the inbound links. Write it last — once the spokes exist — and keep it editorially generous: 2,500–4,000 words, ten or more internal links, one or two outbound citations to authoritative sources.

## What goes in a pillar

- A definition of the topic the layperson uses
- A decision framework the reader can apply today
- A timeline the reader can plan against
- An honest pricing band the reader can budget against
- A short FAQ that mirrors the long-tail queries

## How spokes link back

Each spoke includes \`hubGovernance.internalLinks.pillar\` pointing here. The schema layer then emits a \`hasPart\` array on this pillar, listing every spoke as a \`BlogPosting\` reference — giving search engines a literal map of the cluster.

## Related reading

- Spoke example: [spoke-one](/blog/spoke-one)
`,
    author: PLACEHOLDER_AUTHOR,
    publishedAt: "2026-01-15",
    modifiedAt: "2026-06-01",
    readingTime: 12,
    category: "{PILLAR_CATEGORY}",
    tags: ["{TAG_1}", "{TAG_2}", "{TAG_3}"],
    featured: true,
    featuredImage: PLACEHOLDER_HERO,
    faq: [
      {
        question: "How do I use this pillar post?",
        answer:
          "Replace the body, FAQ, and metadata in `src/lib/blogData.ts`. Keep the structure — the schema layer reads every field.",
        intent: "informational",
      },
      {
        question: "Where do I add new posts?",
        answer:
          "Append to the `blogPosts` array in the same file. The hub and post pages discover them automatically.",
        intent: "navigational",
      },
    ],
    faqLastUpdated: "2026-06-01",
    ctaConfig: {
      midPost: {
        headline: "Want this done right?",
        body: "Send a few photos. We'll write back within one business day with an honest scope and a written quote.",
      },
      bottomPost: {
        headline: "Ready to start?",
        subheadline: "No sales call. No pressure.",
        body: "The next step is yours. Send three or four photos through the booking form.",
      },
    },
    hubGovernance: {
      hubId: "H1",
      hubName: "{HUB_1_NAME}",
      hubSlug: "hub-one",
      postType: "pillar",
      internalLinks: {
        hub: "/blog/hub-one",
        pillar: "/blog/pillar-one",
        servicePages: ["/areas-we-serve"],
        relatedPosts: ["spoke-one"],
      },
      refreshCadence: "quarterly",
      cannibalizationRisk: "none",
      hubIndexEntry: {
        subtopicBucket: "{HUB_1_SUBTOPIC}",
        teaserTitle: "{PILLAR_POST_TITLE}",
        teaserSummary: "{PILLAR_POST_EXCERPT}",
        priority: "high",
      },
    },
  },
  {
    slug: "spoke-one",
    title: "{SPOKE_POST_TITLE}",
    metaTitle: "{SPOKE_POST_META_TITLE} | {BRAND_NAME}",
    metaDescription:
      "{SPOKE_POST_META_DESCRIPTION} — a tight 140–155 character meta tied to a single long-tail query.",
    excerpt:
      "{SPOKE_POST_EXCERPT} — one editorial sentence. A spoke serves a narrower query than its pillar.",
    content: `Replace this spoke body in \`src/lib/blogData.ts\`.

## What a spoke does

A spoke answers one specific question very well. Keep it short — 800–1,500 words — and link up to the pillar in the first 200 words.

## Pattern to follow

1. Open with the question the reader is searching.
2. Give the answer in one paragraph.
3. Expand with three to five concrete examples.
4. Close with a single CTA and a link back to the pillar: [{PILLAR_POST_TITLE}](/blog/pillar-one).
`,
    author: PLACEHOLDER_AUTHOR,
    publishedAt: "2026-02-20",
    modifiedAt: "2026-05-10",
    readingTime: 5,
    category: "{SPOKE_CATEGORY}",
    tags: ["{TAG_1}", "{TAG_4}"],
    featured: false,
    featuredImage: PLACEHOLDER_HERO,
    faq: [
      {
        question: "How is a spoke different from a pillar?",
        answer:
          "A spoke targets one narrow query. A pillar is the comprehensive overview the spokes feed into.",
        intent: "informational",
      },
    ],
    hubGovernance: {
      hubId: "H1",
      hubName: "{HUB_1_NAME}",
      hubSlug: "hub-one",
      postType: "spoke",
      internalLinks: {
        hub: "/blog/hub-one",
        pillar: "/blog/pillar-one",
        servicePages: ["/areas-we-serve"],
        relatedPosts: ["pillar-one"],
      },
      refreshCadence: "6months",
      cannibalizationRisk: "low",
      hubIndexEntry: {
        subtopicBucket: "{HUB_1_SUBTOPIC}",
        teaserTitle: "{SPOKE_POST_TITLE}",
        teaserSummary: "{SPOKE_POST_EXCERPT}",
        priority: "medium",
      },
    },
  },
];

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