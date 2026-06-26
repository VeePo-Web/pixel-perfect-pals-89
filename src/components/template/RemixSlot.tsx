import type { ReactNode } from "react";

interface RemixSlotProps {
  /** The variable token this slot fills, e.g. "SERVICE" or "HERO_IMAGE". */
  name: string;
  /** Optional human note about what to bind here. */
  hint?: string;
  children: ReactNode;
}

/**
 * Dev-only slot outliner. Add `?remix-debug=1` to the URL to visualise
 * which `{VARIABLE}` each region of the template binds. Otherwise renders
 * children transparently with no markup overhead.
 */
const RemixSlot = ({ name, hint, children }: RemixSlotProps) => {
  const debug =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("remix-debug") === "1";

  if (!debug) return <>{children}</>;

  return (
    <div className="relative outline outline-1 outline-offset-2 outline-clay/60">
      <span className="pointer-events-none absolute -top-3 left-2 z-50 inline-flex items-center gap-2 bg-clay px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-paper">
        {`{${name}}`}
        {hint && <span className="text-paper/80 normal-case tracking-normal">— {hint}</span>}
      </span>
      {children}
    </div>
  );
};

export default RemixSlot;
