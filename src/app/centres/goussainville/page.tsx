import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { CERGY } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Radiologie à Goussainville, fin 2027 – Alpha Imagerie" },
  description:
    "Alpha Imagerie ouvrira un nouveau centre d'imagerie médicale à Goussainville Gare, au sein d'une maison de santé. Ouverture prévue fin 2027.",
  alternates: { canonical: "/centres/goussainville" },
};

export default function CentreGoussainvillePage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Centres", href: "/centres/cergy" },
          { label: "Goussainville", href: "/centres/goussainville" },
        ]}
      />
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <p className="inline-flex rounded-full bg-accent-100 px-3 py-1 text-sm font-bold text-accent">
          Ouverture prévue fin 2027
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold sm:text-4xl">
          Bientôt : un centre d’imagerie médicale à Goussainville
        </h1>
        <div className="prose prose-slate mt-6 prose-headings:font-display prose-headings:text-brand-900 prose-a:text-action">
          <p>
            Alpha Imagerie prépare l’ouverture d’un nouveau centre d’imagerie médicale à{" "}
            <strong>Goussainville Gare</strong>, au sein d’une maison de santé. L’ouverture est
            prévue <strong>fin 2027</strong>.
          </p>
          <p>
            Les informations pratiques — adresse, examens proposés, horaires et prise de
            rendez-vous — seront publiées sur cette page à l’approche de l’ouverture.
          </p>
          <p>
            D’ici là, notre centre de <strong>Cergy Préfecture</strong> vous accueille 7j/7,
            jours fériés inclus, pour l’ensemble de vos examens d’imagerie : IRM, scanner,
            échographie, mammographie, radiographie, ostéodensitométrie et radiologie
            interventionnelle.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/centres/cergy"
            className="rounded-full bg-action px-5 py-2.5 font-bold text-white shadow-card transition-colors hover:bg-action-hover"
          >
            Découvrir le centre de Cergy
          </Link>
          <a
            href={`tel:${CERGY.phoneE164}`}
            className="rounded-full border border-line bg-surface px-5 py-2.5 font-bold text-brand-900 transition-colors hover:border-action hover:text-action"
          >
            {CERGY.phoneDisplay}
          </a>
        </div>
      </div>
    </>
  );
}
