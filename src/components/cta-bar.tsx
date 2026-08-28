import { CERGY } from "@/lib/site";
import { PictoAgenda, PictoPhone, PictoPin } from "@/components/pictos";

/** Barre CTA mobile sticky basse — Appeler · Prendre RDV · Itinéraire (docs/design-system.md §4). */
export function CtaBar() {
  return (
    <nav
      aria-label="Actions rapides"
      className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85 lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-1 p-2">
        <a
          href={`tel:${CERGY.phoneE164}`}
          className="flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-lg text-xs font-bold text-brand-900"
        >
          <PictoPhone className="h-5 w-5 text-action" />
          Appeler
        </a>
        <a
          href={CERGY.doctolibUrl}
          target="_blank"
          rel="noopener"
          className="flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-lg bg-action text-xs font-bold text-white"
        >
          <PictoAgenda className="h-5 w-5" />
          Prendre RDV
        </a>
        <a
          href={CERGY.mapsUrl}
          target="_blank"
          rel="noopener"
          className="flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-lg text-xs font-bold text-brand-900"
        >
          <PictoPin className="h-5 w-5 text-action" />
          Itinéraire
        </a>
      </div>
    </nav>
  );
}
