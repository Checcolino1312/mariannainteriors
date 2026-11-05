import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Link from "next/link";
import type { RichText as RichTextValue } from "@/content/types";

const components: PortableTextComponents = {
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "";
      if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
      if (/^(mailto|tel):/.test(href)) return <a href={href}>{children}</a>;
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
  },
};

/** Testo formattato modificabile da Sanity (paragrafi, titoletti, elenchi, link). */
export function RichText({ value }: { value: RichTextValue }) {
  return <PortableText value={value} components={components} />;
}
