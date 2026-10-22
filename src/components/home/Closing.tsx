import Image from "next/image";
import { REELS } from "@/content/images";
import { SITE, mailto } from "@/lib/site";

export function Cta() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <Image className="cta-wave" src="/images/onda-instagram.webp" alt="" width={2048} height={327} sizes="120vw" />
      <p className="eyebrow">Iniziamo dal tuo spazio</p>
      <h2 id="cta-title">
        Una casa più tua.
        <br />
        Una scelta alla volta.
      </h2>
      <a className="button" href={mailto("La mia idea per la casa")}>
        Raccontami la tua idea <span className="arrow" aria-hidden="true">↗</span>
      </a>
    </section>
  );
}

export function Instagram() {
  return (
    <section id="instagram" className="instagram-section" aria-labelledby="instagram-title">
      <h2 id="instagram-title">Seguimi su IG!</h2>
      <a className="instagram-handle" href={SITE.instagram} target="_blank" rel="noopener noreferrer">
        @{SITE.handle} <span aria-hidden="true">↗</span>
      </a>
      <div className="reels-grid">
        {REELS.map((reel) => (
          <a
            key={reel.src}
            className="reel-card"
            href={SITE.instagramReels}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${reel.title} — guarda i Reel di @${SITE.handle} su Instagram`}
          >
            {/* Originali già ottimizzati: nessuna ricompressione, che le renderebbe sgranate. */}
            <Image src={reel.src} alt="" width={263} height={263} unoptimized />
            <span className="reel-play" aria-hidden="true">
              ▶
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
