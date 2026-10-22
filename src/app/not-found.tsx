import Link from "next/link";
import { Monogram } from "@/components/brand/Logo";
import { ArrowUpRight } from "@/components/Icons";

export default function NotFound() {
  return (
    <div className="page-offset">
      <section className="wrap not-found" data-reveal-group>
        <Monogram className="not-found-mark" />
        <p className="eyebrow">Errore 404</p>
        <h1>
          Questa stanza
          <br />
          <em>non esiste.</em>
        </h1>
        <p>La pagina che cerchi è stata spostata o non è mai esistita.</p>
        <Link className="button hero-button" href="/">
          Torna alla home <ArrowUpRight className="arrow" />
        </Link>
      </section>
    </div>
  );
}
