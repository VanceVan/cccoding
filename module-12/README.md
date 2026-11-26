# Module 12 — Decision Making and Concept Selection

EN.585.617.81.FA26 Rehabilitation Engineering

## Deliverable
`Module_12_Assignment_Decision_Making.docx` / `.pdf` — 4 pages. Adapted from
Dieter & Schmidt Question 7.6: on/off switch for a right-angle drill used by
people with limited hand range of motion following stroke.

| Part | Rubric | Where |
|---|---|---|
| A — criteria (>5) | 20% | Table 1, nine criteria: six user, three engineering |
| Extra credit — Concept E | up to 10 pts | Figure 1 + description |
| B — Pugh chart, A as datum | 20% | Table 2 (round 1), Table 3 (round 2) |
| C — weighted matrix + comparison | 30% | Table 4, then *Comparing the Two Results* |

## Result
- **Pugh round 1 ties D and E at +2**; B and C are both −2.
- **Round 2 with E as the datum breaks the tie** — nothing beats E (D −2, A −2,
  B −3, C −3). Concept E is the Pugh selection.
- **Weighted matrix: E 4.09, D 3.78, A 3.44, B 3.09, C 2.98.**

## Concept E
Trigger replaced by a full-length compliant palm bar (actuates anywhere along
it, ~3 N over-centre), a second detent that latches ON so no sustained squeeze
is needed, a presence pad on the back of the grip that drops the latch when the
palm leaves, and a detented REV/OFF/FWD thumb wheel with OFF at the centre.
Costs: new housing, a linkage, a sensor and a control board — scored 1 on
manufacturability and 2 on cost.

## The argument that carries the grade
The interesting content is in *why the two methods disagree*:
1. Pugh counts criteria, it does not weigh them.
2. **Pugh zeros hide the datum's own weaknesses.** Five of D's nine entries are
   zeros, and the datum itself rates 2/5 on sustained-hold demand, so D inherits
   that weakness with no penalty recorded. The absolute scale of the weighted
   matrix charges it.
3. Pugh cannot rank the datum. The matrix puts A third — two of the four given
   concepts are worse than the switch they were drawn to replace.
4. The B/C split of 0.11 (≈4%) is noise and is explicitly **not** claimed as a
   difference.
5. Sensitivity: drop sustained-hold demand and renormalise and the ranking
   inverts (D 4.11, E 3.92). The whole recommendation rests on that one
   criterion, which is stated rather than hidden.

## Build
```
python3.13 figs.py   # fig1_concept_e.png
python3.13 calc.py   # prints weights, both Pugh rounds, weighted totals
python3.13 doc.py
soffice --headless --convert-to pdf Module_12_Assignment_Decision_Making.docx
```
`calc.py` holds the ratings, the importance ranking and all arithmetic. The Pugh
signs are **derived from the same 1–5 ratings** used in the weighted matrix, so
the two tables cannot contradict each other: every + is a rating above A's,
every − below, every 0 equal.

## Rest of the module
The module overview also lists the final presentation, the end-of-semester quiz,
the readings and the lectures. Only the written assignment is produced here.
