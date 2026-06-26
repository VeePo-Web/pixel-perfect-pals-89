import type { BlogPost } from "@/lib/blogData";

interface AuthorCardProps {
  author: BlogPost["author"];
}

export const AuthorCard = ({ author }: AuthorCardProps) => (
  <div className="relative">
    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-copper via-copper/80 to-copper/40" />
    <div className="ml-2 border border-seam bg-paper p-6 transition-all duration-300 hover:border-copper/30">
      <div className="mb-5 flex items-center gap-2">
        <span className="h-1 w-6 bg-copper" />
        <span className="text-eyebrow uppercase tracking-[0.22em] text-mist">
          About the Author
        </span>
      </div>
      <div className="mb-5 flex items-start gap-4">
        <img
          src={author.image}
          alt={author.name}
          width={64}
          height={64}
          className="h-14 w-14 rounded-full object-cover ring-2 ring-bone"
        />
        <div>
          <p className="font-serif text-display-sm text-charcoal">{author.name}</p>
          <p className="text-body-sm text-mist">{author.role}</p>
        </div>
      </div>
      <p className="text-body text-graphite leading-relaxed">{author.bio}</p>
    </div>
  </div>
);