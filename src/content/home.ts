import { markdownToBlocks } from "@/lib/rich-text";
import { validPaymentLink, BOOKING_ENV } from "@/lib/site";
import { HERO_SLIDES, MOODBOARDS, PORTRAIT, PROJECT_IMAGES, REELS } from "./images";
import { DEFAULT_SETTINGS } from "./settings";
import type { Home } from "./types";

function bookingAnswer() {
  const online = [
    DEFAULT_SETTINGS.calLink &&
      "la consulenza online si prenota e si paga direttamente dal sito, scegliendo giorno e orario",
    validPaymentLink(BOOKING_ENV.mappaPaymentLink) && "la mappa di stile si acquista online",
  ].filter(Boolean) as string[];
  const bonifico =
    "La consulenza si può pagare anche con bonifico: trovi IBAN e causale nella sua pagina, poi mi invii la ricevuta con i dati per la fattura.";
  const altri = `Per gli altri servizi scrivimi a ${DEFAULT_SETTINGS.email}: ti risponderò con un preventivo e i prossimi passi.`;
  if (!online.length)
    return `${bonifico.replace("anche ", "")} Per la consulenza fissiamo insieme data e orario via email. ${altri}`;
  const sentence = online.join("; ");
  return `${sentence[0].toUpperCase()}${sentence.slice(1)}, con carta. Al pagamento ti chiederò i dati per la fattura. ${bonifico} ${altri}`;
}

