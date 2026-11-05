import type { PortableTextBlock } from "@portabletext/react";

// Forma dei contenuti del sito. È la stessa per i valori predefiniti (src/content/*)
// e per i documenti Sanity (sanity/schemaTypes/*): i nomi dei campi coincidono.
//
// Convenzione per i titoli: "\n" va a capo, *testo* è in corsivo (vedi components/Lines.tsx).

export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Punto focale (hotspot di Sanity) come CSS object-position, es. "50% 30%". */
  position?: string;
};

export type RichText = PortableTextBlock[];

export type NavItem = { label: string; href: string };

export type Settings = {
  name: string;
  handle: string;
  payoff: string;
  /** Titolo e descrizione per Google e condivisioni. */
  title: string;
  description: string;
  ownerName: string;
  ownerRole: string;
  email: string;
  vat: string;
  instagram: string;
  instagramReels: string;
  copyrightYear: number;
  /** Evento Cal.com della consulenza, "utente/evento". Vuoto: si prenota via email. */
  calLink: string;
  bank: {
    holder: string;
    iban: string;
    /** Il cliente sostituisce "nome cognome", mostrato in corsivo. */
    causale: string;
    title: string;
    /** Passi comuni a tutti i servizi; il passo finale è nel servizio. */
    steps: string[];
    link: string;
  };
  nav: NavItem[];
  /** Sfondo materico di intro e navbar. */
  background: { landscape: SiteImage; portrait: SiteImage };
  servicePage: { back: string; others: string; galleryNote: string; emailNote: string };
};

export type Price = { amount?: number; from?: boolean; label: string };

/** Servizio come si modifica (Sanity / valori predefiniti). */
export type ServiceInput = {
  /** Ancora della card in home (#consulenza). Compatibile con i vecchi link. */
  id: string;
  slug: string;
  number: string;
  eyebrow: string;
  name: string;
  /** Titolo della card: ogni riga va a capo. */
  cardTitle: string;
  cardSubtitle?: string;
  cardText: string;
  cardBullets: string[];
  cardCta: string;
  price: Price;
  /** Testo del pulsante in "Da dove vuoi iniziare?". */
  choice: string;
  detail: {
    title: string;
    subtitle?: string;
    question: string;
    text: string;
    listIntro?: string;
    bullets: string[];
    note?: string;
    gallery: SiteImage[];
    galleryFit: "cover" | "contain";
  };
  /**
   * Azione principale della pagina:
   * - "booking": prenotazione + pagamento su Cal.com (link nelle impostazioni);
   * - "payment": Stripe Payment Link;
   * - "email": richiesta via email precompilata.
   * Se il link di Cal.com o Stripe manca, si passa all'email.
   */
  action: {
    kind: "booking" | "payment" | "email";
    label: string;
    note?: string;
    paymentLink?: string;
    emailLabel: string;
    emailSubject: string;
  };
  bankTransfer?: { enabled: boolean; confirm: string };
  seo: { title: string; description: string };
};

export type Cta =
  | { kind: "booking"; label: string; calLink: string; note: string }
  | { kind: "payment"; label: string; href: string; note: string }
  | { kind: "email"; label: string; href: string };

/** Servizio pronto per le pagine. */
export type Service = Omit<ServiceInput, "cardTitle" | "action" | "bankTransfer"> & {
  cardTitle: string[];
  cta: Cta;
  /** Pagabile anche con bonifico. "booking": la data della consulenza si fissa via email. */
  bankTransfer?: { kind: "booking" | "payment"; confirm: string };
};

export type Figure = { image: SiteImage; eyebrow: string; title: string; text: string };
export type Step = { title: string; text: string };
export type Faq = { q: string; a: string };

export type Home = {
  intro: { scrollLabel: string };
  hero: {
    eyebrow: string;
    title: string;
    text: string;
    button: string;
    slides: SiteImage[];
    counterLabel: string;
    note: string;
    vertical: string;
  };
  moodboards: SiteImage[];
  services: {
    eyebrow: string;
    title: string;
    aside: string;
    orientEyebrow: string;
    orientTitle: string;
    orientResult: string;
  };
  examples: {
    eyebrow: string;
    title: string;
    tabProjects: string;
    tabStyle: string;
    figures: Figure[];
    style: {
      slides: SiteImage[];
      eyebrow: string;
      palette: { name: string; hex: string }[];
      title: string;
      text: string;
      link: string;
    };
    note: string;
  };
  about: {
    eyebrow: string;
    title: string;
    portrait: SiteImage;
    subtitle: string;
    body: RichText;
    signatureRole: string;
    link: string;
  };
  process: { title: string; steps: Step[] };
  faq: { eyebrow: string; title: string; items: Faq[] };
  cta: { eyebrow: string; title: string; button: string; emailSubject: string };
  instagram: { title: string; fallback: { title: string; image: SiteImage }[] };
};

export type ThankYouVariant = { eyebrow: string; title: string; intro: string; when: string; subject: string };

export type ThankYou = {
  variants: { consulenza: ThankYouVariant; mappa: ThankYouVariant; generico: ThankYouVariant };
  prepareTitle: string;
  prepare: string[];
  /** {email} diventa il link all'indirizzo email. */
  contact: string;
  button: string;
  emailBody: string;
};

export type Legal = { eyebrow: string; title: string; description: string; body: RichText };
export type LegalKind = "privacy" | "condizioni";
