# Module 5 — Architecture Development Tools and Risk

Dates: 10/6/26 – 10/12/26.

> This module will introduce the topic and concepts of architectures and their use
> in systems engineering from both a JHU and INCOSE perspective. Coupled with
> architectures will be the introduction of architecture frameworks… This module
> will also introduce the concept and approach for risk and risk management…
> Finally, this module will discuss systems thinking approaches for developing
> personal and mental models for system conceptual development.

## Objectives

1. Characterize **system architectures**.
2. Characterize **system architecture frameworks**.
3. Enumerate systems engineering **risk management tools and processes**.
4. Use **personal mastery** in systems conceptual development.
5. Use **mental models** in systems conceptual development.
6. Define awareness level concepts of **architecture definition** (INCOSE).
7. Define awareness level concepts of **risk and opportunity management** (INCOSE).
8. Define how systems engineering is applied (INCOSE).
9. Identify aspects of systems engineering in practice (INCOSE).

## Readings

- Senge, *The Fifth Discipline*, **ch. 8 & 9** — Personal Mastery and Mental Models.
- Flanigan, Seymour, Biemer & Kossiakoff, *Systems Engineering Principles and
  Practice* (3rd ed.), **ch. 9, 10 & 12**.
- INCOSE SEH 5th ed., **§2.3.5.4** (System Architecture Definition) and **§2.3.4.4**
  (Risk Management), plus a word search on "architecture" and "risk".

## To-Do

1. Review the instructional materials and readings.
2. **Begin working on the Final Team Project assignment, to be introduced by the
   instructor this module.**
3. Complete the **two written assignments** (due Day 7).
4. Complete and submit **INCOSE quiz #4**.
5. Attend and participate in the synchronous session.

> **Correction to the Module 4 note.** The course outline does not list an INCOSE
> quiz under Module 5, but the Canvas to-do does. The Canvas page is authoritative:
> **quiz #4 is this module.**

## Lecture videos (8 segments, ~73 min)

| | Title | Length |
|---|---|---|
| 5A | Objectives — Architecture Development Tools and Risk | 02:14 |
| 5B | Architecture Constructs, Part 1 | 11:27 |
| 5B | Architecture Constructs, Part 2 | 10:59 |
| 5C | Architecture Descriptions | 11:05 |
| 5D | Risk Strategy and Approach, Part 1 | 09:35 |
| 5D | Risk Strategy and Approach, Part 2 | 12:15 |
| 5E | Risk Management Approach | 09:14 |
| 5F | 5th Discipline Materials & Take-Aways | 06:06 |

## Deck content map (IHSE-Module5-INCOSE, 41 slides)

### Architecture — the definition he uses (slide 7)

> "The structure of components, their relationships, and the principles and
> guidelines governing their design and evolution over time."
> — **C4ISR Architecture Framework, Version 2.0**

He repeats this definition clause by clause on each of the three view slides, so
the clauses are the organizing idea, not decoration.

### Framework / model / view / viewpoint (slide 9) — four distinct terms

- **Architecture framework** — an encapsulation of a minimum set of practices and
  requirements for artifacts that describe a system's architecture.
- **Models** — representations of how objects in a system fit structurally in and
  behave as part of the system.
- **Views** — a partial expression of the system from a particular perspective.
- **Viewpoint** — a set of representations (views and models) of an architecture
  that covers a *stakeholder's* issues.

### The three architecture views (slides 10–13) — the spine of the module

| View | Definition | DoDAF products he cites |
|---|---|---|
| **Operational** | viewing the system from how the **operational stakeholders interact** with the system | **OV-1** |
| **Physical** | viewing the system from the **physical elements and their interfaces** | **SV-1 / SV-2 / SV-6** |
| **Functional** | viewing the system from the **activities performed through functions and interactions** | **OV-5, SV-4 / SV-10** |

M4A1 already produced the functional view. The final project needs Operational (1),
Functional (2) and Physical (2).

### MBSE and digital engineering (slides 14–17)

MBSE benefits: improved traceability, enhanced communication, early error
detection, faster design iterations, consistency across lifecycle, support for
complex systems, better tool integration.

Digital engineering cons he names explicitly: high initial investment, legacy
integration, model management complexity, data governance and security burden,
vendor lock-in.

What MBSE lets you do (slide 17): develop consistent architectures, design
traceable sequences, define repeatable interfaces, display different modes,
articulate data flows.

### INCOSE architecture (slides 19–22)

> The purpose of the **System Architecture Definition** process is to **generate
> system architecture alternatives, select one or more alternative(s)** that address
> stakeholder concerns and system requirements, and **express this in consistent
> views and models**.

Core architecture processes are drawn from **ISO/IEC/IEEE 42020 (2019)**.
Architecture Definition focuses on essential concepts, properties, structure,
behaviors and features; **Design Definition** is the separate, more detailed
process that makes realization possible.

### JHU risk (slides 24–31)

- Risk management is **continuous and forward-looking**, and is **both a project
  management and a systems engineering process**.
- The sequence is lettered A → B → C → D: **A Risk Identification → B Risk
  Assessment → C Strategy Selection → D** (burn-down over time).
