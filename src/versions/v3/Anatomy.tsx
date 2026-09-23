"use client";

import { useRef, useState } from "react";
import { gsap, ScrollSmoother, ScrollTrigger } from "@/lib/gsap";
import { useScrollAnim } from "@/components/Smooth";
import { cureLayers as layers } from "@/lib/products";

// Corte frontal "explodido", como no site da Pikolin: camadas curvas empilhadas,
// numeradas no centro. O scroll abre o colchão e percorre as camadas; clicar em
// um número leva o scroll até aquela camada.

const WIDTH = 600;
const SAG = 26; // curvatura (bordas mais altas que o centro)
const SCALE = 1.5; // espessura -> unidades do SVG
const GAP = 20; // espaço entre camadas quando aberto
const n = layers.length;

const heights = layers.map((l) => Math.max(8, l.t * SCALE));
const closedY = heights.map((_, i) => heights.slice(0, i).reduce((a, b) => a + b, 0));
const totalH = closedY[n - 1] + heights[n - 1];
const openH = totalH + GAP * (n - 1);

function slab(h: number) {
  // borda superior e inferior curvas, pontas arredondadas
  return `M8 0 Q${WIDTH / 2} ${SAG * 2} ${WIDTH - 8} 0 Q${WIDTH} 0 ${WIDTH} ${h / 2} Q${WIDTH} ${h} ${WIDTH - 8} ${h} Q${WIDTH / 2} ${h + SAG * 2} 8 ${h} Q0 ${h} 0 ${h / 2} Q0 0 8 0Z`;
}

