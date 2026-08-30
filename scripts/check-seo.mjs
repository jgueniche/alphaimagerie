#!/usr/bin/env node
/**
 * Contrôle SEO on-page sur les pages prérendues, sur les points que le §13 du brief
 * rend bloquants — « title/description/OG/canonical uniques partout », « 1 seul H1 par
 * page » — et sur les longueurs imposées par le §8.3 (title ≤ 60 car., meta description
 * ≤ 155 car.).
 *
 * La suite Playwright vérifie ces règles sur quelques gabarits, avec un vrai navigateur ;
 * ce script les vérifie sur les 70+ pages du build, sans navigateur, donc en CI à chaque
 * commit. Les pages en `noindex`, s'il en existe, sont exclues des contrôles
 * d'unicité : elles ne concourent pas dans l'index.
 *
 * Usage : npm run build && node scripts/check-seo.mjs
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const RACINE = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const BUILD = join(RACINE, ".next/server/app");
const ORIGINE = "https://www.alphaimagerie.fr";

const MAX_TITRE = 60;
const MAX_DESCRIPTION = 155;

const erreurs = [];
const avertissements = [];

function fichiersHtml(dossier) {
  const sortie = [];
  for (const entree of readdirSync(dossier)) {
    const chemin = join(dossier, entree);
    if (statSync(chemin).isDirectory()) sortie.push(...fichiersHtml(chemin));
    else if (entree.endsWith(".html")) sortie.push(chemin);
  }
  return sortie;
}

/** Décode les entités HTML produites par React pour compter les vrais caractères. */
function decoder(texte) {
  return texte
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x2F;/g, "/")
    .replace(/&nbsp;/g, " ");
}

function meta(html, propriete) {
  const parNom = html.match(new RegExp(`<meta name="${propriete}" content="([^"]*)"`, "i"));
  const parPropriete = html.match(new RegExp(`<meta property="${propriete}" content="([^"]*)"`, "i"));
  const brut = (parNom ?? parPropriete)?.[1];
  return brut === undefined ? undefined : decoder(brut);
}

const pages = [];

for (const fichier of fichiersHtml(BUILD).sort()) {
  const rel = relative(BUILD, fichier).replace(/\.html$/, "");
  if (rel.startsWith("_")) continue; // _not-found, _global-error
  const url = rel === "index" ? "/" : `/${rel}`;
  const html = readFileSync(fichier, "utf8");

  pages.push({
    url,
    noindex: /<meta name="robots" content="[^"]*noindex/.test(html),
    titre: (() => {
      const t = html.match(/<title>(.*?)<\/title>/s);
      return t ? decoder(t[1]) : undefined;
    })(),
    description: meta(html, "description"),
    canonical: html.match(/<link rel="canonical" href="([^"]*)"/)?.[1],
    ogTitre: meta(html, "og:title"),
    ogDescription: meta(html, "og:description"),
    ogImage: meta(html, "og:image"),
    h1: (html.match(/<h1[\s>]/g) ?? []).length,
  });
}

if (pages.length === 0) {
  console.error("✗ Aucun HTML prérendu dans .next/server/app — lancer `npm run build` d'abord.");
  process.exit(1);
}

/* -------------------------------------------------------------- page par page */

for (const p of pages) {
  if (!p.titre) erreurs.push(`${p.url} — <title> absent.`);
  else if (p.titre.length > MAX_TITRE) {
    erreurs.push(`${p.url} — title de ${p.titre.length} car. (max ${MAX_TITRE}, §8.3) : « ${p.titre} »`);
  }

  if (!p.description) erreurs.push(`${p.url} — meta description absente.`);
  else if (p.description.length > MAX_DESCRIPTION) {
    erreurs.push(
      `${p.url} — meta description de ${p.description.length} car. (max ${MAX_DESCRIPTION}, §8.3).`,
    );
  }

  if (p.h1 !== 1) erreurs.push(`${p.url} — ${p.h1} <h1> (exactement 1 attendu, §8.3).`);

  if (p.noindex) continue; // pas de canonical ni d'OG exigés sur une page hors index

  if (!p.canonical) erreurs.push(`${p.url} — <link rel="canonical"> absent.`);
  else if (!p.canonical.startsWith(ORIGINE)) {
    erreurs.push(`${p.url} — canonical hors domaine canonique : ${p.canonical}`);
  } else if (
    p.url === "/"
      ? ![ORIGINE, `${ORIGINE}/`].includes(p.canonical) // metadataBase rend la racine sans barre finale
      : p.canonical !== `${ORIGINE}${p.url}`
  ) {
    // Un canonical qui ne pointe pas la page elle-même est légitime (variante consolidée),
    // mais assez rare pour mériter d'être signalé plutôt que passé sous silence.
    avertissements.push(`${p.url} — canonical pointant ailleurs : ${p.canonical}`);
  }

  for (const [champ, valeur] of [
    ["og:title", p.ogTitre],
    ["og:description", p.ogDescription],
    ["og:image", p.ogImage],
  ]) {
    if (!valeur) erreurs.push(`${p.url} — ${champ} absent.`);
  }
}

/* -------------------------------------------------------------------- unicité */

const indexables = pages.filter((p) => !p.noindex);

function doublons(champ, libelle) {
  const par = new Map();
  for (const p of indexables) {
    const v = p[champ];
    if (!v) continue;
    if (!par.has(v)) par.set(v, []);
    par.get(v).push(p.url);
  }
  for (const [valeur, urls] of par) {
    if (urls.length > 1) {
      erreurs.push(
        `${libelle} dupliqué sur ${urls.length} pages (${urls.slice(0, 4).join(", ")}${urls.length > 4 ? ", …" : ""}) : « ${String(valeur).slice(0, 90)} »`,
      );
    }
  }
}

doublons("titre", "title");
doublons("description", "meta description");
doublons("canonical", "canonical");
doublons("ogTitre", "og:title");

/* -------------------------------------------------------------------- rapport */

const longueurs = indexables.map((p) => p.titre?.length ?? 0);
const moyenne = Math.round(longueurs.reduce((a, b) => a + b, 0) / longueurs.length);

console.log(`SEO on-page — ${pages.length} pages (${indexables.length} indexables)\n`);
console.log(`  title       : ${Math.min(...longueurs)}–${Math.max(...longueurs)} car. (moyenne ${moyenne}, max ${MAX_TITRE})`);
const dl = indexables.map((p) => p.description?.length ?? 0);
console.log(`  description : ${Math.min(...dl)}–${Math.max(...dl)} car. (max ${MAX_DESCRIPTION})`);
console.log(`  canonical   : ${indexables.filter((p) => p.canonical).length}/${indexables.length}`);
console.log(`  og:image    : ${indexables.filter((p) => p.ogImage).length}/${indexables.length}`);

if (avertissements.length) {
  console.log(`\nAvertissements (${avertissements.length}) :`);
  for (const a of avertissements.slice(0, 15)) console.log(`  ⚠ ${a}`);
}

if (erreurs.length) {
  console.log(`\nErreurs (${erreurs.length}) — bloquantes :`);
  for (const e of erreurs.slice(0, 40)) console.log(`  ✗ ${e}`);
  if (erreurs.length > 40) console.log(`  … et ${erreurs.length - 40} autres.`);
  console.log("\n✗ SEO on-page non conforme au §13.");
  process.exit(1);
}

console.log("\n✓ Titles, descriptions, OG et canonicals uniques et dans les limites du §8.3.");
