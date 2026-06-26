import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { BlogPost } from "@/lib/blogData";

interface BlogFAQProps {
  faqs: NonNullable<BlogPost["faq"]>;
  title?: string;
  intro?: string;
}

/**
 * Accessible accordion FAQ used at the foot of each blog post. The
 * CSS class names (cochrane-faq-*) are intentionally preserved so the
 * BlogSchema speakable selectors continue to resolve.
 */
export const BlogFAQ = ({
  faqs,
  title = "Frequently Asked Questions",
  intro,
}: BlogFAQProps) => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="cochrane-faq-section my-16 border-t border-seam pt-12"
    >
      <header className="mb-8">
        <p className="mb-2 text-eyebrow uppercase tracking-[0.22em] text-mist">
          The questions we hear most
        </p>
        <h2
          id="faq-heading"
          className="font-serif font-medium text-display-lg text-charcoal"
        >
          {title}
        </h2>
        {intro && (
          <p id="faq-intro" className="mt-3 max-w-2xl text-body-lg text-graphite">
            {intro}
          </p>
        )}
      </header>

      <ul className="divide-y divide-seam border-y border-seam">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={i} id={`faq-${i}`} className="py-1">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-forest"
              >
                <span className="cochrane-faq-question font-serif text-display-sm text-charcoal">
                  {item.question}
                </span>
                <ChevronDown
                  className={`mt-1 h-5 w-5 flex-shrink-0 text-mist transition-transform ${
                    isOpen ? "rotate-180 text-copper" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="cochrane-faq-answer pb-6 pr-8 text-body-lg text-graphite leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
};