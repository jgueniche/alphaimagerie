import type { Metadata } from "next";
import type { ImagingTest, WithContext } from "schema-dts";
import { Breadcrumb } from "@/components/breadcrumb";
import { EncadreInformatif } from "@/components/encadre";
import { Faq } from "@/components/faq";
import { FicheSynthese } from "@/components/fiche-synthese";
import { JsonLd } from "@/components/jsonld";
import { Mdx } from "@/components/mdx";
import { PictoAgenda, PictoPhone } from "@/components/pictos";
import { getExamen } from "@/lib/content";
import { CERGY, SITE } from "@/lib/site";

const { frontmatter: fm, body } = getExamen("irm");

export const metadata: Metadata = {
  title: { absolute: fm.metaTitle },
  description: fm.metaDescription,
  alternates: { canonical: "/examens/irm" },
};

const imagingJsonLd: WithContext<ImagingTest> = {
  "@context": "https://schema.org",
  "@type": "ImagingTest",
  name: "IRM (imagerie par résonance magnétique)",
  imagingTechnique: "MRI",
  url: `${SITE.url}/examens/irm`,
};

export default function ExamenIrmPage() {
  return (
    <>
      <JsonLd data={imagingJsonLd} />
      <Breadcrumb items={[{ label: "Examens", href: "/examens" }, { label: "IRM", href: "/examens/irm" }]} />

      <article className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <h1 className="max-w-3xl text-3xl font-extrabold sm:text-4xl">{fm.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-600">
          Un examen indolore, sans rayons X, réalisé 7j/7 à Cergy Préfecture sur deux IRM Philips
          MR5300 (1,5 tesla).
        </p>

        <div className="mt-7">
          <FicheSynthese fm={fm} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={CERGY.doctolibUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full bg-action px-5 py-2.5 font-bold text-white shadow-card transition-colors hover:bg-action-hover"
          >
            <PictoAgenda className="h-5 w-5" />
            Prendre RDV pour une IRM
          </a>
          <a
            href={`tel:${CERGY.phoneE164}`}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 font-bold text-brand-900 transition-colors hover:border-action hover:text-action"
          >
            <PictoPhone className="h-5 w-5" />
            {CERGY.phoneDisplay}
          </a>
        </div>

        <Mdx source={body} />

        <Faq items={fm.faq} title="IRM : vos questions fréquentes" />

        <EncadreInformatif />
      </article>
    </>
  );
}
