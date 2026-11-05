import { markdownToBlocks } from "@/lib/rich-text";
import { formatIban } from "@/lib/site";
import { DEFAULT_SETTINGS as S } from "./settings";
import type { Legal, LegalKind, ThankYou } from "./types";

/** Pagina "Grazie" predefinita (arrivo dopo pagamento o prenotazione). */
export const DEFAULT_THANK_YOU: ThankYou = {
  variants: {
    consulenza: {
      eyebrow: "Consulenza prenotata",
      title: "Grazie,\n*ci vediamo presto.*",
      intro:
        "Il pagamento è andato a buon fine e la tua consulenza è confermata: riceverai un’email automatica con data, orario e link alla videocall. Subito dopo ti scriverò io, via email, con tutte le indicazioni per prepararci all’incontro.",
      when: "Il materiale va inviato almeno 3 giorni prima della videocall, così potrò studiarlo con calma.",
      subject: "Materiale per la consulenza online",
    },
    mappa: {
      eyebrow: "Mappa di stile acquistata",
      title: "Grazie,\n*iniziamo dal tuo stile.*",
      intro:
        "Il pagamento è andato a buon fine. Subito dopo ti scriverò io, via email, con le indicazioni per inviarmi il materiale: la tua mappa di stile sarà pronta entro 2 settimane lavorative dal suo arrivo.",
      when: "Prima ricevo il materiale, prima iniziamo.",
      subject: "Materiale per la mappa di stile",
    },
    generico: {
      eyebrow: "Richiesta ricevuta",
      title: "Grazie,\n*a presto.*",
      intro: "Il pagamento è andato a buon fine. Riceverai a breve un’email di conferma.",
      when: "Per iniziare, inviami il materiale via email.",
      subject: "Materiale per il mio progetto",
    },
  },
  prepareTitle: "Cosa preparare",
  prepare: [
    "Fotografie degli ambienti, scattate con luce naturale e da più punti di vista.",
    "La planimetria o, se non ce l’hai, le misure principali delle stanze.",
    "Qualche immagine di riferimento che ti piace (anche screenshot da Instagram o Pinterest).",
    "Gli elementi che vuoi mantenere: arredi, pavimenti, colori.",
  ],
  contact:
    "Scrivimi a {email} indicando lo stesso nome usato per il pagamento: per file pesanti va benissimo un link WeTransfer o Google Drive.",
  button: "Invia il materiale via email",
  emailBody: "Buongiorno Marianna,\n\nti invio il materiale per il servizio che ho acquistato.\n\n",
};

const email = `[${S.email}](mailto:${S.email})`;

