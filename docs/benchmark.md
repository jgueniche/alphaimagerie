# Benchmark sectoriel — Phase 0

> Crawl et analyses du 27/08/2026, pages publiques uniquement (curl UA navigateur + scripts d'extraction). Rapports détaillés page par page (titles, Hn, JSON-LD, formulaires, mesures de duplication) : `docs/benchmark/` (annexes). Ce document consolide les enseignements et les décisions qu'ils fondent.

## 1. Vue comparée

| | **Résonance (GRI)** | **SIMAGO** | **IMDEV** | **alphaimagerie.fr (actuel)** |
|---|---|---|---|---|
| Modèle | Mono-domaine WordPress, 57 pages centres | Bicéphale : simago.fr (B2B + annuaire 120 centres) + 13 microsites `*.simago.care` (patients) | Mono-domaine, 100 % B2B/recrutement, 114 fiches centres annuaire | Wix, 6 pages, mono-site (Goussainville absent) |
| Cible | Patients + corporate | Patients (.care) / radiologues (.fr) | Radiologues exclusivement | Patients |
| Page par centre | Oui (~150–180 mots uniques, **~70 % dupliqués entre centres**, 0 H1) | .fr : ~215 mots sans JSON-LD ; .care : ~277–441 mots | Oui (fiche annuaire ~432 mots, 0 meta desc) | Non (1 page « Notre centre ») |
| **Pages modalité×ville** | **Aucune** | **Aucune** (1 seule fiche localisée : EOS Paris 12) | Aucune (archives « service » vides) | Aucune |
| Pages examens | 12 fiches globales, 256–273 mots | 17 fiches par microsite, 330–400 mots dupliquées (sauf EOS : 1 085 mots + FAQ 12 q.) | Archives vides (« Archives des IRM ») | 1 page fourre-tout 1 183 mots |
| JSON-LD local | **MedicalOrganization/centre** (NAP, horaires, actes) sans geo/image ; le meilleur du panel | Aucun métier (ni MedicalClinic ni FAQPage) | Graphe Yoast + 1 FAQPage ; rien sur 114 centres | LocalBusiness minimal (home) |
| RDV | Doctolib partout + bouton flottant, mais profil VO mutualisé (Sartrouville) | Doctolib deep-links ; header « RDV / Résultats / PACS » (PGL) ; incohérent selon microsites | Aucun (hors périmètre) | Lien profil Doctolib simple, non tracé |
| `tel:` cliquable | Pages centres oui, accueil non | Pages centres oui | Fiches oui | **Nulle part** |
| Avis affichés | **Non** (conforme déontologie) | **Oui** (étoiles + compteur Google) — risque déontologique qu'ils assument | Non | Non |
| RGPD | Formulaires sans consentement, pas de politique liée | OneTrust, pages légales présentes | Complianz + RGPD propre | Formulaire sans mention, mentions légales incomplètes |
| Poids HTML accueil | **2,45 Mo** (2 Mo de SVG inline) | 103 kB (le plus sobre) | 219 kB (Elementor : 43 js + 47 css) | 621 kB, 63 scripts |
| Hygiène technique | 21 URLs vides dans le sitemap, /merci/ indexable, slugs doublons | CPT centres/examens **hors sitemap**, article démo WP indexé, meta desc dupliquées 16 car. | Taxonomies à l'abandon (28 URLs quasi vides), slugs accentués cassés | lastmod uniforme, URL accentuée |

## 2. Enseignements par référence

### 2.1 Groupe Résonance Imagerie (concurrent direct 95 — 11 centres dans le Val-d'Oise)

- **À retenir** : gabarit page centre (bandeau NAP + tél cliquable + horaires → examens → accès transports/parkings → RDV → carte + formulaire routé par centre avec promesse de rappel 24 h) ; JSON-LD `MedicalOrganization` par centre avec `openingHoursSpecification` et actes en `availableService` ; meta descriptions orientées bénéfice concret (« Parking gratuit ») ; page dédiée « Imagerie de la Femme » (Franconville) ; le title de Franconville (« IRM, scanner et radiologie à Franconville | … ») est leur meilleur pattern — non généralisé chez eux, à généraliser chez nous.
- **À dépasser** : contenu centre de 154–180 mots uniques avec ~70 % de duplication mesurée entre Éragny et Franconville (5-grammes + SequenceMatcher) ; 0 H1 sur les pages centres/FAQ/index ; fallback meta « Rendez-vous - Résultats - Recrutement » sur la moitié des gabarits ; fiches examens de 250–270 mots sans schéma ; **aucune page modalité×ville** ; accueil de 2,45 Mo ; 21 pages blanches dans le sitemap ; formulaires sans RGPD ; Doctolib mutualisé Val-d'Oise (friction : le patient re-choisit son centre) ; aucune équipe locale nommée (E-E-A-T faible).

### 2.2 SIMAGO (simago.fr + microsites .care)

- **À retenir** : **header patient à 3 intentions — « Prendre un rendez-vous » (sticky, 1re position) / « Résultats d'examens » / « Espace médecins »** ; gestion des attentes exemplaire (liste explicite des examens **non** réservables en ligne + consignes du serveur vocal) ; checklist documents (ordonnance originale, Vitale, identité/DMP, mutuelle, moyen de paiement, antériorités, bilan sanguin) + règle d'annulation ≥ 24 h ; **« Charte Transparence et Confiance » sur les examens sensibles** (mammographie, mineurs, échographies pelviennes, hystérographie…) — réassurance rare et forte, très pertinente pour notre positionnement imagerie de la femme ; vidéos de pertinence HAS ; **fiche EOS Paris 12 = le modèle de fiche examen localisée** (title « Radiographie EOS Paris 12 (Gare de Lyon) - Basse dose, corps entier », 1 085 mots, FAQ 12 questions) ; actus « nouvel équipement / accueil digital / portraits ».
- **À dépasser** : architecture .fr/.care qui **dilue l'autorité** (13 sous-domaines repartant de zéro + cannibalisation fiche .fr / microsite / page centre / Doctolib / Google) ; titles 10–28 car. sans mots-clés, ~90 % des pages sans meta description ; **zéro JSON-LD métier** (leurs FAQ existantes ne produisent aucun rich snippet) ; sitemaps cassés (les pages les plus riches sont hors sitemap, l'article démo « Bonjour tout le monde ! » est indexable) ; Infos pratiques **sans tarifs/tiers payant, sans délais de résultats, sans accès/parking** ; aucun formulaire patient ; deep-link Doctolib erroné constaté (mauvais centre). ⚠ Ils affichent notes/avis Google : **interdit pour nous** (R.4127-19-1 CSP) — ne pas imiter.

