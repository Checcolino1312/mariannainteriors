"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { HERO_SLIDES, PROJECT_IMAGES } from "@/content/images";
import { Carousel } from "../Carousel";

const TABS = [
  { id: "spaces", label: "I progetti" },
  { id: "style", label: "La mappa di stile" },
] as const;

const FIGURES = [
  {
    image: PROJECT_IMAGES.living,
    alt: "Esempio illustrativo AI di un living con libreria e palette naturale",
    eyebrow: "01 / Living",
    title: "Equilibrio naturale",
    text: "Volumi semplici, texture morbide, un accento di colore.",
  },
  {
    image: PROJECT_IMAGES.bagno,
    alt: "Esempio illustrativo AI di un bagno con materiali caldi e luce integrata",
    eyebrow: "02 / Bagno",
    title: "Materia e luce",
    text: "Toni continui, dettagli coordinati, una luce che accompagna.",
  },
];

export function Examples({ mappaHref }: { mappaHref: string }) {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("spaces");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const n =
      e.key === "Home" ? 0 : e.key === "End" ? TABS.length - 1 : (i + (e.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length;
    setActive(TABS[n].id);
    tabRefs.current[n]?.focus();
  };

  return (
    <section id="esempi" className="section examples" aria-labelledby="esempi-title">
      <div className="wrap">
        <div className="heading-row" data-reveal>
          <div>
            <p className="eyebrow">02 / Dalle idee allo spazio</p>
            <h2 id="esempi-title">
              Prima una visione.
              <br />
              <em>Poi le scelte.</em>
            </h2>
          </div>
          <div className="tabs" role="tablist" aria-label="Esempi visivi">
            {TABS.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`tab-${t.id}`}
                className="tab"
                type="button"
                role="tab"
                aria-selected={active === t.id}
                aria-controls={t.id}
                tabIndex={active === t.id ? 0 : -1}
                onClick={() => setActive(t.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div id="spaces" className="gallery" role="tabpanel" aria-labelledby="tab-spaces" hidden={active !== "spaces"}>
          {FIGURES.map((f) => (
            <figure key={f.title}>
              <div className="gallery-image">
                <Image src={f.image.src} alt={f.alt} fill sizes="(max-width: 620px) 100vw, 50vw" />
              </div>
              <figcaption className="figure-copy">
                <div>
                  <p className="eyebrow">{f.eyebrow}</p>
                  <h3>{f.title}</h3>
                </div>
                <p>{f.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div id="style" className="moodboard" role="tabpanel" aria-labelledby="tab-style" hidden={active !== "style"}>
          <Carousel
            slides={HERO_SLIDES}
            label="Immagini della mappa di stile"
            className="style-gallery"
            sizes="(max-width: 620px) 100vw, 50vw"
          />
          <div>
            <p className="eyebrow">Esempio illustrativo / Direzione naturale</p>
            <div className="palette" role="img" aria-label="Palette: beige, burro, terracotta e noce">
              <span />
              <span />
              <span />
              <span />
            </div>
            <h3>
              Un filo conduttore
              <br />
              per le tue scelte.
            </h3>
            <p>
              Un colore, un pavimento, un arredo possono piacerti singolarmente. Un buon progetto nasce dal modo in cui
              questi elementi dialogano tra loro.
            </p>
            <p>
              La mappa di stile ti aiuta a vedere l’insieme prima di scegliere i singoli elementi: una bussola da
              consultare per capire cosa introdurre, cosa mantenere e quali alternative seguire.
            </p>
            <Link href={mappaHref} className="text-link">
              Scopri la mappa di stile <span className="arrow" aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <p className="image-note">
          Esempi illustrativi con immagini AI. Mostrano una direzione visiva e non sono fotografie di progetti realizzati.
        </p>
      </div>
    </section>
  );
}
