import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import type { Community } from "@/data/communities";

interface CommunityCardProps {
  community: Community;
  showRegion?: boolean;
}

const tierLabel: Record<number, string> = {
  1: "Primary",
  2: "Regional",
  3: "Local",
};

const CommunityCard = ({ community, showRegion = false }: CommunityCardProps) => (
  <Link
    to={`/areas-we-serve/${community.region}/${community.slug}`}
    className="group block border border-seam rounded p-6 hover:border-forest/40 hover:shadow-editorial transition-all duration-300 bg-paper"
  >
    <div className="flex items-start justify-between gap-3 mb-3">
      <div className="flex items-center gap-2">
        <MapPin size={14} className="text-forest/60 flex-shrink-0 mt-0.5" />
        <span className="font-body text-caption text-mist uppercase tracking-[0.12em]">
          {community.city}{showRegion ? `, ${community.province}` : ""}
        </span>
      </div>
      <span className="font-body text-caption text-forest/60 uppercase tracking-[0.1em] flex-shrink-0">
        {tierLabel[community.tier]}
      </span>
    </div>

    <h3 className="font-display text-display-sm text-charcoal mb-2 group-hover:text-forest transition-colors duration-300">
      {community.name}
    </h3>

    <p className="font-body text-body-sm text-graphite leading-relaxed line-clamp-2 mb-4">
      {community.shortDescription}
    </p>

    <div className="flex items-center gap-2 font-body text-body-sm text-forest font-medium">
      <span>View Community</span>
      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
    </div>
  </Link>
);

export default CommunityCard;
