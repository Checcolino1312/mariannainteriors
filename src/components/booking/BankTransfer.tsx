"use client";

import { useState } from "react";
import { BANK, formatIban, mailto } from "@/lib/site";
import { ArrowUpRight } from "@/components/Icons";

type Props = {
  service: string;
  amount: string;
  /** "booking": la data della consulenza si fissa via email dopo il bonifico. */
  kind: "booking" | "payment";
  /** Aperto di default quando il bonifico è l'unico modo di pagare online. */
  open?: boolean;
};

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button type="button" className="copy-button" onClick={copy} aria-label={`Copia ${label}`}>
      {copied ? "Copiato" : "Copia"}
    </button>
  );
}

/** Istruzioni per pagare con bonifico e inviare ricevuta e dati per la fattura via email. */
export function BankTransfer({ service, amount, kind, open }: Props) {
  const body = [
    "Buongiorno Marianna,",
    "",
    `ho effettuato il bonifico per il servizio ${service} (${amount}). Allego la ricevuta.`,
    "",
    "Dati per la fattura:",
    "- Nome e cognome / ragione sociale: ",
    "- Codice fiscale: ",
    "- Indirizzo completo: ",
    "- Partita IVA e codice SDI o PEC (solo aziende): ",
    ...(kind === "booking" ? ["", "Date e orari che preferisco per la videocall (2 o 3 proposte): ", ""] : [""]),
    "Grazie!",
  ].join("\n");

  return (
    <details className="bank-transfer" open={open}>
      <summary>Preferisci pagare con bonifico?</summary>
      <dl className="bank-data">
        <div>
          <dt>Intestatario</dt>
          <dd>{BANK.holder}</dd>
        </div>
        <div>
          <dt>IBAN</dt>
          <dd>
            <span className="iban">{formatIban(BANK.iban)}</span>
            <CopyButton value={BANK.iban} label="IBAN" />
          </dd>
        </div>
        <div>
          <dt>Importo</dt>
          <dd>{amount}</dd>
        </div>
        <div>
          <dt>Causale</dt>
          <dd>
            <span>
              {BANK.causale.replace("nome cognome", "")}
              <em>nome cognome</em>
            </span>
            <CopyButton value={BANK.causale} label="causale" />
          </dd>
        </div>
      </dl>
      <ol className="bank-steps">
        <li>Effettua il bonifico indicando il tuo nome e cognome nella causale.</li>
        <li>Inviami la ricevuta via email insieme ai dati per la fattura (codice fiscale e indirizzo).</li>
        <li>
          {kind === "booking"
            ? "Alla ricezione del pagamento ti confermo data e orario della videocall e ti scrivo con le indicazioni per il materiale, da inviare almeno 3 giorni prima."
            : "Alla ricezione del pagamento ti scrivo per farmi inviare il materiale: la mappa è pronta entro 2 settimane lavorative dal suo arrivo."}
        </li>
      </ol>
      <a className="text-link" href={mailto(`Bonifico ${service} - nome cognome`, body)}>
        Invia ricevuta e dati per la fattura <ArrowUpRight className="arrow" />
      </a>
    </details>
  );
}
