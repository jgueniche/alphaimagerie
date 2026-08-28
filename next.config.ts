import type { NextConfig } from "next";

/**
 * Redirections 301 depuis les URLs Wix indexées (docs/audit-site-actuel.md §6).
 * Next matche sur le chemin décodé : « /mentions-légales » couvre aussi la variante %C3%A9.
 */
const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  async redirects() {
    return [
      { source: "/centre-imagerie-medicale-val-d-oise", destination: "/centres/cergy", statusCode: 301 },
      { source: "/examens-imagerie-medicale-val-d-oise", destination: "/examens", statusCode: 301 },
      { source: "/radiologues-experts-val-d-oise", destination: "/equipe", statusCode: 301 },
      { source: "/rdv-centre-de-radiologie-val-d-oise", destination: "/prendre-rendez-vous", statusCode: 301 },
      { source: "/mentions-légales", destination: "/mentions-legales", statusCode: 301 },
      { source: "/mentions-l%C3%A9gales", destination: "/mentions-legales", statusCode: 301 },
    ];
  },
};

export default nextConfig;
