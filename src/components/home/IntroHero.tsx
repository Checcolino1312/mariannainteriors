import { getImageProps } from "next/image";
import { Monogram, Wordmark } from "../brand/Logo";

// Sfondo dell'intro: orizzontale sugli schermi larghi, verticale sui telefoni.
// La stessa regola (orientation) sceglie lo sfondo della navbar in globals.css: restano identici.
const common = { alt: "", sizes: "100vw", quality: 75, fetchPriority: "high" as const, loading: "eager" as const };
const {
  props: { srcSet: landscapeSrcSet },
} = getImageProps({ ...common, src: "/images/sfondo-intonaco-orizzontale.webp", width: 1601, height: 970 });
const {
  props: { srcSet: portraitSrcSet, ...portraitImg },
} = getImageProps({ ...common, src: "/images/sfondo-intonaco-caldo.webp", width: 936, height: 1492 });

/**
 * Apertura a tutto schermo: sfondo materico, poi il pittogramma si disegna,
 * il punto della "i" cade al suo posto, infine compaiono wordmark e payoff.
 * Animazione solo CSS (vedi .intro in globals.css); con prefers-reduced-motion resta statica.
 */
export function IntroHero() {
  return (
    <section id="intro" className="intro" aria-label="Marianna Interiors — Architettura e percezione">
      <div className="intro-bg" aria-hidden="true">
        <picture>
          <source media="(orientation: landscape)" srcSet={landscapeSrcSet} />
          <source media="(orientation: portrait)" srcSet={portraitSrcSet} />
          <img {...portraitImg} alt="" srcSet={portraitSrcSet} />
        </picture>
      </div>
      <div className="intro-mark">
        <Monogram className="intro-monogram" />
        <Wordmark className="intro-wordmark" title="marianna.interiors — Architettura e percezione" />
      </div>
      <a className="intro-scroll" href="#inizio">
        <span>Scopri</span>
        <span className="intro-scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}
