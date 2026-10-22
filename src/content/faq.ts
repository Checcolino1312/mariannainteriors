import { BOOKING } from "@/lib/site";

function bookingAnswer() {
  const online = [
    BOOKING.calLink && "la consulenza online si prenota e si paga direttamente dal sito, scegliendo giorno e orario",
    BOOKING.mappaPaymentLink && "la mappa di stile si acquista online",
  ].filter(Boolean);
  const bonifico =
    "La consulenza si può pagare anche con bonifico: trovi IBAN e causale nella sua pagina, poi mi invii la ricevuta con i dati per la fattura.";
  const altri = "Per gli altri servizi scrivimi a info@mariannainteriors.it: ti risponderò con un preventivo e i prossimi passi.";
  if (!online.length)
    return `${bonifico.replace("anche ", "")} Per la consulenza fissiamo insieme data e orario via email. ${altri}`;
  const sentence = online.join("; ");
  return `${sentence[0].toUpperCase()}${sentence.slice(1)}, con carta. Al pagamento ti chiederò i dati per la fattura. ${bonifico} ${altri}`;
}

export const FAQ = [
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
  {
    q: "Come posso prenotare o acquistare un servizio?",
    a: bookingAnswer(),
  },
  {
    q: "Il progetto preliminare include tavole esecutive?",
    a: "Il percorso descritto qui presenta la disposizione degli arredi e le scelte di interior. Eventuali elaborati tecnici o esecutivi devono essere esplicitamente concordati nel preventivo.",
  },
  {
    q: "Lavori anche fuori dalla mia città?",
    a: "Sì. Il servizio è interamente online: lavoriamo attraverso fotografie, planimetrie e videocall, ovunque tu sia.",
  },
];

export const PROCESS = [
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
];
