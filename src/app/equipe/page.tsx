import type { Metadata } from "next";
import Link from "next/link";
import type { Physician, WithContext } from "schema-dts";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/jsonld";
import { PictoAgenda, PictoPhone } from "@/components/pictos";
import { CERGY, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Nos médecins radiologues – Alpha Imagerie" },
  description:
    "Une équipe d'une douzaine de radiologues issus de centres experts (Institut Curie, hôpital Tenon, Pitié-Salpêtrière), fondée par les Drs Jérémy et Yoram Gueniche.",
  alternates: { canonical: "/equipe" },
};

/* À VALIDER MÉDICALEMENT (bios et surspécialités relues par les intéressés) */

const FONDATEURS = [
  {
    initiales: "JG",
    nom: "Dr Jérémy Gueniche",
    role: "Radiologue · co-fondateur, président de la SELAS",
    parcours: [
      "Ancien interne des Hôpitaux Universitaires de Strasbourg",
      "Ancien assistant spécialiste et praticien attaché de l'Institut Curie (Saint-Cloud)",
    ],
    specialites: "Sénologie · imagerie ostéo-articulaire · imagerie ORL",
  },
  {
    initiales: "YG",
    nom: "Dr Yoram Gueniche",
    role: "Radiologue · co-fondateur, directeur général de la SELAS",
    parcours: [
      "Ancien interne de l'AP-HP (Assistance Publique – Hôpitaux de Paris)",
      "Ancien chef de clinique assistant et praticien attaché de l'hôpital Tenon (Paris)",
    ],
    specialites: "Imagerie pelvienne · sénologie · imagerie thoracique et urinaire",
  },
] as const;

const physiciansJsonLd: WithContext<Physician>[] = FONDATEURS.map((f) => ({
  "@context": "https://schema.org",
  "@type": "Physician",
  name: f.nom,
  medicalSpecialty: "https://schema.org/Radiography",
  url: `${SITE.url}/equipe`,
  worksFor: {
    "@type": "MedicalClinic",
    name: CERGY.displayName,
    url: `${SITE.url}/centres/cergy`,
  },
}));

export default function EquipePage() {
  return (
    <>
      {physiciansJsonLd.map((d, i) => (
        <JsonLd key={i} data={d} />
      ))}
      <Breadcrumb items={[{ label: "L'équipe médicale", href: "/equipe" }]} />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <h1 className="max-w-3xl text-3xl font-extrabold sm:text-4xl">Nos médecins radiologues</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-600">
          Une équipe d’une douzaine de radiologues, tous issus de centres hospitaliers
          universitaires et de centres experts, réunie autour de deux fondateurs et d’une même
          exigence : une imagerie précise, expliquée, accessible 7j/7.
        </p>

        {/* Fondateurs */}
        <section aria-labelledby="fondateurs" className="mt-10">
          <h2 id="fondateurs" className="text-2xl font-bold">Les fondateurs</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {FONDATEURS.map((f) => (
              <article key={f.nom} className="rounded-lg border border-line bg-surface p-6 shadow-card">
                <div className="flex items-center gap-4">
                  {/* Portrait à venir (séance photo planifiée) — placeholder aux initiales */}
                  <span
                    aria-hidden="true"
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-100 font-display text-xl font-bold text-brand-900"
                  >
                    {f.initiales}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-brand-900">{f.nom}</h3>
                    <p className="text-sm font-semibold text-ink-600">{f.role}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-1.5 text-[0.95rem] text-ink-600">
                  {f.parcours.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span aria-hidden="true" className="text-brand-400">—</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-semibold text-brand-900">{f.specialites}</p>
              </article>
            ))}
          </div>
        </section>

        {/* L'équipe */}
        <section aria-labelledby="equipe-med" className="mt-12">
          <h2 id="equipe-med" className="text-2xl font-bold">
            Une douzaine de radiologues surspécialisés
          </h2>
          <div className="prose prose-slate mt-4 prose-headings:font-display prose-a:text-action">
            <p>
              Autour des fondateurs, Alpha Imagerie réunit une équipe d’une douzaine de médecins
              radiologues, tous formés et passés par de grands centres hospitaliers universitaires
              et centres experts — parmi lesquels l’<strong>Institut Curie</strong>, l’
              <strong>hôpital Tenon</strong> ou la <strong>Pitié-Salpêtrière</strong>.
            </p>
            <p>
              Chacun apporte sa surspécialité, pour que chaque examen soit interprété par un
              radiologue rompu au domaine concerné :{" "}
              <strong>imagerie de la femme</strong> (mammographie, échographie et IRM mammaires,
              hystérosalpingographie), <strong>imagerie ostéo-articulaire</strong>,{" "}
              <strong>imagerie pelvienne</strong> et de l’endométriose,{" "}
              <strong>imagerie thoracique</strong>, <strong>urinaire</strong>,{" "}
              <strong>ORL</strong> et <strong>neuro-imagerie</strong>, sans oublier la{" "}
              <Link href="/examens/radiologie-interventionnelle">radiologie interventionnelle</Link>.
            </p>
            <p>
              Cette organisation en surspécialités, héritée de l’hôpital, guide aussi nos
              échanges avec vos médecins : réunions de concertation, comptes rendus structurés,
              transmission par messagerie sécurisée de santé et DMP.
            </p>
          </div>
        </section>

        {/* Autour des médecins */}
        <section aria-labelledby="equipe-para" className="mt-12">
          <h2 id="equipe-para" className="text-2xl font-bold">Autour des médecins</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
              <h3 className="font-display font-bold text-brand-900">Manipulateurs</h3>
              <p className="mt-1.5 text-[0.95rem] text-ink-600">
                Formés à l’ensemble des modalités (IRM, scanner, radiographie, mammographie) et à
                la radioprotection, ils vous accompagnent à chaque étape de l’examen.
              </p>
            </div>
            <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
              <h3 className="font-display font-bold text-brand-900">Échographistes</h3>
              <p className="mt-1.5 text-[0.95rem] text-ink-600">
                Des manipulateurs échographistes diplômés interviennent dans le cadre d’un
                protocole de coopération validé par l’État, sous la responsabilité d’un
                radiologue qui interprète et valide chaque examen.
              </p>
            </div>
            <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
              <h3 className="font-display font-bold text-brand-900">Secrétariat</h3>
              <p className="mt-1.5 text-[0.95rem] text-ink-600">
                À l’accueil comme au téléphone (lun–ven 8h–18h30, sam 8h–12h30), l’équipe vous
                guide pour la prise de rendez-vous, les documents à apporter et la prise en
                charge.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href={CERGY.doctolibUrl}
            target="_blank"
            rel="noopener"
            data-track="cta_doctolib_click"
            data-track-site="cergy"
            data-track-position="card"
            className="inline-flex items-center gap-2 rounded-full bg-action px-5 py-2.5 font-bold text-white shadow-card transition-colors hover:bg-action-hover"
          >
            <PictoAgenda className="h-5 w-5" />
            Prendre rendez-vous
          </a>
          <a
            href={`tel:${CERGY.phoneE164}`}
            data-track="phone_click"
            data-track-site="cergy"
            data-track-position="card"
            data-track-line="patients"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 font-bold text-brand-900 transition-colors hover:border-action hover:text-action"
          >
            <PictoPhone className="h-5 w-5" />
            {CERGY.phoneDisplay}
          </a>
          <Link
            href="/centres/cergy"
            className="px-2 py-2.5 font-semibold text-ink-600 underline-offset-4 hover:text-action hover:underline"
          >
            Découvrir le centre de Cergy →
          </Link>
        </div>
      </div>
    </>
  );
}
