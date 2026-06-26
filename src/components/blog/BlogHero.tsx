import { Clock, Calendar } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import type { BlogPost } from "@/lib/blogData";
import { formatDate } from "@/lib/blogUtils";

interface BlogHeroProps {
  post: BlogPost;
}

const Crumb = ({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) => (
  <nav aria-label="Breadcrumb" className="overflow-x-auto">
    <ol className="flex flex-nowrap items-center gap-2 text-caption text-mist">
      {items.map((item, i) => (
        <li key={i} className="flex shrink-0 items-center gap-2">
          {item.href ? (
            <Link to={item.href} className="hover:text-forest transition-colors">
              {item.label}
            </Link>
          ) : (
            <span
              className="text-charcoal"
              aria-current={i === items.length - 1 ? "page" : undefined}
            >
              {item.label}
            </span>
          )}
          {i < items.length - 1 && <span aria-hidden>/</span>}
        </li>
      ))}
    </ol>
  </nav>
);

export const BlogHero = ({ post }: BlogHeroProps) => {
  const reduce = useReducedMotion();
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    ...(post.hubGovernance?.hubName
      ? [{ label: post.hubGovernance.hubName, href: `/blog/${post.hubGovernance.hubSlug}` }]
      : []),
    { label: post.title },
  ];

  return (
    <>
      {post.featuredImage && (
        <Helmet>
          <link rel="preload" as="image" href={post.featuredImage.url} />
        </Helmet>
      )}

      {/* Breadcrumb strip */}
      <div className="border-b border-seam bg-bone/60">
        <div className="container mx-auto max-w-4xl px-4 py-3">
          <Crumb items={breadcrumbs} />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden py-12 sm:py-20 lg:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <motion.div
            initial={reduce ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-3"
          >
            <span className="text-eyebrow uppercase tracking-[0.22em] text-mist">
              The Essential Guide
            </span>
          </motion.div>

          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 border border-copper/30 bg-paper px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper/60 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-copper" />
              </span>
              <span className="text-eyebrow uppercase tracking-[0.22em] text-charcoal">
                {post.category}
              </span>
            </span>
          </motion.div>

          <motion.h1
            initial={reduce ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 font-serif font-medium text-display-xl text-charcoal leading-[1.04] tracking-tight"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={reduce ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-graphite"
          >
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-mist" />
              <time dateTime={post.publishedAt} className="text-body-sm">
                {formatDate(post.publishedAt)}
              </time>
            </span>
            <span className="hidden h-3 w-px bg-seam sm:block" />
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-mist" />
              <span className="text-body-sm">{post.readingTime} min read</span>
            </span>
          </motion.div>

          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex items-center gap-4 border-l-[3px] border-copper bg-paper p-4 pl-5"
          >
            <img
              src={post.author.image}
              alt={post.author.name}
              width={56}
              height={56}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-bone sm:h-14 sm:w-14"
            />
            <div>
              <p className="font-serif text-display-sm text-charcoal">{post.author.name}</p>
              <p className="text-body-sm text-mist">{post.author.role}</p>
            </div>
          </motion.div>

          <p className="sr-only blog-hero-excerpt">{post.excerpt}</p>
        </div>
      </section>

      {/* Featured image */}
      {post.featuredImage && (
        <section className="mb-10 sm:mb-16">
          <div className="container mx-auto max-w-5xl px-4">
            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-sm bg-muted/30"
              style={{
                aspectRatio: `${post.featuredImage.width}/${post.featuredImage.height}`,
              }}
            >
              <img
                src={post.featuredImage.url}
                alt={post.featuredImage.alt}
                width={post.featuredImage.width}
                height={post.featuredImage.height}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
};