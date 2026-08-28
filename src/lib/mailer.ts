/**
 * Envoi des messages du formulaire de contact (§3.2 du brief).
 *
 * Transport piloté par la variable d'environnement CONTACT_TRANSPORT :
 *  - "log" (défaut) : transport factice — le message est journalisé côté serveur,
 *    aucune donnée n'est stockée ni transmise. Utilisé tant que les identifiants
 *    Brevo (q.46, docs/questions.md) n'ont pas été fournis par le client.
 *  - "brevo" : envoi réel via l'API transactionnelle Brevo (UE), TLS.
 *    Requiert BREVO_API_KEY. Expéditeur : CONTACT_FROM (défaut contact@alphaimagerie.fr).
 *
 * Aucune donnée de santé ne transite ici (liste fermée + consigne explicite côté
 * formulaire) et rien n'est persisté (pas de base au lancement, q.47).
 */

export type ContactMessage = {
  civilite: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  site: string;
  demande: string;
  message: string;
};

const DESTINATAIRE = "contact@alphaimagerie.fr";

function texteMessage(msg: ContactMessage): string {
  return [
    `Civilité : ${msg.civilite}`,
    `Nom : ${msg.nom}`,
    `Prénom : ${msg.prenom}`,
    `E-mail : ${msg.email}`,
    `Téléphone : ${msg.telephone || "non renseigné"}`,
    `Site souhaité : ${msg.site}`,
    `Type de demande : ${msg.demande}`,
    "",
    "Message :",
    msg.message,
  ].join("\n");
}

async function envoyerViaBrevo(msg: ContactMessage): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("BREVO_API_KEY manquante alors que CONTACT_TRANSPORT=brevo");
  const from = process.env.CONTACT_FROM ?? DESTINATAIRE;

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json" },
    body: JSON.stringify({
      sender: { name: "Site alphaimagerie.fr", email: from },
      to: [{ email: DESTINATAIRE }],
      replyTo: { email: msg.email },
      subject: `[Site] ${msg.demande} — ${msg.site} — ${msg.nom} ${msg.prenom}`,
      textContent: texteMessage(msg),
    }),
  });
  if (!res.ok) {
    throw new Error(`Brevo a répondu ${res.status}`);
  }

  // Accusé de réception automatique (§10 du brief) — sans reprise du message.
  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json" },
    body: JSON.stringify({
      sender: { name: "Alpha Imagerie", email: from },
      to: [{ email: msg.email }],
      subject: "Nous avons bien reçu votre message — Alpha Imagerie",
      textContent:
        "Bonjour,\n\nNous avons bien reçu votre message envoyé depuis le site alphaimagerie.fr. " +
        "Notre secrétariat vous répondra dans les meilleurs délais.\n\n" +
        "Pour toute demande urgente, appelez le 01 86 30 30 00.\n" +
        "Rappel : ce formulaire ne doit contenir aucune information médicale ; " +
        "les demandes médicales se font par téléphone ou en consultation.\n\n" +
        "Alpha Imagerie — 2 Mail des Cerclades, 95000 Cergy",
    }),
  });
}

export async function deliverContactMessage(msg: ContactMessage): Promise<void> {
  const transport = process.env.CONTACT_TRANSPORT ?? "log";
  if (transport === "brevo") {
    await envoyerViaBrevo(msg);
    return;
  }
  // Transport factice : trace serveur uniquement (pas de données en clair au-delà du nécessaire).
  console.info(
    `[contact] transport=log (factice) — message de ${msg.email} (${msg.demande}, ${msg.site}) non envoyé : identifiants SMTP en attente (docs/questions.md q.46)`,
  );
}
