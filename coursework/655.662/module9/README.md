# Module 9 — Transition from Design to Initial Production

Roadmap position: **(9)** of 13, the first box in the **Post Development** band, after
(8) System Integration, Test and Evaluation and before (10) System Production.

> This module will discuss the critical transition from engineering development to post
> development… early transition strategies and activities that are part of concurrent
> engineering, along with team transitions for production, maintenance, and integrated
> logistics support. Stakeholder plans and reviews will be key focus area to ensure that
> final product configurations support end-user needs **technically, fiscally,
> logistically, and operationally**.

> Note: the roadmap on slide 2 of this deck renames box (7) to "Engineering Design and
> Software Development", dropping "Interfaces". Module 7's own deck called it
> "Interfaces, Engineering Design and Software Development". Harmless, but the decks
> disagree.

## Objectives

1. **Enumerate critical activities** for production transition.
2. **Articulate importance** of production transition in system success.
3. Describe production transition **team and review activities that will lower system risk**.
4. Explain importance of **transition strategic planning**.
5. Describe why **team learning** encourages successful transitions.
6. Define awareness level concepts for **transition** (INCOSE).
7. Define how systems engineering is applied (INCOSE).
8. Identify aspects of systems engineering in practice (INCOSE).

## Readings

- Senge, **ch. 14** — Strategies.
- **No Kossiakoff chapters this module** — the first module with none.
- INCOSE SEH 5th ed., **§3.1.7** (word search "Manufacturability/Producibility"),
  **§3.1.8** ("Reliability, Availability, Maintainability Engineering"), and
  **§3.1.9** ("Resilience").

## Deck content map (IHSE-INCOSE-Module9, 35 slides)

Shortest deck of the course, and the simplest structure: five JHU themes, three INCOSE
"-ility" disciplines, Senge, take-aways.

### The five JHU transition concepts (slide 7) — the spine

1. **Plan the transition early**
2. **Assemble the teams**
3. **Implement staged reviews**
4. **Train the manufacturing team**
5. **Maintain team morale**

Sources he credits (slide 8): Bralla, *Design for Manufacturability*; Boothroyd et al.,
*Product Design for Manufacture and Assembly*.

### Producibility (slide 9)

> **Producibility** — the degree to which a system or component **can be manufactured**.

Considerations: production of components · assembly of components · selection of
materials · selection of production processes · **cost estimations, "one of the major
measures of design for effective producibility."**

### Design for Assembly — DFA principles (slides 11–12)

- **Minimize part count**
- Design parts with **self-locating and self-fastening** features
- **Eliminate parts that don't serve primary functions** (functional analysis)
- **Minimize reorientation** of parts during assembly
- Design parts for **retrieval, handling and insertion** (visibility and ease of access)
- Emphasize **top-down assemblies**
- **Standardize parts**, minimum use of fasteners
- Encourage **modular design**
- Design for a **base part** to locate other components
- Design for **component symmetry** for insertion

### Design for Manufacturing — DFM considerations (slide 13)

- Define potential **manufacturing technologies**
- Select **materials** that meet the component's requirements
- **Match manufacturing technologies to component features** (material and geometry)
- Ensure the technology can produce components that meet requirements, **or adjust
  either or both**
- Evaluate and **minimize manufacturing costs** — "if a manufacturing process needs to
  be **invented**, cost will go high (ROI)"

### Interdependencies in producibility (slide 14)

A triangle whose vertices are **Material Properties**, **Manufacturing Processes** and
**Component Geometry**, with each edge labelled as a compatibility constraint:

| Edge | Constraint |
|---|---|
| Materials ↔ Processes | compatible materials and processes |
| Materials ↔ Geometry | compatible materials for geometry |
| Processes ↔ Geometry | compatible process for geometry |
| Centre | compatible materials and processes **for geometry** |

The point: you cannot choose any one of the three independently.

### Design for producibility and automation (slide 15)

