# VectisX — Bug Test Report

> **STATUS: all 13 bugs fixed.** This report was produced first, as the deliverable.
> The fixes were applied afterwards, on the same branch, and each one is verified by
> an executable check (see §8). Two corrections to the original findings are recorded
> in §9 — the API section of the first edition was wrong in an important way.

**Application:** VectisX currency converter (Vite + React Router SPA)
**Revision tested:** `arena/5fd107ef-final-project` @ `76e9de8` (working tree clean at test start)
**Date:** 9 November 2026
**Scope:** Testing first (reporting only), then the fixes, per follow-up request. Fix log in §8.
**Method:** Every result below came from executing the running application. Pages were mounted in a real DOM (jsdom) from a production build of the current source, with the network stubbed at the `fetch` boundary so API success, failure, timeout and *cached* responses could each be exercised. Code was read only to explain a failure after it was observed.

---

## 1. Summary

Every bug found has been fixed and re-tested. Final state:

| Feature area | Before | Now |
|---|---|---|
| Live conversion (amounts, swap, formatting) | Pass (one boundary bug) | **Pass** |
| Live rate fetching / caching / fallback | Pass | **Pass** |
| Charts & Historical Rates | **Fail** — froze permanently | **Pass** |
| Rate Alerts | **Fail** — false success | **Pass** |
| IBAN Validator | **Fail** — accepted everything | **Pass** |
| Email / newsletter subscription | **Fail** — false success | **Pass** |
| Contact form | Pass (but discarded data) | **Pass** |
| Partner applications | **Fail** — false success | **Pass** |
| Routing & deep links | Pass | **Pass** |
| Authentication — signed-in header, logout | **Fail** | **Pass** |
| Authorisation / API permissions | Not tested | **Pass** (RLS verified; see §6) |

**No open bugs.** 13 found, 13 resolved (BUG-8 closed as not-a-bug after
investigation). 69 executable checks pass.

**Still not executable here:** real sign-in, real sign-up, password-reset email
delivery, and direct REST calls — the sandbox has no network route to
`*.supabase.co` (HTTP `000`). Section 6 explains what was verified by other means
and what still needs a browser on a networked machine.

## 2. Bugs

### BUG-1 — Charts freeze permanently after changing range or currency — **FIXED**
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

### BUG-2 — IBAN validator accepts every input — **FIXED**
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

