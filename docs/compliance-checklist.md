# Checklist de conformité — alphaimagerie.fr

Document de recette à **signer par le directeur de la publication avant la mise en
production** (§13 du brief). Il reprend point par point les exigences non négociables du §3
et les critères de la *Definition of Done* du §13.

Chaque ligne porte une **preuve** : un fichier, un test automatisé, ou une vérification
manuelle datée. Une ligne sans preuve n'est pas conforme, elle est seulement non vérifiée.

**Statut au 29/08/2026** : recette technique complète, **hors points en attente de réponse
client** (repérés « ⏳ » et listés au §9). Le site ne peut pas être déclaré conforme tant
que ces points ne sont pas tranchés.

Légende : ✅ vérifié · ⏳ en attente d'une réponse client · ⬜ à vérifier le jour de la recette

---

## 1. Code de déontologie — article R.4127-19-1 CSP

| # | Exigence | Statut | Preuve |
|---|---|:--:|---|
| 1.1 | Aucun témoignage, avis, note ou classement de patients | ✅ | `scripts/check-jsonld.mjs` refuse `aggregateRating`, `review`, `Rating` dans tout le balisage ; aucune section « avis » dans `/content` |
| 1.2 | Aucun widget d'avis tiers (Google, Doctolib, Trustpilot) | ✅ | `tests/e2e/tiers.spec.ts` — 0 requête tierce sur 6 gabarits |
| 1.3 | Aucune comparaison avec d'autres centres | ✅ | Relecture éditoriale ; aucun comparatif dans `/content` |
| 1.4 | Aucun superlatif commercial (« meilleur », « n° 1 », « leader », « référence ») | ⬜ | Relecture finale par le directeur de la publication — voir §7 |
| 1.5 | Aucune incitation à réaliser un acte non prescrit | ✅ | Les CTA portent sur la prise de rendez-vous, jamais sur un examen à réaliser ; encadré « ne remplace pas l'avis de votre médecin » sur les pages examens |
| 1.6 | Titres et qualifications reconnus par l'Ordre uniquement | ✅ | `/equipe` : « docteur en médecine, spécialiste en radiodiagnostic et imagerie médicale » ; mentions légales, section *Profession réglementée* |
| 1.7 | Tarifs et conventionnement communiqués sans démarchage | ⏳ | Secteur 2, dépassements modérés, tiers payant, aucun dépassement C2S/AME/ALD. Page tarifs détaillée en attente (q.40) |
| 1.8 | Formulation « pôle dédié à l'imagerie de la femme » retenue au lieu de « centre de référence » | ⏳ | Proposé en q.57, sans réponse |

## 2. RGPD

| # | Exigence | Statut | Preuve |
|---|---|:--:|---|
| 2.1 | Formulaire limité aux champs du §3.2 | ✅ | `src/app/contact/champs.ts` : civilité, nom, prénom, e-mail, téléphone, site, type de demande (liste fermée), message |
| 2.2 | Mention « N'indiquez aucune information médicale » visible | ✅ | `tests/e2e/formulaire.spec.ts` |
| 2.3 | Aucune donnée de santé collectée, aucun upload | ✅ | Aucun `<input type="file">` dans le code ; ordonnances, CV et images explicitement exclus |
| 2.4 | Envoi TLS vers `contact@alphaimagerie.fr` | ⏳ | `src/lib/mailer.ts` — transport de production **non activé** (q.46, Brevo) ; `CONTACT_TRANSPORT=log` en attente |
| 2.5 | Aucun stockage des soumissions | ✅ | Aucune base connectée (q.47 : recommandation « e-mail seul » suivie par défaut) |
| 2.6 | Politique de confidentialité publiée et à jour | ✅ | `/politique-de-confidentialite` |
| 2.7 | Registre des traitements tenu | ✅ | `docs/rgpd/registre-traitement.md` |
| 2.8 | Durées de conservation validées par le responsable de traitement | ⏳ | Publiées (12 mois contact / 2 ans candidatures) mais **non validées** — q.58 |
| 2.9 | Contact « données personnelles » identifié | ⏳ | `contact@alphaimagerie.fr` faute de DPO désigné — q.25 à valider |
| 2.10 | Droits des personnes décrits (accès, rectification, effacement, opposition, réclamation CNIL) | ✅ | `/politique-de-confidentialite` |

## 3. HDS — hébergement de données de santé

