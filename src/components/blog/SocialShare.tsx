import { Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { MASTER_REMIX } from "@/config/template/remix-variables";

interface SocialShareProps {
  url: string;
  title: string;
}

export const SocialShare = ({ url, title }: SocialShareProps) => {
  const fullUrl = (MASTER_REMIX.BRAND_URL || "") + url;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Could not copy link");
    }
  };

  const links = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
  };

  const Btn = ({
    label,
    onClick,
    children,
  }: {
    label: string;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center border border-seam bg-paper text-charcoal transition-colors hover:border-copper hover:text-forest"
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col gap-3">
      <p className="text-eyebrow uppercase tracking-[0.22em] text-mist">
        Share this article
      </p>
      <div className="flex gap-2">
        <Btn label="Share on Twitter" onClick={() => window.open(links.twitter, "_blank")}>
          <Twitter className="h-4 w-4" />
        </Btn>
        <Btn label="Share on Facebook" onClick={() => window.open(links.facebook, "_blank")}>
          <Facebook className="h-4 w-4" />
        </Btn>
        <Btn label="Share on LinkedIn" onClick={() => window.open(links.linkedin, "_blank")}>
          <Linkedin className="h-4 w-4" />
        </Btn>
        <Btn label="Copy link" onClick={handleCopy}>
          <LinkIcon className="h-4 w-4" />
        </Btn>
      </div>
    </div>
  );
};