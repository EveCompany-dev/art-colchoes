"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScrollAnim } from "@/components/Smooth";
import Icon, { WhatsAppGlyph } from "@/components/Icon";
import { photos, site, whatsappLink } from "@/lib/site";

// Hero: a palavra ART (tipografia do logo) preenchida com a foto da loja.
// No scroll ela cresce até "atravessarmos" a letra e entrarmos na foto.
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useScrollAnim(() => {
    // (sem SplitText aqui: letras separadas quebram o background-clip: text)
    gsap
      .timeline({ defaults: { ease: "expo.out" } })
      .from(".v3-art", { yPercent: 25, opacity: 0, duration: 2 })
      .from(".v3-sub > *", { y: 30, opacity: 0, stagger: 0.08, duration: 1 }, 0.6);

    // o zoom mira a haste do "R", assim a tela é preenchida pela foto (e não pelo vão entre letras)
    const art = root.current!.querySelector<HTMLElement>(".v3-art")!;
    const r = art.querySelector<HTMLElement>(".v3-r")!;
    const origin = () => {
      const a = art.getBoundingClientRect();
      const b = r.getBoundingClientRect();
      return `${((b.left - a.left + b.width * 0.09) / a.width) * 100}% 55%`;
    };
    gsap.set(art, { transformOrigin: origin() });

    gsap
      .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=110%", scrub: 1, pin: true } })
      .to(".v3-sub", { opacity: 0, y: -40, duration: 0.2 }, 0)
      .to(".v3-art", { scale: 60, ease: "power3.in", duration: 1 }, 0)
      .to(".v3-photo", { opacity: 1, duration: 0.25 }, 0.6)
      .fromTo(".v3-photo img", { scale: 1.5 }, { scale: 1, duration: 0.6, ease: "power2.out" }, 0.6)
      .from(".v3-over > *", { y: 80, opacity: 0, stagger: 0.06, duration: 0.3 }, 0.85);
  }, root);

  return (
    <section ref={root} className="relative h-[100svh] overflow-hidden bg-[#ebe4d8] text-[#111]">
      <div className="absolute inset-0 grid place-items-center">
        <h1 className="sr-only">Art Colchões: o maior showroom de colchões da região, em Brusque/SC</h1>
        <p
          aria-hidden="true"
          className="v3-art font-display bg-[url(/img/fachada-960.webp)] bg-cover bg-[position:50%_45%] bg-clip-text text-[30vw] leading-none text-transparent will-change-transform"
        >
          A<span className="v3-r">R</span>T
        </p>
      </div>

      <div className="v3-sub absolute inset-x-0 bottom-0 mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-5 pb-8 sm:px-8">
        <p className="font-display text-2xl sm:text-4xl">Colchões</p>
        <p className="max-w-xs text-sm text-black/60">
          O maior showroom da região. Loja direto de fábrica em Brusque/SC.
        </p>
        <p className="flex items-center gap-2 text-sm">
          Role <Icon name="arrowDown" className="size-4 animate-bounce" />
        </p>
      </div>

      <div className="v3-photo absolute inset-0 opacity-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photos.fachada} alt="Fachada da Art Colchões" className="size-full object-cover" />
        <div className="v3-over absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 pb-14 text-white sm:p-12">
          <p className="text-xs font-semibold tracking-[0.3em] text-white/70 uppercase">{site.address.full}</p>
          <p className="font-display mt-4 max-w-5xl text-3xl leading-tight sm:text-6xl">O maior showroom de colchões da região.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={whatsappLink()} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-[#1f4fff] px-6 py-3.5 font-semibold transition hover:bg-white hover:text-black">
              <WhatsAppGlyph className="size-5" /> Falar com consultor
            </a>
            <a href="#tecnologia" className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold ring-1 ring-white/40 transition hover:bg-white hover:text-black">
              Anatomia do colchão
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
