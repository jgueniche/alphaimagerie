import type { Metadata } from "next";
import type { MedicalClinic, WithContext } from "schema-dts";
import { Breadcrumb } from "@/components/breadcrumb";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/jsonld";
import { Mdx } from "@/components/mdx";
import { PictoAgenda, PictoHoraires, PictoPhone, PictoPin } from "@/components/pictos";
import Link from "next/link";
import { getCentre } from "@/lib/content";
import { CERGY, MODALITES, SITE, SOCIALS, XPLORE } from "@/lib/site";

const { frontmatter: fm, body } = getCentre("cergy");

export const metadata: Metadata = {
  title: { absolute: fm.metaTitle },
  description: fm.metaDescription,
  alternates: { canonical: "/centres/cergy" },
};

const clinicJsonLd: WithContext<MedicalClinic> = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: CERGY.displayName,
  url: `${SITE.url}/centres/cergy`,
  telephone: CERGY.phoneE164,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: CERGY.streetAddress,
    postalCode: CERGY.postalCode,
    addressLocality: CERGY.city,
    addressRegion: "Île-de-France",
    addressCountry: "FR",
  },
  geo: { "@type": "GeoCoordinates", latitude: CERGY.geo.lat, longitude: CERGY.geo.lng },
  hasMap: CERGY.mapsUrl,
  sameAs: [SOCIALS.instagram, SOCIALS.linkedin],
  medicalSpecialty: "https://schema.org/Radiography",
  openingHoursSpecification: CERGY.openingHoursSpec.map((s) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: s.dayOfWeek,
    opens: s.opens,
    closes: s.closes,
  })),
  availableService: MODALITES.map((m) => ({
    "@type": "MedicalProcedure",
    name: m.label,
  })),
  isAcceptingNewPatients: true,
};

export default function CentreCergyPage() {
  return (
    <>
      <JsonLd data={clinicJsonLd} />
      <Breadcrumb items={[{ label: "Centres", href: "/centres/cergy" }, { label: "Cergy Préfecture", href: "/centres/cergy" }]} />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-accent-100 px-3 py-1 text-sm font-bold text-accent">
          <PictoHoraires className="h-4 w-4" />
          Ouvert 7j/7 · jours fériés inclus
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold sm:text-4xl">{fm.title}</h1>

        {/* Bandeau NAP */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <a
            href={CERGY.mapsUrl}
            target="_blank"
            rel="noopener"
            className="flex items-start gap-3 rounded-lg border border-line bg-surface p-4 shadow-card transition-colors hover:border-action"
          >
            <PictoPin className="mt-0.5 h-5 w-5 shrink-0 text-action" />
            <span>
              <span className="block text-sm font-bold text-brand-900">
                {CERGY.streetAddress}, {CERGY.postalCode} {CERGY.city}
              </span>
              <span className="text-sm text-ink-600">Itinéraire (Google Maps) →</span>
            </span>
          </a>
          <a
            href={`tel:${CERGY.phoneE164}`}
            className="flex items-start gap-3 rounded-lg border border-line bg-surface p-4 shadow-card transition-colors hover:border-action"
          >
            <PictoPhone className="mt-0.5 h-5 w-5 shrink-0 text-action" />
            <span>
              <span className="block text-sm font-bold text-brand-900">{CERGY.phoneDisplay}</span>
              <span className="text-sm text-ink-600">Tapez 1 pour un rendez-vous</span>
            </span>
          </a>
          <a
            href={CERGY.doctolibUrl}
            target="_blank"
            rel="noopener"
            className="flex items-start gap-3 rounded-lg bg-action p-4 text-white shadow-card transition-colors hover:bg-action-hover"
          >
            <PictoAgenda className="mt-0.5 h-5 w-5 shrink-0" />
            <span>
              <span className="block text-sm font-bold">Prendre rendez-vous en ligne</span>
              <span className="text-sm text-white/85">Doctolib — créneaux en temps réel</span>
            </span>
          </a>
        </div>

        {/* Horaires détaillés */}
        <div className="mt-6 grid gap-4 rounded-lg border border-line bg-surface p-5 shadow-card sm:grid-cols-2">
          <div>
            <h2 className="font-display text-base font-bold text-brand-900">Horaires du centre</h2>
            <ul className="mt-2 space-y-1.5 text-[0.95rem]">
              {CERGY.openingHours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4 tabular-nums">
                  <span className="text-ink-600">{h.days}</span>
                  <span className="font-semibold text-brand-900">{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-base font-bold text-brand-900">Secrétariat téléphonique</h2>
            <ul className="mt-2 space-y-1.5 text-[0.95rem]">
              {CERGY.secretariat.map((h) => (
                <li key={h.days} className="flex justify-between gap-4 tabular-nums">
                  <span className="text-ink-600">{h.days}</span>
                  <span className="font-semibold text-brand-900">{h.hours}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-ink-600">
              Professionnels de santé : accès direct via le{" "}
              <a href={XPLORE.url} target="_blank" rel="noopener" className="font-semibold text-action underline-offset-2 hover:underline">
                portail médecins
              </a>
              .
            </p>
          </div>
        </div>

        <Mdx source={body} />

        {/* Landing par modalité — maillage local */}
        <section aria-labelledby="modalites-cergy" className="mt-12">
          <h2 id="modalites-cergy" className="text-2xl font-bold">Nos examens à Cergy</h2>
          <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
            {MODALITES.map((m) => (
              <li key={m.slug}>
                <Link
                  href={`/centres/cergy/${m.slug}`}
                  className="flex h-full flex-col rounded-lg border border-line bg-surface p-4 shadow-card transition-colors hover:border-action"
                >
                  <span className="font-display font-bold text-brand-900">{m.label} à Cergy</span>
                  <span className="mt-1 text-sm text-ink-600">{m.equipment}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <Faq items={fm.faq ?? []} title="Questions fréquentes sur le centre" />
      </div>
    </>
  );
}
