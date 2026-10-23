import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // 90 per le copertine Instagram, così non risultano sgranate
    qualities: [75, 90],
    // Copertine Instagram servite da Behold.so (vedi src/lib/instagram.ts)
    remotePatterns: [
      { protocol: "https", hostname: "behold.pictures" },
      { protocol: "https", hostname: "cdn2.behold.pictures" },
    ],
  },
  async redirects() {
    // Varianti comuni degli indirizzi dei servizi.
    return [{ source: "/servizi", destination: "/#servizi", permanent: true }];
  },
};

export default nextConfig;
