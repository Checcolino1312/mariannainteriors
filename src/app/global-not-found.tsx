import type { Metadata } from "next";
import { NotFoundContent } from "@/components/NotFoundContent";
import { SiteShell } from "@/components/SiteShell";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Indirizzi che non esistono. Serve perché il sito e lo Studio hanno due layout radice separati
// (vedi src/app/(site) e src/app/(studio)): qui si ricompone la stessa pagina 404 del sito.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Pagina non trovata",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <SiteShell>
      <NotFoundContent />
    </SiteShell>
  );
}
