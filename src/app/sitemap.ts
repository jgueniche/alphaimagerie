import type { MetadataRoute } from "next";
import {
  listExamens,
  listExamenZones,
  listInterventionnels,
  listModalitesVille,
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
    "/equipe",
    "/resultats",
    "/mentions-legales",
  ];
  const examens = listExamens().map((s) => `/examens/${s}`);
  const zones = ZONE_PARENTS.flatMap((parent) =>
    listExamenZones(parent).map((z) => `/examens/${parent}/${z}`),
  );
  const interventionnels = listInterventionnels().map(
    (s) => `/examens/radiologie-interventionnelle/${s}`,
  );
  const modalitesVille = listModalitesVille("cergy").map((s) => `/centres/cergy/${s}`);

  const all = [...staticRoutes, ...examens, ...zones, ...interventionnels, ...modalitesVille];
  return all.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date("2026-08-28"),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path === "/mentions-legales" ? 0.3 : 0.8,
  }));
}
