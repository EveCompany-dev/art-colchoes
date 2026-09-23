import type { NextConfig } from "next";

// Export estático: gera a pasta `out/` que roda na Vercel ou em qualquer
// hospedagem de arquivos (Hostinger compartilhada, Apache, Nginx).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
