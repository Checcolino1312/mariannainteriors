# Sanity: contenuti modificabili

Tutti i testi, i servizi, i prezzi, le immagini, i contatti, i dati del bonifico, i testi per Google e le pagine legali si modificano da **Sanity Studio**, incorporato nel sito su **`/studio`** (es. `https://www.mariannainteriors.it/studio`).

Finché il progetto Sanity non è collegato, il sito usa i contenuti scritti nel codice (`src/content/*`): non si rompe mai. Gli stessi contenuti vengono caricati in Sanity con l'import iniziale.

## Cosa si modifica dove

| Nello Studio | Contenuto |
| --- | --- |
| **Home** | intro, prima sezione e galleria, nastro di moodboard, intestazione servizi e "Da dove vuoi iniziare?", esempi (progetti, mappa di stile, palette), Chi sono (foto e testo), Come lavoriamo insieme, domande frequenti, fascia finale, Instagram |
| **Servizi** | i 4 servizi: card in home, pagina del servizio, prezzo, galleria, pulsante (Cal.com / Stripe / email), bonifico, testi per Google. L'ordine segue il campo *Numero* |
| **Pagina Grazie** | testi dopo l'acquisto della consulenza, della mappa di stile e negli altri casi |
| **Privacy**, **Condizioni di vendita** | testo completo con titoletti, grassetto, corsivo e link |
| **Impostazioni del sito** | nome, titolo e descrizione per Google, contatti, P. IVA, Instagram, evento Cal.com, dati del bonifico, voci del menu, sfondo materico di intro e menu, testi comuni delle pagine servizio |

Nei titoli: **Invio** va a capo, il testo tra asterischi `*così*` è in corsivo.

Restano nel codice (non hanno senso da modificare a mano): logo e favicon (generati dal file del logo con `npm run brand`), colori, caratteri, animazioni, onda decorativa sopra Instagram, pagina 404 e piccoli testi tecnici (es. "Menu", "Copia").

---

## Configurazione (una volta sola, per lo sviluppatore)

### 1. Creare il progetto

1. Vai su [sanity.io/manage](https://www.sanity.io/manage) e accedi (o crea l'account, il piano **Free** basta).
2. **Create new project**: nome `Marianna Interiors`, dataset **`production`** (visibilità *Public*: i contenuti del sito sono pubblici comunque).
3. Copia il **Project ID** (una stringa tipo `ab12cd34`).

### 2. CORS origins

*Progetto > API > CORS origins > Add CORS origin*, con **Allow credentials** attivo per ognuno (serve allo Studio incorporato):

- `http://localhost:3000`
- `https://mariannainteriors.vercel.app`
- `https://www.mariannainteriors.it`

### 3. Token di scrittura (solo per l'import)

*API > Tokens > Add API token*: nome `import`, permessi **Editor**. Copialo subito (si vede una volta sola). Non va su Vercel e si può eliminare dopo l'import.

### 4. Variabili d'ambiente

In locale copia `.env.local.example` in `.env.local` e compila `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_API_WRITE_TOKEN` e `SANITY_REVALIDATE_SECRET` (una stringa casuale lunga, ad esempio generata con `openssl rand -hex 32`).

Su **Vercel** (*Settings > Environment Variables*, ambienti Production e Preview):

| Variabile | Valore |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | il Project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_REVALIDATE_SECRET` | la stessa stringa di `.env.local` |

Poi **Redeploy**.

### 5. Importare i contenuti attuali

```bash
npm run sanity:import
```

Carica le immagini di `public/images` e crea i documenti con i contenuti di oggi. Gli ID sono fissi: rilanciarlo non crea doppioni e **non tocca** i documenti già presenti. Per riportare tutto ai contenuti del codice (cancellando le modifiche fatte nello Studio): `npm run sanity:import -- --sovrascrivi`.

Per controllare cosa verrebbe caricato senza collegarsi a Sanity: `npx tsx scripts/sanity-import.ts --prova`.

### 6. Webhook (aggiornamento immediato del sito)

*API > Webhooks > Create webhook*:

| Campo | Valore |
| --- | --- |
| Name | `Aggiorna sito` |
| URL | `https://www.mariannainteriors.it/api/revalidate` (finché il dominio non è attivo: `https://mariannainteriors.vercel.app/api/revalidate`) |
| Dataset | `production` |
| Trigger on | Create, Update, Delete |
| Filter | lasciare vuoto |
| Projection | `{_type}` |
| HTTP method | POST |
| Secret | il valore di `SANITY_REVALIDATE_SECRET` |

A ogni pubblicazione il sito si aggiorna in pochi secondi: basta ricaricare la pagina. Senza webhook le modifiche comparirebbero solo al deploy successivo.

### 7. Invitare Marianna

*Members > Invite members*: email di Marianna, ruolo **Editor**. Riceve un invito, crea l'accesso (anche con Google) e da quel momento entra su `/studio`.

### Backup

```bash
npm run sanity:backup
```

Scarica dataset e immagini in `backup-sanity.tar.gz` (ignorato da git). Va lanciato con `NEXT_PUBLIC_SANITY_PROJECT_ID` impostato e dopo `npx sanity login`.

---

## Guida per Marianna

1. Apri `https://www.mariannainteriors.it/studio` e accedi.
2. A sinistra scegli cosa modificare (Home, Servizi, Pagina Grazie, Privacy, Condizioni di vendita, Impostazioni del sito). In Home e nei Servizi le schede in alto dividono i campi per sezione.
3. Modifica i testi o le immagini. Le modifiche restano in **bozza** finché non premi **Publish** in basso a destra.
4. Dopo la pubblicazione ricarica il sito: la modifica compare in pochi secondi.

**Immagini.** Trascina la foto nel campo. Con l'icona della matita scegli il ritaglio e il **punto focale** (la parte da tenere sempre visibile). Compila il **testo alternativo**: una frase che descrive la foto, utile a chi non vede e a Google (per sfondi e miniature si può lasciare vuoto). Meglio foto in formato JPG o WebP, larghe almeno 1600 pixel.

**Servizi.** Il campo *Numero* decide l'ordine. Cambiare l'*Indirizzo della pagina* rompe i link già condivisi: meglio non farlo. Il *Pulsante principale* può essere: prenota e paga su Cal.com (l'evento si imposta in Impostazioni del sito), acquista con un link di pagamento Stripe, oppure richiesta via email. Se il link di Cal.com o Stripe manca, il pulsante apre un'email automaticamente.

**Cronologia.** Ogni documento ha la cronologia delle versioni (icona dell'orologio in alto a destra): si può tornare a una versione precedente.
