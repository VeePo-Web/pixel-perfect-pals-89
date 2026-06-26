/**
 * <MasterLogo> — the only logo primitive any page or component should use.
 *
 * - Picks the correctly-cropped variant for its slot.
 * - Picks the correct **colorway** (black / navy / white) automatically:
 *     1. explicit `colorway` prop wins
 *     2. else `recommendedColorwayForSlot(slot, tradeColorway)`
 *     3. tradeColorway is read from `TRADE.identity.logoColorway` (defaults to "black")
 * - For nav and footer, uses native <picture> + <source media> so the browser
 *   downloads only the size it needs (perf budget — see PERFORMANCE_PLAYBOOK).
 * - Always sets width/height attrs so there is zero CLS.
 *
 * Usage:
 *   <MasterLogo slot="nav" />                    // auto colorway from trade config
 *   <MasterLogo slot="loading" />                // auto: white (dark surface)
 *   <MasterLogo slot="hero" colorway="white" />  // explicit override
 */

import {
  MASTER_LOGOS,
  recommendedColorwayForSlot,
  type LogoColorway,
  type EmblemSize,
  type TileSize,
  type MonogramSize,
  type WordmarkSize,
} from "./logo-registry";
import { MASTER } from "./identity";
import { TRADE } from "@/config/trade.config";

type ResponsiveSlot = "nav" | "footer";
type SingleSlot = "hero" | "large" | "medium" | "small" | "loading";
type EmblemSlot = "emblem";
type TilesSlot = "tiles";
type MonogramSlot = "monogram";
type WordmarkSlot = "wordmark";
type WordmarkGroundSlot = "wordmarkGround";
export type MasterLogoSlot =
  | ResponsiveSlot
  | SingleSlot
  | EmblemSlot
  | TilesSlot
  | MonogramSlot
  | WordmarkSlot
  | WordmarkGroundSlot;

interface MasterLogoProps {
  slot: MasterLogoSlot;
  /** Override the colorway for this instance. Otherwise auto-picked from
   * the slot's surface + the trade's chosen colorway. */
  colorway?: LogoColorway;
  className?: string;
  /** Override default alt (rare — usually leave unset) */
  alt?: string;
  /** eager for above-the-fold (nav, loading); lazy for below-the-fold */
  loading?: "eager" | "lazy";
  /** Optional click handler (e.g. nav lockup wrapping a Link) */
  onClick?: () => void;
  /** Emblem-only / Tiles-only / Monogram-only / Wordmark-only / WordmarkGround-only:
   * pick which px-edge file to start from. Browser still picks the right DPR
   * via srcset. Defaults: 400 for emblem/tiles/wordmark/wordmarkGround,
   * 128 for monogram. */
  size?: EmblemSize | TileSize | MonogramSize | WordmarkSize;
}

const ALT_DEFAULT = MASTER.brandName; // "Cochrane Master Builders"

const SLOT_HEIGHT: Record<MasterLogoSlot, string> = {
  nav: "h-9 sm:h-9 lg:h-10",
  footer: "h-16 md:h-20 lg:h-24",
  hero: "h-auto w-full max-w-xl",
  large: "h-auto w-full max-w-lg",
  medium: "h-auto w-full max-w-sm",
  small: "h-auto w-32",
  loading: "h-auto w-28",
  emblem: "h-auto w-auto",
  tiles: "h-auto w-auto",
  monogram: "h-auto w-auto",
  wordmark: "h-auto w-auto",
  wordmarkGround: "h-auto w-auto",
};

/** Read the trade's chosen colorway with a safe fallback. */
const tradeColorway: LogoColorway =
  ((TRADE.identity as { logoColorway?: LogoColorway }).logoColorway ??
    "black") as LogoColorway;

