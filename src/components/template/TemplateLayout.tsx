import type { ReactNode } from "react";
import TemplateNavigation from "./TemplateNavigation";
import TemplateFooter from "./TemplateFooter";
import type { BookingClickHandler } from "@/config/drywall-booking";

interface TemplateLayoutProps {
  onBookClick?: BookingClickHandler;
  children: ReactNode;
}

/**
 * The single page chrome wrapper for every template route.
 * Mounts nav, main landmark, and footer. Booking modal is mounted
 * once at App.tsx — never per-page.
 */
const TemplateLayout = ({ onBookClick, children }: TemplateLayoutProps) => {
  return (
    <div className="min-h-screen bg-bone text-graphite antialiased">
      <TemplateNavigation onBookClick={onBookClick} />
      <main id="main" className="pt-20">
        {children}
      </main>
      <TemplateFooter onBookClick={onBookClick} />
    </div>
  );
};

export default TemplateLayout;
