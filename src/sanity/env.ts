/**
 * Configurazione Sanity letta dalle variabili d'ambiente (vedi .env.local.example).
 * Non lancia errori: finché il progetto non è configurato il sito usa i contenuti
 * predefiniti in src/content/*, così il deploy non si rompe mai.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

/** Data fissa: blocca la versione delle API così un aggiornamento lato Sanity non cambia le risposte. */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-27";

/** Il Project ID di Sanity è composto da lettere minuscole e numeri. */
export const isSanityConfigured = /^[a-z0-9]+$/.test(projectId);
