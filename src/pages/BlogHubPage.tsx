import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router-dom";
import TemplateNavigation from "@/components/template/TemplateNavigation";
import TemplateFooter from "@/components/template/TemplateFooter";
import { BlogCard } from "@/components/blog/BlogCard";
import { getHubBySlug } from "@/lib/hubRegistry";
import { getPostsByHubSlug } from "@/lib/blogData";
import { getRegion } from "@/data/communities";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import type { BookingClickHandler } from "@/config/template/booking-schema";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface BlogHubPageProps {
  onBookClick?: BookingClickHandler;
}

/**
 * Sub-hub index. Routed only when `:hubSlug` resolves to a Hub in the
 * registry; otherwise the parent route falls through to BlogPost.
 */
const BlogHubPage = ({ onBookClick }: BlogHubPageProps) => {
  const { hubSlug } = useParams<{ hubSlug: string }>();
  const hub = hubSlug ? getHubBySlug(hubSlug) : undefined;

  // Hub-only routing — the blog ships without individual posts.
  if (!hub) return <Navigate to="/blog" replace />;

  const posts = getPostsByHubSlug(hub.slug);
  const pillar = posts.find((p) => p.hubGovernance?.postType === "pillar");
  const spokes = posts.filter((p) => p.slug !== pillar?.slug);
  const linkedRegions = (hub.linkedRegions ?? [])
    .map((slug) => getRegion(slug))
    .filter((r): r is NonNullable<ReturnType<typeof getRegion>> => Boolean(r));
  const origin = MASTER_REMIX.BRAND_URL || "";
  const url = `${origin}/blog/${hub.slug}`;

  return (
    <div className="min-h-screen bg-bone text-graphite antialiased">
      <Helmet>
        <title>{`${hub.name} | ${MASTER_REMIX.BRAND_NAME}`}</title>
        <meta name="description" content={hub.primaryTopic} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${hub.name} | ${MASTER_REMIX.BRAND_NAME}`} />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: origin || "/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${origin}/blog` },
              { "@type": "ListItem", position: 3, name: hub.name, item: url },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": url,
            name: hub.name,
            description: hub.primaryTopic,
            url,
            isPartOf: { "@type": "WebSite", "@id": `${origin}/#website`, name: MASTER_REMIX.BRAND_NAME },
            inLanguage: "en",
            hasPart: posts.map((p) => ({
              "@type": "BlogPosting",
              "@id": `${origin}/blog/${p.slug}#article`,
              headline: p.title,
              url: `${origin}/blog/${p.slug}`,
            })),
          })}
        </script>
      </Helmet>

      <TemplateNavigation />

      <main id="main" className="pt-24">
        <section className="border-b border-seam">
          <div className="container mx-auto max-w-5xl px-6 py-16 sm:py-24">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="h-1 w-8 bg-copper" />
              <span className="text-eyebrow uppercase tracking-[0.22em] text-mist">Hub</span>
            </div>
            <h1 className="mb-5 font-serif font-medium text-display-xl text-charcoal">
              {hub.name}
            </h1>
            <p className="max-w-2xl text-body-lg text-graphite">{hub.primaryTopic}</p>
          </div>
        </section>

        {pillar && (
          <section className="container mx-auto max-w-5xl px-6 py-12">
            <p className="mb-6 text-eyebrow uppercase tracking-[0.22em] text-mist">
              Pillar Guide
            </p>
            <BlogCard post={pillar} featured />
          </section>
        )}

        {spokes.length > 0 && (
          <section className="container mx-auto max-w-5xl px-6 pb-24">
            <p className="mb-6 text-eyebrow uppercase tracking-[0.22em] text-mist">
              Spoke Articles
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {spokes.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}

        {posts.length === 0 && (
          <section className="container mx-auto max-w-3xl px-6 py-24 text-center">
            <p className="mb-4 text-eyebrow uppercase tracking-[0.22em] text-mist">
              Editorial coming soon
            </p>
            <h2 className="mb-5 font-serif text-display-md text-charcoal">
              New writing on {hub.name.toLowerCase()} is being prepared.
            </h2>
            <p className="text-body-lg text-graphite">
              In the meantime, see where {MASTER_REMIX.BRAND_NAME} works on this in the field.
            </p>
          </section>
        )}

        {linkedRegions.length > 0 && (
          <section className="border-t border-seam bg-paper">
            <div className="container mx-auto max-w-5xl px-6 py-12">
              <p className="mb-5 text-eyebrow uppercase tracking-[0.22em] text-mist">
                Where we work on this
              </p>
              <ul className="flex flex-wrap gap-3">
                {linkedRegions.map((r) => (
                  <li key={r.slug}>
                    <Link
                      to={`/areas-we-serve/${r.slug}`}
                      className="inline-flex items-center gap-2 border border-seam bg-bone px-4 py-2 text-body-sm text-charcoal transition-colors hover:border-copper hover:text-forest"
                    >
                      {r.name} <ArrowRight size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>

      <TemplateFooter />
    </div>
  );
};

export default BlogHubPage;