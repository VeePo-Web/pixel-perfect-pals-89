import type { ReactNode } from "react";
import TemplateNavigation from "./TemplateNavigation";
import TemplateFooter from "./TemplateFooter";

interface TemplateLayoutProps {
  /** @deprecated The neutral template no longer wires a booking handler; prop is accepted for backward-compat and ignored. */
  onBookClick?: unknown;
  children: ReactNode;
}

/**
 * The single page chrome wrapper for every template route.
 * Mounts nav, main landmark, and footer. The neutral template ships
 * without a booking funnel — the chrome's primary CTA links to
 * /areas-we-serve. Remixes can layer a booking flow on top.
 */
const TemplateLayout = ({ children }: TemplateLayoutProps) => {
  return (
    <div className="min-h-screen bg-bone text-graphite antialiased">
      <TemplateNavigation />
      <main id="main" className="pt-20">
        {children}
      </main>
      <TemplateFooter />
    </div>
  );
};

export default TemplateLayout;
