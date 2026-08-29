"use client";

/**
 * Dernier filet de sécurité : ce composant remplace intégralement le layout racine quand une
 * erreur survient dans celui-ci. Il doit donc rendre lui-même <html> et <body>.
 *
 * Le gabarit par défaut de Next omet l'attribut `lang` (WCAG 2.1 critère 3.1.1, « Langue de la
 * page ») et s'affiche en anglais. On le remplace par une page en français, sobre et sans
 * dépendance : ni police, ni feuille de style externe, ni composant partagé — tout ce qui
 * pourrait être indisponible au moment précis où le layout a échoué.
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "#fafbfd",
          color: "#1b2233",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          textAlign: "center",
        }}
      >
        <main style={{ maxWidth: "34rem" }}>
          <h1 style={{ fontSize: "1.75rem", margin: "0 0 0.75rem" }}>
            Une erreur est survenue
          </h1>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.6, margin: "0 0 1.5rem" }}>
            Le site rencontre un incident technique. Vous pouvez réessayer&nbsp;; si le problème
            persiste, le secrétariat reste joignable au{" "}
            <a href="tel:+33186303000" style={{ color: "#9d5420", fontWeight: 700 }}>
              01&nbsp;86&nbsp;30&nbsp;30&nbsp;00
            </a>
            , et la prise de rendez-vous en ligne reste accessible sur Doctolib.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              border: 0,
              borderRadius: "9999px",
              padding: "0.7rem 1.5rem",
              backgroundColor: "#9d5420",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Réessayer
          </button>
        </main>
      </body>
    </html>
  );
}