const MasterLogo = ({
  slot,
  colorway,
  className = "",
  alt = ALT_DEFAULT,
  loading,
  onClick,
  size = 400,
}: MasterLogoProps) => {
  const sizing = SLOT_HEIGHT[slot];
  const eager = loading ?? (slot === "nav" || slot === "loading" ? "eager" : "lazy");
  const fetchPriority = eager === "eager" ? "high" : "low";

  // Resolve colorway: explicit prop > recommended for slot > trade default
  const resolvedColorway: LogoColorway =
    colorway ?? recommendedColorwayForSlot(slot as never, tradeColorway);
  const set = MASTER_LOGOS[resolvedColorway];

  // Emblem (square, no wordmark) — uses srcset so the browser picks the
  // best DPR variant. `size` selects the base file; the larger files are
  // offered as 2x/3x descriptors for crisp retina rendering.
  if (slot === "emblem") {
    const emblem = set.emblem;
    const ladder: EmblemSize[] = [100, 200, 400, 800, 1200, 2400];
    const emblemSize: EmblemSize = (ladder as readonly number[]).includes(size as number)
      ? (size as EmblemSize)
      : 400;
    const base = emblem[emblemSize];
    const idx = ladder.indexOf(emblemSize);
    const x2 = ladder[idx + 1];
    const x3 = ladder[idx + 2];
    const srcSet = [
      `${base} 1x`,
      x2 ? `${emblem[x2]} 2x` : null,
      x3 ? `${emblem[x3]} 3x` : null,
    ]
      .filter(Boolean)
      .join(", ");
    return (
      <img
        src={base}
        srcSet={srcSet}
        alt={alt}
        className={`${sizing} object-contain ${className}`}
        loading={eager}
        // @ts-expect-error - non-standard but supported attr
        fetchpriority={fetchPriority}
        decoding="async"
        width={emblemSize}
        height={emblemSize}
        onClick={onClick}
      />
    );
  }

  // Tiles (exploded mark — three separated panels). Same srcset ladder as
  // emblem so retina screens stay crisp without eager-fetching the 2400.
  if (slot === "tiles") {
    const tiles = set.tiles;
    const ladder: TileSize[] = [100, 200, 400, 800, 1200, 2400];
    const tileSize: TileSize = (ladder as readonly number[]).includes(size as number)
      ? (size as TileSize)
      : 400;
    const base = tiles[tileSize];
    const idx = ladder.indexOf(tileSize);
    const x2 = ladder[idx + 1];
    const x3 = ladder[idx + 2];
    const srcSet = [
      `${base} 1x`,
      x2 ? `${tiles[x2]} 2x` : null,
      x3 ? `${tiles[x3]} 3x` : null,
    ]
      .filter(Boolean)
      .join(", ");
    return (
      <img
        src={base}
        srcSet={srcSet}
        alt={alt}
        className={`${sizing} object-contain ${className}`}
        loading={eager}
        // @ts-expect-error - non-standard but supported attr
        fetchpriority={fetchPriority}
        decoding="async"
        width={tileSize}
        height={tileSize}
        onClick={onClick}
      />
    );
  }

  // Monogram (handwritten "MB" signature). Own size ladder — capped at 1024.
  if (slot === "monogram") {
    const monogram = set.monogram;
    const ladder: MonogramSize[] = [64, 128, 256, 512, 1024];
    const monoSize: MonogramSize = (ladder as readonly number[]).includes(size as number)
      ? (size as MonogramSize)
      : 128;
    const base = monogram[monoSize];
    const idx = ladder.indexOf(monoSize);
    const x2 = ladder[idx + 1];
    const x3 = ladder[idx + 2];
    const srcSet = [
      `${base} 1x`,
      x2 ? `${monogram[x2]} 2x` : null,
      x3 ? `${monogram[x3]} 3x` : null,
    ]
      .filter(Boolean)
      .join(", ");
    return (
      <img
        src={base}
        srcSet={srcSet}
        alt={alt}
        className={`${sizing} object-contain ${className}`}
        loading={eager}
        // @ts-expect-error - non-standard but supported attr
        fetchpriority={fetchPriority}
        decoding="async"
        width={monoSize}
        height={monoSize}
        onClick={onClick}
      />
    );
  }

  // Wordmark (pure typography, no emblem). ~5:1 aspect ratio. Same srcset
  // ladder strategy as emblem/tiles/monogram so retina screens stay crisp.
  if (slot === "wordmark") {
    const wordmark = set.wordmark;
    const ladder: WordmarkSize[] = [200, 400, 800, 1200, 2400];
    const wmSize: WordmarkSize = (ladder as readonly number[]).includes(size as number)
      ? (size as WordmarkSize)
      : 400;
    const base = wordmark[wmSize];
    const idx = ladder.indexOf(wmSize);
    const x2 = ladder[idx + 1];
    const x3 = ladder[idx + 2];
    const srcSet = [
      `${base} 1x`,
      x2 ? `${wordmark[x2]} 2x` : null,
      x3 ? `${wordmark[x3]} 3x` : null,
    ]
      .filter(Boolean)
      .join(", ");
    // Intrinsic ~5:1 aspect — width:height roughly 5:1. Set CLS box accordingly.
    const intrinsicHeight = Math.round(wmSize / 5);
    return (
      <img
        src={base}
        srcSet={srcSet}
        alt={alt}
        className={`${sizing} object-contain ${className}`}
        loading={eager}
        // @ts-expect-error - non-standard but supported attr
        fetchpriority={fetchPriority}
        decoding="async"
        width={wmSize}
        height={intrinsicHeight}
        onClick={onClick}
      />
    );
  }

  // Wordmark Ground (drafted plumb-line + base rule). Same size ladder as
  // plain wordmark, but ~3.5:1 aspect because the plumb adds vertical room.
  if (slot === "wordmarkGround") {
    const ground = set.wordmarkGround;
    const ladder: WordmarkSize[] = [200, 400, 800, 1200, 2400];
    const wgSize: WordmarkSize = (ladder as readonly number[]).includes(size as number)
      ? (size as WordmarkSize)
      : 400;
    const base = ground[wgSize];
    const idx = ladder.indexOf(wgSize);
    const x2 = ladder[idx + 1];
    const x3 = ladder[idx + 2];
    const srcSet = [
      `${base} 1x`,
      x2 ? `${ground[x2]} 2x` : null,
      x3 ? `${ground[x3]} 3x` : null,
    ]
      .filter(Boolean)
      .join(", ");
    // Intrinsic ~3.5:1 aspect — drafting marks add height vs the plain wordmark.
    const intrinsicHeight = Math.round(wgSize / 3.5);
    return (
      <img
        src={base}
        srcSet={srcSet}
        alt={alt}
        className={`${sizing} object-contain ${className}`}
        loading={eager}
        // @ts-expect-error - non-standard but supported attr
        fetchpriority={fetchPriority}
        decoding="async"
        width={wgSize}
        height={intrinsicHeight}
        onClick={onClick}
      />
    );
  }

  // Responsive slots use <picture> with <source media> queries
  if (slot === "nav") {
    return (
      <picture onClick={onClick} className={`inline-block ${onClick ? "cursor-pointer" : ""}`}>
        <source media="(min-width: 1024px)" srcSet={set.nav.lg} />
        <source media="(min-width: 640px)" srcSet={set.nav.md} />
        <img
          src={set.nav.sm}
          alt={alt}
          className={`${sizing} w-auto object-contain ${className}`}
          loading={eager}
          // @ts-expect-error - non-standard but supported attr
          fetchpriority={fetchPriority}
          decoding="async"
          width={280}
          height={224}
        />
      </picture>
    );
  }

  if (slot === "footer") {
    return (
      <picture onClick={onClick} className="inline-block">
        <source media="(min-width: 1024px)" srcSet={set.footer.lg} />
        <source media="(min-width: 768px)" srcSet={set.footer.md} />
        <img
          src={set.footer.sm}
          alt={alt}
          className={`${sizing} w-auto object-contain ${className}`}
          loading={eager}
          decoding="async"
          width={400}
          height={320}
        />
      </picture>
    );
  }

  // Single-source slots
  const src =
    slot === "hero"
      ? set.hero
      : slot === "large"
      ? set.large
      : slot === "medium"
      ? set.medium
      : set.small; // small + loading both use the small file

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizing} object-contain ${className}`}
      loading={eager}
      // @ts-expect-error - non-standard but supported attr
      fetchpriority={fetchPriority}
      decoding="async"
      onClick={onClick}
    />
  );
};

export default MasterLogo;
