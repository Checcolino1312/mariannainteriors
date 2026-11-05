# marianna.interiors — sito

Sito di Marianna Interiors (interior design online), costruito con Next.js 16 (App Router, Cache Components) a partire dalla bozza `materialesito/marianna-interiors-bozza.html`.

## Comandi

```bash
npm install
npm run dev      # sviluppo su http://localhost:3000
npm run build    # build di produzione (tutte le pagine sono statiche)
npm run start    # serve la build
npm run lint

npm run assets   # ri-estrae e ottimizza le immagini dalla bozza in public/images
npm run brand    # rigenera logo vettoriale, favicon, icone e immagine Open Graph dai file in materialesito/
```

`materialesito/` (bozza HTML, loghi e sfondi originali) non è versionata: serve solo in locale per `npm run assets` e `npm run brand`. I file generati (`public/images`, icone, `src/components/brand/paths.ts`) sono già nel repository.

## Dove modificare

I contenuti (testi, servizi, prezzi, immagini, contatti, bonifico, link Cal.com e Stripe, pagine legali) si modificano in **Sanity Studio** su `/studio`. Configurazione e guida: [docs/sanity.md](docs/sanity.md). Senza le variabili Sanity il sito usa i contenuti predefiniti nel codice.

| Cosa | File |
| --- | --- |
| Contenuti predefiniti (seed dell'import Sanity) | `src/content/settings.ts`, `home.ts`, `services.ts`, `pages.ts`, `images.ts` |
| Schemi dello Studio | `src/sanity/schemaTypes/` |
| Lettura dei contenuti, cache e fallback | `src/lib/cms.ts` (webhook: `src/app/api/revalidate/route.ts`) |
| Dominio | variabile `NEXT_PUBLIC_SITE_URL` (`src/lib/site.ts`) |
| Prenotazioni e pagamenti | guida: [docs/prenotazioni-e-pagamenti.md](docs/prenotazioni-e-pagamenti.md) |
| Stili | `src/app/globals.css` |

Servizi, FAQ e dati di contatto alimentano in automatico pagine, dati strutturati (JSON-LD), `sitemap.xml` e `llms.txt`: si aggiornano in un posto solo.

## Brand

- Logo vettoriale generato da `scripts/build-brand.mjs`: monogramma da `logo def.jpg` (l'unico file con bordi antialiasati), wordmark e payoff dall'immagine ad alta risoluzione della bozza. Tracciati in `src/components/brand/paths.ts`.
- Palette e font da `materialesito/riferimento grafica.png`: Burro `#F4E9B6`, Beige `#EEE9E2`, Terracotta `#AB663C`, Noce `#402E23`; Playfair Display (titoli) e Montserrat (payoff e testi).

## SEO e AI-SEO

- Metadati, canonical e Open Graph per ogni pagina; `sitemap.xml`, `robots.txt` (crawler AI esplicitamente ammessi), `manifest.webmanifest`.
- JSON-LD: `ProfessionalService`, `Person`, `WebSite`, `Service` + `Offer` per ogni servizio, `FAQPage`, `BreadcrumbList`.
- `/llms.txt` e `/llms-full.txt` generati dai contenuti.
- Ogni servizio ha una pagina propria (`/servizi/...`); i vecchi link `#servizio/...` vengono reindirizzati.

## Prenotazioni e pagamenti

- **Consulenza 60 min**: prenotazione e pagamento con Cal.com + Stripe, in un popup sul sito (`src/components/booking/BookConsultation.tsx`). Lo script di Cal.com si carica solo quando l'utente si avvicina al pulsante.
- **Mappa di stile**: Stripe Payment Link.
- I dati per la fattura (codice fiscale, indirizzo, P. IVA e SDI/PEC per le aziende) vengono chiesti durante la prenotazione/pagamento: il sito non salva dati.
- Dopo il pagamento il cliente arriva su `/grazie?servizio=consulenza|mappa` (noindex) con le istruzioni per inviare il materiale.
- Senza link configurati i pulsanti aprono un'email precompilata.

## Da completare con la cliente

- Dominio definitivo (`src/lib/site.ts`) e registrazione in Google Search Console / Bing Webmaster Tools.
- Account Stripe e Cal.com e relativi link (vedi la guida in `docs/`).
- Verifica delle condizioni di vendita (bozza) con commercialista/legale.
- Fotografie di progetti reali al posto delle immagini illustrative AI.
- Eventuale città/sede, per aggiungere l'indirizzo ai dati strutturati (SEO locale).
