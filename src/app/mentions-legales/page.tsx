import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { CERGY, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Mentions légales – Alpha Imagerie" },
  description:
    "Mentions légales du site alphaimagerie.fr : éditeur SELAS Alpha Imagerie (RCS Pontoise), directeur de la publication, hébergeur, profession réglementée.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Mentions légales", href: "/mentions-legales" }]} />
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Mentions légales</h1>
        <div className="prose prose-slate mt-6 prose-headings:font-display prose-headings:text-brand-900 prose-a:text-action">
          <h2>Éditeur du site</h2>
          <p>
            Le site <strong>www.alphaimagerie.fr</strong> est édité par la{" "}
            <strong>SELAS ALPHA IMAGERIE</strong>, société d’exercice libéral par actions
            simplifiée au capital de <strong>10 000 €</strong>, immatriculée au registre du
            commerce et des sociétés de <strong>Pontoise</strong> sous le numéro{" "}
            <strong>928 012 830</strong> (SIRET du siège : 928 012 830 00016), dont le siège
            social est situé <strong>2 Mail des Cerclades, 95000 Cergy</strong>.
          </p>
          <p>
            Téléphone : <a href={`tel:${CERGY.phoneE164}`}>{CERGY.phoneDisplay}</a> — E-mail :{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <br />
            Activité de soins exonérée de TVA (article 261, 4, 1° du code général des impôts).
          </p>

          <h2>Directeur de la publication</h2>
          <p>
            Dr Jérémy Gueniche, président de la SELAS ALPHA IMAGERIE. Contact :{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>

          <h2>Profession réglementée</h2>
          <p>
            Les médecins radiologues exerçant au sein d’Alpha Imagerie sont titulaires du diplôme
            d’État de docteur en médecine, spécialistes en radiodiagnostic et imagerie médicale,
            et inscrits au tableau du conseil départemental de l’Ordre des médecins du
            Val-d’Oise (95).
          </p>
          <p>
            Autorité de rattachement : Conseil national de l’Ordre des médecins —{" "}
            <a href="https://www.conseil-national.medecin.fr" target="_blank" rel="noopener">
              conseil-national.medecin.fr
            </a>
            . La profession est régie par le code de déontologie médicale (articles R.4127-1 à
            R.4127-112 du code de la santé publique).
          </p>

          <h2>Hébergeur</h2>
          <p>
            Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis —{" "}
            <a href="https://vercel.com" target="_blank" rel="noopener">
              vercel.com
            </a>
            . Le site est déployé dans la région <em>Paris (cdg1)</em> du réseau Vercel : les
            pages et les traitements serveur s’exécutent dans l’Union européenne. Ce site est un
            site d’information statique : il n’héberge ni ne traite aucune donnée de santé.
          </p>

          <h2>Données personnelles</h2>
          <p>
            Les modalités de traitement des données personnelles sont détaillées dans la{" "}
            <a href="/politique-de-confidentialite">politique de confidentialité</a> ; la
            gestion des traceurs est décrite sur la page <a href="/cookies">cookies</a>. Pour
            toute question relative à vos données personnelles :{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>

          <h2>Prise de rendez-vous et résultats</h2>
          <p>
            La prise de rendez-vous en ligne est assurée par Doctolib (Doctolib GmbH / Doctolib
            SAS), service tiers accessible par lien depuis ce site. La consultation des comptes
            rendus et images est assurée par le portail sécurisé Xplore, service tiers exploité
            indépendamment de ce site.
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L’ensemble des contenus de ce site (textes, illustrations, logo, pictogrammes) est la
            propriété de la SELAS ALPHA IMAGERIE, sauf mention contraire. Toute reproduction ou
            représentation, totale ou partielle, sans autorisation écrite préalable est interdite.
          </p>
        </div>
      </div>
    </>
  );
}
