import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EditorialImageProps {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  width?: number;
  height?: number;
  variant?: "default" | "full-bleed" | "inset";
  priority?: boolean;
  srcSet?: string;
  sizes?: string;
  className?: string;
}

/**
 * Magazine-style image with caption and credit. SEO-friendly: explicit
 * dimensions + lazy by default. Honors prefers-reduced-motion.
 */
export const EditorialImage = ({
  src,
  alt,
  caption,
  credit,
  width = 1200,
  height = 675,
  variant = "default",
  priority = false,
  srcSet,
  sizes = "(max-width: 480px) 480px, (max-width: 800px) 800px, 1200px",
  className,
}: EditorialImageProps) => {
  const reduce = useReducedMotion();
  return (
    <motion.figure
      initial={reduce ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "my-8 sm:my-12",
        variant === "full-bleed" && "-mx-4 sm:-mx-8 lg:-mx-16",
        variant === "inset" && "mx-4 sm:mx-8 lg:mx-12",
        className,
      )}
    >
      <div
        className="relative overflow-hidden rounded-sm bg-muted/30"
        style={{ aspectRatio: `${width}/${height}` }}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          {...(srcSet ? { srcSet, sizes } : {})}
          className="w-full h-auto object-cover transition-transform duration-700 ease-out hover:scale-[1.02] [@media(hover:none)]:hover:scale-100"
          style={{ aspectRatio: `${width}/${height}` }}
        />
      </div>
      {(caption || credit) && (
        <figcaption className="mt-3 px-1 text-body-sm text-muted-foreground">
          {caption && <p className="leading-relaxed">{caption}</p>}
          {credit && (
            <span className="mt-1 block text-eyebrow uppercase tracking-wider text-muted-foreground/70">
              Photo: {credit}
            </span>
          )}
        </figcaption>
      )}
    </motion.figure>
  );
};

export default EditorialImage;