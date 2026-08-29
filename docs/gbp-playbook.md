# Playbook Google Business Profile — Alpha Imagerie

Mode d'emploi de la fiche d'établissement Google pour le centre de Cergy Préfecture.

La fiche Google pèse souvent plus lourd que le site lui-même sur les requêtes locales :
c'est elle qui remplit le *pack local* (les trois résultats avec la carte) et elle qui
déclenche les appels. Elle mérite donc le même soin que le site — et la même rigueur
déontologique, ce qui n'a rien d'évident sur une plateforme conçue pour les commerces.

> **Statut** : fiche existante (revendiquée par le client), accès non encore partagé (q.38).
> Rien de ce qui suit n'a été appliqué. La fiche Goussainville n'est pas à créer avant
> l'ouverture (fin 2027).

---

## 1. Le point déontologique, d'abord

L'article R.4127-19-1 CSP interdit les témoignages et les notes de patients. Google, lui,
affiche des avis publics et ne permet pas de les désactiver. La ligne à tenir :

- **Ne jamais solliciter d'avis** — ni affiche en salle d'attente, ni QR code, ni SMS, ni
  demande orale. C'est le point le plus important de ce document.
- **Ne jamais afficher ces avis sur le site**, ni widget, ni copie, ni note moyenne, ni
  balisage `aggregateRating` (le garde-fou `scripts/check-jsonld.mjs` refuse ce dernier).
- Les avis spontanés existent et resteront : c'est le fait de Google, pas une communication
  du praticien. Y **répondre est possible**, à condition de ne jamais confirmer ni infirmer
  qu'une personne est patiente du centre — ce serait une violation du secret médical.

### Réponses aux avis — trois modèles

Réponse à un avis positif, sans confirmer la qualité de patient :

> Merci pour votre message. Toute l'équipe vous remercie de votre confiance.

Réponse à un avis négatif portant sur l'organisation (attente, accueil, stationnement) :

> Nous sommes désolés que votre passage ne se soit pas déroulé comme vous l'espériez.
> Nous vous invitons à nous écrire à contact@alphaimagerie.fr afin que nous puissions
> examiner la situation.

Réponse à un avis contenant des éléments médicaux — **jamais de discussion publique** :

> Nous ne pouvons pas échanger sur une situation individuelle dans cet espace public.
> Notre secrétariat est à votre disposition au 01 86 30 30 00.

Un avis qui contient des données de santé identifiantes, des propos diffamatoires ou une
mise en cause nominative d'un praticien peut être **signalé à Google pour suppression** :
le faire systématiquement, et documenter la demande.

## 2. Informations de la fiche

Toutes les valeurs viennent de `docs/nap-master.md`, qui est la source de vérité. **Toute
divergence entre la fiche et ce fichier est un bug**, y compris une abréviation ou une
majuscule : la cohérence NAP entre le site, Google, Doctolib et les annuaires est un facteur
de classement local direct.

| Champ | Valeur |
|---|---|
| Nom | Alpha Imagerie Cergy Préfecture *(à confirmer — q.54)* |
| Catégorie principale | Centre d'imagerie médicale |
| Catégories secondaires | Radiologue · Centre de radiographie · Centre de dépistage |
| Adresse | 2 Mail des Cerclades, 95000 Cergy |
| Téléphone | 01 86 30 30 00 |
| Site web | `https://www.alphaimagerie.fr/centres/cergy?utm_source=google&utm_medium=organic&utm_campaign=gbp-cergy` |
| Lien de rendez-vous | la fiche Doctolib du centre |
| Horaires | Lun–Ven 8 h–19 h · **lundi jusqu'à 22 h** · Sam–Dim 8 h–18 h |
| Jours fériés | **Ouvert** — à saisir explicitement, voir §3 |
| Attributs | Rendez-vous obligatoire · Entrée accessible PMR · Parking accessible PMR · Toilettes accessibles PMR |
| Description | voir §4 |

Le paramètre `utm_campaign=gbp-cergy` sur le lien du site permet de distinguer, dans
l'analytique, le trafic venu de la fiche Google de la recherche naturelle classique. Sans
lui, les deux sont confondus et l'apport réel de la fiche reste invisible.

## 3. Les jours fériés, point à ne pas rater

Le centre est ouvert 7 j/7 **jours fériés inclus**. Or Google applique par défaut des
horaires fériés « fermé » ou affiche « Les horaires peuvent varier », ce qui fait perdre
exactement les recherches où le centre a le plus d'avance sur ses concurrents.

À faire : saisir les **horaires spéciaux** pour chaque jour férié de l'année, en une fois,
et renouveler l'opération chaque mois de décembre pour l'année suivante. C'est fastidieux et
c'est le geste au meilleur rapport effort/résultat de tout ce document.

## 4. Description de la fiche

750 caractères maximum, sans superlatif ni comparaison. Proposition, à valider par le
directeur de la publication :

