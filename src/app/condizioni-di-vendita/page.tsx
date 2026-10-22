import type { Metadata } from "next";
import Link from "next/link";
import { BANK, SITE, formatIban } from "@/lib/site";

export const metadata: Metadata = {
  title: "Condizioni di vendita",
  description: "Condizioni di vendita dei servizi di interior design online acquistabili sul sito di Marianna Interiors.",
  alternates: { canonical: "/condizioni-di-vendita" },
};

// BOZZA: testo da far verificare a un consulente (commercialista/legale) prima della pubblicazione,
// in particolare regime fiscale, termini di annullamento della consulenza e rimborsi.
export default function TermsPage() {
  return (
    <div className="page-offset">
      <article className="wrap legal" data-reveal-group>
        <p className="eyebrow">Informazioni</p>
        <h1>Condizioni di vendita</h1>

        <h2>1. Chi vende</h2>
        <p>
          I servizi sono offerti da {SITE.owner.name}, {SITE.owner.role.toLowerCase()}, P. IVA {SITE.vat} («Marianna
          Interiors»). Contatti: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>

        <h2>2. Servizi e prezzi</h2>
        <p>
          Contenuti e prezzi dei servizi sono descritti nelle rispettive pagine del sito. I prezzi sono in euro e sono
          quelli indicati al momento dell’acquisto. L’attività è svolta in regime forfettario (art. 1, commi 54–89, L.
          190/2014): i prezzi non sono soggetti a IVA. I prezzi indicati sono finali e comprendono l’eventuale imposta di
          bollo: non ci sono costi aggiuntivi. I servizi «Progetto di un ambiente» e «Progetto di interior su
          misura» sono offerti su preventivo e regolati dall’accordo scritto concordato di volta in volta.
        </p>

        <h2>3. Acquisto e pagamento</h2>
        <p>
          La consulenza online si prenota scegliendo giorno e orario nel calendario e si paga al momento della
          prenotazione; i pagamenti online sono gestiti da Stripe: i dati della carta non
          transitano né vengono conservati sul sito. Al pagamento vengono richiesti i dati necessari all’emissione della
          fattura, che verrà inviata via email.
        </p>
        <p>
          In alternativa puoi pagare con bonifico bancario intestato a {BANK.holder}, IBAN {formatIban(BANK.iban)},
          causale «{BANK.causale}», inviando la ricevuta e i dati per la fattura a{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. In questo caso l’acquisto è confermato alla ricezione del
          pagamento: per la consulenza data e orario vengono fissati insieme via email.
        </p>
        <p>
          La mappa di stile si richiede via email: modalità di pagamento e prossimi passi vengono comunicati in risposta
          alla richiesta.
        </p>

        <h2>4. Erogazione del servizio</h2>
        <p>
          I servizi si svolgono interamente online. Dopo l’acquisto riceverai via email la conferma e le indicazioni per
          inviare fotografie, planimetrie e riferimenti. Per la consulenza ti contatterò via email subito dopo la
          prenotazione; il materiale va inviato almeno 3 giorni prima della videocall, che si svolge nella data
          prenotata. Il riepilogo in PDF viene inviato dopo l’incontro. Per la mappa di stile ti contatterò via email
          dopo la conferma dell’ordine per ricevere il materiale; la mappa viene consegnata in formato digitale entro 2
          settimane lavorative dalla ricezione del materiale.
        </p>

        <h2>5. Spostamento e annullamento della consulenza</h2>
        <p>
          Puoi spostare o annullare la consulenza gratuitamente fino a 48 ore prima dell’appuntamento, usando il link
          presente nell’email di conferma o scrivendo a <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. In caso di
          annullamento entro questo termine l’importo viene rimborsato per intero.
        </p>

        <h2>6. Diritto di recesso</h2>
        <p>
          Se acquisti come consumatore hai diritto di recedere entro 14 giorni dall’acquisto, senza indicarne il motivo,
          scrivendo a <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Se chiedi espressamente che il servizio inizi
          prima della scadenza di questo termine (ad esempio prenotando la consulenza in una data entro 14 giorni, o
          inviando il materiale per la mappa di stile), in caso di recesso è dovuto un importo proporzionato a quanto già
          svolto; una volta che il servizio è stato interamente eseguito, il diritto di recesso non si applica (art. 59
          del Codice del Consumo). I rimborsi avvengono con lo stesso metodo di pagamento entro 14 giorni.
        </p>

        <h2>7. Dati personali</h2>
        <p>
          Il trattamento dei dati è descritto nell’<Link href="/privacy">informativa privacy</Link>.
        </p>

        <h2>8. Legge applicabile e reclami</h2>
        <p>
          Le presenti condizioni sono regolate dalla legge italiana. Per qualsiasi reclamo puoi scrivere a{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. I consumatori residenti nell’Unione europea possono inoltre
          ricorrere alla piattaforma europea di risoluzione online delle controversie.
        </p>
      </article>
    </div>
  );
}
