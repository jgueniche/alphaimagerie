import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/** axe-core sur les gabarits représentatifs — 0 violation sérieuse/critique (§13). */
const PAGES = ["/", "/examens/irm", "/examens/irm/genou", "/preparer-mon-examen/irm", "/contact", "/faq"];

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
