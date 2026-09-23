import { brands } from "@/lib/site";

// Logos oficiais das marcas (SVG vetorizado a partir dos PDFs do cliente)
export default function BrandLogos({ className = "", itemClassName = "h-10 sm:h-12" }: { className?: string; itemClassName?: string }) {
  return (
    <ul className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-6 ${className}`}>
      {brands.map((b) => (
        <li key={b.name} className="brand-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={b.logo} alt={b.name} loading="lazy" className={`w-auto ${itemClassName}`} />
        </li>
      ))}
    </ul>
  );
}
