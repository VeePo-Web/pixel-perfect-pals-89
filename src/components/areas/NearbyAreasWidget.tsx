import { getNearestCommunities } from "@/data/communities";
import CommunityCard from "./CommunityCard";

interface NearbyAreasWidgetProps {
  currentSlug: string;
  communityName: string;
}

const NearbyAreasWidget = ({ currentSlug, communityName }: NearbyAreasWidgetProps) => {
  const nearby = getNearestCommunities(currentSlug, 4);

  if (nearby.length === 0) return null;

  return (
    <section className="section-y bg-bone">
      <div className="container mx-auto px-6">
        <div className="mb-10">
          <p className="font-body text-eyebrow text-forest mb-3">Also Serving Nearby</p>
          <h2 className="font-display text-display-md text-charcoal">
            Communities Near {communityName}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {nearby.map((community) => (
            <CommunityCard key={community.slug} community={community} showRegion />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NearbyAreasWidget;
