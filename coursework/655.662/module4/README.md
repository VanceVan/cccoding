# Module 4 — Functional Construction and Analysis

Dates: 9/29/26 – 10/5/26. Topic per the course outline: **Functional
Construction and Analysis**.

> The module discusses how to translate system problems into functional terms
> for qualitative and quantitative analysis. Definitions of functions along with
> functional diagramming and analysis will be shown in this module. Additionally,
> trade-study construction will be done to help determine component and systems
> selection, leveraging functional analysis. This module will conclude by
> discussing system archetypes to help frame system solutions.

## Objectives

1. Delineate the **definition of functions**.
2. Enumerate the **purposes of functions**.
3. Develop a **system functional diagram**.
4. Develop an accompanying **N² diagram**.
5. Demonstrate the **steps of a trade-study**.
6. Demonstrate the **purpose of system archetypes**.

## Readings (from the course outline)

- *The Fifth Discipline* ch. 6–7 — "Nature's Templates: Identifying the Patterns
  That Control Events" and "Self-Limiting or Self-Sustaining Growth." These are
  the **systems archetypes** chapters, which is where objective 6 comes from.
- Kossiakoff, *Systems Engineering Principles and Practice*, ch. 7, 8, **and 11**.

## To-Do

1. Review the instructional materials and readings.
2. Complete the **two written assignments** (due Day 7).
3. **Respond to a peer's post for M3D1: Chapter 4 – 5th Discipline.**
4. Attend and participate in the synchronous session.

> **No INCOSE quiz this module.** The course outline lists "INCOSE Handbook
> Reading & Quiz" under Modules 1, 2, 3 and 6, but not under Modules 4 or 5.
> Quiz #4, if it exists, belongs to Module 6.

> The M3D1 peer replies are carried here, not in Module 3 — initial post was due
> Day 7 of Module 3, replies Day 7 of Module 4. Two replies are drafted
> (Pei-Jung Hsieh, Yuhao Hu).

## Assignments

### M4A1: Functional Diagrams — **20 pts**, 2 pages, file upload

> Develop a **Level 1 Functional Diagram** of your Remote Care System and an
> **accompanying N² diagram**.

Rubric ladder:

| Pts | Level | Criteria |
|---|---|---|
| 0–5 | None | Missing or irrelevant diagrams |
| 6–11 | Limited | Both present but incomplete; functional diagram **lacks clear system boundary, major functions, or proper flow depiction**; N² missing key interfaces or **not aligned** with the functional diagram |
| 12–16 | Fair | Generally accurate; may lack full clarity; N² has inconsistencies or omissions |
| 17–18 | Good | Complete and well-structured; boundary, major functions and flows clear; N² **aligns** with the functional diagram, clear labeling |
| **19–20** | **Excellent** | "Fully developed, clear, and professional… functional diagram is precise, complete, and well-labeled with **correct flows and boundaries**. N² diagram **perfectly aligns** with functional diagram, showing **all** functions and **all** relevant interfaces with proper labeling." |

**The discriminator is alignment.** Every function box in the functional diagram
must appear on the N² diagonal, and every arrow in the functional diagram must
appear as a labeled off-diagonal cell. Any mismatch drops it to 17–18 or below.

Satisfies objectives 1–4.

### M4A2: Trade Study Elements — **40 pts**, 4 pages, file upload

> Develop and conduct a trade-study for **one element** of your Remote Care
> System demonstrating **ALL 12 steps** of the trade-study construction process.

Rubric ladder is literally counted by steps addressed:

| Pts | Level | Criteria |
|---|---|---|
| 0–10 | None | Fewer than 4 of 12 steps; no clear healthcare connection |
| 11–20 | Limited | 4–7 steps; vague alternatives or criteria |
| 21–30 | Fair | 8–10 steps; some data or analysis steps missing |
| 31–35 | Good | All 12 steps with good detail; minor gaps |
| **36–40** | **Excellent** | "Fully addresses **all 12 steps** with complete and clear detail. Alternatives, criteria, and results are thorough and well-supported. Strong, relevant application to the remote care system." |

Satisfies objectives **5 & 6** — so the paper is expected to touch **system
archetypes** as well as the trade-study mechanics.

This is the largest single assignment so far (40 pts; M4A1 is 20, every Module 3
assignment was 10).

## Trade-study template (both spreadsheets decoded)

Identical layout; one is blank, one is a worked exemplar. Structure:

