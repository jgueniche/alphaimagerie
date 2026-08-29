# État d'avancement — refonte alphaimagerie.fr

| Phase | Contenu | Statut |
|---|---|---|
| **0 — Audit & questions** | Crawl site actuel (`docs/audit-site-actuel.md`), benchmark (`docs/benchmark.md`), questions uniques (`docs/questions.md`) | **Livrée — lot 1 de réponses client intégré (28/08)** |
| 1 — Conception | `docs/sitemap.md`, `docs/keyword-map.csv`, `docs/design-system.md`, `docs/content-plan.md`, `docs/tracking-plan.md`, `docs/nap-master.md` | **En cours** — « arbitrage sur site réel » demandé par le client |
| 2 — Squelette + pilotes | Layout, composants, `/centres/cergy` + `/examens/irm` | **Livrée en v1 (28/08)** — build vert, 12 pages statiques, 301 testées ; arbitrage design/UX client attendu |
| 3 — Contenu intégral | Toutes pages §5 du brief, marquées à valider médicalement | **Livrée (28/08 soir, lots 2–6)** : 24 zones longue traîne (12 IRM, 6 scanner, 6 écho), hub `/preparer-mon-examen` + 11 fiches imprimables (CSS print), formulaire `/contact` conforme §3.2 (transport factice en attente Brevo q.46), `/professionnels-de-sante`, `/faq`, `/recrutement`, pages légales complètes (`/politique-de-confidentialite` + `docs/rgpd/`, `/cookies`, `/accessibilite`, `/plan-du-site`). **77 pages générées.** Hors périmètre lancement : pages Goussainville détaillées (P0.1), fiches `/equipe/[dr]` (attente q.10/26), tarifs détaillés (q.40), actualités (q.51) |
| 4 — SEO / schema / analytics / CMP | JSON-LD, GTM/GA4/Consent Mode v2, mesure exemptée, 301 | **Socle livré (28/08) + volet technique clos (29/08)** : images OG par gabarit (`/og` via next/og), dataLayer first-party complet (0 tag tiers), script de similarité bloquant, suite Playwright 60 tests, CI GitHub Actions + Lighthouse CI. **29/08** : fonctions forcées en `cdg1` (elles tournaient en `iad1`), garde-fous données structurées et SEO on-page ajoutés au build et à la CI. **Restent (bloqués par arbitrages q.44–47)** : CMP + Consent Mode v2 + GTM/GA4 + mesure exemptée |
| 5 — QA & migration | DoD §13, `docs/migration.md`, handover README | **En cours (29/08)** — livrés : `docs/migration.md` (runbook de bascule, DNS OVH relevé), `docs/compliance-checklist.md` (recette signable), `docs/rich-results.md`, `docs/google-ads-plan.md`, `docs/gbp-playbook.md`, README de passation. **Restent** : mesure PSI sur la production (clé API à fournir), test Rich Results en ligne (après bascule), relecture médicale (55 fichiers), signature de la checklist |

Notes de session :
- 2026-08-27 : **Phase 0 livrée** — `docs/audit-site-actuel.md`, `docs/benchmark.md` (+ annexes `docs/benchmark/`), `docs/questions.md` (57 questions, une seule passe). GSC non audité (accès manquant → question n° 38). CWV lab non mesurés (PSI en quota anonyme épuisé, Lighthouse local bloqué par l'interception TLS du bac à sable) → relance PSI avec clé API en Phase 1 (`docs/benchmark/psi_fetch.sh`).
- Découvertes clés : aucune page modalité×ville chez aucun concurrent (terrain libre) ; SELAS au RCS Pontoise (SIREN 928 012 830) ; société IMGG (Goussainville Gare, 16/09/2025) ; 10 praticiens sur Doctolib Cergy dont 3 identifiés ; incohérence horaires site (8h–22h) vs Doctolib (8h–19h) à trancher.
- **Prochain jalon : réponses du client à `docs/questions.md` (P0) + validation de ce dossier → lancement Phase 1.** *(fait le 28/08 — lot 1 intégré)*
- 2026-08-28 : Phases 1 (docs de conception) et 2 (squelette + pilotes `/centres/cergy`, `/examens/irm`) livrées en v1 sur instruction client (« on arbitrera sur un site réel »). Build vert (12 pages SSG), lint/tsc OK, 301 Wix testées (accent + encodé), blocage prod des `[[À CONFIRMER]]` vérifié.
- 2026-08-28 (soir) : **master = branche par défaut GitHub et branche de production Vercel** (bascule faite par le client). Production publique : https://alphaimagerie.vercel.app (Vercel Authentication maintenue sur les previews). Rappel : un déploiement de production depuis master reste bloqué tant qu'il subsiste des jetons « À CONFIRMER » (garde-fou §13).
- 2026-08-28 (nuit) : **Phase 3 terminée + socle Phase 4** — 77 pages, suite Playwright verte (59/60, 1 skip volontaire), similarité max 31,5 % (seuil 50 %), contrastes AA corrigés (`ink-400` → #626F8C, `accent` → #9D5420). En attente client : identifiants Brevo (q.46), arbitrages CMP/mesure exemptée/stockage (q.44–47), durées de conservation RGPD (q.58), ligne prescripteurs (q.41).
- 2026-08-29 : **région Vercel corrigée et Phase 5 amorcée.** Sondage de la production :
  `/og` et la Server Action du formulaire répondaient `x-vercel-id: …::iad1::…` — les fonctions
  tournaient à Washington, contre le §4 du brief. Corrigé par `vercel.json` (`regions: ["cdg1"]`)
  + `preferredRegion` sur le layout racine, `/og` et `/contact` ; `scripts/check-region.mjs`
  vérifie la configuration en CI et la région réelle après déploiement.
  Deux garde-fous ajoutés : `check-jsonld.mjs` (5 types du §13, 0 erreur, refus de tout
  `aggregateRating`/`review` au titre de R.4127-19-1) et `check-seo.mjs` (§8.3 et §13 sur les
  71 pages) — ce dernier a révélé 5 métadonnées hors limites, corrigées. La CI tourne désormais
  aussi sur les branches `claude/**` (aucune PR n'étant ouverte sans OK client).
  **Aucune réponse nouvelle dans `docs/questions.md`** : q.41-42, q.44-49, q.50, q.52-53, q.58,
  q.25/27 restent ouvertes, donc ni Brevo, ni CMP, ni Plausible, ni ligne prescripteurs, ni
  JobPosting n'ont été implémentés. Deux questions ajoutées : q.59 (téléphone de l'hébergeur,
  LCEN) et q.60 (accès OVH pour la bascule).

- (Historique) **Déploiement Vercel : action client requise** — le connecteur de la session n'a pas le droit de créer un projet (403). Importer `jgueniche/alphaimagerie` sur https://vercel.com/new (l'intégration GitHub est déjà en place) : chaque push de la branche produira ensuite une preview automatique. Région/functions et domaine : Phase 5.