// BOZZE da far verificare a un consulente (commercialista/legale) prima della pubblicazione:
// - privacy: fornitori effettivi (es. casella email), basi giuridiche e tempi di conservazione;
// - condizioni: regime fiscale, termini di annullamento della consulenza e rimborsi.
export const DEFAULT_LEGAL: Record<LegalKind, Legal> = {
  privacy: {
    eyebrow: "Informazioni",
    title: "Privacy",
    description: "Informazioni sul trattamento dei dati personali sul sito di Marianna Interiors.",
    body: markdownToBlocks(
      `## Titolare del trattamento

${S.ownerName} (Marianna Interiors), P. IVA ${S.vat}. Per qualsiasi richiesta relativa ai tuoi dati puoi scrivere a ${email}.

## Navigazione e cookie

Il sito non utilizza strumenti di analisi, pubblicità o cookie di profilazione e non contiene moduli che salvano dati: per questo non è necessario un banner per i cookie. I caratteri tipografici e le immagini sono serviti dal sito stesso. I pulsanti di contatto aprono un’email nel tuo programma di posta: sarai tu a decidere se inviarla.

Il fornitore di hosting del sito, Vercel Inc., registra automaticamente nei log tecnici dati come indirizzo IP, data e ora della richiesta e tipo di browser, per garantire il funzionamento e la sicurezza del servizio (legittimo interesse, art. 6.1.f GDPR). Questi dati sono conservati per il tempo strettamente necessario a tali finalità e non sono usati per identificarti.

## Prenotazioni e pagamenti

La prenotazione della consulenza avviene tramite Cal.com, che si apre solo quando premi il pulsante di prenotazione; i pagamenti sono gestiti da Stripe. Questi servizi trattano i dati che inserisci (nome, email, dati di pagamento e di fatturazione) e possono usare cookie tecnici necessari al loro funzionamento. Puoi consultare le loro informative: [Cal.com](https://cal.com/privacy) e [Stripe](https://stripe.com/it/privacy). I dati della carta non transitano né vengono conservati sul sito. Base giuridica: esecuzione del contratto (art. 6.1.b GDPR).

## Anteprime Instagram

Le anteprime dei post Instagram sono fornite da [Behold.so](https://behold.so/privacy) e vengono servite dal sito stesso: la tua navigazione non le richiede direttamente a Instagram né a Behold.

## Dati di fatturazione

Nome, codice fiscale, indirizzo e, per le aziende, partita IVA e codice SDI o PEC sono richiesti al momento dell’acquisto per emettere la fattura, come previsto dalla normativa fiscale (obbligo di legge, art. 6.1.c GDPR). Senza questi dati non è possibile completare l’acquisto. Fatture e documenti contabili sono conservati per 10 anni, come richiesto dalla legge.

## Comunicazioni e materiale del progetto

I dati che mi invii via email (fotografie, planimetrie e informazioni sui tuoi spazi) sono utilizzati esclusivamente per rispondere alla tua richiesta e per svolgere il servizio acquistato (misure precontrattuali ed esecuzione del contratto, art. 6.1.b GDPR). Sono conservati per il tempo necessario a svolgere il servizio e a gestire eventuali richieste successive, poi cancellati.

## Chi tratta i dati per conto del titolare

I dati sono trattati dal titolare e, per i soli servizi indicati, da fornitori che agiscono come responsabili o titolari autonomi del trattamento: Vercel (hosting del sito), Cal.com (prenotazioni), Stripe (pagamenti), il fornitore della casella email ed eventualmente il commercialista per gli adempimenti fiscali. I dati non sono diffusi né usati per decisioni automatizzate o profilazione.

## Trasferimenti fuori dall’Unione europea

Alcuni fornitori (Vercel, Cal.com, Stripe) hanno sede negli Stati Uniti. I trasferimenti avvengono sulla base del Data Privacy Framework UE-USA, per i fornitori aderenti, o delle clausole contrattuali standard approvate dalla Commissione europea.

## I tuoi diritti

Puoi chiedere in qualsiasi momento accesso, rettifica, cancellazione, limitazione del trattamento, portabilità dei dati e opporti al trattamento basato sul legittimo interesse, nei limiti degli obblighi di legge, scrivendo a ${email}. Hai inoltre diritto di proporre reclamo al [Garante per la protezione dei dati personali](https://www.garanteprivacy.it). Vedi anche le [condizioni di vendita](/condizioni-di-vendita).`,
      "privacy",
    ),
  },
  condizioni: {
    eyebrow: "Informazioni",
    title: "Condizioni di vendita",
    description:
      "Condizioni di vendita dei servizi di interior design online acquistabili sul sito di Marianna Interiors.",
    body: markdownToBlocks(
      `## 1. Chi vende

I servizi sono offerti da ${S.ownerName}, ${S.ownerRole.toLowerCase()}, P. IVA ${S.vat} («Marianna Interiors»). Contatti: ${email}.

## 2. Servizi e prezzi

Contenuti e prezzi dei servizi sono descritti nelle rispettive pagine del sito. I prezzi sono in euro e sono quelli indicati al momento dell’acquisto. L’attività è svolta in regime forfettario (art. 1, commi 54–89, L. 190/2014): i prezzi non sono soggetti a IVA. I prezzi indicati sono finali e comprendono l’eventuale imposta di bollo: non ci sono costi aggiuntivi. I servizi «Progetto di un ambiente» e «Progetto di interior su misura» sono offerti su preventivo e regolati dall’accordo scritto concordato di volta in volta.

## 3. Acquisto e pagamento

La consulenza online si prenota scegliendo giorno e orario nel calendario e si paga al momento della prenotazione; i pagamenti online sono gestiti da Stripe: i dati della carta non transitano né vengono conservati sul sito. Al pagamento vengono richiesti i dati necessari all’emissione della fattura, che verrà inviata via email.

In alternativa puoi pagare con bonifico bancario intestato a ${S.bank.holder}, IBAN ${formatIban(S.bank.iban)}, causale «${S.bank.causale}», inviando la ricevuta e i dati per la fattura a ${email}. In questo caso l’acquisto è confermato alla ricezione del pagamento: per la consulenza data e orario vengono fissati insieme via email.

La mappa di stile si richiede via email: modalità di pagamento e prossimi passi vengono comunicati in risposta alla richiesta.

## 4. Erogazione del servizio

I servizi si svolgono interamente online. Dopo l’acquisto riceverai via email la conferma e le indicazioni per inviare fotografie, planimetrie e riferimenti. Per la consulenza ti contatterò via email subito dopo la prenotazione; il materiale va inviato almeno 3 giorni prima della videocall, che si svolge nella data prenotata. Il riepilogo in PDF viene inviato dopo l’incontro. Per la mappa di stile ti contatterò via email dopo la conferma dell’ordine per ricevere il materiale; la mappa viene consegnata in formato digitale entro 2 settimane lavorative dalla ricezione del materiale.

## 5. Spostamento e annullamento della consulenza

Puoi spostare o annullare la consulenza gratuitamente fino a 48 ore prima dell’appuntamento, usando il link presente nell’email di conferma o scrivendo a ${email}. In caso di annullamento entro questo termine l’importo viene rimborsato per intero.

## 6. Diritto di recesso

Se acquisti come consumatore hai diritto di recedere entro 14 giorni dall’acquisto, senza indicarne il motivo, scrivendo a ${email}. Se chiedi espressamente che il servizio inizi prima della scadenza di questo termine (ad esempio prenotando la consulenza in una data entro 14 giorni, o inviando il materiale per la mappa di stile), in caso di recesso è dovuto un importo proporzionato a quanto già svolto; una volta che il servizio è stato interamente eseguito, il diritto di recesso non si applica (art. 59 del Codice del Consumo). I rimborsi avvengono con lo stesso metodo di pagamento entro 14 giorni.

## 7. Dati personali

Il trattamento dei dati è descritto nell’[informativa privacy](/privacy).

## 8. Legge applicabile e reclami

Le presenti condizioni sono regolate dalla legge italiana. Per qualsiasi reclamo puoi scrivere a ${email}. Per i consumatori è competente il foro del luogo di residenza o domicilio del consumatore.`,
      "terms",
    ),
  },
};
