"use client";

import { PictoImprimer } from "@/components/pictos";

/** Seul JS client des fiches de préparation : déclenche l'impression du navigateur. */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 font-bold text-brand-900 transition-colors hover:border-action hover:text-action"
    >
      <PictoImprimer className="h-5 w-5" />
      Imprimer cette fiche
    </button>
  );
}
