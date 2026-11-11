# VectisX — Fix Round 2 Test Report

**Date:** 9 November 2026
**Branch:** `arena/c0712867-final-project` (based on `23605b2`, the revision currently live)
**Scope:** the 14 items from the owner's review, plus the regressions those changes could cause.
**Result:** **110 of 110 executable checks pass.** Three real defects were found and fixed
during this round — including one in the 24h-change fix itself, which would have shipped
looking correct while still reporting `0.00%`.

---

## 1. What the owner asked for

| # | Request | Outcome |
| --- | --- | --- |
| 1 | Rate Action Alert: keep only if working, otherwise remove | **Removed entirely** — page, route, nav entry, widget tab, CTA, copy, types, data layer |
| 2 | Down arrow must move the picker selection | **Fixed** — full keyboard navigation added |
| 3 | "No API exists" → use a key from env, deploy to Vercel | **`api/rates.ts` serverless proxy** + optional `FX_API_KEY` / `FX_API_URL` / `FX_API_KEY_PARAM` |
| 4 | On the chart, wherever the date shows, the rate shows too | **Fixed** — custom tooltip prints the date and the rate together |
| 5 | "24H change" reads `0.00%` for everything | **Fixed** — now compares against the previous *published* day |
| 6 | CSV dates show `###`; 90 days returns 65 rows | **Both explained and fixed** — see §5 and §6 |
| 7 | Is exposing the API acceptable, or should it be hidden? | **Hidden** — UI names no provider; keys never reach the bundle |
| 8 | Contact info belongs to a different site | **Rewritten** around `akhtarabdulmannan@gmail.com` |
| 9 | Google login + verification email should arrive | Google **skipped** as agreed; verification **switched on and tested** |
| 10 | Remove "Daily Market Email Updates" | **Removed** |
| 11 | Remove "Daily currency Market Analysis" page | **Removed** |
| 12 | Remove footer social links | **Removed** |
| 13 | Remove footer email subscribe | **Removed** |
| 14 | Contact email is `akhtarabdulmannan@gmail.com` | **Applied** everywhere, including press and security pages |
| 15 | *(added)* False credential and company claims | **Removed from 8 pages** — see §14 |

---

## 2. How this was verified

The previous round's harness was deleted, so it was rebuilt against the current source:

- `src/` is bundled with Vite into a single IIFE (`.testing/vite.config.ts`), with
  `@supabase/supabase-js` aliased to a controllable double (`.testing/supabase-mock.ts`).
- The bundle is executed in **jsdom**, and each page is mounted on the real route table
  through `HashRouter`, i.e. the same component tree the browser runs.
- `fetch` is stubbed at the boundary to answer `/api/rates`, the direct provider, and the
  Frankfurter date-range endpoint, and to fail on demand.

Every result below is an assertion on rendered DOM or on a captured network/`FileReader`
payload — **not** a reading of the source. Where a claim could only be checked in code
(the Recharts tooltip, which needs a real hover), it is stated in §7 instead of being
counted as a pass.

Reproduce with:

```bash
npx vite build --config .testing/vite.config.ts   # build the harness bundle
node .testing/run.mjs                             # 110 checks, exit 0
```

---

## 3. Defects found during this round

### 3.1 — The 24h change was still `0.00%` (in my own fix) — **FIXED**

The first version of the fix fetched a 10-day Frankfurter window and used
`days[days.length - 1]` — the **newest** published day. The live feed was already showing
that same day, so the comparison was still today-versus-today. Every row rendered a
confident `▲+0.00%`, and because a chip *was* present, the interface looked correct.

The test caught it by checking the arithmetic rather than the presence of a number:
`▲+0.00%` where `-1.19%` was expected.

The fix returns **both** of the provider's newest publications
(`fetchReferenceDays()`) and picks the baseline by date:

```ts
const baseline =
  formatDisplayDate(reference.latest.date) === fresh.date
    ? reference.previous
    : reference.latest;
```

