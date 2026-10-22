export const SITE = {
  name: "Marianna Interiors",
  handle: "marianna.interiors",
  payoff: "Architettura e percezione",
  // Dominio di produzione: aggiornare qui se cambia (usato per canonical, sitemap, Open Graph, JSON-LD).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mariannainteriors.it",
  title: "Marianna Interiors | Interior design online, una direzione chiara per la tua casa",
  description:
    "Interior design online con Marianna Mancini, interior designer. Consulenze, mappe di stile e progetti di interni per scegliere colori, materiali e arredi con una direzione chiara.",
  locale: "it_IT",
  owner: {
    name: "Marianna Mancini",
    role: "Interior Designer",
  },
  email: "info@mariannainteriors.it",
  vat: "04324221201",
  instagram: "https://www.instagram.com/marianna.interiors/",
  instagramReels: "https://www.instagram.com/marianna.interiors/reels/",
  copyrightYear: 2026,
} as const;

/**
 * Prenotazione e pagamento online (vedi docs/prenotazioni-e-pagamenti.md).
 * Si compilano con le variabili d'ambiente oppure direttamente qui.
 * Finché un valore è vuoto o non valido, il pulsante del servizio apre un'email precompilata.
 */
export const BOOKING = {
  /** Evento Cal.com della consulenza (con pagamento Stripe attivo sull'evento). */
  calLink: validCalLink(process.env.NEXT_PUBLIC_CAL_LINK ?? "marianna.interiors/consulenza-60min"),
  /** Stripe Payment Link della mappa di stile, es. "https://buy.stripe.com/abc123". */
  mappaPaymentLink: validPaymentLink(process.env.NEXT_PUBLIC_MAPPA_PAYMENT_LINK ?? ""),
};

function validCalLink(value: string) {
  const slug = value.trim().replace(/^https:\/\/cal\.com\//, "").replace(/^\/+|\/+$/g, "");
  return /^[a-z0-9._-]+(\/[a-z0-9._-]+)*$/i.test(slug) ? slug : "";
}

function validPaymentLink(value: string) {
  return /^https:\/\/buy\.stripe\.com\/[A-Za-z0-9_]+$/.test(value.trim()) ? value.trim() : "";
}

export const calUrl = (calLink: string) => `https://cal.com/${calLink}`;

/** Pagamento con bonifico bancario (alternativa a Stripe per consulenza e mappa di stile). */
export const BANK = {
  holder: "Marianna Mancini",
  iban: "IT88E0306979194100000011742",
  /** Causale da indicare nel bonifico: il cliente sostituisce "nome cognome". */
  causale: "consulenza interior design - nome cognome",
} as const;

/** IBAN a gruppi di 4 caratteri, più leggibile. */
export const formatIban = (iban: string) => iban.replace(/(.{4})/g, "$1 ").trim();

export function absoluteUrl(path = "/") {
  return new URL(path, SITE.url).toString();
}

export function mailto(subject: string, body?: string) {
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${SITE.email}?${params.join("&")}`;
}
