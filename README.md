# VectisX — Currency Converter & Exchange Rate Dashboard

A React + Vite web app for converting currencies and charting exchange-rate history,
built as a final-year coursework project. Rates come from public REST APIs at runtime —
nothing on the converter is hardcoded.

It is an educational tool, not a financial service: it holds no money, offers no
transfers, and displays reference rates for information only. The site states this on
every page that could be mistaken for something more, and holds no licences because it
carries out no regulated activity.

**Live app (GitHub Pages):** https://akhtarabdulmannan-lgtm.github.io/Final_Project/
**Mirror (Vercel):** https://vectisx.vercel.app

> The Pages URL needs the one-time Pages setting described in [Deployment](#deployment)
> before it serves anything. The Vercel mirror builds from `main` and needs no setup.

---

## Screens

The app has four main screens, each with a distinct job:

| Screen | Route | What it does |
| --- | --- | --- |
| **Converter** | `#/converter` | Converts an amount between 200+ currencies using the live mid-market rate, shows the inverse rate, and links to a dedicated pair page for each currency combination. |
| **Charts** | `#/charts` | Interactive area chart of the selected pair over 1D–10Y, with CSV export and share-link copying. Built on Recharts. |
| **Live Rate Tables** | `#/rates`, `#/tables` | Sortable table of every supported currency and a cross-rate matrix for bulk comparison. |

Supporting pages (business, API docs, help, legal, blog, auth) round out the site.

---

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | **React 18** + **Vite 5** (TypeScript) |
| Routing | **react-router-dom** v6 (`HashRouter`) |
| Styling | **Tailwind CSS 3** with a custom design-token layer in `src/styles/globals.css` |
| Functionality libraries | **Recharts** (charts), **lucide-react** (icons), **@supabase/supabase-js** (auth screens) |
| Data | Public REST APIs, fetched through a same-origin `/api/rates` proxy (serverless function) with a direct fallback |

---

## The API integration

Two free, public, CORS-enabled JSON APIs supply the data. Neither needs a key, and no
provider name is shown in the interface — the UI describes the feed, not the vendor.

1. `open.er-api.com/v6/latest/USD` — current rates for ~160 currencies.
2. `api.frankfurter.dev/v1/...` — current rates as a fallback, and the source for every
   historical series: `GET https://api.frankfurter.dev/v1/2026-01-01..2026-06-01?base=USD&symbols=EUR`.

### The `/api/rates` proxy

`api/rates.ts` is a Vercel serverless function that fetches the current rates
server-side and returns one normalised shape:

```json
{ "base_code": "USD", "time_last_update_utc": "…", "rates": { "EUR": 0.86 } }
```

`src/lib/fx/client.ts` requests it first and falls back to calling the public API
directly when the function is not deployed (for example `npm run dev`, where Vite serves
no functions). Two reasons for the indirection:

- **The provider key never reaches the browser.** If a keyed provider is ever used,
  `FX_API_KEY` is read inside the function and is never bundled into client JavaScript.
- **One response shape.** The function normalises er-api and Frankfurter payloads, so the
  client parses one schema instead of two.

Environment variables, all optional, set in the Vercel project (never in the repo):

| Variable | Purpose |
| --- | --- |
| `FX_API_URL` | Upstream URL the function should call. Defaults to the public er-api endpoint. |
| `FX_API_KEY` | Sent upstream when present (omit for keyless providers). |
| `FX_API_KEY_PARAM` | Query-string name for the key, e.g. `access_key`. Defaults to `api_key`. |

The function caches for 60 seconds (`s-maxage`) and serves stale for five minutes
(`stale-while-revalidate`).

### Fallbacks

The client lives in `src/lib/fx/client.ts` and `src/lib/fx/history.ts`. Each call:

- uses `fetch` with `async/await` and an `AbortController` timeout (9s / 12s),
- validates the JSON shape before trusting it,
- throws a typed `FxApiError` carrying a user-safe message plus technical detail,
- falls back to the second provider, then to a 15-minute `localStorage` cache.

`src/lib/fx/RateProvider.tsx` owns the request and exposes three states to the UI:

- **loading** — skeleton placeholders and a "Fetching live rates…" badge,
- **ready** — a banner naming the feed and its update date,
- **error** — a dismissible notice explaining what failed, with a **Retry** button and
  a collapsible technical-details block.

If both providers are unreachable, the app keeps working from a clearly labelled bundled
snapshot (`src/lib/rates.ts`) and says so in the header — it never silently presents stale
numbers as live.

---

## Running the project

Requires **Node.js 18+**.

```bash
# 1. Clone
git clone https://github.com/akhtarabdulmannan-lgtm/Final_Project.git
cd Final_Project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the URL it prints (usually <http://localhost:5173>). The app reloads on save.

### 4. Production build

```bash
npm run build     # type-checks, builds to dist/, writes the 404 fallback
npm run preview   # serve the production build locally
```

### Why the downloaded `index.html` shows a blank page

The file at the root of this repository is the **Vite source template**. The line

```html
<script type="module" src="/src/main.tsx"></script>
```

asks the browser for an uncompiled `.tsx` file at the root of the drive (`/src/main.tsx`). Browsers cannot run TypeScript, and the leading `/` points outside the folder you extracted, so nothing mounts and `#root` stays empty. That is expected: this file is meant to be served by the dev server, not opened directly.

The same applies to the normal production build in `dist/`: its `index.html` points at `/assets/index-*.js`, which again resolves from the server root. Both need a server.

### Opening it without a server

```bash
npm run build:standalone
```

This writes `standalone/index.html` with every script, stylesheet and font inlined and with relative paths, so it can be opened by double-clicking. Verified self-contained: one file of about 1 MB, no `import()`, no CDN references.

Two caveats:

- **Live rates may not load from `file://`.** The rate APIs reject cross-origin requests from a `null` origin in some browsers. The app copes: it falls back to the bundled reference snapshot and says so in the header instead of showing stale numbers as live.
- **Local storage and the clipboard are restricted** under `file://`, so saved preferences and "copy link" behave differently.

For a fully working local copy, serve the folder instead — this gives you live rates and correct storage:

```bash
npm run build
npm run preview      # serves dist/ over http://localhost:4173
```

If you only want to look at the finished site, use the deployed URL: <https://vectisx.vercel.app>.

### Optional: sign-in screens

The converter and charts need no configuration. The login/register/reset screens
use Supabase and stay disabled unless credentials are present. Copy `.env.example` to
`.env` and fill in:

```bash
VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

Both values are public by design; access is controlled by Supabase row-level security.
Email sign-up requires confirmation: the account is only usable after the link in the
verification mail is followed (`mailer_autoconfirm` is off in the Supabase project).

---

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and publishes `dist/` to
GitHub Pages using the official Pages actions. To enable it once per repository:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions**
2. Push to `main` (or run the workflow manually from the Actions tab).

`vite.config.ts` sets `base: '/Final_Project/'` for production builds so assets resolve
under the repository subpath, and the deploy step copies `index.html` to `404.html` so a
hard refresh on any deep link still boots the app.

---

## Project structure

```
api/rates.ts                # serverless proxy for current rates
src/
├── App.tsx                 # route table + layout shell
├── main.tsx                # React entry point (HashRouter)
├── routes/                 # one file per screen
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # CurrencyConverter card
│   ├── ui/                 # buttons, skeletons, badges, charts chrome
│   └── feedback/           # loading / error / source banner
├── lib/
│   ├── fx/                 # API client, history, RateProvider hook
│   ├── rates.ts            # offline fallback table + formatting helpers
│   ├── supabase.ts         # auth client (optional)
│   └── utils.ts
├── data/                   # currencies, navigation, blog copy
├── router/                 # Link + hook shims over react-router
└── styles/globals.css      # Tailwind layers + design tokens + fonts
```

## Quality checks

```bash
npm run typecheck    # tsc --noEmit
npm run check:links  # fails if any internal link points at a missing route
npm run build        # both of the above, then a production build
```

`scripts/check-links.mjs` compares every `href="/…"` in the source against the route table
in `App.tsx`; it currently verifies 74 links across 39 routes.

## Credits

Rate data: [ExchangeRate-API](https://www.exchangerate-api.com/) and
[Frankfurter](https://frankfurter.dev/) (European Central Bank reference rates).
UI inspiration: Xe.com. Not affiliated with either; this is a coursework project.
