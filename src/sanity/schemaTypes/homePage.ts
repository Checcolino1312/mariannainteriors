import { defineArrayMember, defineField, defineType } from "sanity";
import { heading, img, imgs, obj, str, txt } from "./fields";

export const homePage = defineType({
  name: "homePage",
  title: "Home",
  type: "document",
  groups: [
    { name: "apertura", title: "Apertura", default: true },
    { name: "servizi", title: "Servizi" },
    { name: "esempi", title: "Esempi" },
    { name: "chiSono", title: "Chi sono" },
    { name: "faq", title: "Domande frequenti" },
    { name: "chiusura", title: "Chiusura e Instagram" },
  ],
  fields: [
    obj("intro", "Intro a tutto schermo", [str("scrollLabel", "Testo sotto il logo")], {
      group: "apertura",
      description: "Lo sfondo si cambia in Impostazioni del sito > Menu e sfondo.",
    }),
    obj(
      "hero",
      "Prima sezione",
      [
        str("eyebrow", "Occhiello"),
        heading("title", "Titolo"),
        txt("text", "Testo"),
        str("button", "Pulsante"),
        imgs("slides", "Galleria"),
        str("counterLabel", "Didascalia accanto al contatore"),
        str("note", "Nota sotto la galleria"),
        str("vertical", "Scritta verticale"),
      ],
      { group: "apertura" },
    ),
    imgs("moodboards", "Nastro di moodboard", { group: "apertura" }),

    obj(
      "services",
      "Intestazione dei servizi",
      [
        str("eyebrow", "Occhiello"),
        heading("title", "Titolo"),
        txt("aside", "Testo a lato", { description: "Per andare a capo premi Invio." }),
        str("orientEyebrow", "Orientamento: occhiello"),
        str("orientTitle", "Orientamento: domanda"),
        str("orientResult", "Orientamento: testo sopra il servizio consigliato"),
      ],
      { group: "servizi", description: "I servizi si modificano nella sezione Servizi." },
    ),

    obj(
      "examples",
      "Dalle idee allo spazio",
      [
        str("eyebrow", "Occhiello"),
        heading("title", "Titolo"),
        str("tabProjects", "Scheda 1"),
        str("tabStyle", "Scheda 2"),
        defineField({
          name: "figures",
          title: "Progetti (scheda 1)",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                img("image", "Immagine"),
                str("eyebrow", "Occhiello"),
                str("title", "Titolo"),
                txt("text", "Testo", { rows: 2 }),
              ],
              preview: { select: { title: "title", subtitle: "eyebrow", media: "image" } },
            }),
          ],
          validation: (r) => r.required().min(1),
        }),
        obj("style", "Mappa di stile (scheda 2)", [
          imgs("slides", "Galleria"),
          str("eyebrow", "Occhiello"),
          defineField({
            name: "palette",
            title: "Palette",
            type: "array",
            of: [
              defineArrayMember({
                type: "object",
                fields: [
                  str("name", "Nome del colore"),
                  defineField({
                    name: "hex",
                    title: "Codice colore",
                    type: "string",
                    description: "Esadecimale, es. #A26238",
                    validation: (r) => r.required().regex(/^#[0-9a-fA-F]{6}$/, { name: "esadecimale" }),
                  }),
                ],
                preview: { select: { title: "name", subtitle: "hex" } },
              }),
            ],
          }),
          heading("title", "Titolo"),
          txt("text", "Testo", { rows: 6, description: "Lascia una riga vuota tra un paragrafo e l’altro." }),
          str("link", "Link alla mappa di stile"),
        ]),
        txt("note", "Nota sulle immagini AI", { rows: 2 }),
      ],
      { group: "esempi" },
    ),

    obj(
      "about",
      "Chi sono",
      [
        str("eyebrow", "Occhiello"),
        heading("title", "Titolo"),
        img("portrait", "Foto"),
        txt("subtitle", "Sottotitolo", { rows: 2 }),
        defineField({ name: "body", title: "Testo", type: "richText", validation: (r) => r.required() }),
        str("signatureRole", "Firma: professione"),
        str("link", "Link ai servizi"),
      ],
      { group: "chiSono" },
    ),
    obj(
      "process",
      "Come lavoriamo insieme",
      [
        str("title", "Titolo"),
        defineField({
          name: "steps",
          title: "Passi",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [str("title", "Titolo"), txt("text", "Testo")],
              preview: { select: { title: "title", subtitle: "text" } },
            }),
          ],
          validation: (r) => r.required().min(1),
        }),
      ],
      { group: "chiSono" },
    ),

    obj(
      "faq",
      "Domande frequenti",
      [
        str("eyebrow", "Occhiello"),
        heading("title", "Titolo"),
        defineField({
          name: "items",
          title: "Domande",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [str("q", "Domanda"), txt("a", "Risposta", { rows: 4 })],
              preview: { select: { title: "q", subtitle: "a" } },
            }),
          ],
          validation: (r) => r.required().min(1),
        }),
      ],
      { group: "faq", description: "Compaiono anche su Google come domande frequenti." },
    ),

    obj(
      "cta",
      "Fascia finale",
      [
        str("eyebrow", "Occhiello"),
        heading("title", "Titolo"),
        str("button", "Pulsante"),
        str("emailSubject", "Oggetto dell’email"),
      ],
      { group: "chiusura" },
    ),
    obj(
      "instagram",
      "Instagram",
      [
        str("title", "Titolo"),
        defineField({
          name: "fallback",
          title: "Miniature di riserva",
          description: "Mostrate solo se il feed di Instagram (Behold) non è collegato o non risponde.",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [str("title", "Titolo del reel"), img("image", "Copertina")],
              preview: { select: { title: "title", media: "image" } },
            }),
          ],
        }),
      ],
      { group: "chiusura" },
    ),
  ],
  preview: { prepare: () => ({ title: "Home" }) },
});
