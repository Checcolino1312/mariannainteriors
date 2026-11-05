import type { SchemaTypeDefinition } from "sanity";
import { homePage } from "./homePage";
import { immagine, richText } from "./objects";
import { legalPage, thankYouPage } from "./pages";
import { service } from "./service";
import { siteSettings } from "./siteSettings";

export { DOC_IDS } from "../ids";

/** Documenti che esistono in una sola copia: nello Studio non si possono creare, duplicare o eliminare. */
export const singletonTypes = ["siteSettings", "homePage", "thankYouPage", "legalPage"] as const;

export const schemaTypes: SchemaTypeDefinition[] = [
  immagine,
  richText,
  siteSettings,
  homePage,
  service,
  thankYouPage,
  legalPage,
];
