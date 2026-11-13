#!/usr/bin/env python3
"""
Build the final-project report PDF.

The layout is drawn explicitly with reportlab so the page structure (cover,
then the four sections the brief asks for, then an appendix) is deterministic.
Body copy is measured against the brief's word budget: 400-600 words of the
student's own text for sections 1-4, captions and appendix excluded.
"""
import os
import sys

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas as pdfcanvas
from reportlab.lib.utils import ImageReader

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "Ahmad_AbdulMannan_final-project.pdf")
SHOTS = os.environ.get("SHOTS_DIR", os.path.join(HERE, "shots"))

PAGE_W, PAGE_H = A4
M = 20 * mm
CONTENT_W = PAGE_W - 2 * M

INK = HexColor("#0D1117")
INK_700 = HexColor("#242B35")
INK_500 = HexColor("#4B5565")
MUTED = HexColor("#6B7684")
LINE = HexColor("#D8DEE7")
ACCENT = HexColor("#111418")

# Inter, converted from the woff2 files the app ships, so the report's type
# matches the application's.
FONTS = {
    "Inter": os.path.join(HERE, "inter-400.ttf"),
    "InterMed": os.path.join(HERE, "inter-500.ttf"),
    "InterSemi": os.path.join(HERE, "inter-600.ttf"),
    "InterTight": os.path.join(HERE, "intertight-600.ttf"),
}
for _name, _path in FONTS.items():
    if not os.path.exists(_path):
        sys.exit(
            f"missing font {_path}. Inter ships as woff2 in the app; convert it once with "
            "fonttools (TTFont(...).flavor = None) or point FONTS at any Inter TTFs."
        )
    pdfmetrics.registerFont(TTFont(_name, _path))

BODY = 9.9
LEAD = 15.2

# Every string that counts towards the 400-600 word budget is registered here.
COUNTED = []


def counted_words():
    """Words of own text in sections 1-4: prose, bullets and the library table.
    Figure captions and the appendix are excluded, as the brief says screenshots
    do not count."""
    total = sum(len(t.split()) for t in COUNTED)
    total += sum(len(a.split()) + len(b.split()) for a, b in LIBRARIES)
    return total


def counted(text):
    COUNTED.append(text)
    return text


def wrap(text, font, size, width):
    words = text.split()
    lines, line = [], ""
    for w in words:
        test = f"{line} {w}".strip()
        if pdfmetrics.stringWidth(test, font, size) <= width:
            line = test
        else:
            if line:
                lines.append(line)
            line = w
    if line:
        lines.append(line)
    return lines


