<!-- Généré par `node scripts/check-jsonld.mjs --rapport` — ne pas éditer à la main. -->

# Données structurées — état et plan de vérification Rich Results

Généré le 2026-08-30 à partir du build (70 pages prérendues).

## 1. Contrôle automatisé (bloquant en CI)

`node scripts/check-jsonld.mjs` rejoue les contraintes documentées par Google sur les
pages prérendues : propriétés requises par type, positions du fil d'Ariane, `acceptedAnswer`
des FAQ, adresse complète des établissements. Il refuse en plus tout `aggregateRating`,
`review` ou `Rating` (R.4127-19-1) et toute URL non-HTTPS. **Résultat courant : 0 erreur.**

## 2. Inventaire

| Type | Pages | Exemples |
|---|---:|---|
| `MedicalClinic` | 1 | `/centres/cergy` |
| `ImagingTest` | 31 | `/examens/echographie` · `/examens/echographie/abdominale` · `/examens/echographie/doppler-veineux-arteriel` |
| `FAQPage` | 44 | `/centres/cergy` · `/centres/cergy/echographie` · `/centres/cergy/irm` |
| `Physician` | 2 | `/equipe` · `/equipe` |
| `BreadcrumbList` | 69 | `/accessibilite` · `/centres/cergy` · `/centres/cergy/echographie` |
| `MedicalWebPage` | 19 | `/centres/cergy/echographie` · `/centres/cergy/irm` · `/centres/cergy/mammographie` |
| `MedicalProcedure` | 5 | `/examens/radiologie-interventionnelle` · `/examens/radiologie-interventionnelle/biopsie-mammaire` · `/examens/radiologie-interventionnelle/cytoponctions` |
| `ContactPage` | 1 | `/contact` |
| `MedicalOrganization` | 1 | `/` |
| `WebSite` | 1 | `/` |

## 3. Vérification manuelle Rich Results (Phase 5, après bascule du domaine)

L'outil Google (https://search.google.com/test/rich-results) exige une URL publiquement
accessible : il ne peut pas être passé tant que le site vit sur une preview protégée.
À faire dès que `https://www.alphaimagerie.fr` répond (voir `docs/migration.md`), en
soumettant **une URL par gabarit** :

- [ ] `MedicalClinic` → https://www.alphaimagerie.fr/centres/cergy
- [ ] `ImagingTest` → https://www.alphaimagerie.fr/examens/echographie
- [ ] `FAQPage` → https://www.alphaimagerie.fr/centres/cergy
- [ ] `Physician` → https://www.alphaimagerie.fr/equipe
- [ ] `BreadcrumbList` → https://www.alphaimagerie.fr/accessibilite

Attendu : **0 erreur** sur chaque URL. Deux avertissements sont normaux et attendus :

- `ImagingTest` et `MedicalWebPage` ne produisent aucun résultat enrichi chez Google —
  l'outil affichera « aucun élément détecté » tout en validant la syntaxe. C'est conforme :
  le §13 exige 0 **erreur**, pas un aperçu enrichi pour chaque type.
- Les avertissements « champ recommandé manquant » portant sur `image`/`priceRange` sont
  assumés : aucune photo réelle n'est encore fournie (q.37) et aucun tarif n'est publié (q.40).

## 4. Suivi Search Console

Après indexation, contrôler dans Search Console → « Améliorations » que les rapports
*Fils d'Ariane* et *FAQ* remontent sans erreur, puis à chaque mise en ligne de contenu.
