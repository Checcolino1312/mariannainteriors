import type { MetadataRoute } from "next";
import { getSettings } from "@/lib/cms";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const site = await getSettings();
  return {
    name: site.name,
    short_name: site.handle,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#EEE9E2",
    theme_color: "#EEE9E2",
    lang: "it",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
