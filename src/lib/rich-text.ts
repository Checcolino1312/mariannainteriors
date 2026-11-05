import type { RichText } from "@/content/types";

/**
 * Converte un testo in stile Markdown nel formato rich text di Sanity (Portable Text).
 * Serve per scrivere i testi predefiniti in modo leggibile; lo stesso risultato
 * viene caricato in Sanity dallo script di import.
 *
 * Supporta: paragrafi separati da una riga vuota, "## " per i titoletti,
 * [testo](url) per i link, **grassetto** e *corsivo*.
 */
export function markdownToBlocks(markdown: string, keyPrefix = "b"): RichText {
  let n = 0;
  const key = () => `${keyPrefix}${(n++).toString(36)}`;

  return markdown
    .trim()
    .split(/\n\s*\n/)
    .map((chunk) => {
      const raw = chunk.replace(/\s*\n\s*/g, " ").trim();
      const heading = raw.match(/^(#{2,3})\s+(.*)$/);
      const text = heading ? heading[2] : raw;
      const markDefs: { _key: string; _type: "link"; href: string }[] = [];
      const children: { _key: string; _type: "span"; text: string; marks: string[] }[] = [];

      const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
      let last = 0;
      for (const match of text.matchAll(pattern)) {
        const index = match.index ?? 0;
        if (index > last) children.push({ _key: key(), _type: "span", text: text.slice(last, index), marks: [] });
        if (match[1] !== undefined) {
          const linkKey = key();
          markDefs.push({ _key: linkKey, _type: "link", href: match[2] });
          children.push({ _key: key(), _type: "span", text: match[1], marks: [linkKey] });
        } else if (match[3] !== undefined) {
          children.push({ _key: key(), _type: "span", text: match[3], marks: ["strong"] });
        } else {
          children.push({ _key: key(), _type: "span", text: match[4], marks: ["em"] });
        }
        last = index + match[0].length;
      }
      if (last < text.length) children.push({ _key: key(), _type: "span", text: text.slice(last), marks: [] });

      return {
        _key: key(),
        _type: "block",
        style: heading ? (heading[1] === "##" ? "h2" : "h3") : "normal",
        markDefs,
        children,
      };
    });
}

/** Testo semplice di un rich text (per llms.txt e JSON-LD). */
export function blocksToText(blocks: RichText): string {
  return blocks
    .map((block) =>
      Array.isArray(block.children) ? block.children.map((c) => ("text" in c ? String(c.text) : "")).join("") : "",
    )
    .filter(Boolean)
    .join("\n\n");
}
