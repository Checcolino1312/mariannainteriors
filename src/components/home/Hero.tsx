import { HERO_SLIDES } from "@/content/images";
import { SITE } from "@/lib/site";
import { Carousel } from "../Carousel";
import { ArrowUpRight } from "@/components/Icons";

export function Hero() {
  return (
    <div id="inizio" className="wrap">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy" data-reveal-group>
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
            Scopri il servizio adatto a te <ArrowUpRight className="arrow" />
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
            reveal
          />
          <span className="vertical" aria-hidden="true" data-reveal="fade">
            I miei progetti
          </span>
        </div>
      </section>
    </div>
  );
}
