import { defineArrayMember, defineField, defineType } from "sanity";
import { img, list, obj, str, txt } from "./fields";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Impostazioni del sito",
  type: "document",
  groups: [
    { name: "generale", title: "Generale", default: true },
    { name: "contatti", title: "Contatti" },
    { name: "pagamenti", title: "Prenotazioni e bonifico" },
    { name: "menu", title: "Menu e sfondo" },
    { name: "servizi", title: "Pagine servizio" },
  ],
  fields: [
    str("name", "Nome del sito", { group: "generale" }),
    str("handle", "Nome Instagram (senza @)", { group: "generale" }),
    str("payoff", "Payoff", { group: "generale", description: "Usato nei testi per Google e per gli assistenti AI. Il payoff del logo è disegnato nel logo." }),
    str("title", "Titolo per Google", { group: "generale", description: "Titolo della home nei risultati di ricerca (circa 60 caratteri)." }),
    txt("description", "Descrizione per Google", { group: "generale", description: "Circa 150 caratteri." }),
    str("ownerName", "Nome e cognome", { group: "generale" }),
    str("ownerRole", "Professione", { group: "generale" }),
    defineField({ name: "copyrightYear", title: "Anno del copyright", type: "number", group: "generale", validation: (r) => r.required().integer() }),

    defineField({ name: "email", title: "Email", type: "string", group: "contatti", validation: (r) => r.required().email() }),
    str("vat", "Partita IVA", { group: "contatti" }),
    defineField({ name: "instagram", title: "Profilo Instagram", type: "url", group: "contatti", validation: (r) => r.required() }),
    defineField({ name: "instagramReels", title: "Pagina dei reel Instagram", type: "url", group: "contatti", validation: (r) => r.required() }),

    str("calLink", "Evento Cal.com della consulenza", {
      group: "pagamenti",
      optional: true,
      description:
        "Nella forma utente/evento, es. marianna.interiors/consulenza-60min. Se vuoto, la consulenza si prenota via email.",
    }),
    obj(
      "bank",
      "Bonifico",
      [
        str("holder", "Intestatario"),
        str("iban", "IBAN"),
        str("causale", "Causale", { description: "Il cliente sostituisce “nome cognome”, che sul sito appare in corsivo." }),
        str("title", "Titolo del riquadro"),
        list("steps", "Passi", { description: "Passi comuni a tutti i servizi. L’ultimo passo è nella scheda di ciascun servizio." }),
        str("link", "Testo del link email"),
      ],
      { group: "pagamenti" },
    ),

    defineField({
      name: "nav",
      title: "Voci del menu",
      type: "array",
      group: "menu",
      of: [
        defineArrayMember({
          type: "object",
          fields: [str("label", "Testo"), str("href", "Link", { description: "Es. /#servizi, /#chi-sono, /#contatti" })],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
    obj(
      "background",
      "Sfondo materico (intro e menu)",
      [img("landscape", "Per schermi orizzontali (computer)"), img("portrait", "Per schermi verticali (telefono)")],
      { group: "menu" },
    ),

    obj(
      "servicePage",
      "Testi comuni delle pagine servizio",
      [
        str("back", "Link per tornare ai servizi"),
        str("others", "Titolo “Altri percorsi”"),
        str("galleryNote", "Nota sotto la galleria"),
        txt("emailNote", "Nota per i servizi su richiesta via email"),
      ],
      { group: "servizi" },
    ),
  ],
  preview: { prepare: () => ({ title: "Impostazioni del sito" }) },
});
