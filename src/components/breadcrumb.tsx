import Link from "next/link";
import type { BreadcrumbList, WithContext } from "schema-dts";
import { JsonLd } from "@/components/jsonld";
import { SITE } from "@/lib/site";

export type Crumb = { label: string; href: string };

/** Fil d'Ariane visuel + BreadcrumbList JSON-LD (partout sauf home). */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  const data: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
      ...items.map((c, i) => ({
        "@type": "ListItem" as const,
        position: i + 2,
        name: c.label,
        item: `${SITE.url}${c.href}`,
      })),
    ],
  };
  return (
    <nav aria-label="Fil d'Ariane" className="mx-auto max-w-6xl px-4 pt-4 text-sm text-ink-400 sm:px-6">
      <JsonLd data={data} />
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-action">Accueil</Link>
        </li>
        {items.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1.5">
            <span aria-hidden="true">›</span>
            {i === items.length - 1 ? (
              <span aria-current="page" className="font-medium text-ink-600">{c.label}</span>
            ) : (
              <Link href={c.href} className="hover:text-action">{c.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
