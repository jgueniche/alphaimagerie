# Plan Google Ads — Alpha Imagerie

Cadre de la publicité payante pour un centre d'imagerie médicale. Document de cadrage :
rien n'est activé à ce jour (aucun accès Ads fourni — q.38), et **rien ne doit l'être avant
que la CMP et le Consent Mode v2 ne soient en place** (q.44).

> Le contexte est particulier : un centre d'imagerie ne « vend » pas un examen. Les patients
> arrivent avec une prescription et cherchent un créneau proche et rapide. La publicité sert
> donc à **capter une intention déjà formée**, pas à en créer une — c'est ce qui la rend
> compatible avec l'article R.4127-19-1, et c'est aussi ce qui rend inutile l'essentiel de
> l'arsenal habituel (remarketing, audiences d'affinité, display de notoriété).

---

## 1. Contraintes — à lire avant toute création de campagne

### 1.1 Déontologie médicale (R.4127-19-1 CSP)

La publicité d'un médecin est autorisée depuis 2020, mais reste encadrée. Concrètement,
dans les annonces comme sur les pages d'atterrissage :

- **Interdit** : superlatifs et comparatifs (« le meilleur », « n° 1 du Val-d'Oise »,
  « plus rapide que »), témoignages et notes de patients, incitation à réaliser un examen
  non prescrit, promesse de résultat, mention d'un délai ou d'un tarif non confirmé.
- **Autorisé** : décrire l'offre (examens pratiqués, plateau technique), les modalités
  pratiques (horaires, accès, prise de rendez-vous), le conventionnement et les tarifs.
- Chaque annonce doit pouvoir être justifiée par une page du site qui dit la même chose.
  Si l'annonce affirme quelque chose que la page ne dit pas, l'annonce est à corriger.

### 1.2 Règles Google pour la santé

- **Aucun remarketing, aucune audience personnalisée fondée sur les pages d'examens**
  (§3.8 du brief). Google interdit par ailleurs le ciblage sur des catégories sensibles :
  une liste « visiteurs de /examens/irm/prostate » est à la fois interdite et inacceptable.
- Le compte doit rester en ciblage **contextuel** : mots-clés + zone géographique.
- Prévoir une vérification d'annonceur Google (identité du responsable du compte).

### 1.3 Consentement

Le suivi des conversions Ads suppose la CMP et le Consent Mode v2 en `denied` par défaut
(q.44, `docs/tracking-plan.md`). **Tant qu'ils ne sont pas installés, ne pas lancer de
campagne** : on paierait des clics sans pouvoir mesurer quoi que ce soit, et on déposerait
des traceurs publicitaires sans base légale.

## 2. Objectif et mesure

L'objectif est la **prise de rendez-vous**, qui se produit à 100 % hors du site (Doctolib
ou téléphone). Les conversions sont donc des proxys, à assumer comme tels — d'autant que
le site ne comporte plus aucun formulaire depuis le 30/08/2026 : il ne reste que deux
signaux, tous deux des intentions de départ vers un canal externe.

| Conversion | Source | Valeur | Rôle |
|---|---|---|---|
| `cta_doctolib_click` | dataLayer, clic vers Doctolib | primaire | La plus proche du rendez-vous réel |
| `phone_click` | dataLayer, clic sur un `tel:` | secondaire | Sous-estimée sur ordinateur ; fiable sur mobile |

Deux angles morts à garder en tête pour ne pas se tromper dans les arbitrages :

1. **Le clic Doctolib n'est pas un rendez-vous.** Le taux de transformation entre les deux
   n'est connu que du back-office Doctolib. À rapprocher manuellement chaque mois avant de
   conclure quoi que ce soit sur la rentabilité.
2. **Les appels depuis un ordinateur ne sont pas mesurés** (le numéro est lu, pas cliqué).
   Le remède propre est un numéro dédié par campagne, si le 3CX du centre expose des SDA
   (q.48) ; à défaut, l'extension d'appel Google mesure au moins les appels initiés depuis
   l'annonce.

## 3. Structure de compte proposée

Une campagne par intention, pour que les enchères suivent la valeur réelle et non le volume.
Zone : Cergy et la vallée de l'Oise, rayon ~15 km, **ciblage « présence » et non
« intérêt »** — quelqu'un qui s'intéresse à Cergy depuis Marseille n'a pas de prescription
à honorer ici.

