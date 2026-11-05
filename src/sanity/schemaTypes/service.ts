import { defineField, defineType } from "sanity";
import { imgs, list, obj, str, txt } from "./fields";

export const service = defineType({
  name: "service",
  title: "Servizio",
  type: "document",
  groups: [
    { name: "card", title: "Card in home", default: true },
    { name: "pagina", title: "Pagina del servizio" },
    { name: "acquisto", title: "Prenotazione e pagamento" },
    { name: "seo", title: "Google" },
  ],
  fields: [
    str("name", "Nome", { group: "card" }),
    str("number", "Numero", { group: "card", description: "Es. 01. Stabilisce anche l’ordine dei servizi." }),
    defineField({
      name: "slug",
      title: "Indirizzo della pagina",
      type: "slug",
      group: "card",
      options: { source: "name" },
      description: "Attenzione: cambiandolo, i link già condivisi alla vecchia pagina smettono di funzionare.",
      validation: (r) => r.required(),
    }),
    str("id", "Ancora in home", {
      group: "card",
      description: "Identificativo tecnico della card (es. consulenza). Meglio non cambiarlo.",
    }),
    str("eyebrow", "Occhiello", { group: "card" }),
    txt("cardTitle", "Titolo della card", { group: "card", rows: 2, description: "Per andare a capo premi Invio." }),
    str("cardSubtitle", "Sottotitolo della card", { group: "card", optional: true }),
    txt("cardText", "Testo della card", { group: "card" }),
    list("cardBullets", "Punti della card", { group: "card" }),
    str("cardCta", "Pulsante della card", { group: "card" }),
    obj(
      "price",
      "Prezzo",
      [
        defineField({ name: "amount", title: "Importo in euro", type: "number", description: "Vuoto se su preventivo." }),
        defineField({ name: "from", title: "“A partire da”", type: "boolean", initialValue: false }),
        str("label", "Prezzo come appare sul sito", { description: "Es. 149 € oppure Su preventivo" }),
      ],
      { group: "card" },
    ),
    str("choice", "Risposta in “Da dove vuoi iniziare?”", { group: "card" }),

    obj(
      "detail",
      "Pagina del servizio",
      [
        str("title", "Titolo"),
        str("subtitle", "Sottotitolo", { optional: true }),
        txt("question", "Domanda", { rows: 2 }),
        txt("text", "Testo", { rows: 5 }),
        str("listIntro", "Introduzione all’elenco", { optional: true }),
        list("bullets", "Elenco"),
        txt("note", "Nota", { optional: true }),
        imgs("gallery", "Galleria"),
        defineField({
          name: "galleryFit",
          title: "Immagini della galleria",
          type: "string",
          options: {
            list: [
              { title: "A tutto riquadro (foto)", value: "cover" },
              { title: "Intere (moodboard)", value: "contain" },
            ],
            layout: "radio",
          },
          initialValue: "cover",
        }),
      ],
      { group: "pagina" },
    ),

    obj(
      "action",
      "Pulsante principale",
      [
        defineField({
          name: "kind",
          title: "Tipo",
          type: "string",
          options: {
            list: [
              { title: "Prenota e paga su Cal.com (link nelle Impostazioni)", value: "booking" },
              { title: "Acquista con Stripe Payment Link", value: "payment" },
              { title: "Richiesta via email", value: "email" },
            ],
            layout: "radio",
          },
          validation: (r) => r.required(),
        }),
        str("label", "Testo del pulsante"),
        txt("note", "Nota sotto il pulsante (prenotazione o pagamento online)", { optional: true, rows: 4 }),
        defineField({
          name: "paymentLink",
          title: "Stripe Payment Link",
          type: "url",
          description: "Es. https://buy.stripe.com/abc123. Solo per il tipo “Acquista con Stripe”.",
          hidden: ({ parent }) => (parent as { kind?: string } | undefined)?.kind !== "payment",
        }),
        str("emailLabel", "Testo del pulsante se si passa all’email", {
          description: "Usato quando il link di Cal.com o Stripe non è impostato.",
        }),
        str("emailSubject", "Oggetto dell’email"),
      ],
      { group: "acquisto" },
    ),
    obj(
      "bankTransfer",
      "Pagamento con bonifico",
      [
        defineField({ name: "enabled", title: "Mostra i dati per il bonifico", type: "boolean", initialValue: false }),
        txt("confirm", "Ultimo passo (cosa succede dopo il bonifico)", { optional: true }),
      ],
      { group: "acquisto", description: "IBAN, causale e passi comuni sono nelle Impostazioni del sito." },
    ),

    obj(
      "seo",
      "Google",
      [
        str("title", "Titolo", {
          description: "Circa 40 caratteri: Google aggiunge « | Marianna Interiors» e taglia oltre i 60.",
        }),
        txt("description", "Descrizione", { description: "Tra 120 e 160 caratteri." }),
      ],
      { group: "seo" },
    ),
  ],
  orderings: [{ title: "Numero", name: "number", by: [{ field: "number", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "price.label", number: "number" },
    prepare: ({ title, subtitle, number }) => ({ title: `${number ?? ""} ${title ?? ""}`.trim(), subtitle }),
  },
});
