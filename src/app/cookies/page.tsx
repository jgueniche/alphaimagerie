import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: { absolute: "Cookies – Alpha Imagerie" },
  description:
    "Le site alphaimagerie.fr ne dépose actuellement aucun cookie ni traceur : ni publicité, ni mesure d'audience, ni contenu tiers avant action de votre part.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Cookies", href: "/cookies" }]} />
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Cookies et traceurs</h1>
        <div className="prose prose-slate mt-6 prose-headings:font-display prose-headings:text-brand-900 prose-a:text-action">
          <p>
            À ce jour, le site <strong>www.alphaimagerie.fr</strong> ne dépose{" "}
            <strong>aucun cookie ni aucun traceur</strong> sur votre appareil :
          </p>
          <ul>
            <li>aucun cookie publicitaire, aucun profilage ;</li>
            <li>aucun outil de mesure d&rsquo;audience ;</li>
            <li>
              aucune ressource tierce chargée à votre insu : les polices sont hébergées avec le
              site, il n&rsquo;y a ni carte interactive tierce, ni vidéo intégrée, ni bouton de
              réseau social ;
            </li>
            <li>
              les liens vers Doctolib (prise de rendez-vous), le portail de résultats Xplore ou
              nos réseaux sociaux ouvrent des sites tiers, qui appliquent leurs propres
              politiques — aucun de leurs scripts n&rsquo;est chargé sur nos pages.
            </li>
          </ul>
          <p>
            C&rsquo;est pourquoi aucune bannière de consentement n&rsquo;est affichée : il
            n&rsquo;y a, pour l&rsquo;instant, rien à consentir.
          </p>

          <h2>Et demain ?</h2>
          <p>
            Si des outils de mesure d&rsquo;audience ou de suivi publicitaire (par exemple GA4 ou
            Google Ads en Consent Mode v2) venaient à être déployés, ils ne seraient activés
            qu&rsquo;<strong>après votre consentement</strong>, recueilli par un module conforme
            aux recommandations de la CNIL, avec un refus aussi simple que l&rsquo;acceptation.
            Cette page et la{" "}
            <Link href="/politique-de-confidentialite">politique de confidentialité</Link>{" "}
            seraient mises à jour au préalable.
          </p>
          <p>Version du 28 août 2026.</p>
        </div>
      </div>
    </>
  );
}
