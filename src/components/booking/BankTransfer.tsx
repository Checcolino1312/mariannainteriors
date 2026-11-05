"use client";

import { useState } from "react";
import type { Settings } from "@/content/types";
import { formatIban, mailto } from "@/lib/site";
import { ArrowUpRight } from "@/components/Icons";

type Props = {
  bank: Settings["bank"];
  email: string;
  service: string;
  amount: string;
  /** "booking": la data della consulenza si fissa via email dopo il bonifico. */
  kind: "booking" | "payment";
  /** Aperto di default quando il bonifico è l'unico modo di pagare online. */
  open?: boolean;
  /** Ultimo passo: cosa succede alla ricezione del bonifico. */
  confirm: string;
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
export function BankTransfer({ bank, email, service, amount, kind, open, confirm }: Props) {
  const iban = bank.iban.replace(/\s+/g, "");
  // "nome cognome" nella causale è il segnaposto che il cliente sostituisce: lo mostriamo in corsivo.
  const placeholder = bank.causale.indexOf("nome cognome");
  const causaleStart = placeholder >= 0 ? bank.causale.slice(0, placeholder) : bank.causale;
  const causaleEnd = placeholder >= 0 ? bank.causale.slice(placeholder + "nome cognome".length) : null;
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
      <summary>{bank.title}</summary>
      <dl className="bank-data">
        <div>
          <dt>Intestatario</dt>
          <dd>{bank.holder}</dd>
        </div>
        <div>
          <dt>IBAN</dt>
          <dd>
            <span className="iban">{formatIban(iban)}</span>
            <CopyButton value={iban} label="IBAN" />
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
              {causaleStart}
              {causaleEnd !== null && (
                <>
                  <em>nome cognome</em>
                  {causaleEnd}
                </>
              )}
            </span>
            <CopyButton value={bank.causale} label="causale" />
          </dd>
        </div>
      </dl>
      <ol className="bank-steps">
        {bank.steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
        {confirm && <li>{confirm}</li>}
      </ol>
      <a className="text-link" href={mailto(email, `Bonifico ${service} - nome cognome`, body)}>
        {bank.link} <ArrowUpRight className="arrow" />
      </a>
    </details>
  );
}
