import type { Metadata } from "next";
import Link from "next/link";
import type { MedicalWebPage, WithContext } from "schema-dts";
import { Breadcrumb } from "@/components/breadcrumb";
import { EncadreInformatif } from "@/components/encadre";
import { JsonLd } from "@/components/jsonld";
import { Mdx } from "@/components/mdx";
import { PictoAgenda, PictoPhone } from "@/components/pictos";
import { PrintButton } from "@/components/print-button";
import { getPreparation, listPreparations } from "@/lib/content";
import { CERGY, SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return listPreparations().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter: fm } = getPreparation(slug);
  return {
    title: { absolute: fm.metaTitle },
    description: fm.metaDescription,
    alternates: { canonical: `/preparer-mon-examen/${slug}` },
  };
}

export default async function PreparationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { frontmatter: fm, body } = getPreparation(slug);

  const jsonLd: WithContext<MedicalWebPage> = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: fm.title,
    description: fm.metaDescription,
    url: `${SITE.url}/preparer-mon-examen/${slug}`,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumb
        items={[
          { label: "Préparer mon examen", href: "/preparer-mon-examen" },
          { label: fm.examen, href: `/preparer-mon-examen/${slug}` },
        ]}
      />

      <article className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        {/* En-tête visible uniquement à l'impression : la fiche doit se suffire à elle-même. */}
        <div className="print-only border-b border-line pb-3">
          <p className="font-display text-lg font-bold">Alpha Imagerie — Centre d&rsquo;imagerie médicale</p>
          <p className="text-sm">
            {CERGY.streetAddress}, {CERGY.postalCode} {CERGY.city} · {CERGY.phoneDisplay} ·{" "}
            {SITE.url.replace("https://", "")}
          </p>
        </div>

        <p className="no-print text-sm font-bold tracking-wider text-action uppercase">
          Fiche de préparation
        </p>
        <h1 className="mt-1 max-w-3xl text-3xl font-extrabold sm:text-4xl">{fm.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-600">
          Temps de présence sur place : {fm.surPlace}.
        </p>

        <div className="no-print mt-6 flex flex-wrap items-center gap-3">
          <PrintButton />
          <a
            href={CERGY.doctolibUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full bg-action px-5 py-2.5 font-bold text-white shadow-card transition-colors hover:bg-action-hover"
          >
            <PictoAgenda className="h-5 w-5" />
            Prendre rendez-vous
          </a>
          <a
            href={`tel:${CERGY.phoneE164}`}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 font-bold text-brand-900 transition-colors hover:border-action hover:text-action"
          >
            <PictoPhone className="h-5 w-5" />
            {CERGY.phoneDisplay}
          </a>
        </div>

        <section aria-labelledby="apporter-title" className="mt-8">
          <h2 id="apporter-title" className="text-2xl font-bold">À apporter le jour de l&rsquo;examen</h2>
          <ul className="print-checklist mt-4 grid max-w-3xl gap-2 sm:grid-cols-2">
            {fm.apporter.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-lg border border-line bg-surface px-4 py-3 shadow-card"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 h-4 w-4 shrink-0 rounded-sm border-2 border-brand-400"
                />
                <span className="text-[0.95rem] leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <Mdx source={body} />

        <p className="mt-8 max-w-prose text-sm text-ink-600">
          Une question sur votre préparation ? Appelez le secrétariat au {CERGY.phoneDisplay}{" "}
          (du lundi au vendredi 8h–18h30, le samedi 8h–12h30). Pour le déroulement détaillé de
          l&rsquo;examen : <Link href={fm.lienExamen} className="font-semibold text-action underline-offset-2 hover:underline">notre page dédiée</Link>.
        </p>

        <EncadreInformatif />
      </article>
    </>
  );
}