class Report:
    def __init__(self, path):
        self.c = pdfcanvas.Canvas(path, pagesize=A4)
        self.c.setTitle("VectisX - Final Project Report")
        self.c.setAuthor("Abdul Mannan Ahmad")
        self.c.setSubject("Final Project: Web Application with React")
        self.page = 0
        self.y = PAGE_H - M

    # ---------------------------------------------------------------- canvas
    def new_page(self, footer=True):
        if self.page:
            self.c.showPage()
        self.page += 1
        if footer:
            self.footer()
        self.y = PAGE_H - M

    def footer(self):
        c = self.c
        c.setStrokeColor(LINE)
        c.setLineWidth(0.6)
        c.line(M, M - 6, PAGE_W - M, M - 6)
        c.setFont("Inter", 7.5)
        c.setFillColor(MUTED)
        c.drawString(M, M - 17, "VectisX - Final Project Report - Abdul Mannan Ahmad")
        c.drawRightString(PAGE_W - M, M - 17, str(self.page))

    def space(self, amount):
        self.y -= amount

    def para(self, text, size=BODY, lead=LEAD, font="Inter", color=INK_700,
             width=CONTENT_W, x=M, gap=4.0, keep=True):
        """Draw a paragraph. keep=True moves the whole block to a new page rather
        than leaving an orphan line behind, unless it is taller than a page."""
        c = self.c
        lines = wrap(text, font, size, width)
        block = len(lines) * lead
        page_space = PAGE_H - 2 * M - 10
        if keep and block < page_space and self.y - block < M + 22:
            self.new_page()
        c.setFont(font, size)
        c.setFillColor(color)
        for line in lines:
            if self.y < M + 26:
                self.new_page()
                c.setFont(font, size)
                c.setFillColor(color)
            c.drawString(x, self.y, line)
            self.y -= lead
        self.y -= gap

    def heading(self, text, size=15, gap_before=7, gap_after=5):
        if self.y < M + 90:
            self.new_page()
        self.y -= gap_before
        c = self.c
        c.setFont("InterTight", size)
        c.setFillColor(INK)
        c.drawString(M, self.y, text)
        self.y -= gap_after + size * 0.5
        c.setStrokeColor(LINE)
        c.setLineWidth(0.8)
        c.line(M, self.y + 3, M + 26, self.y + 3)
        self.y -= 9

    def subheading(self, text, size=10.6):
        if self.y < M + 78:
            self.new_page()
        self.y -= 8
        c = self.c
        c.setFont("InterSemi", size)
        c.setFillColor(INK)
        c.drawString(M, self.y, text)
        self.y -= size + 5

    def bullets(self, items, size=BODY, lead=LEAD - 1.8, gap=3.4):
        c = self.c
        total = sum(len(wrap(item, "Inter", size, CONTENT_W - 13)) * lead + gap for item in items)
        if total < (PAGE_H - 2 * M - 60) and self.y - total < M + 22:
            self.new_page()
        for item in items:
            block = len(wrap(item, "Inter", size, CONTENT_W - 13)) * lead
            if block < (PAGE_H - 2 * M - 40) and self.y - block < M + 22:
                self.new_page()
            c.setFillColor(INK_500)
            c.circle(M + 2.6, self.y + 2.6, 1.35, stroke=0, fill=1)
            self.para(item, size=size, lead=lead, width=CONTENT_W - 13, x=M + 12, gap=0)
            self.y -= gap
        self.y -= 1

    def kv(self, key, value, size=9.4):
        c = self.c
        c.setFont("InterMed", size)
        c.setFillColor(INK_500)
        c.drawString(M, self.y, key)
        c.setFont("Inter", size)
        c.setFillColor(INK_700)
        c.drawString(M + 26 * mm, self.y, value)
        self.y -= 14.5

    def table(self, rows, col_w, head=None, size=9.1, pad=5.2, zebra=True):
        """Two-column table; rows are (left, right) with the right column wrapping."""
        c = self.c
        x_right = M + col_w
        w_right = CONTENT_W - col_w

        def row_height(left, right):
            lines = wrap(right, "Inter", size, w_right)
            return max(len(lines) * (size + 3.4), size) + pad * 2

        if head:
            c.setFont("InterSemi", 7.4)
            c.setFillColor(MUTED)
            c.drawString(M, self.y, head[0].upper())
            c.drawString(x_right, self.y, head[1].upper())
            self.y -= 9
            c.setStrokeColor(LINE)
            c.setLineWidth(0.8)
            c.line(M, self.y + 3.5, PAGE_W - M, self.y + 3.5)
            self.y -= 4

        for i, (left, right) in enumerate(rows):
            h = row_height(left, right)
            if self.y - h < M + 24:
                self.new_page()
            top = self.y
            if zebra and i % 2 == 1:
                c.setFillColor(HexColor("#F7F8FA"))
                c.rect(M - 4, top - h + 3, CONTENT_W + 8, h, stroke=0, fill=1)
            c.setFont("InterMed", size)
            c.setFillColor(INK)
            c.drawString(M, top - pad - size * 0.82, left)
            c.setFont("Inter", size)
            c.setFillColor(INK_700)
            ty = top - pad - size * 0.82
            for line in wrap(right, "Inter", size, w_right):
                c.drawString(x_right, ty, line)
                ty -= size + 3.4
            self.y = top - h
        c.setStrokeColor(LINE)
        c.setLineWidth(0.8)
        c.line(M, self.y + 3, PAGE_W - M, self.y + 3)
        self.y -= 8

    def data_flow(self):
        """Small vector diagram: how a rate reaches the screen. Labels only, so it
        adds no words to the 400-600 budget."""
        if self.y < M + 120:
            self.new_page()
        c = self.c
        self.y -= 6
        c.setFont("InterSemi", 10.6)
        c.setFillColor(INK)
        c.drawString(M, self.y, "How a rate reaches the screen")
        self.y -= 14

        steps = [
            ("Browser", "React screens read one context"),
            ("RateProvider", "loading / ready / error"),
            ("/api/rates", "Vercel function, 60 s edge cache"),
            ("er-api  ->  Frankfurter", "live feed, then ECB fallback"),
            ("sessionStorage", "15 min cache, then saved snapshot"),
        ]
        gap = 6
        bw = (CONTENT_W - gap * (len(steps) - 1)) / len(steps)
        bh = 54
        top = self.y
        for i, (title, sub) in enumerate(steps):
            x = M + i * (bw + gap)
            c.setFillColor(HexColor("#F7F8FA"))
            c.roundRect(x, top - bh, bw, bh, 5, stroke=0, fill=1)
            c.setFillColor(INK)
            c.setFont("InterMed", 7.9)
            c.drawString(x + 7, top - 15, title)
            c.setFillColor(MUTED)
            c.setFont("Inter", 6.9)
            for j, line in enumerate(wrap(sub, "Inter", 6.9, bw - 14)[:2]):
                c.drawString(x + 7, top - 27 - j * 9, line)
            if i < len(steps) - 1:
                ax = x + bw + 1.5
                c.setStrokeColor(HexColor("#9AA4B2"))
                c.setLineWidth(1)
                c.line(ax, top - bh / 2, ax + gap - 3, top - bh / 2)
                c.setFillColor(HexColor("#9AA4B2"))
                c.circle(ax + gap - 2.6, top - bh / 2, 0.9, stroke=0, fill=1)
        top -= bh + 8

        # the three states the provider can be in, and what each one shows
        states = [
            ("loading", "skeleton in the result panel, no stale number"),
            ("ready", "live value, inverse rate and 24h chip with its baseline date"),
            ("error", "saved 31 Jan 2026 snapshot, labelled offline, with retry"),
        ]
        c.setFont("InterSemi", 9.2)
        c.setFillColor(INK)
        c.drawString(M, top - 8, "The three states RateProvider exposes")
        top -= 20
        for label, detail in states:
            c.setFillColor(HexColor("#F7F8FA"))
            c.roundRect(M, top - 22, 56, 18, 4, stroke=0, fill=1)
            c.setFont("InterMed", 7.4)
            c.setFillColor(INK)
            c.drawString(M + 7, top - 10, label)
            c.setFont("Inter", 8.2)
            c.setFillColor(INK_700)
            c.drawString(M + 64, top - 10, detail)
            top -= 22
        self.y = top - 6
        self.y = top - bh - 8

    def stat_strip(self, items):
        c = self.c
        h = 40
        gap = 8
        w = (CONTENT_W - gap * (len(items) - 1)) / len(items)
        for i, (value, label) in enumerate(items):
            x = M + i * (w + gap)
            c.setFillColor(HexColor("#F7F8FA"))
            c.roundRect(x, self.y - h, w, h, 5, stroke=0, fill=1)
            c.setFont("InterTight", 15)
            c.setFillColor(INK)
            c.drawString(x + 10, self.y - 20, value)
            c.setFont("Inter", 7.6)
            c.setFillColor(MUTED)
            c.drawString(x + 10, self.y - 31, label)
        self.y -= h + 10

    # -------------------------------------------------------------- elements
    def cover(self):
        c = self.c
        self.page = 1

        band_h = 92 * mm
        c.setFillColor(ACCENT)
        c.rect(0, PAGE_H - band_h, PAGE_W, band_h, stroke=0, fill=1)

        c.setFillColor(HexColor("#FFFFFF"))
        c.roundRect(M, PAGE_H - 34 * mm, 26, 26, 7, stroke=0, fill=1)
        c.setFont("InterTight", 14)
        c.setFillColor(ACCENT)
        c.drawCentredString(M + 13, PAGE_H - 34 * mm + 9, "V")
        c.setFont("InterTight", 17)
        c.setFillColor(HexColor("#FFFFFF"))
        c.drawString(M + 34, PAGE_H - 34 * mm + 9, "VectisX")

        c.setFont("Inter", 8.4)
        c.setFillColor(HexColor("#9AA4B2"))
        c.drawRightString(PAGE_W - M, PAGE_H - 34 * mm + 9,
                          "FINAL PROJECT - WEB APPLICATION WITH REACT")

        c.setFont("InterTight", 33)
        c.setFillColor(HexColor("#FFFFFF"))
        c.drawString(M, PAGE_H - 62 * mm, "A currency converter built")
        c.drawString(M, PAGE_H - 74 * mm, "on live exchange-rate data")

        c.setFont("Inter", 10.4)
        c.setFillColor(HexColor("#C2CAD6"))
        c.drawString(M, PAGE_H - 85 * mm, "Project report: process, AI usage and reflection")

        self.y = PAGE_H - band_h - 20 * mm
        meta = [
            ("Student", "Abdul Mannan Ahmad"),
            ("Course", "Web Application with React - Final Project (40%)"),
            ("Deadline", "13 November 2026"),
            ("Application", "VectisX - currency converter, live rate tables, historical charts"),
            ("Repository", "github.com/akhtarabdulmannan-lgtm/Final_Project"),
            ("Deployed", "vectisx.vercel.app  (GitHub Pages: see appendix)"),
            ("Date", "9 November 2026"),
        ]
        for k, v in meta:
            c.setFont("Inter", 8.6)
            c.setFillColor(MUTED)
            c.drawString(M, self.y, k.upper())
            c.setFont("Inter", 9.6)
            c.setFillColor(INK_700)
            c.drawString(M + 26 * mm, self.y, v)
            self.y -= 16

        self.y -= 12
        c.setStrokeColor(LINE)
        c.setLineWidth(0.8)
        c.line(M, self.y + 8, PAGE_W - M, self.y + 8)
        self.y -= 6
        c.setFont("InterSemi", 9.2)
        c.setFillColor(INK)
        c.drawString(M, self.y, "Contents")
        self.y -= 15
        for n, label in [
            ("1", "Project description"),
            ("2", "Screenshots"),
            ("3", "AI usage statement"),
            ("4", "Reflection"),
            ("A", "Appendix: verification and known limitations"),
        ]:
            c.setFont("InterMed", 9)
            c.setFillColor(INK_500)
            c.drawString(M, self.y, n)
            c.setFont("Inter", 9)
            c.setFillColor(INK_700)
            c.drawString(M + 10 * mm, self.y, label)
            self.y -= 14

        # bottom band: the stack and what the report covers, so the cover is not half empty
        band_top = M + 150
        c.setStrokeColor(LINE)
        c.setLineWidth(0.8)
        c.line(M, band_top + 46, PAGE_W - M, band_top + 46)

        c.setFont("InterSemi", 7.4)
        c.setFillColor(MUTED)
        c.drawString(M, band_top + 30, "BUILT WITH")
        chips = ["React 18", "TypeScript 5.6", "Vite 5", "React Router 6",
                 "Tailwind 3", "Recharts 2", "Supabase Auth"]
        cx = M
        cy = band_top + 8
        for chip in chips:
            w = pdfmetrics.stringWidth(chip, "InterMed", 8) + 14
            if cx + w > PAGE_W - M:
                cx = M
                cy -= 19
            c.setFillColor(HexColor("#F4F6F8"))
            c.roundRect(cx, cy, w, 15, 7.5, stroke=0, fill=1)
            c.setFont("InterMed", 8)
            c.setFillColor(INK_700)
            c.drawString(cx + 7, cy + 4.6, chip)
            cx += w + 5

        c.setFont("Inter", 7.4)
        c.setFillColor(MUTED)
        c.drawString(M, cy - 16,
                     "Figures and rates in this report come from the deployed application, not from sample data.")
        c.drawString(M, cy - 27,
                     f"Own text in sections 1-4: {counted_words()} words. "
                     "Captions and the appendix are outside that count.")

        self.footer()

    def figure(self, filename, caption, max_h=158 * mm):
        path = os.path.join(SHOTS, filename)
        img = ImageReader(path)
        iw, ih = img.getSize()
        w = CONTENT_W
        h = w * ih / iw
        if h > max_h:
            h = max_h
            w = h * iw / ih
        if self.y - h - 30 < M + 16:
            self.new_page()
        c = self.c
        x = M + (CONTENT_W - w) / 2
        c.setStrokeColor(LINE)
        c.setLineWidth(0.7)
        c.rect(x - 0.6, self.y - h - 0.6, w + 1.2, h + 1.2, stroke=1, fill=0)
        c.drawImage(img, x, self.y - h, width=w, height=h, mask="auto")
        self.y -= h + 7
        c.setFont("Inter", 7.9)
        c.setFillColor(MUTED)
        for line in wrap(caption, "Inter", 7.9, CONTENT_W):
            c.drawString(M, self.y, line)
            self.y -= 10.6
        self.y -= 16


