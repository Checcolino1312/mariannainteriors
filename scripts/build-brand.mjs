// Vettorializza il logo ufficiale (materialesito/logo2.png + wordmark della bozza)
// e genera tracciati SVG, favicon, icone PWA e immagine Open Graph.
// Uso: npm run brand
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import potrace from "potrace";
import sharp from "sharp";
import pngToIco from "png-to-ico";
import { MATERIALE, ROOT, readEmbedded } from "./lib/bozza.mjs";

const SCALE = 4; // il tracciamento su un'immagine ingrandita produce curve più morbide
const COLORS = { burro: "#F4E9B6", beige: "#EEE9E2", terracotta: "#A26238", noce: "#402E23" };

/** Bounding box dei pixel opachi nelle righe [y0, y1]. */
async function opaqueBox(input, y0, y1, min = 100, x0 = 0, x1 = Infinity) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let minX = info.width, maxX = 0, minY = info.height, maxY = 0;
  for (let y = y0; y <= y1; y++)
    for (let x = x0; x < Math.min(x1, info.width); x++)
      if (data[(y * info.width + x) * 4 + 3] > min) {
        minX = Math.min(minX, x); maxX = Math.max(maxX, x);
        minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      }
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

/**
 * Traccia la porzione `part` (righe del sorgente) dentro il riquadro `frame`, restituendo il path in coordinate del riquadro.
 * `smooth` è la sfocatura in pixel del sorgente applicata prima della soglia: serve a eliminare la scalettatura
 * dei PNG senza antialiasing (logo2.png).
 */
async function trace(input, frame, part, smooth = 0.5) {
  const { width, height } = frame;
  // Maschera nera su bianco, solo per le righe della parte richiesta.
  const alpha = await sharp(input).extract(frame).ensureAlpha().extractChannel(3).raw().toBuffer();
  for (let y = 0; y < height; y++) {
    const inside = y + frame.top >= part[0] && y + frame.top <= part[1];
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      alpha[i] = inside ? 255 - alpha[i] : 255;
    }
  }
  const png = await sharp(alpha, { raw: { width, height, channels: 1 } })
    .resize(width * SCALE, height * SCALE, { kernel: "lanczos3" })
    .blur(SCALE * smooth)
    .png()
    .toBuffer();
  const svg = await new Promise((resolve, reject) =>
    potrace.trace(png, { threshold: 128, turdSize: 40, optTolerance: 0.8, alphaMax: 1.1 }, (err, out) => (err ? reject(err) : resolve(out))),
  );
  const d = svg.match(/ d="([^"]+)"/)[1];
  // Riporta le coordinate alla scala originale con 1 decimale.
  return d.replace(/-?\d+(\.\d+)?/g, (n) => String(Math.round((Number(n) / SCALE) * 10) / 10));
}

// --- Monogramma "im"
// Sorgente: "logo def.jpg", l'unico con bordi antialiasati (logo1/logo2.png sono scalettati).
// Il monogramma color crema si separa nettamente dallo sfondo materico per luminanza (sfondo <= 185, segno >= 210).
const logoDef = path.join(MATERIALE, "logo def.jpg");
const monoPng = await (async () => {
  const { data, info } = await sharp(logoDef).raw().toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const l = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    rgba[j + 3] = Math.max(0, Math.min(255, Math.round(((l - 192) / (216 - 192)) * 255)));
  }
  return sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
})();
const pad = 6;
const mono = await opaqueBox(monoPng, 545, 840, 200);
const monoFrame = { left: mono.left - pad, top: mono.top - pad, width: mono.width + pad * 2, height: mono.height + pad * 2 };
// Il punto della "i" è un cerchio: lo ricostruisco geometricamente dal suo ingombro.
const dotBox = await opaqueBox(monoPng, 545, 608, 128, mono.left, mono.left + 120);
const r = (dotBox.width + dotBox.height) / 4;
const cx = dotBox.left - monoFrame.left + dotBox.width / 2;
const cy = dotBox.top - monoFrame.top + dotBox.height / 2;
const f = (n) => Math.round(n * 100) / 100;
const monoDot = `M ${f(cx - r)} ${f(cy)} A ${f(r)} ${f(r)} 0 1 0 ${f(cx + r)} ${f(cy)} A ${f(r)} ${f(r)} 0 1 0 ${f(cx - r)} ${f(cy)} Z`;
const monoBody = await trace(monoPng, monoFrame, [609, 840], 0.35);

// --- Wordmark + payoff (immagine ad alta risoluzione incorporata nella bozza)
const wordmarkPng = readEmbedded()[4].buffer;
const word = await opaqueBox(wordmarkPng, 200, 520);
const wordFrame = { left: word.left - pad, top: word.top - pad, width: word.width + pad * 2, height: word.height + pad * 2 };
const wordName = await trace(wordmarkPng, wordFrame, [200, 400]);
const wordPayoff = await trace(wordmarkPng, wordFrame, [401, 520]);

