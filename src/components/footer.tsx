import Link from "next/link";
import { CERGY, SITE, SOCIALS, XPLORE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-20 bg-brand-900 text-white/85">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold text-white">Alpha Imagerie</p>
          <p className="mt-2 text-sm leading-relaxed">
            Centre d&rsquo;imagerie médicale — Cergy Préfecture
            <br />
            {CERGY.streetAddress}, {CERGY.postalCode} {CERGY.city}
          </p>
          <p className="mt-2 text-sm">
            <a href={`tel:${CERGY.phoneE164}`} className="font-semibold text-white underline-offset-2 hover:underline">
              {CERGY.phoneDisplay}
            </a>
            <br />
            <a href={`mailto:${SITE.email}`} className="hover:underline">
              {SITE.email}
            </a>
          </p>
        </div>
        <nav aria-label="Liens du pied de page" className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <Link href="/examens" className="hover:underline">Nos examens</Link>
          <Link href="/centres/cergy" className="hover:underline">Centre de Cergy</Link>
          <Link href="/prendre-rendez-vous" className="hover:underline">Prendre rendez-vous</Link>
          <Link href="/centres/goussainville" className="hover:underline">Goussainville (fin 2027)</Link>
          <Link href="/resultats" className="hover:underline">Mes résultats</Link>
          <a href={XPLORE.url} target="_blank" rel="noopener" className="hover:underline">Portail médecins</a>
          <a href={SOCIALS.instagram} target="_blank" rel="noopener" className="hover:underline">Instagram</a>
          <a href={SOCIALS.linkedin} target="_blank" rel="noopener" className="hover:underline">LinkedIn</a>
        </nav>
        <div className="text-sm leading-relaxed">
          <p className="font-semibold text-white">Ouvert 7j/7, jours fériés inclus</p>
          <ul className="mt-2 space-y-1">
            {CERGY.openingHours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4 tabular-nums">
                <span>{h.days}</span>
                <span>{h.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-white/60 sm:px-6">
          <p>© {new Date().getFullYear()} {SITE.legalName} — RCS Pontoise 928 012 830</p>
          <p>
            <Link href="/mentions-legales" className="hover:underline">Mentions légales</Link>
            {" · Confidentialité · Cookies · Accessibilité (Phase 3)"}
          </p>
        </div>
      </div>
    </footer>
  );
}