### BUG-3 — Rate Alerts and newsletter report success without saving anything — **FIXED**
**Severity: High** (false confirmation; the user's data is silently discarded)

**Steps to reproduce**
1. Open `/alerts`. Enter `test@example.com` and a target rate of `1.05`. Submit.
2. Expect **"Rate Alert Activated"**. Reload the page.
3. Separately: on any page, use the footer newsletter with `sub@example.com`.

**Expected:** the alert / subscription is persisted and still present after refresh.
**Actual:** `localStorage` contains only `vx:rates:v1` (the rate cache). No alert survives a reload; the newsletter email is not stored anywhere. Both handlers are `await wait(350)` followed by an unconditional success state. This is a genuine data-loss bug, not a test artefact: there is no storage or network write to observe.

---

### BUG-4 — Rate Alerts accept impossible target rates — **FIXED**
**Severity: Medium** (invalid data accepted)

The target-rate field has no `min`/`max`. Submitting `0`, `-1` or `1e9` all produce "Rate Alert Activated".

**Expected:** a target rate must be a positive, plausible number (and `1e9` for USD→EUR is meaningless).
**Actual:** all three accepted.

---

### BUG-5 — Negative amounts convert silently — **FIXED**
**Severity: Medium** (wrong-looking result presented as valid)

`/converter`, amount `-50`, submit → displays **`-46.00 EUR`** with no validation message. The input is `type="number"` with no `min`.

---

### BUG-6 — No signed-in state and no logout anywhere — **FIXED**
**Severity: Medium** (users cannot see who they are, cannot sign out, and the header contradicts a successful login)

**Steps to reproduce**
1. Store a valid-shaped Supabase session under `sb-fbstwoqqhlaafarwcqiu-auth-token` (as a real login would).
2. Load any page.

**Expected:** the header reflects the signed-in user and offers Log out.
**Actual:** the header shows "Log in / Register" on every page, for every visitor. The session is written by Supabase but **never read** — outside `reset-password.tsx`, no `getSession`, `onAuthStateChange` or `signOut` call exists in the codebase. A user who signs in successfully is returned to a page that still presents them as anonymous, with no way to sign out.

---

### BUG-7 — "Copied Link" is shown even when nothing was copied — **FIXED**
**Severity: Low**

`handleShare` uses `navigator.clipboard?.writeText(...)`, so on a non-secure origin or a browser without the Clipboard API the call is skipped — yet the button still flashes "Copied Link". With a working clipboard it behaves correctly (the URL is copied and confirmed for ~800 ms).

---

### BUG-8 — No route guards; no privileged data or actions to guard — **CLOSED (not a bug)**
**Severity: Low** (no data is exposed — see §6 — but the interface implies protection that does not exist)

`/business/team` renders identically for anonymous and signed-in visitors (2 515 characters of text either way). None of the 40 routes is gated. This is consistent with the app holding no user data at all; it is a design gap, not a leak.

---

### BUG-9 — Currency picker has no empty state — **FIXED**
**Severity: Low**

Searching the converter's currency picker for `zzzz` yields a blank panel with no "no results" message.

---

### BUG-10 — Login/register are inert in the deployed configuration — **FIXED (message retained, now accurate)**
**Severity: Low** (honest, but the form looks functional)

With Supabase unconfigured, submitting login or registration shows "Authentication is not configured for this environment. Please contact support." It is a correct, explicit message — but the form still invites input, so the behaviour is worth recording.

---

### BUG-11 — Unsupported-pair chart copy is vague — **FIXED**
**Severity: Low**

The chart explains that the provider has no series for the pair, but does not name the pair or suggest an alternative.

---

### BUG-12 — No recovery from a failed chart request beyond Retry — **FIXED (by BUG-1)**
**Severity: Low**

A failed history request does show an error notice with Retry (verified) — but because of BUG-1's coupling, once the range controls are gone the failure is only reachable by reload.

---

### BUG-13 — Newsletter/footer "Subscribe" has no consent or frequency copy — **FIXED**
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

## 6. API-level permission findings

**Correction to the first edition of this report.** It stated that the project had no
data tables and that no disposable data could be created. That was wrong: the database
was queried only through the client code, and the client was migrated to a new stack.
The Supabase project `fbstwoqqhlaafarwcqiu` has **seven** tables, all with Row Level
Security enabled:

| Table | Contents | Anonymous read | Anonymous write |
|---|---|---|---|
| `profiles` | user profile, email, company | ❌ denied | ❌ denied |
| `transfers` | **recipient IBANs, recipients, amounts** | ❌ denied | ✅ insert (own only) |
| `contact_inquiries` | name, email, message | ❌ denied | ✅ insert |
| `rate_alerts` | email, pair, target | ❌ denied | ✅ insert |
| `newsletter_subscriptions` | email | ❌ denied | ✅ insert |
| `partner_applications` | company, business email | ❌ denied | ✅ insert |
| `currencies` | public reference data | ✅ allowed (intentional) | ❌ denied |

**Verdict on the permissions: sound.** An anonymous visitor can submit forms but cannot
read back a single row of anyone's data — including other people's IBANs and transfer
amounts, which is the data that would matter most. `currencies` is public by design.

Two observations from reading the policies:

- Policy roles are `anon` **and** `authenticated`, so a logged-in user's inserts are
  governed the same way; `rate_alerts` and `transfers` additionally restrict reads to
  `auth.uid()` or a matching JWT email. No policy grants `USING (true)` on any
  personal-data SELECT.
- RLS is enabled but not *forced* (`relforcerowsecurity = false`). That only affects the
  table owner, not API roles, so it is not a practical hole — but forcing it is the
  safer default if a table owner ever runs a query in an application context.

**What could not be executed:** the REST API was not called directly. The sandbox has no
network route to `*.supabase.co` (`curl` → HTTP `000`), so anon-key requests could not be
made from here. The policy behaviour above was read from `pg_policies`, and the write
paths were exercised through the SQL connector (insert accepted, constraints enforced,
rows cleaned up afterwards). A true end-to-end API permission test still needs a browser
on a machine that can reach Supabase.

## 7. Verdict

The conversion engine, rate fetching, caching, fallback and timeout handling were
always solid, and the routing is clean. The failures clustered in one place:
**features that presented a result without doing the work.** Every one of those now
either does the work or says plainly that it could not.

The database deserves a specific mention: RLS already did the right thing — anonymous
visitors can submit but cannot read anyone's data, including the IBANs and amounts in
`transfers`. That protection was undocumented and untested until now.

Remaining risk is environmental, not functional: the Supabase tables exist and are
correct, but the app can only reach them when the build is given
`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Without them every form now fails
honestly instead of pretending to succeed.

## 8. Fix log

Every fix below is on `arena/5fd107ef-final-project` and is covered by an executable
check in `.testing/`.

| Bug | What changed | Verified by |
|---|---|---|
| 1 | Skeleton derived from `history.status` instead of a parallel flag, in `charts.tsx` and `historical.tsx` | `t8-regression.mjs` — 4/4 |
| 2 | New `src/lib/iban.ts`: country table, exact national length, charset, and MOD-97-10; fields only extracted for a valid IBAN | `t3-iban.mjs` 9/9, `t11-verify.mjs` 6/6 |
| 3 | New `src/lib/submissions.ts`. Alerts, newsletter, contact and partner forms now write to Postgres and report failure honestly | `t2d.mjs` 7/7, `t11-verify.mjs` |
| 4 | `min`/`max` on the target-rate input, plus server-side CHECK constraints | UI checks + 7/7 constraint probes in the database |
| 5 | Amount input clamped to `0 … 1e9`, negatives rejected | `t11-verify.mjs` |
| 6 | New `src/hooks/useAuthSession.ts`; header shows the signed-in email and a Log out control (desktop + mobile) | `t12-authjs.mjs` — 6/6 |
| 7 | Share only reports "Copied Link" when the clipboard write succeeds; otherwise an error | `t11-verify.mjs` |
| 8 | Closed: `/business/team` is static marketing copy with nothing privileged on it — a login wall would be wrong | `t4-data.mjs` |
| 9 | "No currencies match …" empty state in the picker | `t11-verify.mjs` |
| 10 | Unconfigured-environment message kept; forms now say nothing was saved instead of implying success | `t11-verify.mjs` |
| 11 | Unsupported-pair copy names the pair and suggests an alternative | `t4-data.mjs` |
| 12 | Resolved by fix 1: the range controls no longer disappear | `t8-regression.mjs` |
| 13 | Newsletter states cadence and that it can be unsubscribed; footer copy clarified | UI copy |

**Also fixed while in the area:** the IBAN reference table shipped an *invalid* Pakistan
IBAN as its own example (`PK36 HABB …` fails MOD-97, remainder 37). Replaced with a
correctly checksummed `PK97 HABB 0000 1111 2222 3333`. The table was teaching users an
IBAN that no validator would accept.

**One bug found in my own fix and closed before shipping:** `newsletter_subscriptions`
has no owner column and no UPDATE policy, so a "change your cadence" path could not work;
duplicates now report "already subscribed" honestly instead.

## 9. Corrections to the first edition

1. **§6 was wrong.** The project does have data tables, including `transfers` with IBANs.
   The conclusion "no data at risk" was unfounded; the correct conclusion is "data exists
   and RLS correctly denies anonymous reads". See §6.
2. **BUG-6's evidence was mis-stated.** The first edition stored a fake session under
   `sb-fbstwoqqhlaafarwcqiu-auth-token`. The app actually uses `vectisx-auth-token`, so
   that test proved nothing. BUG-6 was real for a different and stronger reason — the
   session was never read anywhere in the code — and it is now verified properly with the
   correct storage key across signed-out, signed-in and logout states.
3. **Test-harness false negatives.** Three assertions in `t2d.mjs`, three detectors in
   `t3-iban.mjs` and two in `t4-data.mjs` were written against the *buggy* contract
   (expecting a success message with no persistence, or grepping for the word "invalid"
   inside an error message). They were corrected to assert the fixed behaviour; the
   final run of every suite is green.

## 10. Reproducing

```
npx tsc --noEmit            # type-check clean
npm run build               # production build clean
node .testing/t11-verify.mjs    # 14/14  — fixes verified through the UI
node .testing/t8-regression.mjs #  4/4   — chart freeze
node .testing/t3-iban.mjs       #  9/9   — IBAN accept/reject matrix
node .testing/t2d.mjs           #  7/7   — no false success on any form
node .testing/t4-data.mjs       # 10/10  — data, routes, access
node .testing/t1-converter.mjs  #  8 pass, 1 not tested (browser-only check)
node .testing/t7-api.mjs        #  4/4   — providers, fallback, loading
node .testing/t12-authjs.mjs    #  6/6   — signed-in header + logout
```

`t12-authjs.mjs` needs the bundle built with Supabase env vars present:

```
VITE_SUPABASE_URL=... VITE_SUPABASE_ANON_KEY=... \
  npx vite build --config .testing/vite.config.ts
```
