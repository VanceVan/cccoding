# Module 6 — Advanced Development: Transitioning from Concept to Design

## M6A1: Problem Set
`M6A1_Problem_Set_Advanced_Development.(docx|pdf)` — 2 pages, per the assignment limit.
Built by `m6a1.py`.

**Problem 13.2 (Flanigan, Seymour, Biemer & Kossiakoff, *Systems Engineering Principles and
Practice*, 3rd ed., Wiley, 2020):** "What specific activities in the advanced development phase
sometimes cause it to be referred to as a 'risk reduction' phase? Give an example of each
activity considering a real or hypothetical system."

The operative words are **"an example of each activity"** — the answer is structured as seven
activities, each with its own worked example, rather than one extended example.

### Activities and their paired examples
| # | Activity | Risk retired | Example |
|---|---|---|---|
| 1 | Requirements analysis and flow-down | Requirements | 40 ft comms range → power-up ≤5 s, ≤1 N force, 55 dB/2 Hz/200 ms chirp |
| 2 | Technology identification and maturation | Technology | TRL 9/7/9/7/6 across elements; risk sits in the integration |
| 3 | Prototyping | Feasibility, usability | Field prototype of transceiver + link in real homes |
| 4 | Modeling, simulation and analysis | Performance | Link-budget model vs. the 2× data-rate requirement |
| 5 | Trade studies | Selection | Cellular vs. home broadband vs. smartphone relay |
| 6 | Interface definition and developmental test planning | Integration, verification | 8-step staged build-up, one new unknown per step |
| 7 | Baselining the validated system specification | Baseline | Store-and-forward buffer added before baselining |

Activities 3 and 4 are deliberately paired: the model shows the data-rate requirement met, and
also shows what it *cannot* address (intermittent dropout in a specific home), which is what
justifies the field prototype.

### Remaining assumption
The team's own remote care system definition was not available, so the examples use the remote
cardiac monitoring system the Module 6 deck runs throughout — cardiac device, patient-home desk
transceiver, cellular link, clinical computer stack, clinical station.
