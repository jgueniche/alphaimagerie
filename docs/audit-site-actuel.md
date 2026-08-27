# Audit du site actuel — www.alphaimagerie.fr (Wix)

> Phase 0 · Crawl réalisé le 2026-08-27 (curl, UA navigateur, 6/6 pages du sitemap récupérées). Extractions brutes archivées hors repo (scratchpad de session). GSC non audité : accès non fourni (demandé dans `docs/questions.md`).

## 1. Périmètre constaté

- **6 URLs** dans `pages-sitemap.xml` (lastmod uniforme 2025-02-12, non fiable) : `/`, `/centre-imagerie-medicale-val-d-oise`, `/examens-imagerie-medicale-val-d-oise`, `/radiologues-experts-val-d-oise`, `/rdv-centre-de-radiologie-val-d-oise`, `/mentions-légales`.
- `robots.txt` Wix standard (Disallow `*?lightbox=`, sitemap déclaré). Canonical = `https://www.alphaimagerie.fr` (www), à conserver.
- Meta `google-site-verification=ol7ZyAQV5TShF2GzDd5J_oV7kF_Fdr_EZ1uIEna9P5Q` présente sur toutes les pages → à reprendre à l'identique.
- **Goussainville : zéro occurrence sur tout le site.** Le 2e site n'existe pas en ligne.

## 2. Synthèse SEO par page

| Page | Title (car.) | Meta desc (car.) | H1 | Mots | JSON-LD |
|---|---|---|---|---|---|
| `/` | Imagerie Médicale Val d'Oise (95, Cergy-Pontoise) Alpha Imagerie (64) | 181 | **3 H1** (« Prendre RDV », « Mes résultats », « Portail médecins » = boutons) | 491 | LocalBusiness (nom+adresse seulement) + WebSite |
| `/centre-imagerie-…` | …(73) | 174 | 1 (« Notre centre ») | 312 | — |
| `/examens-imagerie-…` | …(74) | 175 | **0** (H2 « Nos examens ») | 1 183 | — |
| `/radiologues-experts-…` | …(66) | 165 | **0** | 161 | — |
| `/rdv-centre-de-radiologie-…` | …(62) | 164 | **0** | 181 | — |
| `/mentions-légales` | Mentions légales \| Alpha Imagerie (33) | 198 (copie de la desc accueil) | **0** | 843 | — |

Constats transverses : tous les titles > 60 car. sauf 2 ; toutes les descriptions > 155 car. ; H1 absents ou multiples ; pattern de title dupliqué « … Val d'Oise (95, Cergy-Pontoise) Alpha Imagerie » sur 5 pages (cannibalisation « Val d'Oise » entre toutes les pages, aucune ne cible `{modalité}+{ville}`).

## 3. Défauts techniques et SEO

1. **Aucun lien `tel:`** sur tout le site — le 01 86 30 30 00 est du texte mort : pas de click-to-call mobile, pas de tracking appel possible. Défaut de conversion n°1.
2. **JSON-LD quasi absent** : un `LocalBusiness` minimal (nom, adresse, image) sur la seule home — pas de `telephone`, `openingHoursSpecification`, `geo`, `sameAs`, `hasMap`, pas de `MedicalClinic`/`MedicalOrganization`, aucun `ImagingTest`/`Physician`/`FAQPage`/`BreadcrumbList`.
3. **Liens sociaux cassés** (footer/home) : Facebook → `facebook.com/WixFrancais` (page Wix France) à côté de la vraie page (`profile.php?id=61564987941779`) ; LinkedIn → URL **admin** (`/company/100667412/admin/feed/posts/?feedType=following`) et, page équipe, → `linkedin.com/company/wix-com` + profil personnel `linkedin.com/in/jeremy-gueniche-b9729a148`.
4. **Deux e-mails concurrents** sur la home : `contact@` et `info@alphaimagerie.fr` → unifier sur `contact@`.
5. **Doctolib** : lien profil simple (pas de `pid`/motif), non tracé, pas de bouton officiel.
6. **Hn incohérents** : H1 = libellés de boutons (home), pages sans H1, blocs répétés « Prise de Rendez-Vous / Portail Patients / Portail Médecins » en H2 sur les 6 pages (boilerplate dupliqué).
7. **Aucune page** par examen, par site, préparation, FAQ, prescripteurs, recrutement, contact dédiée (le formulaire est sur la home), politique de confidentialité, cookies, accessibilité.
8. Poids : 536–636 kB de HTML par page (avant assets) — surcharge Wix typique ; scripts Wix (analytics/TB) chargés sans CMP visible dans le HTML.
9. URL accentuée `/mentions-légales` (+ variante `%C3%A9` en canonical) — prévoir les 2 variantes dans la table de 301.
10. Images : logo via `static.wixstatic.com` ; alt peu descriptifs.

