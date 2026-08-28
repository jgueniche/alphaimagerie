import type { Metadata } from "next";
import Link from "next/link";

/** Page de confirmation du formulaire — noindex (§6 du brief), support de l'événement contact_submit. */
export const metadata: Metadata = {
  title: "Message envoyé",
  robots: { index: false, follow: false },
};

export default function MerciPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 text-center sm:px-6">
      <p className="text-sm font-bold tracking-wider text-action uppercase">Formulaire de contact</p>
      <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Merci, votre message est envoyé</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-ink-600">
        Notre secrétariat vous répondra dans les meilleurs délais. Pour toute demande urgente,
        appelez le 01 86 30 30 00.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-action px-5 py-2.5 font-bold text-white shadow-card transition-colors hover:bg-action-hover"
        >
          Retour à l&rsquo;accueil
        </Link>
        <Link
          href="/prendre-rendez-vous"
          className="rounded-full border border-line bg-surface px-5 py-2.5 font-bold text-brand-900 transition-colors hover:border-action hover:text-action"
        >
          Prendre rendez-vous
        </Link>
      </div>
    </div>
  );
}
