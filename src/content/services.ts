import { BOOKING_ENV, mailto, validCalLink, validPaymentLink } from "@/lib/site";
import { HERO_SLIDES, MOODBOARDS } from "./images";
import type { Cta, Service, ServiceInput, Settings } from "./types";

const BILLING_NOTE = "Al momento del pagamento ti chiederò i dati per la fattura (codice fiscale e indirizzo).";

/** Servizi predefiniti: usati finché Sanity non è configurato e come seed dell'import. */
export const DEFAULT_SERVICES: ServiceInput[] = [
  {
    id: "consulenza",
    slug: "consulenza-online",
    number: "01",
    eyebrow: "Dubbi da risolvere",
    name: "Consulenza online",
    cardTitle: "Consulenza online",
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
    choice: "Ho un dubbio preciso",
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
      gallery: HERO_SLIDES,
      galleryFit: "cover",
    },
    action: {
      kind: "booking",
      label: "Prenota e paga la consulenza",
      note: `Scegli giorno e orario e paghi online in modo sicuro con carta (Stripe). ${BILLING_NOTE} Subito dopo la prenotazione ti scrivo via email con le indicazioni per inviarmi il materiale, da mandare almeno 3 giorni prima della videocall.`,
      emailLabel: "Prenota la consulenza",
      emailSubject: "Richiesta consulenza 60 minuti",
    },
    bankTransfer: {
      enabled: true,
      confirm:
        "Alla ricezione del pagamento ti confermo data e orario della videocall e ti scrivo con le indicazioni per il materiale, da inviare almeno 3 giorni prima.",
    },
    seo: {
      title: "Consulenza interior design online – 149 €",
      description:
        "Consulenza di interior design online di 60 minuti con Marianna Mancini: analisi di foto e planimetrie, videocall sui tuoi dubbi e PDF riepilogativo. 149 €.",
    },
  },
  {
    id: "mappa",
    slug: "mappa-di-stile",
    number: "02",
    eyebrow: "Una guida personalizzata",
    name: "Mappa di stile",
    cardTitle: "Mappa\ndi stile",
    cardText:
      "Tante idee, ma nessun filo conduttore? Definiamo lo stile della tua casa con una guida personalizzata per orientare le scelte successive.",
    cardBullets: [
      "Moodboard con atmosfera e stile.",
      "Palette colori, materiali e finiture.",
      "Riferimenti di arredi e abbinamenti.",
    ],
    cardCta: "Scopri la mappa di stile",
    price: { amount: 399, label: "399 €" },
    choice: "Cerco il mio stile",
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
      gallery: MOODBOARDS,
      galleryFit: "contain",
    },
    action: {
      kind: "payment",
      label: "Acquista la mappa di stile",
      note: `Paghi online in modo sicuro con carta (Stripe). ${BILLING_NOTE} Subito dopo l’acquisto ti scrivo via email per farmi inviare foto e riferimenti: la mappa è pronta entro 2 settimane lavorative dal loro arrivo.`,
      paymentLink: BOOKING_ENV.mappaPaymentLink,
      emailLabel: "Richiedi la mappa di stile",
      emailSubject: "Informazioni mappa di stile",
    },
    seo: {
      title: "Mappa di stile per la casa – 399 €",
      description:
        "Guida personalizzata allo stile di tutta la casa: moodboard, palette colori con codici, materiali, finiture e abaco degli arredi. Servizio online, 399 €.",
    },
  },
  {
    id: "ambiente",
    slug: "progetto-ambiente",
    number: "03",
    eyebrow: "Uno spazio da ripensare",
    name: "Progetto di un ambiente",
    cardTitle: "Progetto di\nun ambiente",
    cardText:
      "Vuoi ripensare il living, la camera o un altro ambiente? Studio lo spazio e gli arredi per unire le tue esigenze a uno stile coerente.",
    cardBullets: [
      "Planimetria con disposizione degli arredi.",
      "Moodboard, modello 3D e viste fotorealistiche.",
      "Shopping list con link per l’acquisto.",
    ],
    cardCta: "Scopri il progetto di un ambiente",
    price: { amount: 499, from: true, label: "499 €" },
    choice: "Ripenso un ambiente",
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
      gallery: [...HERO_SLIDES].reverse(),
      galleryFit: "cover",
    },
    action: {
      kind: "email",
      label: "Richiedi un preventivo",
      emailLabel: "Richiedi un preventivo",
      emailSubject: "Progetto di un ambiente",
    },
    seo: {
      title: "Progetto di un ambiente online – da 499 €",
      description:
        "Progetto online di un ambiente (living, camera, cucina, bagno): planimetria con arredi, moodboard, 3D con viste fotorealistiche e shopping list. Da 499 €.",
    },
  },
  {
    id: "su-misura",
    slug: "progetto-su-misura",
    number: "04",
    eyebrow: "Un percorso dedicato",
    name: "Progetto di interior su misura",
    cardTitle: "Progetto di interior\nsu misura",
    cardText:
      "Hai acquistato casa o stai ristrutturando un appartamento? Sviluppiamo un progetto coordinato, con contenuti definiti sulle tue esigenze.",
    cardBullets: [
      "Studio degli spazi, colori e materiali.",
      "Visualizzazioni 3D e selezione degli arredi.",
      "Schemi luce e soluzioni su misura da concordare.",
    ],
    cardCta: "Scopri il progetto su misura",
    price: { label: "Su preventivo" },
    choice: "Ho un progetto più ampio",
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
      gallery: HERO_SLIDES,
      galleryFit: "cover",
    },
    action: {
      kind: "email",
      label: "Raccontami il tuo progetto",
      emailLabel: "Raccontami il tuo progetto",
      emailSubject: "Progetto di interior su misura",
    },
    seo: {
      title: "Progetto di interior su misura",
      description:
        "Progetto di interior su misura per chi compra casa o ristruttura: planimetria, moodboard, materiali, 3D, shopping list, schemi luce e arredi su misura.",
    },
  },
];

