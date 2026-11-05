import { defineField, defineType } from "sanity";
import { heading, list, obj, str, txt } from "./fields";

const variant = (name: string, title: string) =>
  obj(name, title, [
    str("eyebrow", "Occhiello"),
    heading("title", "Titolo"),
    txt("intro", "Testo", { rows: 4 }),
    txt("when", "Quando inviare il materiale", { rows: 2 }),
    str("subject", "Oggetto dell’email"),
  ]);

export const thankYouPage = defineType({
  name: "thankYouPage",
  title: "Pagina Grazie",
  type: "document",
  description: "Pagina mostrata dopo il pagamento o la prenotazione.",
  fields: [
    obj("variants", "Testi", [
      variant("consulenza", "Dopo la consulenza"),
      variant("mappa", "Dopo la mappa di stile"),
      variant("generico", "Altri casi"),
    ]),
    str("prepareTitle", "Titolo “Cosa preparare”"),
    list("prepare", "Cosa preparare"),
    txt("contact", "Testo con l’email", { description: "{email} diventa il link all’indirizzo email." }),
    str("button", "Pulsante"),
    txt("emailBody", "Testo iniziale dell’email", { rows: 4 }),
  ],
  preview: { prepare: () => ({ title: "Pagina Grazie" }) },
});

export const legalPage = defineType({
  name: "legalPage",
  title: "Pagina informativa",
  type: "document",
  fields: [
    str("eyebrow", "Occhiello"),
    str("title", "Titolo"),
    txt("description", "Descrizione per Google"),
    defineField({ name: "body", title: "Testo", type: "richText", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "title" } },
});
