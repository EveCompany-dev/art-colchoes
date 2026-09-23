"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { whatsappLink } from "@/lib/site";
import { WhatsAppGlyph } from "./Icon";

// Botão flutuante (fora do ScrollSmoother, por isso fica fixo de verdade).
export default function WhatsAppFloat({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      gsap.from(ref.current, { scale: 0, rotate: -90, duration: 0.8, delay: 1.6, ease: "back.out(2)" });
      gsap.to(".wa-ring", { scale: 1.9, opacity: 0, duration: 1.8, repeat: -1, ease: "power1.out", stagger: 0.9 });
    },
    { scope: ref },
  );

  return (
    <a
      ref={ref}
      href={whatsappLink()}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      className={`group fixed right-4 bottom-4 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-110 sm:right-6 sm:bottom-6 sm:size-16 ${className}`}
    >
      <span className="wa-ring absolute inset-0 rounded-full bg-[#25D366]/60" />
      <span className="wa-ring absolute inset-0 rounded-full bg-[#25D366]/60" />
      <WhatsAppGlyph className="relative size-7 sm:size-8" />
      <span className="pointer-events-none absolute right-full mr-3 translate-x-2 rounded-full bg-white px-3 py-1.5 text-sm font-medium whitespace-nowrap text-neutral-900 opacity-0 shadow transition group-hover:translate-x-0 group-hover:opacity-100">
        Fale com um consultor
      </span>
    </a>
  );
}
