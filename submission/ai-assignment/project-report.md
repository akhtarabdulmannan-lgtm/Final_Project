# Project Report — VectisX Currency Converter & Exchange Rate Dashboard

**Student:** Abdul Mannan Ahmad
**Course:** Web Application with React — Final Project (40%)
**Deadline:** 13 November 2026
**Method:** Individual work
**Submitted:** 23 November 2026 (AI assignment resubmission)

**Repository:** https://github.com/akhtarabdulmannan-lgtm/Final_Project
**Deployed application:** https://akhtarabdulmannan-lgtm.github.io/Final_Project/
**Mirror:** https://vectisx.vercel.app

---

## Note on sources

Every figure in this report was taken from the repository at commit `ce38dbe`
rather than from memory or from earlier drafts. Where a claim could not be verified
from the codebase or the Git history, it is marked as such rather than asserted.
The state of the repository as read for this report is recorded in the "Testing and
verification" section so the numbers can be re-checked.

---

## 1. Project overview

VectisX is a single-page web application for checking currency exchange rates. It
does three things: converts an amount between any two of 64 supported currencies at
a mid-market reference rate, charts how a currency pair has moved over periods from
one day to ten years, and presents the same data as sortable tables, a cross-rate
matrix and a downloadable daily series.

It is aimed at the ordinary person who needs a rate rather than a trade — someone
checking what a purchase abroad will cost, or looking at how a pair has drifted
before a trip. It holds no money, performs no transfers, and states on every page
that could be mistaken for a financial service that it displays reference rates for
information only.

The rates come from public, keyless REST APIs at runtime. Nothing on the converter
is hardcoded; if every provider is unreachable the application falls back to a
saved snapshot and labels it as such rather than presenting stale numbers as live.

**Figures read from the repository:**

| Measure | Value |
| --- | --- |
| Routes declared in `src/App.tsx` | 28 |
| Supported currencies (`src/data/currencies.ts`) | 64 |
| TypeScript/TSX source files under `src/` | 65 |
| Runtime dependencies | 6 |
| Development dependencies | 14 |
| Commits on `main` | 33 |
| Authors on `main` | 1 |

---

## 2. Objectives

The project set out to meet the brief's core requirements and to be defensible in
review:

1. **Build the UI from React components.** Not one large file, but a structure where
   layout, screens, presentational components and data access are separable.
2. **Provide at least three screens with genuinely different jobs.** The brief is
   explicit that screens must not repeat the same feature on different URLs, so each
   screen had to own a distinct task rather than re-present the converter.
3. **Use third-party libraries for both styling and functionality.** Styling was to
   come from a utility framework with a real design-token layer underneath, not
   ad-hoc inline styles.
4. **Integrate a real REST API with `fetch` and `async`/`await`**, with proper error
   handling and user-facing feedback rather than a silent failure.
5. **Deploy to GitHub Pages** at a public URL.
6. **Keep a meaningful commit history** and a README that lets someone else run the
   project without asking questions.
7. **Be honest about limitations** — in the code, in the copy and in this report.

A secondary objective emerged during the build and is worth stating because it shaped
much of the work: the application must not claim to do things it does not do. Several
rounds of the work consisted of removing content that overstated the project — pages
for money transfers and business accounts, invented regulatory credentials and company
details — because an application that misrepresents itself is not a finished project
regardless of how it looks.

---

## 3. Technologies used

### Framework and language

| Concern | Choice | Reason |
| --- | --- | --- |
| Framework | **React 18** | Component model required by the brief; hooks cover all the state this app needs without an external state library. |
| Build tool | **Vite 5** | The brief recommends it; fast dev server and a simple, readable build configuration. |
| Language | **TypeScript 5** | Types on the API payloads were the main defence against malformed data. `tsc --noEmit` is part of the build, so a type error fails the deploy. |
| Routing | **react-router-dom 6** (`HashRouter`) | Required by the brief. Hash routing was chosen deliberately so that every in-app route is a fragment of one document and needs no server rewrite — which matters on a static host. |

### Third-party libraries — styling

| Library | Role |
| --- | --- |
| **Tailwind CSS 3** | All styling. Used as a utility layer over a custom design-token set defined in `src/styles/globals.css`, so colour, spacing, radius and typography are declared once and consumed as utilities. |
| **PostCSS + Autoprefixer** | Build-time CSS processing and vendor prefixing. |
| **lucide-react** | Icon set, used for consistent iconography across navigation, cards and controls. |

### Third-party libraries — functionality

