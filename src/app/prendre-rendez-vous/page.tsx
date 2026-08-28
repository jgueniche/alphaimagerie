import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { PictoAgenda, PictoPhone } from "@/components/pictos";
import { CERGY } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Prendre rendez-vous 7j/7 à Cergy – Alpha Imagerie" },
  description:
    "Réservez votre examen d'imagerie à Cergy Préfecture : en ligne sur Doctolib ou par téléphone au 01 86 30 30 00. Ouvert 7j/7, jours fériés inclus.",
  alternates: { canonical: "/prendre-rendez-vous" },
};

export default function PrendreRdvPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Prendre rendez-vous", href: "/prendre-rendez-vous" }]} />
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <h1 className="max-w-3xl text-3xl font-extrabold sm:text-4xl">Prendre rendez-vous</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-600">
          Munissez-vous de votre <strong>ordonnance</strong> : elle est indispensable pour tout
          examen d’imagerie. Nos délais de rendez-vous sont courts — le plus souvent{" "}
          <strong>sous 48&nbsp;h</strong>.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <a
            href={CERGY.doctolibUrl}
            target="_blank"
            rel="noopener"
            className="rounded-lg bg-action p-6 text-white shadow-card transition-colors hover:bg-action-hover"
          >
            <PictoAgenda className="h-7 w-7" />
            <p className="mt-3 font-display text-xl font-bold">En ligne, sur Doctolib</p>
            <p className="mt-1 text-white/85">
              Créneaux en temps réel, questionnaire de sécurité à remplir en amont, rappels
              automatiques.
            </p>
          </a>
          <div className="rounded-lg border border-line bg-surface p-6 shadow-card">
            <PictoPhone className="h-7 w-7 text-action" />
            <p className="mt-3 font-display text-xl font-bold text-brand-900">
              Par téléphone :{" "}
              <a href={`tel:${CERGY.phoneE164}`} className="text-action underline-offset-4 hover:underline">
                {CERGY.phoneDisplay}
              </a>
            </p>
            <p className="mt-1 text-ink-600">
              <strong>Tapez 1</strong> pour un rendez-vous, <strong>tapez 2</strong> pour toute
              autre demande. Secrétariat : lun–ven 8h–18h30, sam 8h–12h30.
            </p>
          </div>
        </div>

        <div className="mt-8 max-w-2xl rounded-lg border border-line bg-brand-50 px-5 py-4 text-[0.95rem] text-ink-600">
          <p>
            <strong className="text-brand-900">Tous nos examens sont ouverts à la réservation en
            ligne</strong>{" "}
            sur Doctolib : IRM · scanner (dont score calcique) · radiographie (dont radio
            pédiatrique) · mammographie · échographie et Doppler artériel/veineux ·
            ostéodensitométrie · infiltrations (écho-guidées, radio-guidées ou sous scanner) ·
            biopsie mammaire · cytoponctions (thyroïde, ganglions, glandes salivaires) · ponctions
            et évacuations (collections, hématomes, kystes) · hystérosalpingographie. Lors de la
            réservation, Doctolib vous présente le questionnaire et les consignes de préparation
            propres à votre examen. En cas de doute sur le motif à choisir, appelez-nous.
          </p>
        </div>
      </div>
    </>
  );
}
