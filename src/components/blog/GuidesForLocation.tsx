/**
 * GuidesForLocation — cross-surface rail rendered on Areas pages
 * (community / region). Lists blog posts whose `about` field binds
 * them to the current location. Renders nothing when no posts match,
 * so it's safe to drop on every leaf page.
 */

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blogData";

interface Props {
  locationName: string;
  posts: BlogPost[];
}

const GuidesForLocation = ({ locationName, posts }: Props) => {
  if (posts.length === 0) return null;
  return (
    <section className="border-t border-seam bg-paper">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <p className="font-eyebrow text-forest mb-3 uppercase tracking-[0.18em]">
          Guides for {locationName}
        </p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <li key={p.slug}>
              <Link
                to={`/blog/${p.hubGovernance?.hubSlug ?? "x"}/${p.slug}`}
                className="group block border border-seam bg-bone p-5 transition-colors hover:border-copper"
              >
                <p className="text-caption text-mist uppercase tracking-[0.15em]">{p.category}</p>
                <h3 className="mt-2 font-serif text-display-sm text-charcoal group-hover:text-forest">
                  {p.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-body-sm text-forest">
                  Read <ArrowRight size={14} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default GuidesForLocation;