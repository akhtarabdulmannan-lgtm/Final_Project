# VectisX — Bug Test Report

**Application:** VectisX currency converter (Vite + React Router SPA)
**Revision tested:** `arena/5fd107ef-final-project` @ `76e9de8` (working tree clean at test start)
**Date:** 9 November 2026
**Scope:** Functional testing only. No fixes applied to application source.
**Method:** Every result below came from executing the running application. Pages were mounted in a real DOM (jsdom) from a production build of the current source, with the network stubbed at the `fetch` boundary so API success, failure, timeout and *cached* responses could each be exercised. Code was read only to explain a failure after it was observed.

---

## 1. Summary

| Feature area | Result |
|---|---|
| Live conversion (amounts, swap, formatting) | **Pass** (one boundary bug) |
| Live rate fetching / caching / fallback | **Pass** |
| Charts & Historical Rates | **Fail** — chart freezes permanently |
| Rate Alerts | **Fail** |
| IBAN Validator | **Fail** |
| Email/Newsletter subscription | **Fail** |
| Contact form | **Pass** |
| Routing & deep links | **Pass** |
| Authentication (login / register / reset) | **Fail** (UI) / **Not Tested** (real sign-in) |
| Authorisation / permissions (UI + API) | **Fail** |
| Cross-rate Tables | **Pass** (rendered; no interaction available) |

**13 confirmed bugs:** 3 High, 3 Medium, 7 Low.
**Blocked and therefore Not Tested:** real sign-in, real sign-up, password-reset email delivery, and all API-level permission checks. The test sandbox has no network route to `*.supabase.co` (`curl` → HTTP `000`), and no Supabase credentials are present in the environment. What could be established statically is reported in §6.

---

## 2. Bugs

### BUG-1 — Charts freeze permanently after changing range or currency
**Severity: High** (breaks a core feature; the page becomes unrecoverable without a reload)

**Steps to reproduce**
1. Open `/charts` (or `/historical`).
2. Click any range button — `1D`, `1W`, `3M`, `6M`, `1Y`, `5Y`, `10Y` — or change the base/target currency.
3. Wait. Try clicking again.

**Expected:** the skeleton resolves and the new chart renders.
**Actual:** the skeleton stays forever. The range buttons live inside the chart card, so they disappear with it and the user cannot retry — the only escape is a page reload.

**Evidence (measured)**

| Condition | Result |
|---|---|
| Cold load, 60 ms history response | recovers |
| 50 ms / 400 ms response | recovers |
| **Instant response (cached series)** | **stuck after 3 s, 6 s, and a 3 s follow-up click — 8 range buttons → 0** |

A deterministic reproduction seeds the 30-minute `sessionStorage` history cache so the next response resolves immediately; the chart then hangs permanently. The same failure occurs on `/historical` when changing the period (`#hist-horizon`).

**Root cause:** `charts.tsx` and `historical.tsx` keep a parallel `isLoadingChart` / `isLoading` flag, set on interaction and cleared only in `useEffect(..., [history.status])`. When a cached response resolves inside the same React batch, the state never transitions to and from `'loading'`, the effect never fires, and the flag is stranded `true`. The skeleton should be derived directly from `history.status === 'loading'`.

**Verification of the diagnosis:** a 4-check regression suite (`.testing/t8-regression.mjs`) failed 3/4 on the shipped code. With the skeleton derived from `history.status`, it passed 4/4, all eight ranges then requested the correct windows (1, 7, 30, 90, 180, 365, 1825, 3650 days), and a failed request showed an error instead of a stuck skeleton. The validated patch is preserved at `.testing/BUG-4-chart-freeze.patch`; **it is not applied to the source**, per the testing-only scope.

---

### BUG-2 — IBAN validator accepts every input
**Severity: High** (a financial-format tool that reports invalid data as valid)

**Steps to reproduce**
1. Open `/tools/iban`.
2. Enter `DE90 3704 0044 0532 0130 00` (the real German IBAN `DE89…` with corrupted check digits).
3. Click Validate.

**Expected:** rejected — the MOD-97 checksum fails.
**Actual:** **"Validated / Valid IBAN Structure"**, with Issuing Country *Germany*, Check Digits *90*, Bank Identifier Code *3704*, Account Number (BBAN) *32013000*.

**Also accepted (all wrong):** `DE89 3704 0044 0532 0130 01`, `FR14 2004 1010 0505 0001 3M20 606`, `GB29NWBK6016133192` (18 characters — GB requires 22), `ZZ29NWBK60161331926819` (unknown country code), and `!!!!!!!!!!!!!!!!!!!!!!!!`, which renders **"Valid IBAN"** with *Issuing Country: !! (ISO Country Code)* and BIC `!!!!`.

**Cause:** `handleValidate` checks only `length >= 15 && length <= 34`, then sets `isValid: true` unconditionally — no MOD-97, no character-set check, no per-country length. The panel nonetheless asserts "Valid IBAN checksum and structure format."

Genuine IBANs (`DE89…`, `FR14…`, `NL91…`) pass correctly, so only the reject path is broken — but that is the path that matters.

---

