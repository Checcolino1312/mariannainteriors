import { servicePath } from "@/content/services";
import type { Service } from "@/content/types";
import { getHome, getServices, getSettings } from "./cms";
import { SITE_URL, absoluteUrl } from "./site";

// Testi per /llms.txt e /llms-full.txt (https://llmstxt.org): un riassunto in Markdown
// che gli assistenti AI possono leggere e citare, generato dagli stessi contenuti delle pagine (Sanity).

const price = (s: Service) => (s.price.from ? `a partire da ${s.price.label}` : s.price.label);

const howToBuy = (s: Service, email: string) =>
  s.cta.kind === "booking"
    ? "Si prenota e si paga online dalla pagina del servizio (calendario Cal.com, pagamento Stripe)."
    : s.cta.kind === "payment"
      ? "Si acquista online dalla pagina del servizio (pagamento Stripe)."
      : `Su richiesta via email a ${email}.`;

const howToPay = (s: Service) =>
  s.bankTransfer ? ` Pagabile anche con bonifico bancario (IBAN e causale nella pagina del servizio).` : "";

export async function llmsTxt() {
  const [site, services] = await Promise.all([getSettings(), getServices()]);
  return `# ${site.name}

> ${site.name} (${site.handle}) è lo studio di interior design online di ${site.ownerName}, ${site.ownerRole.toLowerCase()}. Offre consulenze, mappe di stile e progetti di interni interamente online, tramite fotografie, planimetrie e videocall. Payoff: "${site.payoff}".

Il metodo parte dalle ispirazioni e dalle abitudini di chi abita la casa e le traduce, attraverso moodboard, in una direzione progettuale coerente per spazi, colori, materiali e arredi.

## Servizi

${services.map((s) => `- [${s.name}](${absoluteUrl(servicePath(s))}): ${s.seo.description}`).join("\n")}

## Contatti

- Email: ${site.email}
- Instagram: ${site.instagram}
- Sito: ${SITE_URL}

## Optional

- [Versione estesa](${absoluteUrl("/llms-full.txt")}): tutti i dettagli su servizi, metodo e domande frequenti
- [Privacy](${absoluteUrl("/privacy")})
`;
}

export async function llmsFullTxt() {
  const [site, services, home] = await Promise.all([getSettings(), getServices(), getHome()]);
  return `# ${site.name} — informazioni complete

> ${site.description}

- Titolare: ${site.ownerName}, ${site.ownerRole}
- Modalità: interamente online (fotografie, planimetrie, videocall)
- Email: ${site.email}
- Instagram: ${site.instagram}
- P. IVA: ${site.vat}

## Servizi e prezzi

${services
  .map(
    (s) => `### ${s.number}. ${s.name} — ${price(s)}

URL: ${absoluteUrl(servicePath(s))}

Come acquistarlo: ${howToBuy(s, site.email)}${howToPay(s)}

${s.detail.question} ${s.detail.text}

${s.detail.listIntro ? `${s.detail.listIntro}\n\n` : ""}${s.detail.bullets.map((b) => `- ${b}`).join("\n")}
${s.detail.note ? `\nNota: ${s.detail.note}\n` : ""}`,
  )
  .join("\n")}
## ${home.process.title}

${home.process.steps.map((p, i) => `${i + 1}. **${p.title}** — ${p.text}`).join("\n")}

## Domande frequenti

${home.faq.items.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## Nota sulle immagini

Le immagini di ambienti sul sito sono esempi illustrativi generati con AI: mostrano una direzione visiva e non sono fotografie di progetti realizzati.
`;
}
