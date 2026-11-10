# VectisX — Currency Converter & Exchange Rate Dashboard

A React + Vite web app for converting currencies, charting exchange-rate history, and
watching the pairs you care about. Rates come from public REST APIs at runtime — nothing
on the converter is hardcoded.

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
| **Rate Alerts** | `#/alerts` | Sets a target rate for a pair and direction, then compares it against the live feed. |
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
| Data | Public REST APIs, fetched in the browser |

---

## The API integration

Two free, public, CORS-enabled JSON APIs are used. No API key is required.

1. **open.er-api.com** — `GET https://open.er-api.com/v6/latest/USD`
   Primary source for current rates (~160 currencies, daily reference data).
2. **api.frankfurter.dev** — `GET https://api.frankfurter.dev/v1/latest?base=USD`
   Fallback for current rates, and the source for historical series:
   `GET https://api.frankfurter.dev/v1/2026-01-01..2026-06-01?base=USD&symbols=EUR`

The client lives in `src/lib/fx/client.ts` and `src/lib/fx/history.ts`. Each call:

- uses `fetch` with `async/await` and an `AbortController` timeout (9s / 12s),
- validates the JSON shape before trusting it,
- throws a typed `FxApiError` carrying a user-safe message plus technical detail,
- falls back to the second provider, then to a 15-minute `localStorage` cache.

`src/lib/fx/RateProvider.tsx` owns the request and exposes three states to the UI:

- **loading** — skeleton placeholders and a "Fetching live rates…" badge,
- **ready** — a banner naming the provider and its update date,
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

### Optional: sign-in screens

The converter, charts and alerts need no configuration. The login/register/reset screens
use Supabase and stay disabled unless credentials are present. Copy `.env.example` to
`.env` and fill in:

```bash
VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

Both values are public by design; access is controlled by Supabase row-level security.

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

Rate data: [open.er-api.com](https://www.exchangerate-api.com/) and
[Frankfurter](https://frankfurter.dev/) (European Central Bank reference rates).
UI inspiration: Xe.com. Not affiliated with either; this is a coursework project.
