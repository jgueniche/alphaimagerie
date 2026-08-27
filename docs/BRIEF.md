# PROMPT CLAUDE CODE — Refonte complète de alphaimagerie.fr

> Brief fondateur du projet, fourni par le donneur d'ordre le 2026-08-27. Document de référence : toute décision de conception, de contenu ou de conformité s'y rattache. Les champs `[[À COMPLÉTER]]` sont listés en §15 — ils ne doivent JAMAIS être inventés.

---

## 0. Rôle et mission

Tu es simultanément : lead developer front (Next.js/TypeScript), architecte SEO technique + SEO local, UX designer santé, et UX writer médical francophone. Tu travailles pour les deux radiologues associés-gérants d'Alpha Imagerie (SELAS d'imagerie médicale, Val-d'Oise). Le donneur d'ordre est lui-même radiologue, développeur (Next.js/Supabase/Vercel/Claude Code) et juriste : calibre-toi à ce niveau, pas d'explications introductives, pas de vulgarisation.

Mission : remplacer le site Wix actuel ([www.alphaimagerie.fr](https://www.alphaimagerie.fr)) par un site vitrine **au niveau des meilleurs groupes du secteur et au-dessus**, conçu dès la première ligne pour :

1. un référencement naturel exceptionnel (SEO technique + sémantique + local — Google Search et Google Maps) ;
2. une exploitation immédiate en Google Ads (landing pages, tracking conversions, Consent Mode v2, attribution appels) ;
3. une conversion patient maximale : prise de RDV Doctolib (par site, par examen), appel, itinéraire, formulaire de contact conforme.

Objectif business mesurable : top 3 Google (organique + pack local Maps) sur `{modalité} + {ville}` pour Cergy/Cergy-Pontoise et Goussainville et leurs bassins, sur IRM, scanner, échographie, mammographie, radiographie, ostéodensitométrie.

---

## 1. Contexte client — faits vérifiés (à ne pas réinventer)

| Élément | Valeur |
|---|---|
| Entité | Alpha Imagerie — SELAS, radiologues associés-gérants : Dr `[[NOM Jeremy]]` et Dr Yoram Gueniche |
| Site 1 | **Cergy Préfecture** — 2 Mail des Cerclades, 95000 Cergy. Dans/contigu au centre commercial Les 3 Fontaines, sortie directe RER A Cergy-Préfecture (escalator). Parking P1 (porte F/B, 2 h gratuites) et P2 (24/7, niveau E/2/3, entrée « District / Mail des Cerclades »). A15 sortie 5 (est) / sortie 9 (ouest). |
| Site 2 | **Goussainville** — `[[adresse, accès, parking, transports]]` |
| Téléphone | 01 86 30 30 00 (Cergy) — Goussainville `[[À COMPLÉTER]]` |
| E-mail | contact@alphaimagerie.fr (l'ancien site mélange `info@` et `contact@` : unifier sur `contact@`) |
| Horaires Cergy | Lun–Ven 8h–22h · Sam 8h–18h30 · Dim 8h30–18h30 → **ouvert 7j/7, jusqu'à 22h en semaine** : argument différenciant majeur, à exploiter partout (hero, title tags, GBP, Ads) |
| Horaires Goussainville | `[[À COMPLÉTER]]` |
| Plateau Cergy | IRM Philips 1,5 T, scanner `[[marque/coupes]]`, échographie (dont Doppler, mammaire, pelvienne), mammographie `[[tomosynthèse ?]]`, radiographie numérique capteur plan, ostéodensitométrie, radiologie interventionnelle (infiltrations, biopsies, cytoponctions) |
| Plateau Goussainville | `[[À COMPLÉTER]]` |
| Expertises affichées | imagerie thoracique, pelvienne, vasculaire ; imagerie de la femme (sénologie : mammographie, échographie et IRM mammaires, dépistage organisé) |
| Équipe | radiologues issus de CHU/CH ; MERM formés toutes modalités + radioprotection ; liste nominative `[[À COMPLÉTER]]` |
| Doctolib | https://www.doctolib.fr/centre-d-imagerie-medicale/cergy/alpha-imagerie — Goussainville `[[URL / pid=practice-…]]` |
| Portails résultats | Patients et médecins : https://imcp-dmz.xplore.fr/Xaportaildiffusionmobile (Xplore) — lien sortant uniquement |
| Réseaux | Instagram @alpha.imagerie · Facebook page id 61564987941779 · LinkedIn company 100667412 |
| Site actuel | Wix. URLs indexées : `/`, `/centre-imagerie-medicale-val-d-oise`, `/examens-imagerie-medicale-val-d-oise`, `/radiologues-experts-val-d-oise`, `/rdv-centre-de-radiologie-val-d-oise`, `/mentions-légales`. Canonical actuelle : `https://www.alphaimagerie.fr`. Meta Search Console à conserver : `google-site-verification=ol7ZyAQV5TShF2GzDd5J_oV7kF_Fdr_EZ1uIEna9P5Q` |
| Défauts constatés | lien Facebook pointant vers la page Wix France ; lien LinkedIn = URL admin ; Goussainville absent ; aucune page par examen ni par site ; aucune donnée structurée ; perf Wix ; formulaire générique |

---

## 2. Benchmark sectoriel — ce qu'on retient, ce qu'on dépasse

Phase 0 : crawle et analyse ces sites (arborescence, Hn, données structurées, CWV via PageSpeed Insights, CTA, formulaires) et produis `docs/benchmark.md`.

| Référence | À retenir | À dépasser |
|---|---|---|
| Groupe Résonance Imagerie — groupe-resonance-imagerie.fr (notamment `/les-centres/eragny/` et `/les-centres/franconville/`, concurrents directs 95) | 1 page par centre (modalités, accès transports/parkings, PMR, créneaux), formulaire « rappel sous 24 h », contenu local propre | Leurs pages centre sont minces et répétitives : nos pages centre + modalité×ville seront denses, uniques, avec équipement nommé, délais, préparation |
| SIMAGO — simago.fr + microsites `*.simago.care` (ex. pgl.simago.care, cimessonne.simago.care) | Parcours patient, rubrique « Infos pratiques », actualités (nouvel équipement, SMS de confirmation, tiers payant), RDV en ligne mis en avant | Design plus premium, SEO long-tail (préparation examens), FAQ schématisée, performance |
| IMDEV — imdev.fr | Carte des centres, page « Qui sommes-nous », recrutement structuré | Pas de couche marketing groupe : nous, c'est 2 sites, hyper-local, hyper-concret |
| Doctolib (fiche Alpha Imagerie) | Le benchmark de facto de l'UX de RDV : c'est vers lui qu'on envoie, on ne le réinvente pas | On pré-qualifie (site, examen, préparation) AVANT le clic pour réduire les RDV mal pris |

---

## 3. Cadre juridique et conformité — NON NÉGOCIABLE

Toute production (code, copy, tracking) doit respecter :

1. **Communication médicale — art. R.4127-19-1 CSP (décret n° 2020-1662)** : information loyale et honnête ; **interdiction des témoignages de tiers** → aucun widget avis Google/Doctolib, aucune note, aucun verbatim patient sur le site ni dans les annonces ; **aucune comparaison** avec d'autres centres (« meilleur centre du 95 » interdit) ; aucune incitation à des actes inutiles ; aucun superlatif commercial. Titres et qualifications : uniquement ceux reconnus par l'Ordre. Les tarifs et le conventionnement peuvent être communiqués (transparence tarifaire).
2. **RGPD** : minimisation. Le formulaire de contact ne collecte **aucune donnée de santé** : champs = civilité, nom, prénom, e-mail, téléphone, site souhaité, type de demande (liste fermée : renseignement / RDV / résultats / prescripteur / autre), message avec mention explicite « N'indiquez aucune information médicale ». Transmission par e-mail (TLS) vers contact@ ; si stockage (Supabase, région UE) : purge automatique à 90 jours. Politique de confidentialité complète, registre de traitement fourni dans `docs/rgpd/`.
3. **HDS** : le site n'héberge ni ne traite aucune donnée de santé (Vercel n'est pas HDS). Résultats et images = lien sortant vers le portail Xplore, jamais d'upload d'ordonnance ou d'image sur le site.
4. **Cookies (CNIL)** : CMP conforme (tarteaucitron.js ou Axeptio) ; aucun tag tiers avant consentement ; GA4 + Google Ads via **Consent Mode v2** (défaut : tout `denied`) ; mesure d'audience exemptée de consentement en parallèle (Matomo configuré selon la CNIL ou Plausible EU) pour une base de stats fiable sans bannière ; Google Maps embed chargé uniquement après consentement (image statique + lien « Itinéraire » sinon) ; polices auto-hébergées (`next/font`), zéro appel Google Fonts.
5. **Mentions légales** LCEN + profession réglementée : raison sociale, forme, capital, RCS Pontoise, SIRET, siège, directeur de publication, hébergeur, inscription à l'Ordre, DPO/contact `[[À COMPLÉTER]]`.
6. **Accessibilité** : viser RGAA 4.1 / WCAG 2.1 AA (patientèle âgée, mobile) ; page « Accessibilité » avec déclaration.
7. **Doctolib** : uniquement liens et bouton officiels ; pas de scraping ni de reproduction de l'agenda.
8. **Google Ads santé** : pas de remarketing ni de listes d'audience basées sur des pages d'examens (interdit par la politique Google sur la santé) ; annonces purement informatives.

---

## 4. Stack technique imposée

| Couche | Choix | Contraintes |
|---|---|---|
| Framework | Next.js 15+ App Router, TypeScript strict, React Server Components, rendu statique (SSG) pour toutes les pages de contenu | zéro JS client inutile ; `next/image` (AVIF/WebP, `sizes` corrects) ; `next/font` self-hosted |
| UI | Tailwind CSS v4 + shadcn/ui (composants copiés, pas de dépendance runtime lourde) | design system documenté dans `docs/design-system.md` |
| Contenu | fichiers MDX dans `/content` avec frontmatter validé par zod (ou Velite). Pas de CMS headless au départ ; architecture prête à brancher Sanity/Payload plus tard | tout le contenu éditorial versionné Git ; tout élément non confirmé = `[[À CONFIRMER]]` visible en dev, bloquant en build prod |
| Formulaire | Server Action + zod + honeypot + rate limiting ; envoi via Resend ou Brevo (SMTP UE) ; Turnstile en mode non interactif uniquement si le spam l'exige | voir §3.2 |
| Données | Supabase (région UE, `eu-central-1` ou `eu-west-3`) uniquement si stockage du formulaire ; sinon aucune base | |
| Hébergement | Vercel, région `cdg1`/`fra1`, domaine `alphaimagerie.fr` | canonical `https://www.alphaimagerie.fr` (conserver l'existant) ; apex → 301 www |
| SEO infra | `app/sitemap.ts`, `app/robots.ts`, Metadata API, composants JSON-LD typés (`schema-dts`), redirections 301 dans `next.config` | |
| Analytics | GTM → GA4 + Google Ads + Consent Mode v2 ; Matomo/Plausible exempté | voir §11 |
| Qualité | ESLint, Prettier, `tsc --noEmit` en hook pre-commit ; Playwright (parcours critiques + axe-core) ; Lighthouse CI en CI GitHub Actions | seuils §13 |
| Git | repo GitHub, `main` protégé, branche par feature, Conventional Commits, PR avec preview Vercel | |

---

## 5. Architecture de l'information (sitemap cible)

Slugs définitifs, français, sans stop-words inutiles. Chaque page = 1 intention de recherche.

```
/                                        Accueil (choix du site, 3 CTA, argument 7j/7, examens, accès)
/prendre-rendez-vous                     Sélecteur site → examen → deep link Doctolib + téléphone + pré-requis
/centres/cergy                           Page pilier locale (NAP, horaires, plateau, accès détaillé, équipe, FAQ locale)
/centres/goussainville                   idem
/centres/cergy/irm                       Pages modalité × ville (SEO local + landing Ads) — contenu ≥ 40 % unique
/centres/cergy/scanner                   (équipement nommé, horaires de la modalité, délais indicatifs, accès, préparation courte)
/centres/cergy/echographie
/centres/cergy/mammographie
/centres/cergy/radiographie
/centres/cergy/osteodensitometrie
/centres/goussainville/[modalité]        selon plateau réel
/examens                                 Hub examens
/examens/irm                             Pilier IRM (déroulement, préparation, contre-indications, injection gadolinium, claustrophobie, durée, résultats, tarifs, FAQ)
/examens/irm/[zone]                      cérébrale · rachis-lombaire · cervicale · genou · épaule · hanche · cheville-pied · poignet-main · prostatique · pelvienne · mammaire · abdominale-hépatique · arthro-irm · angio-irm
/examens/scanner                         Pilier scanner (irradiation, iode, créatinine, jeûne, métformine, allergie)
/examens/scanner/[zone]                  thoracique · abdomino-pelvien · cérébral · rachis · sinus · uroscanner · arthro-scanner · [[coroscanner / coloscanner si réalisés]]
/examens/echographie
/examens/echographie/[type]              abdominale · pelvienne · thyroïde · doppler-veineux-arteriel · mammaire · musculo-squelettique · [[obstétricale si réalisée]]
/examens/mammographie                    + dépistage organisé (programme national 50–74 ans, tomosynthèse si équipée)
/examens/radiographie
/examens/osteodensitometrie
/examens/radiologie-interventionnelle    infiltrations (rachis, articulaires), biopsies, cytoponctions
/preparer-mon-examen                     Hub préparation (que apporter, jeûne, injection, grossesse, implants, enfants, PMR)
/preparer-mon-examen/[slug]              fiches courtes imprimables par examen
/resultats                               Comment récupérer CR et images (portail Xplore, délais, envoi au prescripteur)
/equipe                                  Radiologues + équipe MERM/accueil
/equipe/[dr-slug]                        Fiche médecin (schema Physician, spécialités, parcours, sites d'exercice)
/professionnels-de-sante                 Prescripteurs : portail médecins, demandes urgentes, protocoles, délais, fiches de prescription PDF
/recrutement                             Radiologue associé/remplaçant, MERM, secrétaire — schema JobPosting
/actualites, /actualites/[slug]          Optionnel (nouvel équipement, horaires exceptionnels)
/faq                                     FAQ globale (schema FAQPage)
/contact                                 Formulaire §3.2 + coordonnées des 2 sites
/mentions-legales · /politique-de-confidentialite · /cookies · /accessibilite · /plan-du-site
```

Règles : profondeur ≤ 3 clics ; fil d'Ariane partout (BreadcrumbList) ; sélecteur de site persistant (cookie fonctionnel) qui contextualise les CTA Doctolib et les coordonnées ; maillage interne systématique pilier ↔ zone ↔ modalité×ville ↔ préparation.

---

## 6. SEO technique — checklist exigée

- SSG intégral, HTML sémantique, 1 H1/page, hiérarchie Hn stricte, title ≤ 60 car. et meta description ≤ 155 car. uniques et générés depuis le frontmatter avec pattern par type de page (ex. `IRM à Cergy (95) 7j/7 – Alpha Imagerie`).
- Canonical explicite sur toutes les pages ; pas de paramètres indexables ; `noindex` sur pages utilitaires (merci, 404, prévisualisation).
- Sitemap XML segmenté (pages, examens, centres, équipe) avec `lastmod` réel ; robots.txt propre ; 404/410 corrects.
- JSON-LD typé et validé (Rich Results Test) : `MedicalOrganization` (org) ; `MedicalClinic` par site avec `address`, `geo`, `telephone`, `openingHoursSpecification`, `hasMap`, `sameAs`, `availableService` ; `ImagingTest` avec `imagingTechnique` (MRI, CT, Ultrasound, Radiography, XRay) sur les pages examens ; `Physician` sur fiches médecins ; `FAQPage` ; `BreadcrumbList` ; `MedicalWebPage` ; `JobPosting`.
- Open Graph / Twitter Card avec image OG générée par page (`next/og`), 1200×630.
- Images : formats modernes, `alt` descriptifs, lazy hors viewport, LCP en `priority`, dimensions explicites (CLS = 0).
- Aucun script tiers bloquant ; polices self-host ; CSS critique inline ; budget JS < 100 kB gz sur les pages de contenu.
- Redirections 301 exhaustives depuis les URLs Wix (§12), y compris variantes avec accents et trailing slash.
- hreflang non requis (FR uniquement) mais structure `[locale]` prête pour EN.
- Contenu : chaque page examen ≥ 900 mots réellement utiles ; pages modalité×ville ≥ 500 mots uniques ; zéro contenu dupliqué entre Cergy et Goussainville (vérifier avec un script de similarité en CI).

---

## 7. SEO local (Google Maps / pack local)

- **NAP strictement identique** (nom, adresse, téléphone, format) entre site, JSON-LD, Google Business Profile, Doctolib, Pages Jaunes, annuaires santé, réseaux sociaux. Produis `docs/nap-master.md` comme source de vérité.
- 1 fiche Google Business Profile par site ; catégorie principale « Centre d'imagerie médicale », secondaires « Radiologue », « Centre de radiologie », « Centre IRM » selon disponibilité ; services listés = modalités ; horaires exacts (le 7j/7 est un signal fort) ; lien site = page centre correspondante avec UTM (`utm_source=google&utm_medium=organic&utm_campaign=gbp-cergy`) ; lien RDV = deep link Doctolib du site ; photos réelles géolocalisées ; posts mensuels.
- Avis : ne jamais les afficher sur le site (§3.1) ; répondre aux avis GBP sans jamais confirmer qu'une personne est patiente (secret médical) — fournis `docs/gbp-playbook.md` avec modèles de réponse conformes.
- Citations locales cohérentes (Doctolib, Pages Jaunes, annuaire.sante.fr, Ameli, Apple Maps, Bing Places, Waze).
- Pages centre : bloc « Accès » ultra-détaillé (déjà rédigé pour Cergy, réutiliser et améliorer), villes desservies nommées naturellement (Cergy, Pontoise, Osny, Vauréal, Éragny, Saint-Ouen-l'Aumône, Jouy-le-Moutier, Menucourt, Courdimanche / Goussainville, Louvres, Fosses, Roissy-en-France, Gonesse, Le Thillay, Marly-la-Ville `[[valider]]`).

---

## 8. Contenu — gabarits et matrice sémantique

### 8.1 Clusters de mots-clés (produire `docs/keyword-map.csv` complet en phase 1)

| Intention | Exemples | Page cible |
|---|---|---|
| Locale transactionnelle | irm cergy · scanner cergy pontoise · radiologie cergy préfecture · irm goussainville · échographie val d'oise · mammographie 95 · irm dimanche 95 · irm sans délai | `/centres/{ville}/{modalité}`, `/centres/{ville}` |
| Modalité générique | irm genou · scanner abdominal · irm prostate pirads · échographie thyroïde | `/examens/{modalité}/{zone}` |
| Préparation / inquiétude | irm à jeun ? · irm avec injection effets · scanner produit de contraste créatinine · irm claustrophobie · irm pacemaker · scanner enceinte · combien de temps dure une irm · ordonnance obligatoire irm | `/examens/…` (FAQ) + `/preparer-mon-examen/…` |
| Résultats | résultats irm délai · récupérer compte rendu radiologie en ligne | `/resultats` |
| Prescripteurs | portail médecin imagerie cergy · irm urgente val d'oise | `/professionnels-de-sante` |
| Marque | alpha imagerie · alpha imagerie cergy doctolib | `/`, `/centres/cergy` |

### 8.2 Gabarit page examen (obligatoire)

1. H1 + chapô (2 phrases) + **fiche synthèse** en cartes : durée · injection oui/non · préparation · résultats sous X h/j · disponible à Cergy / Goussainville.
2. CTA Doctolib contextualisé (site + examen) + téléphone.
3. Indications (langage patient) · Déroulement pas à pas · Préparation · Contre-indications et précautions · Injection de produit de contraste · Enfants / grossesse / allaitement · Après l'examen · Résultats · Tarifs et prise en charge (`[[secteur, dépassements, tiers payant]]`) · FAQ 6–10 questions (schema) · Liens internes (zones, préparation, centre).
4. Encadré « Ce contenu est informatif et ne remplace pas l'avis de votre médecin ».

### 8.3 Règles rédactionnelles

Vouvoiement ; ton clair, calme, précis ; lisibilité niveau grand public sans infantiliser ; aucun jargon non expliqué ; phrases courtes ; exactitude médicale (tu es lu par des radiologues : chaque affirmation clinique doit être standard et prudente) ; **aucune promesse de délai, tarif ou équipement non confirmés** → `[[À CONFIRMER]]`. Chaque page livrée avec un bloc `<!-- À VALIDER MÉDICALEMENT -->` en tête tant que non relue.

---

## 9. Design — direction

- Positionnement visuel : **clinique premium, lumineux, apaisant** ; référence implicite aux meilleurs sites de cliniques privées et de scale-ups santé, pas aux templates « cabinet médical ».
- Palette dérivée du bleu du logo existant (`Logo principal Bleu`) + blanc cassé + 1 accent chaud ; contrastes AA.
- Typographie : paire distinctive auto-hébergée (éviter Inter/Roboto par défaut ; justifier le choix dans `docs/design-system.md`).
- Photographie : uniquement photos réelles des centres et de l'équipe (placeholders nets en attendant, jamais de stock « médecins souriants ») ; pictogrammes par modalité en SVG custom.
- Mobile-first absolu (majorité des recherches santé sur mobile) : barre CTA sticky basse **Appeler · Prendre RDV · Itinéraire** ; sélecteur de site en tête ; menus simples.
- Hero : promesse factuelle (« Imagerie médicale à Cergy et Goussainville — ouvert 7j/7, jusqu'à 22h »), 3 CTA, examens en grille, réassurance factuelle (équipement, radiologues, RDV en ligne).
- Motion sobre (`prefers-reduced-motion` respecté). Zéro dark pattern, zéro pop-up.
- Si un skill `frontend-design` est disponible dans ton environnement, applique-le.

---

## 10. Fonctionnalités

| Fonction | Spécification |
|---|---|
| RDV Doctolib | Bouton officiel Doctolib (script fourni dans Doctolib Pro) chargé en `lazyOnload`, fallback `<a>` direct ; deep link par établissement (`?pid=practice-…`) et par motif si l'URL le permet ; tous les clics tracés (`cta_doctolib_click` {site, modalité, position}) |
| Page `/prendre-rendez-vous` | Sélecteur site → examen → affiche pré-requis (ordonnance, jeûne, injection) → bouton Doctolib ou téléphone selon l'examen (les examens non ouverts en ligne renvoient vers l'appel) |
| Click-to-call | `tel:` tracé, numéro par site ; option numéros dédiés Ads via DID 3CX pour attribution (§11) |
| Itinéraire | deep links Google Maps / Apple Maps / Waze ; bloc accès détaillé ; carte statique + embed sous consentement |
| Formulaire contact | §3.2 ; accusé de réception automatique ; anti-spam ; page merci `noindex` avec événement `contact_submit` |
| Résultats | `/resultats` explicatif + lien portail Xplore (patients / médecins) ouvert dans nouvel onglet, tracé |
| Prescripteurs | accès portail, ligne dédiée `[[À COMPLÉTER]]`, fiches de prescription PDF, protocoles de préparation à imprimer |
| Recrutement | offres en MDX avec JobPosting, candidature par e-mail (pas d'upload CV sur le site) |
| Recherche | non nécessaire au lancement ; navigation + hubs suffisent |
| i18n | FR ; structure prête pour EN |

---

## 11. Analytics et préparation Google Ads

- **GTM** conteneur unique ; **GA4** ; **Google Ads** (conversion linker) ; **Consent Mode v2** défaut `denied` pour `ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`, mis à jour par la CMP ; **Matomo/Plausible exempté** pour la mesure de base sans consentement.
- `dataLayer` documenté (`docs/tracking-plan.md`) : `cta_doctolib_click`, `phone_click`, `directions_click`, `contact_submit`, `portal_click`, `site_selected`, `exam_selected`, avec paramètres `site`, `modality`, `position`.
- Conversions Ads : primaire = `cta_doctolib_click` ; secondaires = `phone_click`, `contact_submit`. Appels : numéros de suivi dédiés par campagne via DID 3CX ou extension d'appel Google avec numéro de transfert.
- Search Console (2 propriétés : domaine + préfixe www) + Bing Webmaster ; import GSC dans GA4.
- Landing pages Ads = pages `/centres/{ville}/{modalité}` (rapides, mono-intention, CTA au-dessus de la ligne de flottaison, cohérence mot-clé/H1/annonce pour le Quality Score).
- Livrable `docs/google-ads-plan.md` : structure de compte (campagnes Search par modalité × zone, groupes d'annonces par intention, mots-clés exact/expression, listes de négatifs : emploi, salaire, formation, définition, cours, avis), extensions (lieu via GBP, appel, liens annexes, accroches), budgets tests, KPI, calendrier ; rappel des interdictions §3.1 et §3.8 dans les textes d'annonces.

---

## 12. Migration Wix → Vercel (runbook `docs/migration.md`)

1. Inventaire complet des URLs Wix indexées (GSC + crawl) → table de 301 : `/centre-imagerie-medicale-val-d-oise → /centres/cergy`, `/examens-imagerie-medicale-val-d-oise → /examens`, `/radiologues-experts-val-d-oise → /equipe`, `/rdv-centre-de-radiologie-val-d-oise → /prendre-rendez-vous`, `/mentions-légales` (et variante encodée) `→ /mentions-legales`, toutes les autres → page la plus proche, jamais vers `/` en masse.
2. Récupérer les assets Wix (logo HD, photos) ; conserver la meta de vérification GSC.
3. Conserver `www` comme canonical ; configurer DNS (A/ALIAS apex + CNAME www) vers Vercel ; HSTS ; apex → www.
4. Bascule un jour de faible trafic ; garder l'abonnement Wix jusqu'à validation des 301 ; soumettre le nouveau sitemap ; demander la réindexation des pages clés ; surveiller 404 et couverture 4 semaines.
5. Mettre à jour le lien site sur GBP, Doctolib, Instagram, Facebook, LinkedIn, annuaires.

---

## 13. Definition of Done (bloquant)

| Critère | Seuil |
|---|---|
| Lighthouse mobile (Perf / A11y / BP / SEO) | ≥ 95 / 100 / 100 / 100 sur toutes les pages types |
| Core Web Vitals (lab et field) | LCP < 1,8 s · CLS < 0,05 · INP < 200 ms |
| Rich Results Test | 0 erreur sur MedicalClinic, ImagingTest, FAQPage, Physician, BreadcrumbList |
| Validation HTML / axe-core | 0 erreur bloquante |
| Scripts tiers avant consentement | 0 (vérifié par test Playwright) |
| Contenu | 0 `[[À CONFIRMER]]` en prod ; 0 page dupliquée ; 100 % des pages avec title/description/OG/canonical uniques |
| Conformité §3 | revue par checklist signée dans `docs/compliance-checklist.md` |
| Tests | Playwright : navigation, sélecteur de site, tous les CTA Doctolib, formulaire (succès/erreur/spam), redirections 301, CMP |

---

## 14. Méthode de travail

- **Phase 0 — Audit & questions (1 passe)** : crawl du site actuel, benchmark §2, audit GSC si accès, puis **toutes tes questions en une seule liste** (pas au fil de l'eau).
- **Phase 1 — Conception** : `docs/sitemap.md`, `docs/keyword-map.csv`, `docs/design-system.md`, `docs/content-plan.md`, `docs/tracking-plan.md` → validation avant code.
- **Phase 2 — Squelette + page pilote** : layout, composants, `/centres/cergy` et `/examens/irm` complets → validation design/UX.
- **Phase 3 — Contenu intégral** (toutes pages §5), marqué à valider médicalement.
- **Phase 4 — SEO / schema / analytics / CMP / conformité**.
- **Phase 5 — QA (§13), runbook migration, handover** (`README.md` : ajouter une page, un médecin, une offre ; changer horaires ; process de bascule).
- Crée `CLAUDE.md` à la racine avec les règles §3, §4, §8.3, §13 et la convention `[[À CONFIRMER]]` ; hooks pre-commit `tsc` + lint ; branche par feature ; commits conventionnels ; ne jamais commiter de `.env`.
- Ne suppose jamais un fait médical, tarifaire, d'équipement ou d'horaire : placeholder + question.

---

## 15. Inputs à fournir par le client (par priorité)

| Prio | Input |
|---|---|
| P0 | Goussainville : adresse, téléphone, horaires, accès/parking/transports, plateau technique, URL Doctolib / `pid` |
| P0 | Liste nominative des radiologues (nom, titre, surspécialités, sites d'exercice, parcours court) + photos ; équipe MERM/accueil (effectifs) |
| P0 | Détail du plateau Cergy : scanner (marque, coupes), mammographe (tomosynthèse ?), échographes, salle radio, ostéodensitomètre ; examens réellement réalisés (coroscanner, coloscanner, arthro, obstétrical…) et ceux ouverts à la prise de RDV en ligne |
| P0 | Mentions légales : raison sociale exacte, capital, RCS, SIRET, siège, directeur de publication, DPO |
| P1 | Logo vectoriel + charte existante ; photos des centres ; accès GBP, GSC, GA4/GTM/Ads, DNS/registrar, Doctolib Pro |
| P1 | Conventionnement, tarifs, tiers payant, mutuelles ; délais moyens par modalité et par site ; ligne prescripteurs / urgences |
| P2 | Postes ouverts au recrutement ; actualités à annoncer ; comptes réseaux à afficher (Facebook réel) |

---

## 16. Livrables

Repo GitHub prêt à déployer sur Vercel + preview ; `docs/` complet (benchmark, sitemap, keyword-map, design-system, content-plan, tracking-plan, google-ads-plan, gbp-playbook, nap-master, migration, rgpd/, compliance-checklist) ; `CLAUDE.md` ; `README.md` de maintenance ; suite Playwright + Lighthouse CI verts ; rapport final de conformité §13.

Commence par la Phase 0.
