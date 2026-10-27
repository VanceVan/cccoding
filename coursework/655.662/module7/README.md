# Module 7 — Interfaces, Engineering Design, and Software Development

Roadmap position: **(7)** of 13, in the **Engineering Development** band, between
(6) Advanced Development and (8) System Integration, Test, and Evaluation.

> This module will discuss the interfaces, information and engineering design
> elements of the systems engineering process through requirements analysis,
> functional refinement, physical definition and system verification and validation,
> for both JHU and INCOSE approaches. Additionally, JHU software concepts in system
> development will be outlined and discussed to help frame its use in the systems
> engineering process, along with interfaces, design reviews, and long-term teaming
> and operational support planning.

## Objectives

1. Define **interface development**.
2. Differentiate **types of software & development processes**.
3. Enumerate different **phases of system design process**.
4. Establish clarity of **system design test elements**.
5. Identify **foundations for strong systems team interactions**.
6. Define awareness level concepts for **interfaces** (INCOSE).
7. Define awareness level concepts of **information management** (INCOSE).
8. Define how systems engineering is applied (INCOSE).
9. Identify aspects of systems engineering in practice (INCOSE).

## Readings

- Senge, **ch. 12** — the Foundations chapter (closing reflections).
- Flanigan, Seymour, Biemer & Kossiakoff, **ch. 14 & 15**.
- INCOSE SEH 5th ed., **§3.2.4** and **§2.3.4.6**, plus word searches on
  "interfaces" and "information management".

## To-Do — three written assignments again

1. Review the instructional materials and readings.
2. **Continue** working on the Team Assignment.
3. Complete the **three written assignments** (due Day 7).
4. Complete and submit **INCOSE quiz #6**.
5. Attend and participate in the synchronous session.

> Quiz numbering holds: #1 M1, #2 M2, #3 M3, #4 M5, #5 M6, **#6 M7**. Module 4 had none.

## Deck content map (IHSE-Module7-INCOSE, 54 slides)

### JHU interface approaches (slides 7–17) — the spine of the module

He builds interfaces as a **five-layer stack**, adding one layer per slide, and the
left-hand rail of each slide shows the stack so far:

**Needs & Objectives → Requirements → Functions → Physical Implementation → (Risks)**

Opening premise (slide 8):

> Systems and their components interact with one another and with an operating
> environment by **exchanging data and resources**. These interactions are required
> to provide mission capabilities… Interfaces must ensure that data and resources
> transferred are **delivered on time and unchanged**.

**The five things that cross an interface** (slide 9, repeated on 13 as a vertical
list — he clearly wants these memorized):

> **Signals · Data · Energy · Materials · Forces**

They cross at the system boundary *and* between components inside it.

| Layer | What he says |
|---|---|
| **Needs & Objectives** | understand the operating environment; identify desired system inputs and outputs; identify **undesired** inputs and outputs; identify sources and destinations |
| **Requirements** | allocated and derived from system-level requirements; address **total system performance** (throughput, response time); address **interface fidelity** (integrity of items transferred, guaranteed delivery, failure detection and recovery *within the interface*); adhere to constraints; align with the I/O requirements of the system and its components |
| **Functions** | transfer inputs and outputs; link or bind components to support, extend or anchor; **connect incompatible system elements**; **buffer overloaded interactions**; restrain elements or their usage; expend or leverage human capabilities |
| **Physical Implementation** | physical **connections**, physical **elements**, physical **media** |
| **Risks** | the ten-item list below |

**Interface risks he names (slide 15), verbatim-ish:**

- Lack of **external interface commitments**
- Failure to assign **interface ownership and control**
- Failures to identify **vulnerabilities to threats**
- Failures to consider **environment, safety and occupational** risks
- Failures to understand need for **on-demand availability**
- Failures to consider and evaluate interface **reliability and maintainability**
- Failures to account for **compatibility and interoperability** measures
- Failures to study and evaluate the **external operational environment** (RF
  interference, EMI, external interface limitations)
- Failures to analyze **fault sources and their containment**
- Failures to consider **component failure modes and their effects** on interface
  performance

**The six-step interface development process (slides 16–17):**

1. Develop **High-Level Interface Architecture**
2. Define **Interface Requirements**
3. Develop **Functional Interface Architecture**
4. Develop **Physical Interface Architecture**
5. Develop **Allocated Interface Architecture**
6. **Test & Verify Interfaces**

