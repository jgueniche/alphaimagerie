import type { Metadata } from "next";
import Link from "next/link";
import type { ContactPage as ContactPageSchema, WithContext } from "schema-dts";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/jsonld";
import { PictoHoraires, PictoPhone, PictoPin } from "@/components/pictos";
import { FormulaireContact } from "@/app/contact/formulaire";
import { CERGY, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Alpha Imagerie à Cergy : téléphone, e-mail, formulaire. Secrétariat du lundi au samedi. N'indiquez aucune information médicale en ligne.",
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
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <h1 className="max-w-3xl text-3xl font-extrabold sm:text-4xl">Nous contacter</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-600">
          Le plus rapide pour un rendez-vous : la{" "}
          <Link href="/prendre-rendez-vous" className="font-semibold text-action underline-offset-2 hover:underline">
            réservation en ligne
          </Link>{" "}
          ou le téléphone. Pour toute autre demande, le formulaire ci-dessous est relevé par
          notre secrétariat.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
          <section aria-labelledby="formulaire-title">
            <h2 id="formulaire-title" className="text-2xl font-bold">Votre demande</h2>
            <FormulaireContact />
          </section>

          <aside className="space-y-4">
            <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
              <h2 className="font-display text-lg font-bold text-brand-900">Cergy Préfecture</h2>
              <p className="mt-2 flex items-start gap-2 text-sm text-ink-600">
                <PictoPin className="mt-0.5 h-4 w-4 shrink-0 text-action" />
                {CERGY.streetAddress}, {CERGY.postalCode} {CERGY.city}
              </p>
              <p className="mt-2 flex items-start gap-2 text-sm">
                <PictoPhone className="mt-0.5 h-4 w-4 shrink-0 text-action" />
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
              </p>
              <p className="mt-2 flex items-start gap-2 text-sm text-ink-600">
                <PictoHoraires className="mt-0.5 h-4 w-4 shrink-0 text-action" />
                <span>
                  Secrétariat : Lun–Ven 8h–18h30, Sam 8h–12h30
                  <br />
                  Centre ouvert 7j/7, jours fériés inclus
                </span>
              </p>
              <p className="mt-2 text-sm">
                <a href={`mailto:${SITE.email}`} className="font-semibold text-action underline-offset-2 hover:underline">
                  {SITE.email}
                </a>
              </p>
            </div>
            <div className="rounded-lg border border-line bg-brand-50 p-5">
              <h2 className="font-display text-lg font-bold text-brand-900">Goussainville</h2>
              <p className="mt-2 text-sm text-ink-600">
                Nouveau centre Goussainville Gare, au sein d&rsquo;une maison de santé —{" "}
                <Link href="/centres/goussainville" className="font-semibold text-action underline-offset-2 hover:underline">
                  ouverture prévue fin 2027
                </Link>
                .
              </p>
            </div>
            <div className="rounded-lg border border-warn/30 bg-warn-100 p-5 text-sm text-ink-600">
              <p>
                <strong className="text-warn">Ce formulaire n&rsquo;est pas un canal médical.</strong>{" "}
                N&rsquo;y indiquez aucune information de santé. Pour vos résultats :{" "}
                <Link href="/resultats" className="font-semibold underline underline-offset-2">
                  la page résultats
                </Link>
                . En cas d&rsquo;urgence, appelez le 15.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
