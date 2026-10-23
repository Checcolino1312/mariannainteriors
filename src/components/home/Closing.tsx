import Image from "next/image";
import { REELS } from "@/content/images";
import { getInstagramPosts } from "@/lib/instagram";
import { SITE, mailto } from "@/lib/site";
import { ArrowUpRight, Play } from "@/components/Icons";

export function Cta() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <Image className="cta-wave" src="/images/onda-instagram.webp" alt="" width={2048} height={327} sizes="120vw" />
      <div data-reveal-group>
        <p className="eyebrow">Iniziamo dal tuo spazio</p>
        <h2 id="cta-title">
          Una casa più tua.
          <br />
          Una scelta alla volta.
        </h2>
        <a className="button" href={mailto("La mia idea per la casa")}>
          Raccontami la tua idea <ArrowUpRight className="arrow" />
        </a>
      </div>
    </section>
  );
}

export async function Instagram() {
  const posts = await getInstagramPosts();
  return (
    <section id="instagram" className="instagram-section" aria-labelledby="instagram-title">
      <h2 id="instagram-title" data-reveal>
        Seguimi su IG!
      </h2>
      <a className="instagram-handle" href={SITE.instagram} target="_blank" rel="noopener noreferrer">
        @{SITE.handle} <ArrowUpRight className="arrow" />
      </a>
      <div className="reels-grid" data-reveal-group>
        {posts.length > 0
          ? posts.map((post) => (
              <a
                key={post.id}
                className="reel-card"
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${post.caption || "Post"} — apri su Instagram`}
              >
                {/* Copertina intera, nel suo formato originale */}
                <Image
                  src={post.image.src}
                  alt=""
                  width={post.image.width}
                  height={post.image.height}
                  sizes="(max-width: 620px) 33vw, 180px"
                  quality={90}
                />
                {post.isVideo && <Play className="reel-play" />}
              </a>
            ))
          : REELS.map((reel) => (
              // Senza feed Behold: miniature salvate dalla bozza, mostrate intere (quadrate)
              <a
                key={reel.src}
                className="reel-card"
                href={SITE.instagramReels}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${reel.title} — guarda i Reel di @${SITE.handle} su Instagram`}
              >
                <Image src={reel.src} alt="" width={263} height={263} unoptimized />
                <Play className="reel-play" />
              </a>
            ))}
      </div>
    </section>
  );
}
