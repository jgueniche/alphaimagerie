#!/usr/bin/env node
/**
 * Contrôle des données structurées JSON-LD sur les pages prérendues (§13 du brief :
 * « Rich Results 0 erreur — MedicalClinic, ImagingTest, FAQPage, Physician, BreadcrumbList »).
 *
 * Le test Google Rich Results n'a pas d'API publique et exige une URL en ligne : ce script
 * rejoue localement les contraintes documentées par Google (propriétés requises /
 * recommandées) pour qu'aucune erreur ne subsiste au moment de passer le site à l'outil.
 * La liste des URL à soumettre une fois le domaine basculé est produite dans
 * docs/rich-results.md par `node scripts/check-jsonld.mjs --rapport`.
 *
 * S'y ajoutent deux garde-fous propres au projet :
 *  · R.4127-19-1 — aucun avis, note ou classement ne doit apparaître dans le balisage ;
 *  · aucune donnée de santé, aucune URL non-HTTPS.
 *
 * Usage :
 *   npm run build && node scripts/check-jsonld.mjs
 *   node scripts/check-jsonld.mjs --rapport   # met aussi à jour docs/rich-results.md
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const RACINE = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const BUILD = join(RACINE, ".next/server/app");
const HOTE_CANONIQUE = "www.alphaimagerie.fr";

/** Types dont le §13 exige 0 erreur — chacun doit être présent au moins une fois. */
const TYPES_ATTENDUS = ["MedicalClinic", "ImagingTest", "FAQPage", "Physician", "BreadcrumbList"];

/** Propriétés interdites partout : avis/notes/classements (R.4127-19-1). */
const PROPRIETES_INTERDITES = ["aggregateRating", "review", "reviews", "ratingValue", "award"];

const erreurs = [];
const avertissements = [];
const inventaire = new Map(); // type → [pages]

/* ------------------------------------------------------------------ collecte */

function fichiersHtml(dossier) {
  const sortie = [];
  for (const entree of readdirSync(dossier)) {
    const chemin = join(dossier, entree);
    if (statSync(chemin).isDirectory()) sortie.push(...fichiersHtml(chemin));
    else if (entree.endsWith(".html")) sortie.push(chemin);
  }
  return sortie;
}

/** `.next/server/app/examens/irm.html` → `/examens/irm` ; `index.html` → `/`. */
function urlDe(chemin) {
  const rel = relative(BUILD, chemin).replace(/\.html$/, "");
  return rel === "index" ? "/" : `/${rel}`;
}

/* ---------------------------------------------------------------- validation */

/** Parcourt récursivement un nœud pour appliquer les règles transverses. */
function verifierTransverse(noeud, page, chemin = "$") {
  if (Array.isArray(noeud)) {
    noeud.forEach((v, i) => verifierTransverse(v, page, `${chemin}[${i}]`));
    return;
  }
  if (noeud === null || typeof noeud !== "object") {
    if (typeof noeud === "string" && /^http:\/\//i.test(noeud)) {
      erreurs.push(`${page} — URL non sécurisée en ${chemin} : ${noeud}`);
    }
    return;
  }
  for (const [cle, valeur] of Object.entries(noeud)) {
    if (PROPRIETES_INTERDITES.includes(cle)) {
      erreurs.push(
        `${page} — propriété « ${cle} » en ${chemin} : avis/notes interdits par R.4127-19-1.`,
      );
    }
    verifierTransverse(valeur, page, `${chemin}.${cle}`);
  }
  if (typeof noeud["@type"] === "string" && /^(Review|AggregateRating|Rating)$/.test(noeud["@type"])) {
    erreurs.push(`${page} — type « ${noeud["@type"]} » en ${chemin} : interdit (R.4127-19-1).`);
  }
}

function exige(objet, propriete, page, type) {
  const valeur = objet[propriete];
  const vide =
    valeur === undefined ||
    valeur === null ||
    valeur === "" ||
    (Array.isArray(valeur) && valeur.length === 0);
  if (vide) erreurs.push(`${page} — ${type} : propriété requise « ${propriete} » absente.`);
  return !vide;
}

function recommande(objet, propriete, page, type) {
  if (objet[propriete] === undefined) {
    avertissements.push(`${page} — ${type} : propriété recommandée « ${propriete} » absente.`);
  }
}

function verifierAdresse(objet, page, type) {
  const adresse = objet.address;
  if (!adresse || typeof adresse !== "object") return;
  for (const champ of ["streetAddress", "addressLocality", "postalCode", "addressCountry"]) {
    if (!adresse[champ]) {
      erreurs.push(`${page} — ${type} : address.${champ} manquant (exigé par Google pour LocalBusiness).`);
    }
  }
}

