/**
 * Layout radice dello Studio Sanity: volutamente separato da quello del sito,
 * senza globals.css né i font, che interferirebbero con l'interfaccia di Sanity.
 *
 * `generateMetadata` e `viewport` stanno qui perché la pagina è un Client Component.
 */
import type { Metadata } from "next";
import { metadata as studioMetadata } from "next-sanity/studio";
import { SITE_URL } from "@/lib/site";

export { viewport } from "next-sanity/studio";

export function generateMetadata(): Metadata {
  return {
    ...studioMetadata,
    metadataBase: new URL(SITE_URL),
    title: "Studio | Marianna Interiors",
    robots: { index: false, follow: false },
  };
}

export default function StudioRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
