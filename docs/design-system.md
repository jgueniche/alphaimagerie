# Design system — Alpha Imagerie (Phase 1, v1)

> Direction §9 du brief : clinique premium, lumineux, apaisant ; mobile-first absolu ; zéro dark pattern, zéro pop-up. Ce document est la source de vérité des tokens implémentés dans `src/app/globals.css` (Tailwind v4 `@theme`).

## 1. Couleur

Le bleu de marque est **extrait du logo réel** (PNG HD Wix, couleur dominante à 97 % des pixels opaques) : **`#001068`** — un marine indigo très profond. Il est trop sombre pour servir de couleur d'action : il devient la couleur d'**identité** (titres, footer, fonds de marque), et on en dérive une couleur d'**action** plus lumineuse de même teinte (hue ≈ 228°). À re-vérifier sur le logo vectoriel quand il sera fourni (q.36).

| Token | Hex | Usage | Contraste sur blanc |
|---|---|---|---|
| `brand-900` | `#001068` | identité : H1/H2, footer, fonds profonds (texte blanc dessus : 17,4:1) | 17,4:1 |
| `brand-700` | `#1A2FA5` | liens visités/hover appuyé, dégradés discrets | 10,2:1 |
| `action` (`brand-600`) | `#2447D1` | **CTA primaires (Doctolib, appel), liens, focus ring** | 7,6:1 AA/AAA |
| `brand-100` | `#E8ECFB` | fonds de sections « wash », hover cartes | — |
| `brand-50` | `#F3F5FD` | fonds alternés | — |
| `paper` | `#FAFBFD` | fond de page (blanc cassé froid, jamais #FFF pur en pleine page) | — |
| `surface` | `#FFFFFF` | cartes, formulaires | — |
| `ink` | `#101A38` | texte courant (bleu-noir, pas de #000) | 16,6:1 |
| `ink-600` | `#46536F` | texte secondaire | 7,4:1 |
| `accent` (chaud) | `#B4632A` | **avec parcimonie** : pastille « Ouvert 7j/7, jours fériés inclus », nocturne, points d'attention | 4,6:1 (AA texte ≥ 18 px / gras) |
| `accent-100` | `#F9EDE3` | fond de la pastille/encarts chaleureux | — |
| `ok` / `warn` / `error` | `#116B48` / `#8A5A00` / `#A52333` | états formulaire uniquement | ≥ 4,5:1 |

Règles : l'accent chaud n'apparaît jamais sur deux composants voisins ; les états sémantiques ne se confondent pas avec `action` ; **thème clair unique** (patientèle âgée, cohérence marque, budget perf — pas de dark mode au lancement ; décision réversible, tokens centralisés).

## 2. Typographie (next/font, self-host, zéro appel Google Fonts au runtime)

| Rôle | Fonte | Justification |
|---|---|---|
| Display (H1–H3, chiffres clés) | **Bricolage Grotesque** (variable, SIL OFL) | grotesque contemporaine à la fois chaleureuse et précise — l'axe « clinique premium sans froideur » ; se distingue nettement des Inter/Roboto omniprésents chez les concurrents (exigence §9) ; excellente à grande taille, chiffres expressifs pour les repères (durées, horaires) |
| Texte (body, UI) | **Source Sans 3** (variable, SIL OFL) | lisibilité maximale corps 16–18 px pour patientèle âgée, graisses nombreuses, x-height généreuse, rendu neutre qui laisse la voix au contenu médical ; hinting éprouvé |
| Données (tarifs, horaires tabulaires) | Source Sans 3 + `font-variant-numeric: tabular-nums` | pas de 3e fonte : budget |

Échelle (mobile → desktop) : H1 30→44 px / H2 24→30 px / H3 19→22 px / body 16,5→17,5 px / small 14 px. Interligne body 1,65 ; longueur de ligne ≤ 70 car. ; `text-wrap: balance` sur les titres ; labels uppercase +0,08 em.

## 3. Layout & espacement

- Grille contenu : `max-width` 72rem ; colonnes prose 42rem ; gouttières 16/24/32.
- Échelle d'espacement 4 px (Tailwind par défaut) ; sections 64–96 px verticaux.
- Rayons : 8 px (cartes), 999 px (pastilles/CTA) — pas de `rounded-lg` systématique sur tout.
- Ombres : 1 seule élévation douce (`0 1px 2px / 0 8px 24px -12px` teintée brand) ; jamais d'ombre dure.

## 4. Composants clés

| Composant | Spécification |
|---|---|
| **Header** | logo + nav simple (Examens, Centres, Préparer, Résultats, Équipe, Contact) + **3 intentions** : Prendre RDV (action), Mes résultats, Espace pro. Sélecteur de site (Cergy actif / Goussainville « fin 2027 ») persistant (cookie fonctionnel) |
| **Barre CTA mobile sticky** (basse) | Appeler (`tel:`) · Prendre RDV (Doctolib) · Itinéraire (deep link) — 56 px, safe-area, masquée à l'impression |
| **Pastille 7j/7** | accent chaud : « Ouvert 7j/7 · jours fériés inclus » (+ « nocturne hebdomadaire jusqu'à 22h » dès jour confirmé) |
| **Fiche synthèse examen** (§8.2) | cartes : durée · injection oui/non · préparation · résultats · disponible à Cergy — icônes SVG custom par modalité |
| **Badge `[[À CONFIRMER]]`** | visible en dev/préprod (fond warn), build prod échoue s'il en reste (`scripts/check-confirmer.mjs`) |
| **Encadré informatif** | « Ce contenu est informatif et ne remplace pas l'avis de votre médecin » — sur toutes les pages examens |
| **FAQ** | `<details>/<summary>` natifs stylés (0 JS) + schema FAQPage |
| **Bloc accès** | adresse + horaires (table), itinéraires Google/Apple/Waze, carte statique (embed Maps uniquement après consentement), transports/parkings détaillés |
| **Fil d'Ariane** | partout sauf home ; BreadcrumbList |
| **Cartes examens** | grille 2/3/6 colonnes, pictos SVG custom, pas de photos stock |
| **Formulaire contact** | §3.2 strict : civilité, nom, prénom, e-mail, téléphone, site, type de demande (liste fermée), message + « N'indiquez aucune information médicale » ; consentement ; honeypot |

## 5. Interaction & accessibilité

- Focus visible partout (ring 2 px `action`, offset 2 px) ; cibles tactiles ≥ 44 px ; contrastes AA vérifiés ci-dessus.
- Motion : transitions ≤ 200 ms (opacité/transform uniquement), `prefers-reduced-motion` → tout désactivé. Pas d'animation d'entrée en cascade.
- Images : photos réelles uniquement (placeholders neutres flous en attendant la séance photo — jamais de stock) ; `alt` descriptifs ; dimensions explicites (CLS 0).
- Icônes : SVG inline custom par modalité (IRM, scanner, écho, mammo, radio, ostéo, interventionnel), trait 1,75 px, coins arrondis.

## 6. Ton visuel des pages

Hero : promesse factuelle « Imagerie médicale à Cergy — ouvert 7j/7, jours fériés inclus » + 3 CTA + grille examens + réassurance factuelle (2 IRM 1,5 T, scanner, radiologues, RDV en ligne). Pas de carrousel, pas de vidéo de fond, pas de pop-up, zéro dark pattern.
