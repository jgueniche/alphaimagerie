import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Accessibilité – Alpha Imagerie" },
  description:
    "Déclaration d'accessibilité du site alphaimagerie.fr : objectif RGAA 4.1 / WCAG 2.1 AA, état de conformité, signalement des difficultés et voies de recours.",
  alternates: { canonical: "/accessibilite" },
};

export default function AccessibilitePage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accessibilité", href: "/accessibilite" }]} />
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Déclaration d&rsquo;accessibilité</h1>
        <div className="prose prose-slate mt-6 prose-headings:font-display prose-headings:text-brand-900 prose-a:text-action">
          <p>
            La SELAS ALPHA IMAGERIE s&rsquo;engage à rendre son site internet accessible à tous,
            y compris aux personnes en situation de handicap, en visant la conformité au{" "}
            <strong>RGAA 4.1</strong> (référentiel général d&rsquo;amélioration de
            l&rsquo;accessibilité) et aux <strong>WCAG 2.1 niveau AA</strong>.
          </p>

          <h2>État de conformité</h2>
          <p>
            Le site <strong>www.alphaimagerie.fr</strong> est{" "}
            <strong>non conforme au RGAA 4.1</strong> à ce jour : l&rsquo;audit de conformité
            n&rsquo;a pas encore été réalisé. En l&rsquo;absence d&rsquo;audit permettant de
            mesurer le taux de conformité, la réglementation impose de déclarer le site non
            conforme. Cette déclaration sera mise à jour dès la réalisation de l&rsquo;audit,
            prévu avant la mise en service du site sur son domaine définitif.
          </p>

          <h2>Mesures déjà mises en œuvre</h2>
          <ul>
            <li>structure sémantique (un seul titre principal par page, hiérarchie de titres) ;</li>
            <li>navigation au clavier, focus visible, fil d&rsquo;Ariane sur toutes les pages ;</li>
            <li>contrastes de couleurs conformes au niveau AA ;</li>
            <li>textes alternatifs des images, liens explicites ;</li>
            <li>
              FAQ consultables sans JavaScript, respect de la préférence « réduire les
              animations » ;
            </li>
            <li>tests automatisés d&rsquo;accessibilité (axe-core) intégrés au développement.</li>
          </ul>

          <h2>Signaler une difficulté</h2>
          <p>
            Si vous rencontrez un obstacle d&rsquo;accessibilité sur ce site, écrivez-nous à{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> ou utilisez le{" "}
            <Link href="/contact">formulaire de contact</Link> en décrivant la page et la
            difficulté rencontrée : nous nous efforcerons de vous apporter une alternative
            accessible et de corriger le défaut.
          </p>

          <h2>Voies de recours</h2>
          <p>
            Si vous avez signalé un défaut d&rsquo;accessibilité et que vous n&rsquo;avez pas
            obtenu de réponse satisfaisante, vous pouvez saisir le{" "}
            <a href="https://www.defenseurdesdroits.fr" target="_blank" rel="noopener">
              Défenseur des droits
            </a>{" "}
            (formulaire en ligne, délégué territorial, ou par courrier : Défenseur des droits,
            Libre réponse 71120, 75342 Paris Cedex 07).
          </p>
          <p>Déclaration établie le 28 août 2026.</p>
        </div>
      </div>
    </>
  );
}
