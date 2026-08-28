import type { FAQPage, WithContext } from "schema-dts";
import { JsonLd } from "@/components/jsonld";

export type FaqItem = { question: string; reponse: string };

/** FAQ en <details>/<summary> natifs (0 JS) + schema FAQPage. */
export function Faq({ items, title = "Questions fréquentes" }: { items: FaqItem[]; title?: string }) {
  if (items.length === 0) return null;
  const data: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.reponse },
    })),
  };
  return (
    <section aria-labelledby="faq-title" className="mt-12">
      <JsonLd data={data} />
      <h2 id="faq-title" className="text-2xl font-bold">{title}</h2>
      <div className="mt-4 divide-y divide-line rounded-lg border border-line bg-surface shadow-card">
        {items.map((f) => (
          <details key={f.question} className="faq group px-5 py-4">
            <summary className="font-display font-semibold text-brand-900">{f.question}</summary>
            <p className="mt-2 max-w-prose text-[0.95rem] leading-relaxed text-ink-600">{f.reponse}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
