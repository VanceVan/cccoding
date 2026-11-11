# Module 10 — Rehab Center Experience

EN.585.617.81.FA26 Rehabilitation Engineering

## Status
**First draft.** Content below the facts is assumed and must be verified.

## Deliverable
`Module_10_Rehab_Center_Experience.pptx` / `.pdf` — 12 slides for a ≤10 minute
recorded presentation. Built by `deck.py`. Speaker notes are on every slide.

Submit the **PDF**; record separately and post the recording to the Module 10
discussion. At least one comment on every peer presentation is due by Day 5 of
Module 11.

## Slide map (to the assignment's required content)
| # | Slide | Covers |
|---|---|---|
| 1 | Title | — |
| 2 | Project Topic | "Brief review of your project topic (<1 min)" |
| 3 | The Center | "Overview of the rehab center… name, types of patients, expertise" |
| 4 | Patient Observation | "What type of session were you able to observe?" |
| 5 | What the Observation Changed | "…anything that will inform how you approach your preliminary design?" |
| 6 | Technology Overview | "used often vs less often… simple vs sophisticated" |
| 7 | Relevance to My Project | "Any technologies related to your project topic? If not, consider and discuss why" |
| 8 | Care Provider Interviewed | "Name and background of the care provider" |
| 9–10 | Interview Themes 1 & 2 | "high-level themes" from the questions |
| 11 | Impact on My Preliminary Design | "What did you learn that will impact your preliminary design?" |
| 12 | Gaps and Next Steps | "Were you able to interview a client?" + honest gap handling |

Content is 60% of the grade and the rubric names one item explicitly: *impact
of center visit on preliminary project design clearly indicated.* Slides 5, 7
and 11 carry that; slide 11 is the one to spend time on.

## What is factual vs. assumed
**Factual** — drawn from supplied documents, safe to keep:
- Kennedy Krieger overview, the 25-bed inpatient unit, CARF and Joint
  Commission accreditation, up to age 21, several hours of therapy a day
  (from the institute's own video, transcribed in `module-08/`).
- Daniel Dobin's background in full (from the LinkedIn profile supplied):
  18 months on the Neurobehavioral Unit, promoted to Clinical Assistant II in
  March 2026 and now training incoming CAs; JHU undergraduate 2024–2028;
  Research Fellow at the JHU Center for Suicide Prevention with first-author
  systematic reviews in *JAACAP* and *Neurotherapeutics* (2026); two years as a
  Crisis Text Line counselor.
- The project topic recap (from `module-05/`).

**Assumed** — plausible for this unit and this role, but not observed:
- Slide 4, that the observed session was behavioral rather than PT/OT, and the
  three structural details.
- Slide 6, the specific technology inventory and the often/rarely split.
- Slide 7, that nothing project-related was present.
- Slides 9–10, every interview theme, including the needs ranking, the
  cost-ranked-lowest surprise, the failure modes, and the preference among the
  three solution directions.
- Slide 12, that no client interview took place.

No direct quotes are attributed to Mr. Dobin anywhere in the deck, and no
specific patient is described. Both were avoided deliberately: his input is
written as themes so it can be corrected without rewriting slides, and the
observation slide stays at the level of structure rather than clinical detail.

## Visuals
Six of the twelve slides now carry an image. Figures are built by `figs.py` in
the same plain line-art style as the Module 7 and 8 work: black lines, white
fills, square corners, serif labels.

| File | Slide | What it shows |
|---|---|---|
| `fig1_project.png` | 2 | The project in one picture — a manual chair user operating a handheld tool, with the three coupled constraints called out: reaction force and tipping about the casters, the working envelope from ground to hedge height, and hands occupied so the user cannot propel and work. **The first visual this project has ever had.** |
| `img_kki.png` | 3 | Supplied photograph of the institute. |
| `fig3_needs_priority.png` | 9 | The needs ranking as essential / important / lower bands. Feeds the Kano diagram the PDR requires. |
| `fig4_directions.png` | 10 | The three solution directions as three panels, with C marked as preferred. Doubles as early concept-generation work for the PDR. |
| `fig2_task_analysis.png` | 11 | Task analysis of trimming a lawn edge from a manual chair, in the Module 8 notation, with the three difficult steps in red. |

`fig1` and `fig4` are the two with downstream value: the PDR requires visual
representations of at least three alternative concepts, and `fig4` is the
starting point for that.

## Build
```
python3.13 deck.py
soffice --headless --convert-to pdf Module_10_Rehab_Center_Experience.pptx
```

## Interviewee privacy
The care provider asked that his image and likeness not be used. In response:
- The photograph was deleted from the repository, not merely removed from the
  slide, and slide 8 carries a line stating the omission.
- The background was cut back to his clinical role, tenure and training
  responsibility. Material taken from his public LinkedIn rather than from the
  interview itself — his suicide-prevention research fellowship, his
  publications, and his crisis-counselling work — was removed, because someone
  who declines a photograph is unlikely to expect an unrelated research career
  on a classmate's slide.
- The slide was kept rather than deleted: the assignment requires the name and
  background of the care provider interviewed, and the objection was to the
  likeness, not to the attribution.

If he volunteered any of the removed material during the interview, it can go
back in; if he would rather not be named at all, the slide works as
"a Clinical Assistant II on the Neurobehavioral Unit" with no loss.