| # | Exigence | Statut | Preuve |
|---|---|:--:|---|
| 3.1 | Zéro donnée de santé sur le site (Vercel n'est pas certifié HDS) | ✅ | Aucun formulaire ni stockage de donnée médicale ; audit du code |
| 3.2 | Résultats accessibles uniquement par lien sortant vers Xplore | ✅ | `/resultats` — lien externe, aucune intégration |
| 3.3 | Aucun upload d'ordonnance, de CV ou d'image | ✅ | `/recrutement` renvoie vers l'e-mail ; aucun champ fichier |
| 3.4 | Mention explicite dans les mentions légales | ✅ | `/mentions-legales`, section *Hébergeur* |
| 3.5 | Fonctions serveur exécutées dans l'Union européenne | ✅ | `vercel.json` (`cdg1`) + `preferredRegion` ; `scripts/check-region.mjs` (volet config en CI). **Volet en ligne à repasser après déploiement** |

## 4. Cookies et traceurs — recommandation CNIL

| # | Exigence | Statut | Preuve |
|---|---|:--:|---|
| 4.1 | Aucun tag tiers avant consentement | ✅ | `tests/e2e/tiers.spec.ts` : first-party uniquement sur 6 gabarits |
| 4.2 | Aucun cookie déposé au chargement | ✅ | `tests/e2e/tiers.spec.ts` — « aucun cookie déposé » |
| 4.3 | Polices auto-hébergées, zéro appel à Google Fonts | ✅ | `next/font` dans `src/app/layout.tsx` ; couvert par 4.1 |
| 4.4 | Page d'information sur les traceurs | ✅ | `/cookies` |
| 4.5 | CMP conforme installée | ⏳ | **Non installée** — arbitrage q.44 (recommandation : tarteaucitron auto-hébergé) |
| 4.6 | Consent Mode v2 en `denied` par défaut | ⏳ | **Non installé** — dépend de q.44/45 et de l'accès GA4 (q.38) |
| 4.7 | Mesure d'audience exemptée en parallèle | ⏳ | **Non installée** — arbitrage q.45 (recommandation : Plausible EU) |
| 4.8 | Carte Google Maps sous consentement, avec repli image statique + lien | ⏳ | Aucune carte intégrée aujourd'hui (liens Maps/Waze/Plans uniquement) : conforme par construction. À revalider si une carte est ajoutée avec la CMP |

> Tant que 4.5 à 4.7 sont ouverts, le site ne dépose **aucun** traceur : l'état actuel est
> conforme, mais incomplet au regard du plan de mesure du §9 du brief.

## 5. Mentions légales — LCEN article 6, III

| # | Élément obligatoire | Statut | Valeur publiée |
|---|---|:--:|---|
| 5.1 | Dénomination sociale | ✅ | SELAS ALPHA IMAGERIE |
| 5.2 | Forme juridique et capital | ✅ | SELAS au capital de 10 000 € |
| 5.3 | RCS et SIRET | ✅ | RCS Pontoise 928 012 830 · SIRET 928 012 830 00016 |
| 5.4 | Siège social | ✅ | 2 Mail des Cerclades, 95000 Cergy |
| 5.5 | Directeur de la publication | ✅ | Dr Jérémy Gueniche, président |
| 5.6 | Contact | ✅ | contact@alphaimagerie.fr · 01 86 30 30 00 |
| 5.7 | Hébergeur (raison sociale et adresse) | ✅ | Vercel Inc., Covina (CA), États-Unis — région de déploiement Paris (cdg1) |
| 5.8 | Numéro de téléphone de l'hébergeur | ⬜ | **Non publié.** L'article 6, III, 1°, d) le mentionne ; usage courant sur les sites français hébergés à l'étranger de s'en tenir à l'adresse. À trancher (q.59) |
| 5.9 | Ordre des médecins et code de déontologie | ✅ | Conseil départemental du Val-d'Oise (95) ; articles R.4127-1 à R.4127-112 CSP |
| 5.10 | TVA | ⏳ | « Activité de soins exonérée de TVA (art. 261, 4, 1° CGI) » — formulation **à valider** (q.27) |
| 5.11 | DPO | ⏳ | Renvoi vers contact@alphaimagerie.fr en l'absence de désignation — **à valider** (q.25) |
| 5.12 | Propriété intellectuelle | ✅ | Section dédiée |
| 5.13 | Médiateur de la consommation, RCP | ⏳ | Non publiés — q.28 sans réponse |

## 6. Accessibilité — RGAA 4.1 / WCAG 2.1 AA

