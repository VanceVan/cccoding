# Module 10 — System Production

Roadmap position: **(10)** of 13, the second box in the **Post Development** band, after
(9) Transition from Design to Initial Production and before (11) System Operational
Support with ILS and Maintenance.

> This module focuses on the **production phase** of the systems engineering lifecycle.
> In the production phase, transition will be touched, but **production leadership,
> requirements, specifications, tooling, infrastructure, and processes** will be
> emphasized. Additionally, awareness level concepts of **design for quality
> characteristics, production system testing, proofing, and compliance** will be
> discussed to ensure final system readiness for operational use.

## Objectives

1. Describe the **transition to production elements**.
2. **Recite phases of production introduction**.
3. **Delineate critical production phases**.
4. **Apply production concepts for a remote healthcare system**.
5. Recognize impactful **leadership attributes** to help production and the system
   lifecycle.
6. Define awareness level concepts of **design for quality characteristics** (INCOSE).
7. Define how systems engineering is applied (INCOSE).
8. Identify aspects of systems engineering in practice (INCOSE).

## To-Do

1. Review the instructional materials and readings.
2. **Continue** working on the Team Assignment.
3. Complete the **three written assignments** (due Day 7).
4. Complete and submit **INCOSE quiz #9**.
5. Attend and participate in the synchronous session.

> Quiz numbering: #1 M1, #2 M2, #3 M3, #4 M5, #5 M6, #6 M7, #7 M8, #8 M9, **#9 M10**.

## Deck content map (IHSE-Module10-INCOSE, 30 slides)

### The three JHU production groupings (slides 7, 9, 11)

He presents production as three lists of six, each followed by a case-study slide.

| Slide 7 — the production system | Slide 9 — phasing and organisation | Slide 11 — execution and acceptance |
|---|---|---|
| Production Leadership | Production Transition | Production Leadership |
| Production Specifications | Production Strategy and Plan | Production Allocation |
| Production System | Production Phasing | Production Items |
| Tooling | System | Production Testing |
| Production Processes | Subsystems | **Final Production Proofing** |
| Production Infrastructure | Teams | **Production Compliance** |

> **Production Leadership appears in two of the three lists.** That is almost certainly
> deliberate, and it ties to objective 5 and the Senge material at the end.

### The production phasing diagram (slide 9) — the answer to objectives 2 and 3

Three phases, with named transitions between them:

| Phase | Steps, in order |
|---|---|
| **Integration and Evaluation Phase** | System and Subsystem Integration → System Test → Operational Evaluation |
| *Transition to Production* | |
| **Production Phase** | **Material Procurement → Production Engineering → Low Rate Production → Full Production** |
| *Operational Introduction* | |
| **Operation and Support Phase** | Installation and Test → System Operations |

> **Low Rate Production before Full Production** is the phrase to use. The four
> production-phase steps are the "phases of production introduction" objective 2 asks
> you to recite.

### The production system network (slide 11)

A supply diagram with three zones feeding the prime contractor:

- **Suppliers** — standard components, "Production" blocks only.
- **Subcontractors** — developed components, each with **both Production and
  Engineering** blocks.
- **Prime Contractor** — **Production Assembly, Integration, Acceptance Test**, with its
  own Engineering block, emitting **Products → Users**.
- Legend distinguishes **shipping** (solid) from **coordination** (dashed), and
  coordination runs in both directions between every zone.

> The distinction worth repeating: standard components come from suppliers who only
> produce; developed components come from subcontractors who must also engineer.

### The ten design-for-producibility guidelines (slides 13–14)

Verbatim from Bralla, the same source credited in Module 9:

1. **Simplicity** — fewest parts, least intricate shape, fewest precision adjustments,
   shortest manufacturing sequence. "Additionally, it usually will be the most reliable
   and the easiest to service."
2. **Standard materials and components** — lets low-unit-quantity products enjoy the
   benefits of mass production; simplifies inventory, eases purchasing, avoids tooling
   investment, speeds the cycle.
3. **Standardized design of the product itself** — across similar products, specify the
   same materials, parts and subassemblies.
4. **Liberal tolerances** — the cost of tight tolerances comes from (a) extra operations
   such as grinding, honing, lapping, (b) higher tooling cost and maintenance, (c) longer
   cycles, (d) scrap and rework, (e) more skilled workers, (f) materials cost,
   (g) precision equipment investment. *Seven named cost drivers.*
5. **Use of the most processible materials** — "the most economical material is the one
   with the **lowest combined cost of materials, processing, and warranty and service
   charges over the designed life**."
6. **Teamwork with manufacturing personnel** — designers and manufacturing engineers
   collaborating **from the outset**.
7. **Avoidance of secondary operations** — deburring, inspection, plating and painting,
   heat treating, material handling "may prove to be as expensive as the primary
   manufacturing operation."
8. **Design appropriate to the expected level of production** — his example cuts both
   ways: don't specify a thin-walled die casting if volumes can't amortise the die, but
   don't specify a sand-mold casting for a mass-produced part either.
