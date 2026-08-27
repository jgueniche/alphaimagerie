# Benchmark concurrentiel SEO/UX — groupe-resonance-imagerie.fr

**Contexte** : analyse en lecture seule des pages publiques du site du Groupe Résonance Imagerie (GRI), concurrent direct dans le Val-d'Oise, en préparation de la refonte du site d'un centre d'imagerie concurrent.
**Date de l'analyse** : 27 août 2026.
**Méthode** : récupération via curl (User-Agent navigateur), HTML bruts archivés dans `les archives de session (non versionnées)`, extraction par scripts Python (`extract.py`, sortie complète : `extract-output.txt`).
**Pages analysées** : accueil, `/les-centres/eragny/`, `/les-centres/franconville/`, `/examens/irm/`, `/examens/scanner/`, `/nos-examens/`, `/faq/`, `/spécialites/neuro-imagerie/`, robots.txt + 6 sitemaps XML, sondage des pages de taxonomie `departement_centre`.

---

## 1. Fiche d'identité technique

| Élément | Valeur détectée |
|---|---|
| CMS | **WordPress 7.0.2** (meta generator affichée — fuite de version) |
| Thème | **`groupe-cimn`** — thème sur mesure (agence **Actif Digital**, créditée en footer avec lien dofollow `https://www.actifdigital.fr/`) |
| Plugins visibles | Yoast SEO (wordpress-seo, sitemaps + JSON-LD), **WP Rocket 3.23.1** (cache/perf), **Site Kit by Google 1.184.0**, Contact Form 7 + contact-form-7-honeypot, Akismet, cookie-law-info (bandeau cookies CookieYes) |
| Analytics | **2 conteneurs GTM** chargés sur chaque page : `GTM-WQ54L2W` + `GTM-PMKR6P9J` (probable doublon historique) |
| Prise de RDV | **Doctolib** exclusivement (liens profonds par centre + bouton flottant bas-droite `utm_content=withoutpreview-blue-floating-bottom-right`) |
| Résultats patients | Portail `monespace.groupe-resonance-imagerie.fr/portal-patient/login` + anciens portails hétérogènes par site (`/portal/WebLogin.aspx`, `xplore.fr:4443`, `resultats-examens-paris15.fr`, `fleury-resultat-radio.com`…) — écosystème fragmenté |
| Domaine | Redirection apex → `www.` (301 propre), HTTPS OK |
| Poids | **Accueil : 2,45 Mo de HTML dont ≈ 2 Mo de 14 SVG inline** (cartes des régions) — DOM énorme, très pénalisant en parsing/LCP mobile malgré WP Rocket |

**robots.txt** : minimal (Yoast) — `User-agent: * / Disallow:` (tout autorisé) + déclaration `Sitemap: https://www.groupe-resonance-imagerie.fr/sitemap_index.xml`. Aucune règle de protection, pas de blocage des taxonomies vides.

---

## 2. Arborescence complète (sitemap_index.xml — 167 URLs)

| Sitemap | Nb URLs | Pattern d'URL | Rôle |
|---|---|---|---|
| page-sitemap.xml | 66 | — | 1 accueil + **57 pages centres** `/les-centres/{ville}/` + 8 pages transverses |
| post-sitemap.xml | 49 | `/{slug}/` (à la racine !) | Blog « Actualité » : quasi exclusivement de la **comm' corporate/RH** (« GRI a du talent », séminaires, JFR…), aucune valeur SEO patient |
| examens_cpt-sitemap.xml | 12 | `/examens/{examen}/` | CPT Examens : irm, scanner, radiographie, echographie, mammographie, coloscanner, coroscanner, macrobiopsie-stereotaxique, infiltration-radioguidee-ou-echoguidee, hysterographie, transit-oeso-gastro-duodenal, eos |
| specialite_cpt-sitemap.xml | 14 | `/spécialites/{slug}/` (**URL accentuée** `sp%C3%A9cialites` !) | CPT Spécialités : neuro-imagerie, imagerie-mammaire…, coroscanner (doublon avec examens), angioscanner, thyroide, etc. |
| faq_cpt-sitemap.xml | 5 | `/faq/{question}/` | 5 questions (RDV, documents, à jeun, délais résultats, grossesse) |
| departement_centre-sitemap.xml | 21 | `/departement_centre/{zone}/` | **Taxonomie cassée : les 21 URLs répondent HTTP 200 avec un corps de 0 octet** (vérifié sur franconville, paris, ile-de-france-ouest) |

