import { cacheLife, cacheTag } from "next/cache";
import { DEFAULT_HOME } from "@/content/home";
import { DEFAULT_LEGAL, DEFAULT_THANK_YOU } from "@/content/pages";
import { DEFAULT_SERVICES, resolveService } from "@/content/services";
import { DEFAULT_SETTINGS } from "@/content/settings";
import type { Home, Legal, LegalKind, Service, ServiceInput, Settings, ThankYou } from "@/content/types";
import { client } from "@/sanity/client";
import { isSanityImage, toSiteImage } from "@/sanity/image";
import { DOC_IDS } from "@/sanity/ids";

// Livello dati del sito. Legge i contenuti da Sanity e, se Sanity non è configurato,
// non risponde o un documento manca, usa i contenuti predefiniti in src/content/*.
//
// Cache: ogni query è in 'use cache' con il tag del tipo di documento (_type).
// Il webhook /api/revalidate invalida il tag a ogni pubblicazione nello Studio.

async function fetchSanity<T>(query: string, tag: string): Promise<T | null> {
  "use cache";
  cacheTag(tag);
  if (!client) {
    cacheLife("max");
    return null;
  }
  try {
    const result = await client.fetch<T | null>(query);
    cacheLife("max");
    return result ?? null;
  } catch (error) {
    // Sanity non risponde: contenuti predefiniti per qualche minuto, poi si riprova.
    console.error(`[cms] lettura di "${tag}" non riuscita:`, error);
    cacheLife("minutes");
    return null;
  }
}

/** Converte le immagini Sanity nel formato del sito ed elimina quelle senza file. */
function normalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalize).filter((v) => v !== null && v !== undefined);
  if (value && typeof value === "object") {
    if (isSanityImage(value)) return toSiteImage(value);
    if ((value as { _type?: string })._type === "immagine") return null; // immagine senza file
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, normalize(v)]));
  }
  return value;
}

/** Campi che si possono lasciare vuoti: se mancano in Sanity restano vuoti, senza testo predefinito. */
const OPTIONAL = new Set(["cardSubtitle", "subtitle", "listIntro", "note", "paymentLink", "calLink", "amount", "from", "confirm"]);

/**
 * Unisce un documento Sanity ai valori predefiniti: un campo mancante prende il valore predefinito
 * (utile se un campo nuovo non è ancora stato compilato). Gli elenchi di Sanity sostituiscono
 * quelli predefiniti per intero.
 */
function merge<T>(fallback: T, value: unknown): T {
  if (value === null || value === undefined) return fallback;
  if (Array.isArray(fallback)) return (Array.isArray(value) ? value : fallback) as T;
  if (fallback && typeof fallback === "object") {
    if (typeof value !== "object" || Array.isArray(value)) return fallback;
    const source = value as Record<string, unknown>;
    const out: Record<string, unknown> = { ...source };
    for (const [key, def] of Object.entries(fallback)) {
      out[key] = OPTIONAL.has(key) ? (source[key] ?? undefined) : merge(def, source[key]);
    }
    return out as T;
  }
  return (typeof value === typeof fallback ? value : fallback) as T;
}

async function getDoc<T>(id: string, type: string, fallback: T): Promise<T> {
  const doc = await fetchSanity<unknown>(`*[_id == "${id}"][0]`, type);
  return doc ? merge(fallback, normalize(doc)) : fallback;
}

export function getSettings(): Promise<Settings> {
  return getDoc(DOC_IDS.settings, "siteSettings", DEFAULT_SETTINGS);
}

export function getHome(): Promise<Home> {
  return getDoc(DOC_IDS.home, "homePage", DEFAULT_HOME);
}

export function getThankYou(): Promise<ThankYou> {
  return getDoc(DOC_IDS.thankYou, "thankYouPage", DEFAULT_THANK_YOU);
}

export function getLegal(kind: LegalKind): Promise<Legal> {
  return getDoc(DOC_IDS[kind], "legalPage", DEFAULT_LEGAL[kind]);
}

/** Struttura vuota di un servizio: i campi mancanti diventano testi o elenchi vuoti. */
const BLANK_SERVICE: ServiceInput = {
  id: "",
  slug: "",
  number: "",
  eyebrow: "",
  name: "",
  cardTitle: "",
  cardText: "",
  cardBullets: [],
  cardCta: "",
  price: { label: "" },
  choice: "",
  detail: { title: "", question: "", text: "", bullets: [], gallery: [], galleryFit: "cover" },
  action: { kind: "email", label: "", emailLabel: "", emailSubject: "" },
  seo: { title: "", description: "" },
};

export async function getServices(): Promise<Service[]> {
  const [docs, settings] = await Promise.all([
    fetchSanity<unknown[]>(`*[_type == "service" && defined(slug.current)] | order(number asc)`, "service"),
    getSettings(),
  ]);
  const inputs: ServiceInput[] = docs?.length
    ? docs.map((doc) => {
        const raw = normalize(doc) as Record<string, unknown> & { slug?: { current?: string }; _id?: string };
        const input = merge(BLANK_SERVICE, { ...raw, slug: raw.slug?.current ?? "" });
        return { ...input, id: input.id || input.slug };
      })
    : DEFAULT_SERVICES;
  return inputs.map((input) => resolveService(input, settings));
}

export async function getService(slug: string): Promise<Service | undefined> {
  return (await getServices()).find((s) => s.slug === slug);
}
