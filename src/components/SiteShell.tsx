import type { ReactNode } from "react";
import { sans, serif } from "@/app/fonts";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { REVEAL_BOOT, ScrollReveal } from "@/components/ScrollReveal";
import { getHome, getServices, getSettings } from "@/lib/cms";
import { siteSchema } from "@/lib/schema";

/** Documento HTML del sito (navbar, footer, dati strutturati): usato dal layout e dalla pagina 404. */
export async function SiteShell({ children }: { children: ReactNode }) {
  const [settings, services, home] = await Promise.all([getSettings(), getServices(), getHome()]);
  return (
    // suppressHydrationWarning: REVEAL_BOOT aggiunge la classe "reveal-ready" prima dell'idratazione.
    <html lang="it" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      {/* È il layout radice (condiviso con la 404 globale): qui <head> è corretto */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOT }} />
      </head>
      <body>
        <a className="skip" href="#contenuto">
          Vai al contenuto
        </a>
        <Header nav={settings.nav} background={settings.background} siteName={settings.name} />
        <main id="contenuto">{children}</main>
        <Footer settings={settings} />
        <ScrollReveal />
        <JsonLd data={siteSchema(settings, services, home.about.portrait)} />
      </body>
    </html>
  );
}
