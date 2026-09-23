"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { useScrollAnim } from "@/components/Smooth";
import Icon, { WhatsAppGlyph } from "@/components/Icon";
import { ProductCard } from "@/components/ProductGrid";
import FirmnessGuide from "@/components/FirmnessGuide";
import ShowroomVideo from "@/components/ShowroomVideo";
import Faq from "@/components/Faq";
import InstagramGrid from "@/components/InstagramGrid";
import { CityList, ContactInfo } from "@/components/Contact";
import { products, techHighlights } from "@/lib/products";
import { brands, categories, differentials, photos, stats, whatsappLink } from "@/lib/site";

const BLUE = "#2f6bff";

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold tracking-[0.3em] text-[#9db8ff] uppercase">{children}</p>;
}

/** Títulos com palavras que sobem e "acendem" (de azul para branco). */
function useGlowTitles(scope: React.RefObject<HTMLElement | null>) {
  useScrollAnim(() => {
    const splits = gsap.utils.toArray<HTMLElement>(".glow-title").map((el) => {
      const s = SplitText.create(el, { type: "words", mask: "words" });
      gsap.from(s.words, {
        yPercent: 100,
        color: BLUE,
        stagger: 0.05,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
      return s;
    });
    return () => splits.forEach((s) => s.revert());
  }, scope);
}

/* ---------------- Diferenciais em cards empilhados ---------------- */
export function StackCards() {
  const root = useRef<HTMLElement>(null);
  useGlowTitles(root);
  useScrollAnim(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".stk-card");
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      ScrollTrigger.create({
        trigger: card,
        start: `top ${90 + i * 24}px`,
        endTrigger: ".stk-list",
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
      });
      gsap.to(card.querySelector(".stk-inner"), {
        scale: 0.9 + i * 0.02,
        opacity: 0.5,
        ease: "none",
        scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: `top ${90 + (i + 1) * 24}px`, scrub: true },
      });
    });
  }, root);

  return (
    <section id="showroom" ref={root} className="bg-[#070d1f] px-5 py-24 text-white sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Kicker>Por que a Art Colchões</Kicker>
        <h2 className="glow-title font-display mt-5 max-w-3xl text-3xl leading-tight sm:text-5xl">Cinco motivos para sair daqui dormindo melhor.</h2>
        <div className="stk-list mt-16 space-y-6 pb-[8vh]">
          {differentials.map((d, i) => (
            <article key={d.title} className="stk-card">
              <div
                className="stk-inner relative grid min-h-[250px] overflow-hidden rounded-[2rem] p-8 ring-1 ring-white/10 sm:grid-cols-[1fr_auto] sm:p-12"
                style={{ background: `linear-gradient(135deg, ${["#13244b", "#0f1d3d", "#1a2d5c", "#112249", "#16275a"][i]}, #0a1228)` }}
              >
                <div className="flex flex-col justify-between gap-10">
                  <span className="font-display text-sm text-[#9db8ff]">{String(i + 1).padStart(2, "0")} / 05</span>
                  <div>
                    <h3 className="font-display text-2xl sm:text-4xl">{d.title}</h3>
                    <p className="mt-4 max-w-lg text-lg text-white/60">{d.text}</p>
                  </div>
                </div>
                <span className="mt-8 grid size-24 place-items-center self-end rounded-full bg-[#2f6bff]/15 text-[#9db8ff] ring-1 ring-[#2f6bff]/30 sm:mt-0 sm:size-32">
                  <Icon name={d.icon} className="size-10 sm:size-14" strokeWidth={1.2} />
                </span>
                <span className="pointer-events-none absolute -right-20 -bottom-20 size-72 rounded-full bg-[#2f6bff]/10 blur-3xl" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Cross System x Normablock (DrawSVG) ---------------- */
function CrossArt() {
  // molas ensacadas: coluna de bobinas independentes
  return (
    <svg viewBox="0 0 220 140" className="w-full" aria-hidden="true">
      {Array.from({ length: 5 }, (_, k) => {
        const x = 22 + k * 44;
        const d = `M${x} 128 ` + Array.from({ length: 8 }, (_, j) => `C${x + 16} ${122 - j * 14} ${x + 16} ${114 - j * 14} ${x} ${114 - j * 14} C${x - 16} ${114 - j * 14} ${x - 16} ${106 - j * 14} ${x} ${106 - j * 14}`).join(" ");
        return <path key={k} className="draw" d={d} fill="none" stroke={k === 2 ? BLUE : "#9db8ff"} strokeWidth="2" strokeLinecap="round" />;
      })}
    </svg>
  );
}
function NormaArt() {
  // mola contínua em Z
  const d = "M10 120 " + Array.from({ length: 9 }, (_, j) => `L${20 + j * 22} ${j % 2 ? 120 : 20}`).join(" ") + " L210 120";
  return (
    <svg viewBox="0 0 220 140" className="w-full" aria-hidden="true">
      <path className="draw" d={d} fill="none" stroke="#9db8ff" strokeWidth="2" strokeLinejoin="round" />
      <path className="draw" d={d.replace(/ 20/g, " 30").replace(/ 120/g, " 110")} fill="none" stroke={BLUE} strokeWidth="2" strokeLinejoin="round" opacity="0.7" />
      <path className="draw" d="M10 128 H210 M10 12 H210" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="2" />
    </svg>
  );
}

export function SpringCompare() {
  const root = useRef<HTMLElement>(null);
  useGlowTitles(root);
  useScrollAnim(() => {
    gsap.utils.toArray<HTMLElement>(".cmp-card").forEach((card) => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 80%" } });
      tl.from(card, { y: 60, opacity: 0, duration: 0.9, ease: "power3.out" })
        .from(card.querySelectorAll(".draw"), { drawSVG: "0%", duration: 1.8, stagger: 0.12, ease: "power2.inOut" }, 0.2)
        .from(card.querySelectorAll(".cmp-in"), { y: 20, opacity: 0, stagger: 0.08, duration: 0.6 }, 0.6);
    });
  }, root);

  const [cross, norma, copper] = techHighlights;
  return (
    <section ref={root} className="bg-[#070d1f] px-5 py-24 text-white sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Kicker>Destaque Pikolin · Líder do descanso na Europa</Kicker>
        <h2 className="glow-title font-display mt-5 max-w-4xl text-3xl leading-tight sm:text-5xl">O maior suporte do mercado, em duas tecnologias exclusivas.</h2>
        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {[
            { t: cross, art: <CrossArt /> },
            { t: norma, art: <NormaArt /> },
          ].map(({ t, art }) => (
            <article key={t.name} className="cmp-card rounded-[2rem] bg-white/[0.04] p-8 ring-1 ring-white/10 sm:p-10">
              <div className="rounded-2xl bg-[#0a1228] p-6">{art}</div>
              <p className="cmp-in mt-8 text-xs font-semibold tracking-widest text-white/40 uppercase">{t.kicker}</p>
              <div className="cmp-in mt-2 flex flex-wrap items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl sm:text-3xl">{t.name}</h3>
                <p className="font-display text-3xl text-[#2f6bff]">{t.metric} <span className="font-sans text-sm text-white/50">{t.metricLabel}</span></p>
              </div>
              <p className="cmp-in mt-4 leading-relaxed text-white/60">{t.text}</p>
            </article>
          ))}
        </div>
        <div className="cmp-card mt-5 flex flex-col items-start gap-6 rounded-[2rem] bg-gradient-to-r from-[#b8622f]/25 to-transparent p-8 ring-1 ring-[#e0894f]/25 sm:flex-row sm:items-center sm:p-10">
          <span className="cmp-in font-display grid size-20 shrink-0 place-items-center rounded-2xl bg-[#c4703a] text-2xl">Cu</span>
          <div className="cmp-in">
            <h3 className="font-display text-2xl">{copper.name}</h3>
            <p className="mt-2 max-w-2xl text-white/65">{copper.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Produtos: galeria horizontal ---------------- */
export function ProductRail() {
  const root = useRef<HTMLElement>(null);
  useGlowTitles(root);
  useScrollAnim(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const track = root.current!.querySelector<HTMLElement>(".rail")!;
      const dist = () => track.scrollWidth - window.innerWidth + 64;
      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: { trigger: ".rail-pin", start: "center center", end: () => `+=${dist()}`, scrub: 1, pin: true, invalidateOnRefresh: true },
      });
      gsap.utils.toArray<HTMLElement>(".rail-item").forEach((el) => {
        gsap.fromTo(el, { rotateY: -25, opacity: 0.3, scale: 0.9 }, {
          rotateY: 0, opacity: 1, scale: 1, ease: "none",
          scrollTrigger: { trigger: el, containerAnimation: tween, start: "left 100%", end: "left 60%", scrub: true },
        });
      });
      gsap.to(".rail-progress", { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".rail-pin", start: "center center", end: () => `+=${dist()}`, scrub: true } });
    });
  }, root);

  return (
    <section id="produtos" ref={root} className="overflow-hidden bg-[#0a1228] py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Kicker>Colchões em destaque</Kicker>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <h2 className="glow-title font-display max-w-3xl text-3xl leading-tight sm:text-5xl">Deslize pelo nosso showroom.</h2>
          <ul className="flex flex-wrap gap-2 text-xs text-white/60">
            {categories.map((c) => (
              <li key={c.slug} className="rounded-full px-3 py-1.5 ring-1 ring-white/15">{c.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="rail-pin mt-14">
        <div className="no-scrollbar overflow-x-auto md:overflow-visible">
          <div className="rail flex w-max gap-5 px-5 [perspective:1200px] sm:px-8">
            {products.map((p) => (
              <div key={p.slug} className="rail-item w-[78vw] shrink-0 sm:w-[300px]">
                <ProductCard p={p} theme="dark" accent={BLUE} />
              </div>
            ))}
            <a href={whatsappLink("Olá! Quero ver o catálogo completo de colchões, bases e cabeceiras.")} target="_blank" rel="noopener" className="rail-item grid w-[78vw] shrink-0 place-items-center rounded-3xl bg-[#2f6bff] p-10 text-center sm:w-[340px]">
              <span>
                <span className="font-display block text-2xl">Catálogo completo</span>
                <span className="mt-3 block text-white/80">Bases box, baú, cabeceiras, travesseiros e cama & banho.</span>
                <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#070d1f]">
                  <WhatsAppGlyph className="size-4" /> Pedir no WhatsApp
                </span>
              </span>
            </a>
          </div>
        </div>
        <div className="mx-auto mt-10 hidden h-px max-w-7xl bg-white/10 md:block">
          <div className="rail-progress h-full bg-[#2f6bff]" style={{ transform: "scaleX(0)", transformOrigin: "left" }} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Showroom: revelações em máscara ---------------- */
export function ShowroomReveal() {
  const root = useRef<HTMLElement>(null);
  useGlowTitles(root);
  useScrollAnim(() => {
    gsap.utils.toArray<HTMLElement>(".wipe").forEach((el, i) => {
      const img = el.querySelector("img, video");
      gsap.timeline({ scrollTrigger: { trigger: el, start: "top 80%" } })
        .fromTo(el, { clipPath: i % 2 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0%)", duration: 1.5, ease: "expo.inOut" })
        .from(img, { scale: 1.4, duration: 2, ease: "expo.out" }, 0.2);
      gsap.to(img, { yPercent: 12, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    });
  }, root);
  return (
    <section ref={root} className="bg-[#070d1f] px-5 py-24 text-white sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Kicker>Showroom</Kicker>
        <h2 className="glow-title font-display mt-5 max-w-3xl text-3xl leading-tight sm:text-5xl">Ambientes que parecem o seu quarto.</h2>
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          <figure className="wipe relative col-span-2 row-span-2 overflow-hidden rounded-[2rem] md:col-span-1">
            <ShowroomVideo className="aspect-[9/16]" />
            <figcaption className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-xs backdrop-blur">
              <span className="size-2 animate-pulse rounded-full bg-red-500" /> Tour pelo showroom
            </figcaption>
          </figure>
          <figure className="wipe relative col-span-2 overflow-hidden rounded-[2rem] md:col-span-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos.showroom} alt="Colchões expostos no showroom da Art Colchões" loading="lazy" className="aspect-[16/10] size-full object-cover" />
            <figcaption className="absolute bottom-5 left-5 rounded-full bg-black/50 px-4 py-2 text-sm backdrop-blur">Mais de 25 colchões expostos</figcaption>
          </figure>
          <figure className="wipe relative overflow-hidden rounded-[2rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos.blackSignatureSm} alt="Colchão Pikolin Black Signature Medium" loading="lazy" className="aspect-[3/4] size-full object-cover" />
            <figcaption className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1.5 text-xs backdrop-blur">Pikolin Black Signature</figcaption>
          </figure>
          <figure className="wipe relative overflow-hidden rounded-[2rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos.camaBanho} alt="Espaço de cama e banho" loading="lazy" className="aspect-[3/4] size-full object-cover" />
            <figcaption className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1.5 text-xs backdrop-blur">Cama & Banho</figcaption>
          </figure>
          <div className="col-span-2 flex flex-col justify-between rounded-[2rem] bg-[#2f6bff] p-8 md:col-span-1">
            <Icon name="showroom" className="size-10" />
            <div>
              <p className="font-display text-2xl">Venha deitar, testar e comparar.</p>
              <p className="mt-3 text-white/80">Atendimento humanizado, com indicação para o seu biotipo.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Marcas ---------------- */
export function BrandWall() {
  const root = useRef<HTMLElement>(null);
  useScrollAnim(() => {
    gsap.from(".bw-item", { y: 40, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 85%" } });
  }, root);
  return (
    <section ref={root} aria-label="Marcas" className="bg-[#070d1f] px-5 pb-24 text-white sm:px-8">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-3 md:grid-cols-4">
        {brands.map((b) => (
          <li key={b.name} className="bw-item grid h-28 place-items-center rounded-2xl bg-white p-6 transition-shadow hover:shadow-[0_20px_60px_rgba(47,107,255,0.35)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.logo} alt={b.name} loading="lazy" className="max-h-12 w-auto max-w-full" />
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- Guia ---------------- */
export function Guide() {
  const root = useRef<HTMLElement>(null);
  useGlowTitles(root);
  return (
    <section ref={root} className="bg-[#0a1228] px-5 py-24 text-white sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Kicker>Guia de conforto</Kicker>
        <h2 className="glow-title font-display mt-5 mb-12 max-w-3xl text-3xl leading-tight sm:text-5xl">Descubra a firmeza ideal em 10 segundos.</h2>
        <FirmnessGuide theme="dark" accent={BLUE} />
      </div>
    </section>
  );
}

/* ---------------- Sobre: foto revelada em círculo ---------------- */
export function About() {
  const root = useRef<HTMLElement>(null);
  useGlowTitles(root);
  useScrollAnim(() => {
    gsap.fromTo(
      ".ab-circle",
      { clipPath: "circle(18% at 50% 50%)" },
      { clipPath: "circle(75% at 50% 50%)", ease: "none", scrollTrigger: { trigger: ".ab-wrap", start: "top 85%", end: "center 40%", scrub: true } },
    );
    gsap.fromTo(".ab-circle img", { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".ab-wrap", start: "top bottom", end: "bottom top", scrub: true } });
    gsap.utils.toArray<HTMLElement>(".v2-num").forEach((num) => {
      const obj = { v: 0 };
      gsap.to(obj, { v: +num.dataset.to!, duration: 2, ease: "power2.out", scrollTrigger: { trigger: num, start: "top 90%" }, onUpdate: () => (num.textContent = Math.round(obj.v).toLocaleString("pt-BR")) });
    });
  }, root);
  return (
    <section id="sobre" ref={root} className="bg-[#070d1f] px-5 py-24 text-white sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div className="ab-wrap">
          <div className="ab-circle aspect-square overflow-hidden rounded-[2rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos.fachada} alt="Fachada da Art Colchões em Brusque" loading="lazy" className="size-full object-cover" />
          </div>
        </div>
        <div>
          <Kicker>Sobre nós</Kicker>
          <h2 className="glow-title font-display mt-5 text-3xl leading-tight sm:text-5xl">4 anos, 2 mil colchões, um jeito humano de vender.</h2>
          <p className="mt-8 text-lg leading-relaxed text-white/65">
            A Art Colchões é uma loja especializada em colchões com alta tecnologia. Priorizamos um atendimento humanizado, com mais de 25 colchões expostos no showroom, produtos a pronta entrega e condições especiais de pagamento direto de fábrica.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-white/65">Trabalhamos com Pikolin, Mannes, Herval e D&apos;Angelis, com as melhores negociações da região.</p>
          <dl className="mt-10 grid grid-cols-2 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="border-t border-white/10 pt-4">
                <dd className="font-display text-3xl sm:text-4xl">
                  <span className="v2-num" data-to={s.value}>0</span>
                  <span className="text-[#2f6bff]">{s.suffix}</span>
                </dd>
                <dt className="mt-1 text-sm text-white/50">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ + contato ---------------- */
export function FaqContact() {
  const root = useRef<HTMLElement>(null);
  useGlowTitles(root);
  useScrollAnim(() => {
    gsap.from(".city-chip", { opacity: 0, y: 20, stagger: { each: 0.04, from: "random" }, duration: 0.6, scrollTrigger: { trigger: ".city-chip", start: "top 90%" } });
    gsap.from(".ct-card", { y: 50, opacity: 0, stagger: 0.1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".ct-card", start: "top 85%" } });
  }, root);
  return (
    <section ref={root} className="bg-[#0a1228] px-5 py-24 text-white sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Kicker>Dúvidas frequentes</Kicker>
            <h2 className="glow-title font-display mt-5 text-3xl leading-tight sm:text-4xl">Perguntas que todo mundo faz.</h2>
          </div>
          <Faq theme="dark" />
        </div>

        <div id="contato" className="mt-32 grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <Kicker>Onde estamos</Kicker>
            <h2 className="glow-title font-display mt-5 text-3xl leading-tight sm:text-5xl">Entrega e montagem grátis na região.</h2>
          </div>
          <CityList theme="dark" />
        </div>
        <div className="mt-14">
          <ContactInfo theme="dark" />
        </div>
        <div className="mt-24">
          <InstagramGrid theme="dark" />
        </div>
      </div>
    </section>
  );
}
