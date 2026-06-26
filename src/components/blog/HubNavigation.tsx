import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/blogData";
import { getPostBySlug } from "@/lib/blogData";
import { getHubById, hubRegistry } from "@/lib/hubRegistry";

interface HubNavigationProps {
  post: BlogPost;
}

/**
 * Governance-driven internal link block. Renders crawlable <a> elements
 * pointing at the hub, pillar, related posts, and service pages declared
 * in `post.hubGovernance.internalLinks`. Strengthens topical clustering.
 */
export const HubNavigation = ({ post }: HubNavigationProps) => {
  const governance = post.hubGovernance;
  if (!governance?.internalLinks) return null;

  const { internalLinks } = governance;
  const hub = getHubById(governance.hubId);

  const resolveRef = (ref: string) => (ref.includes("/") ? ref.split("/").pop()! : ref);

  const related = internalLinks.relatedPosts
    .map((ref) => {
      const slug = resolveRef(ref);
      const r = getPostBySlug(slug);
      return r ? { title: r.title, url: `/blog/${r.slug}` } : null;
    })
    .filter((x): x is NonNullable<typeof x> => !!x)
    .filter((x) => x.url !== `/blog/${post.slug}`)
    .slice(0, 3);

  let pillarLink: { title: string; url: string } | null = null;
  if (internalLinks.pillar) {
    const pillarSlug = resolveRef(internalLinks.pillar);
    const pillar = getPostBySlug(pillarSlug);
    pillarLink = pillar
      ? { title: pillar.title, url: `/blog/${pillar.slug}` }
      : { title: hub ? `${hub.name} Guide` : "Pillar Guide", url: internalLinks.pillar };
    if (pillarLink.url === `/blog/${post.slug}`) pillarLink = null;
  }

  const crossHub = internalLinks.crossHub
    ? hubRegistry.find((h) => h.slug === resolveRef(internalLinks.crossHub!))
    : null;

  const hasAny =
    hub || pillarLink || related.length > 0 || internalLinks.servicePages.length > 0 || crossHub;
  if (!hasAny) return null;

  const Row = ({ to, label }: { to: string; label: string }) => (
    <li>
      <Link
        to={to}
        className="group inline-flex items-center gap-2 py-2 text-body text-graphite transition-colors hover:text-forest"
      >
        <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 text-copper transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        <span>{label}</span>
      </Link>
    </li>
  );

  return (
    <nav aria-label="Hub navigation" className="mt-16 border-t border-seam pt-8">
      <p className="mb-4 text-eyebrow uppercase tracking-[0.22em] text-mist">
        Explore this topic
      </p>
      <ul className="space-y-0.5">
        {hub && <Row to={hub.hubUrl} label={hub.name} />}
        {pillarLink && <Row to={pillarLink.url} label={pillarLink.title} />}
        {related.map((r) => (
          <Row key={r.url} to={r.url} label={r.title} />
        ))}
        {internalLinks.servicePages.map((u) => (
          <Row key={u} to={u} label={u === "/areas-we-serve" ? "Areas we serve" : u} />
        ))}
        {crossHub && <Row to={crossHub.hubUrl} label={crossHub.name} />}
      </ul>
    </nav>
  );
};