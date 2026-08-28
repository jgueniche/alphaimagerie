# Formulaire de contact — fonctionnement et mise en service

> Implémentation du §3.2 du brief : Server Action + zod + honeypot + rate limiting,
> aucune donnée de santé, aucun stockage (q.47 : pas de base au lancement).

## Champs (liste fermée, minimisation RGPD)

Civilité · nom · prénom · e-mail · téléphone (facultatif) · centre concerné
(Cergy Préfecture / Goussainville fin 2027) · type de demande (renseignement général /
prise de rendez-vous / résultats d'examen / professionnel de santé / autre) · message,
avec la mention « **N'indiquez aucune information médicale dans ce formulaire.** ».

## Anti-abus

- **Honeypot** : champ `site_web` invisible (hors écran, `tabindex=-1`, `aria-hidden`).
  Toute valeur ⇒ redirection muette vers `/contact/merci`, rien n'est envoyé.
- **Rate limiting** : 3 envois / 10 minutes / IP (`x-forwarded-for`), en mémoire.
  Portée limitée à l'instance serverless Vercel — assumé au lancement ; passer à un
  compteur partagé (Upstash/KV) uniquement si le spam l'exige. Turnstile non activé
  (§4 du brief : « uniquement si le spam l'exige »).

## Transport d'envoi (`src/lib/mailer.ts`)

Piloté par des variables d'environnement (jamais commitées — `.env` interdit) :

| Variable | Valeurs | Rôle |
|---|---|---|
| `CONTACT_TRANSPORT` | `log` (défaut) · `brevo` | `log` = transport **factice** : le message est simplement journalisé côté serveur (aucun envoi, aucun stockage). `brevo` = envoi réel. |
| `BREVO_API_KEY` | clé API Brevo | Requise si `CONTACT_TRANSPORT=brevo`. |
| `CONTACT_FROM` | e-mail expéditeur | Défaut `contact@alphaimagerie.fr` — doit être un expéditeur validé dans Brevo. |

En mode `brevo` : envoi TLS via l'API transactionnelle Brevo (UE) vers
`contact@alphaimagerie.fr` avec `replyTo` = e-mail du patient, **plus un accusé de
réception automatique** au patient (§10 du brief), sans reprise de son message.

### Mise en service (à faire dès réception des identifiants — q.46)

1. Créer la clé API dans Brevo et valider l'expéditeur `contact@alphaimagerie.fr`
   (SPF/DKIM sur le domaine).
2. Sur Vercel (projet → Settings → Environment Variables, environnement Production) :
   `CONTACT_TRANSPORT=brevo`, `BREVO_API_KEY=…`.
3. Redéployer, puis tester : envoi réel + accusé de réception + réponse via `replyTo`.
4. Si le client préfère du SMTP pur plutôt que l'API : ajouter `nodemailer` et brancher
   `deliverContactMessage` sur `SMTP_URL` — l'abstraction est prête.

## Pages

- `/contact` : formulaire + coordonnées (SSG ; la soumission passe par la Server Action).
- `/contact/merci` : confirmation, `noindex` ; support de l'événement `contact_submit`
  (plan de marquage Phase 4, `docs/tracking-plan.md`).
