import type { Metadata } from "next";
import Link from "next/link";
import type { ImagingTest, MedicalProcedure, WithContext } from "schema-dts";
import { Breadcrumb } from "@/components/breadcrumb";
import { EncadreInformatif } from "@/components/encadre";
import { Faq } from "@/components/faq";
import { FicheSynthese } from "@/components/fiche-synthese";
import { JsonLd } from "@/components/jsonld";
import { Mdx } from "@/components/mdx";
import { PictoAgenda, PictoPhone } from "@/components/pictos";
import {
  getExamen,
  getExamenZone,
  listExamens,
  listExamenZones,
  ZONE_PARENTS,
  type ZoneParent,
} from "@/lib/content";
import { ogImages } from "@/lib/og";
import { CERGY, SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return listExamens().map((slug) => ({ slug }));
}

/** Technique d'imagerie schema.org par modalité (ImagingTest) ; l'interventionnel est un MedicalProcedure. */
const TECHNIQUES: Record<string, "MRI" | "CT" | "Ultrasound" | "Radiography" | "XRay" | undefined> = {
  irm: "MRI",
  scanner: "CT",
  echographie: "Ultrasound",
  mammographie: "XRay",
  radiographie: "Radiography",
  osteodensitometrie: "XRay",
  hysterosalpingographie: "Radiography",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter: fm } = getExamen(slug);
  return {
    title: { absolute: fm.metaTitle },
    description: fm.metaDescription,
    alternates: { canonical: `/examens/${slug}` },
    openGraph: ogImages(fm.title, "À Cergy Préfecture · 7j/7, le plus souvent sous 48 h"),
  };
}

/** Maillage pilier → pages zone (§5 : pilier ↔ zone). */
function ZonesGrid({ parent }: { parent: ZoneParent }) {
  const zones = listExamenZones(parent);
  if (zones.length === 0) return null;
  const titre =
    parent === "echographie" ? "Nos pages par type d'échographie" : "Nos pages par zone examinée";
  return (
    <nav aria-label={titre} className="mt-12">
      <h2 className="text-2xl font-bold">{titre}</h2>
      <p className="mt-2 max-w-2xl text-ink-600">
        Indications, déroulement et préparation propres à chaque examen.
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {zones.map((zone) => {
          const { frontmatter } = getExamenZone(parent, zone);
          return (
            <li key={zone}>
              <Link
                href={`/examens/${parent}/${zone}`}
                className="flex h-full flex-col rounded-lg border border-line bg-surface p-4 shadow-card transition-colors hover:border-action"
              >
                <span className="font-display font-bold text-brand-900">{frontmatter.navLabel}</span>
                <span className="mt-1 text-sm text-ink-600">{frontmatter.metaDescription}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default async function ExamenPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { frontmatter: fm, body } = getExamen(slug);
  const technique = TECHNIQUES[fm.modality];

  const jsonLd: WithContext<ImagingTest> | WithContext<MedicalProcedure> = technique
    ? {
        "@context": "https://schema.org",
        "@type": "ImagingTest",
        name: fm.title,
        imagingTechnique: technique,
        url: `${SITE.url}/examens/${slug}`,
      }
    : {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        name: fm.title,
        url: `${SITE.url}/examens/${slug}`,
      };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumb
        items={[
          { label: "Examens", href: "/examens" },
          { label: fm.title, href: `/examens/${slug}` },
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

        {ZONE_PARENTS.includes(slug as ZoneParent) ? (
          <ZonesGrid parent={slug as ZoneParent} />
        ) : null}

        <Faq items={fm.faq} title="Vos questions fréquentes" />

        <EncadreInformatif />
      </article>
    </>
  );
}
