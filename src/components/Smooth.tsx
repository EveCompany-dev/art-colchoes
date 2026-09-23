"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { ScrollSmoother, ScrollTrigger, useGSAP } from "@/lib/gsap";

// O ScrollSmoother precisa existir antes dos ScrollTriggers das seções.
// Como os efeitos dos filhos rodam antes dos do pai, as seções esperam `ready`.
const ReadyCtx = createContext(false);
export const useSmoothReady = () => useContext(ReadyCtx);

/**
 * Registra as animações de uma seção só depois do ScrollSmoother estar pronto.
 * O callback roda dentro de um gsap.context com escopo no ref informado.
 */
export function useScrollAnim(fn: () => void | (() => void), scope: React.RefObject<HTMLElement | null>, deps: unknown[] = []) {
  const ready = useSmoothReady();
  useGSAP(
    () => {
      if (!ready) return;
      return fn();
    },
    { scope, dependencies: [ready, ...deps], revertOnUpdate: true },
  );
}

export default function Smooth({ children, smooth = 1.2 }: { children: ReactNode; smooth?: number }) {
  const [ready, setReady] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smoother = reduce
      ? null
      : ScrollSmoother.create({
          wrapper: wrapper.current!,
          content: wrapper.current!.firstElementChild as HTMLElement,
          smooth,
          effects: true,
          smoothTouch: 0.1,
          normalizeScroll: false,
        });

    // Links âncora (#secao) passam pelo smoother para manter a suavidade.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (!el && id) return;
      e.preventDefault();
      if (smoother) smoother.scrollTo(el ?? 0, true, "top top");
      else (el ?? document.body).scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", `#${id}`);
    };
    document.addEventListener("click", onClick);
    setReady(true);

    // imagens/fontes carregando mudam as alturas
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      smoother?.kill();
    };
  });

  return (
    <ReadyCtx.Provider value={ready}>
      <div id="smooth-wrapper" ref={wrapper}>
        <div id="smooth-content">{children}</div>
      </div>
    </ReadyCtx.Provider>
  );
}
