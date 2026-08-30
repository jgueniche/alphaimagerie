# alphaimagerie.fr

Site vitrine de la **SELAS Alpha Imagerie** — imagerie médicale à Cergy Préfecture (95),
second centre à Goussainville prévu fin 2027.

Next.js 15 App Router · TypeScript strict · Tailwind CSS v4 · contenu MDX · déploiement Vercel.
70 pages statiques, aucun script tiers, aucun cookie.

> **À lire avant toute modification** : [`CLAUDE.md`](CLAUDE.md) — règles bloquantes
> (conformité déontologique, RGPD, HDS, workflow de mise en production) et données client
> confirmées. Le brief fondateur est dans [`docs/BRIEF.md`](docs/BRIEF.md).

---

## Démarrer

```bash
npm ci          # et non `npm install` : le lockfile fait foi
npm run dev     # http://localhost:3000
```

Node 22. **Aucune variable d'environnement n'est nécessaire**, ni en développement ni en
production : le site est entièrement statique et ne parle à aucun service.

## Commandes

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production — **enchaîne les garde-fous contenu** avant `next build` |
| `npm start` | Sert le build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check:similarity` | Détection de duplication entre pages proches (seuil 50 %) |
| `npm run check:region` | Région d'exécution UE — configuration, et déploiement si une URL est passée |
| `npm run check:jsonld` | Données structurées : 5 types du §13, 0 erreur |
| `npm run check:seo` | title / description / OG / canonical : longueurs et unicité |
| `npm run check:html` | Validation HTML et accessibilité des 72 pages prérendues |
| `npm test` | Suite Playwright (82 tests, 2 profils) |

Les `check:*` lisent le HTML **prérendu** : lancer `npm run build` d'abord.

## Les six garde-fous

Ils sont tous bloquants en CI. Ce ne sont pas des conventions de style : chacun protège une
exigence contractuelle du brief.

1. **`scripts/check-confirmer.mjs`** — aucun jeton `[[À CONFIRMER : …]]` ne part en
   production. En développement, simple avertissement ; en CI (`CHECK_CONFIRMER=strict`) et
   sur un déploiement de production, échec du build. *Rien d'inventé ne doit être publié :
   tout fait médical, tarifaire, d'équipement, d'horaire ou juridique non confirmé par le
   client s'écrit avec ce jeton.*
2. **`scripts/check-similarity.mjs`** — les 24 pages de zone et les 6 landings
   modalité×ville se ressemblent par construction ; au-delà de 50 % de similarité, le build
   échoue. *Protège contre la pénalité de contenu dupliqué.*
3. **`scripts/check-region.mjs`** — les fonctions serveur doivent s'exécuter dans l'UE
   (`cdg1`). *§4 du brief. Le site n'ayant plus de Server Action, seule la route `/og`
   s'exécute encore à la demande — la règle reste vraie pour tout code serveur à venir.*
4. **`scripts/check-jsonld.mjs`** — données structurées valides, et **refus de tout
   `aggregateRating`, `review` ou `Rating`**. *L'article R.4127-19-1 CSP interdit les avis
   et notations : le garde-fou empêche qu'un balisage les réintroduise par inadvertance.*
5. **`scripts/check-seo.mjs`** — title ≤ 60 car., description ≤ 155 car., un seul `<h1>`,
   canonical et Open Graph présents, tout cela unique sur les 70 pages indexables. *§8.3 et
   §13.*
6. **`html-validate`** (`.htmlvalidate.json`) — conformité au modèle de contenu HTML et
   règles d'accessibilité, sur les 72 pages prérendues. *§13 : « validation HTML, 0 erreur
   bloquante ».* Le validateur W3C en ligne n'étant pas automatisable, la vérification se
   fait hors ligne. Les règles purement stylistiques et la sérialisation JSX de React
   (`charSet`, `crossorigin=""`, identifiants `useId`) sont désactivées, avec la raison ;
   `.htmlvalidateignore` exclut le seul gabarit 500 interne de Next, non surchargeable.

À quoi s'ajoute la suite Playwright, dont `tests/e2e/tiers.spec.ts` : **0 requête tierce et
0 cookie** au chargement, sur six gabarits. C'est la preuve technique de la conformité CNIL
tant qu'aucune CMP n'est installée.

## Où se trouve quoi

```
content/                MDX + frontmatter validé par zod — c'est ici qu'on édite le contenu
  examens/              piliers, zones (irm/, scanner/, echographie/), interventionnel/
  centres/cergy/        landings modalité × ville
  preparation/          11 fiches imprimables
