import Image from "next/image";
import type { Home, Settings } from "@/content/types";
import { getInstagramPosts } from "@/lib/instagram";
import { mailto } from "@/lib/site";
import { ArrowUpRight, Play } from "@/components/Icons";
import { Lines } from "@/components/Lines";

export function Cta({ cta, settings }: { cta: Home["cta"]; settings: Settings }) {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <Image className="cta-wave" src="/images/onda-instagram.webp" alt="" width={2048} height={327} sizes="120vw" />
      <div data-reveal-group>
        <p className="eyebrow">{cta.eyebrow}</p>
        <h2 id="cta-title">
          <Lines text={cta.title} />
        </h2>
        <a className="button" href={mailto(settings.email, cta.emailSubject)}>
          {cta.button} <ArrowUpRight className="arrow" />
        </a>
      </div>
    </section>
  );
}

export async function Instagram({ content, settings }: { content: Home["instagram"]; settings: Settings }) {
  const posts = await getInstagramPosts();
  return (
    <section id="instagram" className="instagram-section" aria-labelledby="instagram-title">
      <h2 id="instagram-title" data-reveal>
        {content.title}
      </h2>
      <a className="instagram-handle" href={settings.instagram} target="_blank" rel="noopener noreferrer">
        @{settings.handle} <ArrowUpRight className="arrow" />
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
          : content.fallback.map((reel, i) => (
              // Senza feed Behold: miniature di riserva (Sanity o quelle salvate dalla bozza)
              <a
                key={i}
                className="reel-card"
                href={settings.instagramReels}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${reel.title} — guarda i Reel di @${settings.handle} su Instagram`}
              >
                <Image
                  src={reel.image.src}
                  alt=""
                  width={reel.image.width}
                  height={reel.image.height}
                  sizes="(max-width: 620px) 33vw, 180px"
                  // le miniature della bozza sono già piccole; quelle caricate su Sanity si ottimizzano
                  unoptimized={reel.image.src.startsWith("/")}
                />
                <Play className="reel-play" />
              </a>
            ))}
      </div>
    </section>
  );
}