export default function Anatomy() {
  const root = useRef<HTMLElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(-1);

  useScrollAnim(() => {
    const els = gsap.utils.toArray<SVGGElement>(".an-layer").sort((a, b) => +a.dataset.index! - +b.dataset.index!);
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
    // abre o colchão
    tl.to(els, { y: (i) => closedY[i] + i * GAP, duration: 1 });
    tl.from(".an-badge", { scale: 0, transformOrigin: "50% 50%", stagger: 0.03, duration: 0.3 }, 0.6);
    // tempo para percorrer as camadas
    tl.to({}, { duration: n * 0.6 });

    stRef.current = ScrollTrigger.create({
      animation: tl,
      trigger: root.current,
      start: "top top",
      end: `+=${n * 26 + 50}%`,
      scrub: 0.8,
      pin: true,
      onUpdate: (self) => {
        const openAt = 1 / tl.duration();
        const p = (self.progress - openAt) / (1 - openAt);
        const idx = p < 0.02 ? -1 : Math.min(n - 1, Math.floor(p * n));
        setActive((a) => (a === idx ? a : idx));
      },
    });
  }, root);

  const goTo = (i: number) => {
    const st = stRef.current;
    if (!st) return;
    const tl = st.animation!;
    const openAt = 1 / tl.duration();
    const p = openAt + ((i + 0.5) / n) * (1 - openAt);
    const y = st.start + (st.end - st.start) * p;
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(y, true);
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const current = active >= 0 ? layers[active] : null;

  return (
    <section id="tecnologia" ref={root} className="relative h-[100svh] overflow-hidden bg-[#f4f0e8] text-[#111]">
      <div className="mx-auto grid h-full max-w-7xl grid-rows-[auto_1fr_auto] gap-4 px-5 pt-20 pb-6 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:grid-rows-1 lg:items-center lg:gap-14 lg:py-0">
        <div className="lg:hidden">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#1f4fff] uppercase">Anatomia · Pikolin Cure</p>
        </div>

        <div className="relative h-full min-h-0 lg:h-[80svh]">
          <svg viewBox={`-40 -10 ${WIDTH + 80} ${openH + SAG * 2 + 20}`} className="absolute inset-0 size-full" role="img" aria-label="Corte do colchão Pikolin Cure com 10 camadas">
            <defs>
              <pattern id="an-dots" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#000" opacity="0.12" />
              </pattern>
              <pattern id="an-spring" width="18" height="60" patternUnits="userSpaceOnUse">
                <path d="M9 0 L3 6 L15 12 L3 18 L15 24 L3 30 L15 36 L3 42 L15 48 L3 54 L9 60" fill="none" stroke="#7d8694" strokeWidth="1.6" />
              </pattern>
              <pattern id="an-quilt" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <path d="M0 0 H30 M0 0 V30" stroke="#b8894f" strokeOpacity="0.35" strokeWidth="1" />
              </pattern>
              <linearGradient id="an-shine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
                <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>

            {[...layers.keys()].reverse().map((i) => {
              const l = layers[i];
              const h = heights[i];
              const d = slab(h);
              const on = active === i;
              const dim = active >= 0 && !on;
              return (
                <g key={l.name} className="an-layer" data-index={i} transform={`translate(0 ${closedY[i]})`}>
                  <g style={{ opacity: dim ? 0.45 : 1, transition: "opacity .4s" }}>
                    <path d={d} fill={l.left} stroke="#111" strokeOpacity="0.15" />
                    {l.pattern === "springs" && <path d={d} fill="url(#an-spring)" />}
                    {l.pattern === "springs" && <rect x={WIDTH * 0.36} y={SAG * 0.9} width={WIDTH * 0.28} height={h - 4} fill="#c0392b" opacity="0.18" />}
                    {(l.pattern === "foam" || l.pattern === "dots") && <path d={d} fill="url(#an-dots)" />}
                    {l.pattern === "quilt" && <path d={d} fill="url(#an-quilt)" />}
                    <path d={d} fill="url(#an-shine)" />
                    {on && <path d={d} fill="none" stroke="#1f4fff" strokeWidth="3" />}
                  </g>
                  <g
                    className="an-badge cursor-pointer"
                    transform={`translate(${WIDTH / 2} ${h / 2 + SAG})`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Camada ${i + 1}: ${l.name}`}
                    onClick={() => goTo(i)}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && goTo(i)}
                  >
                    <circle r="12" fill={on ? "#1f4fff" : "#111"} stroke="#fff" strokeWidth="2" />
                    <text textAnchor="middle" dy="4" fontSize="11" fontWeight="700" fill="#fff">{i + 1}</text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        <div>
          <p className="hidden text-xs font-semibold tracking-[0.3em] text-[#1f4fff] uppercase lg:block">Anatomia · Pikolin Cure</p>
          <h2 className="font-display mt-4 hidden text-4xl leading-tight lg:block">Clique nos números ou role para explorar.</h2>
          <div className="mt-2 min-h-[210px] rounded-3xl border-2 border-[#111] bg-white p-6 shadow-[8px_8px_0_#111] lg:mt-8 lg:p-8">
            {current ? (
              <div key={current.name} className="animate-[fadeUp_.45s_ease-out]">
                <p className="text-xs tracking-widest text-black/45 uppercase">Camada {String(active + 1).padStart(2, "0")} de {n}</p>
                <p className="font-display mt-2 text-xl sm:text-2xl">{current.name}</p>
                <p className="mt-3 text-sm leading-relaxed text-black/65 sm:text-base">{current.text}</p>
              </div>
            ) : (
              <div>
                <p className="text-xs tracking-widest text-black/45 uppercase">Pikolin Cure · 33 cm · Copper System</p>
                <p className="font-display mt-2 text-xl sm:text-2xl">O que tem dentro de um colchão premium?</p>
                <p className="mt-3 text-sm leading-relaxed text-black/65 sm:text-base">Dez camadas trabalhando juntas: frescor, alívio de pressão e o maior suporte em molas ensacadas do mercado.</p>
              </div>
            )}
          </div>
          <div className="mt-5 flex gap-1.5" aria-hidden="true">
            {layers.map((l, i) => (
              <span key={l.name} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= active ? "bg-[#1f4fff]" : "bg-black/10"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
