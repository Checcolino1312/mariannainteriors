import { revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Webhook chiamato da Sanity a ogni pubblicazione: aggiorna il sito in pochi secondi.
 *
 * Invalida il tag del tipo di documento modificato (vedi src/lib/cms.ts: i tag coincidono
 * con i _type dello schema), quindi basta leggere _type dal payload.
 *
 * Configurazione su sanity.io/manage -> API -> Webhooks (vedi docs/sanity.md):
 *   URL:        https://<dominio>/api/revalidate
 *   Dataset:    production
 *   Trigger:    create, update, delete
 *   Projection: {_type}
 *   Secret:     lo stesso valore di SANITY_REVALIDATE_SECRET
 */
export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) return new NextResponse("SANITY_REVALIDATE_SECRET non configurato", { status: 500 });

    const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret);
    if (!isValidSignature) return new NextResponse("Firma non valida", { status: 401 });
    if (!body?._type) {
      return new NextResponse("Payload senza _type: controlla la projection del webhook", { status: 400 });
    }

    // expire: 0 = la versione vecchia scade subito, così Marianna vede la modifica al primo
    // ricaricamento (con 'max' la prima visita mostrerebbe ancora la versione precedente).
    revalidateTag(body._type, { expire: 0 });
    return NextResponse.json({ revalidated: true, tag: body._type });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Errore sconosciuto";
    return new NextResponse(message, { status: 500 });
  }
}
