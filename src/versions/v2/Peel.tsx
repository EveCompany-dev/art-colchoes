"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScrollAnim } from "@/components/Smooth";
import IsoMattress from "@/components/IsoMattress";
import { cureLayers as layers } from "@/lib/products";

const n = layers.length;

// Variação do explicador: em vez de separar tudo, cada camada "descola" e voa,
// revelando a de baixo. Um contador gigante acompanha a camada atual.
export default function Peel() {
  const root = useRef<HTMLElement>(null);

  useScrollAnim(() => {
    const els = gsap.utils.toArray<SVGGElement>(".iso-layer").sort((a, b) => +a.dataset.index! - +b.dataset.index!);
    const texts = gsap.utils.toArray<HTMLElement>(".pl-text");
    const dots = gsap.utils.toArray<HTMLElement>(".pl-dot");
    gsap.set(texts.slice(1), { autoAlpha: 0, y: 40 });

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      scrollTrigger: { trigger: root.current, start: "top top", end: `+=${n * 38}%`, scrub: 1, pin: true },
    });

    tl.from(".pl-matt", { scale: 0.85, opacity: 0.4, duration: 0.6 });
    for (let k = 0; k < n; k++) {
      const t = 0.6 + k;
      // a camada atual brilha, depois voa para cima e some
      tl.to(els[k], { filter: "drop-shadow(0 0 18px rgba(47,107,255,0.9))", duration: 0.3 }, t)
        .to(texts[k], { autoAlpha: 0, y: -40, duration: 0.35 }, t + 0.1)
        .to(texts[k + 1], { autoAlpha: 1, y: 0, duration: 0.35 }, t + 0.35)
        .to(dots[k], { backgroundColor: "#2f6bff", scale: 1.4, duration: 0.2 }, t + 0.3)
        .to(".pl-count", { yPercent: (-100 * (k + 1)) / (n + 1), duration: 0.5 }, t + 0.2);
      if (k < n - 1) tl.to(els[k], { y: -260, x: 140, rotate: 8, transformOrigin: "50% 50%", opacity: 0, duration: 0.7, ease: "power2.in" }, t + 0.35);
    }
    // remonta o colchão no final
    tl.to(els, { y: 0, x: 0, rotate: 0, opacity: 1, filter: "none", duration: 0.8, stagger: { each: 0.05, from: "end" } }, n + 0.6);
  }, root);

  return (
    <section id="tecnologia" ref={root} className="relative h-[100svh] overflow-hidden bg-[#070d1f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(47,107,255,0.18),transparent_60%)]" />
      <div className="relative mx-auto grid h-full max-w-7xl grid-rows-[1fr_auto] items-center gap-6 px-5 pt-20 pb-8 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:grid-rows-1 lg:pt-0 lg:pb-0">
        <div className="pl-matt relative h-full min-h-0">
          <IsoMattress layers={layers} explodeRoom={40} className="absolute inset-0 m-auto size-full max-h-[70svh]" title="Camadas do colchão Pikolin Cure" />
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-[#9db8ff] uppercase">Por dentro do Pikolin Cure</p>
          <div className="mt-4 flex items-end gap-4">
            <div className="font-display h-[1.2em] overflow-hidden text-7xl leading-none sm:text-8xl" aria-hidden="true">
              <div className="pl-count">
                {["00", ...layers.map((_, i) => String(i + 1).padStart(2, "0"))].map((s) => (
                  <div key={s} className="flex h-[1.2em] items-center">{s}</div>
                ))}
              </div>
            </div>
            <span className="pb-2 text-sm text-white/40">/ {n}</span>
          </div>

          <div className="relative mt-6 min-h-[170px] sm:min-h-[190px]">
            <div className="pl-text absolute inset-0">
              <p className="font-display text-2xl sm:text-3xl">10 camadas. Uma noite perfeita.</p>
              <p className="mt-3 max-w-md text-white/60">Continue rolando para ver o que existe dentro de um colchão de alta tecnologia.</p>
            </div>
            {layers.map((l) => (
              <div key={l.name} className="pl-text absolute inset-0">
                <p className="font-display text-2xl sm:text-3xl">{l.name}</p>
                <p className="mt-3 max-w-md leading-relaxed text-white/60">{l.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-2" aria-hidden="true">
            {layers.map((l) => (
              <span key={l.name} className="pl-dot size-2 rounded-full bg-white/20" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
