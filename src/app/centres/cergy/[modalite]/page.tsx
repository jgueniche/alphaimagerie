import type { Metadata } from "next";
import Link from "next/link";
import type { MedicalWebPage, WithContext } from "schema-dts";
import { Breadcrumb } from "@/components/breadcrumb";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/jsonld";
import { Mdx } from "@/components/mdx";
import { PictoAgenda, PictoHoraires, PictoPhone, PictoPin } from "@/components/pictos";
import { getModaliteVille, listModalitesVille } from "@/lib/content";
import { ogImages } from "@/lib/og";
import { CERGY, SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return listModalitesVille("cergy").map((modalite) => ({ modalite }));
}

export async function generateMetadata({ params }: { params: Promise<{ modalite: string }> }): Promise<Metadata> {
  const { modalite } = await params;
  const { frontmatter: fm } = getModaliteVille("cergy", modalite);
  return {
    title: { absolute: fm.metaTitle },
    description: fm.metaDescription,
    alternates: { canonical: `/centres/cergy/${modalite}` },
    openGraph: ogImages(fm.title, "Au pied du RER A · 7j/7, jours fériés inclus"),
  };
}

export default async function ModaliteCergyPage({ params }: { params: Promise<{ modalite: string }> }) {
  const { modalite } = await params;
  const { frontmatter: fm, body } = getModaliteVille("cergy", modalite);

  const jsonLd: WithContext<MedicalWebPage> = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: fm.title,
    url: `${SITE.url}/centres/cergy/${modalite}`,
    about: { "@type": "MedicalClinic", name: CERGY.displayName, url: `${SITE.url}/centres/cergy` },
    inLanguage: "fr-FR",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumb
        items={[
          { label: "Centre de Cergy", href: "/centres/cergy" },
          { label: fm.title, href: `/centres/cergy/${modalite}` },
        ]}
      />

      <article className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-accent-100 px-3 py-1 text-sm font-bold text-accent">
          <PictoHoraires className="h-4 w-4" />
          Ouvert 7j/7 · jours fériés inclus
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold sm:text-4xl">{fm.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-600">{fm.chapo}</p>

        {/* CTA au-dessus de la ligne de flottaison (landing Ads) */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={CERGY.doctolibUrl}
            target="_blank"
            rel="noopener"
            data-track="cta_doctolib_click"
            data-track-site="cergy"
            data-track-modality={fm.modality}
            data-track-position="hero"
            className="inline-flex items-center gap-2 rounded-full bg-action px-5 py-2.5 font-bold text-white shadow-card transition-colors hover:bg-action-hover"
          >
            <PictoAgenda className="h-5 w-5" />
            Prendre rendez-vous en ligne
          </a>
          <a
            href={`tel:${CERGY.phoneE164}`}
            data-track="phone_click"
            data-track-site="cergy"
            data-track-position="hero"
            data-track-line="patients"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 font-bold text-brand-900 transition-colors hover:border-action hover:text-action"
          >
            <PictoPhone className="h-5 w-5" />
            {CERGY.phoneDisplay}
          </a>
          <a
            href={CERGY.mapsUrl}
            target="_blank"
            rel="noopener"
            data-track="directions_click"
            data-track-site="cergy"
            data-track-provider="google"
            className="inline-flex items-center gap-2 px-2 py-2.5 font-semibold text-ink-600 underline-offset-4 hover:text-action hover:underline"
          >
            <PictoPin className="h-5 w-5" />
            Itinéraire
          </a>
        </div>

        <Mdx source={body} />

        <Faq items={fm.faq ?? []} title="Questions fréquentes" />

        <p className="mt-10 text-[0.95rem] text-ink-600">
          Pour le déroulement détaillé de l’examen (préparation, contre-indications, résultats),
          consultez notre{" "}
          <Link
            href={modalite === "irm" ? "/examens/irm" : `/examens/${modalite}`}
            className="font-semibold text-action underline-offset-2 hover:underline"
          >
            guide complet de l’examen
          </Link>{" "}
          — et toutes les informations d’accès sur la page du{" "}
          <Link href="/centres/cergy" className="font-semibold text-action underline-offset-2 hover:underline">
            centre de Cergy Préfecture
          </Link>
          .
        </p>
      </article>
    </>
  );
}
