import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Carousel } from "@/components/Carousel";
import { BankTransfer } from "@/components/booking/BankTransfer";
import { BookConsultation } from "@/components/booking/BookConsultation";
import { JsonLd } from "@/components/JsonLd";
import { Price } from "@/components/home/Services";
import { SERVICES, getService, servicePath } from "@/content/services";
import { servicePageSchema } from "@/lib/schema";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/servizi/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  const url = servicePath(service);
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: url },
    openGraph: { url, title: service.seo.title, description: service.seo.description },
    twitter: { title: service.seo.title, description: service.seo.description },
  };
}

export default async function ServicePage({ params }: PageProps<"/servizi/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const { detail } = service;
  const { cta } = detail;
  const others = SERVICES.filter((s) => s.id !== service.id);

  return (
    <div className="page-offset">
      <article className="service-detail wrap" aria-labelledby="detail-title">
        <nav className="breadcrumb" aria-label="Percorso">
          <Link className="detail-back" href={`/#${service.id}`}>
            <span aria-hidden="true">←</span> Torna ai servizi
          </Link>
        </nav>
        <div className="detail-grid">
          <Carousel
            slides={detail.gallery}
            label={`Immagini di riferimento: ${service.name}`}
            className="detail-gallery"
            sizes="(max-width: 620px) 100vw, 50vw"
            eager
            fit={service.id === "mappa" ? "contain" : "cover"}
            note="Immagini illustrative · AI"
          />
          <div className="detail-copy">
            <p className="eyebrow">
              <span className="number">{service.number}</span>
              {service.eyebrow}
            </p>
            <h1 id="detail-title">
              {detail.title}
              {detail.subtitle && <span>{detail.subtitle}</span>}
            </h1>
            <h2>{detail.question}</h2>
            <p>{detail.text}</p>
            {detail.listIntro && <p className="detail-list-intro">{detail.listIntro}</p>}
            <ul>
              {detail.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            {detail.note && <p className="detail-note">{detail.note}</p>}
            <div className="detail-bottom">
              <Price price={service.price} />
              {cta.kind === "booking" ? (
                <BookConsultation calLink={cta.calLink} label={cta.label} />
              ) : (
                <a
                  className="service-button"
                  href={cta.href}
                  {...(cta.kind === "payment" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {cta.label}
                  <span className="arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              )}
            </div>
            {service.bankTransfer && (
              <BankTransfer
                service={service.name}
                amount={service.price.label}
                kind={service.id === "consulenza" ? "booking" : "payment"}
                open={cta.kind === "email"}
              />
            )}
            {cta.kind === "email" ? (
              service.bankTransfer ? (
                <p className="detail-note">
                  Procedendo con l’acquisto accetti le <Link href="/condizioni-di-vendita">condizioni di vendita</Link>.
                </p>
              ) : (
                <p className="detail-note">
                  Il servizio si svolge online, attraverso fotografie, planimetrie e videocall. Scrivimi per
                  disponibilità, modalità di pagamento e prossimi passi.
                </p>
              )
            ) : (
              <div className="purchase-note">
                <p>{cta.note}</p>
                <p>
                  Procedendo con l’acquisto accetti le <Link href="/condizioni-di-vendita">condizioni di vendita</Link>.
                </p>
              </div>
            )}
          </div>
        </div>

        <nav className="other-services" aria-labelledby="other-services-title">
          <h2 id="other-services-title" className="eyebrow">
            Altri percorsi
          </h2>
          <ul>
            {others.map((s) => (
              <li key={s.id}>
                <Link href={servicePath(s)}>
                  <span className="number">{s.number}</span>
                  <span className="other-name">{s.name}</span>
                  <span className="other-price">
                    {s.price.from ? "da " : ""}
                    {s.price.label}
                  </span>
                  <span className="arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>
      <JsonLd data={servicePageSchema(service)} />
    </div>
  );
}
