# Content plan — Phase 1 (v1, 28/08/2026)

> Règles rédactionnelles : §8.3 du brief (vouvoiement, phrases courtes, exactitude clinique prudente, aucun superlatif, aucune promesse non confirmée). Toute page part avec `<!-- À VALIDER MÉDICALEMENT -->` en tête tant qu'un des deux radiologues ne l'a pas relue. Les `[[À CONFIRMER]]` bloquent le build de production.

## 1. Gabarits

| Gabarit | Pages | Cible mots | Structure |
|---|---|---|---|
| **Pilier examen** | /examens/{modalité} | ≥ 900 utiles | §8.2 : H1 + chapô + fiche synthèse (durée · injection · préparation · résultats · disponible à Cergy) → CTA Doctolib contextualisé + tél → Indications · Déroulement · Préparation · Contre-indications · Injection · Enfants/grossesse/allaitement · Après l'examen · Résultats · Tarifs et prise en charge (secteur 2 + tiers payant validés ; dépassements q.40) · FAQ 6–10 q. (schema) · maillage (zones, préparation, centre) · encadré informatif |
| **Zone d'examen** | /examens/{modalité}/{zone} | 450–700 | même squelette resserré : indications propres à la zone, déroulement spécifique, préparation, FAQ 4–6 q. |
| **Modalité×ville** (landing Ads) | /centres/cergy/{modalité} | ≥ 500 uniques | H1 « {Modalité} à Cergy… » ; équipement nommé (MR5300 ×2 / CT 3500 / Hologic 3D / D2RS / Canon) ; horaires de la modalité + 7j/7 fériés ; délais indicatifs (q.21) ; accès résumé ; CTA au-dessus de la ligne de flottaison ; ≥ 40 % de contenu propre vs pilier |
| **Page centre** | /centres/cergy | ≥ 700 uniques | NAP + horaires (dont nocturne + fériés) ; plateau complet ; accès ultra-détaillé (base actuelle réécrite) ; équipe (2 associés) ; villes desservies (q.53) ; FAQ locale ; MedicalClinic |
| **Teaser centre** | /centres/goussainville | 250–350 | annonce « Goussainville Gare, maison de santé, fin 2027 » ; inscription à l'actualité ? non (pas de collecte) ; renvoi Cergy |
| **Préparation** | /preparer-mon-examen/{slug} | 300–450 | fiche imprimable : à apporter, jeûne, injection, grossesse, implants, enfants, PMR ; version print CSS |
| **Fiche médecin** | /equipe/{dr} | 250–400 | Physician ; titres Ordre uniquement ; parcours validé Phase 0 ; sites d'exercice |
| **Transverses** | résultats, professionnels-de-santé, prendre-rendez-vous, faq, contact, recrutement | 300–700 | spécifications §10 du brief |

## 2. Sources par page (validées client 28/08 sauf mention)

- **Accès Cergy** : bloc actuel (A15 5/9, P1 porte F→B, P2 District, RER A, piéton) — réécrire, structurer, ajouter PMR (q.56) ; point brancards à arbitrer sur maquette (q.35).
- **Équipe** : bios existantes des 2 associés (validées) ; photos NOUVELLES à prévoir (les actuelles seront remplacées — placeholders neutres en attendant, jamais de stock).
- **Examens** : textes actuels (1 183 mots) comme matière première, entièrement réécrits au gabarit ; hystérosalpingographie (J6–J12, β-HCG) validée ; échographie par manipulateur en protocole de coopération : validé, à mentionner sobrement.
- **Plateau** : 2 IRM Philips MR5300 1,5 T · scanner CT 3500 `[[constructeur]]` · mammographe Hologic tomosynthèse 3D + IA · table Stephanix D2RS · 4 échographes Canon · ostéodensitomètre `[[marque]]`.
- **Prise en charge** : secteur 2, dépassements possibles, tiers payant (validé) ; détail par examen : q.40.
- **Résultats/pro** : portail Xplore, MS-Santé, DMP, reconstructions 3D (validé) ; CPTS Axe Majeur, EndoIDF, hôpital de Pontoise citables.

## 3. « Charte examens sensibles » (inspirée du benchmark, réécrite)

Page ou encarts sur : mammographie, échographies pelviennes/endovaginales, hystérosalpingographie, examens de mineurs — droits du patient, pudeur, possibilité d'accompagnant, information avant geste, consentement écrit pour l'interventionnel. Ton : sobre, factuel, sans pathos. À faire valider médicalement ET déontologiquement.

## 4. Ordre de production (Phase 3)

1. `/centres/cergy` + `/examens/irm` (pilotes Phase 2 — servent d'étalon de validation).
2. Modalité×ville Cergy (6) — landings Ads prioritaires.
3. Piliers scanner, mammographie, échographie, radiographie, ostéodensitométrie, interventionnel, hystérosalpingographie.
4. Zones IRM (12) puis scanner (5–8 selon q.18) puis échographie (6).
5. Préparation (hub + fiches), résultats, prendre-rendez-vous, FAQ, équipe, professionnels, contact.
6. Teaser Goussainville, recrutement, pages légales (mentions : bloqué par q.23–26).

## 5. Interdits permanents (rappel bloquant)

Aucun témoignage/avis/note ; aucune comparaison ; aucun superlatif (« centre de référence » → « pôle dédié à l'imagerie de la femme », q.57) ; aucune promesse de délai/tarif non confirmée ; aucun contenu dupliqué entre pages (script de similarité en CI, Phase 4) ; « Ce contenu est informatif… » sur toutes les pages examens.
