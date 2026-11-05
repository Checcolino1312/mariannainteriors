import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Carousel } from "@/components/Carousel";
import { BankTransfer } from "@/components/booking/BankTransfer";
import { BookConsultation } from "@/components/booking/BookConsultation";
import { JsonLd } from "@/components/JsonLd";
import { Price } from "@/components/home/Services";
import { servicePath } from "@/content/services";
import { OG_IMAGE } from "@/lib/site";
import { getService, getServices, getSettings } from "@/lib/cms";
import { servicePageSchema } from "@/lib/schema";
import { ArrowLeft, ArrowUpRight } from "@/components/Icons";

export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/servizi/[slug]">): Promise<Metadata> {
  const service = await getService((await params).slug);
  if (!service) return {};
  const url = servicePath(service);
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: url },
    openGraph: { url, title: service.seo.title, description: service.seo.description, images: [OG_IMAGE] },
    twitter: { title: service.seo.title, description: service.seo.description, images: [OG_IMAGE] },
  };
}

export default async function ServicePage({ params }: PageProps<"/servizi/[slug]">) {
  const { slug } = await params;
  const [service, services, settings] = await Promise.all([getService(slug), getServices(), getSettings()]);
  if (!service) notFound();
  const { detail, cta } = service;
  const others = services.filter((s) => s.slug !== service.slug);
  const texts = settings.servicePage;

  return (
    <div className="page-offset">
      <article className="service-detail wrap" aria-labelledby="detail-title">
        <nav className="breadcrumb" aria-label="Percorso">
          <Link className="detail-back" href={`/#${service.id}`}>
            <ArrowLeft className="arrow" /> {texts.back}
          </Link>
        </nav>
        <div className="detail-grid">
          <Carousel
            slides={detail.gallery}
            label={`Immagini di riferimento: ${service.name}`}
            className="detail-gallery"
            sizes="(max-width: 620px) 100vw, 50vw"
            eager
            fit={detail.galleryFit}
            note={texts.galleryNote}
          />
          <div className="detail-copy" data-reveal-group>
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
              {detail.bullets.map((b, i) => (
                <li key={i}>{b}</li>
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
                  <ArrowUpRight className="arrow" />
                </a>
              )}
            </div>
            {service.bankTransfer && (
              <BankTransfer
                bank={settings.bank}
                email={settings.email}
                service={service.name}
                amount={service.price.label}
                kind={service.bankTransfer.kind}
                confirm={service.bankTransfer.confirm}
                open={cta.kind === "email"}
              />
            )}
            {cta.kind === "email" ? (
              service.bankTransfer ? (
                <p className="detail-note">
                  Procedendo con l’acquisto accetti le <Link href="/condizioni-di-vendita">condizioni di vendita</Link>.
                </p>
              ) : (
                <p className="detail-note">{texts.emailNote}</p>
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
            {texts.others}
          </h2>
          <ul data-reveal-group>
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={servicePath(s)}>
                  <span className="number">{s.number}</span>
                  <span className="other-name">{s.name}</span>
                  <span className="other-price">
                    {s.price.from ? "da " : ""}
                    {s.price.label}
                  </span>
                  <ArrowUpRight className="arrow" />
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
