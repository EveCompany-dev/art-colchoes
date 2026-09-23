"use client";

import { useEffect, useRef } from "react";
import { video } from "@/lib/site";

// Tour pelo showroom (vídeo vertical enviado pelo cliente, ~1.9MB).
// Só carrega e toca quando aparece na tela; pausa quando sai.
export default function ShowroomVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={video.tour}
      poster={video.poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label="Tour em vídeo pelo showroom da Art Colchões"
      className={`size-full object-cover ${className}`}
    />
  );
}
