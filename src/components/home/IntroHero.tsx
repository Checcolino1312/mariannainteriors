import Image from "next/image";
import { Monogram, Wordmark } from "../brand/Logo";

/**
 * Apertura a tutto schermo: sfondo materico, poi il pittogramma si disegna,
 * il punto della "i" cade al suo posto, infine compaiono wordmark e payoff.
 * Animazione solo CSS (vedi .intro in globals.css); con prefers-reduced-motion resta statica.
 */
export function IntroHero() {
  return (
    <section id="intro" className="intro" aria-label="Marianna Interiors — Architettura e percezione">
      <div className="intro-bg" aria-hidden="true">
        <Image
          src="/images/sfondo-intonaco.webp"
          alt=""
          fill
          preload
          sizes="100vw"
          quality={75}
        />
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