const ts = `// File generato da scripts/build-brand.mjs a partire dal logo ufficiale. Non modificare a mano.
export const MONOGRAM = {
  viewBox: "0 0 ${monoFrame.width} ${monoFrame.height}",
  width: ${monoFrame.width},
  height: ${monoFrame.height},
  dot: "${monoDot}",
  body: "${monoBody}",
} as const;

export const WORDMARK = {
  viewBox: "0 0 ${wordFrame.width} ${wordFrame.height}",
  width: ${wordFrame.width},
  height: ${wordFrame.height},
  name: "${wordName}",
  payoff: "${wordPayoff}",
} as const;
`;
const brandDir = path.join(ROOT, "src", "components", "brand");
mkdirSync(brandDir, { recursive: true });
writeFileSync(path.join(brandDir, "paths.ts"), ts);
console.log("ok src/components/brand/paths.ts");

// --- Icone
const appDir = path.join(ROOT, "src", "app");
const pub = path.join(ROOT, "public");

/** SVG quadrato del monogramma centrato, con sfondo opzionale. */
function monogramSquare(fill, bg, { padding = 0.16, radius = 0 } = {}) {
  const size = 512;
  const inner = size * (1 - padding * 2);
  const s = Math.min(inner / monoFrame.width, inner / monoFrame.height);
  const tx = (size - monoFrame.width * s) / 2;
  const ty = (size - monoFrame.height * s) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">${
    bg ? `<rect width="${size}" height="${size}" rx="${radius}" fill="${bg}"/>` : ""
  }<g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${s.toFixed(4)})" fill="${fill}" fill-rule="evenodd"><path d="${monoDot}"/><path d="${monoBody}"/></g></svg>`;
}

// icon.svg: monogramma terracotta su beige, leggibile su tab chiari e scuri.
writeFileSync(path.join(appDir, "icon.svg"), monogramSquare(COLORS.terracotta, COLORS.beige, { padding: 0.14, radius: 96 }));
console.log("ok src/app/icon.svg");

const render = (svg, size) => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
const favSvg = monogramSquare(COLORS.terracotta, COLORS.beige, { padding: 0.12, radius: 96 });
const ico = await pngToIco(await Promise.all([16, 32, 48].map((s) => render(favSvg, s))));
writeFileSync(path.join(appDir, "favicon.ico"), ico);
console.log("ok src/app/favicon.ico");

const touchSvg = monogramSquare(COLORS.beige, COLORS.terracotta, { padding: 0.2 });
writeFileSync(path.join(appDir, "apple-icon.png"), await render(touchSvg, 180));
writeFileSync(path.join(pub, "icon-192.png"), await render(touchSvg, 192));
writeFileSync(path.join(pub, "icon-512.png"), await render(touchSvg, 512));
const maskable = monogramSquare(COLORS.beige, COLORS.terracotta, { padding: 0.28 });
writeFileSync(path.join(pub, "icon-maskable-512.png"), await render(maskable, 512));
console.log("ok apple-icon.png, icon-192/512.png, icon-maskable-512.png");

// --- Open Graph 1200x630: sfondo materico + lockup centrato (come "logo def.jpg")
{
  const W = 1200, H = 630;
  const monoH = 250;
  const ms = monoH / monoFrame.height;
  const monoW = monoFrame.width * ms;
  const ws = 470 / wordFrame.width;
  const wordH = wordFrame.height * ws;
  const total = monoH + 34 + wordH;
  const y0 = (H - total) / 2;
  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="${COLORS.noce}" fill-opacity=".18"/>
    <g transform="translate(${((W - monoW) / 2).toFixed(2)} ${y0.toFixed(2)}) scale(${ms.toFixed(4)})" fill="${COLORS.beige}"><path d="${monoDot}"/><path d="${monoBody}"/></g>
    <g transform="translate(${((W - 470) / 2).toFixed(2)} ${(y0 + monoH + 34).toFixed(2)}) scale(${ws.toFixed(4)})">
      <path d="${wordName}" fill="${COLORS.beige}" fill-rule="evenodd"/><path d="${wordPayoff}" fill="${COLORS.burro}" fill-rule="evenodd"/>
    </g></svg>`;
  await sharp(path.join(MATERIALE, "sfondo.png"))
    .resize(W, H, { fit: "cover", position: "top" })
    .composite([{ input: Buffer.from(overlay) }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(appDir, "opengraph-image.jpg"));
  console.log("ok src/app/opengraph-image.jpg");
}