Now verified two ways: the value matches `rate ÷ previous − 1` to the displayed precision,
and the five visible rows carry five *different* percentages (a self-comparison can only
ever produce one value — that is what made the original bug so uniform).

### 3.2 — Resend-confirmation failures were shown as raw provider text — **FIXED**

Supabase's rate-limit message is "For security purposes, you can only request this after
60 seconds." My guard matched `/rate limit|too many/`, so it never fired and the user saw
the provider's sentence. Extended to match `only request this after`; the same wording
problem was found in the forgotten-password handler and fixed there too.

### 3.3 — The picker's highlight existed but the tests could not see it — **test defect**

`aria-activedescendant` was correct; my assertion compared emoji-prefixed option text with
`startsWith('USD')`. Fixed the assertion (compare the option `id`). Not a product bug —
recorded because a false failure is as costly as a false pass.

---

## 4. Removal checks (17/17)

| Check | Result |
| --- | --- |
| No `#/alerts` link anywhere; no "rate alert" text on the homepage | Pass |
| Converter widget tabs are only **Convert / Charts** | Pass |
| No "Set rate alert" CTA on any of the seven former call sites | Pass |
| 404 page no longer advertises alerts | Pass |
| `/tools` has no "Daily Market Email Updates"; `/tools/email-updates` now falls through to **Page Not Found** | Pass |
| `/tools` still lists Converter, Cross-Rate Matrix, Historical Archives, Charts | Pass |
| `/charts` CTAs replaced with working destinations (converter / historical) | Pass |
| `/help` category renamed "Historical Data & Exports" | Pass |
| Sitemap page and `sitemap` route data free of both removed pages | Pass |
| Footer: no social icons, no email input, no subscribe copy; Product/Company/Legal and popular-pair links intact | Pass |
| `subscribeToNewsletter` / `NewsletterInput` deleted; no references remain | Pass |

**"Keep only what works" is satisfied by deleting, not hiding:** the routes were removed
from the table, so a stale bookmark lands on the 404 page rather than a page that pretends
to save an alert.

---

## 5. CSV export (8/8)

The `###` was **never in the data** — it is Excel's rendering of a column too narrow for
its contents, and the old export made it worse by writing unquoted, ambiguous cells. The
export now writes:

```
"Date","1 USD in EUR","100 USD in EUR","1 EUR in USD"
"2026-08-13",0.897503,"89.7503","1.1142"
```

| Check | Result |
| --- | --- |
| UTF-8 BOM present (`ef bb bf`) so Excel decodes UTF-8 | Pass |
| Header names the date column and every rate column | Pass |
| 65 rows, each with a real `YYYY-MM-DD` date | Pass |
| No `###` in the file | Pass |
| Date cells quoted so Excel cannot coerce them to a serial number | Pass |
| Rate column numeric and non-empty (0.897503 … 1.1263) | Pass |
| CRLF line endings | Pass |

Opening it still requires widening column A once in Excel, but the value is always there
and correct — that is now guaranteed by the file rather than by luck.

## 6. The 65-row question

**65 is correct, not truncated.** The reference feed publishes on TARGET business days
only, roughly 261 days a year — about 65 in any 90-calendar-day window. The page now says
so under the table heading, and states how many rows it is showing of how many exist
("15 most recent of 65 published rates"), so the count is no longer ambiguous.

---

## 7. Chart date + rate (request 4)

`RateTooltip` renders two lines — `Date: 11 Nov 2026` and `1 USD = 0.8939 EUR` — and the
axis keeps full dates for 1Y/5Y/10Y ranges. The data table under the chart was verified by
execution to carry the date and rate side by side on each row
(`2026-11-11 · 0.976168 · 97.6168 EUR · 1.0244 USD`).

> Honest limitation: the tooltip itself needs a real pointer hover to appear, which jsdom
> cannot produce. It is verified by reading the component and by the table immediately
> beneath it; it is **not** verified by a simulated hover.

---