- **5 × 5 likelihood × consequence matrix**; **RF = L × C**.
  - **High (Red)** — unacceptable, major disruption likely, different approach
    required, priority management attention.
  - **Moderate (Yellow)** — some disruption, different approach may be required.
  - **Low (Green)** — minimum impact, minimum oversight.
  - Color is described as "the third dimension in the cube."
- Ownership by zone (slide 27): Ignore (no monitoring) · Risk Watch List
  (periodically monitor) · Risk Watch List (continuously monitor) · **Risk Action
  List — IPT** (periodic mitigation) · **Risk Action List — SE** (active mitigation
  and verification) · **Risk Mitigation Execution List — Executive** (continuous
  mitigation and verification).
- **Handling strategies (JHU, five):** Avoidance (select a concept without the
  risk, usually by relaxing requirements) · Acceptance/Assumption · **Monitor** ·
  Transfer · Control/Mitigation.

#### The risk statement format he requires (slide 30)

> "A common (and preferred) method to describe a risk is via the use of the
> **IF-THEN** statement: **IF \<likelihood\>, THEN \<consequences\>**"

His worked risk register entry has these fields, and a submission should mirror them:

| Field | His example |
|---|---|
| Risk Title | Command Center Loses Power |
| IF-THEN | IF the desktop transceiver unit experiences a drop in power for more than 10 pacemaker emit cycles, THEN the data relay function to the cell towers will cause erroneous readings at the clinical station. |
| Description | why the two units being in sync matters, and what going out of sync causes |
| Initial Assessment | Likelihood **4**, Consequences **5**, plus a prose *Description of Consequences if realized* |

Slide 31 then shows the **risk burn-down**: the same risk plotted on the matrix at
INITIAL, then at points 1–4 as each mitigation action lands, against a time axis.
His three actions were "Redesign of desk unit electronics & algorithms,"
"48-hour battery backup in desk unit," "Update algorithms at clinical receiving
station." A strong risk deliverable shows that burn-down, not just a static score.

### INCOSE risk (slides 33–36)

> The purpose of the **Risk Management** process is to **identify, analyze, treat and
> monitor** the risks continually.

A **risk management plan (RMP)** is tailored in the Project Planning process. Treatment
approaches are established for **moderate- and high-risk items**. INCOSE names **four**
(not five — no "Monitor"): **Acceptance, Avoidance, Control (or Mitigation),
Transference.**

> Watch this in quiz #4 — JHU lists five handling strategies and INCOSE lists four.
> The distractor pattern in quizzes #1–#3 was a correct sentence with one word
> inverted or a negation spliced in; a count mismatch is an easy trap.

### Fifth Discipline (slides 38–39)

- **Personal Mastery** — a special sense of purpose behind vision and goals; a
  vision is *a calling rather than simply a good idea*; they see **current reality as
  an ally, not an enemy**; deeply inquisitive; live in a continual learning mode and
  never "arrive." Personal mastery is **a process, not a possession**.
- **Mental Models** — "deeply ingrained assumptions, generalizations, or even
  pictures and images that influence how we understand the world and how we take
  action." They determine what approach someone uses to solve problems, and are
  strongly linked to background and prior experience.

### Take-aways (slide 40)

Architectures are critical for system conceptual development; architectures
illuminate different stakeholders' views; frameworks house architectures for
consistent system definitions; MBSE is a critical tool; risk strategy, management
and mitigation approaches; personal mastery and mental models are key to systems
conceptual development.

## Status

| Item | Status |
|---|---|
| Overview, objectives, to-do | ingested |
| Readings list | ingested |
| Slide deck (41 pp) | ingested |
| Lecture video list | ingested (videos themselves not supplied) |
| **The two M5 written assignment prompts and rubrics** | **not supplied** |
| **INCOSE quiz #4** | **not supplied** |
| Team Final Project assignment | the course-level PDF is already in the corpus; the instructor's Module 5 introduction of it is not |
| Senge ch. 8–9, Kossiakoff ch. 9/10/12 | not supplied |

**Nothing is buildable yet.** Unlike Module 4, where M4A1 followed from work already
done, both Module 5 assignments are unknown — the deck supports architecture views,
an architecture framework discussion, a risk register with IF-THEN statements and a
burn-down, or a Senge personal-mastery/mental-models paper, and those are very
different deliverables. Send the two assignment prompts and I can start immediately;
everything else needed is in hand.

## Carry-forward

| Already produced | Feeds |
|---|---|
| M1A2 context diagram | Operational Architecture View (OV-1) |
| M4A1 Level 1 functional diagram + N² | Functional Architecture View (OV-5, SV-4/10) |
| M3A2 system concept, M4A2 selected gateway (A2) | Physical Architecture View (SV-1/2/6) |
| M4A2 risks named in Steps 9 and 12 (coverage shortfall, re-trade trigger) | first entries in a risk register |

## Why this module matters for the final projects

Both finals require **System Architectures: Operational (1), Functional (2),
Physical (2), with interfaces and information support**, and the team final
additionally requires **Risks for Design (1), Integration (1), Testing (1), and
Operations (1) with mitigation plans**. Module 5 is where both are taught, so
anything built here should be written to be lifted into the final report.
