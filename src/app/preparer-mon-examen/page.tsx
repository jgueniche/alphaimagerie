import type { Metadata } from "next";
import Link from "next/link";
import type { MedicalWebPage, WithContext } from "schema-dts";
import { Breadcrumb } from "@/components/breadcrumb";
import { EncadreInformatif } from "@/components/encadre";
import { JsonLd } from "@/components/jsonld";
import { PictoChecklist } from "@/components/pictos";
import { getPreparation, listPreparations } from "@/lib/content";
import { CERGY, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Préparer votre examen d'imagerie – Alpha Imagerie" },
  description:
    "Documents à apporter, jeûne, grossesse, implants : préparez votre IRM, scanner, échographie ou mammographie à Cergy avec nos fiches imprimables.",
  alternates: { canonical: "/preparer-mon-examen" },
};

/** Ordre d'affichage éditorial des fiches (les plus demandées d'abord). */
const ORDRE = [
  "irm",
  "scanner",
  "echographie",
  "mammographie",
  "radiographie",
  "osteodensitometrie",
  "hysterosalpingographie",
  "infiltrations",
  "biopsie-mammaire",
  "cytoponctions",
  "ponctions-evacuations",
];

export default function PreparerMonExamenPage() {
  const slugs = [...listPreparations()].sort(
    (a, b) => ORDRE.indexOf(a) - ORDRE.indexOf(b),
  );

  const jsonLd: WithContext<MedicalWebPage> = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Préparer votre examen d'imagerie médicale",
    url: `${SITE.url}/preparer-mon-examen`,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumb items={[{ label: "Préparer mon examen", href: "/preparer-mon-examen" }]} />
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <h1 className="max-w-3xl text-3xl font-extrabold sm:text-4xl">Préparer votre examen</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-600">
          Un examen bien préparé, c&rsquo;est un examen plus rapide et de meilleure qualité.
          Retrouvez ici l&rsquo;essentiel à savoir avant de venir, et une fiche imprimable pour
          chaque examen.
        </p>

        <section aria-labelledby="essentiel-title" className="mt-10">
          <h2 id="essentiel-title" className="text-2xl font-bold">L&rsquo;essentiel, quel que soit l&rsquo;examen</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
              <h3 className="font-display text-lg font-bold text-brand-900">Les documents à apporter</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.95rem] text-ink-600">
                <li>votre <strong>ordonnance</strong> (l&rsquo;examen est réalisé sur prescription) ;</li>
                <li>votre <strong>carte Vitale</strong> et votre carte de mutuelle ;</li>
                <li>une <strong>pièce d&rsquo;identité</strong> ;</li>
                <li>vos <strong>examens antérieurs</strong> (images et comptes rendus) ;</li>
                <li>la liste de vos <strong>traitements en cours</strong>.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
              <h3 className="font-display text-lg font-bold text-brand-900">Jeûne : seulement si on vous le demande</h3>
              <p className="mt-2 text-[0.95rem] text-ink-600">
                La plupart des examens ne nécessitent <strong>aucun jeûne</strong>. Il est requis
                pour certains examens précis (échographie abdominale, certains examens
                injectés) : la consigne figure alors sur votre convocation. Dans le doute,
                appelez le secrétariat — et ne modifiez jamais vos traitements sans avis médical.
              </p>
            </div>
            <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
              <h3 className="font-display text-lg font-bold text-brand-900">Grossesse, implants : à signaler</h3>
              <p className="mt-2 text-[0.95rem] text-ink-600">
                Signalez dès la prise de rendez-vous toute <strong>grossesse</strong> en cours ou
                possible, un <strong>pacemaker</strong> ou tout dispositif implanté, une{" "}
                <strong>allergie</strong> connue, un traitement <strong>anticoagulant</strong>{" "}
                avant un geste interventionnel. L&rsquo;équipe adapte l&rsquo;examen en conséquence.
              </p>
            </div>
            <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
              <h3 className="font-display text-lg font-bold text-brand-900">Enfants et accès</h3>
              <p className="mt-2 text-[0.95rem] text-ink-600">
                Radiographie et échographie sont réalisées <strong>dès les premiers mois</strong> ;
                l&rsquo;IRM à partir de 15 ans. Le centre de Cergy Préfecture est{" "}
                <strong>accessible PMR</strong> et accueille les patients en brancard. Arrivez
                10 à 15 minutes en avance pour l&rsquo;enregistrement.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="fiches-title" className="mt-12">
          <h2 id="fiches-title" className="text-2xl font-bold">Les fiches par examen</h2>
          <p className="mt-2 max-w-2xl text-ink-600">
            Chaque fiche tient sur une page : checklist des documents, préparation, points à
            signaler. Imprimez-la ou gardez-la sur votre téléphone.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {slugs.map((slug) => {
              const { frontmatter } = getPreparation(slug);
              return (
                <li key={slug}>
                  <Link
                    href={`/preparer-mon-examen/${slug}`}
                    className="flex h-full items-start gap-3 rounded-lg border border-line bg-surface p-4 shadow-card transition-colors hover:border-action"
                  >
                    <PictoChecklist className="mt-0.5 h-6 w-6 shrink-0 text-brand-400" />
                    <span>
                      <span className="font-display font-bold text-brand-900">{frontmatter.examen}</span>
                      <span className="mt-0.5 block text-sm text-ink-600">{frontmatter.metaDescription}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <p className="mt-10 max-w-prose text-sm text-ink-600">
          Le déroulement détaillé de chaque examen est décrit sur{" "}
          <Link href="/examens" className="font-semibold text-action underline-offset-2 hover:underline">
            nos pages examens
          </Link>
          . Pour toute question : {CERGY.phoneDisplay}.
        </p>

        <EncadreInformatif />
      </div>
    </>
  );
}
