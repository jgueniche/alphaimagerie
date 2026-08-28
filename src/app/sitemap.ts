import type { MetadataRoute } from "next";
import {
  listExamens,
  listExamenZones,
  listInterventionnels,
  listModalitesVille,
  listPreparations,
  ZONE_PARENTS,
} from "@/lib/content";
import { SITE } from "@/lib/site";

/** Sitemap généré depuis les collections de contenu + routes statiques. Segmentation : Phase 4. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/prendre-rendez-vous",
    "/centres/cergy",
    "/centres/goussainville",
    "/examens",
    "/preparer-mon-examen",
    "/equipe",
    "/resultats",
    "/professionnels-de-sante",
    "/faq",
    "/recrutement",
    "/contact",
    "/mentions-legales",
    "/politique-de-confidentialite",
    "/cookies",
    "/accessibilite",
    "/plan-du-site",
  ];
  const examens = listExamens().map((s) => `/examens/${s}`);
  const zones = ZONE_PARENTS.flatMap((parent) =>
    listExamenZones(parent).map((z) => `/examens/${parent}/${z}`),
  );
  const interventionnels = listInterventionnels().map(
    (s) => `/examens/radiologie-interventionnelle/${s}`,
  );
  const modalitesVille = listModalitesVille("cergy").map((s) => `/centres/cergy/${s}`);
  const preparations = listPreparations().map((s) => `/preparer-mon-examen/${s}`);

  const all = [
    ...staticRoutes,
    ...examens,
    ...zones,
    ...interventionnels,
    ...modalitesVille,
    ...preparations,
  ];
  return all.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date("2026-08-28"),
    changeFrequency: "monthly",
    priority:
      path === ""
        ? 1
        : ["/mentions-legales", "/politique-de-confidentialite", "/cookies", "/accessibilite", "/plan-du-site"].includes(path)
          ? 0.3
          : 0.8,
  }));
}
