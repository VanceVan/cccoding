# 655.662 — Working Conventions

Carried forward from Module 1 so later modules don't re-derive this.

## Semester use case (M1D1 decision — locked)

**Peritoneal Dialysis Remote Patient Monitoring System (PD-RPM).** Home PD for
adult ESKD patients; monitors for technique failure (peritonitis, declining
ultrafiltration) and escalates to the home dialysis care team.

Boundary decisions already made and defended — keep consistent across all modules:

| Inside | Outside |
|---|---|
| Sensing, trending, alerting, escalation logic | The PD cycler itself (separately regulated Class II device) |
| Interfaces to cycler, EHR, supply chain | Home hemodialysis; in-center hemodialysis |
| Billing/quality data production | The EHR itself; payer adjudication |
| | Clinical decision authority over the PD prescription |

Per Module 2 Part 3, PD-RPM is most defensibly an **enterprise system**: multiple
complex systems (cycler, home devices, clinical dashboards) plus people,
workflow, and decision-making. Montoya reaches the same conclusion about his own
remote cardiac example. Expect this classification to be asked for directly.

## Instructor constraints

- **Diagrams must be tool-made.** Montoya: PowerPoint minimum, Visio or an MBSE
  tool acceptable, and he explicitly will not accept hand-drawn diagrams.
  Generated SVG/PDF satisfies this, but offer `.pptx` when the deliverable is a
  diagram so it is unambiguously editable in his required tool.
- Submissions are PDF on Canvas. Discussion posts are pasted into the forum, not
  uploaded.
- Homework due Monday 11:59pm ET, 12-hour grace, then zero.
- INCOSE quizzes need ≥80% for CSEP eligibility.
- INCOSE handbook is the **5th edition** (confirmed: Module 2 reading list uses
  §2.3.x process numbering). The Canvas link to the v4 product page is stale.

## Deliverable house style

Built by a small Node script per assignment; content lives in one data structure
so every output format renders from the same source and cannot drift.

- Header block: name / course line / `Module N | <assignment>` with a rule under it.
- Body 10.5–11pt Calibri, justified, line-height ~1.13, US Letter.
- Section headings 10.5pt bold in `#1F3864`.
- References as one compact small-type paragraph at the end.
- Diagram pages use a named `@page land` rule for landscape inside a portrait doc.

## Toolchain notes (this container)

- **LibreOffice is broken** — `soffice` fails to convert even a plain text file.
  Do not use it, and do not use the docx skill's `soffice.py` verification path.
- **Render PDFs with headless Chromium**:
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome --headless --disable-gpu
  --no-sandbox --print-to-pdf=OUT.pdf --no-pdf-header-footer file://IN.html`
- `poppler-utils`, `pypdf`, `defusedxml` are installed (`apt-get update` first if
  reinstalling poppler — the cached index 404s).
- Export a diagram PNG from the **verified PDF page** via
  `pdftoppm -png -f N -l N -r 200 -singlefile`, not by screenshotting the SVG in
  a Chromium window — the window-size path clips the bottom.

## Verification checklist (every deliverable)

1. Render each page to JPEG and actually look at it. Page counts alone hide problems.
2. Watch for the **orphan page** — one or two lines spilling past the last full
   page. Fix by trimming prose or shaving margins, not by shipping it.
3. Check **flow-label proximity** on diagrams: a label equidistant between two
   arrows reads as ambiguous. Widen row spacing.
4. Do not pre-escape HTML entities in source strings that pass through an
   escaping helper — `&amp;` becomes `&amp;amp;`.
5. Confirm per-page media box when mixing portrait and landscape.

## Diagram conventions

Two versions of the context diagram exist and both are current:

- `PD-RPM_context_diagram_JHU_style.*` — matches Montoya's lecture slide: black
  box, bare text entity labels, plain arrows, 3 per side, every arrow labeled
  with what crosses. **Preferred for submissions.** 16:9, 1280×720.
- `PD-RPM_context_diagram.*` — 13 entities, four color-coded domains, dashed
  boundary, interface table. Keep as the working reference; its interface table
  feeds the Module 3 needs and requirements.

Rule learned the hard way: **every box is a who-or-what, every arrow says what
crosses.** Montoya's own slide mixes entities (left) with data products (right);
the rubric wants both entities and labeled flows, so name the recipient and label
the flow.

## Rubric patterns seen so far

- INCOSE quiz distractors are the correct handbook sentence with **one word
  inverted** (right→wrong, begins→ends, removed→restarted, integrative→divergent).
  Read for the flipped word, not the sentence shape.
- Discussion rubrics reward taking a non-obvious position and defending it over
  restating the prompt. The M1D2 post argued the prompt's own answer was a
  symptom rather than the root.
- Written-assignment rubrics name their required elements literally. Grep the
  Excellent band for nouns and make sure each appears.

## Module 1 artifacts (done)

`module1/` — M1A1 Systems Viewpoint (2p), M1A2 Context Diagram (4p), M1D1 use-case
selection, M1D2 learning disabilities (~340 words), INCOSE Quiz 1 answered.
Outstanding: two peer replies on M1D2, drafted and ready to post.
