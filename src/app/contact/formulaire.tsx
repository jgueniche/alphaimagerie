"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useId } from "react";
import { envoyerContact } from "@/app/contact/actions";
import { track } from "@/components/analytics";
import { CIVILITES, DEMANDES, ETAT_INITIAL, SITES } from "@/app/contact/champs";

const CHAMP =
  "mt-1 w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-[0.95rem] shadow-card focus:border-action";
const LIBELLE = "block text-sm font-bold text-brand-900";
const ERREUR = "mt-1 text-sm font-semibold text-error";

function MessageErreur({ id, texte }: { id: string; texte?: string }) {
  if (!texte) return null;
  return (
    <p id={id} role="alert" className={ERREUR}>
      {texte}
    </p>
  );
}

/** Formulaire §3.2 : liste fermée, honeypot, aucune donnée de santé, erreurs accessibles. */
export function FormulaireContact() {
  const [etat, action, enCours] = useActionState(envoyerContact, ETAT_INITIAL);
  const router = useRouter();
  const uid = useId();

  useEffect(() => {
    if (etat.envoye) {
      track("contact_submit", etat.meta ?? {});
      router.replace("/contact/merci");
    }
  }, [etat.envoye, etat.meta, router]);

  // Repli sans JavaScript : la page se re-rend avec l'état de succès, sans navigation.
  if (etat.envoye) {
    return (
      <p role="status" className="mt-6 max-w-2xl rounded-lg border border-line bg-brand-50 px-5 py-4 font-semibold text-brand-900">
        Merci, votre message a bien été envoyé. Notre secrétariat vous répondra dans les
        meilleurs délais.
      </p>
    );
  }
  const idErreur = (champ: string) => `${uid}-erreur-${champ}`;
  const propsChamp = (champ: string) =>
    etat.erreurs[champ]
      ? { "aria-invalid": true as const, "aria-describedby": idErreur(champ) }
      : {};

  return (
    <form action={action} noValidate className="mt-6 max-w-2xl">
      {etat.erreurs._ ? (
        <p role="alert" className="mb-4 rounded-lg border border-error/30 bg-error/5 px-4 py-3 text-sm font-semibold text-error">
          {etat.erreurs._}
        </p>
      ) : null}

      {/* Honeypot — invisible pour les humains, ignoré par les lecteurs d'écran. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-site-web`}>Ne pas remplir ce champ</label>
        <input id={`${uid}-site-web`} type="text" name="site_web" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-civilite`} className={LIBELLE}>Civilité</label>
          <select
            id={`${uid}-civilite`}
            name="civilite"
            required
            defaultValue={etat.valeurs.civilite ?? ""}
            className={CHAMP}
            {...propsChamp("civilite")}
          >
            <option value="" disabled>Sélectionnez…</option>
            {CIVILITES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <MessageErreur id={idErreur("civilite")} texte={etat.erreurs.civilite} />
        </div>
        <div className="hidden sm:block" />
        <div>
          <label htmlFor={`${uid}-nom`} className={LIBELLE}>Nom</label>
          <input
            id={`${uid}-nom`}
            type="text"
            name="nom"
            required
            autoComplete="family-name"
            defaultValue={etat.valeurs.nom}
            className={CHAMP}
            {...propsChamp("nom")}
          />
          <MessageErreur id={idErreur("nom")} texte={etat.erreurs.nom} />
        </div>
        <div>
          <label htmlFor={`${uid}-prenom`} className={LIBELLE}>Prénom</label>
          <input
            id={`${uid}-prenom`}
            type="text"
            name="prenom"
            required
            autoComplete="given-name"
            defaultValue={etat.valeurs.prenom}
            className={CHAMP}
            {...propsChamp("prenom")}
          />
          <MessageErreur id={idErreur("prenom")} texte={etat.erreurs.prenom} />
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className={LIBELLE}>E-mail</label>
          <input
            id={`${uid}-email`}
            type="email"
            name="email"
            required
            autoComplete="email"
            defaultValue={etat.valeurs.email}
            className={CHAMP}
            {...propsChamp("email")}
          />
          <MessageErreur id={idErreur("email")} texte={etat.erreurs.email} />
        </div>
        <div>
          <label htmlFor={`${uid}-telephone`} className={LIBELLE}>
            Téléphone <span className="font-normal text-ink-400">(facultatif)</span>
          </label>
          <input
            id={`${uid}-telephone`}
            type="tel"
            name="telephone"
            autoComplete="tel"
            defaultValue={etat.valeurs.telephone}
            className={CHAMP}
            {...propsChamp("telephone")}
          />
          <MessageErreur id={idErreur("telephone")} texte={etat.erreurs.telephone} />
        </div>
        <div>
          <label htmlFor={`${uid}-site`} className={LIBELLE}>Centre concerné</label>
          <select
            id={`${uid}-site`}
            name="site"
            required
            defaultValue={etat.valeurs.site ?? "Cergy Préfecture"}
            className={CHAMP}
            {...propsChamp("site")}
          >
            {SITES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <MessageErreur id={idErreur("site")} texte={etat.erreurs.site} />
        </div>
        <div>
          <label htmlFor={`${uid}-demande`} className={LIBELLE}>Type de demande</label>
          <select
            id={`${uid}-demande`}
            name="demande"
            required
            defaultValue={etat.valeurs.demande ?? ""}
            className={CHAMP}
            {...propsChamp("demande")}
          >
            <option value="" disabled>Sélectionnez…</option>
            {DEMANDES.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <MessageErreur id={idErreur("demande")} texte={etat.erreurs.demande} />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={`${uid}-message`} className={LIBELLE}>Votre message</label>
        <p className="mt-0.5 text-sm font-semibold text-warn">
          N&rsquo;indiquez aucune information médicale dans ce formulaire.
        </p>
        <textarea
          id={`${uid}-message`}
          name="message"
          required
          rows={6}
          maxLength={2000}
          defaultValue={etat.valeurs.message}
          className={CHAMP}
          {...propsChamp("message")}
        />
        <MessageErreur id={idErreur("message")} texte={etat.erreurs.message} />
      </div>

      <p className="mt-4 max-w-prose text-xs leading-relaxed text-ink-400">
        Les informations saisies sont transmises par e-mail sécurisé (TLS) à notre secrétariat,
        uniquement pour répondre à votre demande ; elles ne sont pas conservées dans une base de
        données. Pour en savoir plus et exercer vos droits :{" "}
        <Link href="/politique-de-confidentialite" className="underline underline-offset-2 hover:text-action">
          politique de confidentialité
        </Link>
        .
      </p>

      <button
        type="submit"
        disabled={enCours}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-action px-6 py-3 font-bold text-white shadow-card transition-colors hover:bg-action-hover disabled:opacity-60"
      >
        {enCours ? "Envoi en cours…" : "Envoyer le message"}
      </button>
    </form>
  );
}
