import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import V3 from "@/versions/v3/V3";

export const metadata: Metadata = {
  title: "Loja de Colchões em Brusque/SC | Showroom Direto de Fábrica",
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <>
      <JsonLd />
      <V3 />
    </>
  );
}
