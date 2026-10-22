# Prenotazioni e pagamenti online — guida per Marianna

Il sito è già pronto: per la consulenza serve solo **il link dell'evento Cal.com** (con Stripe collegato).

| Servizio sul sito | Come funziona | Strumento |
| --- | --- | --- |
| Consulenza online 60 minuti (149 €) | Il cliente sceglie giorno e ora, inserisce i dati per la fattura e paga subito | **Cal.com** + **Stripe** |
| Mappa di stile (399 €) | Per ora su richiesta via email (pagamento concordato con te) | — |
| Progetto ambiente / su misura | Restano su richiesta via email (preventivo) | — |

Finché il link non è inserito, il pulsante della consulenza apre un'email e resta disponibile il bonifico: niente si rompe.

Costi: Cal.com è gratuito; Stripe non ha canone e trattiene una commissione su ogni pagamento (circa 1,5 % + 0,25 € per le carte europee; verifica le tariffe aggiornate su stripe.com/it/pricing).

---

## 1. Stripe (incassi)

1. Vai su **stripe.com/it** → *Inizia ora* e crea l'account con la tua email.
2. Completa l'attivazione: tipo di attività (libera professionista / ditta individuale), **P. IVA 04324221201**, dati personali, **IBAN** dove ricevere i pagamenti.
3. In *Impostazioni → Branding* carica il logo e imposta il colore **#AB663C**.
4. In *Impostazioni → Email ai clienti* attiva le **ricevute per i pagamenti riusciti**.
5. In *Impostazioni → Notifiche* attiva l'email per i **pagamenti riusciti**: così ricevi un avviso a ogni acquisto.

> Stripe incassa e invia la ricevuta, ma **non emette la fattura elettronica italiana**: la fattura la emetti come fai oggi (gestionale / commercialista) usando i dati che il cliente inserisce al pagamento.

## 2. Mappa di stile: per ora solo su richiesta via email

Per ora la mappa di stile **non si paga online**: il pulsante "Richiedi la mappa di stile" apre un'email a te, e modalità di pagamento e prossimi passi li concordi rispondendo. Consegna entro **2 settimane lavorative** dall'arrivo del materiale.

Se in futuro vorrai il pagamento online, il sito è già pronto: crei in Stripe un *Payment Link* (prodotto "Mappa di stile" 399 €, indirizzo di fatturazione, campi personalizzati Codice fiscale / P. IVA / SDI o PEC, reindirizzamento a `https://www.mariannainteriors.it/grazie?servizio=mappa`) e lo inserisci come `NEXT_PUBLIC_MAPPA_PAYMENT_LINK`.

## 3. Cal.com per la consulenza

1. Vai su **cal.com** → *Get started* e registrati (piano gratuito). Scegli un nome utente, ad esempio `marianna-interiors`.
2. *Impostazioni → Generale*: lingua **Italiano**, fuso orario **Europe/Rome**.
3. *Calendari*: collega **Google Calendar** (o Outlook), così gli appuntamenti finiscono nel tuo calendario e gli orari già occupati vengono bloccati.
4. *Disponibilità*: imposta giorni e orari in cui vuoi ricevere consulenze.
5. *App*: installa **Google Meet** (o Zoom) per il link della videocall e **Stripe** (collegalo all'account del punto 1).
6. *Tipi di evento → Nuovo*: **Consulenza online 60 minuti**, durata **60 minuti**, slug ad esempio `consulenza-60`.
   - **Posizione**: Google Meet.
   - **Limiti**: **preavviso minimo di almeno 4 giorni** (il materiale deve arrivarti almeno 3 giorni prima della videocall, più il tempo per la tua email di contatto), pausa tra appuntamenti (es. 15 minuti).
   - **App → Stripe**: attiva il pagamento, prezzo **149 €**, valuta EUR.
   - **Avanzate → Domande di prenotazione** (oltre a nome ed email, già presenti), aggiungi:
     - *Codice fiscale* — testo breve, obbligatorio;
     - *Indirizzo di fatturazione* — tipo "Indirizzo", obbligatorio;
     - *Partita IVA (solo aziende)* — testo breve, facoltativo;
     - *Codice SDI o PEC (solo aziende)* — testo breve, facoltativo;
     - *Raccontami brevemente i tuoi dubbi* — testo lungo, facoltativo.
   - **Reindirizzamento dopo la prenotazione**: non serve (è una funzione del piano a pagamento). Quando il cliente prenota dal sito, è il sito stesso a portarlo sulla pagina "Grazie" appena prenotazione e pagamento sono confermati.
7. Salva. Il link dell'evento sarà `cal.com/marianna-interiors/consulenza-60`: la parte che serve al sito è **`marianna-interiors/consulenza-60`**.

Ogni prenotazione ti arriva via email con data, ora, dati per la fattura e risposte alle domande; la trovi anche in *Prenotazioni* su Cal.com. Il cliente può spostare o annullare dal link nella sua email di conferma.

Dopo ogni prenotazione **scrivi tu al cliente** con le indicazioni per il materiale (da inviare almeno 3 giorni prima della videocall): il sito e la pagina "Grazie" glielo anticipano già.

## 4. Link nel sito ✅

Il link dell'evento è già inserito: **`cal.com/marianna.interiors/consulenza-60min`** (in `src/lib/site.ts`, `BOOKING.calLink`).
Se in futuro cambi il nome utente o lo slug dell'evento su Cal.com, va aggiornato lì (oppure con la variabile `NEXT_PUBLIC_CAL_LINK` nel pannello dell'hosting).

