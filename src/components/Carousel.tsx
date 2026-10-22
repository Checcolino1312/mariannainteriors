"use client";

import Image from "next/image";
import { useState, type KeyboardEvent } from "react";
import type { SiteImage } from "@/content/images";

type Props = {
  slides: SiteImage[];
  label: string;
  className?: string;
  sizes: string;
  /** Precarica la prima immagine (solo se è nella prima schermata). */
  eager?: boolean;
  fit?: "cover" | "contain";
  /** Didascalia sotto l'immagine: contatore ("01 / 02" o "01 / {counterLabel}") e nota a destra. */
  counterLabel?: string;
  note?: string;
  /** Animazione d'ingresso "a tendina" dell'immagine (vedi ScrollReveal). */
  reveal?: boolean;
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Galleria accessibile con dissolvenza incrociata, frecce e navigazione da tastiera. */
export function Carousel({ slides, label, className = "", sizes, eager, fit = "cover", counterLabel, note, reveal }: Props) {
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const go = (step: number) => setIndex((i) => (i + step + total) % total);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      go(e.key === "ArrowRight" ? 1 : -1);
    }
  };

  return (
    <div className={`carousel ${className}`} role="region" aria-roledescription="carosello" aria-label={label} onKeyDown={onKeyDown}>
      <div className={`carousel-frame carousel-frame--${fit}`} data-reveal={reveal ? "image" : undefined}>
        {slides.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            sizes={sizes}
            className={i === index ? "is-active" : undefined}
            aria-hidden={i === index ? undefined : true}
            loading={eager && i === 0 ? "eager" : "lazy"}
            fetchPriority={eager && i === 0 ? "high" : undefined}
          />
        ))}
        {total > 1 && (
          <div className="carousel-controls">
            <button className="carousel-arrow" type="button" aria-label="Immagine precedente" onClick={() => go(-1)}>
              <span aria-hidden="true">←</span>
            </button>
            <button className="carousel-arrow" type="button" aria-label="Immagine successiva" onClick={() => go(1)}>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </div>
      <span className="visually-hidden" aria-live="polite" aria-atomic="true">
        Immagine {index + 1} di {total}
      </span>
      {note && (
        <div className="carousel-caption">
          <span aria-hidden="true">
            {pad(index + 1)} / {counterLabel ?? pad(total)}
          </span>
          <span>{note}</span>
        </div>
      )}
    </div>
  );
}
