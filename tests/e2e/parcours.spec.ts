import { expect, test } from "@playwright/test";

test.describe("Parcours patient", () => {
  test("accueil → examens → pilier IRM → zone genou", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);

    await page.goto("/examens");
    await expect(page.locator("h1")).toHaveCount(1);

    await page.goto("/examens/irm");
    await expect(page.getByRole("heading", { level: 2, name: "Nos pages par zone examinée" })).toBeVisible();
    await page.getByRole("link", { name: /IRM du genou/ }).first().click();
    await expect(page).toHaveURL(/\/examens\/irm\/genou$/);
    await expect(page.locator("h1")).toContainText("IRM du genou");

    // Fil d'Ariane + liens de maillage
    await expect(page.getByRole("navigation", { name: "Fil d'Ariane" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Pour aller plus loin" })).toBeVisible();
  });

  test("chaque gabarit porte un H1 unique et un canonical", async ({ page }) => {
    for (const url of [
      "/",
      "/examens/scanner/score-calcique",
      "/examens/echographie/thyroide",
      "/preparer-mon-examen/irm",
      "/centres/cergy/irm",
      "/faq",
      "/contact",
    ]) {
      await page.goto(url);
      await expect(page.locator("h1"), url).toHaveCount(1);
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical, url).toHaveAttribute("href", /alphaimagerie\.fr/);
    }
  });

  test("fiche de préparation : bouton imprimer et checklist", async ({ page }) => {
    await page.goto("/preparer-mon-examen/scanner");
    await expect(page.getByRole("button", { name: "Imprimer cette fiche" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /À apporter/ })).toBeVisible();
  });
});
