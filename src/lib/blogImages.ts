/**
 * Blog Image Library — keyed lookup for use inside markdown via the
 * `![image-key]` marker recognised by BlogContent.
 *
 * Generic scaffold. Add your own entries with proper alt text + dimensions
 * per trade. Keys are stable string identifiers; never URLs.
 */

export interface BlogImage {
  url: string;
  alt: string;
  caption?: string;
  credit?: string;
  width: number;
  height: number;
  srcSet?: string;
}

const PLACEHOLDER: BlogImage = {
  url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=675&fit=crop&q=80",
  alt: "Editorial placeholder — replace with a trade-relevant image",
  caption: "Replace this placeholder in src/lib/blogImages.ts with a real entry.",
  credit: "Unsplash",
  width: 1200,
  height: 675,
};

export const blogImageLibrary: Record<string, BlogImage> = {
  placeholder: PLACEHOLDER,
};

export const getBlogImage = (key: string): BlogImage | undefined =>
  blogImageLibrary[key];

/** Returns a placeholder when the requested key is missing — prevents broken renders. */
export const getBlogImageOrPlaceholder = (key: string): BlogImage =>
  blogImageLibrary[key] ?? PLACEHOLDER;