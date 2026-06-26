interface FearGroup {
  fear: string;
  sentences: readonly string[];
}

interface FearDispelSectionProps {
  groups: readonly FearGroup[] | FearGroup[];
  eyebrow?: string;
  headline?: string;
}

/**
 * Renders fear-dispelling sentence groups verbatim from `src/config/fear-dispel.ts`.
 * Two-column editorial layout: question on the left, calm reassuring answers on the right.
 */
const FearDispelSection = ({
  groups,
  eyebrow = "Common questions",
  headline = "What homeowners often worry about",
}: FearDispelSectionProps) => {
  return (
    <section className="section-y">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <p className="font-eyebrow mb-4">{eyebrow}</p>
          <h2 className="text-display-lg text-charcoal">{headline}</h2>
        </div>

        <div className="mt-16 space-y-12">
          {groups.map((group, i) => (
            <div key={i} className="grid gap-8 border-t border-seam pt-12 md:grid-cols-12">
              <div className="md:col-span-4">
                <h3 className="font-display text-display-md text-charcoal">{group.fear}</h3>
              </div>
              <ul className="space-y-3 md:col-span-8">
                {group.sentences.map((s, j) => (
                  <li key={j} className="text-body-lg text-graphite">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FearDispelSection;
