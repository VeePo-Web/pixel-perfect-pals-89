import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazyMountProps {
  children: ReactNode;
  /** Distance before viewport to start mounting. Default 600px. */
  rootMargin?: string;
  /** Min height placeholder to keep CLS = 0. */
  minHeight?: number | string;
  /** Render immediately (skip observation). */
  eager?: boolean;
}

/**
 * Mounts its children only when within `rootMargin` of the viewport.
 * Keeps below-the-fold blocks (heavy media, lazy chunks) out of the
 * initial render so first paint stays fast.
 */
const LazyMount = ({ children, rootMargin = "600px 0px", minHeight = 240, eager = false }: LazyMountProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(eager);

  useEffect(() => {
    if (eager || show || !ref.current) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const node = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [eager, show, rootMargin]);

  return (
    <div ref={ref} style={!show ? { minHeight } : undefined}>
      {show ? children : null}
    </div>
  );
};

export default LazyMount;