Design must consider the capabilities **and limitations** of the automation technology
used: flexible robotic assembly, high-speed automated assembly, automated fabrication
(his examples: car assembly line, semiconductors, 3D metal printing). Plus **design
documentation**.

Slide 16 then puts the four together as the producibility quad: **DFA principles ·
DFM considerations · interdependencies in producibility · design for producibility and
automation.**

### Best practices — the critical activities list (slide 17)

This is the answer to objective 1 and the most assignment-ready slide in the deck:

- Manufacturing **test fixture software** development based on test fixture design
- Manufacturing **test fixture hardware** design and fabrication
- Manufacturing test fixture **verification and installation at the CM** (contract
  manufacturer) responsible for product assembly
- Create a **manufacturing test manual**
- Coordination of the **product packaging design**
- Create an **assembly guide**
- Perform **component engineering and hierarchical BOM management**
- Oversight of **regulatory testing**
- **Product validation testing**
- Oversight of **pilot production builds** as a transition to volume production

### Technical reviews (slide 18) — three, in order

1. **Critical Design Review (CDR)**
2. **Pilot Production Readiness Review (PPRR)**
3. **Manufacturing Readiness Review (MRR)**

> "**Early planning for system transition reduces risk** and supports smooth delivery
> and rapid acceptance by the system's end user."

### Production artifacts (slide 19) — four plans

1. **Manufacturing Test Plan (MTP)**
2. **Manufacturing Test Verification Plan (MTVP)**
3. **Manufacturing Readiness Test Plan (MRTP)**
4. **Manufacturing Work Plan (MWP)**

> "The Transition process includes **maintenance and supportability activities** for the
> deployed system **and its enabling system elements**, as well as **a process for
> reporting and resolving deficiencies**."

### Cross-functional teaming / concurrent engineering (slides 20–22)

**Five functions**, repeated on every teaming slide: **Engineering · Clinical ·
Logistics · Production · Administration.** Slide 22 arranges them around the cardiac
system itself — the point being that all five surround the product.

**Objectives of concurrent engineering (slide 21):**

- Evaluate **technical feasibility, manufacturability, and cost trade-offs concurrently**
  to condense the development timeline
- **Reduce implementation risks** by addressing manufacturing challenges early in the
  design cycle
- Optimize technical designs for manufacturing, ensuring smooth transition to
  **full-rate production**
- **Uncover hidden costs early**
- Provide a **documentation trail** of engineering decisions and trade-offs

**The challenges mind-map on slide 20** — easy to miss, it is a small graphic:

| Challenge | Countermeasures |
|---|---|
| Managing diverse perspectives | establish a **common language**; provide training |
| Overcoming **silo mentality** | foster a culture of collaboration; **cross-functional training** |
| Establishing clear goals | use **SMART criteria**; establish **KPIs** |

### Balance in design (slide 23)

> Strive for balance by including design for **Performance · Testability · Reliability ·
> Supportability · Human Factors · Affordability** (lowering O&S and development costs).
> "Design for Producibility and other '-ilities'."

### INCOSE — three "-ility" disciplines (slides 25–30)

Each is given a one-line definition, a paragraph of rationale, and then **the same
five-function teaming picture**, making the point that none of the three belongs to a
single function.

| Discipline | INCOSE definition |
|---|---|
| **Manufacturability / Producibility Analysis** (§3.1.7) | "an approach that **enables production in a responsible and cost-effective manner**" |
| **Reliability, Availability, Maintainability (RAM) Engineering** (§3.1.8) | "an approach that enables the system **to perform without failure, to be operational when needed, and to be retained in or restored to a required functional state**" |
| **Resilience Engineering** (§3.1.9) | "an approach that **provides required capability when facing adversity**" |

Supporting points worth quoting:

- **Producibility**: "Production involves the **repeated** manufacture of the developed
  system. The capability to manufacture or produce a system or its elements is **as
  essential as the ability to properly develop it**. A system that cannot be effectively
  produced causes unnecessary costs and may lead to rework and project delays."
