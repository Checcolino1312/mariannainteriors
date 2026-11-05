import { getImageProps } from "next/image";
import type { Settings } from "@/content/types";
import { Monogram, Wordmark } from "../brand/Logo";

/**
 * Apertura a tutto schermo: sfondo materico, poi il pittogramma si disegna,
 * il punto della "i" cade al suo posto, infine compaiono wordmark e payoff.
 * Animazione solo CSS (vedi .intro in globals.css); con prefers-reduced-motion resta statica.
 *
 * Sfondo: orizzontale sugli schermi larghi, verticale sui telefoni. La stessa regola
 * (orientation) sceglie lo sfondo della navbar (Header): restano identici.
 */
export function IntroHero({ settings, scrollLabel }: { settings: Settings; scrollLabel: string }) {
  const { landscape, portrait } = settings.background;
  const common = { alt: "", sizes: "100vw", quality: 75, fetchPriority: "high" as const, loading: "eager" as const };
  const {
    props: { srcSet: landscapeSrcSet },
  } = getImageProps({ ...common, src: landscape.src, width: landscape.width, height: landscape.height });
  const {
    props: { srcSet: portraitSrcSet, ...portraitImg },
  } = getImageProps({ ...common, src: portrait.src, width: portrait.width, height: portrait.height });
  const label = `${settings.name} — ${settings.payoff}`;

  return (
    <section id="intro" className="intro" aria-label={label}>
      <div className="intro-bg" aria-hidden="true">
        <picture>
          <source media="(orientation: landscape)" srcSet={landscapeSrcSet} />
          <source media="(orientation: portrait)" srcSet={portraitSrcSet} />
          <img {...portraitImg} alt="" srcSet={portraitSrcSet} />
        </picture>
      </div>
      <div className="intro-mark">
        <Monogram className="intro-monogram" />
        <Wordmark className="intro-wordmark" title={`${settings.handle} — ${settings.payoff}`} />
      </div>
      <a className="intro-scroll" href="#inizio">
        <span>{scrollLabel}</span>
        <span className="intro-scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}
