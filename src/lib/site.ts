// Costanti tecniche del sito. I testi e i dati modificabili (nome, contatti, IBAN, ecc.)
// stanno in Sanity, con i valori predefiniti in src/content/settings.ts.

/** Dominio di produzione: usato per canonical, sitemap, Open Graph e JSON-LD. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mariannainteriors.it";
export const LOCALE = "it_IT";

/**
 * Immagine di condivisione (public/opengraph-image.jpg, generata da scripts/build-brand.mjs).
 * Sta in public e non in app/ perché il sito e lo Studio hanno layout radice separati.
 */
export const OG_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Marianna Interiors: monogramma \"im\" e wordmark marianna.interiors su sfondo materico, payoff Architettura e percezione",
};

/**
 * Prenotazione e pagamento online (vedi docs/prenotazioni-e-pagamenti.md).
 * Valori iniziali dalle variabili d'ambiente: dopo l'import si modificano in Sanity.
 */
export const BOOKING_ENV = {
  /** Evento Cal.com della consulenza (con pagamento Stripe attivo sull'evento). */
  calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? "marianna.interiors/consulenza-60min",
  /** Stripe Payment Link della mappa di stile, es. "https://buy.stripe.com/abc123". */
  mappaPaymentLink: process.env.NEXT_PUBLIC_MAPPA_PAYMENT_LINK ?? "",
};

/** "utente/evento" di Cal.com, accettato anche come URL completo. Vuoto se non valido. */
export function validCalLink(value: string | undefined | null) {
  const slug = (value ?? "").trim().replace(/^https:\/\/cal\.com\//, "").replace(/^\/+|\/+$/g, "");
  return /^[a-z0-9._-]+(\/[a-z0-9._-]+)*$/i.test(slug) ? slug : "";
}

/** Stripe Payment Link valido, altrimenti stringa vuota. */
export function validPaymentLink(value: string | undefined | null) {
  const link = (value ?? "").trim();
  return /^https:\/\/buy\.stripe\.com\/[A-Za-z0-9_]+$/.test(link) ? link : "";
}

export const calUrl = (calLink: string) => `https://cal.com/${calLink}`;

/** IBAN a gruppi di 4 caratteri, più leggibile. */
export const formatIban = (iban: string) => iban.replace(/\s+/g, "").replace(/(.{4})/g, "$1 ").trim();

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function mailto(email: string, subject: string, body?: string) {
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${email}?${params.join("&")}`;
}
