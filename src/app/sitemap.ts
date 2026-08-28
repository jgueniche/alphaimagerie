import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/** Sitemap v1 (pages existantes). Segmentation par type + lastmod réel : Phase 4. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/prendre-rendez-vous",
    "/centres/cergy",
    "/centres/goussainville",
    "/examens",
    "/examens/irm",
    "/resultats",
  ];
  return routes.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date("2026-08-28"),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
