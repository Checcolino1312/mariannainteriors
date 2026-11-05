import type { Metadata } from "next";
import { RichText } from "@/components/RichText";
import type { LegalKind } from "@/content/types";
import { getLegal } from "@/lib/cms";

const PATHS: Record<LegalKind, string> = { privacy: "/privacy", condizioni: "/condizioni-di-vendita" };

export async function legalMetadata(kind: LegalKind): Promise<Metadata> {
  const page = await getLegal(kind);
  return { title: page.title, description: page.description, alternates: { canonical: PATHS[kind] } };
}

/** Pagina informativa (privacy, condizioni di vendita) con il testo modificabile da Sanity. */
export async function LegalPage({ kind }: { kind: LegalKind }) {
  const page = await getLegal(kind);
  return (
    <div className="page-offset">
      <article className="wrap legal" data-reveal-group>
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <RichText value={page.body} />
      </article>
    </div>
  );
}
