import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface MosaicItem {
  src: string;
  alt: string;
  caption?: string;
  /** Tailwind aspect class. Default chosen by layout. */
  aspect?: string;
}

interface ImageMosaicProps {
  items: MosaicItem[];
  /** Layout shape. Default '3-up'. */
  layout?: "3-up" | "4-up";
  className?: string;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface MosaicTileProps {
  item: MosaicItem;
  index: number;
  className: string;
  defaultAspect: string;
}

const MosaicTile = ({ item, index, className, defaultAspect }: MosaicTileProps) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  return (
    <motion.figure
      ref={ref}
      className={`relative bg-paper ${className}`}
      initial={{ opacity: 0, y: reduced ? 0 : 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 12 }}
      transition={{
        duration: reduced ? 0.2 : 0.7,
        delay: reduced ? 0 : index * 0.06,
        ease: EASE,
      }}
    >
      <div className={`relative w-full overflow-hidden ${item.aspect ?? defaultAspect}`}>
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      {item.caption && (
        <figcaption className="border-t border-seam px-4 py-3 text-caption text-mist">
          {item.caption}
        </figcaption>
      )}
    </motion.figure>
  );
};

/**
 * Asymmetric editorial photo grid.
 * - 3-up: tall feature tile + two shorter companions
 * - 4-up: 2×2 with one tile spanning two rows for visual rhythm
 * Hairline `bg-seam` 1px gaps via `gap-px`. Scroll-reveal cascades each tile.
 */
const ImageMosaic = ({ items, layout = "3-up", className = "" }: ImageMosaicProps) => {
  if (layout === "3-up") {
    const [a, b, c] = items;
    if (!a || !b || !c) return null;
    return (
      <div className={`grid grid-cols-1 gap-px bg-seam md:grid-cols-3 md:grid-rows-2 ${className}`}>
        <MosaicTile item={a} index={0} className="md:col-span-2 md:row-span-2" defaultAspect="aspect-[4/5] md:aspect-auto md:h-full" />
        <MosaicTile item={b} index={1} className="" defaultAspect="aspect-[4/3] md:aspect-auto md:h-full" />
        <MosaicTile item={c} index={2} className="" defaultAspect="aspect-[4/3] md:aspect-auto md:h-full" />
      </div>
    );
  }

  // 4-up: 2×2 with first tile spanning two rows
  const [a, b, c, d] = items;
  if (!a || !b || !c || !d) return null;
  return (
    <div className={`grid grid-cols-1 gap-px bg-seam md:grid-cols-3 md:grid-rows-2 ${className}`}>
      <MosaicTile item={a} index={0} className="md:row-span-2" defaultAspect="aspect-[4/5] md:aspect-auto md:h-full" />
      <MosaicTile item={b} index={1} className="" defaultAspect="aspect-[4/3] md:aspect-auto md:h-full" />
      <MosaicTile item={c} index={2} className="" defaultAspect="aspect-[4/3] md:aspect-auto md:h-full" />
      <MosaicTile item={d} index={3} className="md:col-span-2" defaultAspect="aspect-[16/9] md:aspect-auto md:h-full" />
    </div>
  );
};

export default ImageMosaic;
