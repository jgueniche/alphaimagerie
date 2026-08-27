# Benchmark imdev.fr & Core Web Vitals — préparation refonte Alpha Imagerie

**Date d'analyse : 27/08/2026 (~22h00 UTC)** · Méthode : curl (User-Agent Chrome 126) sur pages publiques, lecture seule ; analyse Python (BeautifulSoup) des HTML bruts archivés dans `raw/imdev/` et `raw/concurrents/` ; API PageSpeed Insights v5 (sans clé) pour la mission 2.

---

## MISSION 1 — Benchmark imdev.fr

### 1.1 Vue d'ensemble et pile technique

imdev.fr est le site **corporate/B2B d'un groupement d'imagerie** (cible : radiologues, manipulateurs, établissements partenaires — **pas les patients**). Tout le site converge vers 2 conversions : **Postuler** et **Contact**. Aucune prise de RDV en ligne, aucun lien Doctolib, aucun module résultats patients, aucun avis Google affiché nulle part.

**Technos détectées (identiques sur tout le site)** :
- **WordPress + Elementor 3.31.3 + Elementor Pro** (formulaires), thème **Hello Elementor + child « hello-child »**
- Add-ons Elementor : Happy Elementor Addons, Flipbox Elementor Plugin, Custom Elementor Image Accordion Widget (sections « défis » de la home)
- **Plugin cartographie maison : `imdev-map-plugin` v1.1.2** (voir §1.5)
- SEO : **Yoast SEO** (sitemaps, JSON-LD, fil d'Ariane) ; perfs : **WP-Optimize** (minification/cache, trace `wpo-minify`)
- Mesure : **Site Kit by Google 1.176.0**, **Google Tag Manager + GA4 (gtag)** ; CMP : **Complianz GDPR** (bandeau consentement)
- jQuery 3.7.1, Swiper (sliders témoignages/actus), reCAPTCHA (formulaires), DOMPurify 3.1.6
- Leaflet 1.7.1 + Leaflet.markercluster 1.4.1 **chargés depuis le CDN unpkg.com** (dépendance externe non self-hostée)
- Footer : « Fait avec ♥ par **ASB DIGITAL** » (agence : asb-digital.fr)

### 1.2 robots.txt & sitemap — arborescence et patterns d'URL

`robots.txt` : minimal (bloc Yoast, `Disallow:` vide + un fichier WP-Optimize interdit), sitemap déclaré : `https://www.imdev.fr/sitemap_index.xml` (redirection 301 depuis /sitemap.xml).

**Index Yoast : 9 sous-sitemaps** — la structure éditoriale repose sur des **custom post types dédiés** :

| Sous-sitemap | Contenu | Volume | Pattern d'URL |
|---|---|---|---|
| page-sitemap | Pages statiques | 10 | `/{slug}/` (nos-centres, qui-sommes-nous, notre-projet, postuler, contact, actualités, légales…) |
| post-sitemap | Actualités | 32 | `/{slug}/` à la racine (pas de préfixe /blog/) |
| **imdev_establishment** | Fiches centres | **115** (114 + archive `/etablissement/`) | `/etablissement/{slug}/` |
| **imdev_zone** | Taxonomie régions | 11 | `/zone/{slug}/` |
| **imdev_service** | Taxonomie examens | 17 | `/service/{slug}/` (irm, scanner, mammographie, échographie, doppler, cone-beam, scintigraphie…) |
| temoignage | Témoignages praticiens | 8 | `/temoignage/{slug}/` |
| ha_library / category / author | Techniques Yoast/Happy Addons | — | pollution d'index (ha_library = templates Happy Addons indexés !) |

**Défaut notable** : slugs générés avec accents perdus → URLs sales : `/zone/le-de-france/` (Île-de-France), `/service/ost-o-densitom-trie/`, `/service/chographie/`, `/etablissement/h-pital-de-l-est-parisien/`. Dernières modifs : posts 30/06/2026, établissements 02/07/2026 — site maintenu.

### 1.3 Analyse page par page

**Tableau récapitulatif** (longueurs en caractères ; mots = texte visible page entière, header/footer inclus) :

| Page | Title (long.) | Meta description (long.) | Canonical | H1 | Hn | Mots | Formulaire | Avis |
|---|---|---|---|---|---|---|---|---|
| `/` (accueil) | « Groupement d'imagerie médicale en France – IMDEV » (48) | 156 c. | auto-référente OK | « Ensemble, construisons l'imagerie de demain » | 1×H1, 6×H2, 8×H3 | 1 394 | non | non |
| `/nos-centres/` | « Nos centres d'imagerie médicale - IMDEV » (39) | 138 c. | OK | « Nos centres d'imagerie » | 1×H1, 1×H2, 1×H3, **114×H4** (un par centre) | 2 862 | non | non |
| `/qui-sommes-nous/` | « Groupement d'imagerie médicale en France – IMDEV » (48) **⚠ quasi-doublon du title de l'accueil** | 143 c. | OK | « Qui sommes-nous ? » | 1×H1, 3×H2 | 949 | non | non |
| `/notre-projet/` | « Le projet médical IMDEV » (23 — court) | 148 c. | OK | « Notre projet » | 1×H1, 4×H2, 4×H3 | 1 907 | non | non |
| `/postuler/` | « Rejoindre imdev et nos centres de Radiologie - IMDEV » (52) | 127 c. | OK | « Postuler » | 1×H1, 1×H2 | **672** | **oui (candidature)** | non |
| `/contact/` | « Un projet, une question ? contactez nous - IMDEV » | — | OK | — | — | — | oui (contact) | non |
| `/etablissement/…colombes/` (fiche centre) | « SELAS Crystal Imagerie • Centre d'Imagerie Médicale de Colombes - IMDEV » (71 — trop long) | **absente (0)** | OK | = raison sociale + nom du centre | **1×H1 seulement, aucun H2** | **432** | non | non |
| `/zone/le-de-france/` | « **Archives des** Île-de-France - IMDEV » (34) | **absente** | OK | « **Actualités** » (!) | 1×H1 | 531 | non | non |
| `/service/irm/` | « **Archives des** IRM - IMDEV » (24) | **absente** | OK | « **Actualités** » (!) | 1×H1 | 531 | non | non |

Meta robots partout : `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`.

**Détails par page**

**Accueil** — Récit corporate : H2 « Qu'est-ce que le groupe IMDEV ? », « Les défis de l'imagerie » (accordéon d'images : 4 défis / 4 réponses en H3, ex. « Vieillissement de la pyramide des âges des radiologues » → « Un service de recrutement dédié… »), « Ils ont rejoint notre réseau » (slider Swiper de témoignages praticiens), « IMDEV recrute ! », « Découvrez les centres du réseau IMDEV », « Dernières actualités ». CTA : Postuler → `/postuler/`, Contact → `/contact/`, « Découvrez IMDEV » → `/qui-sommes-nous/`, « Notre projet », « Voir tous les témoignages » → `/notre-projet/#temoignages`, « Rejoignez-nous ! » → `/postuler/`, « Découvrez les centres IMDEV » → `/nos-centres/`. 71 liens. HTML 219 KB, 43 balises `<script>`, 47 feuilles CSS (signature Elementor lourde), 21 `<img>` dont 12 lazy, 0 WebP détecté dans le HTML, 1 seul `fetchpriority`.

**Nos centres** — H2 « Découvrez nos plateaux d'imagerie », H3 « Établissements (114) », puis 114 H4 (un par centre, format « SELAS Xxx • Nom du centre »). 173 liens. Carte : voir §1.5.

**Qui sommes-nous** — 3 H2 : « L'histoire d'IMDEV », « IMDEV en quelques chiffres » (compteurs : **250 radiologues, 135 centres, 11 régions, 1 pôle de médecine nucléaire**…), « IMDEV, une société à mission » + CTA « Télécharger le rapport » (href="#", **lien mort/JS**). Page courte (949 mots) pour une page de marque.

**Notre projet** — la vraie page de « vente » recrutement : 4 piliers en H3 (« Sacralisation du "temps médecin" », « Indépendance médicale », « Amélioration continue de la prise en charge », « Médecine de pointe »), H2 « Pourquoi rejoindre IMDEV ? », « Nos radiologues témoignent » (CPT temoignage), « Questions fréquentes » avec **schema FAQPage valide — 4 questions** (« À qui appartient IMDEV ? », « Vais-je conserver mon indépendance médicale… ? », « Quels sont les avantages… ? », « Comment rejoindre le réseau IMDEV ? »). CTA doubles « Nous contacter » / « Nous rejoindre ».

**Postuler** (recrutement) — 672 mots seulement. **Formulaire Elementor Pro unique de candidature spontanée** (aucune liste d'offres, aucun ATS) : Type de poste souhaité* (select 8 options : Radiologue, Manipulateur en électroradiologie médicale, Cadres divers, Personnel administratif, Développement, Opérations, Finances, Autre), Disponibilité* (date), Région souhaitée* (select par **départements** + « France entière »), Ville souhaitée (select des villes d'implantation), Nom*, Prénom*, Téléphone*, Email*, Message*, pièce jointe CV (file), consentement RGPD* (checkbox) + **reCAPTCHA**. Envoi via admin-ajax Elementor (pas d'action dédiée).

**Contact** — Formulaire Elementor Pro : Objet de la demande* (select : **« Rejoindre le réseau »** / « Autre(s) question(s) » — même le contact est orienté recrutement), Nom*, Prénom*, Structure, Téléphone, Email*, Message*, préférence de rappel (radio tél/mail), pièce jointe, RGPD* + reCAPTCHA.

**Fiche centre (ex. Colombes)** — contenu réel ≈ 6 éléments : fil d'Ariane, H1 (raison sociale SELAS + nom), adresse postale, téléphone cliquable (`tel:0147818101`), **lien sortant vers le site patient propre du centre** (ex. `https://www.imagerie92nord.com/nos-centres#centre2`), badges examens (Doppler, Échographie, Mammographie, Cone Beam, Radiologie conventionnelle), bouton « Retour à la liste » → `/nos-centres/#carte`. **Pas de meta description, pas de H2, pas d'horaires, pas de photo spécifique, pas d'équipe, pas de RDV, pas d'avis.** ≈ 432 mots dont l'essentiel est header/footer. C'est une **fiche annuaire** qui délègue le patient aux sites locaux des SELAS.

**Pages zone & service** — archives WordPress **jamais habillées** : title Yoast par défaut (« Archives des IRM - IMDEV »), H1 « Actualités » (!), aucun contenu propre, aucune meta description. 11 + 17 URLs indexables quasi vides = poids mort SEO.

### 1.4 JSON-LD (données structurées)

Uniquement le **graphe Yoast par défaut** sur toutes les pages : `WebPage` (ou `CollectionPage` sur les archives), `BreadcrumbList`, `WebSite` (+ SearchAction), `Organization` (name, url, logo, image). Deux exceptions : `ImageObject` (qui-sommes-nous) et **`FAQPage` (4 Q/R) sur /notre-projet/** — seul enrichissement volontaire.

**Absents partout** : `MedicalOrganization` / `MedicalClinic` / `LocalBusiness` sur les 114 fiches centres (pas d'adresse, geo, horaires, téléphone en structuré), **`JobPosting` : aucun** (aucune offre d'emploi structurée — invisible sur Google for Jobs), `Physician`, `Review`/`AggregateRating`, `MedicalProcedure`.

### 1.5 La carte des centres — implémentation (réplicable)

- **Plugin WordPress maison `imdev-map-plugin` v1.1.2** (JS ~`/wp-content/plugins/imdev-map-plugin/js/imdev-map.js`)
- **Leaflet 1.7.1 + Leaflet.markercluster 1.4.1**, CSS/JS tirés du **CDN unpkg.com** (point de fragilité + requête tierce) ; **tuiles OpenStreetMap standard gratuites** (`{s}.tile.openstreetmap.org`) — pas de clé, pas de Google Maps, pas de consentement requis
- Carte initialisée sur la France : `L.map(...).setView([46.603354, 1.888334], 6)` + `L.markerClusterGroup({showCoverageOnHover:false})`
- **Les 114 marqueurs sont inline dans le HTML** (`var markersData = [...]`) avec pour chaque centre : `{id, lat, lng, title, address, permalink, zone_class}` — `zone_class` (ex. `imdev-marker-zone-nouvelle-aquitaine`) colore le marqueur par région
- UI : conteneur double **liste + carte** (`imdev-map-list-container` / `imdev-map-map-container`), **barre de recherche client-side** (« Rechercher un établissement… »), zone de filtres, onglets Liste/Carte prévus en mobile (`texts.list_tab/map_tab`), détails chargés en **admin-ajax + nonce** (`view_details`)
- La liste HTML des 114 centres (H4 + liens) est rendue côté serveur → **le maillage vers les fiches est crawlable**, la carte n'est qu'une surcouche. Ancre de retour `#carte`.

### 1.6 Synthèse recrutement

Le recrutement est **le produit du site** : entonnoir Accueil (« IMDEV recrute ! », accordéon « défis ») → `/notre-projet/` (argumentaire 4 piliers + 8 témoignages praticiens en CPT dédié + FAQ schematisée) → `/postuler/` (formulaire riche mais candidature spontanée unique). **Aucun schema JobPosting, aucune offre individuelle, aucun ATS** (Elementor Forms + reCAPTCHA + upload CV). Ciblage fin dans le formulaire (poste / département / ville) qui compense l'absence d'offres. Le select contact « Rejoindre le réseau » confirme la priorité B2B (ralliement de cabinets/SELAS).

### 1.7 Forces / faiblesses

**Forces** : positionnement éditorial limpide (2 conversions) ; architecture CPT propre et scalable (établissement/zone/service/témoignage) ; carte Leaflet+OSM sans coût ni consentement, liste SSR crawlable ; FAQPage valide ; témoignages incarnés (Dr nommés) ; chiffres clés ; titles/meta soignés sur les pages stratégiques ; fil d'actus actif (32 posts, dont marque employeur) ; CMP Complianz + RGPD propre ; maillage interne fort vers /postuler/.

**Faiblesses** : fiches centres squelettiques (432 mots, 0 meta description, 0 H2, 0 horaires, 0 schema local, 0 avis) ; **taxonomies zone/service à l'abandon** (titles « Archives des… », H1 « Actualités », 28 URLs quasi vides indexées) ; aucun JobPosting ; title dupliqué accueil/qui-sommes-nous ; slugs accentués cassés ; ha_library (templates) indexé ; lourdeur Elementor (219 KB HTML, 43 scripts, 47 CSS sur la home, pas de WebP) ; dépendance CDN unpkg ; CTA « Télécharger le rapport » mort ; zéro dimension patient (assumée, mais laisse le champ libre).

### 1.8 Réplicable / attaquable pour la refonte Alpha Imagerie

**À répliquer** : ① modèle de données CPT centre + taxonomies examen/zone (mais en les habillant réellement) ; ② carte Leaflet + OSM + markercluster avec marqueurs inline `{lat,lng,title,address,permalink}` + liste SSR + recherche — simple, gratuit, RGPD-friendly (self-hoster les libs plutôt qu'unpkg) ; ③ entonnoir recrutement « défis → projet → témoignages nominatifs → FAQ (FAQPage) → formulaire ciblé poste/lieu + CV » ; ④ discipline title/meta des pages clés ; ⑤ ancrage `#carte` et retour liste.

**Où les battre** : ① fiches centres riches (horaires, accès, équipe, équipements, photos, RDV en ligne) + **JSON-LD MedicalClinic/LocalBusiness complet** — imdev n'en a aucun ; ② pages examens réelles (préparation, déroulé, remboursement) sur les slugs qu'imdev laisse en friche ; ③ **JobPosting** structurés pour sortir sur Google for Jobs ; ④ ~~affichage d'avis (AggregateRating)~~ **exclu pour Alpha Imagerie : l'affichage d'avis/notes est interdit par l'art. R.4127-19-1 CSP (déontologie médicale) — ne s'applique qu'à des acteurs non soumis à cette interdiction** ; ⑤ tout le volet patient (Doctolib, résultats) inexistant chez imdev ; ⑥ perfs (stack plus légère qu'Elementor) ; ⑦ SEO local par ville — les archives « zone » d'imdev sont inertes.

---

## MISSION 2 — Core Web Vitals (API PageSpeed Insights)

### 2.1 Statut d'exécution : ÉCHEC API (quota), documenté

Appels `runPagespeed?url=…&strategy=mobile&category=performance&category=seo&category=accessibility&category=best-practices` **sans clé API**, espacés de 13 s, avec **1 retry après 30 s par URL** (conforme consigne). Résultat : **HTTP 429 sur les 8 tentatives** (22:02→22:05 UTC) + 1 contrôle final également 429. Message exact de l'API :

> `Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'.`

Diagnostic : le **quota JOURNALIER du projet anonyme partagé** (utilisé pour tous les appels sans clé issus de l'IP de sortie du proxy) est épuisé — ce n'est pas un débit trop rapide, réessayer aujourd'hui ne peut pas aboutir. **Aucun score PSI/CrUX n'a donc pu être collecté pour les 4 URLs.** Erreurs brutes : `raw/psi/*.error.json`, journal : `raw/psi/psi.log`.

**Tableau CWV demandé — état :**

| URL | Perf | SEO | A11y | BP | LCP lab | CLS lab | TBT lab | CrUX (LCP/CLS/INP terrain) |
|---|---|---|---|---|---|---|---|---|
| https://www.alphaimagerie.fr/ | — | — | — | — | — | — | — | — |
| https://groupe-resonance-imagerie.fr/les-centres/eragny/ | — | — | — | — | — | — | — | — |
| https://www.simago.fr/ | — | — | — | — | — | — | — | — |
| https://www.imdev.fr/ | — | — | — | — | — | — | — | — |

*Toutes cellules : échec HTTP 429 (quota journalier anonyme, 2 tentatives/URL + contrôle). À relancer avec une **clé API gratuite** (`&key=…`, quota propre 25 000 req/jour) ou depuis une autre IP de sortie — le script prêt à l'emploi est conservé : `scratchpad/psi_fetch.sh`.*

### 2.2 Fallback : indicateurs statiques comparés (1 GET HTML par site, UA navigateur)

Mesures faites sur le seul document HTML (sans assets) — **indicatif, non équivalent aux CWV** :

| Indicateur | alphaimagerie.fr / | résonance /les-centres/eragny/ | simago.fr / | imdev.fr / |
|---|---|---|---|---|
| CMS / stack | **Wix** (Website Builder) | WordPress 7.0.2 + WP Rocket 3.23.1 + Site Kit | WordPress + WP Rocket 3.23.1.1 | WordPress + Elementor Pro + WP-Optimize |
| Poids du HTML seul | **621 KB (très lourd)** | 154 KB | **103 KB (le plus léger)** | 219 KB |
| Balises `<script>` | 63 | 43 | **14** | 43 |
| CSS externes | 0 (inline Wix) | 4 | 4 | 47 |
| Images `<img>` / WebP | 9 / 30 réf. webp | 1 / 0 | 34 / 70 réf. webp | 21 / 0 webp |
| TTFB observé (1 mesure curl, indicatif) | 0,45 s | **3,36 s (!)** | 0,85 s | (non re-mesuré) |
| JSON-LD (@type) | LocalBusiness, PostalAddress, WebSite | **MedicalOrganization, MedicalProcedure, OpeningHoursSpecification, PostalAddress, Breadcrumb…** (le plus riche) | Organization, ContactPoint, WebSite | WebPage, Breadcrumb, WebSite, Organization (+FAQPage sur 1 page) |
| Doctolib présent | **oui** (lien doctolib.fr/…/alpha-imagerie) | **oui** + reCAPTCHA | non (home) | non |

Lecture prudente : le HTML Wix de 621 KB + 63 scripts d'alphaimagerie.fr laisse présager un score Performance mobile faible (à confirmer par PSI avec clé) ; la fiche Éragny de Résonance a le **meilleur balisage médical structuré** du panel (MedicalOrganization + horaires + MedicalProcedure — le vrai modèle à suivre côté schema) mais un TTFB observé très dégradé sur cette mesure unique ; Simago sert le HTML le plus sobre. imdev est dans la moyenne, pénalisé par l'inflation CSS/JS d'Elementor.

### 2.3 Reste à faire (mission 2)

1. Relancer `psi_fetch.sh` avec une clé API PageSpeed (gratuite, projet Google Cloud) — ajouter `&key=` ; 2. compléter le tableau 2.1 (scores + LCP/CLS/TBT lab + percentiles CrUX `loadingExperience`) ; 3. recouper avec le CrUX Dashboard (origines) si les 4 origines sont éligibles.

---

## Annexes — fichiers de travail

- HTML bruts imdev : `scratchpad/raw/imdev/` (home, nos-centres, qui-sommes-nous, notre-projet, postuler, contact, centre-colombes, zone-idf, service-irm, robots.txt, sitemaps)
- HTML concurrents (fallback) : `scratchpad/raw/concurrents/`
- Analyse structurée JSON : `scratchpad/imdev_analysis.json` ; script : `scratchpad/analyze_imdev.py`
- Erreurs PSI + log : `scratchpad/raw/psi/` ; script réutilisable : `scratchpad/psi_fetch.sh`