| Library | Role |
| --- | --- |
| **Recharts 2** | The interactive area chart on the charts screen, including the custom tooltip that prints the date and rate together, and the responsive container that makes the chart scale. |
| **@supabase/supabase-js** | Optional authentication for the sign-in, registration and password-reset screens. Deliberately optional: the converter and charts work with no configuration, and the auth screens show a notice when credentials are absent. |
| **react-router-dom** | Navigation, route parameters for pair pages, and the scroll/active-link behaviour. |

### Data sources

Two public, keyless, CORS-enabled JSON APIs:

- **open.er-api.com** — current rates for a wide currency list.
- **api.frankfurter.dev** — current rates as a fallback, and the source for every
  historical series (the published ECB reference data).

Both are consumed through one client in `src/lib/fx/client.ts`, so the application
parses one schema rather than two. On the Vercel mirror, `api/rates.ts` acts as a
serverless proxy so the current-rate fetch happens server-side; on GitHub Pages the
browser-side path and its fallback chain are used.

### Deployment

- **GitHub Pages** — primary deployment, published by
  `.github/workflows/deploy.yml` on every push to `main`. The build sets
  `base: '/Final_Project/'` so assets resolve under the repository subpath.
- **Vercel** — mirror deployment from the domain root, and the only host that runs
  the `api/rates.ts` serverless function.

---

## 4. Development process

The Git history is the record. Reading it in order shows a project that moved from a
broad, over-scoped first draft toward a smaller application that does fewer things
correctly.

| Date | Commit | What it shows |
| --- | --- | --- |
| 8 Nov | `feat: complete VectisX platform …` | The initial build — deliberately broad. |
| 9 Nov | `feat: fintech design system + real Supabase password recovery flow` | Design tokens and the first real integration. |
| 9 Nov | `fix: render the sign-in form without a Suspense fallback flash` | First user-facing defect fixed rather than worked around. |
| 10 Nov | `refactor: migrate from Next.js to Vite + react-router` | A significant reversal: the Next.js structure was dropped for the Vite stack the brief asks for. Merging that mid-project was the right call. |
| 10 Nov | `feat: fetch exchange rates from a real REST API` | The brief's API requirement, implemented. |
| 10 Nov | `feat: load real historical rates for charts` | Charts moved from sample data to published series. |
| 10 Nov | `feat: give API calls visible loading, error and retry states` | Error handling treated as a feature, not an afterthought. |
| 10 Nov | `ci: build and deploy to GitHub Pages` | Deployment automated. |
| 10 Nov | `fix: stop the marketing copy promising money transfers` | First honesty correction — the copy claimed a service that did not exist. |
| 10 Nov | `fix: resolve all 13 bugs found in testing` | A titled testing round with a fixed defect count. |
| 10 Nov | `Remove the business pages and the IBAN calculator` | Scope reduction: features that were decoration, not function. |
| 10 Nov | `Remove the developer API pages and the footer Developers column` | Further reduction for the same reason. |
| 11 Nov | `Apply owner review fixes: remove alerts/tools, fix 24h change, CSV and picker` | A self-review round from using the running app: the 24H change defect was conceptual, not cosmetic. |
| 11 Nov | `Remove the false credential, company and payout claims from the site` | Correcting claims that would have misrepresented the project. |
| 11 Nov | `Send path-style deep links to their hash route instead of the homepage` | Deep links made to work rather than silently redirecting. |
| 13 Nov | `Fix the blank page when index.html is opened from disk` | A genuine redirect bug found by testing the artefact a marker would actually open. |
| 13 Nov | `Make the docs and the report match what the code actually does` | The documentation itself was audited against the source and corrected. |
| 13 Nov | `Record that GitHub Pages is now live and serving` | The deployment documented only once verified. |

Two things in this history are worth drawing out.

**The migration to Vite.** The project began on a framework that did not match the
brief. Rather than argue that the first structure was equivalent, the routes and
components were ported to Vite and react-router. That commit touched nearly every
file and is the clearest single decision in the project.

**The repeated removals.** Four commits in two days remove features rather than add
them. Each was a case of the application implying a service it did not provide. The
project is smaller at the end than it was in the middle, and better for it.

---

## 5. AI assistance

One tool was used: **Arena.ai Agent Mode**, across a session spanning 9–13 November
2026. The full transcript of that session is submitted alongside this report as
`chat.json`, including the requests made and the limitations of the export.

It was used for scaffolding a project type I had not configured before, for
diagnosing the rate-API integration, for working through a review list I wrote from
using the running application, and for auditing the submission against the course
brief. It was used for the mechanical and the unfamiliar.

