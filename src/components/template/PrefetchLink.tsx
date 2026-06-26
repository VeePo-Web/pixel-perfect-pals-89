import { Link, type LinkProps } from "react-router-dom";
import { useCallback, type MouseEvent, type FocusEvent, type TouchEvent } from "react";

type Prefetcher = () => Promise<unknown>;

// Map of route path -> dynamic import factory. Centralised so nav/footer
// can warm any route's chunk without each link knowing the import path.
const ROUTE_PREFETCHERS: Record<string, Prefetcher> = {
  "/areas-we-serve": () => import("@/pages/AreasHub"),
};

const warmed = new Set<string>();

export const prefetchRoute = (path: string) => {
  if (warmed.has(path)) return;
  const fn = ROUTE_PREFETCHERS[path];
  if (!fn) return;
  warmed.add(path);
  fn().catch(() => warmed.delete(path));
};

export const prefetchIdle = (paths: string[]) => {
  const run = () => paths.forEach(prefetchRoute);
  if (typeof window === "undefined") return;
  const ric = (window as unknown as { requestIdleCallback?: (cb: () => void) => void }).requestIdleCallback;
  if (ric) ric(run);
  else setTimeout(run, 200);
};

interface PrefetchLinkProps extends LinkProps {
  to: string;
}

const PrefetchLink = ({ to, onMouseEnter, onFocus, onTouchStart, ...rest }: PrefetchLinkProps) => {
  const warm = useCallback(() => prefetchRoute(typeof to === "string" ? to : ""), [to]);
  return (
    <Link
      to={to}
      onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => { warm(); onMouseEnter?.(e); }}
      onFocus={(e: FocusEvent<HTMLAnchorElement>) => { warm(); onFocus?.(e); }}
      onTouchStart={(e: TouchEvent<HTMLAnchorElement>) => { warm(); onTouchStart?.(e); }}
      {...rest}
    />
  );
};

export default PrefetchLink;
