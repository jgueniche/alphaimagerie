import type { Metadata } from "next";
import type { MedicalProcedure, WithContext } from "schema-dts";
import { Breadcrumb } from "@/components/breadcrumb";
import { EncadreInformatif } from "@/components/encadre";
import { Faq } from "@/components/faq";
import { FicheSynthese } from "@/components/fiche-synthese";
import { JsonLd } from "@/components/jsonld";
import { Mdx } from "@/components/mdx";
import { PictoAgenda, PictoPhone } from "@/components/pictos";
import { getInterventionnel, listInterventionnels } from "@/lib/content";
import { ogImages } from "@/lib/og";
import { CERGY, SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return listInterventionnels().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter: fm } = getInterventionnel(slug);
  return {
    title: { absolute: fm.metaTitle },
    description: fm.metaDescription,
    alternates: { canonical: `/examens/radiologie-interventionnelle/${slug}` },
    openGraph: ogImages(fm.title, "À Cergy Préfecture · sur prescription médicale"),
  };
}

export default async function InterventionnelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { frontmatter: fm, body } = getInterventionnel(slug);

  const jsonLd: WithContext<MedicalProcedure> = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: fm.title,
    url: `${SITE.url}/examens/radiologie-interventionnelle/${slug}`,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumb
        items={[
          { label: "Examens", href: "/examens" },
          { label: "Radiologie interventionnelle", href: "/examens/radiologie-interventionnelle" },
          { label: fm.title, href: `/examens/radiologie-interventionnelle/${slug}` },
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
            data-track-modality="interventionnel"
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

        <EncadreInformatif />
      </article>
    </>
  );
}
