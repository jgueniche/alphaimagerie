import type { SVGProps } from "react";

/** Pictogrammes custom par modalité — trait 1,75, coins arrondis (docs/design-system.md §5). */
function Base({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function PictoIrm(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 20.5v2M12 1.5v2" />
    </Base>
  );
}
export function PictoScanner(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <circle cx="12" cy="11" r="8.5" />
      <circle cx="12" cy="11" r="2.5" />
      <path d="M4.5 20.5h15" />
    </Base>
  );
}
export function PictoEcho(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M8 3.5h8l-1.5 5h-5z" />
      <path d="M12 8.5v4" />
      <path d="M7.5 16a4.5 4.5 0 0 0 9 0" />
      <path d="M5 13.5a7 7 0 0 0 14 0" opacity={0.45} />
    </Base>
  );
}
export function PictoMammo(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M6 4.5h12" />
      <path d="M6 15.5h12" />
      <path d="M9 8a3.5 3.5 0 1 0 6 2.5c0 3-2 5-2 5" opacity={0.9} />
      <path d="M12 19.5v2" />
    </Base>
  );
}
export function PictoRadio(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <rect x="4.5" y="3.5" width="15" height="17" rx="2" />
      <path d="M12 7v10M8.5 9.5h7M9 12.5h6M9.5 15.5h5" />
    </Base>
  );
}
export function PictoOsteo(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M9.5 4a2 2 0 1 1 2.5 2v12a2 2 0 1 1-2.5 2" />
      <path d="M14.5 4a2 2 0 1 0-2.5 2" opacity={0.5} />
      <path d="M9 9h6M9 15h6" opacity={0.6} />
    </Base>
  );
}
export function PictoInterventionnel(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M17.5 3.5l3 3-9.5 9.5-3.5.5.5-3.5z" />
      <path d="M14.5 6.5l3 3" />
      <path d="M4 20.5h16" />
    </Base>
  );
}

export function PictoPhone(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M5 4.5C5 3.7 5.7 3 6.5 3h2L10 7l-2 1.5a12.5 12.5 0 0 0 7.5 7.5L17 14l4 1.5v2c0 .8-.7 1.5-1.5 1.5C11 19 5 13 5 4.5z" />
    </Base>
  );
}
export function PictoAgenda(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      <path d="M8 13.5l2.5 2.5 5-5" />
    </Base>
  );
}
export function PictoPin(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M12 21s-6.5-5.5-6.5-11a6.5 6.5 0 0 1 13 0c0 5.5-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </Base>
  );
}
export function PictoHoraires(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </Base>
  );
}

export const MODALITE_PICTOS = {
  irm: PictoIrm,
  scanner: PictoScanner,
  echographie: PictoEcho,
  mammographie: PictoMammo,
  radiographie: PictoRadio,
  osteodensitometrie: PictoOsteo,
  interventionnel: PictoInterventionnel,
} as const;
