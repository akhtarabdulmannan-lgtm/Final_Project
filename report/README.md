# Final project report

The graded report for the "Web Application with React" final project, plus the
submission archive.

| File | What it is |
| --- | --- |
| `Ahmad_AbdulMannan_final-project.pdf` | The report: 7 pages, the four required sections and an appendix. |
| `Ahmad_AbdulMannan_final-project.zip` | The submission archive: the project folder without `node_modules`/`dist`, plus the PDF. |
| `build_report.py` | Report source. Draws the PDF with reportlab so the layout is reproducible. |
| `shots/` | The four figures at 1440 px CSS width, rendered at 2x device scale. |
| `inter-*.ttf` | Inter and Inter Tight, converted from the `woff2` files the app ships so the report matches the UI's type. |

## Word budget

The brief asks for 400-600 words of the student's own text across sections 1-4,
with screenshots excluded. The build prints the count it enforces:

```
own words in sections 1-4 (prose, bullets, library table): 565
```

Figure captions and the appendix are outside that count. The official submission
path is the prebuilt PDF; `build_report.py` is here so the layout and the word
count can be reapplied if the text changes.

## Rebuilding

```bash
python -m venv /tmp/pdfenv && /tmp/pdfenv/bin/pip install reportlab
/tmp/pdfenv/bin/python report/build_report.py
```

`SHOTS_DIR` overrides where the figures are read from (default `report/shots/`).

## What the figures are, and are not

The four screenshots are the running application's screens, laid out from the
app's own components, design tokens, fonts and live API data (rates for
11 November 2026, 24-hour change computed against Frankfurter's 10 November
publication, 71 business days of USD/EUR history). They were rendered with
`@napi-rs/canvas` because no browser was available in the build environment, so
they are a faithful re-drawing rather than a browser capture. The report says so
in the section-2 introduction and in the appendix; do not describe them as
screenshots taken in a browser.

## Facts the report relies on

- 64 currencies, 28 routes, 110 automated checks passing (`.testing/run.mjs`).
- Deployed at `vectisx.vercel.app`.
- GitHub Pages is configured in `.github/workflows/deploy.yml` and the build
  itself works (`VITE_BASE=/Final_Project/ npm run build`), but the repository's
  Pages source still has to be switched on in Settings -> Pages. Until it is,
  the Pages URL does not serve the app, and the report says exactly that.
