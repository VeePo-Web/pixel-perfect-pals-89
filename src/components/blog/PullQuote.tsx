import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PullQuoteProps {
  children: ReactNode;
  attribution?: string;
  className?: string;
}

export const PullQuote = ({ children, attribution, className }: PullQuoteProps) => {
  const reduce = useReducedMotion();
  return (
    <motion.aside
      initial={reduce ? {} : { opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative my-12 py-8 pl-8 pr-6 border-l-[3px] border-primary",
        "bg-gradient-to-r from-primary/[0.03] to-transparent",
        className,
      )}
      role="complementary"
      aria-label="Pull quote"
    >
      <span
        className="pointer-events-none absolute -left-2 -top-4 select-none font-serif text-[120px] leading-none text-primary/10"
        aria-hidden
      >
        “
      </span>
      <blockquote className="relative">
        <p className="font-serif text-pull-quote text-foreground/90">{children}</p>
        {attribution && (
          <footer className="mt-4">
            <cite className="not-italic text-body-sm font-medium tracking-wide text-muted-foreground">
              — {attribution}
            </cite>
          </footer>
        )}
      </blockquote>
    </motion.aside>
  );
};