src/app/                routes App Router (une page = un dossier)
src/components/         composants partagés (header, footer, CTA, encadrés, JSON-LD…)
src/lib/site.ts         NAP, horaires, plateau technique — miroir de docs/nap-master.md
src/lib/content.ts      lecture et validation du MDX
scripts/                les garde-fous (sauf la validation HTML, confiée à html-validate)
tests/e2e/              Playwright : parcours, CTA/dataLayer, 301, tiers, contact, axe-core
docs/                   toute la documentation projet (voir ci-dessous)
```

### Modifier un contenu

1. Éditer le `.mdx` dans `content/`. Le frontmatter est validé au build : une clé manquante
   fait échouer le build avec un message explicite.
2. Toute affirmation nouvelle non confirmée par le client s'écrit
   `[[À CONFIRMER : description précise]]`, **et** la question correspondante est ajoutée à
   [`docs/questions.md`](docs/questions.md). Jamais l'un sans l'autre.
3. Une page de contenu médical non relue porte `{/* À VALIDER MÉDICALEMENT */}` en tête.
4. `npm run build && npm run check:seo && npm run check:similarity` avant de pousser.

### Modifier une donnée NAP (adresse, téléphone, horaires)

Un seul endroit : `src/lib/site.ts`, qui reflète `docs/nap-master.md`. Toute divergence
entre les deux est un bug. Ces valeurs alimentent le site, le JSON-LD, les liens `tel:` et
les deep links d'itinéraire.

## Documentation

| Fichier | Contenu |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Règles bloquantes et données client confirmées — **prioritaire** |
| [`docs/BRIEF.md`](docs/BRIEF.md) | Brief fondateur intégral |
| [`docs/phase-status.md`](docs/phase-status.md) | Avancement, décisions, historique de session |
| [`docs/questions.md`](docs/questions.md) | Questions client et réponses — liste unique |
| [`docs/compliance-checklist.md`](docs/compliance-checklist.md) | Recette de conformité à signer avant production |
| [`docs/migration.md`](docs/migration.md) | Runbook de bascule du domaine |
| [`docs/nap-master.md`](docs/nap-master.md) | Source de vérité NAP |
| [`docs/design-system.md`](docs/design-system.md) | Palette, typographie, composants |
| [`docs/sitemap.md`](docs/sitemap.md) · [`docs/content-plan.md`](docs/content-plan.md) · [`docs/keyword-map.csv`](docs/keyword-map.csv) | Architecture éditoriale et SEO |
| [`docs/tracking-plan.md`](docs/tracking-plan.md) | Plan de marquage (dataLayer, conversions) |
| [`docs/rich-results.md`](docs/rich-results.md) | Inventaire des données structurées, plan de vérification Google |
| [`docs/google-ads-plan.md`](docs/google-ads-plan.md) | Cadre publicitaire et contraintes santé |
| [`docs/gbp-playbook.md`](docs/gbp-playbook.md) | Fiche Google Business Profile |
| [`docs/rgpd/`](docs/rgpd/) | Registre des traitements |
| [`docs/audit-site-actuel.md`](docs/audit-site-actuel.md) · [`docs/benchmark.md`](docs/benchmark.md) | Phase 0 |

## Déploiement

- **`master` = production Vercel publique.** Toute autre branche produit une preview.
- **Aucune PR ni aucun merge vers `master` sans instruction explicite du client dans la
  session courante** — même si tous les contrôles sont verts (règle client du 28/08/2026,
  rappelée dans `CLAUDE.md`). Le client teste sur la preview, puis donne son accord.
- Région imposée : `cdg1` (Paris), déclarée dans `vercel.json` **et** via `preferredRegion`
  sur le layout racine. Après chaque déploiement de production :
  `node scripts/check-region.mjs https://www.alphaimagerie.fr`. Sur une preview, ce contrôle
  ne peut pas aboutir — Vercel Authentication répond avant la fonction — sauf avec un jeton
  *Protection Bypass for Automation* passé par `VERCEL_BYPASS`.
- Le domaine définitif est `https://www.alphaimagerie.fr` ; l'apex redirige en 301.
  Procédure complète : [`docs/migration.md`](docs/migration.md).

### Variables d'environnement

**Aucune.** Le site ne comporte ni formulaire, ni Server Action, ni appel à un service
externe : rien à configurer côté Vercel, et donc aucun secret à gérer. Le formulaire de
contact et son transport e-mail ont été supprimés le 30/08/2026 sur décision du client
(voir `CLAUDE.md` §3.2) — la page `/contact` affiche les coordonnées du centre.

## Intégration continue

`.github/workflows/ci.yml`, sur `master`, sur les branches `claude/**` et sur toute PR :

```
npm ci → lint → typecheck → check-confirmer (strict) → check-similarity → check-region
       → build → check-jsonld → check-seo → Playwright → Lighthouse CI
```

Lighthouse CI bloque sur *Accessibility*, *Best Practices* et *SEO* à 100. La performance y
est en avertissement : `next start` sur un runner partagé, sans CDN ni compression, sous-évalue
le score. **Le seuil de performance du §13 (≥ 95 mobile) se mesure sur l'hébergement réel**,
via PageSpeed Insights (`docs/benchmark/psi_fetch.sh`, clé API requise).

## Conventions

- Commits [Conventional Commits](https://www.conventionalcommits.org/fr/), en français.
- Une branche par sujet ; `master` protégé.
- Jamais de `.env` commité, jamais de secret dans le dépôt.
- Le code et les commentaires sont en français, comme le contenu.
