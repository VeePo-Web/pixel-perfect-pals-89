import { Link } from "react-router-dom";
import { Clock, Calendar } from "lucide-react";
import type { BlogPost } from "@/lib/blogData";
import { formatDate } from "@/lib/blogUtils";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-sm border border-seam bg-paper transition-all duration-300 hover:-translate-y-0.5 hover:border-copper/30 hover:shadow-heirloom"
    >
      <article>
        <div className="overflow-hidden aspect-[16/10] bg-muted">
          <img
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            width={post.featuredImage.width}
            height={post.featuredImage.height}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className={featured ? "p-7 sm:p-9" : "p-6"}>
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-block h-1 w-6 bg-copper" />
            <span className="text-eyebrow uppercase tracking-[0.22em] text-mist">
              {post.category}
            </span>
          </div>

          <h3
            className={`font-serif font-medium tracking-tight text-charcoal transition-colors group-hover:text-forest ${
              featured ? "text-display-md mb-4" : "text-display-sm mb-3"
            }`}
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            {post.title}
          </h3>

          <p
            className={`mb-5 text-graphite ${
              featured ? "text-body-lg" : "text-body"
            }`}
          >
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-caption text-mist">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime} min read
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};