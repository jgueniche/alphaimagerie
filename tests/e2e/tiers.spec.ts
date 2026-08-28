import { expect, test } from "@playwright/test";

/**
 * §13 du brief : ZÉRO script/requête tiers avant consentement.
 * Aucune CMP n'étant encore déployée (arbitrages q.44–47), la règle est absolue :
 * toute requête doit rester first-party (polices self-host comprises).
 */
const PAGES = ["/", "/examens/irm", "/examens/irm/genou", "/centres/cergy", "/contact", "/faq"];

test.describe("Aucune requête tierce avant consentement", () => {
  for (const url of PAGES) {
    test(`first-party uniquement sur ${url}`, async ({ page, baseURL }) => {
      const tierces: string[] = [];
      page.on("request", (req) => {
        if (!req.url().startsWith(baseURL!) && !req.url().startsWith("data:")) {
          tierces.push(req.url());
        }
      });
      await page.goto(url, { waitUntil: "networkidle" });
      expect(tierces, `requêtes tierces sur ${url}`).toEqual([]);
    });
  }

  test("aucun cookie déposé", async ({ page, context }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.goto("/examens/irm", { waitUntil: "networkidle" });
    expect(await context.cookies()).toEqual([]);
  });
});
