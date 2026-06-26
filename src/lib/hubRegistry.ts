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
export const hubRegistry: Hub[] = [
  {
    id: "H1",
    name: "{HUB_1_NAME}",
    slug: "hub-one",
    pillarUrl: "/blog/pillar-one",
    hubUrl: "/blog/hub-one",
    primaryTopic: "{HUB_1_PRIMARY_TOPIC}",
    primaryKeywordPattern: "{HUB_1_KEYWORDS}",
    secondaryTopics: ["{HUB_1_SUBTOPIC_1}", "{HUB_1_SUBTOPIC_2}"],
    intentProfile: "mixed",
    allowedLocations: [],
    servicePages: ["/areas-we-serve"],
    relatedHubs: ["H2"],
  },
  {
    id: "H2",
    name: "{HUB_2_NAME}",
    slug: "hub-two",
    pillarUrl: "/blog/pillar-two",
    hubUrl: "/blog/hub-two",
    primaryTopic: "{HUB_2_PRIMARY_TOPIC}",
    primaryKeywordPattern: "{HUB_2_KEYWORDS}",
    secondaryTopics: ["{HUB_2_SUBTOPIC_1}", "{HUB_2_SUBTOPIC_2}"],
    intentProfile: "informational",
    allowedLocations: [],
    servicePages: ["/areas-we-serve"],
    relatedHubs: ["H1"],
  },
];

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