Pages transverses : `/`, `/les-centres/`, `/nos-examens/`, `/nos-specialites/`, `/les-medecins/`, `/le-groupe/`, `/faq/`, `/contact/`, `/merci/` (page de remerciement **indexable et dans le sitemap** — mauvaise pratique).

**Couverture géographique** : 57 centres sur 4 régions (IdF, Centre-Val de Loire, Hauts-de-France, Normandie). **Val-d'Oise : 11 centres** — franconville, franconville-centre-imagerie-femme, eragny, cergy, jouy-le-moutier, ermont-ccb, ermont-2, **ermont2** (deux slugs quasi identiques pour des pages distinctes — hygiène de slugs douteuse), eaubonne, domont, deuil-la-barre.

**Patterns structurants** :
- 1 page par centre : `/les-centres/{ville}/` — c'est LE gabarit SEO local.
- 1 page par examen (globale, non localisée) : `/examens/{examen}/`.
- **Aucune page modalité×ville** (pas de `/irm-eragny/` ni `/les-centres/eragny/irm/`). La requête « IRM + ville » n'est adressée que par le title de la page centre.
- Blog à la racine sans préfixe `/actualites/{slug}` → mélange sémantique racine/posts.

---

## 3. Analyse page par page

### 3.1 Accueil — `https://www.groupe-resonance-imagerie.fr/`

| Élément | Valeur |
|---|---|
| Title | `Groupe Résonance Imagerie \| Centres d'imagerie en Ile-de-France - Groupe Résonance Imagerie` — **96 car., marque dupliquée 2×**, tronqué en SERP, aucun mot-clé « radiologie/IRM/scanner » |
| Meta description | « Pour vos imageries médicales, découvrez les centres du groupe Résonance Imagerie. Des équipements de pointe et des radiologues spécialisés. » — 139 car., correcte |
| Canonical | `https://www.groupe-resonance-imagerie.fr/` ✔ |
| H1 | `Groupe Résonance Imagerie` (1 seul H1 ✔ mais purement marque, zéro mot-clé métier) |
| Structure Hn | Désordonnée : des **H4 du méga-menu apparaissent avant le H1** ; puis H2 « Le groupe… », H2 « Nos centres d'imagerie médicale », H2 par région → H3 département (répété : 7× « H3: Paris ») → H4 ville ; H2 « Les questions fréquentes », « À la une », « Contactez nous ». Les blocs régions sont dupliqués 3× dans le DOM (menu + contenu + footer) |
| JSON-LD | 1 bloc Yoast : `WebPage`, `BreadcrumbList`, `WebSite` + `SearchAction`. **Aucun `Organization`/`MedicalOrganization` global, pas de logo, pas de sameAs** |
| CTA | ~112 liens Doctolib « Prendre rendez-vous » (1 par centre, listés dans des accordéons) ; « Mes résultats » (7 portails différents) ; **aucun `tel:` sur l'accueil** ; bouton flottant Doctolib |
| Formulaire | CF7 (`#wpcf7-f418`) : Nom-Prénom, Tél, Email, Sujet, **select « your-recipient » (choix du centre destinataire)**, Message + honeypot + reCAPTCHA. **Aucune case de consentement RGPD, aucun lien vers une politique de confidentialité** |
| Contenu | ≈ 2 800 mots de texte visible mais l'essentiel = listes de centres répétées ; texte éditorial réel très mince |
| Maillage | 324 liens internes / 96 URLs uniques ; 245 vers `/les-centres/…` (méga-menu + accordéons + footer) — **dilution massive du PageRank interne** |
| Avis Google | **Non affichés** (aucun widget, aucune note, aucun aggregateRating) — conforme à la déontologie |

