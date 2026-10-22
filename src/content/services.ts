import { BOOKING, mailto } from "@/lib/site";
import { HERO_SLIDES, MOODBOARDS, type SiteImage } from "./images";

export type Service = {
  /** Ancora della card in home (compatibile con la bozza). */
  id: "consulenza" | "mappa" | "ambiente" | "su-misura";
  slug: string;
  number: string;
  eyebrow: string;
  name: string;
  /** Titolo della card, con eventuali a capo. */
  cardTitle: string[];
  cardSubtitle?: string;
  cardText: string;
  cardBullets: string[];
  cardCta: string;
  /** Prezzo: `amount` in euro se fisso o minimo, altrimenti testo libero. */
  price: { amount?: number; from?: boolean; label: string };
  detail: {
    title: string;
    subtitle?: string;
    question: string;
    text: string;
    listIntro?: string;
    bullets: string[];
    note?: string;
    cta: Cta;
    gallery: SiteImage[];
  };
  seo: { title: string; description: string };
  choice: string;
  /** Pagabile anche con bonifico (dati in BANK, src/lib/site.ts). */
  bankTransfer?: boolean;
};

/**
 * Azione principale della pagina servizio:
 * - "booking": prenotazione + pagamento su Cal.com (popup sul sito);
 * - "payment": pagamento con Stripe Payment Link;
 * - "email": richiesta via email precompilata (preventivi, o finché i link non sono configurati).
 */
export type Cta =
  | { kind: "booking"; label: string; calLink: string; note: string }
  | { kind: "payment"; label: string; href: string; note: string }
  | { kind: "email"; label: string; href: string };

const BILLING_NOTE = "Al momento del pagamento ti chiederò i dati per la fattura (codice fiscale e indirizzo).";

function emailCta(label: string, subject: string, service: string): Cta {
  return {
    kind: "email",
    label,
    href: mailto(subject, `Buongiorno Marianna,\n\nvorrei ricevere informazioni sul servizio ${service}.\n\n`),
  };
}

/** Il servizio è acquistabile online (link configurati in src/lib/site.ts). */
export function isBookable(service: Service) {
  return service.detail.cta.kind !== "email";
}

