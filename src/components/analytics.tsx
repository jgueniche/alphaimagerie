"use client";

import { useEffect } from "react";

/**
 * Marquage first-party (docs/tracking-plan.md) — AUCUN tag tiers ici.
 * Les CTA (RSC) portent des attributs `data-track` + `data-track-*` ; ce composant
 * unique pousse les événements dans window.dataLayer par délégation de clic.
 * GTM/GA4 ne seront chargés qu'après consentement (CMP, arbitrages q.44–47) :
 * en attendant, le dataLayer est alimenté et vérifiable, sans cookie ni requête.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: string, params: Record<string, string | boolean> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}

function surClic(e: MouseEvent) {
  const cible = e.target instanceof Element ? e.target.closest<HTMLElement>("[data-track]") : null;
  if (!cible) return;
  const event = cible.dataset.track;
  if (!event) return;
  const params: Record<string, string> = {};
  for (const [cle, valeur] of Object.entries(cible.dataset)) {
    if (cle === "track" || valeur === undefined) continue;
    if (cle.startsWith("track")) {
      // dataset camelCase (trackSite) → paramètre snake_case (site)
      const nom = cle.slice("track".length).replace(/^[A-Z]/, (c) => c.toLowerCase());
      params[nom.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)] = valeur;
    }
  }
  track(event, params);
}

export function Analytics() {
  useEffect(() => {
    document.addEventListener("click", surClic, { capture: true, passive: true });
    return () => document.removeEventListener("click", surClic, { capture: true });
  }, []);
  return null;
}
