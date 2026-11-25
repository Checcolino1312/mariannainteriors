"use client";

import Image from "next/image";
import { useState, type CSSProperties, type KeyboardEvent } from "react";
import type { SiteImage } from "@/content/types";
import { ArrowLeft, ArrowRight } from "@/components/Icons";

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
  /** Frecce sotto l'immagine (allineate al suo bordo sinistro) invece che sopra l'immagine. */
  controlsBelow?: boolean;
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Galleria accessibile con dissolvenza incrociata, frecce e navigazione da tastiera. */
export function Carousel({
  slides,
  label,
  className = "",
  sizes,
  eager,
  fit = "cover",
  counterLabel,
  note,
  reveal,
  controlsBelow,
}: Props) {
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const go = (step: number) => setIndex((i) => (i + step + total) % total);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      go(e.key === "ArrowRight" ? 1 : -1);
    }
  };

  const active = slides[index];
  const controls = total > 1 && (
    <div className="carousel-controls">
      <button className="carousel-arrow" type="button" aria-label="Immagine precedente" onClick={() => go(-1)}>
        <ArrowLeft className="arrow" />
      </button>
      <button className="carousel-arrow" type="button" aria-label="Immagine successiva" onClick={() => go(1)}>
        <ArrowRight className="arrow" />
      </button>
    </div>
  );
  const caption = note && (
    <div className="carousel-caption">
      <span aria-hidden="true">
        {pad(index + 1)} / {counterLabel ?? pad(total)}
      </span>
      <span>{note}</span>
    </div>
  );

  return (
    <div
      className={`carousel carousel--${fit}${controlsBelow ? " carousel--controls-below" : ""} ${className}`}
      role="region"
      aria-roledescription="carosello"
      aria-label={label}
      onKeyDown={onKeyDown}
      // Immagini intere: proporzione dell'immagine mostrata, usata dal CSS per riquadro e larghezza
      style={fit === "contain" && active ? ({ "--ratio": active.width / active.height } as CSSProperties) : undefined}
    >
      <div
        className={`carousel-frame carousel-frame--${fit}`}
        data-reveal={reveal ? "image" : undefined}
        style={fit === "contain" && active ? { aspectRatio: `${active.width} / ${active.height}` } : undefined}
      >
        {slides.map((slide, i) => (
          <Image
            key={`${slide.src}-${i}`}
            src={slide.src}
            alt={slide.alt}
            fill
            sizes={sizes}
            style={slide.position && fit === "cover" ? { objectPosition: slide.position } : undefined}
            className={i === index ? "is-active" : undefined}
            aria-hidden={i === index ? undefined : true}
            loading={eager && i === 0 ? "eager" : "lazy"}
            fetchPriority={eager && i === 0 ? "high" : undefined}
          />
        ))}
        {!controlsBelow && controls}
      </div>
      <span className="visually-hidden" aria-live="polite" aria-atomic="true">
        Immagine {index + 1} di {total}
      </span>
      {controlsBelow ? (
        (controls || caption) && (
          <div className="carousel-footer">
            {controls}
            {caption}
          </div>
        )
      ) : (
        caption
      )}
    </div>
  );
}
