import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Home from "@/views/Home";

// Sem `title`: na raiz o template do layout não se aplica, então vale o título padrão completo.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <>
      <JsonLd withFaq={false} />
      <Home />
    </>
  );
}
