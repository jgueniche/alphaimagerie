import { expect, test } from "@playwright/test";

/** Redirections 301 depuis les URLs Wix indexées (§12 du brief, next.config.ts). */
const CAS: Array<[string, string]> = [
  ["/centre-imagerie-medicale-val-d-oise", "/centres/cergy"],
  ["/examens-imagerie-medicale-val-d-oise", "/examens"],
  ["/radiologues-experts-val-d-oise", "/equipe"],
  ["/rdv-centre-de-radiologie-val-d-oise", "/prendre-rendez-vous"],
  ["/mentions-l%C3%A9gales", "/mentions-legales"],
];

test.describe("Redirections 301 Wix", () => {
  for (const [source, destination] of CAS) {
    test(`${source} → ${destination}`, async ({ request }) => {
      const reponse = await request.get(source, { maxRedirects: 0 });
      expect(reponse.status()).toBe(301);
      expect(reponse.headers()["location"]).toContain(destination);
    });
  }
});
