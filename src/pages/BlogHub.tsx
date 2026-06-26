import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import TemplateNavigation from "@/components/template/TemplateNavigation";
import TemplateFooter from "@/components/template/TemplateFooter";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts, getFeaturedPost } from "@/lib/blogData";
import { hubRegistry } from "@/lib/hubRegistry";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import type { BookingClickHandler } from "@/config/template/booking-schema";

interface BlogHubProps {
  onBookClick?: BookingClickHandler;
}

const BlogHub = ({ onBookClick }: BlogHubProps) => {
  const featured = getFeaturedPost();
  const all = getAllPosts();
  const regular = all.filter((p) => !p.featured || p.slug !== featured?.slug);
  const origin = MASTER_REMIX.BRAND_URL || "";
  const url = `${origin}/blog`;

  return (
    <div className="min-h-screen bg-bone text-graphite antialiased">
      <Helmet>
        <title>{`Field Notes & Guides | ${MASTER_REMIX.BRAND_NAME}`}</title>
        <meta
          name="description"
          content={`Editorial guides, field notes, and answers to the questions ${MASTER_REMIX.BRAND_NAME} hears most — written for the people we serve.`}
        />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={`Field Notes & Guides | ${MASTER_REMIX.BRAND_NAME}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={MASTER_REMIX.OG_IMAGE} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: origin || "/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: url },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": url,
            name: `${MASTER_REMIX.BRAND_NAME} Field Notes`,
            description: `Editorial guides and answers from ${MASTER_REMIX.BRAND_NAME}.`,
            url,
            isPartOf: { "@type": "WebSite", "@id": `${origin}/#website`, name: MASTER_REMIX.BRAND_NAME },
            inLanguage: "en",
            hasPart: all.map((p) => ({
              "@type": "BlogPosting",
              "@id": `${origin}/blog/${p.slug}#article`,
              headline: p.title,
              datePublished: p.publishedAt,
              dateModified: p.modifiedAt,
              url: `${origin}/blog/${p.slug}`,
            })),
          })}
        </script>
      </Helmet>

      <TemplateNavigation onBookClick={onBookClick} />

      <main id="main" className="pt-24">
        {/* Editorial hero */}
        <section className="border-b border-seam">
          <div className="container mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="h-1 w-8 bg-copper" />
              <span className="text-eyebrow uppercase tracking-[0.22em] text-mist">
                From the desk of {MASTER_REMIX.BRAND_NAME}
              </span>
            </div>
            <h1
              className="mb-6 font-serif font-medium text-display-xl text-charcoal leading-[1.04] tracking-tight"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Field Notes &amp; Editorial Guides
            </h1>
            <p className="max-w-2xl text-body-lg text-graphite">
              {MASTER_REMIX.COVERAGE_BLURB}
            </p>
          </div>
        </section>

        {/* Hub directory */}
        {hubRegistry.length > 0 && (
          <section className="border-b border-seam bg-paper">
            <div className="container mx-auto max-w-5xl px-6 py-12">
              <p className="mb-5 text-eyebrow uppercase tracking-[0.22em] text-mist">
                Browse by topic
              </p>
              <ul className="flex flex-wrap gap-3">
                {hubRegistry.map((h) => (
                  <li key={h.id}>
                    <Link
                      to={h.hubUrl}
                      className="inline-flex items-center gap-2 border border-seam bg-bone px-4 py-2 text-body-sm text-charcoal transition-colors hover:border-copper hover:text-forest"
                    >
                      <span className="h-1.5 w-1.5 bg-copper" />
                      {h.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Featured */}
        {featured && (
          <section className="container mx-auto max-w-5xl px-6 py-16">
            <p className="mb-6 text-eyebrow uppercase tracking-[0.22em] text-mist">
              The Essential Guide
            </p>
            <BlogCard post={featured} featured />
          </section>
        )}

        {/* Regular grid */}
        {regular.length > 0 && (
          <section className="container mx-auto max-w-5xl px-6 pb-24">
            <p className="mb-6 text-eyebrow uppercase tracking-[0.22em] text-mist">
              More from the field
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {regular.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <TemplateFooter onBookClick={onBookClick} />
    </div>
  );
};

export default BlogHub;