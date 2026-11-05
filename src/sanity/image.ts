import { createImageUrlBuilder } from "@sanity/image-url";
import type { SiteImage } from "@/content/types";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId: projectId || "unset", dataset });

type Crop = { top?: number; bottom?: number; left?: number; right?: number };
type SanityImageValue = {
  asset?: { _ref?: string };
  crop?: Crop;
  hotspot?: { x?: number; y?: number };
  alt?: string;
};

/** Un valore immagine di Sanity, riconosciuto dal riferimento all'asset ("image-<id>-<l>x<a>-<ext>"). */
export function isSanityImage(value: unknown): value is SanityImageValue {
  const ref = (value as SanityImageValue | null)?.asset?._ref;
  return typeof ref === "string" && ref.startsWith("image-");
}

/**
 * Converte un'immagine Sanity nel formato usato dal sito, senza interrogare l'asset:
 * le dimensioni sono nel riferimento. Il ritaglio scelto nello Studio è applicato all'URL
 * (e alle dimensioni), il punto focale diventa object-position.
 */
export function toSiteImage(value: SanityImageValue): SiteImage | null {
  const match = value.asset?._ref?.match(/^image-[a-zA-Z0-9]+-(\d+)x(\d+)-[a-z0-9]+$/);
  if (!match) return null;
  const crop = value.crop ?? {};
  const keepX = 1 - (crop.left ?? 0) - (crop.right ?? 0);
  const keepY = 1 - (crop.top ?? 0) - (crop.bottom ?? 0);
  const hotspot = value.hotspot;
  // Il punto focale è relativo all'immagine intera: lo si riporta all'area ritagliata.
  const pct = (v: number, start: number, keep: number) =>
    `${Math.round(Math.min(1, Math.max(0, (v - start) / keep)) * 100)}%`;
  return {
    src: builder.image(value).url(),
    alt: value.alt ?? "",
    width: Math.max(1, Math.round(Number(match[1]) * keepX)),
    height: Math.max(1, Math.round(Number(match[2]) * keepY)),
    ...(hotspot?.x !== undefined && hotspot.y !== undefined
      ? { position: `${pct(hotspot.x, crop.left ?? 0, keepX)} ${pct(hotspot.y, crop.top ?? 0, keepY)}` }
      : {}),
  };
}
