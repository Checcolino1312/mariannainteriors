// Legge le risorse base64 incorporate nella bozza HTML, nell'ordine in cui compaiono.
import { readFileSync } from "node:fs";
import path from "node:path";

export const ROOT = path.resolve(import.meta.dirname, "..", "..");
export const MATERIALE = path.join(ROOT, "materialesito");
export const BOZZA = path.join(MATERIALE, "marianna-interiors-bozza.html");

export function readEmbedded() {
  const html = readFileSync(BOZZA, "utf8");
  const re = /data:([a-z]+\/[a-z+]+);base64,([A-Za-z0-9+/=]+)/g;
  const out = [];
  let m;
  while ((m = re.exec(html))) out.push({ mime: m[1], buffer: Buffer.from(m[2], "base64") });
  return out;
}
