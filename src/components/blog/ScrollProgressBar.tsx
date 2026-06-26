import { useEffect, useState } from "react";

/** Top-of-viewport progress bar fed by document scroll. Pure CSS transform. */
export const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-40 h-0.5 bg-transparent"
    >
      <div
        className="h-full origin-left bg-copper transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};