/**
 * BlogPost — Victorious-SEO post surface.
 *
 * Route: /blog/:hubSlug/:postSlug
 *
 * Emits stitched JSON-LD (BlogPosting + BreadcrumbList + FAQPage with
 * `speakable` selectors via <BlogPostingSchema/>), renders the visible
 * E-E-A-T <AuthorBio/>, a TL;DR + outline (table of contents), and a
 * "Serving {Community}" cross-link card when the post declares geo
 * binding through `post.about`.
 *
 * Ships dormant — only renders when a remix adds posts to blogData.ts.
 */

import { Helmet } from "react-helmet-async";
import { Navigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import TemplateNavigation from "@/components/template/TemplateNavigation";
import TemplateFooter from "@/components/template/TemplateFooter";
import AuthorBio from "@/components/blog/AuthorBio";
import BlogPostingSchema from "@/components/blog/BlogPostingSchema";
import { getPostBySlug } from "@/lib/blogData";
import { getHubBySlug } from "@/lib/hubRegistry";
import { getCommunity, getRegion } from "@/data/communities";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import { buildCanonical } from "@/lib/canonical";
import ConversionBar from "@/components/template/ConversionBar";
import type { BookingClickHandler } from "@/config/template/booking-schema";

interface Props {
  onBookClick?: BookingClickHandler;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

const BlogPost = ({ onBookClick }: Props) => {
  const { hubSlug = "", postSlug = "" } = useParams<{ hubSlug: string; postSlug: string }>();
  const hub = getHubBySlug(hubSlug);
  const post = getPostBySlug(postSlug);

  // Hub-only mode: post not found → bounce up to the hub (or blog root).
  if (!post) return <Navigate to={hub ? hub.hubUrl : "/blog"} replace />;

  const path = `/blog/${hubSlug}/${postSlug}`;
  const url = buildCanonical(path);
  const community = post.about?.communitySlug ? getCommunity(post.about.communitySlug) : undefined;
  const region = post.about?.regionSlug ? getRegion(post.about.regionSlug) : undefined;

  return (
    <div className="min-h-screen bg-bone text-graphite antialiased">
      <Helmet>
        <title>{post.metaTitle || `${post.title} | ${MASTER_REMIX.BRAND_NAME}`}</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.metaTitle || post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={url} />
        {post.featuredImage?.url && (
          <meta property="og:image" content={post.ogImage || post.featuredImage.url} />
        )}
      </Helmet>

      <BlogPostingSchema post={post} hub={hub} />

      <TemplateNavigation />

      <main id="main" className="pt-24">
        <article className="container mx-auto max-w-3xl px-6 py-16">
          <nav aria-label="Breadcrumb" className="mb-8 text-caption text-mist">
            <Link to="/blog" className="hover:text-forest">Blog</Link>
            {hub && (
              <>
                {" / "}
                <Link to={hub.hubUrl} className="hover:text-forest">{hub.name}</Link>
              </>
            )}
            {" / "}
            <span className="text-charcoal">{post.title}</span>
          </nav>

          <p className="mb-3 text-eyebrow uppercase tracking-[0.22em] text-mist">
            {post.category}
          </p>
          <h1 className="mb-6 font-serif text-display-xl text-charcoal leading-tight">
            {post.title}
          </h1>

          {post.tldr && (
            <p className="mb-8 border-l-2 border-copper pl-5 font-serif italic text-body-lg text-graphite">
              {post.tldr}
            </p>
          )}

          <div className="mb-8 flex flex-wrap items-center gap-4 text-caption text-mist">
            <time dateTime={post.publishedAt}>Published {formatDate(post.publishedAt)}</time>
            {post.modifiedAt && post.modifiedAt !== post.publishedAt && (
              <span>· Updated {formatDate(post.modifiedAt)}</span>
            )}
            <span>· {post.readingTime} min read</span>
          </div>

          {post.featuredImage?.url && (
            <img
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              width={post.featuredImage.width}
              height={post.featuredImage.height}
              className="mb-10 w-full"
              loading="eager"
            />
          )}

          {post.outline && post.outline.length > 0 && (
            <aside className="mb-10 border border-seam bg-paper p-6">
              <p className="mb-3 text-eyebrow uppercase tracking-[0.22em] text-mist">
                On this page
              </p>
              <ol className="space-y-1.5 text-body-sm text-graphite">
                {post.outline.map((h, i) => (
                  <li key={i}>{i + 1}. {h}</li>
                ))}
              </ol>
            </aside>
          )}

          {/* Post body — plain text rendering, since markdown is intentionally
              not in the runtime (static-fast). Remixes can switch to MDX. */}
          <div className="prose prose-lg max-w-none whitespace-pre-line text-graphite">
            {post.content}
          </div>

          {/* Geo-binding trust card — closes the Areas ↔ Blog loop */}
          {community && (
            <aside className="mt-12 flex items-start gap-4 border border-seam bg-bone p-6">
              <MapPin size={18} className="mt-1 flex-shrink-0 text-forest" />
              <div className="min-w-0">
                <p className="text-eyebrow uppercase tracking-[0.22em] text-mist">Serving</p>
                <p className="mt-1 font-serif text-display-sm text-charcoal">
                  {community.name}{community.city ? `, ${community.city}` : ""}
                </p>
                <Link
                  to={`/areas-we-serve/${community.region}/${community.slug}`}
                  className="mt-2 inline-flex items-center gap-1.5 text-body-sm text-forest hover:underline"
                >
                  See our work in {community.name} <ArrowRight size={14} />
                </Link>
              </div>
            </aside>
          )}

          {!community && region && (
            <aside className="mt-12 border border-seam bg-bone p-6">
              <p className="text-eyebrow uppercase tracking-[0.22em] text-mist">Serving</p>
              <p className="mt-1 font-serif text-display-sm text-charcoal">{region.name}</p>
              <Link
                to={`/areas-we-serve/${region.slug}`}
                className="mt-2 inline-flex items-center gap-1.5 text-body-sm text-forest hover:underline"
              >
                Communities we serve in {region.name} <ArrowRight size={14} />
              </Link>
            </aside>
          )}

          {post.author && (
            <AuthorBio
              author={post.author}
              reviewedAt={post.modifiedAt}
            />
          )}

          {hub && (
            <p className="mt-10 text-body-sm">
              <Link to={hub.hubUrl} className="inline-flex items-center gap-1.5 text-forest hover:underline">
                <ArrowLeft size={14} /> More in {hub.name}
              </Link>
            </p>
          )}
        </article>

        {/* End-of-post conversion module */}
        <ConversionBar
          headline={
            post.about?.communitySlug && community
              ? `Need ${MASTER_REMIX.SERVICE} in ${community.name}? Get a quote.`
              : `Bring this guide to your own project — get a quote.`
          }
        />
      </main>

      {/* Mobile sticky CTA — single conversion target on long-form reads */}
      <ConversionBar variant="sticky" />

      <TemplateFooter />
    </div>
  );
};

export default BlogPost;