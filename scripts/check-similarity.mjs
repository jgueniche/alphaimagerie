#!/usr/bin/env node
/**
 * Contrôle anti-duplication (§6 du brief : « zéro contenu dupliqué », script de
 * similarité en CI). Compare toutes les paires de fichiers MDX de /content :
 * similarité de Jaccard sur des shingles de 5 mots du corps (frontmatter exclu).
 *
 * Seuils : > SEUIL_ERREUR = échec (build/CI) ; > SEUIL_ALERTE = avertissement.
 * Les gabarits partagent des tournures (résultats, prise en charge) : les seuils
 * visent la duplication réelle de contenu, pas l'air de famille éditorial.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const SEUIL_ERREUR = Number(process.env.SIMILARITY_MAX ?? 0.5);
const SEUIL_ALERTE = Number(process.env.SIMILARITY_WARN ?? 0.35);
const TAILLE_SHINGLE = 5;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (p.endsWith(".mdx")) yield p;
  }
}

function corps(fichier) {
  const brut = readFileSync(fichier, "utf8");
  const m = brut.match(/^---\n[\s\S]*?\n---\n?/);
  return m ? brut.slice(m[0].length) : brut;
}

function shingles(texte) {
  const mots = texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const s = new Set();
  for (let i = 0; i + TAILLE_SHINGLE <= mots.length; i++) {
    s.add(mots.slice(i, i + TAILLE_SHINGLE).join(" "));
  }
  return s;
}

function jaccard(a, b) {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  const [petit, grand] = a.size < b.size ? [a, b] : [b, a];
  for (const x of petit) if (grand.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

const fichiers = [...walk("content")];
const ensembles = new Map(fichiers.map((f) => [f, shingles(corps(f))]));

const erreurs = [];
const alertes = [];
for (let i = 0; i < fichiers.length; i++) {
  for (let j = i + 1; j < fichiers.length; j++) {
    const sim = jaccard(ensembles.get(fichiers[i]), ensembles.get(fichiers[j]));
    const ligne = `${(sim * 100).toFixed(1).padStart(5)} %  ${fichiers[i]} ↔ ${fichiers[j]}`;
    if (sim > SEUIL_ERREUR) erreurs.push(ligne);
    else if (sim > SEUIL_ALERTE) alertes.push(ligne);
  }
}

if (alertes.length > 0) {
  console.warn(`⚠ ${alertes.length} paire(s) au-dessus de ${SEUIL_ALERTE * 100} % (à surveiller) :`);
  for (const l of alertes.sort().reverse()) console.warn(`  ${l}`);
}
if (erreurs.length > 0) {
  console.error(`✖ Duplication détectée (> ${SEUIL_ERREUR * 100} %) :`);
  for (const l of erreurs.sort().reverse()) console.error(`  ${l}`);
  process.exit(1);
}
console.log(`✓ Similarité OK — ${fichiers.length} fichiers, max autorisé ${SEUIL_ERREUR * 100} %.`);