9. **Utilizing special process characteristics** — colour and texture straight from the
   mould, "living hinges" in some plastics, porous powder-metal parts that retain
   lubricant and remove the need for bushing inserts.
10. **Avoiding process restrictiveness** — "specify only the final characteristics
    needed; **do not specify the process to be used**."

**Slide 16 compresses these to nine** against the pacemaker example, merging items 2 and
3 into "Standards": Simplicity · Standards · Tolerances · Materials · Teamwork · Avoid
Secondary Works · Suitable Production Design · Specialty Areas as Needed · Don't Over
specify Processes.

> If an assignment asks for the list, **the ten-item version is the authoritative one**;
> the nine-item slide is a summary.

### The pacemaker worked example (slides 15–16)

Three manufacturing steps: **1 Component Design and Manufacturing** (circuitry,
long-life battery, insulated leads) → **2 Assembly** (components sealed inside a durable
titanium case) → **3 Quality Control** (rigorous testing against strict medical standards
before implant). Slide 16 maps the nine condensed guidelines against those three steps.

### The Cameroon case study (slides 8, 10, 12)

*Developing a Low-Cost IoT-Based Remote Cardiovascular Patient Monitoring System in
Cameroon*, used three times to illustrate different groupings:

| Slide | Framing | What the figure shows |
|---|---|---|
| 8 | **Processes and Infrastructure** | the full remote-monitoring clinical service: patient consent and training, patient-initiated transmission, standalone system and implantable haemodynamic monitor, proprietary manufacturer cloud server, reviewing clinician, then five dispositions (no action, advice, clinic review, emergency admission, documentation into records); plus governance of data handling, clinical management policies, education and training |
| 10 | **Systems, Subsystems and Teams** | a three-layer architecture: **Sensing Layer** (Arduino, Bluetooth module, sensors, wearable) → **Transport Layer with connectors** (Bluetooth to laptop/phone, internet) → **Application Layer** (server, database, dashboard, clinician) |
| 12 | **Proofing and Compliance** | system flowchart, data collected over SMS, and the Heart Disease Remote Patient Management (HDRMS) monitoring interface with per-patient trend plots |

> **This is the most directly reusable material in the deck** for objective 4. It is a
> real low-cost remote cardiac monitoring system with a published architecture, and the
> instructor returns to it three times.

### Balance in design (slide 17)

Identical to Module 9 slide 23 — **Performance · Testability · Reliability ·
Supportability · Human Factors · Affordability** (lowering O&S and development costs).

### INCOSE quality (slides 19–26)

> The purpose of the **Quality Management (QM)** process is to **assure that products,
> services, and implementations of the Quality Management process meet organizational
> and project quality objectives and achieve customer satisfaction**.

> The purpose of the **Quality Assurance (QA)** process is to **help ensure the effective
> application of the organization's Quality Management process to the project**.

**The QA / QC distinction, stated memorably (slide 24):**

- **QA** is "**putting good things into our processes**" so they perform as designed and
  conform to stakeholder requirements.
- **QC** is "**taking bad things out of our processes after they occur**" to prevent
  discovered defects from reaching stakeholders — checking, monitoring, inspecting,
  then removal, replacement or rework.
- Both are **defect prevention methods** under QM. *QA and QC are the two.*

**ICOM frames:**

| | Quality Management (slide 20) | Quality Assurance (slide 23) |
|---|---|---|
| Inputs | organization strategic plan; QA strategy/approach; QA report; QA evaluation report; **customer satisfaction inputs** | QM strategy/approach; QM criteria and methods; QM report; QM corrective action |
| Activities | plan QM; assess QM; perform QM **corrective and preventive** action | prepare for QA; perform **product or service** evaluations; perform **process** evaluations; manage QA records and reports; **treat incidents and problems** |
| Outputs | QM strategy/approach; criteria and methods; **QM system**; corrective action; report; evaluation report; records/artifacts | QA strategy/approach; **QA system**; corrective action; report; evaluation report; records/artifacts |

> Note the loop: QM's inputs are QA's outputs and vice versa. QM has **three** activities,
> QA has **five**.

**The eight attributes of a quality management culture (slide 21, from Kennedy 2005):**

1. **Zero Defects Attitude** — commitment to keep our promises, preventing defects from
   reaching customers
2. **Vocational Certainty** — faithfulness to our career agenda; disciplined about
   developing skills and acquiring earned confidence
3. **Process Quality** — mastery of planning and budgeting disciplines
4. **Administrative Consistency** — attention to detail; listening to the customer
5. **Executive Credibility** — sincerity and skill with people
6. **Personal Authenticity** — resolve to be consistent; making exceptional service feel
   normal
7. **Ethical Dependability** — trustworthiness in practical matters
8. **Create a Keeping the Promise Culture** — mutual respect, accountability,
   professionalism

**Quality Characteristics (slides 25–26):**

> **Quality Characteristic (QC):** inherent characteristic of a product, process or
> system related to a requirement. **QCs are how the stakeholders will judge the quality
> of the system.**

> Careful: the deck uses **QC** for both *Quality Control* (slide 24) and *Quality
> Characteristic* (slides 25–26). Watch that in the quiz.

