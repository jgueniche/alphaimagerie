import type { Metadata } from "next";
import Link from "next/link";
import type { ImagingTest, WithContext } from "schema-dts";
import { Breadcrumb } from "@/components/breadcrumb";
import { EncadreInformatif } from "@/components/encadre";
import { Faq } from "@/components/faq";
import { FicheSynthese } from "@/components/fiche-synthese";
import { JsonLd } from "@/components/jsonld";
import { Mdx } from "@/components/mdx";
import { PictoAgenda, PictoPhone } from "@/components/pictos";
import { getExamenZone, type ZoneParent } from "@/lib/content";
import { ogImages } from "@/lib/og";
import { CERGY, SITE } from "@/lib/site";

/** Gabarit resserré des pages zone (§5 du brief : /examens/{pilier}/{zone}). */

export const ZONE_PARENT_META: Record<
  ZoneParent,
  { label: string; technique: "MRI" | "CT" | "Ultrasound" }
> = {
  irm: { label: "IRM", technique: "MRI" },
  scanner: { label: "Scanner", technique: "CT" },
  echographie: { label: "Échographie", technique: "Ultrasound" },
};

export function zoneMetadata(parent: ZoneParent, zone: string): Metadata {
  const { frontmatter: fm } = getExamenZone(parent, zone);
  return {
    title: { absolute: fm.metaTitle },
    description: fm.metaDescription,
    alternates: { canonical: `/examens/${parent}/${zone}` },
    openGraph: ogImages(fm.navLabel, "À Cergy Préfecture · 7j/7, le plus souvent sous 48 h"),
  };
}

export function ExamenZonePage({ parent, zone }: { parent: ZoneParent; zone: string }) {
  const { frontmatter: fm, body } = getExamenZone(parent, zone);
  const meta = ZONE_PARENT_META[parent];
  const url = `/examens/${parent}/${zone}`;

  const jsonLd: WithContext<ImagingTest> = {
    "@context": "https://schema.org",
    "@type": "ImagingTest",
    name: fm.title,
    imagingTechnique: meta.technique,
    url: `${SITE.url}${url}`,
  };

  const liens = [
    {
      href: `/examens/${parent}`,
      label: `${meta.label} : le guide complet`,
      detail: "Déroulement, contre-indications, injection, FAQ détaillée",
    },
    {
      href: `/centres/cergy/${parent}`,
      label: `${meta.label} à Cergy Préfecture`,
      detail: "Horaires 7j/7, accès RER A et parkings, prise de rendez-vous",
    },
    {
      href: "/preparer-mon-examen",
      label: "Préparer mon examen",
      detail: "Documents à apporter, jeûne, consignes pratiques",
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumb
        items={[
          { label: "Examens", href: "/examens" },
          { label: meta.label, href: `/examens/${parent}` },
          { label: fm.navLabel, href: url },
        ]}
      />

      <article className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <h1 className="max-w-3xl text-3xl font-extrabold sm:text-4xl">{fm.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-600">{fm.chapo}</p>

        <div className="mt-7">
          <FicheSynthese fm={fm} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={CERGY.doctolibUrl}
            target="_blank"
            rel="noopener"
            data-track="cta_doctolib_click"
            data-track-site="cergy"
            data-track-modality={fm.modality}
            data-track-position="fiche"
            className="inline-flex items-center gap-2 rounded-full bg-action px-5 py-2.5 font-bold text-white shadow-card transition-colors hover:bg-action-hover"
          >
            <PictoAgenda className="h-5 w-5" />
            Prendre rendez-vous
          </a>
          <a
            href={`tel:${CERGY.phoneE164}`}
            data-track="phone_click"
            data-track-site="cergy"
            data-track-position="fiche"
            data-track-line="patients"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 font-bold text-brand-900 transition-colors hover:border-action hover:text-action"
          >
            <PictoPhone className="h-5 w-5" />
            {CERGY.phoneDisplay}
          </a>
        </div>

        <Mdx source={body} />

        <Faq items={fm.faq} title="Vos questions fréquentes" />

        <nav aria-label="Pour aller plus loin" className="mt-10">
          <h2 className="text-xl font-bold">Pour aller plus loin</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">
            {liens.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="flex h-full flex-col rounded-lg border border-line bg-surface p-4 shadow-card transition-colors hover:border-action"
                >
                  <span className="font-display font-bold text-brand-900">{l.label}</span>
                  <span className="mt-1 text-sm text-ink-600">{l.detail}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <EncadreInformatif />
      </article>
    </>
  );
}
