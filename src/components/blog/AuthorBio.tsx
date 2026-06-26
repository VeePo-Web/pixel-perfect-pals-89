/**
 * AuthorBio — visible E-E-A-T surface (Victorious-SEO best practice).
 * Renders a small author card with photo, name, role, bio.
 * Reads from a passed-in author object (which a future post defines
 * inline or pulls from MASTER_REMIX.AUTHORS by id).
 */

import type { Author } from "@/config/template/remix-variables";

interface Props {
  author: Pick<Author, "name" | "role" | "bio" | "image" | "url">;
  /** Optional ISO date string — renders "Reviewed {date}" line. */
  reviewedAt?: string;
}

const AuthorBio = ({ author, reviewedAt }: Props) => {
  const initials = author.name
    .split(/\s+/)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <aside className="flex items-start gap-4 border-t border-seam py-8">
      <div className="h-14 w-14 flex-shrink-0 overflow-hidden bg-paper">
        {author.image ? (
          <img
            src={author.image}
            alt={author.name}
            width={56}
            height={56}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-serif text-display-sm text-graphite">
            {initials}
          </div>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-eyebrow uppercase tracking-[0.22em] text-mist">Written by</p>
        <p className="font-serif text-display-sm text-charcoal">
          {author.url ? (
            <a href={author.url} rel="author" className="hover:text-forest">
              {author.name}
            </a>
          ) : (
            author.name
          )}
        </p>
        <p className="text-body-sm text-graphite">{author.role}</p>
        {author.bio && <p className="mt-2 text-body-sm text-graphite">{author.bio}</p>}
        {reviewedAt && (
          <p className="mt-2 text-caption text-mist">
            Reviewed {new Date(reviewedAt).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        )}
      </div>
    </aside>
  );
};

export default AuthorBio;