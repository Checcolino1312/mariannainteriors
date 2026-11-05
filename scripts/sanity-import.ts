/**
 * Carica in Sanity i contenuti attuali del sito (src/content/*) e le loro immagini (public/images).
 *
 *   npm run sanity:import               crea solo i documenti che mancano (non tocca le modifiche già fatte)
 *   npm run sanity:import -- --sovrascrivi   riporta TUTTI i documenti ai contenuti di src/content
 *   npx tsx scripts/sanity-import.ts --prova  controlla i documenti senza collegarsi a Sanity
 *
 * Richiede in .env.local: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET e
 * SANITY_API_WRITE_TOKEN (token con permessi di scrittura, vedi docs/sanity.md).
 * Gli _id dei documenti sono fissi, quindi lo script si può rilanciare senza creare doppioni.
 */
import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { DEFAULT_HOME } from "../src/content/home";
import { DEFAULT_LEGAL, DEFAULT_THANK_YOU } from "../src/content/pages";
import { DEFAULT_SERVICES } from "../src/content/services";
import { DEFAULT_SETTINGS } from "../src/content/settings";
import { DOC_IDS } from "../src/sanity/ids";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const overwrite = process.argv.includes("--sovrascrivi");
const dryRun = process.argv.includes("--prova");

if (!dryRun && (!projectId || !token)) {
  console.error(
    "Mancano NEXT_PUBLIC_SANITY_PROJECT_ID o SANITY_API_WRITE_TOKEN in .env.local (vedi .env.local.example e docs/sanity.md).",
  );
  process.exit(1);
}

const client = createClient({ projectId: projectId || "prova", dataset, token, apiVersion: "2026-07-27", useCdn: false });
const PUBLIC = path.join(process.cwd(), "public");
const uploaded = new Map<string, string>();

type Img = { src: string; alt: string; width: number; height: number };
const isLocalImage = (v: unknown): v is Img =>
  !!v && typeof v === "object" && typeof (v as Img).src === "string" && (v as Img).src.startsWith("/") && "width" in v;

/** Carica un file di public/ una sola volta (Sanity riconosce comunque i duplicati). */
async function upload(src: string) {
  const cached = uploaded.get(src);
  if (cached) return cached;
  const file = path.join(PUBLIC, src);
  if (!existsSync(file)) throw new Error(`Immagine non trovata: ${file}`);
  if (dryRun) {
    uploaded.set(src, `image-prova${uploaded.size}-1x1-jpg`);
    return uploaded.get(src)!;
  }
  const asset = await client.assets.upload("image", createReadStream(file), { filename: path.basename(src) });
  uploaded.set(src, asset._id);
  console.log(`  immagine ${src}`);
  return asset._id;
}

/**
 * Trasforma i contenuti predefiniti nel formato Sanity: immagini caricate e sostituite da
 * riferimenti, _key negli elenchi di oggetti.
 */
async function toSanity(value: unknown): Promise<unknown> {
  if (isLocalImage(value)) {
    return { _type: "immagine", asset: { _type: "reference", _ref: await upload(value.src) }, alt: value.alt };
  }
  if (Array.isArray(value)) {
    const out = [];
    for (const [i, item] of value.entries()) {
      const converted = await toSanity(item);
      out.push(converted && typeof converted === "object" && !("_key" in converted) ? { _key: `k${i}`, ...converted } : converted);
    }
    return out;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) if (v !== undefined) out[k] = await toSanity(v);
    return out;
  }
  return value;
}

async function doc(_id: string, _type: string, content: object) {
  return { ...((await toSanity(content)) as object), _id, _type };
}

async function main() {
  console.log(`Import in Sanity: progetto ${projectId}, dataset ${dataset}${overwrite ? " (sovrascrivi)" : ""}`);

  // In sequenza: le stesse immagini compaiono in più documenti e si caricano una volta sola.
  const docs: { _id: string; _type: string }[] = [
    await doc(DOC_IDS.settings, "siteSettings", DEFAULT_SETTINGS),
    await doc(DOC_IDS.home, "homePage", DEFAULT_HOME),
    await doc(DOC_IDS.thankYou, "thankYouPage", DEFAULT_THANK_YOU),
    await doc(DOC_IDS.privacy, "legalPage", DEFAULT_LEGAL.privacy),
    await doc(DOC_IDS.condizioni, "legalPage", DEFAULT_LEGAL.condizioni),
  ];
  for (const s of DEFAULT_SERVICES) {
    docs.push(await doc(`service-${s.id}`, "service", { ...s, slug: { _type: "slug", current: s.slug } }));
  }

  if (dryRun) {
    console.log(JSON.stringify(docs, null, 1).slice(0, 4000));
    console.log(`
Prova: ${docs.length} documenti, ${uploaded.size} immagini. Nulla è stato inviato a Sanity.`);
    return;
  }

  const tx = client.transaction();
  for (const d of docs) {
    if (overwrite) tx.createOrReplace(d);
    else tx.createIfNotExists(d);
  }
  await tx.commit();

  console.log(`\nFatto: ${docs.length} documenti (${docs.map((d) => d._id).join(", ")}).`);
  if (!overwrite) console.log("I documenti già presenti non sono stati toccati. Per sovrascriverli: -- --sovrascrivi");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
