# Sitemap cible — Phase 1 (v1, 28/08/2026)

> Décliné du §5 du brief, ajusté par les réponses client du 28/08 : Goussainville = teaser (ouverture fin 2027), hystérosalpingographie ajoutée, PRP/viscosupplémentation intégrés à l'interventionnel, promesse « 7j/7, jours fériés inclus ». Chaque page = 1 intention de recherche, profondeur ≤ 3 clics, BreadcrumbList partout.
>
> Patterns de titles (≤ 60 car.) : centre → `Centre d'imagerie médicale à {Ville} (95) 7j/7 – Alpha Imagerie` (variante courte si besoin) ; modalité×ville → `{Modalité} à Cergy (95) 7j/7 – Alpha Imagerie` ; examen → `{Examen} : déroulement, préparation, résultats – Alpha Imagerie`.

## Lancement (toutes pages SSG)

| URL | Intention / rôle | Notes |
|---|---|---|
| `/` | marque + orientation (choix du site, 3 CTA, 7j/7 fériés inclus, grille examens, accès) | H1 factuel ; JSON-LD MedicalOrganization + WebSite |
| `/prendre-rendez-vous` | transactionnelle | sélecteur site → examen → pré-requis → Doctolib (pid) ou téléphone ; liste des examens non réservables en ligne (q.19) |
| `/centres/cergy` | pilier local « radiologie cergy » | NAP, horaires détaillés (nocturne), plateau nommé, accès ultra-détaillé (base site actuel), équipe, FAQ locale ; MedicalClinic complet |
| `/centres/goussainville` | teaser « radiologie goussainville » | « Nouveau centre Goussainville Gare, au sein d'une maison de santé — ouverture prévue fin 2027 » ; renvoi Cergy ; MedicalClinic minimal sans NAP publié |
| `/centres/cergy/irm` | landing « irm cergy » (+ Ads) | ≥ 500 mots uniques : 2× MR5300 1,5 T, horaires modalité, délais (q.21), préparation courte, accès |
| `/centres/cergy/scanner` | « scanner cergy » | CT 3500 ; idem |
| `/centres/cergy/echographie` | « échographie cergy » | 4 échographes Canon ; protocole de coopération |
| `/centres/cergy/mammographie` | « mammographie cergy » | Hologic tomosynthèse 3D + IA ; dépistage organisé (q.16) |
| `/centres/cergy/radiographie` | « radiographie cergy » | table D2RS |
| `/centres/cergy/osteodensitometrie` | « ostéodensitométrie cergy » | conditions de remboursement |
| `/examens` | hub examens | grille + maillage piliers |
| `/examens/irm` | pilier IRM (≥ 900 mots) | gabarit §8.2 ; FAQPage ; ImagingTest (MRI) |
| `/examens/irm/[zone]` | longue traîne | cerebrale · rachis-lombaire · cervicale · genou · epaule · hanche · cheville-pied · poignet-main · prostatique · pelvienne · mammaire · abdominale-hepatique — arthro-irm & angio-irm `[[À CONFIRMER : pratiqués ? (q.18)]]` |
| `/examens/scanner` | pilier scanner | irradiation, iode, créatinine, jeûne, metformine |
| `/examens/scanner/[zone]` | longue traîne | thoracique · abdomino-pelvien · cerebral · rachis · sinus · **score-calcique (confirmé 28/08)** — uroscanner · arthro-scanner · coroscanner · coloscanner `[[À CONFIRMER : q.18 — non cités dans la liste client]]` |
| `/examens/echographie` (+ `[type]`) | pilier + types | abdominale · pelvienne · thyroide · doppler-veineux-arteriel · mammaire · musculo-squelettique — obstetricale `[[À CONFIRMER : q.18]]` |
| `/examens/mammographie` | pilier + dépistage organisé | programme 50–74 ans, tomosynthèse |
| `/examens/radiographie` | pilier | + section **radiographie pédiatrique** (confirmée 28/08) |
| `/examens/osteodensitometrie` | pilier | — |
| `/examens/hysterosalpingographie` | examen spécifique (pratiqué, quasi aucune concurrence locale) | J6–J12, β-HCG ; imagerie de la femme |
| `/examens/radiologie-interventionnelle` | pilier interventionnel | hub — liste client 28/08 |
| `/examens/radiologie-interventionnelle/infiltrations` | « infiltration sous scanner/écho » | guidages **échographie, radiographie et scanner** (confirmés 28/08) |
| `/examens/radiologie-interventionnelle/biopsie-mammaire` | imagerie de la femme | confirmée 28/08 |
| `/examens/radiologie-interventionnelle/cytoponctions` | « cytoponction thyroïde » | **thyroïde, ganglions, glandes salivaires/parotides** (confirmées 28/08) |
| `/examens/radiologie-interventionnelle/ponctions-evacuations` | longue traîne | **collections, hématomes, kystes** (confirmées 28/08) — PRP/viscosupplémentation `[[À CONFIRMER : présents dans la description Doctolib mais absents de la liste client]]` |
| `/preparer-mon-examen` (+ `[slug]`) | préparation / inquiétude | fiches courtes imprimables ; checklist documents (modèle SIMAGO réécrit) |
| `/resultats` | « résultats irm délai » | portail Xplore, DMP, MS-Santé, délais (q.21) |
| `/equipe` | E-E-A-T | **2 fiches seulement** : Dr Jérémy Gueniche, Dr Yoram Gueniche (photos à refaire) |
| `/equipe/jeremy-gueniche` · `/equipe/yoram-gueniche` | fiches Physician | parcours validés Phase 0 ; RPPS après confirmation (q.26) |
| `/professionnels-de-sante` | prescripteurs | portail médecins, MS-Santé/DMP, reconstructions 3D, CPTS Axe Majeur, EndoIDF, ligne dédiée (q.41) |
| `/recrutement` | marque employeur | JobPosting dès offres fournies (q.50) ; candidature par e-mail |
| `/faq` | FAQPage globale | questions transverses (RDV, documents, résultats, tiers payant) |
| `/contact` | coordonnées du centre | téléphone, e-mail, adresse, itinéraires, Doctolib ; **aucun formulaire** (décision client 30/08) |
| `/mentions-legales` · `/politique-de-confidentialite` · `/cookies` · `/accessibilite` · `/plan-du-site` | conformité | LCEN complet (capital : q.23) |

## Post-ouverture Goussainville (fin 2027 — préparé, non publié)

`/centres/goussainville` passe en page pilier complète + `/centres/goussainville/[modalité]` selon plateau réel (q.7), fiche Doctolib + GBP dédiées. L'architecture MDX prévoit ces slugs dès maintenant (frontmatter `status: draft`).

## Différé / exclu au lancement

- `/actualites` : optionnel — décision q.51.
- IRM cardiaque, EOS, cone beam, TOGD : hors sitemap sauf confirmation q.18.
- Aucune page « avis », aucun superlatif (R.4127-19-1).

## Redirections 301 (rappel — table complète dans `docs/audit-site-actuel.md`)

`/centre-imagerie-medicale-val-d-oise → /centres/cergy` · `/examens-imagerie-medicale-val-d-oise → /examens` · `/radiologues-experts-val-d-oise → /equipe` · `/rdv-centre-de-radiologie-val-d-oise → /prendre-rendez-vous` · `/mentions-légales` (2 encodages) `→ /mentions-legales` · apex → www.
