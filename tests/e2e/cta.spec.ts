import { expect, test } from "@playwright/test";

const DOCTOLIB = "https://www.doctolib.fr/centre-d-imagerie-medicale/cergy/alpha-imagerie";

test.describe("CTA et plan de marquage", () => {
  test("les CTA Doctolib pointent vers la fiche officielle et sont marqués", async ({ page }) => {
    for (const url of ["/", "/examens/irm", "/examens/irm/genou", "/prendre-rendez-vous"]) {
      await page.goto(url);
      const cta = page.locator(`a[href="${DOCTOLIB}"][data-track="cta_doctolib_click"]`);
      expect(await cta.count(), url).toBeGreaterThan(0);
    }
  });

  test("un clic téléphone pousse phone_click dans le dataLayer", async ({ page }) => {
    await page.goto("/examens/irm");
    await page.locator('a[href^="tel:"][data-track="phone_click"]:visible').first().click();
    const dataLayer = await page.evaluate(() => window.dataLayer);
    expect(dataLayer).toContainEqual(
      expect.objectContaining({ event: "phone_click", site: "cergy", line: "patients" }),
    );
  });

  test("un clic Doctolib pousse cta_doctolib_click avec la modalité", async ({ page, context }) => {
    await page.goto("/examens/irm/genou");
    const popup = context.waitForEvent("page");
    await page.locator('a[data-track="cta_doctolib_click"][data-track-position="fiche"]').first().click();
    await (await popup).close();
    const dataLayer = await page.evaluate(() => window.dataLayer);
    expect(dataLayer).toContainEqual(
      expect.objectContaining({ event: "cta_doctolib_click", site: "cergy", modality: "irm", position: "fiche" }),
    );
  });

  test("mobile : barre sticky Appeler · RDV · Itinéraire", async ({ page, isMobile }) => {
    test.skip(!isMobile, "spécifique mobile");
    await page.goto("/examens/scanner");
    const barre = page.getByRole("navigation", { name: "Actions rapides" });
    await expect(barre).toBeVisible();
    await expect(barre.getByRole("link", { name: "Appeler" })).toBeVisible();
    await expect(barre.getByRole("link", { name: "Prendre RDV" })).toBeVisible();
    await expect(barre.getByRole("link", { name: "Itinéraire" })).toBeVisible();
  });
});
