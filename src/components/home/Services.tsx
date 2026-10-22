import Link from "next/link";
import { Fragment } from "react";
import { SERVICES, servicePath, type Service } from "@/content/services";
import { Orient } from "./Orient";
import { ArrowUpRight } from "@/components/Icons";

export function Price({ price }: { price: Service["price"] }) {
  return (
    <div className="price">
      {price.from && <small>A partire da</small>}
      {price.label}
    </div>
  );
}

export function Services() {
  return (
    <section id="servizi" className="section wrap" aria-labelledby="servizi-title">
      <div className="heading-row" data-reveal>
        <div>
          <p className="eyebrow">01 / I percorsi</p>
          <h2 id="servizi-title">
            Quanto è grande
            <br />
            <em>la tua idea?</em>
          </h2>
        </div>
        <p>
          Quattro modi di lavorare insieme.
          <br />
          Scegli il supporto di cui hai bisogno, nel momento in cui ti serve.
        </p>
      </div>
      <div className="services" data-reveal-group>
        {SERVICES.map((s) => (
          <article key={s.id} id={s.id} className="service">
            <p className="eyebrow">
              <span className="number">{s.number}</span>
              {s.eyebrow}
            </p>
            <h3>
              {s.cardTitle.map((line, i) => (
                <Fragment key={line}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))}
              {s.cardSubtitle && <span className="service-subtitle">{s.cardSubtitle}</span>}
            </h3>
            <p>{s.cardText}</p>
            <ul>
              {s.cardBullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="service-bottom">
              <Price price={s.price} />
              <Link className="service-button" href={servicePath(s)}>
                {s.cardCta}
                <ArrowUpRight className="arrow" />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <Orient
        options={SERVICES.map((s) => ({ id: s.id, choice: s.choice, name: s.name, href: servicePath(s) }))}
      />
    </section>
  );
}
