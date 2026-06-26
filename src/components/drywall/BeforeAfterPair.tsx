interface BeforeAfter {
  before: string;
  after: string;
  caption?: string;
}

interface BeforeAfterPairProps {
  pairs: BeforeAfter[];
}

/** Two stacked images with labels — works without uploaded photos via gradient placeholders. */
const BeforeAfterPair = ({ pairs }: BeforeAfterPairProps) => {
  return (
    <div className="grid gap-12 md:grid-cols-2">
      {pairs.map((pair, i) => (
        <figure key={i} className="space-y-4">
          <div className="grid grid-cols-2 gap-px bg-seam max-md:grid-cols-1 max-md:gap-3 max-md:bg-transparent border border-seam shadow-sm transition-shadow hover:shadow-md">
            <div className="relative aspect-[4/5] bg-gradient-to-br from-mist/40 to-graphite/30 overflow-hidden">
              {pair.before.startsWith("/") || pair.before.startsWith("http") || pair.before.includes("assets") || pair.before.includes("/src/") ? (
                <img src={pair.before} alt="Before" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              ) : null}
              <span className="absolute left-3 top-3 z-10 bg-bone/90 px-2 py-1 font-eyebrow text-charcoal">
                Before
              </span>
            </div>
            <div className="relative aspect-[4/5] bg-gradient-to-br from-bone to-paper overflow-hidden">
              {pair.after.startsWith("/") || pair.after.startsWith("http") || pair.after.includes("assets") || pair.after.includes("/src/") ? (
                <img src={pair.after} alt="After" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              ) : null}
              <span className="absolute left-3 top-3 z-10 bg-forest/95 px-2 py-1 font-eyebrow text-primary-foreground">
                After
              </span>
            </div>
          </div>
          {pair.caption && (
            <figcaption className="text-caption text-mist">{pair.caption}</figcaption>
          )}
        </figure>
      ))}
    </div>
  );
};

export default BeforeAfterPair;
