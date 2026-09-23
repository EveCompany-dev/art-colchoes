"use client";

import { useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useScrollAnim } from "@/components/Smooth";
import IsoMattress, { productLayers } from "@/components/IsoMattress";
import Icon, { WhatsAppGlyph } from "@/components/Icon";
import { site, whatsappLink } from "@/lib/site";

// Estrelas geradas de forma determinística (mesmo resultado no servidor e no cliente)
const STARS = (() => {
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: 120 }, () => ({ x: rnd() * 100, y: rnd() * 100, s: rnd() * 1.8 + 0.4, o: rnd() * 0.6 + 0.2 }));
})();

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useScrollAnim(() => {
    const split = SplitText.create(".v2-h1", { type: "words,lines", mask: "lines", linesClass: "split-mask" });
    gsap
      .timeline({ defaults: { ease: "expo.out" } })
      .from(".v2-glow", { scale: 0.4, opacity: 0, duration: 2.2 }, 0)
      .from(split.words, { yPercent: 120, duration: 1.4, stagger: 0.06 }, 0.2)
      .from(".v2-matt", { y: 140, opacity: 0, rotate: -6, duration: 1.8 }, 0.3)
      .from(".v2-hero-meta > *", { y: 24, opacity: 0, stagger: 0.1, duration: 1 }, 0.9);

    // flutuação contínua do colchão e cintilar das estrelas
    gsap.to(".v2-float", { y: -18, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
    gsap.utils.toArray<HTMLElement>(".v2-star").forEach((s) => {
      gsap.to(s, { opacity: 0.1, duration: gsap.utils.random(1.2, 3.5), repeat: -1, yoyo: true, ease: "sine.inOut", delay: gsap.utils.random(0, 3) });
    });

    // saída no scroll
    gsap
      .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } })
      .to(".v2-matt", { scale: 1.35, y: 120, rotate: 4 }, 0)
      .to(".v2-copy", { y: -120, opacity: 0 }, 0)
      .to(".v2-glow", { scale: 1.6, opacity: 0.3 }, 0);

    return () => split.revert();
  }, root);

  return (
    <section ref={root} className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#070d1f] pt-24 pb-16 text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {STARS.map((s, i) => (
          <span key={i} className="v2-star absolute rounded-full bg-white" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, opacity: s.o }} />
        ))}
        <div className="v2-glow absolute top-1/2 left-[62%] size-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(47,107,255,0.35),rgba(47,107,255,0.08)_40%,transparent_65%)]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="v2-copy" data-speed="1.1">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-medium tracking-widest text-white/70 uppercase ring-1 ring-white/10">
            <Icon name="moon" className="size-4 text-[#9db8ff]" /> O maior showroom da região
          </p>
          <h1 className="v2-h1 font-display text-4xl leading-[1.08] sm:text-6xl lg:text-7xl">
            Durma melhor. Escolha deitando.
          </h1>
          <div className="v2-hero-meta mt-8 space-y-8">
            <p className="max-w-lg text-lg text-white/65">
              Mais de 25 colchões expostos, marcas como Pikolin, Herval e Mannes, direto de fábrica e com entrega e montagem grátis em Brusque e região.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={whatsappLink()} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-[#2f6bff] px-6 py-3.5 font-semibold transition hover:bg-white hover:text-[#070d1f]">
                <WhatsAppGlyph className="size-5" /> Falar com consultor
              </a>
              <a href="#tecnologia" className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold ring-1 ring-white/20 transition hover:bg-white/10">
                Ver a tecnologia <Icon name="arrowDown" className="size-4" />
              </a>
            </div>
            <p className="flex items-center gap-2 text-sm text-white/45">
              <Icon name="pin" className="size-4" /> {site.address.full}
            </p>
          </div>
        </div>

        <div className="v2-matt relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="v2-float">
            <IsoMattress layers={productLayers("#f4f1ea", "#1c2a52")} className="w-full drop-shadow-[0_40px_60px_rgba(47,107,255,0.25)]" title="Colchão Art Colchões" />
          </div>
        </div>
      </div>
    </section>
  );
}
