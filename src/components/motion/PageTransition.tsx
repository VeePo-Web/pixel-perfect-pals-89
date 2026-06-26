import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * No-op page transition. Routes mount instantly with zero fade or motion
 * to keep navigation feeling native-app fast. Per-section reveals still
 * handle visual polish on scroll.
 */
const PageTransition = ({ children }: PageTransitionProps) => <>{children}</>;

export default PageTransition;
