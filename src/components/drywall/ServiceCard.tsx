import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  summary: string;
  range?: string;
  href: string;
  cta?: string;
}

const ServiceCard = ({ title, summary, range, href, cta = "Learn more" }: ServiceCardProps) => {
  return (
    <Link
      to={href}
      className="group flex h-full flex-col border border-seam bg-paper p-8 transition-all hover:border-forest hover:shadow-editorial"
    >
      <h3 className="font-display text-display-sm text-charcoal">{title}</h3>
      {range && <p className="font-eyebrow mt-3">{range}</p>}
      <p className="mt-4 flex-1 text-graphite">{summary}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest">
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
};

export default ServiceCard;
