import type { Metadata } from "next";
import { Bricolage_Grotesque, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CtaBar } from "@/components/cta-bar";
import { ogImages } from "@/lib/og";
import { SITE } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Alpha Imagerie – Imagerie médicale à Cergy, 7j/7",
    template: "%s – Alpha Imagerie",
  },
  description:
    "Centre d'imagerie médicale à Cergy Préfecture : IRM, scanner, échographie, mammographie, radiographie, ostéodensitométrie. Ouvert 7j/7, jours fériés inclus.",
  verification: { google: SITE.gscVerification },
  alternates: { canonical: "/" },
  openGraph: ogImages(
    "Imagerie médicale à Cergy",
    "IRM, scanner, échographie, mammographie — 7j/7, jours fériés inclus",
  ),
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${bricolage.variable} ${sourceSans.variable} antialiased`}>
        <Header />
        <main className="pb-24 lg:pb-0">{children}</main>
        <Footer />
        <CtaBar />
        <Analytics />
      </body>
    </html>
  );
}
