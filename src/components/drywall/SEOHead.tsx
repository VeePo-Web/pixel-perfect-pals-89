import { useEffect } from "react";
import { setPageMeta } from "@/lib/seo";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

/** Imperatively set per-page meta (no Helmet). Mounts once per page. */
const SEOHead = ({ title, description, path, ogImage }: SEOHeadProps) => {
  useEffect(() => {
    setPageMeta({ title, description, path, ogImage });
  }, [title, description, path, ogImage]);

  return null;
};

export default SEOHead;
