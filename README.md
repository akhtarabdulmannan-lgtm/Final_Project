# VectisX — Global Currency Intelligence & International Money Transfers

> **VectisX** is an enterprise-grade global currency exchange, money transfer, and financial data platform inspired by **Xe.com**'s platform architecture, features, workflows, and visual structure—rebuilt from the ground up with 100% custom branding, bespoke styling, and high-performance engineering.

---

## 🌟 Platform Overview & Core Pillars

VectisX is organized around four core consumer product pillars, alongside institutional business treasury infrastructure and high-throughput developer data APIs:

### 1. 💱 Send Money (`/send`)
- **3-Step Send Flow:**
  1. *Enter Amount:* Guaranteed live send rates, flat fees starting at **$0**, and transparent recipient payout calculation.
  2. *Choose Recipient:* Multi-corridor support across **190+ countries** with bank-account, mobile wallet, and cash pickup routing.
  3. *Send & Track:* Real-time settlement status notifications via email and SMS.
- **Corridor Matrix:** Dedicated corridors for India, Mexico, UK, Eurozone, Philippines, Canada, Australia, Pakistan, and more.
- **Welcome Promotion:** Save **$100** using promo code `VXNEW100` on initial transfers of $3,000+.
- **Fee Transparency:** Clear fee comparison table highlighting bank-beating savings up to 8x vs traditional retail banks.

### 2. 🔄 Currency Converter (`/converter`, `/converter/[pair]`)
- **Live Mid-Market Rates:** Instant conversion across **220+ global currencies**, precious metals (Gold, Silver), and selected digital currencies.
- **Dynamic Currency Pair Landing Pages:** Programmatic routing (e.g. `/converter/usd-to-eur`, `/converter/gbp-to-usd`) with responsive interactive trend charts and 24h high/low statistics.
- **Mid-Market Guarantee:** Real-time interbank rates without hidden retail markups.

### 3. 📈 Interactive Currency Charts (`/charts`)
- **Time Horizons:** 1D, 1W, 1M, 3M, 6M, 1Y, 5Y, and 10Y interactive historical trend visualizer.
- **Data Visualizer:** Built on Recharts with custom SVG gradients, tooltips, and responsive layout.
- **Export & Share:** Export historical CSV datasets directly for analysis.

### 4. 🔔 Rate Alerts (`/alerts`)
- **24/7 Automated Triggers:** Set custom threshold triggers (e.g. "Notify when USD/EUR rises above 0.8550").
- **Multi-Channel Notification:** Instant email and mobile push notifications when interbank markets reach your target.
- **100% Free:** No subscription fees or limits on custom rate triggers.

---

## 💼 VectisX Business Account (`/business`)

Designed for commercial enterprises, high-growth startups, and multinational treasuries:

- **Institutional Multi-Currency Vault:** Hold, convert, and disburse in USD, EUR, GBP, AUD, CAD, and 18+ currencies with zero monthly account fees.
- **Global Payments (`/business/payments`):** Settle overseas vendor invoices and subsidiary payments to 190+ countries in 145+ currencies.
- **Batch & Payroll Disbursements (`/business/batch`):** Single CSV/Excel file upload to pay thousands of international contractors and remote employees in local currencies.
- **Scheduled Payments (`/business/scheduled`):** Automated recurring payments for cross-border software retainers and supplier contracts.
- **FX Risk Management (`/business/fx-risk`):**
  - **Forward Contracts:** Lock in binding exchange rates for up to 24 months to protect profit margins against currency swings.
  - **Limit Orders:** Set target exchange rates that execute automatically when market spikes occur.
  - **FX Exposure Calculator:** Interactive EBITDA risk estimator.
- **Role-Based Permissions (`/business/team`):** Segregation of duties across Administrator, Approver, Creator, and Auditor roles with dual-signoff enforcement.
- **ERP Integrations (`/business/integrations`):** Native bidirectional sync for Microsoft Dynamics 365, Sage Intacct, Oracle NetSuite, and SAP.
- **Scale:** Trusted by **17,000+ businesses** processing **$17B+** in annual volume.

---

## ⚡ Developer Platform: Currency Data API (`/api-platform`)

- **Core Endpoint:** `GET /v1/convert_from` (accessible via `/api/rates`) returning normalized JSON payloads.
- **Proprietary Rate Blender™:** Statistical anomaly detection aggregating 100+ liquidity providers with real-time spike rejection.
- **Pricing Tiers (`/api-platform/pricing`):**
  - *Core ($599/yr):* 10k requests/mo, daily EOD updates, 1 base currency.
  - *Intermediate ($1,799/yr):* 50k requests/mo, hourly updates, 5 base currencies, historical records back to 1998.
  - *Prime ($4,499/yr):* 200k requests/mo, 15-minute updates, unlimited bases, central bank feeds.
  - *Enterprise (Custom):* Live minutely streaming feeds, 99.99% SLA, custom margins.
- **Official SDKs:** Ready-to-use packages for Java, Node.js, PHP, and Python.
- **Partner Program (`/api-platform/partners`):** Co-branded solutions, ISV revenue shares, and system integrator alliances.

---

## 🛠️ Specialized Financial Tools

- **IBAN Calculator & Validator (`/tools/iban`):** Validate international bank account numbers, check digits, and country routing structures.
- **Daily Market Analysis Newsletter (`/tools/email-updates`):** Curated daily macroeconomic briefings for 350,000+ subscribers.
- **Cross-Rate Matrix Tables (`/tables`):** Multi-lateral cross-rate table comparing the top 10 global currencies.
- **Historical Data Archives (`/historical`):** Daily closing prices and monthly averages dating back to 1998.
- **Mobile Apps (`/apps`):** iOS (4.8★, 118k reviews) and Android (4.8★, 380k reviews).

---

## 🛡️ Trust, Security & Regulation (`/security`, `/licenses`)

- **Corporate Parent:** Wholly owned subsidiary of Meridian Financial Corporation (NASDAQ: MRDN).
- **FinCEN Registered:** Money Services Business (MSB Registration #310001849204).
- **State-Licensed:** Licensed money transmitter across California, New York, Texas, Florida, Illinois, and nationwide.
- **SOC 2 Type II:** Independently audited annual security and data confidentiality certification.
- **Tier-1 Safeguarding:** Client funds are segregated in safeguarded accounts at JPMorgan Chase and Barclays.

---

## 💻 Tech Stack & Architecture

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.6
- **Styling:** Tailwind CSS 3.4 with custom design tokens
- **Data Visualization:** Recharts 2.12
- **Icons:** Lucide React
- **SEO & Performance:** Full static pre-rendering (44 pre-rendered static routes), dynamic metadata generation, XML Sitemap (`/sitemap.xml`), and `robots.txt`.

---

## 🚀 Setup & Local Development

### 1. Prerequisites
- **Node.js** v18.17+ (v20+ recommended)
- **npm** or **pnpm**

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/akhtarabdulmannan-lgtm/Final_Project.git
cd Final_Project

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📄 License
© 2026 VectisX Financial Inc. A subsidiary of Meridian Financial Corporation. All rights reserved.
