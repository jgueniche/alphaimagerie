#!/usr/bin/env node
/**
 * Garde-fou « région d'exécution UE » (§4 du brief : cdg1/fra1, jamais hors UE).
 *
 * Deux niveaux de contrôle :
 *
 *  1. Hors ligne (toujours exécuté, utilisable en CI) — la configuration déclare-t-elle
 *     bien une région UE ? `regions` dans vercel.json + `preferredRegion` sur les segments
 *     qui portent une fonction (layout racine, route /og, page /contact).
 *
 *  2. En ligne (si une URL est passée) — les fonctions déployées s'exécutent-elles
 *     réellement en UE ? Vercel expose la région dans `x-vercel-id`, sous la forme
 *     `<edge>::<region>::<id>` quand une fonction a tourné (`<edge>::<id>` quand la
 *     réponse sort du cache CDN). On ne sonde donc que des routes qui exécutent du code :
 *       · /og            → route handler next/og ;
 *       · POST /contact avec un en-tête `Next-Action` bidon → force l'exécution de la
 *         fonction qui porte la Server Action (404 attendu : seule la région nous intéresse).
 *
 * Usage :
 *   node scripts/check-region.mjs                                  # config seule
 *   node scripts/check-region.mjs https://alphaimagerie.vercel.app  # config + déploiement
 *   VERCEL_BYPASS=<token> node scripts/check-region.mjs <url-preview>   # preview protégée
 */

import { readFileSync } from "node:fs";

/** Régions Vercel situées dans l'UE/EEE. cdg1 (Paris) et fra1 (Francfort) sont celles du brief. */
const REGIONS_UE = new Set(["cdg1", "fra1", "arn1", "dub1", "zrh1"]);

let echec = false;
const ko = (msg) => {
  console.log(`  ✗ ${msg}`);
  echec = true;
};
const ok = (msg) => console.log(`  ✓ ${msg}`);

/* ---------------------------------------------------------------- 1. configuration */

console.log("1. Configuration déclarée\n");

try {
  const vercelJson = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
  const regions = vercelJson.regions ?? [];
  if (regions.length === 0) ko("vercel.json : aucune clé « regions »");
  else if (regions.every((r) => REGIONS_UE.has(r))) ok(`vercel.json regions = ${regions.join(", ")}`);
  else ko(`vercel.json regions = ${regions.join(", ")} — hors UE`);
} catch (e) {
  ko(`vercel.json illisible (${e.message})`);
}

const SEGMENTS = [
  ["src/app/layout.tsx", "layout racine (hérité par tous les segments)"],
  ["src/app/og/route.tsx", "route /og"],
  ["src/app/contact/page.tsx", "page /contact (Server Action)"],
];

for (const [fichier, label] of SEGMENTS) {
  let source;
  try {
    source = readFileSync(new URL(`../${fichier}`, import.meta.url), "utf8");
  } catch {
    ko(`${label} : fichier introuvable (${fichier})`);
    continue;
  }
  const trouve = source.match(/export const preferredRegion\s*=\s*"([a-z0-9]+)"/);
  if (!trouve) ko(`${label} : pas d'export preferredRegion`);
  else if (REGIONS_UE.has(trouve[1])) ok(`${label} : preferredRegion = ${trouve[1]}`);
  else ko(`${label} : preferredRegion = ${trouve[1]} — hors UE`);
}

/* ------------------------------------------------------------------ 2. déploiement */

const base = (process.argv[2] ?? process.env.SITE_URL)?.replace(/\/$/, "");

if (!base) {
  console.log("\n2. Déploiement — ignoré (aucune URL passée en argument).");
} else {
  console.log(`\n2. Déploiement — ${base}\n`);

  const bypass = process.env.VERCEL_BYPASS
    ? { "x-vercel-protection-bypass": process.env.VERCEL_BYPASS }
    : {};

  const SONDES = [
    {
      label: "route /og (next/og)",
      url: `${base}/og?titre=${encodeURIComponent(`Contrôle ${Date.now()}`)}`,
      init: { headers: bypass },
    },
    {
      label: "Server Action /contact",
      url: `${base}/contact`,
      init: {
        method: "POST",
        // Identifiant d'action volontairement invalide : Next répond 404 mais la fonction
        // a bien été exécutée, ce qui suffit à lire sa région dans x-vercel-id.
        headers: { ...bypass, "Next-Action": "0".repeat(41) + "a", "content-type": "text/plain" },
        body: "",
      },
    },
  ];

  for (const sonde of SONDES) {
    try {
      const reponse = await fetch(sonde.url, { ...sonde.init, redirect: "manual" });
      const id = reponse.headers.get("x-vercel-id") ?? "";
      const parts = id.split("::");
      const region = parts.length >= 3 ? parts[1] : null;

      const sso =
        reponse.status === 401 ||
        (reponse.status === 302 && (reponse.headers.get("location") ?? "").includes("/sso-api"));

      if (sso) {
        // Vercel Authentication intercepte la requête à l'edge : aucune fonction n'est
        // exécutée, donc aucune région à lire. Il faut un jeton « Protection Bypass for
        // Automation » (Vercel → Settings → Deployment Protection), ou attendre que le
        // déploiement soit public (production).
        ko(`${sonde.label} : déploiement protégé par Vercel Authentication (${reponse.status}) — relancer avec VERCEL_BYPASS=<jeton>, ou viser un déploiement public`);
      } else if (!region) {
        ko(`${sonde.label} : région absente de x-vercel-id (« ${id || "en-tête manquant"} ») — réponse servie par le cache ?`);
      } else if (REGIONS_UE.has(region)) {
        ok(`${sonde.label} : ${region}`);
      } else {
        ko(`${sonde.label} : ${region} — hors UE (${id})`);
      }
    } catch (e) {
      ko(`${sonde.label} : requête impossible (${e.message})`);
    }
  }
}

console.log(
  echec
    ? "\n✗ Région non conforme — §4 du brief impose cdg1/fra1 pour toutes les fonctions."
    : "\n✓ Région conforme (UE).",
);
process.exit(echec ? 1 : 0);
