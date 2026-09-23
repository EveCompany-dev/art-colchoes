"use client";

import { useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useScrollAnim } from "@/components/Smooth";
import Icon from "@/components/Icon";
import { photos, site } from "@/lib/site";

const START_CLIP = "inset(56% 6% 12% 44% round 24px)";

// Hero: título gigante + foto da fachada que cresce até ocupar a tela (clip-path scrub).
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useScrollAnim(() => {
    const split = SplitText.create(".h1-line", { type: "chars", mask: "chars" });
    const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
    intro
      .from(split.chars, { yPercent: 110, duration: 1.3, stagger: 0.025 })
      .from(".hero-photo", { clipPath: "inset(50% 50% 50% 50% round 24px)", duration: 1.4, ease: "expo.inOut" }, 0.2)
      .from(".hero-meta > *", { y: 20, opacity: 0, stagger: 0.08, duration: 0.9 }, 0.8);

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root.current, start: "top top", end: "+=100%", scrub: 1, pin: true },
    });
    tl.fromTo(".hero-photo", { clipPath: START_CLIP }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.inOut", immediateRender: false }, 0)
      .fromTo(".hero-photo img", { scale: 1.25 }, { scale: 1, ease: "power2.inOut" }, 0)
      .to(".hero-title", { yPercent: -60, opacity: 0, ease: "power2.in" }, 0)
      .to(".hero-meta", { opacity: 0, y: -40 }, 0)
      .fromTo(".hero-over", { opacity: 0 }, { opacity: 1 }, 0.55)
      .from(".hero-over > *", { y: 60, opacity: 0, stagger: 0.08 }, 0.6);

    return () => split.revert();
  }, root);

  return (
    <section ref={root} className="relative h-[100svh] overflow-hidden bg-cream text-navy">
      <div
        className="hero-photo absolute inset-0 overflow-hidden"
        style={{ clipPath: START_CLIP }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photos.fachada} alt="Fachada da Art Colchões na Rodovia Antônio Heil, Brusque" className="size-full object-cover object-[50%_40%]" />
        <div className="hero-over absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy/90 via-navy/30 to-transparent p-6 pb-16 text-white opacity-0 sm:p-12 sm:pb-20">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70">Loja direto de fábrica · Brusque/SC</p>
          <p className="font-display mt-4 max-w-4xl text-3xl sm:text-5xl lg:text-6xl">Mais de 25 colchões expostos para você deitar, testar e comparar.</p>
          <a href="#showroom" className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-navy transition hover:bg-copper hover:text-white">
            Conheça o showroom <Icon name="arrowDown" className="size-4" />
          </a>
        </div>
      </div>

      <div className="hero-title relative z-10 mx-auto max-w-7xl px-5 pt-28 sm:px-8 sm:pt-32">
        <h1 className="font-display text-[9.6vw] leading-[0.98] tracking-tight whitespace-nowrap uppercase lg:text-[8vw]">
          <span className="h1-line block">O maior</span>
          <span className="h1-line block text-copper">showroom</span>
          <span className="sr-only"> de colchões </span>
          <span className="h1-line block">da região</span>
        </h1>
      </div>

      <div className="hero-meta absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-5 pb-6 text-sm sm:px-8">
        <p className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 backdrop-blur"><Icon name="pin" className="size-4" /> {site.address.full}</p>
        <p className="hidden items-center gap-2 text-navy/60 sm:flex">Role para entrar <Icon name="arrowDown" className="size-4 animate-bounce" /></p>
      </div>
    </section>
  );
}
