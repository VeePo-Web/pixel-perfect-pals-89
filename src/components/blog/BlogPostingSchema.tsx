/**
 * BlogPostingSchema — dormant until a remix adds posts to blogData.ts.
 *
 * Emits a stitched JSON-LD graph for a single post:
 *   • BlogPosting (with author, publisher, mainEntityOfPage, image)
 *   • BreadcrumbList (Home → Blog → Hub → Post)
 *   • FAQPage (with `speakable` selectors) when post.faq is present
 *
 * Drop into a future BlogPost page like:
 *   <BlogPostingSchema post={post} hub={hub} />
 */

import { useEffect } from "react";
import type { BlogPost } from "@/lib/blogData";
import type { Hub } from "@/lib/hubRegistry";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import {
  ORG_ID,
  SITE_ID,
  breadcrumbNode,
  faqPageNode,
  stringifyGraph,
} from "@/lib/seoGraph";

interface Props {
  post: BlogPost;
  hub?: Hub;
}

const BlogPostingSchema = ({ post, hub }: Props) => {
  useEffect(() => {
    const origin = (MASTER_REMIX.BRAND_URL || "").replace(/\/$/, "");
    const path = `/blog/${post.slug}`;
    const url = `${origin}${path}`;

    const trail = [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      ...(hub ? [{ name: hub.name, path: hub.hubUrl }] : []),
      { name: post.title, path },
    ];

    const blogPosting: Record<string, unknown> = {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.title,
      description: post.metaDescription,
      url,
      datePublished: post.publishedAt,
      dateModified: post.modifiedAt,
      inLanguage: "en",
      mainEntityOfPage: { "@id": `${url}#webpage` },
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      author: {
        "@type": "Person",
        name: post.author.name,
        jobTitle: post.author.role,
        ...(post.author.image ? { image: post.author.image } : {}),
      },
      ...(post.featuredImage?.url
        ? {
            image: {
              "@type": "ImageObject",
              url: post.featuredImage.url,
              width: post.featuredImage.width,
              height: post.featuredImage.height,
            },
          }
        : {}),
      ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
      articleSection: post.category,
    };

    const nodes: Array<Record<string, unknown>> = [
      blogPosting,
      breadcrumbNode(trail),
    ];
    if (post.faq?.length) nodes.push(faqPageNode({ path, faqs: post.faq }));

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-post-schema", "true");
    script.textContent = stringifyGraph(nodes);
    document.head.appendChild(script);
    return () => {
      document.querySelectorAll('[data-post-schema="true"]').forEach((el) => el.remove());
    };
  }, [post, hub]);

  return null;
};

export default BlogPostingSchema;