## 8. Keyboard navigation in the currency picker (8/8)

| Check | Result |
| --- | --- |
| First option highlighted on open | Pass (`USD`) |
| ↓ moves to the next option | Pass (`EUR`) |
| `aria-activedescendant` tracks the highlight | Pass |
| ↑ moves back | Pass |
| End jumps to the last option (no scrolling by keyboard wasn't available before) | Pass (`ETH`) |
| ↓ at the end wraps to the first option | Pass |
| Typing filters, then ↓ moves within the filtered list | Pass |
| Enter selects the highlighted currency and closes the picker | Pass |

The list also scrolls the active option into view via `data-picker-index`, and hovering
with the mouse re-synchronises the active index so the two input methods never disagree.

---

## 9. API key, proxy and provider hiding (requests 3 and 7)

| Check | Result |
| --- | --- |
| First network call is same-origin `/api/rates` | Pass |
| Conversion correct through the proxy (100 USD → 89.39 EUR) | Pass |
| Falls back to the direct provider when the proxy is absent | Pass |
| Conversion correct on the fallback path | Pass |
| No `open.er-api.com` / `Frankfurter` string anywhere in the rendered HTML (home, converter, help, banner) | Pass |

**Answer to "is exposing the API okay?"** — it was, in the narrow sense that both endpoints
are public and keyless, so nothing secret was ever shipped. But it is better not to name
them, and better still not to depend on the browser being able to reach them. The new
`api/rates.ts` function:

- returns one normalised shape, so the client parses a single schema;
- reads `FX_API_KEY` **server-side only** — the variable is not `VITE_`-prefixed, so Vite
  cannot inline it into the bundle even by accident;
- caches for 60s with `stale-while-revalidate=300`, which keeps well inside free tiers;
- falls back to the direct public endpoint, so the site keeps working if functions are
  ever unavailable.

The key is optional: with no variables set, the function uses the keyless public endpoint
and behaviour is identical to today. Adding a key later needs no code change.

---

## 10. Contact and legacy-site copy (requests 8 and 14)

| Check | Result |
| --- | --- |
| Contact page shows `akhtarabdulmannan@gmail.com` | Pass |
| No `555-…` phone numbers | Pass |
| No `@vectisx.com` address anywhere in `src/` | Pass |
| No Wall Street / New York HQ address | Pass |
| No "24 hours a day" support claim | Pass |
| No transfer/KYC/hedging pitch | Pass |
| Contact form still present (`#contact-name`, "Send a Message") | Pass |
| Press and security pages use the same real address | Pass |

---

## 11. Email verification (request 9)

Google sign-in was skipped as agreed. Verification is now **on** in the Supabase project
(`mailer_autoconfirm: false`, confirmed by reading the project's auth configuration back).

| Check | Result |
| --- | --- |
| Signup with confirmation required shows "Check your inbox", not "Account Ready" | Pass |
| Copy states the account is unusable until the link is followed | Pass |
| Resend control offered | Pass |
| Resend success reported honestly | Pass |
| Resend rate-limit failure reported in plain language | Pass |
| Signing in before confirming explains what to do | Pass |
| No Google button rendered | Pass |

> **This changes sign-in behaviour for existing users.** The project previously had
> autoconfirm *on*, so the three existing accounts were created without confirming. They
> will now be asked to confirm before their next sign-in. That is the correct state for a
> demo, but it is a visible change, so it is flagged here rather than buried.

---

## 12. Route table (25/25)

Every route mounts with a real heading and none links to a removed page: `/`,
`/converter`, `/converter/usd-to-eur`, `/rates`, `/charts`, `/historical`, `/tables`,
`/tools`, `/about`, `/careers`, `/press`, `/security`, `/blog`, `/contact`, `/help`,
`/partners`, `/referral`, `/login`, `/register`, `/forgot-password`, `/reset-password`,
`/terms`, `/privacy`, `/cookies`, `/licenses`, `/sitemap-page`.

---

## 14. False claims removed from the marketing pages (round 2, item 15)

A live read of the deployed site after the first deploy of this round showed claims that
were simply untrue. They were raised with the owner, who chose to fix all of them.

| Page | Removed | Replaced with |
| --- | --- | --- |
| Home | "FinCEN Registered & SOC 2 Certified", "4.8/5 Rating (500k+ reviews)", "Updated directly from interbank liquidity providers" | "No account or payment details required", "Live rates from public data feeds", an accurate matrix caption |
| Footer | "A subsidiary of Meridian Financial Corp. FinCEN-registered. US state-licensed money transmitter." and a trailing "SOC 2 Type II certified." | "© 2026 VectisX. All rights reserved." plus an explicit statement that no financial licences or security certifications are held |
| About | 1993 founding story, $120B parent company, four invented executives, five invented milestones, SOC 2 badge | What the project is, what it is not (0 licences, 0 payments handled), three descriptions of how it actually works, the real stack |
| Licenses | Eight fabricated regulator licence numbers (FinCEN, five US states, FCA, FINTRAC) | A statement that no financial licences are held, why none are required, and what that means for the reader |
| Security | SOC 2 audit, segregated Tier-1 client funds, AES-256 custody, ML fraud and sanctions screening | The five controls that do exist (RLS on all seven tables, email-only data, provider-handled passwords, keys kept server-side, failures surfaced) plus a list of what is *not* claimed |
| Referral | $50/$50 cash reward, "$1,000+ transfer" condition, fake referral code and a link generator that copied a dead domain | Sharing a real pair page, with four working examples |
| Press | Three dated releases about a fictional parent company; a "Download Media Kit (.zip)" button that ran a timer and produced no file | Links to the documentation that exists, and an explicit note that there is no media kit |
| Careers | Five full-time vacancies, 401(k) matching, family health cover | An outline of the build, aimed at a reader or marker |
| Partners | CPA commissions, reseller programmes, "remittance rails" | Reusing the endpoint, forking the repo, citing the write-up |
| Blog | Five fabricated author bylines; one shared stock article body printed under every title; an unknown slug silently rendered article #1 | The author's real address as the byline, a scope note per note, and a genuine not-found page for unknown slugs |
| Privacy / Terms | "VectisX Financial Inc." compliance language, AES-256/TLS 1.3 claims, statutory banking retention | Plain description of the data actually held and how to have it deleted |

The check suite now loads all 21 content pages and asserts 12 forbidden claim patterns
(FInCEN, SOC 2, money transmitter, NASDAQ, Meridian, AES-256/custody, fraud monitoring,
cash payouts, bank-grade, founding date, volume figures, licence numbers) do not appear —
except where a page explicitly denies the claim, which `/security` and `/licenses` do.

## 13. Known limitations of this round

1. **No live end-to-end test.** Sandbox egress is blocked, so the deployed site, the
   serverless function and the real Supabase mailer were not exercised from here. The
   proxy's shape is verified against stubs; a first deploy should be smoke-tested by hand
   (signup → mail arrives → confirm → sign in).
2. **Tooltip** — see §7.
3. **Supabase project settings outside this repo:** `password_min_length` is 6 while the
   app enforces 8 (harmless, the stricter rule wins), and the built-in email sender is
   limited to a couple of messages per hour. The default mailer is fine for a demo but
   realistically only a handful of signups will receive mail per hour.
4. **`rate_alerts` and `newsletter_subscriptions` tables still exist** in Postgres with
   RLS. Nothing in the app writes to them. They are left in place deliberately: dropping
   tables is destructive and was not requested.
5. **Blog notes are summaries, not articles.** Each carries an excerpt and a scope note
   and links to the page where the idea is demonstrated. They were not padded into fake
   long-form content, and the previous shared stock article was removed rather than
   rewritten per post.
6. **"VectisX" remains as a product name.** It is clearly stated on the about, licensing
   and footer text that it is a coursework project and not a company; renaming the brand
   was not part of the request.
