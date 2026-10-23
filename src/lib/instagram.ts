import { cacheLife } from "next/cache";

// Copertine Instagram tramite Behold.so (https://behold.so), come nel sito Ruggieri:
// Marianna collega il suo profilo a Behold, crea un feed JSON e l'ID va nella variabile
// d'ambiente BEHOLD_FEED_ID. Behold restituisce le copertine dei reel nel loro formato
// originale, quindi si mostrano intere, senza ritagli.

export type InstagramPost = {
  id: string;
  permalink: string;
  caption: string;
  isVideo: boolean;
  image: { src: string; width: number; height: number };
};

type BeholdSize = { mediaUrl?: string; width?: number; height?: number };
type BeholdPost = {
  id?: string;
  permalink?: string;
  caption?: string;
  prunedCaption?: string;
  mediaType?: string;
  isReel?: boolean;
  sizes?: { large?: BeholdSize; medium?: BeholdSize; full?: BeholdSize };
};

const MAX_POSTS = 6;

function firstLine(text: string) {
  return (
    text
      .split("\n")
      .map((l) => l.trim())
      .find((l) => l && !l.startsWith("#")) ?? ""
  ).slice(0, 90);
}

/** Ultimi post del profilo (prima i reel). Restituisce [] se il feed non è configurato o non risponde. */
export async function getInstagramPosts(): Promise<InstagramPost[]> {
  "use cache";
  cacheLife("hours");

  const feedId = process.env.BEHOLD_FEED_ID;
  if (!feedId) return [];

  try {
    const res = await fetch(`https://feeds.behold.so/${encodeURIComponent(feedId)}`);
    if (!res.ok) return [];
    const data = await res.json();
    const posts: BeholdPost[] = Array.isArray(data) ? data : (data.posts ?? []);

    const isVideo = (p: BeholdPost) => p.isReel === true || p.mediaType === "VIDEO";
    const ordered = [...posts.filter(isVideo), ...posts.filter((p) => !isVideo(p))];

    return ordered
      .map((p): InstagramPost | null => {
        const size = p.sizes?.large ?? p.sizes?.full ?? p.sizes?.medium;
        if (!p.id || !p.permalink || !size?.mediaUrl || !size.width || !size.height) return null;
        return {
          id: p.id,
          permalink: p.permalink,
          caption: firstLine(p.prunedCaption ?? p.caption ?? ""),
          isVideo: isVideo(p),
          image: { src: size.mediaUrl, width: size.width, height: size.height },
        };
      })
      .filter((p): p is InstagramPost => p !== null)
      .slice(0, MAX_POSTS);
  } catch {
    return [];
  }
}
