"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "@/components/Icons";

type Option = { id: string; choice: string; name: string; href: string };

/** "Da dove vuoi iniziare?": suggerisce il servizio in base all'esigenza scelta. */
type Props = { eyebrow: string; title: string; result: string; options: Option[] };

export function Orient({ eyebrow, title, result, options }: Props) {
  const [selected, setSelected] = useState(options[0]);
  return (
    <div className="orient" data-reveal>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
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
            <p className="eyebrow">{result}</p>
            <h3>{selected.name}</h3>
          </div>
          <Link className="recommend-link" href={selected.href} aria-label={`Scopri: ${selected.name}`}>
            <ArrowUpRight className="arrow" />
          </Link>
        </div>
      </div>
    </div>
  );
}