**Forces** : hub géographique clair par région/département ; RDV Doctolib par centre accessible dès l'accueil ; formulaire routé par centre.
**Faiblesses** : 2,45 Mo de HTML ; title dupliqué ; H1 sans mot-clé ; Hn incohérents ; pas de schéma Organization ; pas de tel ; pas de bloc de réassurance chiffres/équipe ; aucun contenu éditorial de fond.

### 3.2 Centre Éragny — `/les-centres/eragny/`

| Élément | Valeur |
|---|---|
| Title (88 car.) | `Centre de radiologie Éragny – Imagerie Médicale – Val-d'Oise - Groupe Résonance Imagerie` |
| Meta description (117 car.) | « Centre d'imagerie à Éragny : IRM, scanner, radiographie, échographie, mammographie et infiltrations. Parking gratuit. » — bonne, orientée requête + argument concret |
| Canonical | `…/les-centres/eragny/` ✔ |
| **H1** | **ABSENT (0 H1)** — le titre visible « Centre d'Imagerie Médicale Éragny » est un **H2** |
| Structure Hn | (H4 menu) → H2 « Centre d'Imagerie Médicale Éragny » → H3 « Examens d'imagerie à Éragny », H3 « Plateau technique », H3 « Accès au centre », H3 « Prendre rendez-vous » → H2 « Nos Examens », H2 « Nos Spécialités », H2 « Contactez nous » |
| JSON-LD bloc 1 (Yoast) | WebPage + BreadcrumbList (Accueil > Les centres > Éragny) + WebSite |
| JSON-LD bloc 2 (custom) | **`MedicalOrganization`** : name « Centre d'imagerie médicale d'Éragny », url, `telephone: +33188602581`, `address` PostalAddress (7 rue du Commerce, Éragny, 95610, FR), `areaServed`, `medicalSpecialty: Radiology`, `openingHoursSpecification` (Mon–Sat 08:00–19:00), `availableService` = 7 `MedicalProcedure` (IRM, Scanner, Radiographie, Échographie, Mammographie, Infiltrations, Panoramique dentaire). **Manquent : `geo` (alors que lat/lng existent en data-attributes !), `image`, `priceRange`, `hasMap`, `aggregateRating` (normal, déontologie)** ; type `LocalBusiness`/`MedicalClinic` non utilisé |
| CTA | 1 `tel:+33188602581` affiché « 01 88 60 25 81 » ; 3 liens Doctolib (bouton « Prendre rendez-vous » de section + flottant) → **profil Doctolib « groupe-resonance-imagerie-val-d-oise » basé à Sartrouville** (`pid=practice-324538`), pas un profil propre à Éragny ; formulaire de contact |
| Formulaire | CF7 dédié (`f39696`) : Nom-Prénom*, Téléphone*, Mail*, Sujet*, Message* — promesse « nous vous contactons dans les 24 heures ». **Pas de case RGPD, pas de lien confidentialité** |
| Carte | Google Maps JS (`maps.googleapis.com`) avec `data-lat="49.0189867" data-lng="2.0997433"` |
| Contenu principal | **≈ 154 mots éditoriaux uniques** (intro, examens, plateau technique, accès bus + parking gratuit, RDV). Total `<main>` : 472 mots dont cartes examens/spécialités mutualisées |
| Maillage | 135 liens internes ; 77 vers `/les-centres/` (menu+footer), 16 vers `/examens/`, 24 vers `/spécialites/` ; ne pointe **que** vers les fiches examens génériques, jamais vers d'autres contenus locaux |
| Avis Google | Non affichés ✔ |

**Forces** : NAP complet et cohérent (adresse/tél/horaires) ; JSON-LD MedicalOrganization avec horaires ; meta description vendeuse ; carte + accès transports détaillé ; tél cliquable ; Doctolib direct.
**Faiblesses** : pas de H1 ; ~150 mots de contenu ; pas de photos du centre (1 seule image) ; pas d'équipe médicale locale ; pas de FAQ locale ; Doctolib rattaché à Sartrouville ; pas de geo dans le schéma.

### 3.3 Centre Franconville — `/les-centres/franconville/`