| | Wt. | Alt 1 | | | Alt 2 | | | … |
|---|---|---|---|---|---|---|---|---|
| **Criteria** | | Raw Score | Utility Value | Weighted Utility Value | Raw Score | Utility Value | Weighted Utility Value | |
| Criterion 1 | w₁ | r | u | **w₁·u** | … | | | |
| Criterion 2 | w₂ | | | | | | | |
| Criterion 3 | w₃ | | | | | | | |
| Criterion 4 | w₄ | | | | | | | |
| **Operational Utility Function** | | **Σ weighted utility** | | | | | | |
| **Cost ($) unit cost** | | | | | | | | |
| **Cost-Effectiveness Selection Function** | | **(Σ / cost) × 100** | | | | | | |

Mechanics worth copying exactly:

- Four criteria, four alternatives.
- **Raw score** is the measured value in natural units (minutes, dollars, a
  count). **Utility value** is that raw score mapped onto 0–1. They are separate
  columns on purpose — the mapping from raw to utility is a modeling decision the
  paper has to justify.
- Weighted utility value = `Wt × Utility Value`.
- Operational Utility Function = sum of the weighted utility values.
- Cost-Effectiveness Selection Function = `(Operational Utility / Unit Cost) × 100`.
  (The blank template omits the ×100; the exemplar includes it. Use the exemplar.)

**The exemplar's point, worked out:**

| | Alt 1 | Alt 2 | Alt 3 | Alt 4 |
|---|---|---|---|---|
| Operational Utility | 0.687 | 0.673 | **0.904** | 0.743 |
| Unit Cost | 250 | 300 | 700 | 500 |
| Cost-Effectiveness | **0.275** | 0.224 | 0.129 | 0.149 |

Alternative 3 wins on utility; Alternative 1 wins on cost-effectiveness. The
template is built to make utility and cost-effectiveness disagree. A strong
submission names that disagreement and says which function governs the decision
and why.

The assignment text calls these "trade-study template **for sensitivity
analysis**," but neither file contains a sensitivity tab. Sensitivity therefore
has to be built: re-run the weighted sum under perturbed weights and report
whether the ranking is stable.

## What is missing

| Item | Status | Cost of not having it |
|---|---|---|
| **The instructor's 12-step trade-study process** | **RESOLVED** — in the Module 4 deck, slide 22; reproduced below | — |
| Module 4 slide deck | **supplied** (IHSE-Module4-INCOSE, 63 pp) | His Level 1 functional diagram conventions. Module 1's context diagram had a house style (bare labels, black box) that mattered; the same is likely true here. |
| Module 4 lecture transcripts | not supplied | Secondary — the deck has usually carried the content. |
| Kossiakoff ch. 7, 8, 11 | not supplied | Ch. 7 is functional analysis; ch. 11 is likely where the trade-study material lives. Workable without, but the vocabulary may not match his. |
| Senge ch. 6–7 | not supplied | Needed for objective 6 (archetypes) if M4A2 must address it. |

**M4A1 can be built right now** — the functional decomposition follows from the
PD-RPM system concept already locked in M3A2, and functional/N² diagram
conventions are standard enough not to need the deck. M4A2 should wait for the
12-step list.

## Carry-forward from Module 3

The M3A2 system concept defines the elements this module turns into functions:

| M3A2 element | Becomes (Level 1 function) |
|---|---|
| A1 PD Cycler *(external)* | source of treatment data, outside the boundary |
| A2 Vitals Peripherals, A3 Patient App | **Acquire Patient and Therapy Data** |
| A4 Home Gateway | **Buffer and Forward Data** |
| T1 Secure Transport | **Transport Data Securely** |
| M1 Data Ingestion | **Ingest and Normalize Data** |
| M2 Trending & Analytics | **Analyze Trends** |
| M3 Alert Logic | **Evaluate Against Thresholds** |
| M4 Triage Queue | **Present and Prioritize for Review** |
| M5 Escalation | **Notify and Escalate** |
| U1–U3 Care Team | clinical decision, outside the boundary |
| T2 EHR *(external)* | external interface, outside the boundary |

Boundary decisions stay as locked in CONVENTIONS.md: cycler out, EHR out,
clinical decision authority out.

## Why this module matters for the final project

The individual final report requires, among eight items:

- **item 4** — System Architectures: Operational (1), **Functional (2)**, Physical (2),
  with interfaces and information support
- **item 5** — Frame, develop and conduct **trade-studies for two (2) key system
  components**

M4A1 produces one of the two required functional architectures; M4A2 produces one
of the two required trade studies. Both should be written so they can be lifted
into the final report and extended rather than redone.

