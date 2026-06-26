import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

const FAQAccordion = ({ items }: FAQAccordionProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`} className="border-b border-seam">
          <AccordionTrigger className="py-5 text-left font-display text-display-sm text-charcoal hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-body-lg text-graphite">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQAccordion;
