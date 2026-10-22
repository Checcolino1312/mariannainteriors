import { FAQ, PROCESS } from "@/content/faq";
import { SERVICES, servicePath } from "@/content/services";
import { SITE, absoluteUrl } from "./site";

// Testi per /llms.txt e /llms-full.txt (https://llmstxt.org): un riassunto in Markdown
// che gli assistenti AI possono leggere e citare, generato dagli stessi dati delle pagine.

const price = (s: (typeof SERVICES)[number]) => (s.price.from ? `a partire da ${s.price.label}` : s.price.label);

const howToBuy = (s: (typeof SERVICES)[number]) =>
  s.detail.cta.kind === "booking"
    ? "Si prenota e si paga online dalla pagina del servizio (calendario Cal.com, pagamento Stripe)."
    : s.detail.cta.kind === "payment"
      ? "Si acquista online dalla pagina del servizio (pagamento Stripe)."
      : `Su richiesta via email a ${SITE.email}.`;

const howToPay = (s: (typeof SERVICES)[number]) =>
  s.bankTransfer ? ` Pagabile anche con bonifico bancario (IBAN e causale nella pagina del servizio).` : "";

export function llmsTxt() {
  return `# ${SITE.name}

> ${SITE.name} (${SITE.handle}) è lo studio di interior design online di ${SITE.owner.name}, ${SITE.owner.role.toLowerCase()}. Offre consulenze, mappe di stile e progetti di interni interamente online, tramite fotografie, planimetrie e videocall. Payoff: "${SITE.payoff}".

Il metodo parte dalle ispirazioni e dalle abitudini di chi abita la casa e le traduce, attraverso moodboard, in una direzione progettuale coerente per spazi, colori, materiali e arredi.

## Servizi

${SERVICES.map((s) => `- [${s.name}](${absoluteUrl(servicePath(s))}): ${s.seo.description}`).join("\n")}

## Contatti

- Email: ${SITE.email}
- Instagram: ${SITE.instagram}
- Sito: ${SITE.url}

## Optional

- [Versione estesa](${absoluteUrl("/llms-full.txt")}): tutti i dettagli su servizi, metodo e domande frequenti
- [Privacy](${absoluteUrl("/privacy")})
`;
}

export function llmsFullTxt() {
  return `# ${SITE.name} — informazioni complete

> ${SITE.description}

- Titolare: ${SITE.owner.name}, ${SITE.owner.role}
- Modalità: interamente online (fotografie, planimetrie, videocall)
- Email: ${SITE.email}
- Instagram: ${SITE.instagram}
- P. IVA: ${SITE.vat}

## Servizi e prezzi

${SERVICES.map(
  (s) => `### ${s.number}. ${s.name} — ${price(s)}

URL: ${absoluteUrl(servicePath(s))}

Come acquistarlo: ${howToBuy(s)}${howToPay(s)}

${s.detail.question} ${s.detail.text}

${s.detail.listIntro ? `${s.detail.listIntro}\n\n` : ""}${s.detail.bullets.map((b) => `- ${b}`).join("\n")}
${s.detail.note ? `\nNota: ${s.detail.note}\n` : ""}`,
).join("\n")}
## Come lavoriamo insieme

${PROCESS.map((p, i) => `${i + 1}. **${p.title}** — ${p.text}`).join("\n")}

## Domande frequenti

${FAQ.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## Nota sulle immagini

Le immagini di ambienti sul sito sono esempi illustrativi generati con AI: mostrano una direzione visiva e non sono fotografie di progetti realizzati.
`;
}
