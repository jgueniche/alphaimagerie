import type { Metadata } from "next";
import Link from "next/link";
import type { MedicalWebPage, WithContext } from "schema-dts";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/jsonld";
import { PictoAgenda, PictoChecklist, PictoPhone } from "@/components/pictos";
import { CERGY, SITE, XPLORE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Professionnels de santé",
  description:
    "Adresser un patient à Alpha Imagerie Cergy : comptes rendus par MS Santé et DMP, images en ligne, reconstructions 3D, demandes urgentes motivées, 7j/7.",
  alternates: { canonical: "/professionnels-de-sante" },
};

export default function ProfessionnelsPage() {
  const jsonLd: WithContext<MedicalWebPage> = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Professionnels de santé — Alpha Imagerie",
    url: `${SITE.url}/professionnels-de-sante`,
    audience: { "@type": "MedicalAudience", audienceType: "Clinician" },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumb items={[{ label: "Professionnels de santé", href: "/professionnels-de-sante" }]} />
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <h1 className="max-w-3xl text-3xl font-extrabold sm:text-4xl">
          Professionnels de santé : adresser un patient
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-600">
          Plateau complet à Cergy Préfecture — 2 IRM, scanner, mammographe avec tomosynthèse,
          échographie, radiologie interventionnelle — ouvert 7j/7, jours fériés inclus, avec des
          rendez-vous le plus souvent sous 48 h.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <section className="rounded-lg border border-line bg-surface p-5 shadow-card">
            <h2 className="font-display text-xl font-bold text-brand-900">Adresser un patient</h2>
            <ul className="mt-3 space-y-2 text-[0.95rem] text-ink-600">
              <li className="flex items-start gap-2">
                <PictoAgenda className="mt-0.5 h-4 w-4 shrink-0 text-action" />
                <span>
                  <strong>En ligne</strong> : tous les examens sont réservables sur{" "}
                  <a href={CERGY.doctolibUrl} target="_blank" rel="noopener" className="font-semibold text-action underline-offset-2 hover:underline">
                    Doctolib
                  </a>{" "}
                  — votre patient choisit son créneau, questionnaire de sécurité inclus.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <PictoPhone className="mt-0.5 h-4 w-4 shrink-0 text-action" />
                <span>
                  <strong>Par téléphone</strong> :{" "}
                  <a href={`tel:${CERGY.phoneE164}`} className="font-semibold text-brand-900 hover:text-action">
                    {CERGY.phoneDisplay}
                  </a>{" "}
                  (Lun–Ven 8h–18h30, Sam 8h–12h30).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <PictoChecklist className="mt-0.5 h-4 w-4 shrink-0 text-action" />
                <span>
                  <strong>Demande urgente motivée</strong> : appelez le secrétariat en précisant
                  le contexte clinique — l&rsquo;examen est organisé dans les meilleurs délais,
                  week-ends et jours fériés compris.
                </span>
              </li>
            </ul>
          </section>

          <section className="rounded-lg border border-line bg-surface p-5 shadow-card">
            <h2 className="font-display text-xl font-bold text-brand-900">Retour des résultats</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[0.95rem] text-ink-600">
              <li>
                <strong>Compte rendu au prescripteur</strong> par messagerie sécurisée de santé
                (MS Santé) et alimentation du <strong>DMP / Mon espace santé</strong>.
              </li>
              <li>
                <strong>Images en ligne</strong> pour les médecins via le portail dédié, avec{" "}
                <strong>reconstructions 3D</strong> consultables pour les examens en coupes.
              </li>
              <li>
                Patient : compte rendu et images remis sur place ; pour radio, scanner et IRM,
                compte rendu en ligne <strong>sous 12 h au maximum</strong>.
              </li>
            </ul>
            <a
              href={XPLORE.url}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-action px-5 py-2.5 text-sm font-bold text-white shadow-card transition-colors hover:bg-action-hover"
            >
              Accéder au portail médecins (Xplore)
            </a>
          </section>

          <section className="rounded-lg border border-line bg-surface p-5 shadow-card">
            <h2 className="font-display text-xl font-bold text-brand-900">Plateau et équipe</h2>
            <p className="mt-3 text-[0.95rem] text-ink-600">
              2 IRM Philips MR5300 (1,5 T) · scanner Philips CT 3500 · mammographe Hologic avec
              tomosynthèse 3D · 4 échographes Canon · table télécommandée Stephanix ·
              ostéodensitomètre. Gestes interventionnels : infiltrations écho/radio/scanner-guidées,
              biopsies mammaires, cytoponctions, ponctions-évacuations.
            </p>
            <p className="mt-3 text-[0.95rem] text-ink-600">
              L&rsquo;équipe réunit une douzaine de radiologues issus de centres experts (Curie,
              Tenon, Pitié-Salpêtrière), appuyés par des manipulateurs échographistes exerçant
              dans le cadre d&rsquo;un protocole de coopération validé par l&rsquo;État.{" "}
              <Link href="/equipe" className="font-semibold text-action underline-offset-2 hover:underline">
                L&rsquo;équipe médicale →
              </Link>
            </p>
          </section>

          <section className="rounded-lg border border-line bg-surface p-5 shadow-card">
            <h2 className="font-display text-xl font-bold text-brand-900">Réseaux et filières</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[0.95rem] text-ink-600">
              <li>
                <strong>CPTS Axe Majeur</strong> (Cergy-Pontoise) : le centre participe à la
                coordination des soins du territoire.
              </li>
              <li>
                <strong>EndoIDF</strong> : filière endométriose Yvelines – Val-d&rsquo;Oise Ouest —
                IRM pelvienne et échographie orientées endométriose.
              </li>
              <li>
                Correspondants hospitaliers, dont l&rsquo;<strong>hôpital de Pontoise</strong>, et
                médecins du bassin de Cergy-Pontoise.
              </li>
            </ul>
          </section>
        </div>

        <section className="mt-8 rounded-lg border border-line bg-brand-50 p-5">
          <h2 className="font-display text-xl font-bold text-brand-900">
            Préparations : des fiches à remettre à vos patients
          </h2>
          <p className="mt-2 max-w-3xl text-[0.95rem] text-ink-600">
            Chaque examen dispose d&rsquo;une fiche de préparation imprimable (documents à
            apporter, jeûne, points à signaler — anticoagulants, allergies, grossesse) :{" "}
            <Link href="/preparer-mon-examen" className="font-semibold text-action underline-offset-2 hover:underline">
              preparer-mon-examen
            </Link>
            . Les comptes rendus structurés utilisent les classifications usuelles (PI-RADS,
            EU-TIRADS, dépistage organisé avec seconde lecture pour la mammographie).
          </p>
        </section>

        <p className="mt-8 max-w-prose text-sm text-ink-400">
          Une question sur une indication, un protocole ou un délai : contactez le secrétariat au{" "}
          {CERGY.phoneDisplay} ou par e-mail à {SITE.email} — un radiologue vous rappelle si
          nécessaire.
        </p>
      </div>
    </>
  );
}
