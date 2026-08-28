import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

/**
 * Chargeur de contenu MDX (/content) avec frontmatter validé par zod.
 * Tout se passe au build (SSG) — aucune lecture au runtime client.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

const faqSchema = z.array(
  z.object({ question: z.string().min(8), reponse: z.string().min(20) }),
);

export const MODALITY_VALUES = [
  "irm",
  "scanner",
  "echographie",
  "mammographie",
  "radiographie",
  "osteodensitometrie",
  "interventionnel",
  "hysterosalpingographie",
] as const;

export const examenSchema = z.object({
  type: z.literal("examen"),
  slug: z.string(),
  title: z.string().max(90),
  chapo: z.string().max(220),
  metaTitle: z.string().max(60),
  metaDescription: z.string().max(155),
  modality: z.enum(MODALITY_VALUES),
  /** Fiche synthèse (§8.2 du brief) */
  duree: z.string(),
  injection: z.string(),
  preparation: z.string(),
  resultats: z.string(),
  disponibleA: z.array(z.enum(["cergy", "goussainville"])),
  faq: faqSchema,
  aValiderMedicalement: z.boolean().default(true),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const centreSchema = z.object({
  type: z.literal("centre"),
  slug: z.enum(["cergy", "goussainville"]),
  title: z.string().max(90),
  metaTitle: z.string().max(60),
  metaDescription: z.string().max(155),
  statut: z.enum(["ouvert", "teaser"]),
  faq: faqSchema.optional(),
  aValiderMedicalement: z.boolean().default(true),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const modaliteVilleSchema = z.object({
  type: z.literal("modalite-ville"),
  ville: z.literal("cergy"),
  modality: z.enum(MODALITY_VALUES),
  title: z.string().max(90),
  chapo: z.string().max(220),
  metaTitle: z.string().max(60),
  metaDescription: z.string().max(155),
  faq: faqSchema.optional(),
  aValiderMedicalement: z.boolean().default(true),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

/** Piliers déclinables en pages zone (gabarit resserré, §5 du brief). */
export const ZONE_PARENTS = ["irm", "scanner", "echographie"] as const;
export type ZoneParent = (typeof ZONE_PARENTS)[number];

export const examenZoneSchema = examenSchema.extend({
  type: z.literal("examen-zone"),
  parent: z.enum(ZONE_PARENTS),
  /** Libellé court pour les grilles de liens et le fil d'Ariane. */
  navLabel: z.string().max(45),
  faq: faqSchema.min(4).max(6),
});

/** Fiches de préparation imprimables (/preparer-mon-examen/[slug], §5 du brief). */
export const preparationSchema = z.object({
  type: z.literal("preparation"),
  slug: z.string(),
  /** Libellé court de l'examen : « IRM », « Scanner »… */
  examen: z.string().max(60),
  title: z.string().max(90),
  metaTitle: z.string().max(60),
  metaDescription: z.string().max(155),
  /** Checklist « À apporter » (cases à cocher imprimables). */
  apporter: z.array(z.string().min(4)).min(3),
  /** Durée indicative de présence sur place. */
  surPlace: z.string(),
  /** Page examen détaillée liée. */
  lienExamen: z.string().startsWith("/examens"),
  aValiderMedicalement: z.boolean().default(true),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export type ExamenFrontmatter = z.infer<typeof examenSchema>;
export type PreparationFrontmatter = z.infer<typeof preparationSchema>;
export type ExamenZoneFrontmatter = z.infer<typeof examenZoneSchema>;
export type CentreFrontmatter = z.infer<typeof centreSchema>;
export type ModaliteVilleFrontmatter = z.infer<typeof modaliteVilleSchema>;

function load(relPath: string) {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, relPath), "utf8");
  return matter(raw);
}

function listSlugs(relDir: string): string[] {
  const dir = path.join(CONTENT_DIR, relDir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
    .sort();
}

export function getExamen(slug: string): { frontmatter: ExamenFrontmatter; body: string } {
  const { data, content } = load(path.join("examens", `${slug}.mdx`));
  const frontmatter = examenSchema.parse(data);
  return { frontmatter, body: content };
}

export function listExamens(): string[] {
  return listSlugs("examens");
}

export function getExamenZone(
  parent: ZoneParent,
  zone: string,
): { frontmatter: ExamenZoneFrontmatter; body: string } {
  const { data, content } = load(path.join("examens", parent, `${zone}.mdx`));
  const frontmatter = examenZoneSchema.parse(data);
  return { frontmatter, body: content };
}

export function listExamenZones(parent: ZoneParent): string[] {
  return listSlugs(path.join("examens", parent));
}

export function getInterventionnel(slug: string): { frontmatter: ExamenFrontmatter; body: string } {
  const { data, content } = load(path.join("examens", "interventionnel", `${slug}.mdx`));
  const frontmatter = examenSchema.parse(data);
  return { frontmatter, body: content };
}

export function listInterventionnels(): string[] {
  return listSlugs(path.join("examens", "interventionnel"));
}

export function getPreparation(slug: string): { frontmatter: PreparationFrontmatter; body: string } {
  const { data, content } = load(path.join("preparation", `${slug}.mdx`));
  const frontmatter = preparationSchema.parse(data);
  return { frontmatter, body: content };
}

export function listPreparations(): string[] {
  return listSlugs("preparation");
}

export function getCentre(slug: string): { frontmatter: CentreFrontmatter; body: string } {
  const { data, content } = load(path.join("centres", `${slug}.mdx`));
  const frontmatter = centreSchema.parse(data);
  return { frontmatter, body: content };
}

export function getModaliteVille(ville: "cergy", modalite: string): { frontmatter: ModaliteVilleFrontmatter; body: string } {
  const { data, content } = load(path.join("centres", ville, `${modalite}.mdx`));
  const frontmatter = modaliteVilleSchema.parse(data);
  return { frontmatter, body: content };
}

export function listModalitesVille(ville: "cergy"): string[] {
  return listSlugs(path.join("centres", ville));
}