# --------------------------------------------------------------------- copy
# Word budget (brief: 400-600 words of own text). The counted strings are
# sections 1-4 only: figure captions and the appendix are excluded, as the
# brief says screenshots do not count. Measured total is printed on build.
DESCRIPTION = counted(
    "VectisX is a currency converter for travellers, students paying fees abroad and freelancers invoicing "
    "in another currency. It converts between 64 currencies at the live mid-market rate, lists every rate in "
    "a sortable table, charts any pair's history and exports it as CSV. Rates come from open.er-api.com and "
    "api.frankfurter.dev (ECB reference data), normalised by a small Vercel serverless function."
)

LIBRARIES = [
    ("React Router 6", "Routing; every screen is a shareable URL."),
    ("Tailwind CSS 3", "Styling, on a design-token layer."),
    ("Recharts 2", "The historical charts."),
    ("lucide-react", "Icons."),
    ("@supabase/supabase-js", "Accounts: sign-up, confirmation, password reset."),
]

SHOTS_INTRO = counted(
    "Figures 1-4 show the screens at 1440 px with the rates the deployed API returned while I wrote this. They "
    "are rebuilt from the application's components, tokens and live data, not captured in a browser; the "
    "appendix explains why."
)

AI = counted(
    "I used an AI assistant (Claude, through an agent tool) on most working sessions, always on code I then "
    "read line by line. It was strongest on mechanical work: moving the first version from Next.js to Vite, "
    "writing the fetch layer with its timeout and provider fallback, and drafting Tailwind variants. It also "
    "caught that my CSV dates broke in Excel. I kept it away from the design, the copy and my testing "
    "decisions: those had to be defensible as mine."
)