### 2.3 IMDEV (imdev.fr)

- **À retenir** : entonnoir recrutement complet (défis → projet médical en 4 piliers → témoignages nominatifs de praticiens → FAQ balisée FAQPage → formulaire ciblé poste/département/ville + CV + RGPD) — le modèle pour notre `/recrutement` (en y ajoutant les `JobPosting` qu'IMDEV n'a pas) ; **carte des centres Leaflet + OpenStreetMap + markercluster, marqueurs inline, liste SSR crawlable, sans clé ni consentement** — la solution de carte à retenir si nous affichons une carte interactive (self-hostée, pas via unpkg) ; discipline title/meta sur les pages stratégiques.
- **À dépasser** : hors périmètre patient (aucun RDV/Doctolib) ; fiches centres squelettiques (0 meta description, 0 horaires, 0 schema local) ; aucune offre d'emploi structurée (invisible sur Google for Jobs) ; 28 pages d'archives quasi vides indexées ; lourdeur Elementor.

### 2.4 Doctolib (fiche Alpha Imagerie Cergy)

- La fiche (org id 1242019) est le standard UX de prise de RDV : on **envoie vers elle**, on ne la réinvente pas. Notre valeur ajoutée = pré-qualification avant le clic (site, examen, pré-requis, examens non réservables en ligne → téléphone), ce que le benchmark SIMAGO valide.
- Le paramètre `pid=practice-…` pour les deep links n'est pas exposé dans le HTML public → **à exporter du back-office Doctolib Pro** (questions n° 8 et 19).
- ⚠ Incohérences détectées entre la fiche et le site actuel (horaires 8h–19h vs 8h–22h ; nom long « Alpha Imagerie : IRM, Radiologie, … ») : l'harmonisation NAP (docs/nap-master.md, Phase 1) devra couvrir Doctolib.

## 3. Performance (CWV)

