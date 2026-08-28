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

export type ExamenFrontmatter = z.infer<typeof examenSchema>;
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

export function getInterventionnel(slug: string): { frontmatter: ExamenFrontmatter; body: string } {
  const { data, content } = load(path.join("examens", "interventionnel", `${slug}.mdx`));
  const frontmatter = examenSchema.parse(data);
  return { frontmatter, body: content };
}

export function listInterventionnels(): string[] {
  return listSlugs(path.join("examens", "interventionnel"));
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
