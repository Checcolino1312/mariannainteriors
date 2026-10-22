import { HERO_SLIDES } from "@/content/images";
import { SITE } from "@/lib/site";
import { Carousel } from "../Carousel";

export function Hero() {
  return (
    <div id="inizio" className="wrap">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">Consulenze e progetti di interior design online</p>
          <h1 id="hero-title">
            Il tuo spazio,
            <br />
            con una
            <br />
            <em>direzione chiara.</em>
          </h1>
          <p>
            Dalle prime idee alle scelte concrete, ti aiuto a definire i tuoi spazi e a scegliere colori, materiali e
            arredi che funzionano insieme e rispecchiano la tua identità.
          </p>
          <a className="button hero-button" href="#servizi">
            Scopri il servizio adatto a te <span className="arrow" aria-hidden="true">↗</span>
          </a>
          <small>
            {SITE.owner.name} · {SITE.owner.role}
          </small>
        </div>
        <div className="hero-visual">
          <Carousel
            slides={HERO_SLIDES}
            label="Galleria immagini"
            className="hero-carousel"
            sizes="(max-width: 620px) 100vw, 50vw"
            counterLabel="Spazi da abitare"
            note="Immagine d’atmosfera · AI"
          />
          <span className="vertical" aria-hidden="true">
            I miei progetti
          </span>
        </div>
      </section>
    </div>
  );
}