/** Testi e immagini predefiniti della home: usati finché Sanity non è configurato e come seed dell'import. */
export const DEFAULT_HOME: Home = {
  intro: { scrollLabel: "Scopri" },
  hero: {
    eyebrow: "Consulenze e progetti di interior design online",
    title: "Il tuo spazio,\ncon una\n*direzione chiara.*",
    text: "Dalle prime idee alle scelte concrete, ti aiuto a definire i tuoi spazi e a scegliere colori, materiali e arredi che funzionano insieme e rispecchiano la tua identità.",
    button: "Scopri il servizio adatto a te",
    slides: HERO_SLIDES,
    counterLabel: "Spazi da abitare",
    note: "Immagine d’atmosfera · AI",
    vertical: "I miei progetti",
  },
  moodboards: MOODBOARDS,
  services: {
    eyebrow: "01 / I percorsi",
    title: "Quanto è grande\n*la tua idea?*",
    aside: "Quattro modi di lavorare insieme.\nScegli il supporto di cui hai bisogno,\nnel momento in cui ti serve.",
    orientEyebrow: "Un piccolo orientamento",
    orientTitle: "Da dove vuoi iniziare?",
    orientResult: "Il tuo punto di partenza",
  },
  examples: {
    eyebrow: "02 / Dalle idee allo spazio",
    title: "Prima una visione.\n*Poi le scelte.*",
    tabProjects: "I progetti",
    tabStyle: "La mappa di stile",
    figures: [
      {
        image: { ...PROJECT_IMAGES.living, alt: "Esempio illustrativo AI di un living con libreria e palette naturale" },
        eyebrow: "01 / Living",
        title: "Equilibrio naturale",
        text: "Volumi semplici, texture morbide, un accento di colore.",
      },
      {
        image: { ...PROJECT_IMAGES.bagno, alt: "Esempio illustrativo AI di un bagno con materiali caldi e luce integrata" },
        eyebrow: "02 / Bagno",
        title: "Materia e luce",
        text: "Toni continui, dettagli coordinati, una luce che accompagna.",
      },
    ],
    style: {
      slides: HERO_SLIDES,
      eyebrow: "Esempio illustrativo / Direzione naturale",
      palette: [
        { name: "beige", hex: "#EEE9E2" },
        { name: "burro", hex: "#F4E9B6" },
        { name: "terracotta", hex: "#A26238" },
        { name: "noce", hex: "#2C1F17" },
      ],
      title: "Un filo conduttore\nper le tue scelte.",
      text: "Un colore, un pavimento, un arredo possono piacerti singolarmente. Un buon progetto nasce dal modo in cui questi elementi dialogano tra loro.\n\nLa mappa di stile ti aiuta a vedere l’insieme prima di scegliere i singoli elementi: una bussola da consultare per capire cosa introdurre, cosa mantenere e quali alternative seguire.",
      link: "Scopri la mappa di stile",
    },
    note: "Esempi illustrativi con immagini AI. Mostrano una direzione visiva e non sono fotografie di progetti realizzati.",
  },
  about: {
    eyebrow: "03 / Il mio approccio",
    title: "Piacere,\n*sono Marianna.*",
    portrait: PORTRAIT,
    subtitle: "Ti aiuto a dare una direzione alle idee e forma ai tuoi spazi.",
    body: markdownToBlocks(
      `Mi sono formata in architettura e ho scelto di dedicarmi all’interior design: all’organizzazione degli spazi e all’equilibrio tra materia e forme.

Spesso le difficoltà nascono all’inizio: si scelgono pavimenti, colori e arredi separatamente, senza sapere come funzioneranno insieme. Il mio lavoro parte da qui: mettere ordine nelle idee e sviluppare una visione d’insieme prima di procedere con le singole decisioni.

Partiamo dalle tue ispirazioni, da chi sei, da come vivi quotidianamente i tuoi spazi.

Attraverso le moodboard traduco questi riferimenti in una direzione progettuale, che sviluppo nella disposizione degli spazi, nei materiali, nei colori e in tutto l’arredamento. Un progetto in cui ritrovare chi sei e ciò che ti piace, con un filo conduttore tra le diverse scelte.

Lavoriamo online, attraverso fotografie, planimetrie e videocall, dalle prime idee alla definizione del progetto di interior.`,
      "about",
    ),
    signatureRole: "Interior designer",
    link: "Scegliamo da dove iniziare",
  },
  process: {
    title: "Come lavoriamo insieme",
    steps: [
      {
        title: "Ti ascolto",
        text: "Ascolto le tue esigenze e partiamo dai tuoi spazi. Analizzo fotografie, planimetrie e riferimenti.",
      },
      {
        title: "Troviamo una direzione",
        text: "Definiamo una direzione e sviluppo i consigli o le soluzioni progettuali previsti dal servizio scelto, confrontandoci sulle proposte.",
      },
      {
        title: "La soluzione nelle tue mani",
        text: "Un PDF di consigli, una guida di stile personalizzata o il progetto di interior: ricevi ciò di cui hai bisogno, pronto a prendere vita.",
      },
    ],
  },
  faq: {
    eyebrow: "Prima di iniziare",
    title: "Qualche\n*risposta utile.*",
    items: [
      {
        q: "Qual è la differenza tra consulenza e progetto?",
        a: "La consulenza è un incontro mirato per chiarire dubbi specifici. Il progetto sviluppa una proposta per lo spazio, con contenuti e materiali definiti nel percorso concordato.",
      },
      {
        q: "La mappa stilistica è una moodboard?",
        a: "La mappa stilistica mette in relazione riferimenti, palette e materiali per definire una direzione coerente. Il suo contenuto viene concordato prima di iniziare.",
      },
      {
        q: "Che cosa devo preparare per la consulenza?",
        a: "Fotografie dello spazio, una planimetria o le misure disponibili, i tuoi dubbi e qualche immagine di riferimento. Subito dopo la prenotazione ti scrivo via email con le indicazioni: il materiale va inviato almeno 3 giorni prima della videocall.",
      },
      {
        q: "Quanto tempo serve per ricevere la mappa di stile?",
        a: "La mappa di stile si richiede via email: ti rispondo con modalità di pagamento e prossimi passi, poi ti chiedo fotografie, planimetria e riferimenti. È pronta entro 2 settimane lavorative dalla ricezione del materiale.",
      },
      { q: "Come posso prenotare o acquistare un servizio?", a: bookingAnswer() },
      {
        q: "Il progetto preliminare include tavole esecutive?",
        a: "Il percorso descritto qui presenta la disposizione degli arredi e le scelte di interior. Eventuali elaborati tecnici o esecutivi devono essere esplicitamente concordati nel preventivo.",
      },
      {
        q: "Lavori anche fuori dalla mia città?",
        a: "Sì. Il servizio è interamente online: lavoriamo attraverso fotografie, planimetrie e videocall, ovunque tu sia.",
      },
    ],
  },
  cta: {
    eyebrow: "Iniziamo dal tuo spazio",
    title: "Una casa più tua.\nUna scelta alla volta.",
    button: "Raccontami la tua idea",
    emailSubject: "La mia idea per la casa",
  },
  instagram: { title: "Seguimi su IG!", fallback: REELS },
};
