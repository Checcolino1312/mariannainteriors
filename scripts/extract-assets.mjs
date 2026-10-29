// Estrae le immagini incorporate nella bozza e le salva ottimizzate in public/images.
// Uso: npm run assets
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { MATERIALE, ROOT, readEmbedded } from "./lib/bozza.mjs";

const OUT = path.join(ROOT, "public", "images");
mkdirSync(OUT, { recursive: true });

const embedded = readEmbedded();

// Indice della risorsa nella bozza -> nome file e trasformazione.
const jobs = [
  ...[6, 7, 8, 9, 10, 11, 12, 13].map((i, n) => ({
    i,
    name: `moodboard/moodboard-${String(n + 1).padStart(2, "0")}`,
    width: 420,
    flatten: "#ffffff",
  })),
  // Ritaglio equivalente al posizionamento CSS della bozza (width 250.58%, left -3.71%, top -47.70%).
  { i: 17, name: "marianna-mancini", extract: { left: 16, top: 436, width: 431, height: 914 }, alpha: true },
  { i: 18, name: "onda-instagram", width: 2048, alpha: true },
];

// Foto dei progetti: sono già WebP compressi, si copiano senza ricompressione.
[
  [5, "progetti/living-equilibrio-naturale.webp"],
  [15, "progetti/bagno-materia-e-luce.webp"],
].forEach(([i, name]) => {
  const file = path.join(OUT, name);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, embedded[i].buffer);
  console.log("ok", path.relative(ROOT, file));
});

// Anteprime dei reel: sono già piccole (263 px) e compresse, quindi si salvano identiche
// all'originale, senza ricompressione (altrimenti risultano sgranate).
[19, 20, 21, 22, 23, 24].forEach((i, n) => {
  const file = path.join(OUT, "reel", `reel-${String(n + 1).padStart(2, "0")}.jpg`);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, embedded[i].buffer);
  console.log("ok", path.relative(ROOT, file));
});

for (const job of jobs) {
  const file = path.join(OUT, `${job.name}.webp`);
  mkdirSync(path.dirname(file), { recursive: true });
  let img = sharp(embedded[job.i].buffer);
  if (job.extract) img = img.extract(job.extract);
  if (job.width) img = img.resize({ width: job.width, withoutEnlargement: true });
  if (job.flatten) img = img.flatten({ background: job.flatten });
  await img.webp({ quality: job.alpha ? 90 : 82, alphaQuality: 100, effort: 6 }).toFile(file);
  console.log("ok", path.relative(ROOT, file));
}

// Sfondi forniti dalla cliente.
const backgrounds = [
  { src: "logo/solo sfondo.jpg", name: "sfondo-intonaco", width: 936 },
];
for (const bg of backgrounds) {
  const file = path.join(OUT, `${bg.name}.webp`);
  await sharp(path.join(MATERIALE, bg.src)).resize({ width: bg.width }).webp({ quality: 80, effort: 6 }).toFile(file);
  console.log("ok", path.relative(ROOT, file));
}