/** Pulsante della pagina servizio: se il link di Cal.com o Stripe manca, si passa all'email. */
function resolveCta(input: ServiceInput, settings: Settings): Cta {
  const { action } = input;
  const calLink = validCalLink(settings.calLink);
  const paymentLink = validPaymentLink(action.paymentLink);
  if (action.kind === "booking" && calLink)
    return { kind: "booking", label: action.label, calLink, note: action.note ?? "" };
  if (action.kind === "payment" && paymentLink)
    return { kind: "payment", label: action.label, href: paymentLink, note: action.note ?? "" };
  return {
    kind: "email",
    label: action.kind === "email" ? action.label : action.emailLabel,
    href: mailto(
      settings.email,
      action.emailSubject,
      `Buongiorno Marianna,\n\nvorrei ricevere informazioni sul servizio ${input.name}.\n\n`,
    ),
  };
}

export function resolveService(input: ServiceInput, settings: Settings): Service {
  const { cardTitle, action, bankTransfer, ...rest } = input;
  return {
    ...rest,
    cardTitle: cardTitle.split("\n").map((l) => l.trim()).filter(Boolean),
    cta: resolveCta(input, settings),
    bankTransfer: bankTransfer?.enabled
      ? { kind: action.kind === "booking" ? "booking" : "payment", confirm: bankTransfer.confirm }
      : undefined,
  };
}

export function servicePath(service: Pick<Service, "slug">) {
  return `/servizi/${service.slug}`;
}

/** Vecchi indirizzi a hash della bozza (#servizio/mappa) -> nuove pagine. */
export function legacyHashes(services: Service[]): Record<string, string> {
  return Object.fromEntries(services.map((s) => [`#servizio/${s.id}`, servicePath(s)]));
}