| Élément | Valeur |
|---|---|
| Title (89 car.) | `IRM, scanner et radiologie à Franconville \| Centre d'imagerie - Groupe Résonance Imagerie` — **meilleur pattern que Éragny : mots-clés modalités en tête** (title non uniformisé entre centres) |
| Meta description (104 car.) | « Centre d'imagerie à Franconville : IRM, scanner, coroscanner, radiographie, échographie et mammographie. » |
| Canonical | `…/les-centres/franconville/` ✔ |
| **H1** | **ABSENT (0 H1)** — « Centre d'Imagerie Médicale Franconville » est un H2 ; sections en H2 (et non H3 comme à Éragny → gabarit incohérent) |
| JSON-LD | Idem Éragny : `MedicalOrganization` — 25 boulevard Maurice Berteaux, 95130, `+33134130506`, 2 `openingHoursSpecification` (Lu–Ve 08:30–19:00 ; Sa 08:30–18:00), 8 `MedicalProcedure` (IRM, Scanner, **Coroscanner**, Radiographie, Échographie Doppler, Mammographie, Panoramique dentaire, Infiltrations). Toujours pas de `geo`/`image` |
| CTA | `tel:+33134130506` ; Doctolib `placeId=practice-185574` (profil VO commun) ; formulaire CF7 dédié (`f681`) mêmes champs, **sans RGPD** |
| Contenu principal | **≈ 180 mots éditoriaux** ; accès détaillé (RER C Franconville–Le Plessis-Bouchard, bus 3003C, 2 parkings gratuits à 150 m et 50 m) ; **bug de copier-coller visible : « …de faciliter l'accès aux examens d'imagerie médicale à Franconville. de faciliter l'accès aux examens d'imagerie médicale à Franconville. » (phrase dupliquée)** |
| Avis Google | Non affichés ✔ |

**Forces/faiblesses** : identiques à Éragny, plus le title mieux optimisé ; le centre « Imagerie de la Femme » de Franconville a sa propre page (segmentation intéressante).

### 3.4 Examen IRM — `/examens/irm/`

