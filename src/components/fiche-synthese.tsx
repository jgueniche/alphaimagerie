import type { ExamenFrontmatter } from "@/lib/content";
import { withConfirmerTags } from "@/components/confirmer";
import { Confirmer } from "@/components/confirmer";

const CONFIRM_RE = /\[\[À CONFIRMER\s*:\s*([^\]]+)\]\]/;

/** Rend une valeur de fiche en badgant les éventuels jetons « À CONFIRMER ». */
function Value({ text }: { text: string }) {
  const m = text.match(CONFIRM_RE);
  if (!m) return <>{text}</>;
  const [token, note] = m;
  const [before, after] = text.split(token);
  return (
    <>
      {before}
      <Confirmer>{note.trim()}</Confirmer>
      {after}
    </>
  );
}

type FicheFields = Pick<
  ExamenFrontmatter,
  "duree" | "injection" | "preparation" | "resultats" | "disponibleA"
>;

/** Fiche synthèse en cartes (§8.2 du brief) : durée · injection · préparation · résultats · disponibilité. */
export function FicheSynthese({ fm }: { fm: FicheFields }) {
  const items = [
    { label: "Durée", value: fm.duree },
    { label: "Injection", value: fm.injection },
    { label: "Préparation", value: fm.preparation },
    { label: "Résultats", value: fm.resultats },
    {
      label: "Disponible à",
      value: fm.disponibleA
        .map((s) => (s === "cergy" ? "Cergy Préfecture" : "Goussainville"))
        .join(" · "),
    },
  ];
  return (
    <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((it) => (
        <div key={it.label} className="rounded-lg border border-line bg-surface p-4 shadow-card">
          <dt className="text-[0.68rem] font-bold tracking-wider text-ink-400 uppercase">{it.label}</dt>
          <dd className="mt-1 text-sm leading-snug font-semibold text-brand-900">
            <Value text={it.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

export { withConfirmerTags };
