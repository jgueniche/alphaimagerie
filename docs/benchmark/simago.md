# Benchmark concurrentiel SEO/UX — Réseau SIMAGO

**Date du crawl :** 27 août 2026 (pages publiques, lecture seule, via curl + UA navigateur)
**Périmètre :** simago.fr (site groupe), pgl.simago.care et cimessonne.simago.care (microsites centres), sitemaps/robots, pages examens, infos pratiques, actualités.
**HTML bruts archivés dans :** `les archives de session (non versionnées)`

---

## 1. Architecture générale du dispositif SIMAGO

| Domaine | Rôle | Cible | Techno |
|---|---|---|---|
| `simago.fr` | Site « corporate » du réseau | **B2B : radiologues à recruter** (quasi exclusivement) + annuaire de centres | WordPress dédié, SEOPress, WP Rocket 3.23.1.1, Cloudflare, PHP 8.1, thème sur mesure `lesanimals` (agence Les Animals) |
| `*.simago.care` | Microsites **par groupe de centres** (pas par centre) | Patients | **WordPress multisite** 6.5.9 (preuve : `wp-content/uploads/sites/3/` pour PGL, `sites/15/` pour CIM Essonne), PHP 8.0, Cloudflare, même thème `lesanimals` |
| `recrutement.simago.fr` | Jobboard (liens sortants géolocalisés depuis les microsites) | Candidats | (non crawlé) |
| Portails résultats | `emiradiologie-soc.nd.care` (PGL) / `auth.mon-portail-patient.net` (CIM Brétigny) / Pro Santé Connect (CIM « Espace médecins ») | Patients & médecins | Prestataires externes, différents selon les groupes |

**Microsites `.care` référencés depuis l'annuaire `/nos-centres/` (13 sous-domaines) :** alloradio, antony, arpajon (redirige 301 → cimessonne), auxerre, brunoy, capricorne, chelles, cimdelabaie, coutances, granville, idl, parisradio, pgl. Un microsite = un **groupe local** regroupant 2 à 10 centres.

**Prise de RDV :** 100 % déléguée à **Doctolib** (deep-links `/booking` avec `specialityId=11` et `bookingFunnelSource=external_referral`). Aucun module RDV propriétaire, aucun autre éditeur (Keldoc/Maiia absents).

**Tracking & consentement :** Google Tag Manager (`GTM-K4PMH2D` sur .fr ; `GTM-WMTL3F65` partagé par les microsites), CMP **OneTrust** (cookielaw.org). Police Epilogue via Google Fonts. Lib de smooth-scroll **Lenis** sur microsites. Pas de jQuery/React : 1 bundle JS + 1 CSS du thème (front léger).

---

## 2. Robots.txt & sitemaps — cartographie de l'arborescence

### simago.fr
- `robots.txt` : standard WP + `Sitemap: https://simago.fr/sitemaps.xml` (index SEOPress, `/sitemap.xml` redirige vers `/sitemaps.xml`).
- Index → 2 sitemaps :
  - **`page-sitemap1.xml` : 32 URLs** — arborescence corporate : `/decouvrir-simago/*` (4), `/rejoindre-notre-reseau/*` (3), `/travailler-chez-simago/*` (6 : radiologues, manipradio, secrétaires, jeunes talents, téléimagerie, culture), `/notre-projet-medical/*` (6 : IA, formations, comités, alliance téléimagerie, webinaires), `/contact/*` (3 dont `etre-rappele`), `/nos-centres/`, `/nos-ressources/`, légal (4).
  - **`centre-sitemap1.xml` : 120 URLs** — fiches centres `/nos-centres/{slug}` (CPT « centre »). Anomalies : 2 slugs bruts d'ID (`/nos-centres/161074`, `/nos-centres/161066`), `/nos-centres/` dupliquée dans les deux sitemaps.
- **Le blog `/nos-ressources/` (articles) est ABSENT du sitemap** : les ~12+ actualités ne sont pas soumises à Google via sitemap.

