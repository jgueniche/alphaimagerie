import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/** axe-core sur les gabarits représentatifs — 0 violation sérieuse/critique (§13). */
/* Un gabarit de chaque famille, plus les pages de conversion et les pages légales :
   /prendre-rendez-vous manquait à cette liste, et y portait un défaut non détecté. */
const PAGES = [
  "/",
  "/examens/irm",
  "/examens/irm/genou",
  "/examens/radiologie-interventionnelle/infiltrations",
  "/centres/cergy",
  "/centres/cergy/irm",
  "/preparer-mon-examen/irm",
  "/prendre-rendez-vous",
  "/contact",
  "/equipe",
  "/resultats",
  "/professionnels-de-sante",
  "/recrutement",
  "/faq",
  "/mentions-legales",
  "/politique-de-confidentialite",
  "/plan-du-site",
];

test.describe("Accessibilité (axe-core)", () => {
  for (const url of PAGES) {
    test(`aucune violation sérieuse sur ${url}`, async ({ page }) => {
      await page.goto(url);
      const resultats = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const graves = resultats.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      );
      expect(
        graves.map((v) => `${v.id}: ${v.description} (${v.nodes.length} nœud·s)`),
      ).toEqual([]);
    });
  }
});
