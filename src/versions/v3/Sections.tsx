"use client";

import { useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useScrollAnim } from "@/components/Smooth";
import Icon, { WhatsAppGlyph } from "@/components/Icon";
import ProductGrid from "@/components/ProductGrid";
import FirmnessGuide from "@/components/FirmnessGuide";
import Faq from "@/components/Faq";
import InstagramGrid from "@/components/InstagramGrid";
import { ContactInfo } from "@/components/Contact";
import ShowroomVideo from "@/components/ShowroomVideo";
import BrandLogos from "@/components/BrandLogos";
import { categories, cities, differentials, photos, site, stats, whatsappLink } from "@/lib/site";

const BLUE = "#1f4fff";

function Tag({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase ${light ? "text-white/60" : "text-black/50"}`}>
      <span className="size-2 rounded-full bg-[#1f4fff]" /> {children}
    </p>
  );
}

/* ---------------- Marquee de texto gigante controlado pelo scroll ---------------- */
export function ScrollMarquee() {
  const root = useRef<HTMLElement>(null);
  useScrollAnim(() => {
    gsap.fromTo(".mq-a", { xPercent: 0 }, { xPercent: -35, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.5 } });
    gsap.fromTo(".mq-b", { xPercent: -35 }, { xPercent: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.5 } });
  }, root);
  const a = categories.slice(0, 3).map((c) => c.name);
  const b = [...categories.slice(3).map((c) => c.name), "Sob medida"];
  const line = (items: string[]) => [...items, ...items, ...items].map((t, i) => (
    <span key={i} className="flex items-center gap-[4vw] pr-[4vw]">
      {t}
      <span className="inline-block size-[3vw] rounded-full bg-[#1f4fff]" />
    </span>
  ));
  return (
    <section ref={root} aria-label="Categorias" className="overflow-hidden bg-[#111] py-14 text-[#ebe4d8]">
      <div className="mq-a font-display flex w-max text-[9vw] leading-[1.1] whitespace-nowrap uppercase">{line(a)}</div>
      <div className="mq-b font-display flex w-max text-[9vw] leading-[1.1] whitespace-nowrap text-transparent uppercase [-webkit-text-stroke:1.5px_#ebe4d8]">{line(b)}</div>
    </section>
  );
}

/* ---------------- Manifesto: palavras acendem com o scroll ---------------- */
export function Manifesto() {
  const root = useRef<HTMLElement>(null);
  useScrollAnim(() => {
    const split = SplitText.create(".mf-text", { type: "words" });
    gsap.fromTo(split.words, { opacity: 0.12 }, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: ".mf-text", start: "top 80%", end: "bottom 45%", scrub: true } });
    gsap.utils.toArray<HTMLElement>(".mf-num").forEach((el) => {
      const obj = { v: 0 };
      gsap.to(obj, { v: +el.dataset.to!, duration: 2, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%" }, onUpdate: () => (el.textContent = Math.round(obj.v).toLocaleString("pt-BR")) });
    });
    return () => split.revert();
  }, root);
  return (
    <section id="sobre" ref={root} className="bg-[#ebe4d8] px-5 py-28 text-[#111] sm:px-8 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <Tag>Sobre nós</Tag>
        <p className="mf-text font-display mt-10 text-2xl leading-[1.35] sm:text-4xl lg:text-5xl">
          Há mais de 4 anos renovando confortos em Brusque. Somos uma loja especializada em colchões de alta tecnologia, com atendimento humanizado, mais de 25 colchões expostos, produtos a pronta entrega e condições especiais direto de fábrica.
        </p>
        <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-black/10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#ebe4d8] p-6 sm:p-8">
              <dd className="font-display text-4xl sm:text-5xl">
                <span className="mf-num" data-to={s.value}>0</span>
                <span className="text-[#1f4fff]">{s.suffix}</span>
              </dd>
              <dt className="mt-2 text-sm text-black/55">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------------- Diferenciais: linhas gigantes com hover ---------------- */
export function BigList() {
  const root = useRef<HTMLElement>(null);
  useScrollAnim(() => {
    gsap.utils.toArray<HTMLElement>(".bl-row").forEach((row) => {
      gsap.from(row.querySelectorAll(".bl-in"), { yPercent: 100, duration: 1, ease: "expo.out", stagger: 0.06, scrollTrigger: { trigger: row, start: "top 88%" } });
      gsap.from(row, { "--line": "0%", duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: row, start: "top 88%" } });
    });
  }, root);
  return (
    <section id="showroom" ref={root} className="bg-[#ebe4d8] px-5 pb-28 text-[#111] sm:px-8 sm:pb-40">
      <div className="mx-auto max-w-7xl">
        <Tag>Por que a Art</Tag>
        <ul className="mt-10">
          {differentials.map((d, i) => (
            <li
              key={d.title}
              className="bl-row group relative overflow-hidden border-t border-black/15 [--line:100%] before:absolute before:top-[-1px] before:left-0 before:h-px before:w-[var(--line)] before:bg-black"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-[#1f4fff] transition-transform duration-500 ease-out group-hover:scale-y-100" />
              <div className="relative grid gap-3 py-8 transition-colors duration-500 group-hover:text-white sm:grid-cols-[80px_1fr_1fr] sm:items-center sm:py-10">
                <span className="overflow-hidden"><span className="bl-in font-display block text-sm">{String(i + 1).padStart(2, "0")}</span></span>
                <span className="overflow-hidden"><span className="bl-in font-display block text-2xl sm:text-4xl">{d.title}</span></span>
                <span className="overflow-hidden"><span className="bl-in block text-black/60 transition-colors group-hover:text-white/85 sm:text-lg">{d.text}</span></span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Produtos ---------------- */
export function Products() {
  const root = useRef<HTMLElement>(null);
  useScrollAnim(() => {
    gsap.from(".prod-card", { y: 80, opacity: 0, stagger: 0.06, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".prod-card", start: "top 85%" } });
  }, root);
  return (
    <section id="produtos" ref={root} className="bg-[#ebe4d8] px-5 py-28 text-[#111] sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Tag>Colchões</Tag>
            <h2 className="font-display mt-6 text-3xl leading-tight sm:text-5xl">Pikolin e Mannes no showroom.</h2>
          </div>
          <p className="max-w-sm text-black/60">Filtre por marca ou tecnologia e consulte valores e condições direto de fábrica pelo WhatsApp.</p>
        </div>
        <div className="mt-12">
          <ProductGrid filterBy="line" accent={BLUE} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Showroom com parallax em camadas ---------------- */
export function Showroom() {
  const root = useRef<HTMLElement>(null);
  useScrollAnim(() => {
    gsap.utils.toArray<HTMLElement>(".sr-img").forEach((el) => {
      gsap.fromTo(el, { clipPath: "inset(20% 20% 20% 20% round 32px)" }, { clipPath: "inset(0% 0% 0% 0% round 24px)", ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "center center", scrub: true } });
    });
  }, root);
  return (
    <section ref={root} className="relative overflow-hidden bg-[#ebe4d8] px-5 pb-28 text-[#111] sm:px-8 sm:pb-40">
      <p className="font-display pointer-events-none absolute top-24 left-0 w-full text-center text-[22vw] leading-none text-black/[0.05]" data-speed="0.7" aria-hidden="true">
        25+
      </p>
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:pt-40" data-speed="1.1">
            <div className="sr-img relative overflow-hidden">
              <ShowroomVideo className="aspect-[4/5]" />
              <span className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur">
                <span className="size-2 animate-pulse rounded-full bg-red-500" /> Tour pelo showroom
              </span>
            </div>
          </div>
          <div data-speed="0.92">
            <Tag>Showroom</Tag>
            <h2 className="font-display mt-6 mb-10 text-3xl leading-tight sm:text-5xl">Mais de 25 colchões para deitar e comparar.</h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos.blackSignatureSm} alt="Colchão Pikolin Black Signature Medium no showroom" loading="lazy" className="sr-img aspect-[4/5] w-full object-cover" />
          </div>
        </div>
        <BrandLogos className="mt-20" />
      </div>
    </section>
  );
}

/* ---------------- Guia ---------------- */
export function Guide() {
  return (
    <section className="bg-[#111] px-5 py-28 text-white sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Tag light>Guia de conforto</Tag>
        <h2 className="font-display mt-6 mb-12 max-w-3xl text-3xl leading-tight sm:text-5xl">Macio, médio ou firme?</h2>
        <FirmnessGuide theme="dark" accent={BLUE} />
      </div>
    </section>
  );
}

/* ---------------- Região: cidades em lista gigante ---------------- */
export function Region() {
  const root = useRef<HTMLElement>(null);
  useScrollAnim(() => {
    gsap.fromTo(".rg-city", { opacity: 0.12, y: 20 }, { opacity: 1, y: 0, stagger: 0.08, ease: "none", scrollTrigger: { trigger: ".rg-city", start: "top 85%", end: "top 35%", scrub: true } });
    gsap.from(".ct-card", { y: 50, opacity: 0, stagger: 0.1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".ct-card", start: "top 85%" } });
  }, root);
  return (
    <section id="contato" ref={root} className="overflow-hidden bg-[#ebe4d8] px-5 py-28 text-[#111] sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <Tag>Entrega e montagem grátis</Tag>
        <p className="font-display mt-10 text-3xl leading-snug sm:text-5xl">
          {cities.map((c, i) => (
            <span key={c} className={`rg-city inline-block pr-[0.4em] ${i === 0 ? "text-[#1f4fff]" : ""}`}>
              {c}
              {i < cities.length - 1 && <span className="text-black/25"> /</span>}
            </span>
          ))}
        </p>
        <div className="mt-16">
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ + Instagram ---------------- */
export function FaqInsta() {
  return (
    <section className="bg-[#ebe4d8] px-5 pb-28 text-[#111] sm:px-8 sm:pb-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Tag>FAQ</Tag>
            <h2 className="font-display mt-6 text-3xl leading-tight sm:text-4xl">Tire suas dúvidas.</h2>
          </div>
          <Faq />
        </div>
        <div className="mt-28">
          <InstagramGrid />
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA final com botão magnético ---------------- */
export function FinalCta() {
  const root = useRef<HTMLElement>(null);
  useScrollAnim(() => {
    const split = SplitText.create(".fc3-title", { type: "chars" });
    gsap.from(split.chars, { yPercent: 120, rotate: 12, opacity: 0, stagger: 0.03, duration: 1, ease: "back.out(1.6)", scrollTrigger: { trigger: root.current, start: "top 65%" } });
    return () => split.revert();
  }, root);
  const magnet = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(e.currentTarget.firstElementChild, { x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4, ease: "power3.out" });
  };
  const release = (e: React.MouseEvent<HTMLElement>) => gsap.to(e.currentTarget.firstElementChild, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1,0.4)" });
  return (
    <section ref={root} className="bg-[#1f4fff] px-5 py-28 text-white sm:px-8 sm:py-40">
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <h2 className="fc3-title font-display text-[13vw] leading-none sm:text-[10vw]">Boa noite.</h2>
        <p className="mt-8 max-w-xl text-lg text-white/80">Venha deitar no maior showroom da região. {site.address.full}.</p>
        <div className="mt-12 p-6" onMouseMove={magnet} onMouseLeave={release}>
          <a href={whatsappLink()} target="_blank" rel="noopener" className="inline-flex size-44 flex-col items-center justify-center gap-2 rounded-full bg-white text-[#111] shadow-2xl transition-colors hover:bg-[#25D366] hover:text-white sm:size-52">
            <WhatsAppGlyph className="size-8" />
            <span className="font-semibold">Chamar no WhatsApp</span>
          </a>
        </div>
        <a href={site.address.mapsUrl} target="_blank" rel="noopener" className="mt-6 inline-flex items-center gap-2 text-white/80 underline-offset-4 hover:underline">
          <Icon name="pin" className="size-4" /> Como chegar
        </a>
      </div>
    </section>
  );
}
