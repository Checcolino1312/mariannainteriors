import type { StructureResolver } from "sanity/structure";
import { DOC_IDS } from "./ids";

const single = (S: Parameters<StructureResolver>[0], title: string, type: string, id: string) =>
  S.listItem().title(title).id(id).child(S.document().schemaType(type).documentId(id).title(title));

/** Menu dello Studio in italiano: i documenti singoli si aprono direttamente. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenuti")
    .items([
      single(S, "Home", "homePage", DOC_IDS.home),
      S.listItem()
        .title("Servizi")
        .id("services")
        .child(
          S.documentTypeList("service")
            .title("Servizi")
            .defaultOrdering([{ field: "number", direction: "asc" }]),
        ),
      S.divider(),
      single(S, "Pagina Grazie", "thankYouPage", DOC_IDS.thankYou),
      single(S, "Privacy", "legalPage", DOC_IDS.privacy),
      single(S, "Condizioni di vendita", "legalPage", DOC_IDS.condizioni),
      S.divider(),
      single(S, "Impostazioni del sito", "siteSettings", DOC_IDS.settings),
    ]);
