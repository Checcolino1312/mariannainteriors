import Image from "next/image";
import { MOODBOARDS } from "@/content/images";

/** Nastro di moodboard in scorrimento continuo (si ferma al passaggio del mouse). */
export function MoodboardStrip() {
  const group = (copy: boolean) => (
    <div className="moodboard-group" aria-hidden={copy || undefined}>
      {MOODBOARDS.map((img) => (
        <figure className="moodboard-tile" key={img.src}>
          <Image src={img.src} alt={copy ? "" : img.alt} width={img.width} height={img.height} sizes="108px" />
        </figure>
      ))}
    </div>
  );
  return (
    <section className="moodboard-strip" aria-label="Galleria di moodboard">
      <div className="moodboard-track">
        {group(false)}
        {group(true)}
      </div>
    </section>
  );
}