- **RAM**: "Since RAM **often drives other system requirements**, it is essential that
  these activities be **selected, tailored, planned, and executed in an integrated
  manner** with other SE processes. A practical way… is to develop detailed reliability
  and maintainability plans **early** and to **integrate these plans with the SEMP**."
- **Resilience**: "System development often focuses on system capability under **nominal
  conditions**. Resilience directs the SE focus to the system's ability to deliver
  capability when faced with **adverse conditions**. This perspective can be important to
  stakeholders but is **sometimes overlooked**."

> The resilience framing is the same nominal-versus-adverse split that justified two
> scenarios in M8A2. Scenario B was a resilience test in all but name.

### Senge ch. 14 — Strategies (slides 32–33)

Nine strategies, in deck order:

1. **Thinking strategically**
2. **Integrated learning and working**
3. **Starting with who is there**
4. **Becoming bicultural**
5. **Creating practice fields**
6. **Connecting with the core**
7. **Building learning communities**
8. **Working with "the other"**
9. **Developing learning infrastructures**

> "Creating practice fields" already appeared in M6A3 as the fleet replay sandbox, and
> "starting with who is there" is the dialogue-session move. Both are reusable.

### Take-aways (slide 34)

- For system success, a **clean production transition is necessary** (JHU/INCOSE)
- **Each step of the systems process has some form of transition** (JHU/INCOSE)
- **Early strategic planning** enables successful production transitions (JHU/INCOSE)
- **Every production transition detail matters** (JHU/INCOSE)
- **Teaming in a strategically deliberate fashion** encourages systems success

## Status

| Item | Status |
|---|---|
| Overview and objectives | ingested |
| Readings page | ingested |
| Slide deck (35 pp) | ingested |
| **"Completing this Module" to-do tab** | **not captured — only the Objectives tab was sent** |
| **Assignment prompts and rubrics** | **not supplied** |
| **INCOSE quiz (#8, if there is one)** | **not supplied** |
| Lecture video list | not supplied |
| Senge ch. 14 | not supplied |

**Nothing is buildable yet.** Send the to-do tab and the assignment prompts.

## Carry-forward into Module 9

| Already produced | How it feeds a transition deliverable |
|---|---|
| **M8A1** integration plan, stages S0–S8 and gates G0–G8 | the thing being transitioned out of; CDR sits between M8A1's gates and this module's PPRR and MRR |
| **M8A2** V-model, L5 operational validation | validation feeds the Manufacturing Readiness Review evidence package |
| **M7A3** design requirements, especially DR-2 (enclosure, IP32, tool-less install) and DR-5 (field-replaceable radio module) | both are **producibility and DFA decisions already made** — DR-5 is modular design and standardized parts; DR-2 is design for handling and insertion |
| **M5A1** physical architecture, 20 elements | the hierarchical BOM the best-practice list calls for |
| **M4A2** trade study selecting gateway A2 | the make-or-buy and supplier decision the contract manufacturer inherits |
| **M3A1** KPP Operational Availability Aₒ ≥ 0.98 | the RAM requirement INCOSE says should drive the rest and be integrated with the SEMP |
| **M5A2** risk register | transition risks belong here: supplier, tooling, regulatory testing |
| **M6A3** team learning, practice fields | Senge ch. 14 strategies 3 and 5 are already instantiated in that work |

## Likely shape of the assignments

Objectives 1–4 are all production-transition specific, and the deck hands over two
ready-made lists (ten best-practice activities, three staged reviews) plus four
manufacturing plans. A transition plan or a production-readiness review package for
PD-RPM is the obvious ask. Objective 5 points at a Senge ch. 14 piece.

One caution for PD-RPM: **most of the deck is mechanical-assembly oriented** — part
counts, fasteners, symmetry, robotic assembly lines. PD-RPM's manufactured content is
one gateway, a tablet and two COTS peripherals; the rest is software. A strong answer
should apply DFA/DFM honestly to the gateway, then say plainly that for a
software-intensive system the transition weight sits in **build reproducibility, SBOM,
release gating and the contract manufacturer's test fixtures**, not in part-count
reduction.
