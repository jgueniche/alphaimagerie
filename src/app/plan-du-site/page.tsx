import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  getExamen,
  getExamenZone,
  getInterventionnel,
  getPreparation,
  listExamens,
  listExamenZones,
  listInterventionnels,
  listModalitesVille,
  listPreparations,
  ZONE_PARENTS,
} from "@/lib/content";
import { getModaliteVille } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Plan du site – Alpha Imagerie" },
  description:
    "Toutes les pages du site alphaimagerie.fr : centres, examens et zones, préparation, résultats, professionnels de santé, pages pratiques et légales.",
  alternates: { canonical: "/plan-du-site" },
};

type Entree = { href: string; label: string };

function Bloc({ titre, entrees }: { titre: string; entrees: Entree[] }) {
  return (
    <section>
      <h2 className="font-display text-xl font-bold text-brand-900">{titre}</h2>
      <ul className="mt-3 space-y-1.5 text-[0.95rem]">
        {entrees.map((e) => (
          <li key={e.href}>
            <Link href={e.href} className="text-action underline-offset-2 hover:underline">
              {e.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function PlanDuSitePage() {
  const piliers: Entree[] = listExamens().map((s) => ({
    href: `/examens/${s}`,
    label: getExamen(s).frontmatter.title,
  }));
  const zones: Entree[] = ZONE_PARENTS.flatMap((parent) =>
    listExamenZones(parent).map((z) => ({
      href: `/examens/${parent}/${z}`,
      label: getExamenZone(parent, z).frontmatter.navLabel,
    })),
  );
  const gestes: Entree[] = listInterventionnels().map((s) => ({
    href: `/examens/radiologie-interventionnelle/${s}`,
    label: getInterventionnel(s).frontmatter.title,
  }));
  const landings: Entree[] = listModalitesVille("cergy").map((s) => ({
    href: `/centres/cergy/${s}`,
    label: getModaliteVille("cergy", s).frontmatter.title,
  }));
  const preparations: Entree[] = listPreparations().map((s) => ({
    href: `/preparer-mon-examen/${s}`,
    label: getPreparation(s).frontmatter.title,
  }));

  return (
    <>
      <Breadcrumb items={[{ label: "Plan du site", href: "/plan-du-site" }]} />
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Plan du site</h1>
        <div className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <Bloc
            titre="Le centre"
            entrees={[
              { href: "/", label: "Accueil" },
              { href: "/prendre-rendez-vous", label: "Prendre rendez-vous" },
              { href: "/centres/cergy", label: "Centre de Cergy Préfecture" },
              { href: "/centres/goussainville", label: "Goussainville (ouverture fin 2027)" },
              { href: "/equipe", label: "L'équipe médicale" },
              { href: "/resultats", label: "Mes résultats" },
              { href: "/contact", label: "Contact" },
              { href: "/faq", label: "Questions fréquentes" },
            ]}
          />
          <Bloc titre="Nos examens" entrees={[{ href: "/examens", label: "Tous les examens" }, ...piliers]} />
          <Bloc titre="Examens par zone" entrees={zones} />
          <Bloc
            titre="Radiologie interventionnelle"
            entrees={[
              { href: "/examens/radiologie-interventionnelle", label: "La radiologie interventionnelle" },
              ...gestes,
            ]}
          />
          <Bloc
            titre="Préparer votre examen"
            entrees={[{ href: "/preparer-mon-examen", label: "Préparer mon examen" }, ...preparations]}
          />
          <Bloc titre="Imagerie à Cergy" entrees={landings} />
          <Bloc
            titre="Informations et légal"
            entrees={[
              { href: "/professionnels-de-sante", label: "Professionnels de santé" },
              { href: "/recrutement", label: "Recrutement" },
              { href: "/mentions-legales", label: "Mentions légales" },
              { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
              { href: "/cookies", label: "Cookies" },
              { href: "/accessibilite", label: "Accessibilité" },
            ]}
          />
        </div>
      </div>
    </>
  );
}
