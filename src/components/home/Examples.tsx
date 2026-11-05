"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import type { Home } from "@/content/types";
import { Carousel } from "../Carousel";
import { ArrowUpRight } from "@/components/Icons";
import { Lines, Paragraphs } from "@/components/Lines";

const TAB_IDS = ["spaces", "style"] as const;

export function Examples({ content, mappaHref }: { content: Home["examples"]; mappaHref: string }) {
  const tabs = [
    { id: TAB_IDS[0], label: content.tabProjects },
    { id: TAB_IDS[1], label: content.tabStyle },
  ];
  const [active, setActive] = useState<(typeof TAB_IDS)[number]>("spaces");
  const { style } = content;
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const n =
      e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setActive(tabs[n].id);
    tabRefs.current[n]?.focus();
  };

  return (
    <section id="esempi" className="section examples" aria-labelledby="esempi-title">
      <div className="wrap">
        <div className="heading-row" data-reveal>
          <div>
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 id="esempi-title">
              <Lines text={content.title} />
            </h2>
          </div>
          <div className="tabs" role="tablist" aria-label="Esempi visivi">
            {tabs.map((t, i) => (
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
          {content.figures.map((f, i) => (
            <figure key={i}>
              <div className="gallery-image" data-reveal="image">
                <Image
                  src={f.image.src}
                  alt={f.image.alt}
                  fill
                  sizes="(max-width: 620px) 100vw, 50vw"
                  style={f.image.position ? { objectPosition: f.image.position } : undefined}
                />
              </div>
              <figcaption className="figure-copy" data-reveal>
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
            slides={style.slides}
            label="Immagini della mappa di stile"
            className="style-gallery"
            sizes="(max-width: 620px) 100vw, 50vw"
            reveal
          />
          <div data-reveal-group>
            <p className="eyebrow">{style.eyebrow}</p>
            {style.palette.length > 0 && (
              <div
                className="palette"
                role="img"
                aria-label={`Palette: ${style.palette.map((c) => c.name).join(", ").replace(/, ([^,]*)$/, " e $1")}`}
                style={{ gridTemplateColumns: `repeat(${style.palette.length}, 1fr)` }}
              >
                {style.palette.map((c, i) => (
                  <span key={i} style={{ backgroundColor: c.hex }} />
                ))}
              </div>
            )}
            <h3>
              <Lines text={style.title} />
            </h3>
            <Paragraphs text={style.text} />
            <Link href={mappaHref} className="text-link">
              {style.link} <ArrowUpRight className="arrow" />
            </Link>
          </div>
        </div>
        <p className="image-note" data-reveal="fade">
          {content.note}
        </p>
      </div>
    </section>
  );
}
