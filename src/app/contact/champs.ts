/** Listes fermées du formulaire de contact (§3.2 du brief — RGPD : minimisation). */

export const CIVILITES = ["Madame", "Monsieur", "Autre / ne se prononce pas"] as const;

export const SITES = ["Cergy Préfecture", "Goussainville (ouverture fin 2027)"] as const;

export const DEMANDES = [
  "Renseignement général",
  "Prise de rendez-vous",
  "Résultats d'examen",
  "Professionnel de santé",
  "Autre",
] as const;

/** Slugs de tracking (docs/tracking-plan.md) — jamais de texte libre dans le dataLayer. */
export const SITE_SLUGS: Record<(typeof SITES)[number], string> = {
  "Cergy Préfecture": "cergy",
  "Goussainville (ouverture fin 2027)": "goussainville",
};

export const DEMANDE_SLUGS: Record<(typeof DEMANDES)[number], string> = {
  "Renseignement général": "renseignement",
  "Prise de rendez-vous": "rendez-vous",
  "Résultats d'examen": "resultats",
  "Professionnel de santé": "prescripteur",
  Autre: "autre",
};

export type ContactFormState = {
  ok: boolean;
  /** Vrai après un envoi réussi : le client émet contact_submit puis navigue vers /contact/merci. */
  envoye?: boolean;
  /** Slugs pour l'événement contact_submit (aucune donnée du formulaire dans l'URL). */
  meta?: { site: string; request_type: string };
  /** Erreurs par champ (clé = nom du champ, "_" = erreur globale). */
  erreurs: Record<string, string>;
  /** Valeurs saisies, réinjectées dans le formulaire en cas d'erreur. */
  valeurs: Record<string, string>;
};

export const ETAT_INITIAL: ContactFormState = { ok: true, erreurs: {}, valeurs: {} };
