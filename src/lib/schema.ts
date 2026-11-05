import { servicePath } from "@/content/services";
import type { Faq, Service, Settings, SiteImage } from "@/content/types";
import { SITE_URL, absoluteUrl, calUrl } from "./site";

// Dati strutturati schema.org: identità unica (@id) riusata da tutte le pagine,
// così motori di ricerca e assistenti AI collegano persona, attività e servizi.
const ORG_ID = absoluteUrl("/#organization");
const PERSON_ID = absoluteUrl("/#marianna-mancini");
const WEBSITE_ID = absoluteUrl("/#website");

function offer(service: Service) {
  const base = {
    "@type": "Offer",
    url: absoluteUrl(servicePath(service)),
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    seller: { "@id": ORG_ID },
  };
  if (service.price.amount === undefined) return { ...base, description: "Su preventivo" };
  if (service.price.from)
    return {
      ...base,
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: service.price.amount,
        priceCurrency: "EUR",
      },
    };
  return { ...base, price: service.price.amount };
}

export function serviceSchema(service: Service) {
  return {
    "@type": "Service",
    "@id": absoluteUrl(`${servicePath(service)}#service`),
    name: service.name,
    serviceType: "Interior design online",
    description: service.seo.description,
    url: absoluteUrl(servicePath(service)),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Italia" },
    availableChannel: {
      "@type": "ServiceChannel",
      name: "Online: videocall, fotografie e planimetrie",
      serviceUrl: absoluteUrl(servicePath(service)),
    },
    offers: offer(service),
    ...purchaseAction(service),
  };
}

/** Azione online disponibile (prenota e paga / acquista), solo se configurata. */
function purchaseAction(service: Service) {
  const { cta } = service;
  if (cta.kind === "booking")
    return { potentialAction: { "@type": "ReserveAction", name: cta.label, target: calUrl(cta.calLink) } };
  if (cta.kind === "payment") return { potentialAction: { "@type": "BuyAction", name: cta.label, target: cta.href } };
  return {};
}

export function siteSchema(site: Settings, services: Service[], portrait: SiteImage) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": ORG_ID,
        name: site.name,
        alternateName: site.handle,
        slogan: site.payoff,
        description: site.description,
        url: SITE_URL,
        email: site.email,
        vatID: `IT${site.vat}`,
        logo: absoluteUrl("/icon-512.png"),
        image: absoluteUrl("/opengraph-image.jpg"),
        founder: { "@id": PERSON_ID },
        sameAs: [site.instagram],
        areaServed: { "@type": "Country", name: "Italia" },
        paymentAccepted: "Carta di credito, carta di debito, bonifico bancario",
        currenciesAccepted: "EUR",
        knowsAbout: [
          "Interior design",
          "Progettazione d'interni",
          "Moodboard",
          "Palette colori",
          "Materiali e finiture",
          "Arredamento",
          "Ristrutturazione",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servizi di interior design online",
          itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@id": absoluteUrl(`${servicePath(s)}#service`) } })),
        },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: site.ownerName,
        jobTitle: site.ownerRole,
        image: absoluteUrl(portrait.src),
        worksFor: { "@id": ORG_ID },
        sameAs: [site.instagram],
        knowsAbout: ["Interior design", "Progettazione d'interni", "Moodboard"],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: site.name,
        inLanguage: "it-IT",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export function homeSchema(site: Settings, services: Service[], faq: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": absoluteUrl("/#webpage"),
        url: SITE_URL,
        name: site.title,
        description: site.description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        inLanguage: "it-IT",
      },
      ...services.map(serviceSchema),
      {
        "@type": "FAQPage",
        "@id": absoluteUrl("/#faq"),
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export function servicePageSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      serviceSchema(service),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Servizi", item: absoluteUrl("/#servizi") },
          { "@type": "ListItem", position: 3, name: service.name, item: absoluteUrl(servicePath(service)) },
        ],
      },
    ],
  };
}
