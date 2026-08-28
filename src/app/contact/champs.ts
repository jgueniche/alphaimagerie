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

export type ContactFormState = {
  ok: boolean;
  /** Erreurs par champ (clé = nom du champ, "_" = erreur globale). */
  erreurs: Record<string, string>;
  /** Valeurs saisies, réinjectées dans le formulaire en cas d'erreur. */
  valeurs: Record<string, string>;
};

export const ETAT_INITIAL: ContactFormState = { ok: true, erreurs: {}, valeurs: {} };
