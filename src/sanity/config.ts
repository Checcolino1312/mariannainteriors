import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./env";
import { schemaTypes, singletonTypes } from "./schemaTypes";
import { structure } from "./structure";

const singletons = new Set<string>(singletonTypes);

export default defineConfig({
  name: "marianna-interiors",
  title: "Marianna Interiors",
  basePath: "/studio",
  // Senza Project ID lo Studio mostra un errore chiaro invece di rompere il build.
  projectId: projectId || "configurare",
  dataset,
  schema: {
    types: schemaTypes,
    // I documenti singoli non compaiono fra quelli creabili con «+»
    templates: (templates) => templates.filter(({ schemaType }) => !singletons.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletons.has(schemaType)
        ? actions.filter(({ action }) => !["unpublish", "delete", "duplicate"].includes(action ?? ""))
        : actions,
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