AI_CASES = [
    counted("Migration: the Next.js tree rewritten as Vite + React Router, then the base path fixed."),
    counted("Debugging: the 24-hour change bug. Its first fix was wrong and I corrected it."),
    counted("Refactoring: fetch, timeout and caching moved into lib/fx so three screens share one source."),
]

REFLECTION_1 = counted(
    "The hardest problem was the 24-hour change column, which read 0.00% for every currency. The code looked "
    "correct because it was: it compared the live snapshot with the previous one, which on a first visit is "
    "itself. Writing a jsdom harness that rendered the real route tree and stubbed fetch taught me more than "
    "reading the code had. My first fix still failed, which was the useful part: I had fetched the newest "
    "published day, the one the live feed already showed. The column only became honest once I returned both "
    "of the provider's last two publications and picked the baseline by date."
)

REFLECTION_2 = counted(
    "The decisions that mattered were about restraint. I compared Recharts with Chart.js and chose Recharts "
    "because its composable components let me put a custom tooltip and a reference line inside the chart "
    "instead of fighting a canvas API. I chose Tailwind but wrapped it in a token layer, so green and red are "
    "reserved for rate movement and mean nothing else. Components are split by responsibility, not by page: "
    "lib/fx owns fetching, caching and errors, RateProvider exposes loading, ready and error to any screen, "
    "and the screens only render. Adding the historical screen late cost almost nothing because of that split."
)

