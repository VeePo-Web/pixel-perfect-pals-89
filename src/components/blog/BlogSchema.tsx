import { Helmet } from "react-helmet-async";
import type { BlogPost } from "@/lib/blogData";
import { getPostBySlug, getPostsByHub } from "@/lib/blogData";
import { getBlogImage } from "@/lib/blogImages";
import { MASTER_REMIX } from "@/config/template/remix-variables";

interface BlogSchemaProps {
  post: BlogPost;
  /** Absolute URL of the article — e.g. `${BRAND_URL}/blog/${slug}` */
  url: string;
}

const stripMarkdown = (content: string): string =>
  content
    .replace(/\[download:[^\]]+\]/g, "")
    .replace(/\[img:[^\]]+\]/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^>\s?/gm, "")
    .replace(/^[-*]\s/gm, "")
    .replace(/^\d+\.\s/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

/**
 * Emits BlogPosting + WebPage + BreadcrumbList (+ FAQPage when faqs exist).
 * Mirrors the hub-aware architecture from the VeePo source — speakable
 * selectors, hub/pillar isPartOf, and per-question @ids for AI overviews.
 */
export const BlogSchema = ({ post, url }: BlogSchemaProps) => {
  const origin = MASTER_REMIX.BRAND_URL || "";
  const articleBody = stripMarkdown(post.content);
  const brandName = MASTER_REMIX.BRAND_NAME;
  const logo = MASTER_REMIX.OG_IMAGE || `${origin}/og-default.jpg`;

  const imageObjects = [
    {
      "@type": "ImageObject" as const,
      url: post.featuredImage.url,
      width: post.featuredImage.width,
      height: post.featuredImage.height,
      caption: post.featuredImage.alt,
    },
    ...(post.inlineImages || [])
      .map((key) => {
        const img = getBlogImage(key);
        if (!img) return null;
        return {
          "@type": "ImageObject" as const,
          url: img.url,
          width: img.width,
          height: img.height,
          caption: img.alt,
          name: key,
          description: img.alt,
        };
      })
      .filter((x): x is NonNullable<typeof x> => !!x),
  ];

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    alternativeHeadline: post.excerpt,
    abstract: post.excerpt,
    image: imageObjects,
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      image: post.author.image,
    },
    publisher: {
      "@type": "Organization",
      name: brandName,
      logo: { "@type": "ImageObject", url: logo },
    },
    description: post.metaDescription,
    articleBody,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.tags.join(", "),
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
    inLanguage: "en",
    articleSection: post.category,
    isFamilyFriendly: true,
    genre: post.hubGovernance?.hubIndexEntry?.subtopicBucket || post.category,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [
        ".blog-hero-excerpt",
        "#faq-0 .cochrane-faq-question",
        "#faq-0 .cochrane-faq-answer",
      ],
    },
    about: post.tags.slice(0, 3).map((t) => ({ "@type": "Thing", name: t })),
    potentialAction: { "@type": "ReadAction", target: url },
    ...(() => {
      const parts: Array<Record<string, unknown>> = [];
      if (post.faq && post.faq.length > 0) parts.push({ "@id": `${url}#faq` });
      if (post.hubGovernance?.postType === "pillar") {
        getPostsByHub(post.hubGovernance.hubId)
          .filter((p) => p.slug !== post.slug)
          .forEach((p) =>
            parts.push({
              "@type": "BlogPosting",
              "@id": `${origin}/blog/${p.slug}#article`,
              headline: p.title,
            }),
          );
      }
      return parts.length > 0 ? { hasPart: parts } : {};
    })(),
    ...(post.hubGovernance?.internalLinks?.hub && {
      isPartOf: {
        "@type": "WebPage",
        "@id": `${origin}${post.hubGovernance.internalLinks.hub}`,
        name: post.hubGovernance.hubName,
      },
    }),
    mainContentOfPage: { "@id": url },
    ...(post.hubGovernance?.postType === "spoke" &&
      (post.hubGovernance?.internalLinks?.relatedPosts?.length ?? 0) > 0 && {
        relatedLink: post.hubGovernance!.internalLinks.relatedPosts
          .map((ref) => {
            const slug = ref.includes("/") ? ref.split("/").pop()! : ref;
            const resolved = getPostBySlug(slug);
            return resolved ? `${origin}/blog/${resolved.slug}` : null;
          })
          .filter((u): u is string => !!u),
      }),
  };

  // Breadcrumbs — hub-aware
  const crumbs: Array<Record<string, unknown>> = [
    { "@type": "ListItem", position: 1, name: "Home", item: origin || "/" },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${origin}/blog` },
  ];
  if (post.hubGovernance?.hubName) {
    const hubUrl = post.hubGovernance.internalLinks?.hub
      ? `${origin}${post.hubGovernance.internalLinks.hub}`
      : `${origin}/blog/${post.hubGovernance.hubSlug}`;
    crumbs.push({
      "@type": "ListItem",
      position: crumbs.length + 1,
      name: post.hubGovernance.hubName,
      item: hubUrl,
    });
  }
  crumbs.push({
    "@type": "ListItem",
    position: crumbs.length + 1,
    name: post.title,
    item: url,
  });
  if (post.faq && post.faq.length > 0) {
    crumbs.push({
      "@type": "ListItem",
      position: crumbs.length + 1,
      name: "Frequently Asked Questions",
      item: `${url}#faq`,
    });
  }

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: crumbs,
  };

  // WebPage entity with speakable
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: post.title,
    description: post.metaDescription,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${origin}/#website`,
      name: brandName,
      url: origin || "/",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${origin}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [
        ".cochrane-faq-section",
        ".cochrane-faq-question",
        ".cochrane-faq-answer",
        ".blog-hero-excerpt",
        "#faq-heading",
        "#faq-intro",
        "#faq-0 .cochrane-faq-question",
        "#faq-0 .cochrane-faq-answer",
        "#faq-1 .cochrane-faq-question",
        "#faq-1 .cochrane-faq-answer",
        "#faq-2 .cochrane-faq-question",
        "#faq-2 .cochrane-faq-answer",
      ],
    },
    mainEntity: { "@id": `${url}#article` },
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt,
    accessibilityFeature: [
      "structuredNavigation",
      "alternativeText",
      "readingOrder",
      "tableOfContents",
    ],
    accessibilityHazard: "none",
    accessibilityControl: ["fullKeyboardControl", "fullMouseControl", "fullTouchControl"],
    accessMode: ["textual", "visual"],
    accessModeSufficient: {
      "@type": "ItemList",
      itemListElement: [{ "@type": "ListItem", name: "textual" }],
    },
    ...(post.faq && post.faq.length > 0 && {
      significantLink: [`${url}#faq`],
      hasPart: [{ "@id": `${url}#article` }, { "@id": `${url}#faq` }],
    }),
    breadcrumb: { "@id": `${url}#breadcrumb` },
  };

  const buildAudience = (intent?: string) => {
    if (!intent) return undefined;
    const map: Record<string, string> = {
      informational: "people researching the topic",
      transactional: "people ready to hire",
      navigational: "returning visitors",
      local: "local prospective customers",
    };
    return { "@type": "Audience", audienceType: map[intent] || intent };
  };

  const faqPage =
    post.faq && post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${url}#faq`,
          name: `Frequently Asked Questions about ${post.title}`,
          inLanguage: "en",
          datePublished: post.publishedAt,
          dateModified: post.faqLastUpdated || post.modifiedAt,
          isFamilyFriendly: true,
          isAccessibleForFree: true,
          learningResourceType: "FAQ",
          genre: post.hubGovernance?.hubIndexEntry?.subtopicBucket || post.category,
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: [".cochrane-faq-question", ".cochrane-faq-answer"],
          },
          isPartOf: { "@id": url },
          mainEntity: post.faq.map((q, i) => {
            const audience = buildAudience(q.intent);
            return {
              "@type": "Question",
              "@id": `${url}#faq-${i}-question`,
              name: q.question,
              ...(audience ? { audience } : {}),
              acceptedAnswer: {
                "@type": "Answer",
                "@id": `${url}#faq-${i}-answer`,
                text: q.answer,
                inLanguage: "en",
                upvoteCount: 0,
              },
            };
          }),
        }
      : null;

  return (
    <Helmet>
      <title>{post.metaTitle}</title>
      <meta name="description" content={post.metaDescription} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={post.metaTitle} />
      <meta property="og:description" content={post.metaDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={post.ogImage || post.featuredImage.url} />
      <meta property="article:published_time" content={post.publishedAt} />
      <meta property="article:modified_time" content={post.modifiedAt} />
      <meta property="article:section" content={post.category} />
      {post.tags.map((t) => (
        <meta key={t} property="article:tag" content={t} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.metaTitle} />
      <meta name="twitter:description" content={post.metaDescription} />
      <meta name="twitter:image" content={post.twitterImage || post.featuredImage.url} />

      <script type="application/ld+json">{JSON.stringify(blogPosting)}</script>
      <script type="application/ld+json">{JSON.stringify(webPage)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbList)}</script>
      {faqPage && (
        <script type="application/ld+json">{JSON.stringify(faqPage)}</script>
      )}
    </Helmet>
  );
};