import { JsonLd } from "@/components/JsonLd";
import { About } from "@/components/home/About";
import { Cta, Instagram } from "@/components/home/Closing";
import { Examples } from "@/components/home/Examples";
import { Hero } from "@/components/home/Hero";
import { IntroHero } from "@/components/home/IntroHero";
import { LegacyHashRedirect } from "@/components/home/LegacyHashRedirect";
import { MoodboardStrip } from "@/components/home/MoodboardStrip";
import { Services } from "@/components/home/Services";
import { getService, servicePath } from "@/content/services";
import { homeSchema } from "@/lib/schema";

export default function Home() {
  const mappa = getService("mappa-di-stile")!;
  return (
    <>
      <IntroHero />
      <Hero />
      <MoodboardStrip />
      <Services />
      <Examples mappaHref={servicePath(mappa)} />
      <About />
      <Cta />
      <Instagram />
      <LegacyHashRedirect />
      <JsonLd data={homeSchema()} />
    </>
  );
}