| Campagne | Intention | Exemples de mots-clés | Page d'atterrissage |
|---|---|---|---|
| `AI – Marque` | On cherche le centre | `alpha imagerie`, `alpha imagerie cergy` | `/` |
| `AI – IRM Cergy` | Examen + ville | `irm cergy`, `centre irm val d'oise`, `irm 95` | `/centres/cergy/irm` |
| `AI – Scanner Cergy` | idem | `scanner cergy`, `scanner médical 95` | `/centres/cergy/scanner` |
| `AI – Échographie Cergy` | idem | `échographie cergy`, `doppler cergy` | `/centres/cergy/echographie` |
| `AI – Mammographie` | Dépistage | `mammographie cergy`, `dépistage sein 95` | `/centres/cergy/mammographie` |
| `AI – Radio & ostéo` | Volume, faible marge | `radiographie cergy`, `ostéodensitométrie 95` | landing correspondante |
| `AI – Urgence / délai` | Créneau rapide | `irm rapide 95`, `rdv imagerie rapidement` | `/prendre-rendez-vous` |

**La campagne Marque en premier, et à petit budget.** Elle protège le nom du centre à un
coût par clic très bas ; c'est le seul poste à activer même si le reste attend.

**Mots-clés à exclure d'emblée** : `gratuit`, `emploi`, `salaire`, `formation`, `def`,
`définition`, `c'est quoi`, `wikipedia`, `résultats`, `mutuelle`, ainsi que les noms des
centres concurrents — enchérir dessus serait un comparatif implicite (§1.1).

## 4. Annonces

Trois angles, tous factuels et tous adossés à une page existante :

1. **Disponibilité** — « Ouvert 7j/7, jours fériés inclus ». C'est l'argument différenciant
   confirmé par le client, et aucun concurrent du benchmark ne l'affiche.
2. **Délai** — « Rendez-vous le plus souvent sous 48 h ». Jamais « sous 48 h » sec : la
   promesse absolue est à la fois fausse et interdite.
3. **Plateau** — « 2 IRM 1,5 T, scanner, mammographie 3D ». Factuel, vérifiable, confirmé.

Extensions à configurer : liens annexes (`/prendre-rendez-vous`, `/preparer-mon-examen`,
`/centres/cergy`, `/resultats`), accroches (7j/7 · Secteur 2 · Tiers payant · RER A), extrait
de site (examens pratiqués), lieu (via GBP), appel (horaires du secrétariat : lun–ven
8 h–18 h 30, sam 8 h–12 h 30 — **et non les horaires du centre**, sinon les appels tombent
dans le vide).

## 5. Budget et pilotage

Ordre de démarrage recommandé, chaque étape conditionnant la suivante :

1. **Marque seule**, budget minimal, 2 semaines — permet de valider que les conversions
   remontent correctement avant de dépenser sur des mots-clés chers.
2. **IRM + Scanner Cergy**, en *Maximiser les clics* avec un CPC plafonné, 3 à 4 semaines —
   le temps d'accumuler des conversions.
3. Bascule en **CPA cible** une fois 30 conversions/mois atteintes, jamais avant : sans ce
   volume, l'algorithme optimise sur du bruit.
4. Les autres campagnes ensuite, selon ce que montre la recherche naturelle.

Revue mensuelle : rapport de termes de recherche (et enrichissement de la liste
d'exclusions), coût par clic Doctolib par campagne, rapprochement avec les rendez-vous
réels du back-office Doctolib, et vérification qu'aucune annonce générée automatiquement
n'a introduit de superlatif.

## 6. Articulation avec le référencement naturel

Les 24 pages de zone et les 6 landings modalité×ville visent la longue traîne
(« IRM du genou Cergy »). C'est du trafic gratuit, sur des requêtes que la publicité paierait
cher. Ads doit donc se concentrer sur les têtes de requêtes concurrentielles (`irm cergy`,
`scanner cergy`) et sur la marque, et **se retirer progressivement** des expressions où le
site atteint les premières positions naturelles — sauf sur la marque, à conserver en défense.

## 7. Avant d'activer

- [ ] Accès Google Ads fourni ou compte créé (q.38)
- [ ] CMP + Consent Mode v2 en place (q.44) — **bloquant**
- [ ] GA4 et GTM configurés, conversions importées (`docs/tracking-plan.md`)
- [ ] Vérification d'annonceur Google effectuée
- [ ] Remarketing et audiences personnalisées désactivés, et vérifié comme tel
- [ ] Numéros de suivi d'appel arbitrés (q.48)
- [ ] Annonces relues par le directeur de la publication au regard du §1.1
