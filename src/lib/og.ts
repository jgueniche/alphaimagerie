import type { Metadata } from "next";

/**
 * Images OG par page (§6 : OG unique partout) — génère l'URL /og?titre=…&sous=…
 * rendue par src/app/og/route.tsx. og:title/description héritent du title/description
 * de la page (Metadata API) ; seul le visuel est fourni ici.
 */
export function ogImages(titre: string, sous?: string): NonNullable<Metadata["openGraph"]> {
  const params = new URLSearchParams({ titre });
  if (sous) params.set("sous", sous);
  return {
    // Le openGraph d'une page remplace celui du layout (pas de fusion profonde) :
    // on refournit donc la base commune avec le visuel propre à la page.
    type: "website",
    siteName: "Alpha Imagerie",
    locale: "fr_FR",
    images: [{ url: `/og?${params.toString()}`, width: 1200, height: 630 }],
  };
}
