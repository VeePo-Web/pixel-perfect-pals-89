interface Step {
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: Step[];
}

const ProcessSteps = ({ steps }: ProcessStepsProps) => {
  return (
    <ol className="grid gap-px bg-seam md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li key={i} className="flex flex-col bg-paper p-8">
          <span className="font-display text-5xl text-forest/40">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-4 font-display text-display-sm text-charcoal">{step.title}</h3>
          <p className="mt-3 text-graphite">{step.description}</p>
        </li>
      ))}
    </ol>
  );
};

export default ProcessSteps;
