import { defineCliConfig } from "sanity/cli";

/**
 * Config della CLI Sanity: serve a comandi come `npm run sanity:backup`
 * (export del dataset) e `npx sanity documents query`.
 */
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});
