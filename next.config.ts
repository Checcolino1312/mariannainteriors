import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Sito e Studio Sanity hanno due layout radice: la pagina 404 globale è in app/global-not-found.tsx
    globalNotFound: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // 90 per le copertine Instagram, così non risultano sgranate
    qualities: [75, 90],
    // Copertine Instagram servite da Behold.so (vedi src/lib/instagram.ts)
    remotePatterns: [
      { protocol: "https", hostname: "behold.pictures" },
      { protocol: "https", hostname: "cdn2.behold.pictures" },
      // Immagini caricate da Marianna nello Studio Sanity
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    ],
  },
  async redirects() {
    // Varianti comuni degli indirizzi dei servizi.
    return [{ source: "/servizi", destination: "/#servizi", permanent: true }];
  },
};

export default nextConfig;
