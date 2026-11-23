#!/usr/bin/env python3
"""Render the academic project report (Markdown) to a professional A4 PDF."""
import os, re
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph, Table, TableStyle, Spacer, KeepTogether

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
FONTS = os.path.join(ROOT, "report")
SRC = os.path.join(HERE, "project-report.md")
OUT = os.path.join(HERE, "Ahmad_AbdulMannan_project-report.pdf")

pdfmetrics.registerFont(TTFont("Inter", os.path.join(FONTS, "inter-400.ttf")))
pdfmetrics.registerFont(TTFont("InterMed", os.path.join(FONTS, "inter-500.ttf")))
pdfmetrics.registerFont(TTFont("InterSemi", os.path.join(FONTS, "inter-600.ttf")))
pdfmetrics.registerFont(TTFont("InterTight", os.path.join(FONTS, "intertight-600.ttf")))
pdfmetrics.registerFontFamily("Inter", normal="Inter", bold="InterSemi",
                               italic="Inter", boldItalic="InterSemi")

INK = colors.HexColor("#111418")
BODY = colors.HexColor("#242A31")
MUTED = colors.HexColor("#68727E")
RULE = colors.HexColor("#DFE3E8")
HEADBG = colors.HexColor("#F3F5F7")
ACCENT = colors.HexColor("#1F6FEB")

PW, PH = A4
LM, RM = 21 * mm, 21 * mm
CONTENT_W = PW - LM - RM
TOP, BOT = 22 * mm, 20 * mm

S = {}
S["title"] = ParagraphStyle("t", fontName="InterTight", fontSize=22, leading=26,
                            textColor=INK, spaceAfter=3)
S["h1"] = ParagraphStyle("h1", fontName="InterTight", fontSize=14.5, leading=18,
                         textColor=INK, spaceBefore=13, spaceAfter=5)
S["h2"] = ParagraphStyle("h2", fontName="InterSemi", fontSize=11, leading=14.5,
                         textColor=INK, spaceBefore=9, spaceAfter=3)
S["h3"] = ParagraphStyle("h3", fontName="InterSemi", fontSize=9.8, leading=13,
                         textColor=INK, spaceBefore=7, spaceAfter=2)
S["p"] = ParagraphStyle("p", fontName="Inter", fontSize=9.2, leading=14,
                        textColor=BODY, spaceAfter=5.5, alignment=0)
S["meta"] = ParagraphStyle("m", fontName="Inter", fontSize=8.8, leading=12.6,
                           textColor=MUTED, spaceAfter=1.5)
S["li"] = ParagraphStyle("li", parent=S["p"], leftIndent=10, bulletIndent=1,
                         spaceAfter=3.5)
S["code"] = ParagraphStyle("c", fontName="Inter", fontSize=8.4, leading=12,
                           textColor=colors.HexColor("#B0217A"), spaceAfter=5)
S["th"] = ParagraphStyle("th", fontName="InterSemi", fontSize=7.9, leading=10.6,
                         textColor=INK)
S["td"] = ParagraphStyle("td", fontName="Inter", fontSize=7.9, leading=10.6,
                         textColor=BODY)


def inline(t):
    """Markdown inline -> reportlab markup."""
    t = t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    t = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t)
    t = re.sub(r"(?<!\*)\*([^*]+?)\*(?!\*)", r"<i>\1</i>", t)
    t = re.sub(r"`([^`]+?)`", r'<font name="InterMed" color="#B0217A">\1</font>', t)
    t = re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)",
               r'<link href="\2" color="#1F6FEB"><u>\1</u></link>', t)
    return t


def make_table(rows, widths):
    data = []
    for i, row in enumerate(rows):
        cells = [Paragraph(inline(c), S["th"] if i == 0 else S["td"]) for c in row]
        data.append(cells)
    t = Table(data, colWidths=widths, repeatRows=1, hAlign="LEFT")
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), HEADBG),
        ("LINEBELOW", (0, 0), (-1, 0), 0.7, RULE),
        ("LINEBELOW", (0, 1), (-1, -1), 0.35, RULE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 3.6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3.6),
    ]))
    return t


