/**
 * Convention « À CONFIRMER » (CLAUDE.md) : visible en dev/préprod,
 * bloquant en build de production via scripts/check-confirmer.mjs.
 */
export function Confirmer({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded bg-warn-100 px-1.5 py-0.5 text-[0.85em] font-semibold text-warn">
      À confirmer&nbsp;: {children}
    </mark>
  );
}

/** Remplace les jetons « À CONFIRMER » d'une source MDX par le composant visible. */
export function withConfirmerTags(mdxSource: string): string {
  return mdxSource.replace(
    /\[\[À CONFIRMER\s*:\s*([^\]]+)\]\]/g,
    (_m, note: string) => `<Confirmer>${note.trim()}</Confirmer>`,
  );
}
