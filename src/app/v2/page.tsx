import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import V2 from "@/versions/v2/V2";

export const metadata: Metadata = {
  title: "Colchões em Brusque | O Maior Showroom da Região",
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <>
      <JsonLd />
      <V2 />
    </>
  );
}
