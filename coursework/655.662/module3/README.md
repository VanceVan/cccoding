# Module 3 — Baseline and Operational Needs-Requirements

## Objectives

1. Delineate the systems engineering lifecycle initial conditions & SEMP.
2. Demonstrate the purpose of **operational needs** in the system lifecycle.
3. Demonstrate the purpose of **operational requirements** in the system lifecycle.
4. Articulate the development of a **system concept**.
5. Show systems thinking organizational challenges and opportunities.
6. Define awareness level concepts of requirements definition (INCOSE).
7. Define how systems engineering is applied (INCOSE).
8. Identify aspects of systems engineering in practice (INCOSE).

## Readings

- Senge ch. 4 & 5 (the laws of the fifth discipline; the shift of mind)
- Kossiakoff et al. ch. 5 & 6
- INCOSE SEH 5th ed. §§2.3.5.2, 2.3.5.3, plus a word search on "requirements"

## To-Do

1. Review the instructional materials and readings.
2. Complete the **two written assignments** (due Day 7).
3. Submit the initial post for **M3D1: Chapter 4, 5th Discipline**.
4. Complete and submit **INCOSE quiz #3**.
5. Attend the synchronous session.

> **Count discrepancy.** The to-do says *two* written assignments, but three
> file-upload assignments exist (M3A1, M3A2, M3A3), each worth 10 points. M3A3
> shares its prompt with the M3D1 discussion, so the to-do may be treating them
> as one item. Worth confirming with the instructor; assume all three are due.

## Assignments

### M3A1: Op Needs for RCS — 10 pts, 2 pages, file upload
Develop **5 operational needs** and **5 operational requirements**, identifying
any **KPP candidates**.

Rubric ladder — 9 pts is "clear and relevant… well-defined, specific, aligned";
**10 pts requires each to be "clearly stated, measurable, and relevant"** with
strong command of the needs-vs-requirements distinction. Measurability is the
discriminator between 9 and 10. Satisfies objectives 1–3.

### M3A2: RCS System Concept — 10 pts, 2 pages, file upload
Develop a **system concept** with **three use-cases/scenarios** and an
**accompanying picture/diagram**.

10 pts needs "a professional, well-labeled diagram that integrates seamlessly
with the narrative" and "coherent alignment between concept, scenarios, and
visual representation." So the diagram must be referenced by the prose, not
merely attached. Satisfies objective 4.

### M3A3: Chapter 4 Concept — 10 pts, 2 pages, file upload
Select **1 concept from Chapter 4** of *The Fifth Discipline* that best
describes the major issue in healthcare, and explain why.

This rubric is far more demanding than the others. 10 pts requires: a coherent
causal narrative (or concise verbal CLD) showing **loops, delays, and policy
resistance**; short-term vs. long-term effects distinguished; **testable
measures** and a **high-leverage intervention** with where it acts and its
anticipated second-order effects; assumptions surfaced explicitly; and
optionally a named **systems archetype** (Fixes That Fail, Shifting the Burden,
Limits to Growth). Satisfies objective 5.

### M3D1: Chapter 4 — discussion, 6 pts initial + 4 pts replies
Same prompt as M3A3 **plus** "what suggestions could you introduce or implement
to fix it?" Initial post due Day 7 of Module 3; two peer replies due Day 7 of
Module 4.

> M3A3 and M3D1 overlap heavily. The discussion adds the remedy question, and
> the paper demands the deeper causal analysis. They should share a thesis but
> not share prose.

**Chapter 4 is "The Laws of the Fifth Discipline"** — the eleven laws reproduced
on slide 28 below.

## Status

| Item | Status |
|---|---|
| Overview, objectives, to-do | ingested |
| Readings list | ingested |
| Slide deck (31 pp) | ingested |
| M3A1 / M3A2 / M3A3 / M3D1 prompts and rubrics | ingested |
| Lecture transcripts | **uploaded as 0-byte files — need re-export** |
| Senge ch. 4–5, Kossiakoff ch. 5–6 | not supplied |

## Key content from the deck

### SE method vs. SE lifecycle (slides 8–9)

