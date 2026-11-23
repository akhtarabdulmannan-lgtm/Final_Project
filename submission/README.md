# Submission files — download from here

Everything needed for the AI assignment and the React final project, committed to this
repository so it can be downloaded without any extra step.

## What to send to the marker

| # | File | For | Size |
| --- | --- | --- | --- |
| 1 | [`ai-assignment/chat.json`](ai-assignment/chat.json) | AI assignment — the conversation export | 20 KB |
| 2 | [`ai-assignment/Ahmad_AbdulMannan_project-report.pdf`](ai-assignment/Ahmad_AbdulMannan_project-report.pdf) | AI assignment — the project report | 64 KB |
| 3 | [`../report/Ahmad_AbdulMannan_final-project.pdf`](../report/Ahmad_AbdulMannan_final-project.pdf) | React final project — the coursework report | 1.6 MB |

## Bundles

| Archive | Contains | Size |
| --- | --- | --- |
| [`Ahmad_AbdulMannan_AI-assignment.zip`](Ahmad_AbdulMannan_AI-assignment.zip) | `chat.json` + the project report (PDF and Markdown) + a README | 72 KB |
| [`Ahmad_AbdulMannan_final-project.zip`](Ahmad_AbdulMannan_final-project.zip) | The whole project without `node_modules`, plus the coursework report PDF | 3.3 MB |

## How to download

**One file:** click it in the table above, then use the download button on the right
of the file header. Or use the raw link and it downloads immediately, for example:

```
https://raw.githubusercontent.com/akhtarabdulmannan-lgtm/Final_Project/main/submission/ai-assignment/chat.json
```

**Everything at once:** the green **Code** button on the repository page →
**Download ZIP**. That archive contains all of the above.

## What is where

```
submission/
├── README.md                                  ← this file
├── Ahmad_AbdulMannan_AI-assignment.zip        ← bundle for the AI assignment
├── Ahmad_AbdulMannan_final-project.zip        ← bundle for the React project
└── ai-assignment/
    ├── chat.json                              ← the conversation export
    ├── Ahmad_AbdulMannan_project-report.pdf   ← the project report (8 pages)
    ├── project-report.md                      ← the same report as editable text
    ├── build_project_report.py                ← renders the PDF from the Markdown
    └── README.md                              ← what is in each file, and the limits
report/
└── Ahmad_AbdulMannan_final-project.pdf        ← the coursework report (7 pages)
```

## The two reports are different documents

This is worth knowing before submitting, because they are easy to mix up.

| | Coursework report | AI assignment report |
| --- | --- | --- |
| Path | `report/Ahmad_AbdulMannan_final-project.pdf` | `submission/ai-assignment/Ahmad_AbdulMannan_project-report.pdf` |
| Pages | 7 | 8 |
| Structure | The four sections the course brief specifies | Ten sections: overview, objectives, technologies, development process, AI assistance, features, challenges, solutions, testing, results |
| Word budget | 565 words in sections 1–4 (brief asks 400–600) | No budget specified |
| Answers | The React final project brief | The marker's request for a full project report |

Send the second one for the AI assignment. Both are valid for their own purpose;
neither substitutes for the other.

## Note on `chat.json`

It declares its own limits at the top of the file, under `export_metadata`. In short:
dates are accurate but times of day are `null` because they were not retrievable; the
export covers one AI tool only; and three earliest turns are marked `reconstructed`
because the tool had condensed them before export. Nothing was invented.
