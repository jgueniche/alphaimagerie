#!/usr/bin/env node
/**
 * Convention [[À CONFIRMER]] (CLAUDE.md) : le build de PRODUCTION échoue s'il reste
 * des jetons [[À CONFIRMER : …]] dans le contenu ou le code applicatif.
 * En dev/préprod : simple avertissement listant les occurrences.
 *
 * Strict (bloquant) si : CHECK_CONFIRMER === "strict", ou déploiement Vercel « production »
 * depuis la branche `main` (la vraie prod du brief). Tant que la branche de travail sert de
 * branche par défaut, ses déploiements Vercel sont étiquetés "production" mais restent des
 * previews d'arbitrage : avertissement seulement.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const ROOTS = ["content", "src"];
const EXT = new Set([".mdx", ".md", ".ts", ".tsx"]);
const TOKEN = "[[À CONFIRMER";
const ref = process.env.VERCEL_GIT_COMMIT_REF;
const strict =
  process.env.CHECK_CONFIRMER === "strict" ||
  (process.env.VERCEL_ENV === "production" && (!ref || ref === "main"));

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (EXT.has(path.extname(p))) yield p;
  }
}

const hits = [];
for (const root of ROOTS) {
  try {
    for (const file of walk(root)) {
      const lines = readFileSync(file, "utf8").split("\n");
      lines.forEach((line, i) => {
        if (line.includes(TOKEN)) hits.push(`${file}:${i + 1}  ${line.trim().slice(0, 110)}`);
      });
    }
  } catch {
    /* dossier absent : ignorer */
  }
}

if (hits.length > 0) {
  const header = `${hits.length} occurrence(s) de ${TOKEN}]] :`;
  if (strict) {
    console.error(`\n✖ BUILD DE PRODUCTION BLOQUÉ — ${header}\n` + hits.map((h) => `  - ${h}`).join("\n"));
    process.exit(1);
  }
  console.warn(`\n⚠ ${header} (non bloquant hors production)\n` + hits.map((h) => `  - ${h}`).join("\n") + "\n");
} else {
  console.log("✓ Aucun [[À CONFIRMER]] résiduel.");
}
