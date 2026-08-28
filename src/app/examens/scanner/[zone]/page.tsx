import type { Metadata } from "next";
import { ExamenZonePage, zoneMetadata } from "@/components/examen-zone-page";
import { listExamenZones } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return listExamenZones("scanner").map((zone) => ({ zone }));
}

export async function generateMetadata({ params }: { params: Promise<{ zone: string }> }): Promise<Metadata> {
  const { zone } = await params;
  return zoneMetadata("scanner", zone);
}

export default async function Page({ params }: { params: Promise<{ zone: string }> }) {
  const { zone } = await params;
  return <ExamenZonePage parent="scanner" zone={zone} />;
}
