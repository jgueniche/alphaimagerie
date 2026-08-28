import Link from "next/link";
import type { MedicalOrganization, WebSite, WithContext } from "schema-dts";
import { JsonLd } from "@/components/jsonld";
import { MODALITE_PICTOS, PictoHoraires, PictoPhone, PictoPin } from "@/components/pictos";
import { CERGY, MODALITES, SITE, SOCIALS } from "@/lib/site";

const orgJsonLd: WithContext<MedicalOrganization> = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  email: SITE.email,
  telephone: CERGY.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: CERGY.streetAddress,
    postalCode: CERGY.postalCode,
    addressLocality: CERGY.city,
    addressCountry: "FR",
  },
  sameAs: [SOCIALS.instagram, SOCIALS.linkedin],
  medicalSpecialty: "https://schema.org/Radiography",
};

const websiteJsonLd: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  inLanguage: "fr-FR",
};

export default function Home() {
  return (
    <>
      <JsonLd data={orgJsonLd} />
      <JsonLd data={websiteJsonLd} />

      {/* Hero — promesse factuelle (§9 du brief) */}
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <p className="inline-flex items-center gap-2 rounded-full bg-accent-100 px-3 py-1 text-sm font-bold text-accent">
            <PictoHoraires className="h-4 w-4" />
            Ouvert 7j/7 · jours fériés inclus
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold sm:text-5xl">
            Imagerie médicale à Cergy Préfecture
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-600">
            IRM, scanner, échographie, mammographie, radiographie, ostéodensitométrie et
            radiologie interventionnelle — au pied du RER A Cergy Préfecture, sur rendez-vous en
            ligne ou par téléphone.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={CERGY.doctolibUrl}
              target="_blank"
              rel="noopener"
              className="rounded-full bg-action px-6 py-3 font-bold text-white shadow-card transition-colors hover:bg-action-hover"
            >
              Prendre rendez-vous en ligne
            </a>
            <a
              href={`tel:${CERGY.phoneE164}`}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-bold text-brand-900 transition-colors hover:border-action hover:text-action"
            >
              <PictoPhone className="h-5 w-5" />
              {CERGY.phoneDisplay}
            </a>
            <a
              href={CERGY.mapsUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-2 py-3 font-semibold text-ink-600 underline-offset-4 hover:text-action hover:underline"
            >
              <PictoPin className="h-5 w-5" />
              Itinéraire
            </a>
          </div>
        </div>
      </section>

      {/* Examens */}
      <section aria-labelledby="examens-title" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 id="examens-title" className="text-3xl font-bold">Nos examens</h2>
        <p className="mt-2 max-w-2xl text-ink-600">
          Tous les examens sont réalisés sur prescription médicale, sur notre plateau technique de
          Cergy Préfecture.
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {MODALITES.map((m) => {
            const Picto = MODALITE_PICTOS[m.slug as keyof typeof MODALITE_PICTOS];
            const card = (
              <>
                <Picto className="h-8 w-8 text-action" />
                <span className="mt-3 font-display text-lg font-bold text-brand-900">{m.label}</span>
                <span className="mt-1 text-sm text-ink-600">{m.equipment}</span>
              </>
            );
            return (
              <li key={m.slug}>
                {m.slug === "irm" ? (
                  <Link
                    href="/examens/irm"
                    className="flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card transition-colors hover:border-action"
                  >
                    {card}
                    <span className="mt-3 text-sm font-semibold text-action">En savoir plus →</span>
                  </Link>
                ) : (
                  <div className="flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card">
                    {card}
                    <span className="mt-3 text-xs font-medium text-ink-400">Page détaillée à venir</span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Accès + horaires */}
      <section aria-labelledby="acces-title" className="border-y border-line bg-brand-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-2">
          <div>
            <h2 id="acces-title" className="text-3xl font-bold">Un accès simple</h2>
            <p className="mt-3 max-w-prose text-ink-600">
              Le centre se trouve <strong>2 Mail des Cerclades à Cergy</strong>, sur le parvis face
              au centre commercial Les 3 Fontaines — à la sortie directe du{" "}
              <strong>RER A Cergy Préfecture</strong> (escalator). En voiture : A15 sortie 5 (est)
              ou 9 (ouest), parkings Les 3 Fontaines P1 (2 h gratuites) et P2 (24h/24).
            </p>
            <Link
              href="/centres/cergy"
              className="mt-5 inline-block font-bold text-action underline-offset-4 hover:underline"
            >
              Tout savoir sur le centre de Cergy →
            </Link>
          </div>
          <div className="rounded-lg border border-line bg-surface p-6 shadow-card">
            <h3 className="font-display text-lg font-bold text-brand-900">Horaires du centre</h3>
            <ul className="mt-3 space-y-2 text-[0.95rem]">
              {CERGY.openingHours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4 border-b border-line pb-2 tabular-nums last:border-0">
                  <span className="text-ink-600">{h.days}</span>
                  <span className="font-semibold text-brand-900">{h.hours}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-ink-600">
              Secrétariat téléphonique : lun–ven 8h–18h30, sam 8h–12h30.
            </p>
          </div>
        </div>
      </section>

      {/* Teaser Goussainville */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-accent-100 bg-accent-100/50 px-6 py-5">
          <p className="text-ink">
            <span className="font-display font-bold text-brand-900">Bientôt à Goussainville.</span>{" "}
            Un nouveau centre ouvrira ses portes à Goussainville Gare, au sein d’une maison de
            santé — ouverture prévue fin 2027.
          </p>
          <Link href="/centres/goussainville" className="font-bold text-action underline-offset-4 hover:underline">
            En savoir plus →
          </Link>
        </div>
      </section>
    </>
  );
}
