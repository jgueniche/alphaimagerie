import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Politique de confidentialité – Alpha Imagerie" },
  description:
    "Comment alphaimagerie.fr traite vos données personnelles : aucune collecte sur le site, aucune donnée de santé, vos droits RGPD et leur exercice.",
  alternates: { canonical: "/politique-de-confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Politique de confidentialité", href: "/politique-de-confidentialite" }]} />
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Politique de confidentialité</h1>
        <div className="prose prose-slate mt-6 prose-headings:font-display prose-headings:text-brand-900 prose-a:text-action">
          <p>
            Cette page décrit la manière dont le site <strong>www.alphaimagerie.fr</strong>{" "}
            traite vos données personnelles, conformément au règlement général sur la protection
            des données (RGPD) et à la loi Informatique et Libertés. Version du 30 août 2026.
          </p>

          <h2>Responsable de traitement</h2>
          <p>
            SELAS ALPHA IMAGERIE, 2 Mail des Cerclades, 95000 Cergy — RCS Pontoise 928 012 830.
            Pour toute question relative à vos données personnelles :{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>

          <h2>Un principe : aucune donnée de santé sur ce site</h2>
          <p>
            Ce site est un site d&rsquo;information. Il <strong>ne collecte, ne traite ni
            n&rsquo;héberge aucune donnée de santé</strong> : pas de dépôt d&rsquo;ordonnance, de
            compte rendu ou d&rsquo;image, pas de compte patient. Vos comptes rendus et images
            sont diffusés exclusivement par le portail sécurisé de diffusion des résultats
            (Xplore), service distinct de ce site ; la prise de rendez-vous en ligne est assurée
            par Doctolib, qui applique sa propre politique de confidentialité.
          </p>

          <h2>Aucune collecte de données sur ce site</h2>
          <p>
            Ce site <strong>ne comporte aucun formulaire</strong> et ne vous demande de saisir
            aucune information : ni nom, ni e-mail, ni téléphone, ni message. Il n&rsquo;y a donc
            aucune donnée personnelle collectée par le site lui-même, et rien à stocker.
          </p>
          <p>
            Pour nous joindre, vous utilisez les moyens habituels indiqués sur la{" "}
            <Link href="/contact">page contact</Link> — téléphone, e-mail — ou la prise de
            rendez-vous en ligne. Un e-mail que vous nous adressez de votre propre initiative
            est reçu et traité par notre secrétariat comme tout courrier : il est conservé le
            temps de traiter votre demande, puis supprimé au plus tard 12 mois après le dernier
            échange. <strong>N&rsquo;y faites figurer aucune information médicale</strong> : la
            messagerie n&rsquo;est pas un canal sécurisé pour les données de santé.
          </p>

          <h2>Autres traitements</h2>
          <ul>
            <li>
              <strong>Candidatures</strong> : adressées par e-mail à {SITE.email}, elles sont
              consultées par les associés uniquement et supprimées au plus tard 2 ans après
              réception, conformément aux recommandations de la CNIL.
            </li>
            <li>
              <strong>Journaux techniques</strong> : l&rsquo;hébergeur (Vercel) génère des
              journaux de connexion de courte durée à des fins de sécurité et de bon
              fonctionnement.
            </li>
            <li>
              <strong>Mesure d&rsquo;audience</strong> : ce site n&rsquo;utilise actuellement{" "}
              <strong>aucun outil de mesure d&rsquo;audience ni aucun traceur</strong> — voir la{" "}
              <Link href="/cookies">page cookies</Link>. Si un outil exempté de consentement
              (configuré selon les recommandations de la CNIL) était déployé, cette page serait
              mise à jour au préalable.
            </li>
          </ul>

          <h2>Vos droits</h2>
          <p>
            Vous disposez des droits d&rsquo;accès, de rectification, d&rsquo;effacement,
            d&rsquo;opposition, de limitation du traitement et de portabilité de vos données.
            Pour les exercer, écrivez à <a href={`mailto:${SITE.email}`}>{SITE.email}</a> ou par
            courrier au siège (SELAS Alpha Imagerie, 2 Mail des Cerclades, 95000 Cergy), en
            joignant tout élément permettant de vous identifier. Réponse dans un délai
            d&rsquo;un mois. Vous pouvez également saisir la CNIL (
            <a href="https://www.cnil.fr" target="_blank" rel="noopener">
              cnil.fr
            </a>
            , 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07).
          </p>
          <p>
            Les données médicales détenues par le centre dans le cadre de vos examens (dossier
            d&rsquo;imagerie) relèvent d&rsquo;un traitement distinct de ce site : pour y accéder,
            adressez-vous au secrétariat du centre.
          </p>

          <h2>Hébergement et transferts</h2>
          <p>
            Le site est hébergé par Vercel Inc. (États-Unis) et déployé dans la région Paris
            (cdg1) : les pages et les traitements serveur s&rsquo;exécutent dans l&rsquo;Union
            européenne. Le site n&rsquo;ayant aucun stockage applicatif, les seules données
            traitées à ce titre sont les journaux de connexion mentionnés ci-dessus ; les
            éventuels transferts hors Union européenne liés à l&rsquo;hébergement sont encadrés
            par les clauses contractuelles types de la Commission européenne.
          </p>
        </div>
      </div>
    </>
  );
}
