import { CircleHelp } from "lucide-react";
import type { ServiceFaqItems } from "@/lib/service-content";

export function ServiceFaq({
  id,
  title,
  description,
  items
}: {
  id?: string;
  title: string;
  description: string;
  items: ServiceFaqItems;
}) {
  return (
    <section className="service-faq" id={id} aria-labelledby={`${id ?? "service"}-faq-title`}>
      <div className="service-faq-heading">
        <p className="eyebrow"><CircleHelp aria-hidden="true" /> Întrebări frecvente</p>
        <h2 id={`${id ?? "service"}-faq-title`}>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="service-faq-list">
        {items.map(([question, answer], index) => (
          <details key={question} open={index === 0}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