Running alongside all six: **Interface Management · Change Control · Design V&V.**

### INCOSE interface concepts (slides 19–23)

> The purpose of **Interface Management (IM)** is to facilitate and manage the
> **identification, definition, design, and management** of interfaces of the system
> across the system life cycle.

- IM manages **interface boundaries** and **interactions across those boundaries**,
  the definition and agreement for each interaction, and interface requirements.
- IM **cuts across the Agreement, Technical Management, and Technical Processes** —
  it is a distinct activity across all life cycle process activities.
- Behavior of a system is a function of the interaction of its elements and of the
  SoI with external systems, so every interaction must be identified and defined.
- Identifying boundaries early **facilitates definition of the SoI's boundaries** and
  clarifies **dependencies both ways**, and ensures **compatibility** with external
  systems.
- "A key characteristic of today's increasingly complex, software-intensive systems
  is the **number** of internal and external interactions. The increased number of
  interactions **relates directly to the complexity** of a system."
- **System Architecture Definition runs concurrently with System Requirements
  Definition** to identify and define interface requirements for external systems,
  **including enabling systems**, allocated to the applicable system elements.
- Interface analysis assesses each interaction for **maturity, stability,
  documentation, threats, and risks** — and he points back to the **N² diagram**
  from Module 4.
- Document-centric artifacts: **ICD** (Interface Control Document), **DD** (Data
  Dictionary), **IDD** (Interface Definition Document), **IAD** (Interface Agreement
  Document). *Four of them — a count worth remembering for the quiz.*

### JHU software & design approaches (slides 25–42)

**The two parallel four-step sequences (slide 25):**

| Systems side | Software side |
|---|---|
| Requirements Analysis | Analysis |
| Functional Definition | Design — architecture and procedural |
| Physical Definition | Coding — unit testing/implementation |
| Design Validation | Test — integration and system |

**Software intensity taxonomy (slide 26)** — and he boxes **Software Intensive** in
green as the category the course's remote-care system falls into:

| | Hardware Intensive | **Software Intensive** | Software Exclusive |
|---|---|---|---|
| HW | >50% functionality | **Sensors & Comms, IT subsystems** | IT network only |
| SW | control & operate HW, embedded | **>40% functionality** | >80% functionality |
| Interfaces | Hardware | **Hardware Operating System** | Network Operating System |
| Model | Structured / SysML | **SysML / UML** | UML |

> PD-RPM is squarely **Software Intensive**: gateway firmware and comms, a monitoring
> platform, >40% of the capability in software, SysML/UML modeling. Say so explicitly
> in any M7 deliverable.

**Modular software perspective (slides 27–29).** Software differs in characteristics
and attributes; requirements, functionality and implementation are addressed
**separately** from hardware; **requirements and functional reviews are separate**;
**integration is two-fold — hardware and software**. The two chains converge:

- H/W: H/W Requirements → Functions → **H/W Component**
- S/W: Use Cases → S/W Requirements → **Classes / Objects** → S/W Architecture →
  S/W Components
- The two meet at **Integration**.

Classes/objects carry **data types, functionality, attributes, constraints,
relationships**. UML diagram taxonomy shown: Structure (class, object, package,
composite structure, component, profile, deployment) vs. Behavior (use case,
activity, state machine, interaction: timing, sequence, interaction overview,
communication).

**"What level do you separate software from hardware?" (slides 30–33)** — the
question he poses and then answers in three stages against the same
specs/functions/components lattice:

| Stage | What happens |
|---|---|
| **Concept Development** | "Unless your system is almost exclusively software, **the top-level requirements and functional architecture do not distinguish between software and hardware. They should be implementation-free.**" Software-exclusive or software-intensive **subsystems** are typically identified in the **top-level physical architecture**. |
| **System Architecture / Preliminary Design** | "In some cases, requirements and functionality are assigned to software during system architecting/preliminary design." Generally **software and hardware components are identified separately**. |
| **Detailed Design** | "**Almost always**, software requirements, functionality, and implementation are identified during detailed design. Hardware, software, and hybrid components are indicated in the design." |

And the rule of thumb he states outright:

> **Level 0:** no software defined · **Level 1:** some software can be defined ·
> **Level 2+:** software encouraged to be defined

