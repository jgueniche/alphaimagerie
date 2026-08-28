import { expect, test } from "@playwright/test";

/** Formulaire §3.2 : succès, erreurs de validation, honeypot (transport factice `log`). */
test.describe("Formulaire de contact", () => {
  test("la mention « aucune information médicale » est visible", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByText(/indiquez aucune information médicale/i)).toBeVisible();
  });

  test("envoi valide → contact_submit + page merci", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Civilité").selectOption("Madame");
    await page.getByLabel("Nom", { exact: true }).fill("Test");
    await page.getByLabel("Prénom").fill("Playwright");
    await page.getByLabel("E-mail").fill("test@example.org");
    await page.getByLabel("Type de demande").selectOption("Renseignement général");
    await page.getByLabel("Votre message").fill("Message de test automatisé, sans information médicale.");
    await page.getByRole("button", { name: "Envoyer le message" }).click();

    await expect(page).toHaveURL(/\/contact\/merci$/);
    await expect(page.locator("h1")).toContainText("Merci");
    const dataLayer = await page.evaluate(() => window.dataLayer);
    expect(dataLayer).toContainEqual(
      expect.objectContaining({ event: "contact_submit", site: "cergy", request_type: "renseignement" }),
    );
  });

  test("champs invalides → erreurs accessibles, pas d'envoi", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Nom", { exact: true }).fill("X");
    await page.getByLabel("E-mail").fill("pas-un-email");
    await page.getByLabel("Votre message").fill("court");
    await page.getByRole("button", { name: "Envoyer le message" }).click();

    await expect(page.getByRole("alert").first()).toBeVisible();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByLabel("E-mail")).toHaveAttribute("aria-invalid", "true");
  });

  test("honeypot rempli → redirection muette vers merci", async ({ page }) => {
    await page.goto("/contact");
    await page.locator('input[name="site_web"]').evaluate((el: HTMLInputElement) => {
      el.value = "https://spam.example";
    });
    await page.getByLabel("Civilité").selectOption("Monsieur");
    await page.getByLabel("Nom", { exact: true }).fill("Robot");
    await page.getByLabel("Prénom").fill("Spam");
    await page.getByLabel("E-mail").fill("robot@example.org");
    await page.getByLabel("Type de demande").selectOption("Autre");
    await page.getByLabel("Votre message").fill("Contenu indésirable automatisé pour le test.");
    await page.getByRole("button", { name: "Envoyer le message" }).click();
    await expect(page).toHaveURL(/\/contact\/merci$/);
  });

  test("la page merci est en noindex", async ({ page }) => {
    await page.goto("/contact/merci");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });
});
