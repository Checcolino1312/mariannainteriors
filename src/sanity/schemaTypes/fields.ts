import { defineArrayMember, defineField } from "sanity";

// Piccoli costruttori di campi, per tenere gli schemi corti e uniformi.
// I nomi dei campi coincidono con i tipi in src/content/types.ts.

type Extra = { group?: string; description?: string; optional?: boolean; hidden?: boolean };

const required = (optional?: boolean) => (optional ? undefined : (rule: { required: () => unknown }) => rule.required());

export const TITLE_HINT = "Per andare a capo premi Invio. Il testo tra asterischi, *così*, è in corsivo.";

/** Testo su una riga. */
export const str = (name: string, title: string, extra: Extra = {}) =>
  defineField({
    name,
    title,
    type: "string",
    group: extra.group,
    description: extra.description,
    hidden: extra.hidden,
    validation: required(extra.optional) as never,
  });

/** Testo su più righe. */
export const txt = (name: string, title: string, extra: Extra & { rows?: number } = {}) =>
  defineField({
    name,
    title,
    type: "text",
    rows: extra.rows ?? 3,
    group: extra.group,
    description: extra.description,
    validation: required(extra.optional) as never,
  });

/** Titolo con a capo e corsivo. */
export const heading = (name: string, title: string, extra: Extra = {}) =>
  txt(name, title, { rows: 3, ...extra, description: extra.description ?? TITLE_HINT });

/** Elenco di frasi. */
export const list = (name: string, title: string, extra: Extra = {}) =>
  defineField({
    name,
    title,
    type: "array",
    of: [defineArrayMember({ type: "text", rows: 2 })],
    group: extra.group,
    description: extra.description,
    validation: required(extra.optional) as never,
  });

export const img = (name: string, title: string, extra: Extra = {}) =>
  defineField({
    name,
    title,
    type: "immagine",
    group: extra.group,
    description: extra.description,
    validation: required(extra.optional) as never,
  });

export const imgs = (name: string, title: string, extra: Extra = {}) =>
  defineField({
    name,
    title,
    type: "array",
    of: [defineArrayMember({ type: "immagine" })],
    options: { layout: "grid" },
    group: extra.group,
    description: extra.description,
    validation: (rule) => (extra.optional ? rule : rule.required().min(1)),
  });

export const obj = (name: string, title: string, fields: ReturnType<typeof defineField>[], extra: Extra = {}) =>
  defineField({
    name,
    title,
    type: "object",
    group: extra.group,
    description: extra.description,
    options: { collapsible: true, collapsed: false },
    fields,
  });
