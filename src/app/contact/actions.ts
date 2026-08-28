"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { deliverContactMessage } from "@/lib/mailer";
import { CIVILITES, DEMANDES, SITES, type ContactFormState } from "@/app/contact/champs";

/**
 * Server Action du formulaire de contact (§3.2 du brief) :
 * zod + honeypot + rate limiting, aucune donnée de santé, aucun stockage (q.47).
 */

const contactSchema = z.object({
  civilite: z.enum(CIVILITES, { error: "Sélectionnez une civilité." }),
  nom: z.string().trim().min(2, "Indiquez votre nom.").max(80, "Nom trop long."),
  prenom: z.string().trim().min(2, "Indiquez votre prénom.").max(80, "Prénom trop long."),
  email: z.email("Adresse e-mail invalide.").max(120, "Adresse trop longue."),
  telephone: z
    .string()
    .trim()
    .max(20, "Numéro trop long.")
    .regex(/^$|^[+0-9 ().-]{6,20}$/, "Numéro de téléphone invalide.")
    .optional()
    .or(z.literal("")),
  site: z.enum(SITES, { error: "Sélectionnez un centre." }),
  demande: z.enum(DEMANDES, { error: "Sélectionnez un type de demande." }),
  message: z
    .string()
    .trim()
    .min(10, "Votre message est trop court.")
    .max(2000, "Votre message dépasse 2000 caractères."),
});

/* Rate limiting en mémoire : 3 envois / 10 min / IP.
 * Portée limitée à l'instance serverless — assumé et documenté (docs/formulaire-contact.md) :
 * couplé au honeypot, suffisant au lancement sans stocker quoi que ce soit. */
const FENETRE_MS = 10 * 60_000;
const MAX_ENVOIS = 3;
const envois = new Map<string, number[]>();

function depasseLaLimite(ip: string): boolean {
  const maintenant = Date.now();
  const recents = (envois.get(ip) ?? []).filter((t) => maintenant - t < FENETRE_MS);
  if (recents.length >= MAX_ENVOIS) {
    envois.set(ip, recents);
    return true;
  }
  recents.push(maintenant);
  envois.set(ip, recents);
  if (envois.size > 5000) envois.clear(); // borne mémoire
  return false;
}

export async function envoyerContact(
  _etat: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const valeurs: Record<string, string> = {};
  for (const champ of ["civilite", "nom", "prenom", "email", "telephone", "site", "demande", "message"]) {
    valeurs[champ] = String(formData.get(champ) ?? "");
  }

  // Honeypot : champ invisible pour les humains — toute valeur = robot. Réponse « succès » muette.
  if (String(formData.get("site_web") ?? "") !== "") {
    redirect("/contact/merci");
  }

  const entetes = await headers();
  const ip = (entetes.get("x-forwarded-for") ?? "inconnue").split(",")[0].trim();
  if (depasseLaLimite(ip)) {
    return {
      ok: false,
      erreurs: { _: "Trop de messages envoyés en peu de temps. Réessayez dans quelques minutes ou appelez le secrétariat." },
      valeurs,
    };
  }

  const resultat = contactSchema.safeParse(valeurs);
  if (!resultat.success) {
    const erreurs: Record<string, string> = {};
    for (const pb of resultat.error.issues) {
      const champ = String(pb.path[0] ?? "_");
      if (!erreurs[champ]) erreurs[champ] = pb.message;
    }
    return { ok: false, erreurs, valeurs };
  }

  try {
    await deliverContactMessage({
      ...resultat.data,
      telephone: resultat.data.telephone || undefined,
    });
  } catch (e) {
    console.error("[contact] échec d'envoi :", e);
    return {
      ok: false,
      erreurs: { _: "L'envoi a échoué. Réessayez dans quelques instants, ou contactez-nous par téléphone ou e-mail." },
      valeurs,
    };
  }

  redirect("/contact/merci");
}