/** Règles par type, calquées sur la documentation Google des résultats enrichis. */
const REGLES = {
  /* Établissement local — requis : name, address. */
  MedicalClinic(objet, page) {
    exige(objet, "name", page, "MedicalClinic");
    if (exige(objet, "address", page, "MedicalClinic")) verifierAdresse(objet, page, "MedicalClinic");
    for (const p of ["telephone", "url", "geo", "openingHoursSpecification"]) {
      recommande(objet, p, page, "MedicalClinic");
    }
  },

  /* Physician hérite de MedicalBusiness : mêmes exigences d'établissement local. */
  Physician(objet, page) {
    exige(objet, "name", page, "Physician");
    if (objet.address) verifierAdresse(objet, page, "Physician");
    else avertissements.push(`${page} — Physician : « address » absent (recommandé si fiche autonome).`);
    recommande(objet, "medicalSpecialty", page, "Physician");
  },

  /* Fil d'Ariane — positions contiguës à partir de 1, item obligatoire sauf sur le dernier maillon. */
  BreadcrumbList(objet, page) {
    if (!exige(objet, "itemListElement", page, "BreadcrumbList")) return;
    const maillons = [].concat(objet.itemListElement);
    maillons.forEach((maillon, i) => {
      const ou = `BreadcrumbList[${i}]`;
      if (maillon["@type"] !== "ListItem") {
        erreurs.push(`${page} — ${ou} : @type doit valoir « ListItem ».`);
      }
      if (maillon.position !== i + 1) {
        erreurs.push(`${page} — ${ou} : position ${maillon.position} attendue ${i + 1} (suite contiguë depuis 1).`);
      }
      if (!maillon.name && !maillon.item?.name) {
        erreurs.push(`${page} — ${ou} : « name » requis.`);
      }
      const dernier = i === maillons.length - 1;
      if (!dernier && !maillon.item) {
        erreurs.push(`${page} — ${ou} : « item » requis sur tous les maillons sauf le dernier.`);
      }
    });
  },

  /* FAQ — mainEntity de Question, chacune avec acceptedAnswer.text non vide. */
  FAQPage(objet, page) {
    if (!exige(objet, "mainEntity", page, "FAQPage")) return;
    const questions = [].concat(objet.mainEntity);
    questions.forEach((q, i) => {
      const ou = `FAQPage.mainEntity[${i}]`;
      if (q["@type"] !== "Question") erreurs.push(`${page} — ${ou} : @type doit valoir « Question ».`);
      if (!q.name) erreurs.push(`${page} — ${ou} : « name » (intitulé de la question) requis.`);
      const reponse = q.acceptedAnswer;
      if (!reponse) erreurs.push(`${page} — ${ou} : « acceptedAnswer » requis.`);
      else {
        if (reponse["@type"] !== "Answer") erreurs.push(`${page} — ${ou}.acceptedAnswer : @type doit valoir « Answer ».`);
        if (!reponse.text?.trim()) erreurs.push(`${page} — ${ou}.acceptedAnswer : « text » requis et non vide.`);
      }
    });
  },

  /* ImagingTest (MedicalTest) : pas de résultat enrichi Google, mais le balisage doit rester
     valide et exploitable — nom et description explicites, aucune promesse de résultat. */
  ImagingTest(objet, page) {
    exige(objet, "name", page, "ImagingTest");
    exige(objet, "imagingTechnique", page, "ImagingTest");
    recommande(objet, "description", page, "ImagingTest");
    // `usedToDiagnose` n'est volontairement pas exigé : lier un examen à une liste de
    // pathologies serait une assertion clinique nouvelle, hors périmètre de la relecture
    // médicale déjà faite (convention « À VALIDER MÉDICALEMENT » de CLAUDE.md).
  },
};

/* --------------------------------------------------------------------- passe */

const pages = fichiersHtml(BUILD).sort();
if (pages.length === 0) {
  console.error("✗ Aucun HTML prérendu dans .next/server/app — lancer `npm run build` d'abord.");
  process.exit(1);
}

const parPage = new Map();

for (const fichier of pages) {
  const url = urlDe(fichier);
  if (url.startsWith("/_")) continue; // _not-found, _global-error
  const html = readFileSync(fichier, "utf8");
  const blocs = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(
    (m) => m[1],
  );
  const typesDeLaPage = [];

  for (const [i, brut] of blocs.entries()) {
    let donnees;
    try {
      donnees = JSON.parse(brut);
    } catch (e) {
      erreurs.push(`${url} — bloc JSON-LD n°${i + 1} illisible : ${e.message}`);
      continue;
    }
    for (const objet of [].concat(donnees)) {
      if (objet["@context"] !== "https://schema.org") {
        erreurs.push(`${url} — bloc n°${i + 1} : @context doit valoir « https://schema.org ».`);
      }
      const type = objet["@type"];
      if (!type) {
        erreurs.push(`${url} — bloc n°${i + 1} : « @type » absent.`);
        continue;
      }
      typesDeLaPage.push(type);
      if (!inventaire.has(type)) inventaire.set(type, []);
      inventaire.get(type).push(url);

      verifierTransverse(objet, url);
      REGLES[type]?.(objet, url);
    }
  }

  parPage.set(url, typesDeLaPage);

  // Fil d'Ariane attendu sur toute page indexable de profondeur ≥ 1 (maillage §7 du brief).
  // Les pages en noindex (confirmation de formulaire) en sont dispensées.
  const profondeur = url.split("/").filter(Boolean).length;
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  if (profondeur >= 1 && !noindex && !typesDeLaPage.includes("BreadcrumbList")) {
    avertissements.push(`${url} — aucun BreadcrumbList alors que la page n'est pas la racine.`);
  }
}