**INCOSE SEH Table 3.1 — eleven QC approaches** (slide 26). Module 9's three were three
of these:

| Approach | "An approach that…" | Representative QCs |
|---|---|---|
| **Affordability Analysis** | maximizes value, providing cost effective capability over the entire life cycle | Affordability, Cost-Effectiveness, Life Cycle Cost (LCC), Value Robustness |
| **Agility Engineering** | enables change in a timely and cost-effective manner | Adaptability, Agility, Changeability, Evolvability, Extensibility, Flexibility, Modularity, Reconfigurability, Scalability |
| **Human Systems Integration** | integrates technology, organizations and people effectively | Desirability, Ergonomics, Habitability, Human Factors, HCI, HMI, Usability, UI, UX |
| **Interoperability Analysis** | ensures the system interacts effectively with other systems | Compatibility, Connectivity, Interoperability |
| **Logistics Engineering** | enables support for the entire life cycle | Supportability |
| **Manufacturability / Producibility Analysis** | enables production in a responsible and cost effective manner | Manufacturability, Producibility |
| **Reliability, Availability, Maintainability Engineering** | enables the system to perform without failure, to be operational when needed, and to be retained in or restored to a required functional state | Accessibility, Availability, Interchangeability, Maintainability, Reliability, Repairability, Testability |
| **Resilience Engineering** | provides required capability when facing adversity | Resilience, Robustness, Survivability |
| **Sustainability Engineering** | supports the circular economy over its life | Disposability, Environmental Impact, Sustainability |
| **System Safety Engineering** | reduces the likelihood of harm to people, assets and the wider environment | Safety |
| **System Security Engineering** | identifies, protects from, detects, responds to, and recovers from anomalous and disruptive events, including those in a cyber contested environment | Cybersecurity, Information Assurance (IA), Physical Security, Trustworthiness |

> He marks **Human Systems Integration** and **Interoperability Analysis** with symbols
> that also appear on the cardiac-system graphic at the top of the slide, flagging those
> two as the ones that bite hardest in a remote care system.

### Senge — leadership (slide 28)

> "In a learning organization, leaders are **designers, stewards, and teachers**. They
> are responsible for building organizations where people continually expand their
> capabilities to understand complexity, clarify vision, and improve shared mental
> models — that is, they are responsible for learning." — Peter Senge

Three roles, laid out around the quote: **Leader as Designer · Leader as Teacher ·
Leader as Steward.** This is *The Leader's New Work*, Senge ch. 18.

### Take-aways (slide 29)

- **System production is equally as complicated as the system itself** (JHU)
- **Early production strategy is critical** (JHU/INCOSE)
- **Production planning and infrastructure are vital** (JHU/INCOSE)
- **Mature and flexible production processes lower production system risk** (JHU/INCOSE)
- **Systems leadership requires full lifecycle learning and attention** (JHU/INCOSE)

## Status

| Item | Status |
|---|---|
| Overview, objectives, to-do | ingested |
| Slide deck (30 pp) | ingested |
| **Readings page** | **not supplied** (Senge chapter inferred as ch. 18 from slide 28) |
| **The three M10 assignment prompts and rubrics** | **not supplied** |
| **INCOSE quiz #9** | **not supplied** |
| Lecture video list | not supplied |

## Carry-forward into Module 10

| Already produced | How it feeds a production deliverable |
|---|---|
| **M9A1** ten transition items, the CDR/PPRR/MRR sequence, the four manufacturing plans | production transition is slide 9's first item; M9A1 is the input to this module's phasing |
| **M9A2** five concurrent-engineering areas | guideline 6, teamwork with manufacturing personnel from the outset |
| **M9A3** becoming bicultural | objective 5, production leadership, and Senge's leader-as-teacher role |
| **M7A3** DR-2 enclosure and DR-5 field-replaceable radio | guidelines 1, 2, 3 and 8 — part count, standard components, and design suited to the production volume |
| **M7A2** SR-5 IEC 62304, SBOM, CVSS gate | production compliance and final production proofing |
| **M3A1** KPPs incl. Aₒ ≥ 0.98 | the RAM row of the QC table |
| **M5A2** risk register | production risk, which the take-aways call out directly |

## Likely shape of the three assignments

Objectives 2, 3 and 4 are each phrased as something to produce for a remote care system,
and the deck supplies three ready-made frames:

- the **production phasing** sequence (material procurement, production engineering, low
  rate, full rate),
- the **ten producibility guidelines**, and
- the **eleven QC approaches** plus the QA/QC distinction.

Expect a production plan or phasing deliverable, something applying the producibility
guidelines or quality characteristics to PD-RPM, and a Senge leadership piece against
objective 5.

> **PD-RPM caveat still applies**, and more sharply here than in Module 9. The deck is
> written for manufactured hardware — die castings, tolerances, deburring, tooling
> amortisation. PD-RPM manufactures one gateway. Apply the guidelines honestly to that
> gateway, then say plainly that for a software-intensive system the production phase is
> dominated by build reproducibility, release gating, provisioning and regulatory
> evidence. The **Cameroon case study is the better analogue** and is already in the deck.