### BUG-3 — Rate Alerts and newsletter report success without saving anything
**Severity: High** (false confirmation; the user's data is silently discarded)

**Steps to reproduce**
1. Open `/alerts`. Enter `test@example.com` and a target rate of `1.05`. Submit.
2. Expect **"Rate Alert Activated"**. Reload the page.
3. Separately: on any page, use the footer newsletter with `sub@example.com`.

**Expected:** the alert / subscription is persisted and still present after refresh.
**Actual:** `localStorage` contains only `vx:rates:v1` (the rate cache). No alert survives a reload; the newsletter email is not stored anywhere. Both handlers are `await wait(350)` followed by an unconditional success state. This is a genuine data-loss bug, not a test artefact: there is no storage or network write to observe.

---

### BUG-4 — Rate Alerts accept impossible target rates
**Severity: Medium** (invalid data accepted)

The target-rate field has no `min`/`max`. Submitting `0`, `-1` or `1e9` all produce "Rate Alert Activated".

**Expected:** a target rate must be a positive, plausible number (and `1e9` for USD→EUR is meaningless).
**Actual:** all three accepted.

---

### BUG-5 — Negative amounts convert silently
**Severity: Medium** (wrong-looking result presented as valid)

`/converter`, amount `-50`, submit → displays **`-46.00 EUR`** with no validation message. The input is `type="number"` with no `min`.

---

### BUG-6 — No signed-in state and no logout anywhere
**Severity: Medium** (users cannot see who they are, cannot sign out, and the header contradicts a successful login)

**Steps to reproduce**
1. Store a valid-shaped Supabase session under `sb-fbstwoqqhlaafarwcqiu-auth-token` (as a real login would).
2. Load any page.

**Expected:** the header reflects the signed-in user and offers Log out.
**Actual:** the header shows "Log in / Register" on every page, for every visitor. The session is written by Supabase but **never read** — outside `reset-password.tsx`, no `getSession`, `onAuthStateChange` or `signOut` call exists in the codebase. A user who signs in successfully is returned to a page that still presents them as anonymous, with no way to sign out.

---

### BUG-7 — "Copied Link" is shown even when nothing was copied
**Severity: Low**

`handleShare` uses `navigator.clipboard?.writeText(...)`, so on a non-secure origin or a browser without the Clipboard API the call is skipped — yet the button still flashes "Copied Link". With a working clipboard it behaves correctly (the URL is copied and confirmed for ~800 ms).

---

### BUG-8 — No route guards; no privileged data or actions to guard
**Severity: Low** (no data is exposed — see §6 — but the interface implies protection that does not exist)

`/business/team` renders identically for anonymous and signed-in visitors (2 515 characters of text either way). None of the 40 routes is gated. This is consistent with the app holding no user data at all; it is a design gap, not a leak.

---

### BUG-9 — Currency picker has no empty state
**Severity: Low**

Searching the converter's currency picker for `zzzz` yields a blank panel with no "no results" message.

---

### BUG-10 — Login/register are inert in the deployed configuration
**Severity: Low** (honest, but the form looks functional)

With Supabase unconfigured, submitting login or registration shows "Authentication is not configured for this environment. Please contact support." It is a correct, explicit message — but the form still invites input, so the behaviour is worth recording.

---

### BUG-11 — Unsupported-pair chart copy is vague
**Severity: Low**

The chart explains that the provider has no series for the pair, but does not name the pair or suggest an alternative.

---

### BUG-12 — No recovery from a failed chart request beyond Retry
**Severity: Low**

A failed history request does show an error notice with Retry (verified) — but because of BUG-1's coupling, once the range controls are gone the failure is only reachable by reload.

---

### BUG-13 — Newsletter/footer "Subscribe" has no consent or frequency copy
**Severity: Low**

The footer collects an email with no confirmation of what is sent or how often. Noted for completeness; arguably out of scope for a functional test.

---

## 3. Passed (executed and verified)

| Test | Evidence |
|---|---|
| 100 USD → EUR | `92.00 EUR` at rate 0.92 |
| Inverse rate consistency | `1.0870` = 1 / 0.92 |
| Swap currencies | `1 EUR = 1.0870 USD`; 920.00 → 1 086.96 |
| Empty amount | renders `0.00`, no `NaN` |
| `1e21` amount | renders, no `NaN`/`Infinity` |
| Total API failure | "Offline rates" banner + `role="alert"` with the reason |
| Malformed 200 payload | rejected, falls back to the second provider |
| Provider fallback | primary attempted, frankfurter attempted and used |
| 9 s timeout | aborts, then falls back, then reports offline at ~18 s |
| Stale cache | a 10-day-old entry is ignored (15-min TTL honoured) |
| Triple submit (alerts) | exactly one success panel |
| Invalid email | blocked on `/alerts` and `/tools/email-updates` by native `type=email` + `required` |
| Short password | rejected: "Password must be at least 8 characters long." |
| Empty contact form | blocked; all three fields `required` |
| Filled contact form | confirms |
| Deep link `/converter/usd-to-eur` | resolves to US Dollar → Euro |
| Malformed pair `/converter/usdeur`, `/converter/foo-to-bar` | no crash, no `NaN`, graceful defaults |
| Unknown path | 404 screen |
| Removed pages (`/send`, `/send/fees`, `/send/track`, `/business/payments`, `/business/batch`, `/business/scheduled`) | all 404 — the Send Money / Billing removal is clean |
| Charts CSV export | `date,rate` header + 20 rows |
| Chart range windows | all 8 request the correct span (1 … 3 650 days) |
| Cross-rate tables | matrix renders, 10×10 values consistent (`1 USD = 1.0870 EUR`) |
| Reset-password without a session | explains the link is invalid and offers "Request a new" |
| No secrets in the production bundle | no `service_role` key, no JWT literal |
| No privileged endpoint called from the client | only `open.er-api.com` (public rates) |

---

## 4. Not Tested (blocked)

| Item | Why |
|---|---|
| Real sign-in with a test account | No network route to `*.supabase.co` (HTTP `000`), no credentials in the sandbox |
| Real sign-up / email confirmation | Same |
| Password-reset email delivery and token exchange | Same — the screen cannot leave its "invalid link" state without a recovery session |
| API-level permission checks (`/rest/v1/…` with the anon key) | Same, and see §6: there is no data-bearing table to test against |
| Cross-rate table interaction | The page exposes no control to change the base currency (only Print Table / Subscribe), so only the rendered values could be verified |
| Saved-data-after-refresh for alerts/subscriptions | Could not pass — the write never happens (BUG-3) |

---

## 5. Coverage

40 routes plus the `*` fallback. Tested by execution: `/`, `/converter`, `/converter/:pair`, `/charts`, `/historical`, `/tables`, `/alerts`, `/tools/iban`, `/tools/email-updates`, `/contact`, `/rates`, `/login`, `/register`, `/reset-password`, `/business/team`, 6 removed routes, and an unknown path. The remaining marketing/content pages (`/about`, `/blog`, `/careers`, `/press`, `/help`, `/api-platform/*`, `/legal/*`, `/apps`, `/partners`, `/referral`, `/sitemap-page`) are static — they were loaded and rendered without error but carry no interactive logic to test.

Input classes exercised: normal values; empty; zero; negative; `1e21`; `1e9`; non-numeric text; malformed email; short password; 14- and 35-character IBAN-like strings; unknown country codes; nonsense search; repeated submission; total/failed/timeout/cached API responses; reload after submit.

---

## 6. API-level permission findings (partly static)

Direct API testing was impossible from the sandbox, but the code establishes the shape of the problem:

- **The application contains no data tables.** There is no `.from(...)`, `.rpc(...)` or `.storage` call anywhere in `src`. The only Supabase surface used is **Auth** (`signInWithPassword`, `signUp`, `resetPasswordForEmail`, `verifyOtp`, `exchangeCodeForSession`, `updateUser`, `signOut`). There is therefore no application data behind the API that Row Level Security could expose — nothing to read, write, or escalate.
- **No privileged credentials are shipped.** The production bundle contains no `service_role` key and no JWT literal; the deploy workflow injects `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` from secrets, and both are public-by-design anon values.
- **The only write paths are simulated.** Alerts, newsletter, contact and partner forms never leave the browser (BUG-3). So there is no unauthenticated write to test and no "restricted action" reachable via the API.
- **Consequence for the brief's "test accounts and disposable data" requirement:** no disposable data can be created, because no feature persists anything. This should be stated plainly in the submission rather than implied as tested.

**Recommended follow-up (outside this report's scope):** once credentials are available, re-run sign-in/sign-up/reset in a real browser against `fbstwoqqhlaafarwcqiu.supabase.co`, and confirm RLS is enabled on the auth-only project.

---

## 7. Verdict

The conversion engine, rate fetching, caching, fallback and timeout handling are solid, and the routing and removal work is clean. The failures cluster in one place: **features that present a result without doing the work** — the IBAN validator, Rate Alerts, the newsletter, and the session-aware header. The chart freeze (BUG-1) is the most damaging, because it is reachable by an ordinary user in normal use and leaves a core page permanently broken.

Priority for repair: **BUG-1**, **BUG-2**, **BUG-3**, then BUG-6, BUG-5, BUG-4, and the cosmetic items.

---

### Reproducing this report

The harness lives in the untracked `.testing/` directory:

```
node .testing/t1-converter.mjs   # conversion maths and formatting
node .testing/t1b.mjs            # swap + negative amount
node .testing/t2d.mjs            # forms with browser validation intact
node .testing/t3-iban.mjs        # IBAN accept/reject matrix
node .testing/t4-data.mjs        # chart data, unsupported pairs, route access
node .testing/t5-auth.mjs        # session visibility, unconfigured-env messages
node .testing/t6-edge.mjs        # routes, boundaries, removed pages
node .testing/t7-api.mjs         # provider choice, fallback, loading state
node .testing/t8-regression.mjs  # chart-freeze regression suite (fails on current source)
node .testing/t10b.mjs           # share / newsletter persistence
```

`t8-regression.mjs` currently reports **1/4 passing**; that is the expected result for the shipped code and is the measure of BUG-1.
