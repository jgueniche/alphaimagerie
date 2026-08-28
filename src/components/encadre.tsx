/** Encadré réglementaire des pages examens (§8.2.4 du brief). */
export function EncadreInformatif() {
  return (
    <aside className="mt-10 rounded-lg border border-brand-100 bg-brand-50 px-5 py-4 text-sm text-ink-600">
      <strong className="text-brand-900">Ce contenu est informatif et ne remplace pas l&rsquo;avis de votre
      médecin.</strong>{" "}
      En cas de doute sur l&rsquo;indication ou la préparation de votre examen, parlez-en à votre médecin
      prescripteur ou appelez notre secrétariat.
    </aside>
  );
}

/** Encart générique pour le MDX (préparation, points d'attention). */
export function Encart({ titre, children }: { titre?: string; children: React.ReactNode }) {
  return (
    <aside className="my-6 rounded-lg border border-line bg-brand-50 px-5 py-4 text-[0.95rem]">
      {titre ? <p className="mb-1 font-display font-bold text-brand-900">{titre}</p> : null}
      <div className="space-y-2 text-ink-600">{children}</div>
    </aside>
  );
}