It was not used to choose the topic or the screens, to decide what the application
claims about itself, or to write the reflection. Enabling GitHub Pages had to be done
in the repository settings by the account owner, because the settings API refused
the change. Those splits are recorded in `chat.json` under
`my_own_work_not_delegated`.

The clearest example of AI as a tool rather than an author is the 24-hour change
defect. The symptom was that every currency showed exactly `0.00%`. That is not a
rounding error and it is not a display bug — it is the signature of a comparison
whose two sides are the same value. The cause was that the rate feed publishes once
per business day, so "24 hours ago" resolved to the same publication and the
difference was always zero. Fixing it meant comparing against the previous published
business day, which changed what the feature meant rather than how it looked. The
diagnosis came from using the application and noticing that every single number was
identical.

---

## 6. Implemented features

### 6.1 Converter — `#/converter`

Converts an amount between any two of 64 currencies at the fetched mid-market rate,
and shows the inverse rate alongside so both directions are visible at once. Includes
a searchable currency picker with full keyboard navigation (arrow keys, Home, End,
Enter, Escape) and appropriate ARIA roles, a swap control, and a link to the
dedicated pair page for each combination.

### 6.2 Charts — `#/charts`

An interactive area chart for a selected pair over 1D, 1W, 1M, 3M, 6M, 1Y, 5Y and
10Y, built on Recharts. The custom tooltip prints the date and the rate together, so
the rate appears wherever the date appears. Includes a rate overview (24-hour high and
low, inverse rate), CSV export of the plotted series, and share-link copying.

### 6.3 Live rate tables — `#/rates` and `#/tables`

A sortable table of every supported currency with its current rate and 24-hour change,
and a cross-rate matrix for comparing many pairs at once, with an inverse toggle.
The 24-hour change is computed against the previous published business day.

### 6.4 Historical ledger — `#/historical`

Day-by-day closing rates for a chosen window, with the same rows downloadable as CSV
encoding that Excel reads correctly: UTF-8 with a byte-order mark, CRLF line endings
and quoted fields. This screen exists because a chart answers "what shape", while the
ledger answers "what exactly".

### 6.5 Supporting screens

Business, help, legal, blog, sitemap and authentication screens round the site out.
The sign-in, registration and password-recovery screens use Supabase and stay
disabled with a clear notice when credentials are not configured, so the absence of
credentials never presents itself as a broken page.

### 6.6 Cross-cutting behaviour

- **Loading, ready and error states** are exposed by a single provider
  (`src/lib/fx/RateProvider.tsx`): skeleton placeholders and a fetching badge;
  a banner naming the feed and its update date; a dismissible error notice with a
  Retry button and collapsible technical detail.
- **A four-step fallback chain**: first provider, second provider, 15-minute
  `localStorage` cache, then a clearly labelled bundled snapshot.
- **A named feed, not a vendor.** The interface describes the data, never the
  provider, and no API key is ever present in the client bundle.

---

## 7. Challenges

### 7.1 Two API providers with different payload shapes

The first integration failed in a way that did not say which provider was at fault.
The application had trusted whatever came back, so a malformed or rate-limited
response surfaced as a broken interface rather than an error.

### 7.2 The 24-hour change that was always zero

Described above. The difficulty was that the code looked reasonable: it fetched a
previous rate and compared it. The defect was conceptual — the two values were the
same day's publication.

### 7.3 A blank page from the downloaded file

Opening `index.html` from a downloaded ZIP produced a blank page while the deployed
site worked. This turned out to be two independent faults stacked on each other,
which is why it was hard to diagnose: either one alone produced the same symptom.

### 7.4 The deployment that had never been enabled

The Pages workflow had run three times and failed every time. Its build job passed
every step — install, type-check, link check, build, upload — and the publish job
failed with no useful message. The cause was that the Pages site had never been
created in repository settings, which no amount of code could fix.

### 7.5 Documentation that had drifted from the code

Hand-written figures in the README and the report no longer matched the source. The
README claimed 200+ currencies when the picker ships 64, and 74 links across 39
routes when the checker reports 54 across 27. The report cited 110 automated
assertions from a harness that was never committed, so no reader could reproduce it.

---

## 8. Solutions

