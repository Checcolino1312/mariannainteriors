import { defineArrayMember, defineField, defineType } from "sanity";

/** Immagine con ritaglio, punto focale e testo alternativo. */
export const immagine = defineType({
  name: "immagine",
  title: "Immagine",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Testo alternativo",
      type: "string",
      description:
        "Descrive l’immagine per chi usa uno screen reader e per Google. Lasciare vuoto solo per immagini decorative (sfondi, miniature).",
    }),
  ],
});

/** Testo formattato: paragrafi, titoletti, grassetto, corsivo e link. */
export const richText = defineType({
  name: "richText",
  title: "Testo",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragrafo", value: "normal" },
        { title: "Titoletto", value: "h2" },
        { title: "Titoletto piccolo", value: "h3" },
      ],
      lists: [
        { title: "Elenco puntato", value: "bullet" },
        { title: "Elenco numerato", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Grassetto", value: "strong" },
          { title: "Corsivo", value: "em" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "Indirizzo",
                type: "url",
                description: "Pagina del sito (es. /privacy), sito esterno (https://...) o email (mailto:...).",
                validation: (rule) =>
                  rule.required().uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
              }),
            ],
          }),
        ],
      },
    }),
  ],
});