> Alpha Imagerie est un centre d'imagerie médicale situé à Cergy Préfecture (95), ouvert
> 7 jours sur 7, jours fériés inclus. L'équipe réalise IRM, scanner, échographie et Doppler,
> mammographie avec tomosynthèse, radiographie, ostéodensitométrie, ainsi que des actes de
> radiologie interventionnelle : infiltrations, biopsies mammaires, cytoponctions et
> ponctions-évacuations.
>
> Le plateau technique comprend deux IRM 1,5 T, un scanner, un mammographe avec
> tomosynthèse 3D, quatre échographes et un ostéodensitomètre.
>
> Les médecins sont conventionnés en secteur 2 et pratiquent le tiers payant. La prise de
> rendez-vous se fait en ligne ou par téléphone au 01 86 30 30 00. Les comptes rendus et les
> images sont remis sur place et accessibles en ligne.

## 5. Photos

Aucune photo réelle n'est disponible à ce jour (q.37). **Ne pas publier de photo de banque
d'images** : Google pénalise les visuels génériques et l'écart avec la réalité se paie en
déception à l'arrivée.

À produire lors de la séance photo, dans cet ordre d'utilité :

1. **La façade et l'entrée depuis le mail piéton** — c'est la photo qui aide réellement les
   patients à trouver le centre, et le mail des Cerclades n'est pas évident d'accès.
2. L'accueil et la salle d'attente.
3. Une salle par modalité (IRM, scanner, mammographe, échographie).
4. L'équipe, si les intéressés y consentent par écrit.

Contraintes : jamais de patient reconnaissable, jamais d'écran affichant un examen
identifiable, jamais de document nominatif visible à l'arrière-plan. Format paysage,
2048 px de large minimum. Renouveler quelques photos chaque trimestre : Google valorise les
fiches vivantes.

## 6. Publications

Une publication toutes les deux à trois semaines suffit. Sujets légitimes, tous factuels :

- horaires exceptionnels (fériés, ponts) — c'est le format le plus consulté ;
- mise en service d'un équipement ;
- rappel du dépistage organisé du cancer du sein (Octobre rose), sans incitation
  individuelle : informer de l'existence du programme, pas inciter à prendre rendez-vous ;
- ouverture du centre de Goussainville, le moment venu.

À proscrire : offres, promotions, comptes à rebours, tout ce qui relève du commerce.

## 7. Questions/réponses

La rubrique Q/R est ouverte à tous, et une réponse fausse d'un internaute y reste
indéfiniment. Publier soi-même les questions utiles et y répondre, ce qui fixe la bonne
réponse en tête de liste :

- Faut-il une ordonnance ? — Oui, une prescription médicale est nécessaire.
- Le centre est-il ouvert le dimanche et les jours fériés ? — Oui, de 8 h à 18 h.
- Comment obtenir mes résultats ? — Remis sur place, et accessibles en ligne.
- Y a-t-il un parking ? — *(à compléter après vérification sur place)*
- Le centre est-il accessible aux personnes à mobilité réduite ? — Oui, ainsi qu'aux
  brancards.

Surveiller mensuellement les questions posées par des tiers et corriger toute réponse
erronée.

## 8. Suivi

Relever chaque mois, dans les statistiques de la fiche : recherches (marque / découverte),
appels, demandes d'itinéraire, clics vers le site, clics vers la prise de rendez-vous. La
saisonnalité compte (creux d'août, pic de janvier) : comparer d'une année sur l'autre plutôt
que d'un mois sur l'autre.

À rapprocher des événements `phone_click` et `cta_doctolib_click` du site
(`docs/tracking-plan.md`) : un écart important entre les appels comptés par Google et ceux
comptés par le site signale simplement que beaucoup de patients appellent depuis la fiche
sans jamais visiter le site — information utile pour arbitrer les investissements.

## 9. Cohérence externe

Le classement local dépend de la cohérence du NAP sur l'ensemble du web. Après la bascule du
domaine, harmoniser dans cet ordre :

1. **Doctolib** — horaires et nom de fiche (aujourd'hui divergents du site) ;
2. **Google Business Profile** — le présent document ;
3. **Annuaires santé** : annuaire.sante.fr, ameli.fr, sante.fr ;
4. **Annuaires généralistes** : Pages Jaunes, Apple Plans, Bing Places, Waze ;
5. **Réseaux sociaux** : Instagram, LinkedIn, Facebook (page officielle à trancher — q.52).

## 10. À obtenir du client

- [ ] Accès administrateur à la fiche GBP Cergy (q.38)
- [ ] Validation du nom public de la fiche (q.54)
- [ ] Validation de la description du §4 par le directeur de la publication
- [ ] Photos réelles (q.37)
- [ ] Précisions stationnement et accessibilité pour la rubrique Q/R (q.56)
- [ ] Langues parlées à l'accueil (q.55)