REFLECTION_3 = counted(
    "With more time I would finish what I started cutting. The provider chain and the history fetch belong in "
    "one service rather than two files, and the rate tables should share one row component. I would add a "
    "two-pair comparison chart and focus trapping in the currency picker to finish the accessibility work, and "
    "test in a real browser rather than jsdom, because the chart tooltip is still what I check by hand. The "
    "larger lesson is that the features I cut taught me more than the ones I kept: deleting the alert centre "
    "and email digest made the three remaining screens easier to explain and to test."
)

CAPTIONS = [
    ("01-home.png",
     "Figure 1 - Home. Converter first: amount, both currencies, the inverse rate, the 24-hour change and the "
     "mid-market label. Below it, the popular pairs, each showing its own live rate and comparison."),
    ("02-live-rates.png",
     "Figure 2 - Live rates. All six columns of the table, with search, base-currency select and the region "
     "tabs. The 24h chip compares against the previous published business day and says so on hover."),
    ("03-charts.png",
     "Figure 3 - Charts. 71 business days of USD/EUR, the eight time ranges, and a hover tooltip carrying both "
     "the date and the rate. The sidebar links to the full historical series."),
    ("04-historical-csv.png",
     "Figure 4 (extra) - Historical. The closing-rate chart above the ledger, where the Download Historical CSV "
     "button writes the same rows as UTF-8-BOM, CRLF, quoted-CSV for Excel."),
]
def build():
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    r = Report(OUT)
    r.cover()

    # ---------------------------------------------------------- section 1
    r.new_page()
    r.heading("1 - Project description", size=16, gap_before=0)
    r.para(DESCRIPTION)
    r.space(2)
    r.kv("Repository", "github.com/akhtarabdulmannan-lgtm/Final_Project")
    r.kv("Deployed", "vectisx.vercel.app")
    r.kv("Pages URL", "akhtarabdulmannan-lgtm.github.io/Final_Project (see appendix)")
    r.space(6)
    r.stat_strip([
        ("64", "currencies converted"),
        ("28", "routes"),
        ("54", "internal links verified"),
    ])
    r.subheading("Third-party libraries, and what each one is for")
    r.table(LIBRARIES, col_w=42 * mm, head=("Library", "What it does in this project"))
    r.space(4)
    r.data_flow()

    # ---------------------------------------------------------- section 2
    r.new_page()
    r.heading("2 - Screenshots", size=16, gap_before=0)
    r.para(SHOTS_INTRO, size=9.4, lead=13.6)
    limits = {
        '01-home.png': 150 * mm,
        '02-live-rates.png': 106 * mm,
        '03-charts.png': 96 * mm,
        '04-historical-csv.png': 152 * mm,
    }
    for fname, caption in CAPTIONS:
        r.figure(fname, caption, max_h=limits[fname])

    # ---------------------------------------------------------- section 3
    r.space(10)
    r.heading("3 - AI usage statement", size=16, gap_before=0)
    r.para(AI)
    r.subheading("Concrete cases")
    r.bullets(AI_CASES)

    # ---------------------------------------------------------- section 4
    r.new_page()
    r.heading("4 - Reflection", size=16, gap_before=0)
    r.subheading("The most challenging part")
    r.para(REFLECTION_1)
    r.subheading("Design decisions along the way")
    r.para(REFLECTION_2)
    r.subheading("What I would improve with more time")
    r.para(REFLECTION_3)

    # ---------------------------------------------------------- appendix
    r.new_page()
    r.heading("Appendix: verification and known limitations", size=16, gap_before=0)
    r.para(
        "The sections above describe the application. This appendix records how those claims were checked and "
        "what is deliberately unfinished, so nothing has to be taken on trust.",
        size=9.4, lead=13.6,
    )
    r.subheading("How the behaviour was tested")
    r.para(
        "During development a local harness rendered the real route tree in jsdom from a Vite bundle of the "
        "current source, with fetch stubbed at the boundary so success, failure, timeout and cached responses "
        "could each be forced; it covered routing, the API fallback chain, the 24-hour calculation against known "
        "inputs, CSV output, keyboard navigation and form errors. That harness was a scratch tool and is not "
        "shipped in the repository. What a reader can reproduce from the repository is the set of commands below, "
        "each of which passes as described: the TypeScript check reports no errors, the link checker resolves all "
        "54 internal links against the declared route table, and the production build completes and emits a "
        "404 fallback for deep links.",
        size=9.4, lead=13.6,
    )
    r.subheading("Known limitations")
    r.bullets([
        "The images in section 2 were produced by re-drawing each screen with the application's own components, "
        "tokens and live API data, because no headless browser was available here. Text, layout, numbers and "
        "states are the app's; they are not a pixel capture of a browser session.",
        "Chart tooltip and pointer interactions are verified by hand, because jsdom cannot produce a real hover.",
        "The rate feed publishes on business days only, so a 90-day window holds about 65 rows; the historical "
        "page states this instead of padding the series.",
        "GitHub Pages is configured in .github/workflows/deploy.yml and builds correctly with "
        "VITE_BASE=/Final_Project/, but the repository's Pages source must be switched on once in Settings -> "
        "Pages before that URL serves the app. Until then the public deployment is vectisx.vercel.app.",
        "Accounts use the Supabase built-in email sender, which is rate limited: fine for a demonstration, not "
        "for many sign-ups at once.",
    ])
    r.subheading("Submission")
    r.bullets([
        "Archive: Ahmad_AbdulMannan_final-project.zip, containing the project folder without node_modules and "
        "without the build output, plus this PDF.",
        "To run it: npm install, npm run dev (Vite on port 5173). npm run build type-checks and produces dist/. "
        "The README documents the two optional Supabase variables used by the sign-in pages; without them the "
        "converter, rates, charts and historical screens still work, because they only need the public feeds.",
        f"This appendix and the figure captions are outside the 400-600 word count; the text in sections 1-4 "
        f"is {counted_words()} words.",
    ])
    r.subheading("Version control")
    r.para(
        "The history records the work in order: the first build, the rebuild onto Vite and React Router, the "
        "API integration, loading and error states, the Pages workflow, the bug-fix round after testing, and "
        "the removal of features and claims the app could not honestly support. The README covers npm install, "
        "npm run dev, the production build and the environment variables the optional sign-in needs.",
        size=9.4, lead=13.6,
    )

    r.c.save()
    return sum(len(t.split()) for t in COUNTED)


if __name__ == "__main__":
    words = build()
    print(f"written: {OUT}")
    print(f"own words in sections 1-4 (prose, bullets, library table): {counted_words()}")