| Élément | Valeur |
|---|---|
| Title (31 car.) | `IRM - Groupe Résonance Imagerie` — **sous-optimisé** (pas de « IRM Paris/Val-d'Oise », pas de bénéfice) |
| Meta description (37 car.) | **`Rendez-vous - Résultats - Recrutement`** — **fallback générique du site, hors-sujet** (présente aussi sur Scanner, FAQ, Spécialités) |
| Canonical | `…/examens/irm/` ✔ |
| H1 | `IRM` ✔ (1 seul) |
| Structure Hn | H1 IRM → H2 « Comment se déroule une IRM ? » → H3 Indications / H3 Contre-indications → H2 « Préparer mon Examen » |
| JSON-LD | WebPage/Breadcrumb/WebSite Yoast uniquement — **aucun `MedicalTest`/`MedicalWebPage`/`FAQPage`** |
| Contenu principal | **≈ 273 mots** (déroulement, indications, contre-indications, préparation) — très mince pour une requête aussi concurrentielle |
| CTA | Accordéon « Prendre rendez-vous » par centre (54 liens Doctolib) + accordéon « Mes résultats » (17 liens portail) ; pas de tel |
| Maillage | 142 liens ; 76 vers les centres ; **la page examen ne cible aucune ville** |

### 3.5 Examen Scanner — `/examens/scanner/`
Structurellement identique à IRM : title 35 car. `Scanner - Groupe Résonance Imagerie`, même meta fallback 37 car., H1 `Scanner`, H2 déroulement → H3 Indications/Contre-Indications → H2 préparation, **≈ 256 mots**, aucun schéma médical, mêmes CTA génériques.

### 3.6 Index examens — `/nos-examens/`
Title 39 car. `Nos examens - Groupe Résonance Imagerie` ; meta 88 car. correcte ; **0 H1** (H2 « Nos examens ») ; grille de 12 cartes vers les fiches examens ; formulaire CF7 global avec select destinataire ; ≈ 1 600 mots dont l'essentiel = template.

### 3.7 Sondages complémentaires
- **`/faq/`** : title `Faq - Groupe Résonance Imagerie`, meta fallback « Rendez-vous - Résultats - Recrutement », 0 H1, **52 mots** — 5 questions en accordéon renvoyant vers des pages CPT dédiées. **Aucun schéma `FAQPage`** : opportunité de rich snippet totalement manquée.
- **`/spécialites/neuro-imagerie/`** : H1 présent, **≈ 64 mots**, meta fallback, pas de schéma — pages « spécialités » = vitrines quasi vides.
- **`/departement_centre/*` (21 URLs)** : **pages blanches (0 octet, HTTP 200) déclarées dans le sitemap** — gaspillage de crawl budget + signal qualité négatif envoyé à Google.

---

## 4. Duplication Éragny vs Franconville (mesuré)

| Mesure | Résultat |
|---|---|
| Mots éditoriaux uniques | Éragny **154** / Franconville **180** |
| Similarité du `<main>` complet (5-grammes) | **75 % des 5-grammes d'Éragny présents dans Franconville** ; Jaccard 53 % |
| Similarité du seul bloc éditorial (intro→RDV) | **70 %** (difflib SequenceMatcher sur les mots) ; 58 % des 5-grammes d'Éragny repris ; Jaccard 37 % |
| Phrases 100 % identiques (hors ville) | « Plateau technique » mot pour mot (« Le centre dispose d'un plateau technique complet permettant la réalisation d'examens diagnostiques dans des conditions optimales de qualité et de sécurité. ») ; intro « Situé …, le centre d'imagerie médicale du Groupe Résonance Imagerie accueille les patients pour la réalisation d'examens… » ; phrase RDV « Le centre propose des créneaux de rendez-vous adaptés afin de faciliter l'accès aux examens d'imagerie médicale à {Ville}. » |
| Seul bloc réellement unique | « Accès au centre » (transports/parkings) + liste des examens propres au plateau |

**Verdict : contenu type « spin » minimal — un gabarit où seuls la ville, la liste d'examens et l'accès changent.** ~70 % du texte éditorial est dupliqué entre centres, et le reste de la page (cartes examens, spécialités, formulaire, footer) est 100 % mutualisé. Sur 57 pages centres, Google voit essentiellement 57 variantes de la même page.

---

## 5. Stratégie SEO locale visible

1. **Modèle « 1 page par centre »** (`/les-centres/{ville}/`) : c'est l'unique surface de positionnement local. Pas de pages modalité×ville, pas de sous-domaines, pas de silo par département (la taxonomie prévue à cet effet — `departement_centre` — est cassée/vide).
2. Les **requêtes « IRM/scanner + ville »** ne sont travaillées que par le title (et encore, pattern incohérent : Franconville oui, Éragny non) et par le H3 « Examens d'imagerie à {Ville} ».
3. **JSON-LD MedicalOrganization par centre** (NAP + horaires + actes) : le vrai atout SEO local du site — mais amputé de `geo`, `image`, `hasMap`, et le type plus précis `MedicalClinic`/`DiagnosticLab` n'est pas utilisé.
4. Le blog n'apporte **aucun soutien sémantique local** (actualités corporate).
5. **Aucun avis Google, aucune note affichée** sur tout le site (vérifié : zéro occurrence de widget avis/étoiles/aggregateRating) → **conforme à l'interdiction déontologique française** (le concurrent ne prend pas ce risque ; ne pas le prendre non plus).
6. Maillage : chaque page embarque le méga-menu de 57 centres → tout le jus interne est réparti uniformément, aucune priorisation géographique.

---

## 6. Ce qui est réplicable (à reprendre dans la refonte)

- Le **gabarit page centre** : bandeau NAP (adresse + tél cliquable + horaires) → examens du plateau → accès transports/parking → RDV → carte + formulaire routé vers le centre. Simple et efficace en UX.
- **JSON-LD par centre** avec `openingHoursSpecification` détaillé et actes en `availableService` — à répliquer en mieux : `MedicalClinic` + `geo` + `image` + `hasMap` + `department`.
- **Doctolib en CTA principal partout** + bouton flottant + `tel:` en secours : le duo gagnant du secteur.
- Meta descriptions des pages centres orientées bénéfices concrets (« Parking gratuit »).
- CPT séparés examens / spécialités / FAQ (architecture de contenu saine sur le papier).
- Segmentation « Centre d'Imagerie de la Femme » (page dédiée à une offre) — bonne idée différenciante.

## 7. Ce qui est faible / attaquable

1. **Contenu ultra-mince et dupliqué** : 150–180 mots/centre (~70 % dupliqués), 250–270 mots/examen, 64 mots/spécialité. Une page centre de 600–900 mots réellement locale (équipe nommée, matériel précis avec marques/teslas, tarifs/conventionnement, FAQ locale) surclasse ce gabarit.
2. **Pas de pages modalité×ville** : les requêtes « IRM Éragny », « scanner Franconville », « mammographie Cergy » ne sont adressées par aucune URL dédiée → **terrain libre** pour un concurrent qui construit ce silo.
3. **Défauts techniques on-page** : pas de H1 sur les pages centres/FAQ/index ; titles incohérents (marque dupliquée sur l'accueil, fallback meta « Rendez-vous - Résultats - Recrutement » sur la moitié des gabarits) ; Hn désordonnés (H4 avant H1).
4. **Accueil de 2,45 Mo** (2 Mo de SVG inline) : Core Web Vitals mobiles très probablement dégradés → avantage concurrentiel facile sur la performance.
5. **21 URLs vides dans le sitemap** (taxonomie `departement_centre`) + `/merci/` indexable + doublons de slugs (`ermont-2`/`ermont2`) + URL accentuée `/spécialites/` (encodage %C3%A9 fragile) : hygiène technique médiocre.
6. **Pas de FAQPage schema**, pas de MedicalTest/MedicalWebPage → aucun rich snippet exploité.
7. **Conformité RGPD lacunaire** : formulaires CF7 sans case de consentement, **aucun lien « Mentions légales » ni « Politique de confidentialité » détecté** sur les pages analysées (seul le bandeau cookie-law-info existe) ; « Copyright 2021 - Tous droits réservé » (obsolète + faute). Pour un site santé, c'est un point noir — et un argument de réassurance à soigner chez nous.
8. **Doctolib mutualisé** : les centres du VO renvoient vers un profil commun « groupe-resonance-imagerie-val-d-oise » (Sartrouville) → friction UX (le patient doit re-choisir le lieu) ; un profil/lien par centre + motifs pré-filtrés fait mieux.
9. **Aucune preuve sociale ni contenu E-E-A-T** : pas d'équipe médicale sur les pages centres, page `/les-medecins/` globale seulement, blog sans contenu patient. Des bios de radiologues + contenus signés seraient un différenciateur fort.
10. Version WordPress exposée, crédit agence en dofollow site-wide, 2 GTM.

## 8. Recommandations directes pour la refonte du site concurrent

1. **Silo local complet** : page centre riche (600+ mots uniques) + pages filles `irm-{ville}`, `scanner-{ville}` (400–600 mots, schéma MedicalTest + lien Doctolib pré-filtré sur le motif) — inexistant chez GRI, gain rapide sur « modalité + ville ».
2. **Schema.org** : `MedicalClinic` avec `geo`, `hasMap`, `image`, `openingHoursSpecification`, `availableService`, + `FAQPage` sur les FAQ. Pas d'avis/étoiles (déontologie).
3. **Un H1 unique par page, title pattern homogène** type « IRM, scanner et radiologie à {Ville} | {Marque} » (le meilleur title de GRI est celui de Franconville — s'en inspirer et l'appliquer partout, eux ne l'ont pas fait).
4. **Performance** : viser un HTML < 100 Ko, images en `<img>` lazy optimisées (pas 2 Mo de SVG inline) — l'écart CWV sera mesurable.
5. **Conformité** : consentement RGPD sur chaque formulaire, mentions légales + politique de confidentialité en footer — différenciateur de confiance face à GRI.
6. **CTA** : tel + Doctolib du centre (pas un profil mutualisé), bouton flottant, promesse de rappel < 24 h (reprendre l'idée du formulaire GRI mais avec RGPD).

---

*Annexes : HTML bruts dans `raw/resonance/` (home, eragny, franconville, examen-irm, examen-scanner, nos-examens, faq, spec-neuro + 7 fichiers sitemap/robots). Extraction détaillée complète : `extract-output.txt`. Script : `extract.py`.*
