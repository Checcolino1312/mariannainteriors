"use client";

import Link from "next/link";
import { useState } from "react";

type Option = { id: string; choice: string; name: string; href: string };

/** "Da dove vuoi iniziare?": suggerisce il servizio in base all'esigenza scelta. */
export function Orient({ options }: { options: Option[] }) {
  const [selected, setSelected] = useState(options[0]);
  return (
    <div className="orient" data-reveal>
      <div>
        <p className="eyebrow">Un piccolo orientamento</p>
        <h3>Da dove vuoi iniziare?</h3>
      </div>
      <div>
        <div className="choices" role="group" aria-label="Scegli la tua esigenza">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              className="choice"
              aria-pressed={o.id === selected.id}
              onClick={() => setSelected(o)}
            >
              {o.choice}
            </button>
          ))}
        </div>
        <div className="recommend" aria-live="polite">
          <div>
            <p className="eyebrow">Il tuo punto di partenza</p>
            <h3>{selected.name}</h3>
          </div>
          <Link className="recommend-link" href={selected.href} aria-label={`Scopri: ${selected.name}`}>
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
