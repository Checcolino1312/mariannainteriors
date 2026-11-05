import { BOOKING_ENV, validCalLink } from "@/lib/site";
import type { Settings } from "./types";

/** Impostazioni predefinite: usate finché Sanity non è configurato e come seed dell'import. */
export const DEFAULT_SETTINGS: Settings = {
  name: "Marianna Interiors",
  handle: "marianna.interiors",
  payoff: "Architettura e percezione",
  title: "Marianna Interiors | Consulenze e progetti di interni",
  description:
    "Una direzione chiara per la tua casa. Consulenze online e progettazione di interni: ti aiuto a definire i tuoi spazi, dalle idee alle scelte concrete.",
  ownerName: "Marianna Mancini",
  ownerRole: "Interior Designer",
  email: "info@mariannainteriors.it",
  vat: "04324221201",
  instagram: "https://www.instagram.com/marianna.interiors/",
  instagramReels: "https://www.instagram.com/marianna.interiors/reels/",
  copyrightYear: 2026,
  calLink: validCalLink(BOOKING_ENV.calLink),
  bank: {
    holder: "Marianna Mancini",
    iban: "IT88E0306979194100000011742",
    causale: "consulenza interior design - nome cognome",
    title: "Preferisci pagare con bonifico?",
    steps: [
      "Effettua il bonifico indicando il tuo nome e cognome nella causale.",
      "Inviami la ricevuta via email insieme ai dati per la fattura (codice fiscale e indirizzo).",
    ],
    link: "Invia ricevuta e dati per la fattura",
  },
  nav: [
    { href: "/#servizi", label: "Servizi" },
    { href: "/#chi-sono", label: "Chi sono" },
    { href: "/#contatti", label: "Contattami" },
  ],
  background: {
    landscape: { src: "/images/sfondo-intonaco-orizzontale.webp", alt: "", width: 1601, height: 970 },
    portrait: { src: "/images/sfondo-intonaco-caldo.webp", alt: "", width: 936, height: 1492 },
  },
  servicePage: {
    back: "Torna ai servizi",
    others: "Altri percorsi",
    galleryNote: "Immagini illustrative · AI",
    emailNote:
      "Il servizio si svolge online, attraverso fotografie, planimetrie e videocall. Scrivimi per disponibilità, modalità di pagamento e prossimi passi.",
  },
};
