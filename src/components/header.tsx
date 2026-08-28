import Link from "next/link";
import { CERGY, XPLORE } from "@/lib/site";
import { PictoPhone } from "@/components/pictos";

const NAV = [
  { href: "/examens", label: "Examens" },
  { href: "/centres/cergy", label: "Centre de Cergy" },
  { href: "/centres/goussainville", label: "Goussainville", badge: "fin 2027" },
  { href: "/resultats", label: "Mes résultats" },
] as const;

export function Header() {
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2" aria-label="Alpha Imagerie — accueil">
          <span className="font-display text-xl font-extrabold tracking-tight text-brand-900">
            Alpha Imagerie
          </span>
          <span className="hidden text-xs font-medium tracking-wide text-ink-600 md:inline">
            Imagerie médicale · Val-d&rsquo;Oise
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="ml-auto hidden items-center gap-5 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-ink-600 transition-colors hover:text-brand-900"
            >
              {item.label}
              {"badge" in item && item.badge ? (
                <span className="ml-1.5 rounded-full bg-accent-100 px-1.5 py-0.5 text-[0.65rem] font-bold text-accent">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          ))}
          <a
            href={XPLORE.url}
            target="_blank"
            rel="noopener"
            className="text-sm font-semibold text-ink-600 transition-colors hover:text-brand-900"
          >
            Espace pro
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <a
            href={`tel:${CERGY.phoneE164}`}
            className="hidden items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-sm font-bold whitespace-nowrap text-brand-900 transition-colors hover:border-action hover:text-action sm:flex"
          >
            <PictoPhone className="h-4 w-4" />
            {CERGY.phoneDisplay}
          </a>
          <a
            href={CERGY.doctolibUrl}
            target="_blank"
            rel="noopener"
            className="rounded-full bg-action px-4 py-2 text-sm font-bold text-white shadow-card transition-colors hover:bg-action-hover"
          >
            Prendre RDV
          </a>
        </div>
      </div>
    </header>
  );
}
