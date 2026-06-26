import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getBlogImage } from "@/lib/blogImages";
import { generateBlogSlug } from "@/lib/blogUtils";
import { EditorialImage } from "./EditorialImage";

interface BlogContentProps {
  content: string;
}

const SectionDivider = () => (
  <div
    className="my-12 flex items-center justify-center gap-3"
    aria-hidden
  >
    <span className="h-px w-12 bg-seam" />
    <span className="h-1.5 w-1.5 rounded-full bg-copper/60" />
    <span className="h-px w-12 bg-seam" />
    <span className="sr-only">Section break</span>
  </div>
);

const EditorialNumber = ({ n }: { n: number }) => {
  const reduce = useReducedMotion();
  return (
    <motion.span
      initial={reduce ? {} : { opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      aria-hidden
      className="pointer-events-none absolute -left-14 top-0 hidden select-none font-serif text-6xl font-medium text-copper/15 lg:block"
    >
      {n.toString().padStart(2, "0")}
    </motion.span>
  );
};

const textOf = (children: unknown): string => {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(textOf).join("");
  if (children && typeof children === "object" && "props" in (children as object)) {
    // @ts-expect-error narrowed below
    return textOf((children as { props: { children: unknown } }).props.children);
  }
  return "";
};

export const BlogContent = ({ content }: BlogContentProps) => {
  const h2Index = useRef(0);
  useEffect(() => {
    h2Index.current = 0;
  }, [content]);

  return (
    <article
      className="prose prose-lg max-w-none break-words [overflow-wrap:anywhere]
        prose-headings:font-serif prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-charcoal
        prose-h2:text-display-md prose-h2:mt-16 prose-h2:mb-6 prose-h2:scroll-mt-24 prose-h2:relative
        prose-h3:font-body prose-h3:text-eyebrow prose-h3:uppercase prose-h3:tracking-[0.2em] prose-h3:font-semibold prose-h3:text-copper prose-h3:mt-10 prose-h3:mb-3 prose-h3:scroll-mt-24
        prose-h4:font-body prose-h4:text-body-sm prose-h4:uppercase prose-h4:tracking-[0.15em] prose-h4:font-medium prose-h4:text-mist prose-h4:mt-8 prose-h4:mb-3
        prose-p:text-graphite prose-p:leading-[1.75] prose-p:mb-6 prose-p:text-body-lg
        prose-strong:text-charcoal prose-strong:font-semibold
        prose-a:text-forest prose-a:no-underline prose-a:font-medium prose-a:border-b prose-a:border-copper/40 hover:prose-a:border-copper
        prose-ul:my-6 prose-ul:list-none prose-ul:pl-0
        prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
        prose-li:text-graphite prose-li:mb-3 prose-li:text-body-lg
        prose-blockquote:border-l-[3px] prose-blockquote:border-copper prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:my-10
        prose-blockquote:bg-gradient-to-r prose-blockquote:from-copper/[0.04] prose-blockquote:to-transparent
        prose-blockquote:py-5 prose-blockquote:pr-4 prose-blockquote:font-serif prose-blockquote:font-light prose-blockquote:text-2xl prose-blockquote:text-charcoal
        prose-code:text-forest prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:text-sm
        prose-pre:bg-charcoal prose-pre:text-bone prose-pre:p-5 prose-pre:rounded-sm prose-pre:overflow-x-auto"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children, ...props }) => {
            const txt = textOf(children).trim();
            // [download:slug] — no-op slot (downloads gate deferred)
            if (/^\[download:[a-z0-9-]+\]$/.test(txt)) return null;
            // ![image-key] — resolve through library
            const imgMatch = txt.match(/^!\[([a-z0-9-]+)(?:\|(.+))?\]$/);
            if (imgMatch) {
              const data = getBlogImage(imgMatch[1]);
              if (data) {
                return (
                  <EditorialImage
                    src={data.url}
                    alt={data.alt}
                    caption={imgMatch[2] || data.caption}
                    credit={data.credit}
                    width={data.width}
                    height={data.height}
                    srcSet={data.srcSet}
                  />
                );
              }
              return null;
            }
            return <p {...props}>{children}</p>;
          },
          a: ({ href, children, ...props }) => {
            const isInternal = href?.startsWith("/");
            if (isInternal) {
              return (
                <Link to={href!} {...(props as object)}>
                  {children}
                </Link>
              );
            }
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                {children}
              </a>
            );
          },
          h2: ({ children, ...props }) => {
            h2Index.current += 1;
            const idx = h2Index.current;
            const id = generateBlogSlug(textOf(children));
            return (
              <>
                {idx > 1 && <SectionDivider />}
                <h2 id={id} className="relative" {...props}>
                  <EditorialNumber n={idx} />
                  {children}
                </h2>
              </>
            );
          },
          h3: ({ children, ...props }) => (
            <h3 id={generateBlogSlug(textOf(children))} {...props}>
              {children}
            </h3>
          ),
          ul: ({ children, ...props }) => (
            <ul className="space-y-3" {...props}>
              {children}
            </ul>
          ),
          li: ({ children, ...props }) => (
            <li className="flex items-start gap-3" {...props}>
              <span
                aria-hidden
                className="mt-3 h-1.5 w-1.5 flex-shrink-0 bg-copper"
              />
              <span>{children}</span>
            </li>
          ),
          img: ({ src, alt }) => {
            const data = getBlogImage((src ?? "").replace(/^!\[|\]$/g, ""));
            if (data) {
              return (
                <EditorialImage
                  src={data.url}
                  alt={data.alt}
                  caption={data.caption}
                  credit={data.credit}
                  width={data.width}
                  height={data.height}
                  srcSet={data.srcSet}
                />
              );
            }
            return <EditorialImage src={src ?? ""} alt={alt ?? ""} />;
          },
          table: ({ children, ...props }) => (
            <div className="relative -mx-4 my-8 overflow-x-auto px-4">
              <table
                className="w-full min-w-[280px] border-collapse border border-seam text-sm sm:min-w-[500px]"
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th
              className="border-b border-seam bg-muted/40 px-4 py-3 text-left text-eyebrow uppercase tracking-wider text-charcoal"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="border-b border-seam/60 px-4 py-3 text-graphite" {...props}>
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};