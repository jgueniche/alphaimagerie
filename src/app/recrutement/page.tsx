import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Recrutement",
  description:
    "Rejoindre Alpha Imagerie à Cergy : radiologues, manipulateurs (MERM), secrétaires médicales. Candidature par e-mail à contact@alphaimagerie.fr.",
  alternates: { canonical: "/recrutement" },
};

/**
 * Page recrutement — candidatures par e-mail uniquement (pas d'upload de CV sur le
 * site, §10 du brief). Les offres publiées (avec schema JobPosting) seront ajoutées
 * dès transmission par le client (docs/questions.md q.50).
 */

const METIERS = [
  {
    titre: "Radiologues",
    detail:
      "Exercice sur un plateau récent (2 IRM Philips MR5300, scanner Philips CT 3500, mammographe Hologic avec tomosynthèse, 4 échographes Canon), en surspécialité ou en polyvalence, avec activité interventionnelle possible. Statut : remplacement, collaboration ou association, selon profil.",
  },
  {
    titre: "Manipulateurs radio (MERM)",
    detail:
      "Toutes modalités (IRM, scanner, radiographie, mammographie, ostéodensitométrie), formation continue et radioprotection ; échographie possible dans le cadre d'un protocole de coopération validé par l'État.",
  },
  {
    titre: "Secrétaires médicales et accueil",
    detail:
      "Accueil physique et téléphonique, gestion des rendez-vous (Doctolib), facturation et tiers payant, au contact direct des patients et de l'équipe médicale.",
  },
];

export default function RecrutementPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Recrutement", href: "/recrutement" }]} />
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <h1 className="max-w-3xl text-3xl font-extrabold sm:text-4xl">Rejoindre Alpha Imagerie</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-600">
          Centre indépendant fondé par deux radiologues, ouvert 7j/7 à Cergy Préfecture, avec un
          second site prévu à Goussainville fin 2027 : l&rsquo;activité se développe et les
          candidatures sont étudiées tout au long de l&rsquo;année.
        </p>

        <section aria-labelledby="metiers-title" className="mt-10">
          <h2 id="metiers-title" className="text-2xl font-bold">Les métiers du centre</h2>
          <ul className="mt-4 grid gap-4 md:grid-cols-3">
            {METIERS.map((m) => (
              <li key={m.titre} className="rounded-lg border border-line bg-surface p-5 shadow-card">
                <h3 className="font-display text-lg font-bold text-brand-900">{m.titre}</h3>
                <p className="mt-2 text-[0.95rem] text-ink-600">{m.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="candidater-title" className="mt-10 rounded-lg border border-line bg-brand-50 p-6">
          <h2 id="candidater-title" className="text-2xl font-bold">Candidater</h2>
          <p className="mt-2 max-w-2xl text-ink-600">
            Envoyez votre CV et quelques lignes de présentation par e-mail, en précisant le poste
            recherché dans l&rsquo;objet (par exemple : «&nbsp;Candidature — MERM&nbsp;»). Votre
            candidature est transmise directement aux associés et traitée de manière
            confidentielle.
          </p>
          <a
            href={`mailto:${SITE.email}?subject=Candidature%20—%20`}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-action px-6 py-3 font-bold text-white shadow-card transition-colors hover:bg-action-hover"
          >
            Candidater par e-mail : {SITE.email}
          </a>
          <p className="mt-3 text-sm text-ink-400">
            Aucun dépôt de CV sur le site : la candidature se fait exclusivement par e-mail.
          </p>
        </section>

        <p className="mt-8 max-w-prose text-sm text-ink-600">
          Pour découvrir le centre avant de candidater :{" "}
          <Link href="/equipe" className="font-semibold text-action underline-offset-2 hover:underline">
            l&rsquo;équipe médicale
          </Link>{" "}
          et{" "}
          <Link href="/centres/cergy" className="font-semibold text-action underline-offset-2 hover:underline">
            le centre de Cergy Préfecture
          </Link>
          .
        </p>
      </div>
    </>
  );
}
