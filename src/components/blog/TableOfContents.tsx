import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/blogUtils";

interface TableOfContentsProps {
  items: TocItem[];
}

export const TableOfContents = ({ items }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0% -55% 0%" },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="sticky top-28 border-l border-seam pl-5">
      <p className="mb-4 text-eyebrow uppercase tracking-[0.22em] text-mist">
        In this guide
      </p>
      <nav>
        <ul className="space-y-1.5 text-body-sm">
          {items.map((item) => {
            const active = activeId === item.id;
            return (
              <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className={`block border-l-2 py-1 pl-3 transition-colors ${
                    active
                      ? "border-copper font-medium text-charcoal"
                      : "border-transparent text-mist hover:text-charcoal"
                  }`}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};