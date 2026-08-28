# État d'avancement — refonte alphaimagerie.fr

| Phase | Contenu | Statut |
|---|---|---|
| **0 — Audit & questions** | Crawl site actuel (`docs/audit-site-actuel.md`), benchmark (`docs/benchmark.md`), questions uniques (`docs/questions.md`) | **Livrée — lot 1 de réponses client intégré (28/08)** |
| 1 — Conception | `docs/sitemap.md`, `docs/keyword-map.csv`, `docs/design-system.md`, `docs/content-plan.md`, `docs/tracking-plan.md`, `docs/nap-master.md` | **En cours** — « arbitrage sur site réel » demandé par le client |
| 2 — Squelette + pilotes | Layout, composants, `/centres/cergy` + `/examens/irm` | **Livrée en v1 (28/08)** — build vert, 12 pages statiques, 301 testées ; arbitrage design/UX client attendu |
| 3 — Contenu intégral | Toutes pages §5 du brief, marquées à valider médicalement | **Lot 1 livré (28/08)** : 7 piliers examens + hystérosalpingographie + 4 pages interventionnelles + 6 landings modalité×ville Cergy (28 pages générées). Restent : zones IRM/scanner/écho, préparer-mon-examen, équipe, professionnels-de-santé, FAQ globale, contact (formulaire), recrutement, pages légales secondaires |
| 4 — SEO / schema / analytics / CMP | JSON-LD, GTM/GA4/Consent Mode v2, mesure exemptée, 301 | À faire |
| 5 — QA & migration | DoD §13, `docs/migration.md`, handover README | À faire |

Notes de session :
- 2026-08-27 : **Phase 0 livrée** — `docs/audit-site-actuel.md`, `docs/benchmark.md` (+ annexes `docs/benchmark/`), `docs/questions.md` (57 questions, une seule passe). GSC non audité (accès manquant → question n° 38). CWV lab non mesurés (PSI en quota anonyme épuisé, Lighthouse local bloqué par l'interception TLS du bac à sable) → relance PSI avec clé API en Phase 1 (`docs/benchmark/psi_fetch.sh`).
- Découvertes clés : aucune page modalité×ville chez aucun concurrent (terrain libre) ; SELAS au RCS Pontoise (SIREN 928 012 830) ; société IMGG (Goussainville Gare, 16/09/2025) ; 10 praticiens sur Doctolib Cergy dont 3 identifiés ; incohérence horaires site (8h–22h) vs Doctolib (8h–19h) à trancher.
- **Prochain jalon : réponses du client à `docs/questions.md` (P0) + validation de ce dossier → lancement Phase 1.** *(fait le 28/08 — lot 1 intégré)*
- 2026-08-28 : Phases 1 (docs de conception) et 2 (squelette + pilotes `/centres/cergy`, `/examens/irm`) livrées en v1 sur instruction client (« on arbitrera sur un site réel »). Build vert (12 pages SSG), lint/tsc OK, 301 Wix testées (accent + encodé), blocage prod des `[[À CONFIRMER]]` vérifié.
- **Déploiement Vercel : action client requise** — le connecteur de la session n'a pas le droit de créer un projet (403). Importer `jgueniche/alphaimagerie` sur https://vercel.com/new (l'intégration GitHub est déjà en place) : chaque push de la branche produira ensuite une preview automatique. Région/functions et domaine : Phase 5.
