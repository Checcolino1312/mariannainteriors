import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

/**
 * `useCdn: false` è intenzionale: la cache la gestisce Next ('use cache' + cacheTag in
 * src/lib/cms.ts) e il webhook la invalida a ogni pubblicazione. Passando dalla CDN di Sanity
 * si rischierebbe di rileggere contenuto vecchio subito dopo il webhook.
 */
export const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: "published" })
  : null;
