# CIFRAS Y PAPELETAS · The Benford Countdown

Do Spanish election results follow the number pattern predicted by Benford's Law? This static website checks it for every general election since 1977, for three famous datasets and for any file a visitor uploads. Everything runs in the browser.

| Author | ORCID |
|---|---|
| Sinuhé Perea-Puente | [0000-0002-5869-5701](https://orcid.org/0000-0002-5869-5701) |
| Yanxue Wang | [0009-0006-5523-5351](https://orcid.org/0009-0006-5523-5351) |
| André Vellwock | [0000-0001-8296-2032](https://orcid.org/0000-0001-8296-2032) |
| David Martínez-Rubio | [0000-0002-4345-5422](https://orcid.org/0000-0002-4345-5422) |

## Pages

| Address | Content |
|---|---|
| `/` | Home (next election, famous cases), Pruébalo (upload your data), Hemeroteca (elections 1977–2023), Más info (article and bibliography) |
| `/actual/` | Current election (29 November 2026): hour-by-hour updates of the count, with the same analysis as the Hemeroteca |

Spanish and English; light and dark mode. No server code is needed: copy the folder to any static host.

## Folder

| Path | Content |
|---|---|
| `index.html` | main page |
| `actual/index.html` | current-election page |
| `.nojekyll` | tells GitHub Pages to publish the files as they are |
| `assets/core.js` | statistics, file readers, image analysis, charts, interface and translations |
| `assets/archive.js`, `assets/archive-bridge.js` | election archive: full results tables and link to the analysis panel |
| `assets/style.css`, `assets/archive.css` | layout and colours |
| `data/ejemplos.js` | famous cases (from the R package benford.analysis) |
| `data/archivo/` | one file per general election, 1977–2023, plus `manifest.js` |
| `data/originales/` | official source documents (BOE, Junta Electoral Central, Ministry of the Interior) offered for download |
| `data/elecciones/registro.js` | list of elections shown on the home page |
| `data/elecciones/2023-07-23.js` | 23J table used by the home-page example and the overseas register |
| `data/elecciones/2026-11-29.js` | 29N updates (currently **simulated** placeholder data) |

## 29N data and election night

Until election night, `data/elecciones/2026-11-29.js` contains simulated updates built from the 2023 results, and the page says so in a yellow banner. On election night, `host.py` (in this folder) adds each new results file:

It reads the votes by province and party (Congress, and Senate if present), assigns each party to its family, recomputes the four most voted families, removes the simulated data with the first real update, and prints the files that changed. Upload those files (normally only `data/elecciones/2026-11-29.js`) to the same path on the server.

## Licence

Code MIT · Text and figures CC BY 4.0 · Election data reused from the BOE, the Junta Electoral Central and the Ministry of the Interior under their own terms (see each election's sources in the Hemeroteca).