| Challenge | Resolution |
| --- | --- |
| Provider payload mismatch | One client in `src/lib/fx/client.ts` that validates the shape before use, applies an `AbortController` timeout (9 s current, 12 s history), throws a typed `FxApiError` carrying a user-safe message plus technical detail, and walks the fallback chain. |
| Always-zero 24-hour change | Compare against the previous *published business day* from the history endpoint instead of the same day's rate. A business-day lookback replaces a fixed 24-hour subtraction. |
| CSV dates as `###` | Emit UTF-8 with BOM, CRLF endings and quoted fields so spreadsheet software parses the date column rather than guessing. |
| Blank page from disk | Two fixes. The redirect in `src/main.tsx` was guarded so it only runs over `http`/`https`, which stops `file://` paths navigating away before React mounts. A separate `build:standalone` target produces a single self-contained HTML file with a classic inline script for genuinely offline viewing. |
| Pages deploy failing | Enabled Pages with source "GitHub Actions" in repository settings; the workflow then published successfully. The site was verified by fetching the live URL rather than trusting the green tick. |
| Documentation drift | Counted every figure from the source, corrected the README and the report, and replaced the unreproducible assertion count with the commands a reader can actually run. |
| Copy overstating the product | Removed the pages and claims that implied regulated activity, and stated the educational purpose on the pages that could be misread. |

---

## 9. Testing and verification

The checks below are the ones a reader can reproduce from the repository. They were
run against commit `ce38dbe`.

| Check | Command | Result |
| --- | --- | --- |
| Type check | `npm run typecheck` | No errors |
| Internal links | `npm run check:links` | 54 links, all resolve to a declared route (27 routes) |
| Production build | `npm run build` | Succeeds; emits `dist/` and a `404.html` fallback |
| Standalone build | `npm run build:standalone` | Single file, 1,038.74 kB (278.51 kB gzip) |
| Clean-install build | `npm ci` from a fresh extract, then build | Succeeds |
| Deployed site | fetch the Pages URL | Home screen renders with live rates; `#/charts` renders its own screen |
| Deploy workflow | GitHub Actions run for `ce38dbe` | Success |

`scripts/check-links.mjs` is the only automated checker committed to the repository.
It compares every internal `href` in the source against the route table and fails if
one points at a missing route, which is what keeps the 28 routes and the navigation
honest as pages are added or removed.

**About the earlier "110 automated checks" figure.** During development a separate
harness rendered the route tree in jsdom with `fetch` stubbed at the boundary, and it
ran a large number of assertions. It was a scratch tool and was never committed, so
this report does not cite its count: a figure nobody can rerun is not evidence. The
table above cites only what can be checked from the repository.

**Declared limitations.**

- The four figures in the accompanying coursework report PDF are component
  re-drawings built from the application's own components, design tokens and real API
  data. They are not pixel captures of a browser session, and the report's appendix
  says so.
- Chart tooltip and pointer interactions were checked by hand, because jsdom cannot
  produce a real hover.
- The rate feed publishes on business days only, so a 90-day window holds roughly 65
  rows. The historical screen states this instead of padding the series.
- Authentication uses the Supabase built-in email sender, which is rate limited —
  adequate for a demonstration, not for many concurrent sign-ups.

---

## 10. Final results

The application is deployed and working at
**https://akhtarabdulmannan-lgtm.github.io/Final_Project/** and mirrored at
`vectisx.vercel.app`. Against the brief's core requirements:

| Requirement | Status |
| --- | --- |
| Built with React, component-based | Met — 65 source files across routes, sections, UI, layout, feedback, data and lib |
| At least three screens with different features | Met — four distinct screens: convert, chart, compare, download |
| Third-party libraries for style and function | Met — Tailwind with a token layer, plus Recharts, lucide-react, react-router, Supabase |
| External REST API via `fetch`/`async`/`await` | Met — two public JSON APIs behind one client, with timeouts, validation, typed errors and a fallback chain |
| Deployed to GitHub Pages | Met — live, verified by fetching the URL |
| Public repository, meaningful history, runnable README | Met — 33 commits by one author, 8–13 November, README documents install, dev, build and deployment |

**What I would improve next.** The largest gap is test coverage that ships with the
repository: the link checker is the only automated check a reader can run, and the
jsdom harness that carried the rest of the verification was never committed. A
committed test suite with a CI job would make the "testing" section of this report
reproducible rather than a description. Second, caching is a `localStorage` key rather
than a real strategy; a small server-side cache in the Vercel function would be
simpler to reason about. Third, the four figures in the coursework report should be
genuine browser captures now that the deployment is live and a headless browser is
practical to use.

**What the project taught me.** The most useful change was not a feature. It was
learning to verify a claim instead of trusting it — to count the currencies rather
than recall the number, to fetch the deployed URL rather than read the workflow's
green tick, and to delete a feature rather than ship one I could not confirm worked.
The second most useful was the migration to Vite: reversing a structural decision
mid-project cost two days and was still clearly the right thing to do.

---

*Supporting file: `chat.json` — the complete AI session transcript, with its export
limitations declared in the file itself.*
