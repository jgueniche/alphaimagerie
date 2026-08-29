import { ImageResponse } from "next/og";

/**
 * Images Open Graph 1200×630 générées à la volée (§6 du brief, next/og).
 * Usage : /og?titre=…&sous=… — voir src/lib/og.ts pour le helper de métadonnées.
 * Design typographique aux couleurs du logo (docs/design-system.md), sans
 * dépendance à un fichier : rendu garanti dans l'environnement serverless.
 */

/** Fonction exécutée dans l'UE (§4 du brief) — voir aussi vercel.json. */
export const preferredRegion = "cdg1";

const BRAND_900 = "#232d5c";
const BRAND_400 = "#5976b9";
const PAPER = "#fafbfd";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const titre = (searchParams.get("titre") ?? "Alpha Imagerie").slice(0, 90);
  const sous = (
    searchParams.get("sous") ?? "Imagerie médicale à Cergy · ouvert 7j/7, jours fériés inclus"
  ).slice(0, 130);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: PAPER,
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Motif d'anneaux, écho du logo rond */}
        <div
          style={{
            position: "absolute",
            right: -140,
            top: -140,
            width: 480,
            height: 480,
            borderRadius: 9999,
            border: `44px solid ${BRAND_400}`,
            opacity: 0.18,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -40,
            top: -40,
            width: 280,
            height: 280,
            borderRadius: 9999,
            border: `30px solid ${BRAND_900}`,
            opacity: 0.12,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 9999,
              border: `7px solid ${BRAND_900}`,
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: BRAND_900,
              letterSpacing: -0.5,
              display: "flex",
            }}
          >
            Alpha Imagerie
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 980 }}>
          <div
            style={{
              fontSize: titre.length > 55 ? 58 : 68,
              fontWeight: 800,
              color: BRAND_900,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              display: "flex",
            }}
          >
            {titre}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 64, height: 8, backgroundColor: BRAND_400, borderRadius: 4, display: "flex" }} />
            <div style={{ fontSize: 30, color: "#46536f", display: "flex" }}>{sous}</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: BRAND_400,
            fontWeight: 700,
          }}
        >
          <div style={{ display: "flex" }}>www.alphaimagerie.fr</div>
          <div style={{ display: "flex", color: "#46536f", fontWeight: 400 }}>
            2 Mail des Cerclades, Cergy Préfecture
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