### Microsites .care (pgl & cimessonne — identiques)
- `robots.txt` : standard WP, **sans directive `Sitemap:`** (oubli).
- Index sitemap (`/sitemaps.xml`) : `post`, `page`, `category`, `post_tag` uniquement.
  - `page-sitemap1.xml` : **8 URLs** : `/`, `/infos-pratiques/`, `/nos-examens/`, `/presentation/`, `/charte-qualite/`, `/mentions-legales/`, `/donnees-personnelles/`, `/politique-de-gestion-des-cookies/`.
  - `post-sitemap1.xml` : `/` + **`/bonjour-tout-le-monde/`** → l'article de démo WordPress est publié, indexable (`index, follow`) et déclaré au sitemap sur les DEUX microsites.
  - `category-sitemap1.xml` : `/category/non-classe/` (catégorie par défaut, vide de sens).
- **Faille majeure : les CPT « centre » et « examen » sont hors sitemap** alors que ce sont les pages les plus riches : PGL possède `/centre/diderot/`, `/centre/hector-malot/`, `/centre/daumesnil-irm-scanner/` et **17 fiches examens** (`/nos-examens/irm/`, `/scanner/`, `/eos/`, `/mammographie/`, `/echographie/`, `/doppler/`, `/radiographie/`, `/osteodensitometrie/`, `/infiltrations/`, `/biopsie-ponction/`, `/cone-beam/`, `/imagerie-dentaire/`, `/tomosynthese/`, `/togd/`, `/uretrocystographie/`, `/bilan-long-cone/`, + feed). Elles ne sont découvrables que par maillage interne.

---

## 3. Analyse page par page

