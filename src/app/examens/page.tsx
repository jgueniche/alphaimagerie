import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { MODALITE_PICTOS, PictoInterventionnel, PictoRadio } from "@/components/pictos";
import { MODALITES } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Examens d'imagerie médicale à Cergy – Alpha Imagerie" },
  description:
    "IRM, scanner, échographie, mammographie, radiographie, ostéodensitométrie et radiologie interventionnelle à Cergy Préfecture, 7j/7 jours fériés inclus.",
  alternates: { canonical: "/examens" },
};

export default function ExamensPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Examens", href: "/examens" }]} />
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <h1 className="max-w-3xl text-3xl font-extrabold sm:text-4xl">Nos examens d’imagerie médicale</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-600">
          Tous les examens sont réalisés sur prescription médicale à Cergy Préfecture, 7j/7,
          jours fériés inclus. Chaque examen aura sa page détaillée : déroulement, préparation,
          contre-indications, résultats.
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODALITES.map((m) => {
            const Picto = MODALITE_PICTOS[m.slug as keyof typeof MODALITE_PICTOS];
            const inner = (
              <>
                <Picto className="h-8 w-8 text-brand-400" />
                <span className="mt-3 font-display text-lg font-bold text-brand-900">{m.label}</span>
                <span className="mt-1 text-sm text-ink-600">{m.equipment}</span>
              </>
            );
            return (
              <li key={m.slug}>
                <Link
                  href={`/examens/${m.slug}`}
                  className="flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card transition-colors hover:border-action"
                >
                  {inner}
                  <span className="mt-3 text-sm font-semibold text-action">
                    Déroulement, préparation, FAQ →
                  </span>
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/examens/radiologie-interventionnelle"
              className="flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card transition-colors hover:border-action"
            >
              <PictoInterventionnel className="h-8 w-8 text-brand-400" />
              <span className="mt-3 font-display text-lg font-bold text-brand-900">
                Radiologie interventionnelle
              </span>
              <span className="mt-1 text-sm text-ink-600">
                Infiltrations (écho, radio, scanner), biopsie mammaire, cytoponctions,
                ponctions-évacuations
              </span>
              <span className="mt-3 text-sm font-semibold text-action">Découvrir les gestes →</span>
            </Link>
          </li>
          <li>
            <Link
              href="/examens/hysterosalpingographie"
              className="flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card transition-colors hover:border-action"
            >
              <PictoRadio className="h-8 w-8 text-brand-400" />
              <span className="mt-3 font-display text-lg font-bold text-brand-900">
                Hystérosalpingographie
              </span>
              <span className="mt-1 text-sm text-ink-600">
                Bilan de fertilité — utérus et trompes (imagerie de la femme)
              </span>
              <span className="mt-3 text-sm font-semibold text-action">
                Déroulement, préparation, FAQ →
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