The systems engineering method **is not** the systems lifecycle. It complements it, is
**repeated at every phase** of the lifecycle, and matures the system as it goes. The three
passes are: mature system concept → develop system design → field operational system.

### SEMP (slide 10)

Systems Engineering Management Plan: defines the technical approach; aligns with project
objectives; identifies roles and responsibilities; supports risk, verification and validation;
and is a **living document** that evolves with scope and priorities.

### Needs, opportunities, requirements (slides 12–13)

Two input types drive the baseline:

- **Operational Deficiency / Systems Need** — e.g. "Need for clinician to monitor patient
  cardiac and device status daily without an in-office visit."
- **Technical Opportunity** — e.g. "Cardiac miniaturization and safe Bluetooth accuracy,
  reliability, with well characterized signals and enabling infrastructure."

**Operational Requirements** are written as "The system shall…" statements, e.g. "The system
shall provide clinical staff with 10 selectable cardiac measures and 5 device and 3 system
status measures."

### MOE vs. MOP (slide 14) — the distinction to get right

| | Operational Requirements → **MOE** | Systems Requirements → **MOP** |
|---|---|---|
| Point of view | **Clinician's** | **Developer's** |
| Type | Qualitative *or* quantitative | Quantitative only |
| Scope | Overall system performance | Specific system attribute |
| Level | System level | **Below** system level |
| Measures | Ability to achieve objectives | Attribute performance |

### KPPs (slides 15–16)

Critical system attributes that **must** be met. They define minimum acceptable performance
and the desired operational goal; changes to them significantly impact performance, cost, and
schedule. **Rule of thumb: no more than 5 or 6.**

His notional KPP set is the template to imitate — each is a named parameter with a
quantified "shall" statement:

- Data Latency — data to clinical staff within 1 second
- Operational Availability (A₀) — 0.95
- Data Throughput — no less than 8–12 bits at 128–256 Hz
- Clinical Data Access Time — within 1 minute after login
- Clinical Set-up Time — operational state within 3 minutes
- Patient Set-up Time — set up and confirm within 1 minute

### Scenario development (slide 17)

A short prose vignette pinning down patient, capability, care setting, support, and
infrastructure. His example: *"92-year-old female patient with a pacemaker who is mobile, has
no other medical history, is not technologically skilled, but is able to care for herself with
some assistance. She will have home-based care with a care-provider who is a relative. The care
provider is a nurse who can interpret much of the medical nuances. The patient lives in a safe
neighborhood with stable infrastructure and easy access."*

### The integrated flow (slide 19) — the spine of this module

```
Scenarios ──Activities──▶ Operational Needs
                               │ Gaps
                               ▼
Scenarios ──Baseline CONOPs──▶ CONOPs &  ◀──Feedback── Operational Requirements
        ◀──Updated CONOPs───  Feasibility ──Feedback──▶ Technical Opportunities
                               ▲                              │
                               └──MOEs/MOPs, Features & Capabilities──┘

Operational Requirements ──clinical "must haves", "shall" statements, MOEs──▶ CONOPs
```

Needs come from scenarios; gaps turn needs into requirements; requirements and technical
opportunities both feed CONOPS and feasibility; everything loops back.

### Senge's heuristics (slide 28) — "getting it right upfront"

Today's problems come from yesterday's solutions · The harder you push, the harder the system
pushes back · Behavior grows better before it grows worse · The easy way out usually leads back
in · The cure can be worse than the disease · Faster is slower · Cause and effect are not
closely related in time and space · Small changes can produce big results, but the areas of
highest leverage are often the least obvious · You can have your cake and eat it too, but not
at once · Dividing an elephant in half does not produce two small elephants · There is no blame

Slide 29: the shift of mind is **seeing interrelationships rather than linear cause-effect
chains**, and **seeing processes of change rather than snapshots**.

### Take-aways (slide 30)

SE starts with identifying an operational deficiency; technology opportunities enable it; needs
and requirements set the stage; systems thinking yields more comprehensive solutions.

## Why this module matters for the final project

The individual final requires 3 use cases, **5 operational needs**, **10 requirements**, all
KPPs identified, and a CONOPS. Module 3 is where that work begins — whatever is produced here
should be written so it can be carried forward and expanded rather than redone.