def build():
    lines = open(SRC, encoding="utf-8").read().split("\n")
    story = []
    i = 0
    first_h1 = True

    while i < len(lines):
        ln = lines[i]
        s = ln.strip()

        if not s:
            i += 1
            continue

        if s.startswith("---") and set(s) <= {"-"}:
            story.append(Spacer(1, 4))
            i += 1
            continue

        # tables
        if s.startswith("|"):
            block = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                block.append(lines[i].strip())
                i += 1
            rows = []
            for b in block:
                cells = [c.strip() for c in b.strip("|").split("|")]
                if all(re.fullmatch(r":?-{2,}:?", c) for c in cells):
                    continue
                rows.append(cells)
            if rows:
                n = max(len(r) for r in rows)
                rows = [r + [""] * (n - len(r)) for r in rows]
                # column widths: first col narrower for 2-col, even otherwise
                if n == 2:
                    widths = [CONTENT_W * 0.36, CONTENT_W * 0.64]
                elif n == 3:
                    widths = [CONTENT_W * 0.30, CONTENT_W * 0.38, CONTENT_W * 0.32]
                else:
                    widths = [CONTENT_W / n] * n
                story.append(make_table(rows, widths))
                story.append(Spacer(1, 6))
            continue

        if s.startswith("# "):
            txt = s[2:]
            if first_h1:
                story.append(Paragraph(inline(txt), S["title"]))
                first_h1 = False
            else:
                story.append(Paragraph(inline(txt), S["h1"]))
            i += 1
            continue

        if s.startswith("## "):
            story.append(Paragraph(inline(s[3:]), S["h1"]))
            i += 1
            continue

        if s.startswith("### "):
            story.append(Paragraph(inline(s[4:]), S["h2"]))
            i += 1
            continue

        if s.startswith("#### "):
            story.append(Paragraph(inline(s[5:]), S["h3"]))
            i += 1
            continue

        if s.startswith("- "):
            buf = []
            while i < len(lines) and lines[i].strip().startswith("- "):
                buf.append(lines[i].strip()[2:])
                i += 1
            for b in buf:
                story.append(Paragraph(inline(b), S["li"], bulletText="•"))
            story.append(Spacer(1, 2))
            continue

        if re.match(r"^\d+\.\s", s):
            # collect items, including their indented continuation lines
            items = []
            while i < len(lines):
                cur = lines[i]
                m = re.match(r"^\s*(\d+)\.\s+(.*)$", cur)
                if m:
                    items.append([m.group(1), m.group(2).strip()])
                    i += 1
                elif items and cur.strip() and cur.startswith(" ") and not cur.strip().startswith(("|", "#", "-")):
                    items[-1][1] += " " + cur.strip()
                    i += 1
                else:
                    break
            numstyle = ParagraphStyle("n", parent=S["p"], leftIndent=15,
                                      bulletIndent=1, spaceAfter=4)
            for num, txt in items:
                story.append(Paragraph(inline(txt), numstyle, bulletText=num + "."))
            story.append(Spacer(1, 2))
            continue

        if s.startswith("*") and s.endswith("*") and not s.startswith("**"):
            story.append(Paragraph(inline(s), S["meta"]))
            i += 1
            continue

        # paragraph (join consecutive non-special lines)
        buf = [s]
        i += 1
        while i < len(lines):
            nxt = lines[i].strip()
            if (not nxt or nxt.startswith(("#", "|", "- ", "---"))
                    or re.match(r"^\d+\.\s", nxt)
                    or (nxt.startswith("*") and nxt.endswith("*") and not nxt.startswith("**"))):
                break
            buf.append(nxt)
            i += 1
        story.append(Paragraph(inline(" ".join(buf)), S["p"]))

    c = canvas.Canvas(OUT, pagesize=A4)
    c.setTitle("Project Report — VectisX Currency Converter & Exchange Rate Dashboard")
    c.setAuthor("Abdul Mannan Ahmad")
    c.setSubject("Web Application with React — Final Project")

    page = 1

    def chrome(p):
        c.setFillColor(MUTED)
        c.setFont("Inter", 7.5)
        c.drawString(LM, PH - 13 * mm, "Web Application with React — Final Project Report")
        c.drawRightString(PW - RM, PH - 13 * mm, "Abdul Mannan Ahmad")
        c.setStrokeColor(RULE)
        c.setLineWidth(0.6)
        c.line(LM, PH - 15 * mm, PW - RM, PH - 15 * mm)
        c.setFont("Inter", 7.4)
        c.drawCentredString(PW / 2, 10 * mm, f"Page {p}")

    chrome(page)
    y = PH - TOP - 4 * mm

    for flow in story:
        w, h = flow.wrap(CONTENT_W, PH)
        if y - h < BOT:
            c.showPage()
            page += 1
            chrome(page)
            y = PH - TOP - 4 * mm
        flow.drawOn(c, LM, y - h)
        y -= h + (getattr(flow, "getSpaceAfter", lambda: 0)() or 0)

    c.save()
    print("written:", OUT)
    print("pages:", page)


if __name__ == "__main__":
    build()
