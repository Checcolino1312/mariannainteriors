import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Informazioni sul trattamento dei dati personali sul sito di Marianna Interiors.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="page-offset">
      <article className="wrap legal">
        <p className="eyebrow">Informazioni</p>
        <h1>Privacy</h1>

        <h2>Titolare del trattamento</h2>
        <p>
          {SITE.owner.name} — P. IVA {SITE.vat}. Per qualsiasi richiesta relativa ai tuoi dati puoi scrivere a{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>

        <h2>Navigazione</h2>
        <p>
          Il sito non utilizza strumenti di analisi né cookie di profilazione e non contiene moduli che salvano dati. I
          pulsanti di contatto aprono un’email nel tuo programma di posta: sarai tu a decidere se inviarla.
        </p>

        <h2>Prenotazioni e pagamenti</h2>
        <p>
          La prenotazione della consulenza avviene tramite Cal.com, che si apre solo quando premi il pulsante di
          prenotazione; i pagamenti sono gestiti da Stripe. Questi servizi trattano i dati che inserisci (nome, email,
          dati di pagamento e di fatturazione) e possono usare cookie tecnici necessari al loro funzionamento. Puoi
          consultare le loro informative:{" "}
          <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer">
            Cal.com
          </a>{" "}
          e{" "}
          <a href="https://stripe.com/it/privacy" target="_blank" rel="noopener noreferrer">
            Stripe
          </a>
          . I dati della carta non transitano né vengono conservati sul sito.
        </p>

        <h2>Dati di fatturazione</h2>
        <p>
          Nome, codice fiscale, indirizzo e, per le aziende, partita IVA e codice SDI o PEC sono richiesti al momento
          dell’acquisto per emettere la fattura, come previsto dalla normativa fiscale, e sono conservati per il periodo
          richiesto dalla legge.
        </p>

        <h2>Comunicazioni e materiale del progetto</h2>
        <p>
          I dati che mi invii via email (fotografie, planimetrie e informazioni sui tuoi spazi) sono utilizzati
          esclusivamente per rispondere alla tua richiesta e per svolgere il servizio acquistato.
        </p>

        <h2>I tuoi diritti</h2>
        <p>
          Puoi chiedere in qualsiasi momento accesso, rettifica o cancellazione dei tuoi dati, nei limiti degli obblighi
          di legge, scrivendo a <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Vedi anche le{" "}
          <Link href="/condizioni-di-vendita">condizioni di vendita</Link>.
        </p>
      </article>
    </div>
  );
}
