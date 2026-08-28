import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Politique de confidentialité – Alpha Imagerie" },
  description:
    "Comment alphaimagerie.fr traite vos données personnelles : formulaire de contact sans donnée de santé, aucun stockage, vos droits RGPD et leur exercice.",
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
            des données (RGPD) et à la loi Informatique et Libertés. Version du 28 août 2026.
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

          <h2>Formulaire de contact</h2>
          <ul>
            <li>
              <strong>Données collectées</strong> : civilité, nom, prénom, e-mail, téléphone
              (facultatif), centre concerné, type de demande (liste fermée), message libre — avec
              la consigne explicite de n&rsquo;y indiquer{" "}
              <strong>aucune information médicale</strong>.
            </li>
            <li>
              <strong>Finalité</strong> : répondre à votre demande. <strong>Base légale</strong> :
              votre démarche volontaire (mesures précontractuelles et intérêt légitime à vous
              répondre).
            </li>
            <li>
              <strong>Destinataire</strong> : le secrétariat d&rsquo;Alpha Imagerie, par e-mail
              chiffré en transit (TLS) vers {SITE.email}.
            </li>
            <li>
              <strong>Conservation</strong> : votre message n&rsquo;est{" "}
              <strong>enregistré dans aucune base de données</strong> du site. L&rsquo;e-mail reçu
              est conservé le temps du traitement de votre demande, puis supprimé au plus tard
              12 mois après le dernier échange.
            </li>
          </ul>

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
            Le site est hébergé par Vercel Inc. (États-Unis), avec diffusion depuis des serveurs
            situés en Europe. Les données du formulaire transitent de manière chiffrée et ne
            font l&rsquo;objet d&rsquo;aucun stockage applicatif ; les éventuels transferts hors
            Union européenne liés à l&rsquo;hébergement sont encadrés par les clauses
            contractuelles types de la Commission européenne.
          </p>
        </div>
      </div>
    </>
  );
}
