# AI assignment submission

Two deliverables, as requested: `chat.json` and a project report PDF.

| File | What it is |
| --- | --- |
| `chat.json` | The AI conversation export — 18 messages plus 3 reconstructed earlier turns. |
| `Akhtar_AbdulMannan_project-report.pdf` | The academic project report, 8 pages, ten sections. |
| `project-report.md` | The report's text in Markdown, for reference or editing. |
| `build_project_report.py` | Source that renders the PDF, so the layout is reproducible. |

---

## `chat.json` — what is in it, and what is not

**Structure.** Top level has `export_metadata` (a declaration block) and
`conversation`. Then `earlier_messages_reconstructed` (3 summary turns), `messages`
(18 turns), `development_instructions_from_student`, and
`debugging_discussions_summarised`.

Each message has `index`, `role` (`user` or `assistant`), `date`, `time`, `content`,
and where relevant `tool_calls`.

**Read `export_metadata` first.** It states the limitations of the export in the file
itself rather than hiding them. In summary:

1. **Timestamps are date-accurate, not time-accurate.** Times of day were not
   retrievable, so `time` is `null` throughout rather than guessed. Dates are
   reliable: they match the Git commit timestamps for the development work.
2. **This export covers one AI tool only** (Arena.ai Agent Mode). If you used ChatGPT,
   Claude, Gemini, Copilot or anything else on this project, that usage is **not** in
   this file and must be exported separately. This is the most important limitation.
3. **Three earliest turns are reconstructed.** The tool condensed them into a summary
   before this export could be taken. They sit in `earlier_messages_reconstructed`
   with `reconstructed: true` so they are never mistaken for verbatim text.
4. **Tool calls are listed by command, not re-embedded.** Large code blocks and shell
   output are named in `tool_calls`. The prose of every turn is complete.
5. **Reasoning traces are not included** because they are not exposed as message
   content.

**No message was invented, and no prompt is attributed to the student that the
student did not send.** Where a value was unavailable it is `null`.

---

## Project report PDF — what is in it

Ten sections, all required by the assignment:

1. Project overview
2. Objectives
3. Technologies used
4. Development process
5. AI assistance
6. Implemented features
7. Challenges
8. Solutions
9. Testing and verification
10. Final results

Every figure came from the repository at commit `ce38dbe`, not from memory: 28 routes,
64 currencies, 65 source files, 6 runtime dependencies, 33 commits, 1 author. The
development-process section is built from the real `git log`, including the reversal
from Next.js to Vite and the four commits that *removed* features.

The report also declares the earlier false claims that were corrected during the
build (the README's "200+ currencies" and "74 links across 39 routes"), and it does
**not** cite the "110 automated checks" figure, because that harness was never
committed and nobody could rerun it.

---

## Rebuilding the PDF

```bash
python -m venv /tmp/pdfenv && /tmp/pdfenv/bin/pip install reportlab
/tmp/pdfenv/bin/python submission/ai-assignment/build_project_report.py
```

Edit `project-report.md`, then re-run. The renderer reads the Markdown directly.

---

## Related file

`../Akhtar_AbdulMannan_final-project.pdf` is the *coursework* report for the React
final project — a different document, with the four sections and the 400–600 word
budget the course brief specifies. It is not a substitute for the report in this
folder.
