/**
 * Hub Governance Registry — generic SEO Remix Template scaffold.
 *
 * Sub-hubs cluster spoke posts under a pillar topic for topical authority,
 * internal-link equity, and faceted breadcrumbs. Replace these example hubs
 * with the hubs that match your trade.
 */

export interface Hub {
  id: string;
  name: string;
  slug: string;
  pillarUrl: string;
  hubUrl: string;
  primaryTopic: string;
  primaryKeywordPattern: string;
  secondaryTopics: string[];
  intentProfile: "informational" | "commercial" | "local" | "mixed";
  allowedLocations: string[];
  servicePages: string[];
  relatedHubs: string[];
  /**
   * Region slugs (from src/data/communities.ts → REGIONS) this hub
   * is topically relevant to. Powers the bi-directional "intent
   * bridge": Areas pages list field-notes for the region, hub pages
   * list the regions where the work happens. Empty = sitewide.
   */
  linkedRegions?: string[];
}

export interface HubGovernanceData {
  hubId: string;
  hubName: string;
  hubSlug: string;
  postType: "pillar" | "spoke" | "key_blog";
  internalLinks: {
    hub: string;
    pillar: string;
    servicePages: string[];
    relatedPosts: string[];
    crossHub?: string;
  };
  refreshCadence: "quarterly" | "6months" | "12months";
  cannibalizationRisk: "none" | "low" | "medium" | "high";
  hubIndexEntry?: {
    subtopicBucket: string;
    teaserTitle: string;
    teaserSummary: string;
    priority: "high" | "medium" | "low";
  };
}

/**
 * Generic scaffold — two example hubs. Add more (H3, H4 …) per trade.
 */
/**
 * Ships blank. Add hubs per trade — one pillar URL + several spoke
 * posts per hub (Victorious-SEO topic-cluster pattern). Copy the
 * shape from `EXAMPLE_HUB` below.
 */
export const hubRegistry: Hub[] = [];

/**
 * Reference shape only — NOT exported into `hubRegistry`. Copy this
 * into the array above and replace every value with real topic data
 * to light up a new cluster.
 */
export const EXAMPLE_HUB: Hub = {
  id: "H1",
  name: "Example Hub Name",
  slug: "example-hub",
  pillarUrl: "/blog/example-pillar",
  hubUrl: "/blog/example-hub",
  primaryTopic: "One-line description of the topic cluster this hub anchors.",
  primaryKeywordPattern: "example primary keyword pattern",
  secondaryTopics: ["subtopic one", "subtopic two"],
  intentProfile: "mixed",
  allowedLocations: [],
  servicePages: ["/areas-we-serve"],
  relatedHubs: [],
  linkedRegions: [],
};

export const getHubById = (hubId: string): Hub | undefined =>
  hubRegistry.find((h) => h.id === hubId);

export const getHubBySlug = (slug: string): Hub | undefined =>
  hubRegistry.find((h) => h.slug === slug);

export const getAllHubs = (): Hub[] => hubRegistry;

export const getRelatedHubs = (hubId: string): Hub[] => {
  const hub = getHubById(hubId);
  if (!hub) return [];
  return hub.relatedHubs
    .map((id) => getHubById(id))
    .filter((h): h is Hub => h !== undefined);
};