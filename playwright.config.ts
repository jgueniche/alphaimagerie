import { existsSync } from "node:fs";
import { defineConfig, devices } from "@playwright/test";

/* Environnement distant : Chromium préinstallé hors registre Playwright.
 * En CI (npx playwright install), le chemin n'existe pas → lancement standard. */
const CHROMIUM_LOCAL = "/opt/pw-browsers/chromium";
const launchOptions =
  !process.env.CI && existsSync(CHROMIUM_LOCAL) ? { executablePath: CHROMIUM_LOCAL } : {};

/**
 * Suite E2E (§13 du brief) : navigation, CTA, 301, zéro requête tierce,
 * formulaire (succès/erreur/honeypot), accessibilité (axe-core).
 * Prérequis : `npm run build` (le serveur `next start` sert le rendu SSG réel).
 */
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["github"]] : "list",
  use: {
    baseURL: "http://127.0.0.1:3210",
    trace: "on-first-retry",
    launchOptions,
  },
  webServer: {
    command: "npx next start --port 3210",
    url: "http://127.0.0.1:3210",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
