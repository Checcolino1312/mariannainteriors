import type { Home, Settings } from "@/content/types";
import { Carousel } from "../Carousel";
import { ArrowUpRight } from "@/components/Icons";
import { Lines } from "@/components/Lines";

export function Hero({ hero, settings }: { hero: Home["hero"]; settings: Settings }) {
  return (
    <div id="inizio" className="wrap">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy" data-reveal-group>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title">
            <Lines text={hero.title} />
          </h1>
          <p>{hero.text}</p>
          <a className="button hero-button" href="#servizi">
            {hero.button} <ArrowUpRight className="arrow" />
          </a>
          <small>
            {settings.ownerName} · {settings.ownerRole}
          </small>
        </div>
        <div className="hero-visual">
          <Carousel
            slides={hero.slides}
            label="Galleria immagini"
            className="hero-carousel"
            sizes="(max-width: 620px) 100vw, 50vw"
            counterLabel={hero.counterLabel}
            note={hero.note}
            reveal
          />
          <span className="vertical" aria-hidden="true" data-reveal="fade">
            {hero.vertical}
          </span>
        </div>
      </section>
    </div>
  );
}
