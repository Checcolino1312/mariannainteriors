import Image from "next/image";
import type { SiteImage } from "@/content/types";

/** Nastro di moodboard in scorrimento continuo (si ferma al passaggio del mouse). */
export function MoodboardStrip({ images }: { images: SiteImage[] }) {
  const group = (copy: boolean) => (
    <div className="moodboard-group" aria-hidden={copy || undefined}>
      {images.map((img, i) => (
        <figure className="moodboard-tile" key={`${img.src}-${i}`}>
          <Image src={img.src} alt={copy ? "" : img.alt} width={img.width} height={img.height} sizes="108px" />
        </figure>
      ))}
    </div>
  );
  return (
    <section className="moodboard-strip" aria-label="Galleria di moodboard" data-reveal="fade">
      <div className="moodboard-track">
        {group(false)}
        {group(true)}
      </div>
    </section>
  );
}