## RESOLVED — the instructor's 12 steps (IHSE-Module4-INCOSE deck, slide 22)

1. Define Objectives and Requirements
2. Identify Alternatives (at least 3)
3. Formulate Selection Criteria
4. Weight the Criteria
5. Collect Data
6. Prepare Utility Functions
7. Evaluate Alternatives
8. Perform Sensitivity Check
9. Make Necessary Adjustments
10. Select Preferred Alternative
11. Document Decision
12. Execute Decision

### Non-negotiable rules the deck states outright

- **Cost is NOT a selection criterion.** "In this course (and the HSE program), we
  do not use cost as a selection criterion; we incorporate cost differently" —
  i.e. only through the cost-effectiveness selection function.
- **Weights may not be subjective.** Use the Analytical Hierarchy Process or the
  **Nth-root pairwise comparison** (1–9 importance scale, N x N matrix with 1s on
  the diagonal and reciprocals below it, row products, Nth root, normalize).
  "Weights are not ranks. Do not use ranking (1, 2, 3, ...) here."
  - If one criterion exceeds 50%, redo the pairwise comparison.
  - If a criterion is under ~0.03, consider dropping it.
- **Every criterion must trace to a requirement.** "If there is no corresponding
  requirement, then at least one new requirement must be created to represent the
  selection criterion."
- Good criteria: trace to requirements, relate to the study's purpose, be
  unambiguous with units, differentiate meaningfully, be measurable, have data for
  every alternative, be independent of each other, be universally understood.
- **Step 5 KPP rule:** "If the requirement is a KPP, the alternative MUST be within
  the threshold range." A non-KPP shortfall "may disqualify the alternative, but
  the alternative may have value nevertheless."
- **Step 6:** utility functions translate raw values (with units) to a unitless
  0–1 score and let stakeholders assign utility across the range. Linear if you
  have no information; nonlinear if you do; negative slope where less is better.
  Anchors come from a requirement, stakeholder input, or the min/max across the
  domain of possible alternatives.
- **Step 8 method:** "At a minimum, sequentially *zero out* each criterion weight
  and recalculate results." Insensitive is good.
- **Step 9:** "Decision Makers make decisions, not trade studies." Don't force a
  decision; if alternatives are indistinguishable, say so.

### Objective 6 — the archetype section he expects

The deck closes with "5th Discipline Systems Analysis," a five-step frame applied
to two archetypes:

1. Analyze Problem
2. Conceptualize any Growth Limits *(Archetype 1: Limits to Growth)* /
   Conceptualize any Burden Shifting *(Archetype 2: Shifting the Burden)*
3. Conduct Mental Exercises with System
4. Catalogue Key Variable Factors
5. Investigate Solution Options

## His functional-diagram conventions (slides 7–15) — M4A1 RISK

The deck's Level 1 functional diagram is **the Module 1 context diagram with the
functions drawn inside the black box**, not a separate boundary diagram:

- The ICOM frame is retained: inputs on the left (Patient, Healthcare Provider,
  Daily Activities), outputs on the right (Patient Cardiac Vitals, Monitoring
  System Status, Data Analytics), **controls across the top** (Health Policies,
  Health Laws, Infrastructure Regulations), **enablers across the bottom**
  (Infrastructure, Geography, Personnel).
- Functions are **VERB-NOUN** and numbered plainly — "1. Receive Cardiac Data",
  "2. Transfer Cardiac Data" — not "F1.0".
- His Level 1 example has **twelve** functions, so his "Level 1" is finer-grained
  than a six-function decomposition.
- **Arrows are labeled with NOUNS** (the data object), and the output noun of one
  function is the input noun of the next: "Raw Cardiac Data", "Packaged Cardiac
  Data", "Transmitted Cardiac Data".
- His N2 places the same numbered functions on the diagonal with the flow **noun**
  in each off-diagonal cell, and the external entities wrapped around the edges.
- He also shows a function-to-requirement traceability matrix (F2.1 x R1.1 with X
  marks) and one level of sub-function decomposition (2.1, 2.2, 2.3, 2.4).

> **As delivered, M4A1 is methodologically sound but does not follow this house
> style.** It uses F1.0-style numbering, a standalone boundary box rather than the
> context-diagram frame, no controls/enablers bands, six coarse functions, and
> numbered flow badges rather than noun-labeled arrows. Given that Module 1's
> context diagram had to be redone in the instructor's style, M4A1 should probably
> be redrawn the same way.
