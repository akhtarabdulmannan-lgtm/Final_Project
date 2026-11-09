# VectisX — Global Currency Intelligence & Exchange Platform

**VectisX** is a modern, component-based React web application for real-time foreign exchange conversion, interactive historical rate visualization, multi-currency rate matrix comparison, and cloud rate alert tracking.

- **Public GitHub Repository:** [https://github.com/akhtarabdulmannan-lgtm/Final_Project](https://github.com/akhtarabdulmannan-lgtm/Final_Project)
- **GitHub Pages Deployment:** [https://akhtarabdulmannan-lgtm.github.io/Final_Project/](https://akhtarabdulmannan-lgtm.github.io/Final_Project/)
- **Vercel Live Deployment:** [https://vectisx.vercel.app](https://vectisx.vercel.app)

---

## Core Screens & Features

VectisX is structured into distinct, purpose-built screens connected via client-side routing:

1. **Home & Live Currency Converter (`/`, `/converter`, `/converter/[pair]`)**
   - Instant conversion across 60+ global currencies, metals, and digital assets using live mid-market rates.
   - Searchable currency picker modal, one-click currency swap, 24h movement indicators, and popular currency pair cards.

2. **Interactive Historical FX Charts (`/charts`)**
   - Multi-horizon historical exchange rate visualization (`1W`, `1M`, `3M`, `6M`, `1Y`, `5Y`) powered by **Recharts**.
   - Real daily closing rates fetched asynchronously from the **European Central Bank (Frankfurter) REST API**.
   - Computed period high, low, average, percentage change, recent closing table, and one-click **CSV dataset export**.

3. **Rate Alerts & Cloud Watchlist (`/alerts`)**
   - Custom target rate triggers ("Above or equal to" / "Below or equal to") with live rate comparison.
   - Cloud persistence and user account sync powered by **Supabase** (`rate_alerts` table with Row-Level Security).

4. **Live Multi-Currency Exchange Matrix (`/rates`)**
   - Filterable live rate table across global regions with inverse-rate toggle, live provider switcher, and watchlist currency pinning.

---

## External REST API Integration (`fetch` + `async/await`)

All exchange-rate and historical time-series requests are centralized in [`src/lib/fxApi.ts`](src/lib/fxApi.ts) and exposed to components through reusable hooks in [`src/hooks/useLiveRates.ts`](src/hooks/useLiveRates.ts):

- **Open Exchange Rates Public REST API** (`https://open.er-api.com/v6/latest/{base}`) — Live JSON spot exchange rates across 160+ world currencies.
- **Frankfurter European Central Bank REST API** (`https://api.frankfurter.dev/v1/...`) — Official ECB reference rates and historical daily time-series JSON endpoints (`/v1/{start_date}..?base={from}&symbols={to}`).
- **Loading & Error Feedback:** Every API-driven screen renders `ApiStatusBanner` showing active synchronization status, data source attribution, last-updated timestamps, and a retry/refresh action with graceful offline fallback.

---

## Third-Party Libraries & Typography

- **Core Framework & Routing:** React 18 & Next.js 14 App Router (configured with `output: 'export'` for static GitHub Pages & Vercel hosting)
- **Styling & Unified Typography:**
  - **Tailwind CSS** (`tailwindcss`) — Responsive layout utilities, design tokens, and interactive states
  - **Fontsource Inter** (`@fontsource/inter`) — Single unified professional typeface (`Inter` with OpenType `tabular-nums` for aligned financial figures) across the entire website
  - **Lucide React** (`lucide-react`) — Consistent accessible vector iconography
- **Functionality & Data:**
  - **Recharts** (`recharts`) — Responsive interactive SVG area charts and tooltips
  - **Supabase JS** (`@supabase/supabase-js`) — User authentication (`login` / `register`) and PostgreSQL cloud persistence for rate alerts, transfers, and inquiries

---

## Project Structure

```text
Final_Project/
├── .github/workflows/deploy-pages.yml  # Automated GitHub Pages CI/CD deployment
├── src/
│   ├── app/                            # Route screens (/, /charts, /alerts, /rates, ...)
│   ├── components/
│   │   ├── layout/                     # Header & Footer navigation components
│   │   ├── sections/                   # Reusable CurrencyConverter widget
│   │   └── ui/                         # ApiStatusBanner, Accordion, ScrollReveal
│   ├── data/                           # Currency metadata & static reference content
│   ├── hooks/                          # useLiveRates, useHistoricalSeries, UI hooks
│   ├── lib/                            # fxApi.ts (REST fetch client), supabase.ts, rates.ts
│   └── types/                          # TypeScript interfaces
├── supabase/migrations/                # Reproducible PostgreSQL schema & RLS policies
├── next.config.mjs                     # Static export configuration
├── tailwind.config.ts                  # Unified Inter font & color design tokens
└── package.json
```

---

## How to Run Locally

### 1. Prerequisites
- **Node.js** v18.17 or newer (v20+ recommended)
- **npm**

### 2. Install Dependencies
```bash
git clone https://github.com/akhtarabdulmannan-lgtm/Final_Project.git
cd Final_Project
npm install
```

### 3. Configure Optional Cloud Environment Variables
Live FX conversion and historical charts work immediately with **zero API keys**. To enable optional Supabase Auth and cloud alert persistence locally, copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 4. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build Static Production Export
```bash
npm run build
```
The static production build is generated in the `out/` directory, ready for GitHub Pages or Vercel hosting.