| # | Exigence | Statut | Preuve |
|---|---|:--:|---|
| 6.1 | 0 violation axe-core sérieuse ou critique | ✅ | `tests/e2e/accessibilite.spec.ts` |
| 6.2 | Score Lighthouse *Accessibility* = 100 | ✅ | `lighthouserc.json` — seuil bloquant en CI |
| 6.3 | Contrastes AA | ✅ | Palette corrigée le 28/08 (`ink-400` #626F8C, `accent` #9D5420) |
| 6.4 | Un seul `<h1>` par page, hiérarchie de titres cohérente | ✅ | `scripts/check-seo.mjs` sur les 71 pages + `tests/e2e/parcours.spec.ts` |
| 6.5 | Erreurs de formulaire annoncées aux technologies d'assistance | ✅ | `tests/e2e/formulaire.spec.ts` |
| 6.6 | Déclaration d'accessibilité publiée | ✅ | `/accessibilite` |
| 6.7 | Navigation au clavier et focus visible | ⬜ | Vérification manuelle à la recette |
| 6.8 | Test avec un lecteur d'écran (NVDA ou VoiceOver) sur 3 gabarits | ⬜ | Vérification manuelle à la recette |

## 7. Contenu médical

| # | Exigence | Statut | Preuve |
|---|---|:--:|---|
| 7.1 | Aucun fait médical, tarifaire, d'équipement ou de délai inventé | ✅ | `scripts/check-confirmer.mjs` en mode strict : 0 `[[À CONFIRMER]]` résiduel |
| 7.2 | Encadré « Ce contenu est informatif et ne remplace pas l'avis de votre médecin » sur les pages examens | ✅ | `src/components/encadre.tsx`, présent sur les piliers et les zones |
| 7.3 | Délais formulés sans promesse absolue | ✅ | « le plus souvent sous 48 h » |
| 7.4 | **Relecture médicale des pages marquées `À VALIDER MÉDICALEMENT`** | ⬜ | **À faire par un radiologue de l'équipe — 55 fichiers concernés.** Liste : `grep -rl "À VALIDER MÉDICALEMENT" src content` |
| 7.5 | Vouvoiement, jargon expliqué, phrases courtes | ✅ | Relecture éditoriale (§8.3) |
| 7.6 | Aucune duplication de contenu entre pages proches | ✅ | `scripts/check-similarity.mjs` — max relevé 31,5 % pour un seuil de 50 % |

## 8. Definition of Done — §13

| # | Critère | Statut | Preuve |
|---|---|:--:|---|
| 8.1 | Lighthouse mobile ≥ 95 / 100 / 100 / 100 | ⏳ | Accessibilité, bonnes pratiques et SEO à 100 bloquants en CI. **Performance à mesurer sur l'hébergement réel** — PSI, clé API à fournir |
| 8.2 | LCP < 1,8 s · CLS < 0,05 · INP < 200 ms (labo **et** terrain) | ⏳ | Labo : à confirmer par PSI. Terrain : disponible dans Search Console après 28 jours de trafic |
| 8.3 | Rich Results : 0 erreur sur les 5 types | ✅ | `scripts/check-jsonld.mjs` — 0 erreur, 5 types présents. Passage à l'outil Google planifié après bascule (`docs/rich-results.md`) |
| 8.4 | HTML et axe-core : 0 erreur bloquante | ✅ | `tests/e2e/accessibilite.spec.ts` |
| 8.5 | 0 script tiers avant consentement | ✅ | `tests/e2e/tiers.spec.ts` |
| 8.6 | 0 `[[À CONFIRMER]]` en production | ✅ | `CHECK_CONFIRMER=strict` bloquant en CI |
| 8.7 | 0 duplication de contenu | ✅ | `scripts/check-similarity.mjs` |
| 8.8 | title / description / OG / canonical uniques partout | ✅ | `scripts/check-seo.mjs` — 70 pages indexables, 0 doublon |
| 8.9 | Suite Playwright complète verte | ✅ | 59 tests passés, 1 ignoré volontairement |
| 8.10 | Checklist de conformité signée | ⬜ | **Le présent document, §10** |

## 9. Points bloquants avant signature

Aucun de ces points ne relève d'un développement : ils attendent tous une décision ou une
information du client. Ils sont détaillés dans `docs/questions.md`.

1. **q.44 / q.45** — CMP et mesure d'audience exemptée : sans arbitrage, le site reste sans
   aucune mesure. Bloque 4.5 à 4.7.
2. **q.46** — Brevo (clé API + validation SPF/DKIM) : sans transport, le formulaire
   n'envoie rien en production. Bloque 2.4. **Point le plus critique de la liste.**
3. **q.58** — validation des durées de conservation. Bloque 2.8.
4. **q.25 / q.27** — DPO et mention TVA. Bloquent 5.10 et 5.11.
5. **q.40** — tarifs et dépassements. Bloque 1.7.
6. **Relecture médicale** (7.4) — indépendante des questions, à planifier avec l'équipe.
7. **Clé API PageSpeed** — bloque la mesure des seuils 8.1 et 8.2.
8. **Accès Search Console** (q.38) — bloque le suivi terrain (8.2) et la bascule (§2 de
   `docs/migration.md`).

## 10. Signature

Je soussigné, directeur de la publication du site alphaimagerie.fr, atteste avoir pris
connaissance de la présente checklist, avoir fait procéder à la relecture médicale des
contenus (§7.4) et autoriser la mise en production du site.

| | |
|---|---|
| Nom et qualité | Dr Jérémy Gueniche, président de la SELAS ALPHA IMAGERIE, directeur de la publication |
| Points en attente acceptés en connaissance de cause | ......................................................... |
| Date | ......................................... |
| Signature | ......................................... |

---

### Comment rejouer la recette automatisée

```bash
npm ci
npm run lint && npm run typecheck
CHECK_CONFIRMER=strict node scripts/check-confirmer.mjs
npm run build                       # inclut les garde-fous contenu
npm run check:jsonld                # §13 — données structurées
npm run check:seo                   # §13 — SEO on-page
npm run check:region                # §4  — région UE (configuration)
npx playwright install --with-deps chromium
npm test                            # suite Playwright
npx @lhci/cli@0.14.x autorun        # Lighthouse CI
```

Après déploiement, compléter par les contrôles en ligne :

```bash
node scripts/check-region.mjs https://www.alphaimagerie.fr
bash docs/benchmark/psi_fetch.sh    # clé API PageSpeed requise
```