for (const type of TYPES_ATTENDUS) {
  if (!inventaire.has(type)) {
    erreurs.push(`Type « ${type} » exigé par le §13 absent de tout le site.`);
  }
}

/* ------------------------------------------------------------------- rapport */

console.log(`Données structurées — ${parPage.size} pages analysées\n`);
console.log("Inventaire par type :");
for (const [type, urls] of [...inventaire].sort((a, b) => b[1].length - a[1].length)) {
  const marque = TYPES_ATTENDUS.includes(type) ? "§13" : "   ";
  console.log(`  ${marque}  ${type.padEnd(28)} ${String(urls.length).padStart(3)} page(s)`);
}

if (avertissements.length) {
  console.log(`\nAvertissements (${avertissements.length}) — non bloquants :`);
  for (const a of avertissements.slice(0, 25)) console.log(`  ⚠ ${a}`);
  if (avertissements.length > 25) console.log(`  … et ${avertissements.length - 25} autres.`);
}

if (erreurs.length) {
  console.log(`\nErreurs (${erreurs.length}) — bloquantes :`);
  for (const e of erreurs) console.log(`  ✗ ${e}`);
  console.log("\n✗ Données structurées non conformes au §13.");
  process.exit(1);
}

console.log("\n✓ 0 erreur — les 5 types du §13 sont présents et valides.");

/* ------------------------------------------- génération de docs/rich-results.md */

if (process.argv.includes("--rapport")) {
  const exemples = TYPES_ATTENDUS.map((type) => {
    const urls = inventaire.get(type) ?? [];
    return { type, total: urls.length, echantillon: urls.slice(0, 3) };
  });
  const lignes = [
    "<!-- Généré par `node scripts/check-jsonld.mjs --rapport` — ne pas éditer à la main. -->",
    "",
    "# Données structurées — état et plan de vérification Rich Results",
    "",
    `Généré le ${new Date().toISOString().slice(0, 10)} à partir du build (${parPage.size} pages prérendues).`,
    "",
    "## 1. Contrôle automatisé (bloquant en CI)",
    "",
    "`node scripts/check-jsonld.mjs` rejoue les contraintes documentées par Google sur les",
    "pages prérendues : propriétés requises par type, positions du fil d'Ariane, `acceptedAnswer`",
    "des FAQ, adresse complète des établissements. Il refuse en plus tout `aggregateRating`,",
    "`review` ou `Rating` (R.4127-19-1) et toute URL non-HTTPS. **Résultat courant : 0 erreur.**",
    "",
    "## 2. Inventaire",
    "",
    "| Type | Pages | Exemples |",
    "|---|---:|---|",
    ...exemples.map(
      (e) => `| \`${e.type}\` | ${e.total} | ${e.echantillon.map((u) => `\`${u}\``).join(" · ")} |`,
    ),
    ...[...inventaire]
      .filter(([t]) => !TYPES_ATTENDUS.includes(t))
      .sort((a, b) => b[1].length - a[1].length)
      .map(([t, u]) => `| \`${t}\` | ${u.length} | ${u.slice(0, 3).map((x) => `\`${x}\``).join(" · ")} |`),
    "",
    "## 3. Vérification manuelle Rich Results (Phase 5, après bascule du domaine)",
    "",
    "L'outil Google (https://search.google.com/test/rich-results) exige une URL publiquement",
    "accessible : il ne peut pas être passé tant que le site vit sur une preview protégée.",
    "À faire dès que `https://www.alphaimagerie.fr` répond (voir `docs/migration.md`), en",
    "soumettant **une URL par gabarit** :",
    "",
    ...exemples.flatMap((e) =>
      e.echantillon.slice(0, 1).map((u) => `- [ ] \`${e.type}\` → https://${HOTE_CANONIQUE}${u === "/" ? "" : u}`),
    ),
    "",
    "Attendu : **0 erreur** sur chaque URL. Deux avertissements sont normaux et attendus :",
    "",
    "- `ImagingTest` et `MedicalWebPage` ne produisent aucun résultat enrichi chez Google —",
    "  l'outil affichera « aucun élément détecté » tout en validant la syntaxe. C'est conforme :",
    "  le §13 exige 0 **erreur**, pas un aperçu enrichi pour chaque type.",
    "- Les avertissements « champ recommandé manquant » portant sur `image`/`priceRange` sont",
    "  assumés : aucune photo réelle n'est encore fournie (q.37) et aucun tarif n'est publié (q.40).",
    "",
    "## 4. Suivi Search Console",
    "",
    "Après indexation, contrôler dans Search Console → « Améliorations » que les rapports",
    "*Fils d'Ariane* et *FAQ* remontent sans erreur, puis à chaque mise en ligne de contenu.",
    "",
  ];
  writeFileSync(join(RACINE, "docs/rich-results.md"), lignes.join("\n"), "utf8");
  console.log("→ docs/rich-results.md mis à jour.");
}
