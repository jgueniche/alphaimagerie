# Registre des activités de traitement — site alphaimagerie.fr

> Document de travail (art. 30 RGPD) pour les traitements liés **au site internet**
> uniquement. Les traitements « métier » du centre (dossier d'imagerie, RIS/PACS,
> facturation) relèvent du registre principal de la SELAS, hors périmètre du site.
> Responsable de traitement : SELAS ALPHA IMAGERIE, 2 Mail des Cerclades, 95000 Cergy —
> RCS Pontoise 928 012 830. Contact données personnelles : contact@alphaimagerie.fr
> (pas de DPO désigné à ce jour — q.25 de docs/questions.md).

## Traitement n° 1 — Formulaire de contact

| Rubrique | Contenu |
|---|---|
| Finalité | Répondre aux demandes adressées via le site (renseignement, rendez-vous, résultats, professionnel de santé, autre). |
| Base légale | Mesures précontractuelles / intérêt légitime (réponse à une démarche volontaire). |
| Personnes concernées | Visiteurs du site remplissant le formulaire. |
| Données | Civilité, nom, prénom, e-mail, téléphone (facultatif), centre concerné, type de demande (liste fermée), message libre. **Aucune donnée de santé** (consigne explicite affichée ; liste fermée ; aucun upload). |
| Destinataires | Secrétariat Alpha Imagerie (boîte contact@alphaimagerie.fr). |
| Sous-traitants | Vercel (hébergement du site, transit de la requête, UE/USA sous CCT) ; Brevo (envoi d'e-mail transactionnel, UE) dès activation — transport factice « log » sans envoi tant que les identifiants ne sont pas configurés. |
| Durées | Aucun stockage applicatif (pas de base de données). E-mail conservé le temps du traitement de la demande, supprimé au plus tard 12 mois après le dernier échange. **[durée à faire valider par le directeur de la publication]** |
| Sécurité | TLS de bout en bout, honeypot + rate limiting, minimisation des champs, pas de journalisation applicative du contenu. |

## Traitement n° 2 — Candidatures (recrutement)

| Rubrique | Contenu |
|---|---|
| Finalité | Examen des candidatures reçues par e-mail (aucun dépôt sur le site). |
| Base légale | Mesures précontractuelles. |
| Données | CV et informations transmises par le candidat. |
| Destinataires | Associés de la SELAS. |
| Durées | Suppression au plus tard 2 ans après réception (recommandation CNIL), sauf accord du candidat pour une conservation plus longue. |

## Traitement n° 3 — Journaux techniques de l'hébergeur

| Rubrique | Contenu |
|---|---|
| Finalité | Sécurité et bon fonctionnement du site. |
| Base légale | Intérêt légitime. |
| Données | Journaux de connexion (IP, horodatage, ressource demandée) générés par Vercel. |
| Durées | Durées courtes fixées par l'hébergeur ; aucune exploitation par la SELAS. |

## Mesure d'audience et cookies

Néant à ce jour : **aucun cookie, aucun traceur, aucun script tiers** (voir /cookies).
Tout déploiement futur (mesure exemptée CNIL, GA4/Ads via CMP + Consent Mode v2 —
arbitrages q.44–47) devra être ajouté ici **avant** sa mise en production.