(Levels are the functional decomposition levels: 0/1/2 top-level functions,
3/4 subsystem functions, 5/6 component functions — same lattice as Module 6's
flow-down, with Stakeholder Needs → Operational & System Requirements → A-Specs →
B-Specs across the top and System/Subsystems → Subsystems/Components →
Components/Subcomponents across the bottom.)

**Two perspectives on software functionality (slide 34):** Traditional Systems
Engineering vs. **Object-Oriented Development**.

**Three development models worked on the cardiac example (slides 35–37):**

| Model | His increments |
|---|---|
| **Agile** | Inc 1 basic cardiac measures + BIT (Go/No-Go) · Inc 2 extended measures + feature troubleshooting · Inc 3 full measures with AI + feature diagnostics |
| **Spiral** | Proto 1 basic cardiac transceiver + send BIT · Proto 2 extended transceiver + system feature transceiver · Proto 3 full transceiver + system feature transceiver |
| **Modular** | Module A cardiac data + dedicated interface · Module B system data + dedicated interface · Module C separate variables + specific interfaces |

**Comparison table (slide 38) — likely quiz fodder:**

| Model | Key characteristics | Best use cases | Pros | Cons |
|---|---|---|---|---|
| Waterfall | linear, phase-based | simple, well-defined projects | easy to manage; clear milestones | inflexible; **late issue discovery** |
| Agile | iterative, customer feedback | evolving or unclear requirements | fast delivery; collaborative | can lack documentation |
| Spiral | **risk-driven with prototyping** | large, high-risk systems | highly customizable; risk-aware | complex; higher cost |
| DevOps | continuous dev, test, deploy | fast-changing, CI/CD | fast cycles; automation focus | tool-heavy; culture shift needed |
| V-Model | test paired with each dev phase | **safety-critical systems** | high discipline; traceability | rigid; high overhead |

**Software framework stack (slide 39), outermost to innermost:** User → User
Interface (screen, keyboard, mouse, channel, DMA) → Application Software (custom,
support tools, commercial products) → Application Program Interface | Libraries →
Operating System Services → Firmware | Hardware. He green-circles the **clinical
workstation** end of the cardiac chain as where this stack lives.

**Network and software services (slide 40):** Clients → "the network" → Application
Servers → the network → Data Servers with Databases. Green-circled against the
**server + clinical station** end of the chain.

**Medical-device software + cybersecurity (slide 41)** — the one slide with direct
regulatory content, credited to Jose Bohorquez / CyberMed:

> If your medical device has software, you should be following **FDA's guidance
> documents + IEC 62304 + ANSI/AAMI SW96**… The workflow combines the **"V-model"
> diagram in IEC 62304** with the **pre-market cybersecurity responsibilities** in
> SW96 and FDA's **2023 cybersecurity guidance**… It's part of what converts a
> standard medical device "**software life-cycle process**" (IEC 62304) into a
> "**Secure Product Development Framework**" (**SPDF**).

The embedded diagram runs User Needs → System Requirements → Software Requirements →
Software Architecture (with security views, threat modeling, estimate & evaluate
risk, cybersecurity controls) → Software Design → Software Implementation &
Integration (generate **SBOM**) → Software Unit Testing → **SAST & DAST** →
Software Integration Testing → Software Verification → **Security Assessment of
Unresolved Anomalies** → Cybersecurity Testing → Vulnerabilities Discovered →
Design Verification → Design Validation, with "is the risk acceptable?" gates
throughout.

> **This is the most PD-RPM-relevant slide in the deck.** IEC 62304, SBOM, SAST/DAST
> and SPDF are concrete, citable, and nothing produced so far in the course has used
> them. Any software assignment this module should name them.

**Design-element checklist (slide 42), two columns:**

| Software | Design / review |
|---|---|
| Software Building Blocks · Partitioning · Modeling · Structured Analysis · Diagramming · Data Dictionaries · Object Oriented Design · Tools · Interfaces · Testing Types | Preliminary Design · **PDR** · Critical Design · **CDR** · Reliability · Availability · Producibility · Testing · Tools · **Configuration Baselines** |

### INCOSE information management (slides 44–49)

> The purpose of the **Information Management** process is to **generate, obtain,
> confirm, transform, retain, retrieve, disseminate, and dispose of** information to
> designated stakeholders.

Eight verbs — worth counting, the same way the handling-strategy counts mattered in
quiz #4.

- Information provided must be **unambiguous, complete, verifiable, consistent,
  traceable, and presentable** (six adjectives).
