import { JsonLd } from "@/components/JsonLd";
import { About } from "@/components/home/About";
import { Cta, Instagram } from "@/components/home/Closing";
import { Examples } from "@/components/home/Examples";
import { Hero } from "@/components/home/Hero";
import { IntroHero } from "@/components/home/IntroHero";
import { LegacyHashRedirect } from "@/components/home/LegacyHashRedirect";
import { MoodboardStrip } from "@/components/home/MoodboardStrip";
import { Services } from "@/components/home/Services";
import { legacyHashes, servicePath } from "@/content/services";
import { getHome, getServices, getSettings } from "@/lib/cms";
import { homeSchema } from "@/lib/schema";

export default async function Home() {
  const [home, services, settings] = await Promise.all([getHome(), getServices(), getSettings()]);
  // Link "Scopri la mappa di stile": il servizio con la mappa, oppure la sezione servizi.
  const mappa = services.find((s) => s.id === "mappa");
  return (
    <>
      <IntroHero settings={settings} scrollLabel={home.intro.scrollLabel} />
      <Hero hero={home.hero} settings={settings} />
      <MoodboardStrip images={home.moodboards} />
      <Services content={home.services} services={services} />
      <Examples content={home.examples} mappaHref={mappa ? servicePath(mappa) : "/#servizi"} />
      <About about={home.about} process={home.process} faq={home.faq} settings={settings} />
      <Cta cta={home.cta} settings={settings} />
      <Instagram content={home.instagram} settings={settings} />
      <LegacyHashRedirect hashes={legacyHashes(services)} />
      <JsonLd data={homeSchema(settings, services, home.faq.items)} />
    </>
  );
}