- **API PageSpeed Insights : échec le 27/08 — HTTP 429** « Queries per day » (quota journalier du projet anonyme, partagé par l'IP de sortie du proxy ; 2 tentatives/URL espacées + contrôle). **À relancer en Phase 1 avec une clé API gratuite** (`&key=…`, quota propre 25 000 req/j) — script prêt en annexe.
- **Lighthouse local : impossible dans cet environnement d'exécution** — l'interception TLS du proxy sortant déclenche l'interstitiel de sécurité de Chromium (build Playwright sans prise en compte du magasin NSS utilisateur où la CA du proxy a été installée) ; contourner en désactivant la vérification TLS est exclu. Les scores lab seront produits par PSI (clé API) ou depuis un poste local en Phase 1, puis en continu par Lighthouse CI (Phase 4/5).
- **Fallback statique mesuré** (1 GET/HTML, indicatif) : alphaimagerie.fr **621 kB de HTML + 63 scripts** (Wix) ; Résonance Éragny 154 kB mais TTFB observé 3,4 s (et accueil GRI : 2,45 Mo) ; SIMAGO 103 kB / 14 scripts (le plus sobre) ; IMDEV 219 kB / 43 scripts / 47 CSS.
- Conclusion inchangée quel que soit l'outil : **aucun acteur du panel n'est au niveau des seuils de notre DoD** (LCP < 1,8 s, HTML léger, JS < 100 kB) — la performance est un axe de dépassement immédiat et mesurable.

## 4. Décisions fondées sur ce benchmark

1. **Le silo modalité×ville est un terrain totalement libre** : ni GRI, ni SIMAGO, ni IMDEV n'ont d'URL dédiée « IRM/scanner + ville ». Le plan §5 du brief (`/centres/{ville}/{modalité}` ≥ 500 mots uniques) attaque un vide concurrentiel — c'est l'investissement SEO n° 1.
2. **Pages centres denses et réellement locales** (≥ 600 mots uniques : équipe nommée, équipements avec marques, accès détaillé, FAQ locale, délais) : le panel plafonne à 150–450 mots dupliqués — l'E-E-A-T local est à prendre.
3. **JSON-LD complet comme différenciateur** : le meilleur du panel (GRI) s'arrête à MedicalOrganization sans geo ; personne n'a FAQPage sur ses FAQ ni ImagingTest/Physician. Notre plan §6 (MedicalClinic + geo + hasMap + ImagingTest + Physician + FAQPage + BreadcrumbList) capte les rich results sans opposition.
4. **Header 3 intentions** (RDV / Résultats / Espace pro) + tel: sticky mobile : valider ce pattern (SIMAGO PGL) dans le design system Phase 1.
5. **Contenus « manquants » du secteur à couvrir systématiquement** : tarifs/conventionnement/tiers payant, délais de résultats, accès/parking/PMR, préparation par examen, examens non réservables en ligne — aucune des références ne les traite ; ce sont des requêtes patient réelles (§8.1) et des candidats featured snippets.
6. **Charte examens sensibles** (inspirée SIMAGO, réécrite) : à intégrer au content-plan — cohérente avec le pôle imagerie de la femme et l'exigence déontologique.
7. **Conformité comme avantage** : GRI est en défaut RGPD visible, SIMAGO affiche des avis. Notre stricte conformité (§3) est aussi un différenciateur de confiance — et zéro risque ordinal.
8. **Interdits confirmés** : aucun avis/note/étoile sur le site ni dans les annonces (même si des concurrents le font) ; pas de superlatifs (« centre de référence » de la bio Instagram à reformuler — question n° 57).
9. **Performance** : budget HTML < 100 kB, zéro SVG inline massif, images optimisées — l'écart avec le panel (0,1–2,45 Mo) sera mesurable dans CrUX.
10. **Carte** : Leaflet + OSM self-hosté (modèle IMDEV) si carte interactive ; sinon image statique + deep links itinéraire (conforme CNIL sans consentement).

## 5. Annexes

- `docs/benchmark/resonance.md` — rapport détaillé GRI (arborescence 167 URLs, extraction page par page, mesures de duplication)
- `docs/benchmark/simago.md` — rapport détaillé SIMAGO (.fr + 2 microsites, structure Infos pratiques, modèle EOS)
- `docs/benchmark/imdev-cwv.md` — rapport détaillé IMDEV + tentative PSI (erreurs brutes) + fallback statique
- `docs/benchmark/psi_fetch.sh` — script de relance PageSpeed Insights (ajouter `&key=`)
- Reconnaissance de la présence en ligne d'Alpha Imagerie (Doctolib, GBP, réseaux, registre) : intégrée à `docs/questions.md` (données « Trouvé : ») et `docs/audit-site-actuel.md`
