export const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDateISO = (dateString: string): string =>
  new Date(dateString).toISOString();

export const generateBlogSlug = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

export const truncateText = (text: string, maxLength: number): string =>
  text.length <= maxLength ? text : text.slice(0, maxLength).trim() + "…";

export interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export const getTableOfContents = (content: string): TocItem[] => {
  const headingRegex = /^#{2,3}\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = (match[0].indexOf("###") === 0 ? 3 : 2) as 2 | 3;
    const title = match[1].trim();
    headings.push({ id: generateBlogSlug(title), title, level });
  }
  return headings;
};