export const SERVICES: Service[] = [
  {
    id: "consulenza",
    slug: "consulenza-online",
    number: "01",
    eyebrow: "Dubbi da risolvere",
    name: "Consulenza online",
    cardTitle: ["Consulenza online"],
    cardSubtitle: "60 minuti, insieme",
    cardText:
      "Hai dubbi su colori, materiali o arredi? Un confronto mirato per valutare gli abbinamenti e capire come migliorare la tua casa.",
    cardBullets: [
      "Analisi preliminare del materiale.",
      "Videocall individuale di 60 minuti.",
      "PDF riepilogativo dei consigli.",
    ],
    cardCta: "Scopri la consulenza",
    price: { amount: 149, label: "149 €" },
    detail: {
      title: "Consulenza online",
      subtitle: "60 minuti",
      question: "Hai dubbi sulle scelte per la tua casa?",
      text: "Non sai cosa abbinare al pavimento, come rendere più accogliente una stanza o quale arredo scegliere? Un confronto professionale dedicato ai tuoi dubbi specifici, per valutare le alternative e capire come procedere.",
      bullets: [
        "Analisi preliminare del materiale inviato.",
        "Videocall individuale di 60 minuti.",
        "Breve PDF riepilogativo con i consigli condivisi.",
      ],
      cta: BOOKING.calLink
        ? {
            kind: "booking",
            label: "Prenota e paga la consulenza",
            calLink: BOOKING.calLink,
            note: `Scegli giorno e orario e paghi online in modo sicuro con carta (Stripe). ${BILLING_NOTE} Subito dopo la prenotazione ti scrivo via email con le indicazioni per inviarmi il materiale, da mandare almeno 3 giorni prima della videocall.`,
          }
        : emailCta("Prenota la consulenza", "Richiesta consulenza 60 minuti", "Consulenza online 60 minuti"),
      gallery: HERO_SLIDES,
    },
    seo: {
      title: "Consulenza di interior design online (60 minuti) – 149 €",
      description:
        "Consulenza di interior design online di 60 minuti con Marianna Mancini: analisi di foto e planimetrie, videocall dedicata ai tuoi dubbi su colori, materiali e arredi e PDF riepilogativo. 149 €.",
    },
    choice: "Ho un dubbio preciso",
    bankTransfer: true,
  },
  {
    id: "mappa",
    slug: "mappa-di-stile",
    number: "02",
    eyebrow: "Una guida personalizzata",
    name: "Mappa di stile",
    cardTitle: ["Mappa", "di stile"],
    cardText:
      "Tante idee, ma nessun filo conduttore? Definiamo lo stile della tua casa con una guida personalizzata per orientare le scelte successive.",
    cardBullets: [
      "Moodboard con atmosfera e stile.",
      "Palette colori, materiali e finiture.",
      "Riferimenti di arredi e abbinamenti.",
    ],
    cardCta: "Scopri la mappa di stile",
    price: { amount: 399, label: "399 €" },
    detail: {
      title: "Mappa di stile",
      question: "Tante idee per la tua casa, ma non sai come metterle insieme?",
      text: "Una guida personalizzata per definire lo stile dell’intera casa e orientarti nelle scelte successive. Partiamo dai tuoi gusti per trovare un filo conduttore tra colori, materiali e arredi.",
      bullets: [
        "Moodboard: una tavola visiva che rappresenta l’atmosfera e lo stile della casa.",
        "Palette colori con codici di riferimento.",
        "Selezione di materiali e finiture da accostare.",
        "Abaco arredi per riconoscere forme e finiture coerenti con lo stile.",
      ],
      note: "La mappa non comprende disposizione degli arredi, render o una shopping list di prodotti acquistabili.",
      cta: BOOKING.mappaPaymentLink
        ? {
            kind: "payment",
            label: "Acquista la mappa di stile",
            href: BOOKING.mappaPaymentLink,
            note: `Paghi online in modo sicuro con carta (Stripe). ${BILLING_NOTE} Subito dopo l’acquisto ti scrivo via email per farmi inviare foto e riferimenti: la mappa è pronta entro 2 settimane lavorative dal loro arrivo.`,
          }
        : emailCta("Richiedi la mappa di stile", "Informazioni mappa di stile", "Mappa di stile"),
      gallery: MOODBOARDS,
    },
    seo: {
      title: "Mappa di stile per la casa – moodboard, palette e materiali – 399 €",
      description:
        "La mappa di stile è una guida personalizzata per definire lo stile di tutta la casa: moodboard, palette colori con codici, materiali e finiture, abaco degli arredi. Servizio online, 399 €.",
    },
    choice: "Cerco il mio stile",
  },
  {
    id: "ambiente",
    slug: "progetto-ambiente",
    number: "03",
    eyebrow: "Uno spazio da ripensare",
    name: "Progetto di un ambiente",
    cardTitle: ["Progetto di", "un ambiente"],
    cardText:
      "Vuoi ripensare il living, la camera o un altro ambiente? Studio lo spazio e gli arredi per unire le tue esigenze a uno stile coerente.",
    cardBullets: [
      "Planimetria con disposizione degli arredi.",
      "Moodboard, modello 3D e viste fotorealistiche.",
      "Shopping list con link per l’acquisto.",
    ],
    cardCta: "Scopri il progetto di un ambiente",
    price: { amount: 499, from: true, label: "499 €" },
    detail: {
      title: "Progetto di un ambiente",
      question: "Vuoi ripensare il living, la camera o un altro ambiente?",
      text: "Una proposta personalizzata per organizzare lo spazio e coordinare colori, materiali e arredamento, tenendo conto delle tue abitudini e degli elementi da mantenere. Per capire dove collocare gli arredi, cosa acquistare e come apparirà l’ambiente.",
      bullets: [
        "Analisi dello spazio e planimetria con disposizione spazi e ingombri degli arredi.",
        "Moodboard con accostamenti di colori e materiali.",
        "Modello 3D e 1–2 viste fotorealistiche dell’ambiente.",
        "Shopping list con arredi selezionati e link per l’acquisto.",
      ],
      cta: emailCta("Richiedi un preventivo", "Progetto di un ambiente", "Progetto di un ambiente"),
      gallery: [...HERO_SLIDES].reverse(),
    },
    seo: {
      title: "Progetto di interior di un ambiente online – da 499 €",
      description:
        "Progetto online di un singolo ambiente (living, camera, cucina, bagno): planimetria con arredi, moodboard, modello 3D con viste fotorealistiche e shopping list. A partire da 499 €.",
    },
    choice: "Ripenso un ambiente",
  },
  {
    id: "su-misura",
    slug: "progetto-su-misura",
    number: "04",
    eyebrow: "Un percorso dedicato",
    name: "Progetto di interior su misura",
    cardTitle: ["Progetto di interior", "su misura"],
    cardText:
      "Hai acquistato casa o stai ristrutturando un appartamento? Sviluppiamo un progetto coordinato, con contenuti definiti sulle tue esigenze.",
    cardBullets: [
      "Studio degli spazi, colori e materiali.",
      "Visualizzazioni 3D e selezione degli arredi.",
      "Schemi luce e soluzioni su misura da concordare.",
    ],
    cardCta: "Scopri il progetto su misura",
    price: { label: "Su preventivo" },
    detail: {
      title: "Progetto di interior su misura",
      question: "Hai acquistato casa o stai ristrutturando un intero appartamento?",
      text: "Un progetto coordinato per dare continuità agli interni della tua casa, dalla disposizione degli spazi alla scelta dell’interior. Definiamo insieme gli ambienti da sviluppare e il livello di approfondimento.",
      listIntro: "In base alla proposta concordata, il progetto comprende:",
      bullets: [
        "Analisi dell’esistente e planimetria.",
        "Moodboard, palette colori e abaco materiali e finiture.",
        "Modelli 3D e viste fotorealistiche.",
        "Shopping list degli arredi principali con link per l’acquisto.",
        "Schemi di impianti (elettrico, illuminotecnico).",
        "Arredi su misura o altri approfondimenti da concordare.",
      ],
      cta: emailCta("Raccontami il tuo progetto", "Progetto di interior su misura", "Progetto di interior su misura"),
      gallery: HERO_SLIDES,
    },
    seo: {
      title: "Progetto di interior su misura per casa e ristrutturazione",
      description:
        "Progetto di interior su misura per chi ha acquistato casa o ristruttura: planimetria, moodboard, materiali, modelli 3D, shopping list, schemi luce e arredi su misura. Su preventivo.",
    },
    choice: "Ho un progetto più ampio",
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function servicePath(service: Service) {
  return `/servizi/${service.slug}`;
}

/** Vecchi indirizzi a hash della bozza (#servizio/mappa) -> nuove pagine. */
export const LEGACY_HASHES: Record<string, string> = Object.fromEntries(
  SERVICES.map((s) => [`#servizio/${s.id}`, servicePath(s)]),
);
