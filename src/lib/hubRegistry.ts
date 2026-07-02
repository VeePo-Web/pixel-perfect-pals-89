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
  /**
   * Community slugs this hub speaks to directly. Renders a "Guides for
   * {Community}" rail on each matching community page. Empty = none.
   */
  linkedCommunities?: string[];
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
 * One hub per master SEO database — its geo-bound local guides cluster
 * under it (Victorious-SEO topic-cluster pattern). Extend per database
 * via the batch pipeline (docs/seo/master-databases/04).
 */
export const hubRegistry: Hub[] = [
  {
    id: "H1",
    name: "Nova Scotia Area Guides",
    slug: "nova-scotia-guides",
    pillarUrl: "/blog/nova-scotia-guides/halifax-home-maintenance-guide",
    hubUrl: "/blog/nova-scotia-guides",
    primaryTopic:
      "Locally-grounded property and project guides for every Nova Scotia community we serve — climate, building stock, and planning intelligence per place.",
    primaryKeywordPattern: "property guide {community} nova scotia",
    secondaryTopics: [
      "coastal climate and building exteriors",
      "heritage and century-home considerations",
      "regional building stock and property types",
      "hiring local contractors in nova scotia",
    ],
    intentProfile: "local",
    allowedLocations: [],
    servicePages: ["/areas-we-serve"],
    relatedHubs: ["H2"],
    linkedRegions: [
      "halifax-metro",
      "cape-breton",
      "south-shore",
      "annapolis-valley",
      "northumberland-shore",
      "fundy-shore",
      "central-nova-scotia",
      "chignecto",
      "eastern-shore",
    ],
    linkedCommunities: [
      "halifax",
      "cape-breton",
      "sydney",
      "dartmouth",
      "west-hants",
      "east-hants",
      "kings-county",
      "colchester-county",
      "bedford",
      "lunenburg-district",
      "lower-sackville",
      "cole-harbour",
      "glace-bay",
      "queens",
      "cumberland-county",
      "sydney-mines",
      "north-sydney",
      "downtown-halifax",
      "new-waterford",
      "inverness-county",
    ],
  },
  {
    id: "H2",
    name: "Alberta Area Guides",
    slug: "alberta-guides",
    pillarUrl: "/blog/alberta-guides/calgary-home-maintenance-guide",
    hubUrl: "/blog/alberta-guides",
    primaryTopic:
      "Locally-grounded property and project guides for every Alberta community we serve — chinook and hail climate, building stock, and planning intelligence per place.",
    primaryKeywordPattern: "property guide {community} alberta",
    secondaryTopics: [
      "chinook freeze-thaw and building exteriors",
      "prairie hail and roofing exposure",
      "regional building stock and property types",
      "hiring local contractors in alberta",
    ],
    intentProfile: "local",
    allowedLocations: [],
    servicePages: ["/areas-we-serve"],
    relatedHubs: ["H1"],
    linkedRegions: [
      "calgary-region",
      "edmonton-region",
      "central-alberta",
      "southern-alberta",
      "southeast-alberta",
      "canadian-rockies",
      "northern-alberta",
      "lakeland-region",
      "peace-region",
      "west-country",
      "wood-buffalo-region",
      "rural-alberta",
    ],
    linkedCommunities: [
      "calgary",
      "edmonton",
      "st-albert",
      "airdrie",
      "spruce-grove",
      "red-deer",
      "leduc",
      "chestermere",
      "fort-saskatchewan",
      "beaumont",
      "lethbridge",
      "sherwood-park",
      "cochrane",
      "okotoks",
      "camrose",
      "wetaskiwin",
      "stony-plain",
      "lacombe",
      "medicine-hat",
      "high-river",
    ],
  },
];

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
  linkedCommunities: [],
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