**Non serve creare un prodotto su Stripe per la consulenza**: il prezzo (149 €) è impostato nell'evento Cal.com, e Cal.com usa il tuo account Stripe collegato per incassare. Su Stripe vedrai direttamente i pagamenti.

Nella pagina della consulenza il pulsante è **"Prenota e paga la consulenza"** e apre il calendario in una finestra sul sito; dopo il pagamento il cliente arriva sulla pagina "Grazie".

## 5. Prova prima di andare online

Un pagamento da 0 € non è possibile (Stripe richiede almeno 0,50 €) e su Cal.com in cloud la modalità di test di Stripe in genere non è disponibile. Per provare tutto spendendo pochi centesimi:

1. Su Cal.com **duplica l'evento** della consulenza, chiamalo "Prova" (slug `prova`), rendilo **nascosto** e metti il prezzo a **1 €**. L'evento vero resta a 149 €.
2. Il sito si collega temporaneamente all'evento di prova (in locale o con `NEXT_PUBLIC_CAL_LINK=marianna.interiors/prova`).
3. Prenota **dal sito** e paga 1 € con una carta vera: verifica il passaggio alla pagina "Grazie", le email con i dati per la fattura, l'appuntamento in calendario e il link Meet.
4. Rimborsa l'euro da Stripe (*Pagamenti → il pagamento → Rimborsa*) ed elimina l'evento di prova. Stripe trattiene la sua commissione anche sui rimborsi: la prova costa circa 25-30 centesimi.

## 6. Pagamento con bonifico

Nella pagina della **consulenza** c'è anche l'opzione "Preferisci pagare con bonifico?" con:

- intestatario **Marianna Mancini**, IBAN **IT88 E030 6979 1941 0000 0011 742**;
- causale **"consulenza interior design - nome cognome"**;
- un pulsante che prepara un'email per te con la ricevuta e i dati per la fattura (codice fiscale, indirizzo, P. IVA e SDI/PEC per le aziende); il cliente indica anche 2-3 date e orari che preferisce.

Il bonifico funziona subito, anche prima di attivare Stripe e Cal.com: finché quei link non ci sono, il riquadro del bonifico è già aperto nella pagina.

Cosa fai tu quando arriva un bonifico:
1. controlli l'accredito sul conto (un bonifico ordinario impiega 1-2 giorni lavorativi);
2. **consulenza**: confermi via email data e orario e, se usi Cal.com, blocchi quell'orario nel calendario (Google Calendar o una prenotazione manuale su Cal.com), così nessuno lo prenota online;
3. emetti la fattura con i dati ricevuti via email.

Intestatario e causale si cambiano in `src/lib/site.ts` (`BANK`).

## 7. Da confermare prima della pubblicazione

- **Condizioni di vendita** (`/condizioni-di-vendita`): annullamento entro 48 ore, regime forfettario e consegna della mappa in 2 settimane lavorative sono confermati. Restano da far verificare a un legale il consenso all'avvio anticipato del servizio (diritto di recesso) e la frase sulla piattaforma europea ODR.
- **Fatture oltre 77,47 €**: va applicata la marca da bollo da 2 €. Sul sito e nelle condizioni di vendita i prezzi sono **finali, bollo incluso** (149 € e 399 €): in fattura il commercialista indicherà la forma corretta (es. 147 € + 2 € di bollo, oppure 149 € con bollo a tuo carico). Il cliente paga comunque 149 €.
