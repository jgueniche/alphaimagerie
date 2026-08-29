import type { Metadata } from "next";
import Link from "next/link";

/**
 * Page 404 — remplace le gabarit par défaut de Next (anglais, hors charte, sans navigation).
 * Elle compte particulièrement à la bascule depuis Wix : toute ancienne URL qui aurait échappé
 * à la table de redirections (`next.config.ts`, `docs/migration.md` §5) atterrit ici.
 * D'où les raccourcis vers les parcours réels plutôt qu'un simple lien vers l'accueil.
 */
export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

const RACCOURCIS = [
  { href: "/examens", label: "Nos examens", detail: "IRM, scanner, échographie, mammographie, radiographie" },
  { href: "/prendre-rendez-vous", label: "Prendre rendez-vous", detail: "En ligne sur Doctolib ou par téléphone" },
  { href: "/preparer-mon-examen", label: "Préparer mon examen", detail: "Documents à apporter et consignes" },
  { href: "/resultats", label: "Mes résultats", detail: "Accès au portail patients sécurisé" },
  { href: "/centres/cergy", label: "Le centre de Cergy", detail: "Horaires, accès, plateau technique" },
  { href: "/contact", label: "Nous contacter", detail: "Formulaire, téléphone, adresse" },
];

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 sm:px-6">
      <p className="text-sm font-bold tracking-wider text-action uppercase">Erreur 404</p>
      <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Cette page n&rsquo;existe pas</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-600">
        Le lien que vous avez suivi est peut-être ancien, ou l&rsquo;adresse comporte une erreur.
        Voici les pages les plus consultées ; le{" "}
        <Link href="/plan-du-site" className="font-bold text-action underline underline-offset-4">
          plan du site
        </Link>{" "}
        les répertorie toutes.
      </p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {RACCOURCIS.map((r) => (
          <li key={r.href}>
            <Link
              href={r.href}
              className="flex h-full flex-col rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-action"
            >
              <span className="font-display font-bold text-brand-900">{r.label}</span>
              <span className="mt-1 text-sm text-ink-600">{r.detail}</span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-ink-600">
        Une question urgente ? Appelez le secrétariat au{" "}
        <a href="tel:+33186303000" className="font-bold text-action">
          01 86 30 30 00
        </a>{" "}
        (du lundi au vendredi de 8 h à 18 h 30, le samedi de 8 h à 12 h 30).
      </p>
    </div>
  );
}
