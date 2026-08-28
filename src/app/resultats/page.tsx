import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { XPLORE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Vos résultats d'imagerie en ligne – Alpha Imagerie" },
  description:
    "Consultez vos comptes rendus et vos images d'imagerie médicale en ligne via notre portail patients sécurisé. Votre médecin les reçoit par messagerie sécurisée et DMP.",
  alternates: { canonical: "/resultats" },
};

export default function ResultatsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Mes résultats", href: "/resultats" }]} />
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <h1 className="max-w-3xl text-3xl font-extrabold sm:text-4xl">Récupérer vos résultats</h1>
        <div className="prose prose-slate mt-6 prose-headings:font-display prose-headings:text-brand-900 prose-a:text-action">
          <p>
            Après votre examen, le radiologue analyse vos images et rédige un compte rendu.{" "}
            <strong>Vous repartez le plus souvent avec vos images et votre compte rendu.</strong>{" "}
            Pour la radiographie, le scanner et l’IRM, le compte rendu peut être mis en ligne dans
            un délai maximal de 12 heures sur notre portail patients sécurisé (Xplore), où vos
            images et comptes rendus restent disponibles à tout moment.
          </p>
          <p>
            Votre <strong>médecin prescripteur</strong> reçoit automatiquement le compte rendu par
            messagerie sécurisée de santé (MS Santé) et via votre{" "}
            <strong>Dossier Médical Partagé (DMP)</strong>. Il dispose d’une interface dédiée pour
            consulter vos images, avec des reconstructions 3D.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={XPLORE.url}
            target="_blank"
            rel="noopener"
            data-track="portal_click"
            data-track-audience="patient"
            data-track-position="fiche"
            className="rounded-full bg-action px-6 py-3 font-bold text-white shadow-card transition-colors hover:bg-action-hover"
          >
            Portail patients — mes résultats
          </a>
          <a
            href={XPLORE.url}
            target="_blank"
            rel="noopener"
            data-track="portal_click"
            data-track-audience="medecin"
            data-track-position="fiche"
            className="rounded-full border border-line bg-surface px-6 py-3 font-bold text-brand-900 transition-colors hover:border-action hover:text-action"
          >
            Portail médecins
          </a>
        </div>
      </div>
    </>
  );
}