## 4. Défauts juridiques (à corriger dans la refonte)

- **Mentions légales incomplètes (LCEN + profession réglementée)** : ni raison sociale SELAS, ni capital, ni RCS/SIRET, ni inscription à l'Ordre/n° des praticiens, ni DPO. Présents : directeur de publication « Monsieur GUENICHE Jérémy » avec **e-mail personnel `Jgueniche@yahoo.fr`** (à remplacer par contact@), hébergeur Wix.com Inc., texte cookies générique (panier d'achat électronique…) inadapté.
- **Formulaire home** (Prénom, Nom, E-mail, Téléphone, Message libre) : aucune mention RGPD/finalité/durée, aucun avertissement « pas de donnée médicale », message libre = collecte probable de données de santé non encadrée.
- Pas de CMP/bandeau conforme constaté dans le HTML livré.

## 5. Contenu existant réutilisable (après validation)

- **Bloc accès Cergy très détaillé** (A15 sorties 5/9, P1 porte F→B, repères boutiques, P2 niveau E/2/3 entrée « District / Mail des Cerclades », RER A escalator, itinéraire piéton av. de la Poste) — excellente base pour `/centres/cergy`, à restructurer.
- **Horaires** : centre Lun–Ven 8h–22h, Sam 8h–18h30, Dim 8h30–18h30 ; **secrétariat téléphonique Lun–Ven 8h–18h30, Sam 8h–12h30** (distinction à conserver sur le nouveau site) ; standard « Tapez 1 RDV / Tapez 2 autre ».
- **Bios équipe** : Dr Jérémy Gueniche (ancien interne HUS Strasbourg ; ancien assistant spécialiste et praticien attaché Institut Curie, Saint-Cloud ; sénologie, ostéo-articulaire, ORL) ; Dr Yoram Gueniche (ancien interne AP-HP ; ancien chef de clinique assistant et praticien attaché hôpital Tenon ; imagerie pelvienne, sénologie, thoracique et urinaire).
- **Descriptions d'examens** (page examens, 1 183 mots) : IRM (casque anti-bruit, musique, 10–20 min), scanner, radiographie, mammographie, échographie (**réalisée aussi par manipulateur échographiste via protocole de coopération validé par l'État** — élément différenciant à confirmer), biopsies/cytoponctions, infiltrations, ostéodensitométrie (conditions de remboursement), **hystérosalpingographie** (J6–J12 du cycle, β-HCG si doute de grossesse) — modalité absente du brief §1/§5, à intégrer au sitemap cible.
- **Page centre** : ouverture septembre 2024 ; « Scanner en 2025 » (statut actuel à confirmer) ; radiologues issus de l'Institut Curie / hôpital Tenon ; collaboration médecins locaux, hôpital de Pontoise, maisons de santé, CPTS ; CR envoyé au prescripteur par mail + interface dédiée + **DMP** ; modules de reconstruction 3D côté médecins ; IRM Philips 1,5 T.
- L'argument « ouvert 7j/7 jusqu'à 22h » n'est **jamais exploité** (ni title, ni hero, ni texte) — différenciateur à activer partout.

## 6. Table de redirections 301 (v1 — à figer en Phase 4/5)

| Ancienne URL Wix | Cible |
|---|---|
| `/centre-imagerie-medicale-val-d-oise` | `/centres/cergy` |
| `/examens-imagerie-medicale-val-d-oise` | `/examens` |
| `/radiologues-experts-val-d-oise` | `/equipe` |
| `/rdv-centre-de-radiologie-val-d-oise` | `/prendre-rendez-vous` |
| `/mentions-légales` **et** `/mentions-l%C3%A9gales` | `/mentions-legales` |
| variantes trailing slash + apex | 301 vers équivalent `www` sans slash |

À compléter avec l'export GSC (pages « indexées » + « explorées actuellement non indexées » + backlinks) dès accès fourni.

## 7. Priorités issues de l'audit

1. Click-to-call + CTA Doctolib tracés partout (mobile d'abord).
2. Pages centre (Cergy **et Goussainville**) + pages modalité×ville : tout est à créer.
3. JSON-LD complet (MedicalOrganization, MedicalClinic ×2, ImagingTest, Physician, FAQPage, BreadcrumbList).
4. Mise en conformité : mentions légales complètes, formulaire RGPD, CMP, politique de confidentialité, accessibilité.
5. Exploitation éditoriale du 7j/7–22h et du plateau (IRM Philips 1,5 T nommée, scanner à confirmer).
6. Correction des liens sociaux et unification `contact@`.
