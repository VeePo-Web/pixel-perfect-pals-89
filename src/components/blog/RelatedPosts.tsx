import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blogData";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (posts.length === 0) return null;
  return (
    <div className="relative">
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group block min-w-[280px] flex-shrink-0 snap-center md:min-w-0 md:flex-shrink"
          >
            <article className="h-full overflow-hidden border border-seam bg-paper transition-all duration-300 hover:-translate-y-0.5 hover:border-copper/30 hover:shadow-heirloom">
              <div className="relative aspect-[16/10] overflow-hidden bg-muted/30">
                {post.featuredImage ? (
                  <img
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt}
                    width={600}
                    height={375}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-copper/10 via-bone to-muted/20" />
                )}
              </div>
              <div className="p-5">
                <div className="mb-3 inline-flex items-center gap-1.5">
                  <span className="h-1 w-4 bg-copper" />
                  <span className="text-eyebrow uppercase tracking-[0.22em] text-mist">
                    {post.category}
                  </span>
                </div>
                <h3 className="mb-3 line-clamp-2 font-serif font-medium text-display-sm text-charcoal transition-colors group-hover:text-forest">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-caption text-mist">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
      {posts.length > 1 && (
        <p
          aria-hidden
          className="mt-3 text-center text-caption text-mist md:hidden"
        >
          Swipe for more →
        </p>
      )}
    </div>
  );
};