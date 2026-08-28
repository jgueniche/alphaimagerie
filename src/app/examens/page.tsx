import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { MODALITE_PICTOS, PictoInterventionnel } from "@/components/pictos";
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
                {m.slug === "irm" ? (
                  <Link
                    href="/examens/irm"
                    className="flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card transition-colors hover:border-action"
                  >
                    {inner}
                    <span className="mt-3 text-sm font-semibold text-action">
                      Déroulement, préparation, FAQ →
                    </span>
                  </Link>
                ) : (
                  <div className="flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card">
                    {inner}
                    <span className="mt-3 text-xs font-medium text-ink-400">Page détaillée à venir</span>
                  </div>
                )}
              </li>
            );
          })}
          <li>
            <div className="flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card">
              <PictoInterventionnel className="h-8 w-8 text-brand-400" />
              <span className="mt-3 font-display text-lg font-bold text-brand-900">
                Radiologie interventionnelle
              </span>
              <span className="mt-1 text-sm text-ink-600">
                Infiltrations, biopsies, cytoponctions, hystérosalpingographie
              </span>
              <span className="mt-3 text-xs font-medium text-ink-400">Page détaillée à venir</span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
