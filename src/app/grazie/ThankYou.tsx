"use client";

import { useSearchParams } from "next/navigation";
import { SITE, mailto } from "@/lib/site";
import { ArrowUpRight } from "@/components/Icons";

const PREPARE = [
  "Fotografie degli ambienti, scattate con luce naturale e da più punti di vista.",
  "La planimetria o, se non ce l’hai, le misure principali delle stanze.",
  "Qualche immagine di riferimento che ti piace (anche screenshot da Instagram o Pinterest).",
  "Gli elementi che vuoi mantenere: arredi, pavimenti, colori.",
];

const COPY = {
  consulenza: {
    eyebrow: "Consulenza prenotata",
    title: ["Grazie,", "ci vediamo presto."],
    intro:
      "Il pagamento è andato a buon fine e la tua consulenza è confermata: riceverai un’email automatica con data, orario e link alla videocall. Subito dopo ti scriverò io, via email, con tutte le indicazioni per prepararci all’incontro.",
    when: "Il materiale va inviato almeno 3 giorni prima della videocall, così potrò studiarlo con calma.",
    subject: "Materiale per la consulenza online",
  },
  mappa: {
    eyebrow: "Mappa di stile acquistata",
    title: ["Grazie,", "iniziamo dal tuo stile."],
    intro:
      "Il pagamento è andato a buon fine. Subito dopo ti scriverò io, via email, con le indicazioni per inviarmi il materiale: la tua mappa di stile sarà pronta entro 2 settimane lavorative dal suo arrivo.",
    when: "Prima ricevo il materiale, prima iniziamo.",
    subject: "Materiale per la mappa di stile",
  },
  generico: {
    eyebrow: "Richiesta ricevuta",
    title: ["Grazie,", "a presto."],
    intro: "Il pagamento è andato a buon fine. Riceverai a breve un’email di conferma.",
    when: "Per iniziare, inviami il materiale via email.",
    subject: "Materiale per il mio progetto",
  },
} as const;

export function ThankYou() {
  const servizio = useSearchParams().get("servizio");
  const copy = servizio === "consulenza" || servizio === "mappa" ? COPY[servizio] : COPY.generico;
  return <ThankYouContent copy={copy} />;
}

export function ThankYouContent({ copy = COPY.generico }: { copy?: (typeof COPY)[keyof typeof COPY] }) {
  return (
    <>
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1>
        {copy.title[0]}
        <br />
        <em>{copy.title[1]}</em>
      </h1>
      <p>{copy.intro}</p>
      <h2>Cosa preparare</h2>
      <ul>
        {PREPARE.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>
        {copy.when} Scrivimi a <a href={`mailto:${SITE.email}`}>{SITE.email}</a> indicando lo stesso nome usato per il
        pagamento: per file pesanti va benissimo un link WeTransfer o Google Drive.
      </p>
      <a
        className="button hero-button"
        href={mailto(copy.subject, "Buongiorno Marianna,\n\nti invio il materiale per il servizio che ho acquistato.\n\n")}
      >
        Invia il materiale via email <ArrowUpRight className="arrow" />
      </a>
    </>
  );
}
