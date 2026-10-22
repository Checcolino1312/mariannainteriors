import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Varianti comuni degli indirizzi dei servizi.
    return [{ source: "/servizi", destination: "/#servizi", permanent: true }];
  },
};

export default nextConfig;
