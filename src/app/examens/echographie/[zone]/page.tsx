import type { Metadata } from "next";
import { ExamenZonePage, zoneMetadata } from "@/components/examen-zone-page";
import { listExamenZones } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return listExamenZones("echographie").map((zone) => ({ zone }));
}

export async function generateMetadata({ params }: { params: Promise<{ zone: string }> }): Promise<Metadata> {
  const { zone } = await params;
  return zoneMetadata("echographie", zone);
}

export default async function Page({ params }: { params: Promise<{ zone: string }> }) {
  const { zone } = await params;
  return <ExamenZonePage parent="echographie" zone={zone} />;
}
