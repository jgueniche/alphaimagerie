import type { Metadata } from "next";
import Link from "next/link";
import type { ContactPage as ContactPageSchema, WithContext } from "schema-dts";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/jsonld";
import { PictoAgenda, PictoHoraires, PictoPhone, PictoPin } from "@/components/pictos";
import { CERGY, SITE, XPLORE } from "@/lib/site";

/**
 * Page de contact — coordonnées uniquement, sans formulaire (décision client du 30/08/2026).
 * Le site ne collecte donc aucune donnée personnelle : pas de Server Action, pas de transport
 * e-mail, pas de traitement à déclarer. Les demandes passent par Doctolib, le téléphone ou
 * l'adresse e-mail du secrétariat.
 */
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contacter Alpha Imagerie à Cergy Préfecture : téléphone 01 86 30 30 00, e-mail, adresse, accès et prise de rendez-vous en ligne.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const jsonLd: WithContext<ContactPageSchema> = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact — Alpha Imagerie",
    url: `${SITE.url}/contact`,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumb items={[{ label: "Contact", href: "/contact" }]} />
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-4 sm:px-6">
        <h1 className="max-w-3xl text-3xl font-extrabold sm:text-4xl">Nous contacter</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-600">
          Pour un rendez-vous, la réservation en ligne est le plus rapide. Pour toute autre
          demande, le secrétariat vous répond par téléphone ou par e-mail.
        </p>

        {/* Les deux actions principales, dans l'ordre d'utilité pour un patient. */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <a
            href={CERGY.doctolibUrl}
            target="_blank"
            rel="noopener"
            data-track="cta_doctolib_click"
            data-track-site="cergy"
            data-track-position="contact"
            className="rounded-lg bg-action p-6 text-white shadow-card transition-colors hover:bg-action-hover"
          >
            <PictoAgenda className="h-7 w-7" />
            <p className="mt-3 font-display text-xl font-bold">Prendre rendez-vous en ligne</p>
            <p className="mt-1 text-white/85">
              Sur Doctolib : créneaux en temps réel pour tous nos examens, rappels automatiques.
            </p>
          </a>

          <div className="rounded-lg border border-line bg-surface p-6 shadow-card">
            <PictoPhone className="h-7 w-7 text-action" />
            <p className="mt-3 font-display text-xl font-bold text-brand-900">
              Par téléphone :{" "}
              <a
                href={`tel:${CERGY.phoneE164}`}
                data-track="phone_click"
                data-track-site="cergy"
                data-track-position="contact"
                data-track-line="patients"
                className="text-action underline underline-offset-4"
              >
                {CERGY.phoneDisplay}
              </a>
            </p>
            <p className="mt-1 text-ink-600">
              <strong>Tapez 1</strong> pour un rendez-vous, <strong>tapez 2</strong> pour toute
              autre demande.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
          <section aria-labelledby="coordonnees-title">
            <h2 id="coordonnees-title" className="text-2xl font-bold">
              Centre de Cergy Préfecture
            </h2>

            <dl className="mt-5 space-y-5">
              <div>
                <dt className="flex items-center gap-2 font-display font-bold text-brand-900">
                  <PictoPin className="h-5 w-5 shrink-0 text-action" />
                  Adresse
                </dt>
                <dd className="mt-1 pl-7 text-ink-600">
                  <address className="not-italic">
                    Alpha Imagerie
                    <br />
                    {CERGY.streetAddress}
                    <br />
                    {CERGY.postalCode} {CERGY.city}
                  </address>
                  <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    <a
                      href={CERGY.mapsUrl}
                      target="_blank"
                      rel="noopener"
                      data-track="directions_click"
                      data-track-site="cergy"
                      data-track-provider="google"
                      className="font-semibold text-action underline-offset-2 hover:underline"
                    >
                      Itinéraire Google Maps
                    </a>
                    <a
                      href={CERGY.appleMapsUrl}
                      target="_blank"
                      rel="noopener"
                      data-track="directions_click"
                      data-track-site="cergy"
                      data-track-provider="apple"
                      className="font-semibold text-action underline-offset-2 hover:underline"
                    >
                      Plans
                    </a>
                    <a
                      href={CERGY.wazeUrl}
                      target="_blank"
                      rel="noopener"
                      data-track="directions_click"
                      data-track-site="cergy"
                      data-track-provider="waze"
                      className="font-semibold text-action underline-offset-2 hover:underline"
                    >
                      Waze
                    </a>
                  </p>
                  <p className="mt-2 text-sm">
                    <Link
                      href="/centres/cergy"
                      className="font-semibold text-action underline-offset-2 hover:underline"
                    >
                      Accès détaillés, transports et stationnement
                    </Link>
                  </p>
                </dd>
              </div>

              <div>
                <dt className="flex items-center gap-2 font-display font-bold text-brand-900">
                  <PictoPhone className="h-5 w-5 shrink-0 text-action" />
                  Téléphone et e-mail
                </dt>
                <dd className="mt-1 pl-7 text-ink-600">
                  <a
                    href={`tel:${CERGY.phoneE164}`}
                    data-track="phone_click"
                    data-track-site="cergy"
                    data-track-position="card"
                    data-track-line="patients"
                    className="font-bold text-brand-900 hover:text-action"
                  >
                    {CERGY.phoneDisplay}
                  </a>
                  <br />
                  <a
                    href={`mailto:${SITE.email}`}
                    className="font-semibold text-action underline-offset-2 hover:underline"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="flex items-center gap-2 font-display font-bold text-brand-900">
                  <PictoHoraires className="h-5 w-5 shrink-0 text-action" />
                  Horaires
                </dt>
                <dd className="mt-1 pl-7 text-ink-600">
                  <p>
                    <strong className="text-brand-900">Centre</strong> — ouvert 7j/7, jours
                    fériés inclus :
                  </p>
                  <ul className="mt-1 space-y-0.5 text-sm">
                    {CERGY.openingHours.map((h) => (
                      <li key={h.days}>
                        {h.days} : {h.hours}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3">
                    <strong className="text-brand-900">Secrétariat téléphonique</strong> :
                  </p>
                  <ul className="mt-1 space-y-0.5 text-sm">
                    {CERGY.secretariat.map((h) => (
                      <li key={h.days}>
                        {h.days} : {h.hours}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </section>

          <aside className="space-y-4">
            <div className="rounded-lg border border-warn/30 bg-warn-100 p-5 text-sm text-ink-600">
              <p>
                <strong className="text-warn">N&rsquo;envoyez aucune information médicale</strong>{" "}
                par e-mail : la messagerie n&rsquo;est pas un canal sécurisé pour les données de
                santé. Les questions médicales se traitent par téléphone ou en consultation.
              </p>
              <p className="mt-3">
                En cas d&rsquo;urgence vitale, appelez le <strong>15</strong> (ou le{" "}
                <strong>112</strong>).
              </p>
            </div>

            <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
              <h2 className="font-display text-lg font-bold text-brand-900">Vos résultats</h2>
              <p className="mt-2 text-sm text-ink-600">
                Les comptes rendus et les images ne transitent pas par ce site. Ils sont remis
                sur place et consultables sur le portail sécurisé.
              </p>
              <p className="mt-3 text-sm">
                <a
                  href={XPLORE.url}
                  target="_blank"
                  rel="noopener"
                  data-track="portal_click"
                  data-track-audience="patient"
                  data-track-position="contact"
                  className="font-semibold text-action underline-offset-2 hover:underline"
                >
                  Accéder au portail résultats
                </a>
                {" · "}
                <Link
                  href="/resultats"
                  className="font-semibold text-action underline-offset-2 hover:underline"
                >
                  Comment ça marche
                </Link>
              </p>
            </div>

            <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
              <h2 className="font-display text-lg font-bold text-brand-900">
                Vous êtes médecin&nbsp;?
              </h2>
              <p className="mt-2 text-sm text-ink-600">
                Adressage, comptes rendus et accès aux images :{" "}
                <Link
                  href="/professionnels-de-sante"
                  className="font-semibold text-action underline-offset-2 hover:underline"
                >
                  espace professionnels de santé
                </Link>
                .
              </p>
            </div>

            <div className="rounded-lg border border-line bg-brand-50 p-5">
              <h2 className="font-display text-lg font-bold text-brand-900">Goussainville</h2>
              <p className="mt-2 text-sm text-ink-600">
                Nouveau centre Goussainville Gare, au sein d&rsquo;une maison de santé —{" "}
                <Link
                  href="/centres/goussainville"
                  className="font-semibold text-action underline-offset-2 hover:underline"
                >
                  ouverture prévue fin 2027
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
