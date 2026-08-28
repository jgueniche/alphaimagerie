/**
 * Constantes de site — miroir de docs/nap-master.md (source de vérité éditoriale).
 * Toute donnée marquée « À CONFIRMER » dans nap-master.md reste balisée « À CONFIRMER »
 * dans le contenu, jamais ici : ce fichier ne contient que des valeurs confirmées.
 */
export const SITE = {
  name: "Alpha Imagerie",
  legalName: "SELAS ALPHA IMAGERIE",
  url: "https://www.alphaimagerie.fr",
  email: "contact@alphaimagerie.fr",
  gscVerification: "ol7ZyAQV5TShF2GzDd5J_oV7kF_Fdr_EZ1uIEna9P5Q",
} as const;

export const CERGY = {
  slug: "cergy",
  displayName: "Alpha Imagerie — Cergy Préfecture",
  streetAddress: "2 Mail des Cerclades",
  postalCode: "95000",
  city: "Cergy",
  phoneDisplay: "01 86 30 30 00",
  phoneE164: "+33186303000",
  geo: { lat: 49.03683, lng: 2.08068 },
  doctolibUrl:
    "https://www.doctolib.fr/centre-d-imagerie-medicale/cergy/alpha-imagerie",
  /** Horaires confirmés (jour de nocturne et week-end : voir badges « À CONFIRMER » côté contenu). */
  openingHours: [
    { days: "Lundi – Vendredi", hours: "8h – 19h" },
    { days: "Nocturne hebdomadaire", hours: "19h – 22h" },
    { days: "Samedi – Dimanche", hours: "8h – 18h" },
  ],
  /** schema.org openingHoursSpecification — le build de prod est bloqué tant que le contenu porte des jetons « À CONFIRMER ». */
  openingHoursSpec: [
    { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "19:00" },
    { dayOfWeek: ["Saturday", "Sunday"], opens: "08:00", closes: "18:00" },
  ],
  secretariat: [
    { days: "Lundi – Vendredi", hours: "8h – 18h30" },
    { days: "Samedi", hours: "8h – 12h30" },
  ],
  mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Alpha+Imagerie+2+Mail+des+Cerclades+95000+Cergy",
  appleMapsUrl: "https://maps.apple.com/?daddr=2+Mail+des+Cerclades,+95000+Cergy",
  wazeUrl: "https://waze.com/ul?q=2%20Mail%20des%20Cerclades%2095000%20Cergy&navigate=yes",
} as const;

export const XPLORE = {
  url: "https://imcp-dmz.xplore.fr/Xaportaildiffusionmobile",
} as const;

export const SOCIALS = {
  instagram: "https://www.instagram.com/alpha.imagerie/",
  linkedin: "https://www.linkedin.com/company/alpha-imagerie/",
  // Facebook : deux pages existantes, choix en attente (docs/questions.md q.52)
} as const;

/** Modalités du plateau de Cergy — équipements confirmés par le client le 28/08/2026. */
export const MODALITES = [
  { slug: "irm", label: "IRM", equipment: "2 IRM Philips MR5300 · 1,5 T" },
  { slug: "scanner", label: "Scanner", equipment: "Scanner CT 3500" },
  { slug: "echographie", label: "Échographie", equipment: "4 échographes Canon" },
  { slug: "mammographie", label: "Mammographie", equipment: "Hologic · tomosynthèse 3D" },
  { slug: "radiographie", label: "Radiographie", equipment: "Table Stephanix D2RS" },
  { slug: "osteodensitometrie", label: "Ostéodensitométrie", equipment: "Mesure de la densité osseuse" },
] as const;