### 3.1 Accueil groupe — https://simago.fr/ (redirigé depuis www)
| Élément | Valeur |
|---|---|
| Title | `Simago - le réseau des centres d’imagerie d’exercice libéral` — **60 car.** ✔ |
| Meta description | 143 car. : « Simago est le réseau des centres d’imagerie d’exercice libéral où les radiologues libéraux s'épanouissent avec un modèle d'organisation rénové. » ✔ |
| Canonical | `https://simago.fr/` ✔ |
| H1 | **3 balises H1** : 2 vides (`<h1 class="main_logo">` — le logo est encapsulé en H1, dupliqué desktop/mobile) + « Le réseau national des centres d’imagerie » ✘ |
| Structure Hn | H1 > H2 Missions / ADN (H3 Intelligence artificielle) / Promesse / En direct du Simag' (3 H3 actus) / Ils en parlent mieux que nous / Les opportunités Simago / Bénéficier de la force d'un réseau national / Vos questions les plus fréquentes (FAQ accordéon 5 questions B2B) |
| JSON-LD | 2 blocs : `WebSite` (name, alternateName, description, url) + `Organization` (logo, sameAs, `ContactPoint` telephone +33 1 80 27 39 50, contactType) |
| CTA principaux | « Découvrir Simago », « Rejoindre notre réseau », « Notre projet médical » (boutons menu) ; tél. footer `tel:+33180273950`. **Aucun CTA patient, aucun bouton RDV, aucun lien Doctolib sur la home.** |
| Formulaires | 0 sur la home (formulaires ACF Extended sur `/contact/contactez-nous/` — nom*, prénom*, email*, tél, select profil, message — et `/contact/etre-rappele/` — nom*, prénom*, tél, select) |
| Volume texte | ~1 370 mots |
| Avis/notes | Non (un carrousel « Ils en parlent mieux que nous » = témoignages de radiologues, pas d'avis patients) |
| Technos | WP + SEOPress + WP Rocket + GTM + OneTrust + Cloudflare |

**Lecture :** la home .fr est un site de **recrutement de radiologues** (FAQ : « Simago est-il un fonds d'investissement ? », « vais-je perdre mon indépendance ? »). Le patient n'est PAS la cible du .fr : il n'y a même pas d'entrée « Prendre RDV ».

### 3.2 Annuaire — https://simago.fr/nos-centres/
- Title `Nos centres - Simago` (20 car., sous-optimisé), **pas de meta description**, canonical propre.
- H1 : « Recherchez un centre d'imagerie médicale Simago » ; ~120 cartes centres en H3, ~3 884 mots.
- Filtres par groupe/région (boutons « IDF - Groupe Brunoy », « Bretagne - Groupe Bassin Lorientais »…) + bouton « Localiser » par carte.
- La majorité des cartes renvoie vers la fiche `/nos-centres/{slug}` ; **5 cartes court-circuitent vers Doctolib directement** (ex. centres Berck/Audruicq/Blériot). Aucun JSON-LD (pas d'`ItemList`).

### 3.3 Fiche centre .fr — ex. `/nos-centres/centre-dimagerie-medicale-hector-marlot-paris-gare-de-lyon`
- Title `Centre d’Imagerie Médicale Hector Malot – Simago` (48 car.) ; **pas de meta description ; pas de JSON-LD** (pas de `MedicalClinic`/`LocalBusiness` !).
- H1 correct + H2 dupliqué du nom ; ~224 mots (fiche Brétigny : ~212 mots) → **contenu très mince**.
- Contenu : groupe d'appartenance, note en étoiles (CSS `--review_percent`) + compteur d'avis Google « (79) » + lien « Voir les avis » → `maps.google.com/?cid=…`, adresse, téléphone du centre, **lien vers le microsite en URL brute comme ancre** (« https://arpajon.simago.care/ » — ancre non optimisée), liste des examens (3 puces), équipe (noms des praticiens), carte Google Maps.
- **Pas de bouton Doctolib sur la fiche .fr** : le RDV impose de passer par le microsite → parcours patient en 4 sauts (annuaire → fiche → microsite → Doctolib).

### 3.4 Blog actus — https://simago.fr/nos-ressources/ (« Le Simag' »)
- Title `Blog – Simago` (13 car.), **pas de meta description, PAS de H1**, pas de JSON-LD.
- 3 catégories : `La vie médicale` (/categorie/vie-medicale/), `Le secteur de l'imagerie médicale` (/categorie/le-mag/), `Les brèves du réseau` (/categorie/news-du-reseau/) ; pagination `/page/2/`.
- **Sujets d'actualité relevés (12 premiers) :**
  1. Machine **EOS** au Groupe Paris Gare de Lyon (15/07/2026) — nouvel équipement
  2. **Nouvelle IRM à Albi** (04/07/2026) — nouvel équipement
  3. Création d'**Astérion** (médecine nucléaire) (19/06/2026) — marque/filière
  4. Premier **PET scan au Puy-en-Velay** (29/04/2026) — nouvel équipement
  5. **SimaRempla** : plateforme de remplacement médical (15/04/2026) — outil interne
  6. **« Vers un accueil patient 100 % digital »** — déploiement des solutions **WiiS** (préenregistrement digital + bornes d'accueil), pilote au Centre du Pays de Gex, **12 sites équipés**, réduction des files d'attente — parcours patient digital
  7. RSNA 2025 – **Intelligence artificielle** et imagerie augmentée (21/01/2026)
  8. Manifeste « Soigner et dialoguer » (06/01/2026) — RSE/positionnement
  9-11. « **Trajectoire Simago** » : portraits de radiologues (Dr Milano, Dr El Farssi, Dr Leveziel) — marque employeur
  12. « Mammographie : l'autre urgence silencieuse » (13/11/2025) — sensibilisation dépistage
- Articles : title jusqu'à 116 car. (trop long), **aucune meta description, aucun schema `Article`**, ~750-830 mots, un seul lien profond éventuel. Aucun sujet « SMS de confirmation » ou « tiers payant » traité en tant que tel ; l'actu patient la plus proche est le dossier bornes/préenregistrement WiiS.
- **Les microsites n'ont AUCUNE rubrique actualités** (seul le post démo « Bonjour tout le monde ! » existe) : toute l'actu vit sur le .fr, invisible depuis les microsites (aucun flux, aucun lien).

### 3.5 Accueil microsite PGL — https://pgl.simago.care/
| Élément | Valeur |
|---|---|
| Title | `Paris Gare de Lyon` — **18 car., pas de mot-clé métier, pas de marque Simago** ✘ |
| Meta description | **« Simago - Centres » — 16 car.**, template dupliqué sur tous les microsites ✘ |
| Canonical | `https://pgl.simago.care/` ✔ |
| H1 | « Groupe Paris Gare de Lyon » (unique) ✔ |
| Hn | H1 > H2 par centre (Espace Imagerie & Radio EOS / Centre Hector Malot / Daumesnil IRM & Scanner) > H2 vidéo responsable de site > H2 « Une question ? » |
| JSON-LD | `WebSite` (+`SearchAction`) + `Organization` **génériques** (description Simago réseau, pas du groupe local ; pas d'adresse, pas de `MedicalClinic`) |
| CTA | **Header (menu secondaire, en haut à droite, sticky) : « Prendre un rendez-vous » → Doctolib** (deep-link booking), « Résultats d’examens » → emiradiologie-soc.nd.care, « PACS Médecins » → nd.care login. Chaque carte centre a aussi son « Prendre un rendez-vous » Doctolib + « En savoir plus » → `/centre/{slug}/` |
| Position bouton RDV | **Header top, 1er lien du menu secondaire, présent sur toutes les pages** (classe `menu__link-appointment`) + répété par carte centre |
| Formulaires | 0 (aucun formulaire de contact patient sur tout le microsite ; « Une question ? » renvoie vers Infos pratiques) |
| Volume | ~348 mots ✘ |
| Avis | Non sur la home (oui sur les pages centre) |
| Divers | Filtre des centres par examen (16 chips) ; vidéo YouTube embarquée ; « Nous rejoindre » → recrutement.simago.fr géolocalisé |

### 3.6 Accueil microsite CIM Essonne — https://cimessonne.simago.care/
- Title `CIMEssonne` (**10 car.**), même meta description « Simago - Centres » (16 car.) → **duplicate cross-sites**.
- H1 « Groupe CIMEssonne » ; 3 cartes centres (Brétigny, Jeu de Paume, Brossolette) ; ~240 mots.
- **Différence majeure vs PGL : le header ne contient QUE « Espace médecins »** (SSO Pro Santé Connect / Softway Medical). **Pas de bouton global « Prendre un rendez-vous », pas de « Résultats d'examens » dans le header.** Le RDV n'existe que sur les cartes centres (dont 2 pointent vers le Doctolib de Brossolette, y compris la carte « Jeu de Paume » — deep-link probablement erroné/mutualisé).
- Incohérences : la carte Brétigny du .fr renvoie vers `arpajon.simago.care` (redirige vers cimessonne) ; le portail résultats (mon-portail-patient.net) n'apparaît que sur la page centre Brétigny.

### 3.7 « Infos pratiques » (parcours patient) — /infos-pratiques/ (PGL & CIM identiques au mot près)
- Title `Infos pratiques - Paris Gare de Lyon` (36 car.) / `Infos pratiques - CIMEssonne` (28 car.) ; **pas de meta description ; pas de JSON-LD** ; H1 « Informations pratiques » ; ~586 mots (PGL) / ~511 (CIM).
- **Structure exacte du contenu :**
  1. Intro : préparation d'une **preuve d'identité** obligatoire (alimentation du **DMP**).
  2. Liste 1 — documents pour l'examen : **ordonnance originale/courrier du prescripteur ; carte Vitale ou attestation à jour ; justificatif d'identité (CNI/passeport)**.
  3. Liste 2 — « Ensuite, veuillez présenter » : **carte de mutuelle à jour ; moyen de paiement (CB, chèque, espèces) ; examens antérieurs liés ; bilan sanguin si demandé**.
  4. RDV : renvoi vers **Doctolib** (lien texte) + consigne d'**annulation ≥ 24 h à l'avance**.
  5. H2 « **Charte Simago Transparence et Confiance** » : fiches explicatives (PDF) pour les **examens sensibles** : mammographie, examens sur mineurs, échographie de grossesse par voie basse, échographie pelvienne, hystérographie, coloscopie virtuelle, cystographie rétrograde, IRM de la verge et cavernographie — angle droits du patient, pudeur, sécurité.
  6. Bloc « Imagerie médicale, comprendre et savoir quand c'est vraiment utile » : renvoi aux **recommandations de pertinence de la HAS**.
- **Ce qui MANQUE sur cette page** : horaires, accès/transport, parking, stationnement PMR, **tarifs / conventionnement / tiers payant**, délais de résultats, contact téléphonique, FAQ. Les horaires/accès ne vivent que sur les pages `/centre/{slug}/`. Une coquille (« votre visite dans notre centres ») est dupliquée sur CIM — preuve d'un copier-coller de template non relu.

### 3.8 Page centre microsite — ex. https://pgl.simago.care/centre/diderot/ (hors sitemap)
- Title `Espace Imagerie & Radio EOS` (27 car., sans ville ni marque) mais **meta description soignée (148 car.)** : « Centre d'imagerie médicale Espace Imagerie (Paris 12)… Prise de RDV en ligne. » — page retravaillée récemment.
- H1 nom du centre ; ~441 mots ; **pas de JSON-LD** (aucun `MedicalClinic`, pas d'`AggregateRating` malgré les données affichées !).
- **Bloc d'intro très complet (le vrai « hub » patient)** : présentation ; **bouton « Prendre un rendez-vous » (Doctolib) + bouton téléphone `tel:` ; adresse + « Voir sur Google map » ; horaires (Lun-Ven 08h00-18h30, Sam 08h00-12h30) ; étoiles (CSS `--review_percent:80%` = 4,0/5) + compteur « (995) » + « Voir les avis » → Google Maps** (cid direct).
- Suite : encadré consignes du serveur vocal (« composer le choix n°1 »), **liste des examens non réservables en ligne** (biopsie/ponction, hystérographie, urétrocystographie, TOGD → secrétariat), accordéons des examens pratiqués (liens vers fiches examens), trombinoscope des praticiens, bloc « Une question ? » → Infos pratiques.
- Équivalent CIM (`/centre/centre-dimagerie-medicale-de-bretigny/`) : même gabarit, ~277 mots, pas de meta description, lien « Je veux accéder à mes résultats » → mon-portail-patient.net.

### 3.9 Fiches examens — /nos-examens/ et /nos-examens/{slug}/ (hors sitemap)
- **Listing** `/nos-examens/` : title `Examens – Paris Gare de Lyon` (28 car., séparateur – incohérent avec le « - » des autres pages), pas de meta description, H1 « Les examens pratiqués », 16 accordéons H2 + **4 vidéos pédagogiques HAS embarquées** (cervicalgies, thyroïde, gonalgie, lombalgie) ; ~264 mots.
- **Fiche standard** (IRM : 399 mots, title 24 car. ; Scanner CIM : 333 mots, title 20 car. ; pas de meta description) : H2 « Qu'est-ce que… », « Avant une IRM, il peut vous être demandé… », « Informations complémentaires », « Les centres qui pratiquent… » (cross-link avec CTA Doctolib). Contenu générique, dupliqué entre microsites.
- **Fiche EOS = le modèle SEO du réseau** (visiblement optimisée en 2026) : title **`Radiographie EOS Paris 12 (Gare de Lyon) - Basse dose, corps entier`** (67 car., mot-clé + localisation), meta 162 car., **1 085 mots**, H2 sémantiques (reconstruction 3D, faible dose/pédiatrie, indications, préparation), **FAQ accordéon de 12 questions** (durée, déroulé, jeûne, ordonnance, douleur, irradiation, enfants, remboursement…), maillage vers la page centre — mais **aucun schema `FAQPage`/`MedicalTest`**, la FAQ n'est pas exploitée pour les rich results.

---

## 4. Synthèse : articulation site groupe (.fr) vs microsites (.care)

### Le modèle
- `simago.fr` = **marque B2B + annuaire** : il capte les requêtes « réseau/groupe imagerie », héberge les 120 fiches centres (SEO local de surface) et tout le contenu éditorial (blog). Zéro tunnel patient.
- `*.simago.care` = **vitrines patients par groupe local** : identité propre (logo co-brandé Simago + centre dans le header), RDV Doctolib, infos pratiques, fiches examens. Le lien retour vers le .fr est réduit à un « En savoir plus » en footer.
- Le maillage croisé existe (.fr fiche → microsite ; microsite footer → .fr) mais reste pauvre : ancres nues, pas de liens contextuels, pas de flux d'actus partagé.

### Avantages du choix SIMAGO
1. Autonomie de marque locale : chaque groupe garde son nom historique (rassurant après un rachat) — la home .fr n'impose pas Simago au patient.
2. Multisite WP unique pour les .care : gabarits, charte, GTM et CMP mutualisés → coût marginal de déploiement d'un nouveau centre très faible.
3. Ciblage propre : les requêtes patients atterrissent sur un site 100 % patient, sans bruit corporate.
4. Séparation des risques (un site compromis ≠ tout le réseau, quoique le multisite mutualise le risque côté .care).

### Inconvénients / coût SEO (dilution d'autorité — réel)
1. **Dilution massive** : l'autorité se répartit entre simago.fr, 13+ sous-domaines d'un **second domaine** (.care) et recrutement.simago.fr. Google traite les sous-domaines comme des entités quasi indépendantes : chaque microsite repart avec un profil de liens à ~zéro, alimenté par 1-2 liens internes du .fr.
2. **Cannibalisation locale** : pour « centre imagerie Brétigny », trois pages concurrentes (fiche .fr, microsite CIM, page /centre/ du microsite) + la fiche Doctolib + la fiche Google — sans canonical inter-domaines ni stratégie claire de page cible.
3. **Duplication de gabarits** : meta descriptions identiques (« Simago - Centres »), fiches examens quasi identiques d'un microsite à l'autre → contenu dupliqué inter-sous-domaines non différencié localement.
4. Le .care ne bénéficie pas du contenu éditorial (blog sur .fr uniquement) et le .fr ne convertit pas (pas de CTA patient) : **chaque domaine n'a que la moitié des atouts**.

---

## 5. Points forts (à répliquer) / faiblesses (à attaquer)

### Réplicable — ce qu'ils font bien
- **Bouton « Prendre un rendez-vous » sticky en tête de header sur tout le microsite PGL** + rappel par carte centre, deep-links Doctolib pré-filtrés (specialityId) — friction minimale.
- **Trio header patient : RDV / Résultats d'examens / Espace médecins (PACS)** — les 3 intentions majeures adressées dès le header.
- Bloc d'identité centre exemplaire (page /centre/) : adresse + tél cliquable + horaires + note Google en étoiles + compteur d'avis + lien direct vers les avis (cid). **⚠ Ce dernier élément (avis/notes) est INTERDIT pour Alpha Imagerie (art. R.4127-19-1 CSP — témoignages de tiers) : ne répliquer que la structure NAP/horaires/CTA du bloc, jamais les étoiles.**
- Gestion des attentes : liste explicite des **examens non réservables en ligne** + consignes serveur vocal — réduit les appels inutiles et les no-shows Doctolib.
- Checklist documents (ordonnance/Vitale/identité/mutuelle/antériorités) + règle d'annulation 24 h — le cœur d'une page « préparer sa visite ».
- **Charte examens sensibles** (pudeur, droits, déroulé) : différenciateur de réassurance rare, fort pour l'E-E-A-T santé et l'image.
- Vidéos HAS de pertinence + FAQ de 12 questions sur la fiche EOS : bon modèle de fiche examen locale (title localisé « Radiographie EOS Paris 12 »).
- Front sobre et rapide : thème custom sans jQuery, 1 bundle JS/CSS, lazy-load, Cloudflare, TTFB 0,36-0,59 s.
- Storytelling d'actus réseau : équipements (EOS, IRM, PET), accueil digital (bornes WiiS, préenregistrement), portraits de praticiens.

### Faible / attaquable — les brèches SEO/UX
1. **SEO on-page microsites indigent** : titles de 10-28 car. sans mots-clés (« CIMEssonne », « IRM – Paris Gare de Lyon »), **meta descriptions absentes sur ~90 % des pages** ou dupliquées (16 car.), séparateurs incohérents (- vs –).
2. **Zéro données structurées métier** : aucun `MedicalClinic`/`LocalBusiness` (adresse, horaires, geo), aucun `AggregateRating` (alors que la note est affichée !), aucun `FAQPage` (alors que les FAQ existent), aucun `Article`/`BreadcrumbList`. Un concurrent qui balise proprement prend les rich results locaux sans opposition.
3. **Sitemaps microsites cassés** : CPT centres + 17 fiches examens hors sitemap, robots.txt sans directive Sitemap, mais l'article démo « Bonjour tout le monde ! » et `/category/non-classe/` déclarés et indexables. Hygiène d'industrialisation visiblement non contrôlée (2 slugs numériques bruts aussi sur le .fr ; footer avec `aria-label="Les Animals"`, nom de l'agence).
4. **Contenus minces et dupliqués** : accueils microsites 240-350 mots ; fiches centres .fr ~215 mots ; fiches examens ~330-400 mots quasi identiques entre microsites ; seule la fiche EOS atteint 1 000+ mots. Aucune page ville / zone de chalandise, aucun contenu localisé (accès, transports, parking).
5. **Parcours RDV incohérent selon les microsites** : CIM Essonne n'a pas de bouton RDV global ni de lien résultats dans le header ; deep-link Doctolib visiblement erroné (Jeu de Paume → Doctolib Brossolette) ; fiche .fr sans bouton RDV (4 clics jusqu'à Doctolib).
6. **Pas de formulaire de contact patient, pas d'email, pas de chat** sur les microsites : « Une question ? » boucle vers Infos pratiques.
7. **Infos pratiques sans les infos les plus cherchées** : ni tarifs/conventionnement/**tiers payant**, ni délais de résultats, ni accès détaillé — requêtes patient fréquentes laissées sans réponse (opportunité de contenu + featured snippets).
8. Blog invisible des patients (sur le .fr B2B, absent du sitemap, sans schema, sans meta) ; aucune actu locale sur les microsites.
9. Techniquement : HTML non mis en cache edge (cf-cache DYNAMIC), pas de HSTS ni en-têtes de sécurité, images JPG/PNG sans WebP/AVIF, `og:image` absente sur la plupart des pages microsites.
10. **Dilution .fr/.care** (cf. §4) : un concurrent mono-domaine avec pages centres + examens + ville sur un seul host concentre son autorité et peut dépasser chaque microsite isolé sur les requêtes locales « scanner/IRM + ville ».

### Recommandations express pour la refonte du client
- Un seul domaine, arborescence /centres/{ville}/ + /examens/{examen}/ + pages examen×ville ; schema LocalBusiness/MedicalClinic + FAQPage partout (~~AggregateRating~~ **exclu : affichage d'avis/notes interdit par R.4127-19-1 CSP**) ; meta uniques.
- Reprendre : header RDV/Résultats/Espace pro, bloc identité centre (NAP/horaires/CTA, **sans avis Google** — déontologie), checklist documents + annulation 24 h, liste des examens non réservables en ligne, charte examens sensibles, FAQ par examen (12 questions, modèle EOS), vidéos HAS.
- Ajouter ce qu'ils n'ont pas : tarifs & tiers payant, délais de résultats, accès/parking/PMR, formulaire de contact, actus locales du centre (équipements, SMS de rappel…), maillage blog→pages examens.

---

## 6. Annexe — inventaire des fichiers bruts

`raw/simago/` : simago-home.html, simago-robots.txt, simago-sitemap.xml, simago-page-sitemap.xml, simago-centre-sitemap.xml, simago-nos-centres.html, simago-nos-ressources.html, simago-fiche-hector-malot.html, simago-fiche-bretigny.html, simago-actu-digital.html, simago-actu-eos.html, simago-etre-rappele.html, simago-contact.html, pgl-home.html, pgl-robots.txt, pgl-sitemap.xml (+post/page/cat), pgl-infos-pratiques.html, pgl-nos-examens.html, pgl-examen-eos.html, pgl-examen-irm.html, pgl-presentation.html, pgl-charte-qualite.html, pgl-centre-diderot.html, pgl-bonjour.html, cim-home.html, cim-robots.txt, cim-sitemap.xml (+post/page/cat), cim-infos-pratiques.html, cim-nos-examens.html, cim-examen-scanner.html, cim-presentation.html, cim-centre-bretigny.html, arpajon-home.html (= redirection vers cimessonne).

Script d'extraction : `analyze.py` (même répertoire scratchpad).
