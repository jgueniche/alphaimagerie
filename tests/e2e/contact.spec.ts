import { expect, test } from "@playwright/test";

/**
 * La page de contact ne comporte volontairement aucun formulaire (décision client du
 * 30/08/2026) : le site ne collecte aucune donnée personnelle. Ces tests verrouillent
 * les deux versants de la décision — les coordonnées sont bien là, et rien ne collecte
 * de saisie.
 */
test.describe("Page de contact", () => {
  test("aucun champ de saisie sur l'ensemble du site public", async ({ page }) => {
    for (const url of ["/contact", "/", "/prendre-rendez-vous", "/recrutement", "/professionnels-de-sante"]) {
      await page.goto(url);
      await expect(page.locator("form"), url).toHaveCount(0);
      await expect(page.locator("input, textarea, select"), url).toHaveCount(0);
    }
  });

  test("les coordonnées du centre sont présentes et actionnables", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("h1")).toContainText("Nous contacter");

    // Téléphone : lien tel: cliquable, marqué pour le plan de mesure.
    const tel = page.locator('main a[data-track="phone_click"][data-track-position="contact"]');
    await expect(tel).toBeVisible();
    await expect(tel).toHaveAttribute("href", "tel:+33186303000");

    // E-mail du secrétariat — adresse unique du projet, `info@` banni.
    await expect(page.locator('main a[href="mailto:contact@alphaimagerie.fr"]').first()).toBeVisible();

    // Adresse postale.
    await expect(page.locator("address")).toContainText("2 Mail des Cerclades");
    await expect(page.locator("address")).toContainText("95000 Cergy");

    // Prise de rendez-vous Doctolib, sur la fiche officielle du centre.
    const doctolib = page.locator('main a[data-track="cta_doctolib_click"]').first();
    await expect(doctolib).toHaveAttribute(
      "href",
      "https://www.doctolib.fr/centre-d-imagerie-medicale/cergy/alpha-imagerie",
    );

    // Horaires du centre et du secrétariat, distingués l'un de l'autre.
    const horaires = page.locator("main dl");
    await expect(horaires).toContainText("Secrétariat téléphonique");
    await expect(horaires).toContainText("ouvert 7j/7, jours fériés inclus");
    await expect(horaires).toContainText("8h – 18h30");
    await expect(horaires).toContainText("Nocturne le lundi");
  });

  test("la consigne « aucune information médicale » reste affichée", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("main").getByText(/N’envoyez aucune information médicale/)).toBeVisible();
  });

  test("/contact/merci a bien disparu", async ({ page }) => {
    const reponse = await page.goto("/contact/merci");
    expect(reponse?.status()).toBe(404);
  });
});