- Information includes **technical, project, organizational, integration,
  contractual, agreement, and user** information, often derived from data artifacts.
- IM ensures data is **defined, stored, structured, maintained, secured, exchanged
  and accessible**, maintaining integrity of life cycle artifacts.
- IM **must be associated very closely with configuration management** for
  integrity, initial release and change control, "from ideation through disposal."
- **Knowledge management is closely linked** — the motivation is "information
  sharing across the organization."
- Two data domains shown side by side on slides 45–46: **System Development Data
  (MBSE)** and **Operational System Data**.

**The ICOM frame for the process (slide 47)** — same shape as the Module 4 frame:

| | |
|---|---|
| **Typical inputs** | candidate items for information management; change request |
| **Activities** | **prepare for** information management; **perform** information management |
| **Typical outputs** | IM strategy/approach; **information register**; change request; IM report; IM records/artifacts |
| Controls / Enablers | shown on the top and bottom arrows |

**Tips (slide 49):** identify **information-rich artifacts** and store them even when
informal (a design engineer's notebook, any media); identify the **information set at
the start** of a project if following digital engineering; tailor an **information
management plan** in Project Planning naming what is collected, retained,
controlled, secured, disseminated, **with a schedule for disposal**.

### Senge ch. 12 — Foundations (slides 51–52)

Eight foundation items: **change through conversation · reflective openness ·
growing people · purpose–commitment · transformative relationships · it starts with
me · machine-age thinking · how the work gets done.**

Four summarized points:

- **Recognizing radical beginnings** — Senge reflects on how his ideas initially felt
  radical but have since proven effective in practice.
- **Embedding systemic practice** — systems thinking becomes second nature for
  leaders who truly internalize the discipline.
- **Vulnerability as strength** — true organizational learning requires embracing
  **reflective openness**, not just safe conversations.
- **Continuous evolution of learning organizations** — the journey is ongoing and
  unfinished.

### Take-aways (slide 53)

- Interfaces are a **key product of engineering design** (JHU/INCOSE)
- Software is a critical element of systems and **drives design** (JHU)
- System information is a critical element of the overall system (INCOSE)
- **System reviews are critical** for team concurrence and robust vetting (JHU)
- System foundations include strong team relationships and approaches

## Status

| Item | Status |
|---|---|
| Overview, objectives, to-do | ingested |
| Readings page | ingested |
| Slide deck (54 pp) | ingested |
| **The three M7 assignment prompts and rubrics** | **not supplied** |
| **Discussion prompt** | **not supplied** |
| **INCOSE quiz #6** | **not supplied** |
| Lecture video list | not supplied (the Videos tab was not captured) |
| Senge ch. 12, Kossiakoff ch. 14–15 | not supplied |

**Nothing is buildable yet** — the deck supports at least four very different
deliverables (an interface definition / ICD for PD-RPM, a software development
approach and model selection, a design-review plan, or a Senge ch. 12 reflection),
and guessing wrong wastes a build. Send the three prompts and I can start at once.

### Also still open from earlier modules

- Module 6 **discussion prompt** and **INCOSE quiz #5**.
- The **Final Team Project**, introduced in Module 5, "continue working on" in both
  Module 6 and Module 7. Nothing has been drafted for it yet.

## Carry-forward into Module 7

| Already produced | How it feeds a Module 7 deliverable |
|---|---|
| **M4A1** functional diagram, 12 functions with ICOM frame and noun-labeled arrows | every labeled arrow is an interface; the noun on the arrow is the signal/data/energy/material/force crossing it |
| **M4A1 N² matrix** | the deck points back at the N² explicitly for interface analysis — maturity, stability, documentation, threats, risks per interaction |
| **M5A1** physical architecture, 20 elements with IDs | the physical interface architecture (step 4) and the physical connections/elements/media layer |
| **M2A2 / M3A2** boundary decisions (cycler out, EHR out, carrier out) | these are precisely the **external interface commitments** whose absence is risk #1 on slide 15 |
| **M4A2** selected cellular gateway A2 | the interface whose requirements, fidelity and failure-detection behavior are now specifiable |
| **M5A2** risk R-1 silent gateway + four mitigations | already an interface risk; slide 15 gives the taxonomy to classify it |
| **M3A1** KPPs with thresholds | source of the throughput and response-time interface requirements |
| **M6A1** prototyping and TRL build-up order | the test & verify step (6) of the interface process |
