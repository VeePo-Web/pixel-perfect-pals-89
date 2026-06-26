import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed right-6 z-30 inline-flex h-11 w-11 items-center justify-center rounded-sm border border-seam bg-paper text-charcoal shadow-subtle transition-all hover:border-forest hover:text-forest bottom-6 max-lg:bottom-24"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
};

export default BackToTop;
