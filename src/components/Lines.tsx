import { Fragment, type ReactNode } from "react";

/** *testo* in corsivo. */
function italic(line: string): ReactNode[] {
  return line.split(/\*([^*]+)\*/).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));
}

/**
 * Titolo modificabile da Sanity: ogni "\n" va a capo, *testo* è in corsivo.
 * Es. "Il tuo spazio,\ncon una\n*direzione chiara.*"
 */
export function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {italic(line)}
        </Fragment>
      ))}
    </>
  );
}

/** Testo con paragrafi separati da una riga vuota. */
export function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p, i) => (
          <p key={i}>{p}</p>
        ))}
    </>
  );
}

/** Sostituisce {email} con il link all'indirizzo. */
export function WithEmail({ text, email }: { text: string; email: string }) {
  return (
    <>
      {text.split("{email}").map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <a href={`mailto:${email}`}>{email}</a>}
          {part}
        </Fragment>
      ))}
    </>
  );
}
