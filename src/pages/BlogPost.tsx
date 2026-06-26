import { useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import TemplateNavigation from "@/components/template/TemplateNavigation";
import TemplateFooter from "@/components/template/TemplateFooter";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogContent } from "@/components/blog/BlogContent";
import { BlogSchema } from "@/components/blog/BlogSchema";
import { BlogFAQ } from "@/components/blog/BlogFAQ";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { MidPostCTA } from "@/components/blog/MidPostCTA";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ScrollProgressBar } from "@/components/blog/ScrollProgressBar";
import { SocialShare } from "@/components/blog/SocialShare";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { HubNavigation } from "@/components/blog/HubNavigation";
import { MobileStickyCTA } from "@/components/blog/MobileStickyCTA";
import { getPostBySlug, getRelatedPosts } from "@/lib/blogData";
import { getTableOfContents } from "@/lib/blogUtils";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import type { BookingClickHandler } from "@/config/template/booking-schema";

interface BlogPostProps {
  onBookClick?: BookingClickHandler;
}

const BlogPost = ({ onBookClick }: BlogPostProps) => {
  const params = useParams<{ slug?: string; hubSlug?: string }>();
  const slug = params.slug || params.hubSlug;
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  if (!post) return <Navigate to="/blog" replace />;

  const origin = MASTER_REMIX.BRAND_URL || "";
  const url = `${origin}/blog/${post.slug}`;
  const toc = getTableOfContents(post.content);
  const related = getRelatedPosts(post.slug, 3);

  return (
    <div className="min-h-screen bg-bone text-graphite antialiased">
      <BlogSchema post={post} url={url} />
      <ScrollProgressBar />
      <TemplateNavigation onBookClick={onBookClick} />

      <main id="main" className="pt-24">
        <BlogHero post={post} />

        <div className="container mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
            <article className="min-w-0">
              <BlogContent content={post.content} />

              <MidPostCTA
                headline={`Ready to talk to ${MASTER_REMIX.BRAND_NAME}?`}
                body={MASTER_REMIX.SERVICE_REGION_TAGLINE}
                onBookClick={onBookClick}
              />

              {post.faq && post.faq.length > 0 && <BlogFAQ faqs={post.faq} />}

              <HubNavigation post={post} />

              <div className="my-12 border-y border-seam py-8">
                <SocialShare url={url} title={post.title} />
              </div>

              <AuthorCard author={post.author} />

              <div data-cta="blog-bottom" className="mt-16">
                <BlogCTA
                  headline="Have a project in mind?"
                  body={MASTER_REMIX.COVERAGE_BLURB}
                  onBookClick={onBookClick}
                />
              </div>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-8">
                {toc.length > 0 && <TableOfContents items={toc} />}
                <div className="border-t border-seam pt-6">
                  <p className="mb-3 text-eyebrow uppercase tracking-[0.22em] text-mist">
                    Back to
                  </p>
                  <Link
                    to="/blog"
                    className="text-body-sm text-charcoal underline-offset-4 transition-colors hover:text-forest hover:underline"
                  >
                    All field notes →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {related.length > 0 && (
          <section className="border-t border-seam bg-paper">
            <div className="container mx-auto max-w-6xl px-6 py-20">
              <RelatedPosts posts={related} />
            </div>
          </section>
        )}
      </main>

      <TemplateFooter onBookClick={onBookClick} />
      <MobileStickyCTA onBookClick={onBookClick} />
    </div>
  );
};

export default BlogPost;