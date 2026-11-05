import Link from "next/link";
import { Fragment } from "react";
import { servicePath } from "@/content/services";
import type { Home, Price as PriceValue, Service } from "@/content/types";
import { Orient } from "./Orient";
import { ArrowUpRight } from "@/components/Icons";
import { Lines } from "@/components/Lines";

export function Price({ price }: { price: PriceValue }) {
  return (
    <div className="price">
      {price.from && <small>A partire da</small>}
      {price.label}
    </div>
  );
}

export function Services({ content, services }: { content: Home["services"]; services: Service[] }) {
  return (
    <section id="servizi" className="section wrap" aria-labelledby="servizi-title">
      <div className="heading-row" data-reveal>
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="servizi-title">
            <Lines text={content.title} />
          </h2>
        </div>
        <p className="heading-aside">
          <Lines text={content.aside} />
        </p>
      </div>
      <div className="services" data-reveal-group>
        {services.map((s) => (
          <article key={s.id} id={s.id} className="service">
            <p className="eyebrow">
              <span className="number">{s.number}</span>
              {s.eyebrow}
            </p>
            <h3>
              {s.cardTitle.map((line, i) => (
                <Fragment key={i}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))}
              {s.cardSubtitle && <span className="service-subtitle">{s.cardSubtitle}</span>}
            </h3>
            <p>{s.cardText}</p>
            <ul>
              {s.cardBullets.map((b, i) => (
                <li key={i}>{b}</li>
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
      {services.length > 0 && (
        <Orient
          eyebrow={content.orientEyebrow}
          title={content.orientTitle}
          result={content.orientResult}
          options={services.map((s) => ({ id: s.id, choice: s.choice, name: s.name, href: servicePath(s) }))}
        />
      )}
    </section>
  );
}
