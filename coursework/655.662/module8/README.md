# Module 8 — System Integration, Test, and Evaluation

Roadmap position: **(8)** of 13, last box in the **Engineering Development** band,
after (7) Interfaces/Design/Software and before (9) Transition from Design to
Initial Production.

> This module will discuss systems integration, verification & validation, along
> with test and evaluation approaches and configuration management for system
> solutions… the focus is shifted from design to final system configuration. Also,
> test and assessment strategies will be explored to demonstrate how earlier
> concurrent engineering, organization agility, and future planning benefits this
> downstream activity.

## Objectives — eleven, the most of any module

1. Enumerate **integration approaches** for systems engineering.
2. Describe **logical approaches for systems integration for a remote care system**.
3. Enumerate **test and assessment approaches**.
4. Describe **comprehensive approaches for system test and assessment for a remote
   care system**.
5. Describe the benefit of **agile systems approaches** for integration and
   test-assessment.
6. Define awareness level concepts of **integration** (INCOSE).
7. Define awareness level concepts for **verification** (INCOSE).
8. Define awareness level concepts for **validation** (INCOSE).
9. Define awareness level concepts of **configuration management** (INCOSE).
10. Define how systems engineering is applied (INCOSE).
11. Identify aspects of systems engineering in practice (INCOSE).

> Objectives 2 and 4 are written as "for a remote care system" — the two written
> assignments are almost certainly an **integration approach** and a **test and
> assessment approach** for PD-RPM.

## Readings

- Senge, **ch. 13** — Openness (the "Impetus" chapter).
- Flanigan, Seymour, Biemer & Kossiakoff, **ch. 16 & 17**.
- INCOSE SEH 5th ed., **§2.3.5.8** (Integration), **§2.3.5.9** (Verification),
  **§2.3.5.11** (Validation), **§2.3.4.5** (Configuration Management), plus word
  searches on integration, verification, validation, configuration management.

## To-Do — back to two written assignments

1. Review the instructional materials and readings.
2. **Continue** working on the Team Assignment.
3. Complete the **two written assignments** (due Day 7).
4. Complete and submit **INCOSE quiz #7**.
5. Attend and participate in the synchronous session.

> Quiz numbering: #1 M1, #2 M2, #3 M3, #4 M5, #5 M6, #6 M7, **#7 M8**. Module 4 none.

## Deck content map (IHSE_Module8-INCOSE, 55 slides)

### JHU integration (slides 7–17)

**Three definitions he stacks** (slide 8), each cited:

- "Integration ensures that all the 'pieces' of the system will work together to
  realize system goals." — *Systems Engineering Management Guide, DSMC, 1990*
- "System integration involves the **methodic consolidation of subsystems into a
  system whole**. The sequence must be **carefully planned to support the testing
  function** in a complete and efficient manner." — *Reilly, 1993*
- "Systems Integration is the process of assembling the constituent parts of a
  system in a **logical, cost-effective way**, comprehensively checking system
  execution (**all nominal & exceptional paths**), and including a **full
  functional check-out**." — *Peter Houser, Northrop Grumman*

**Integration involves five things** (slide 9) — integration of: the design,
development, installation, developmental and operational testing and transition to
the user; the design/development **team including all subcontractors**; the
**hardware and software** components into subsystem and system; the **logistics and
support planning** for delivery; and **all required documentation**, internal and
external.

#### The three-step integration method (slides 10–14) — the spine

**Step 1 Planning · Step 2 Scheduling · Step 3 Execution.**

| Step | What he lists |
|---|---|
| **1 Planning** | Start with the **physical architecture objects** — configuration items, subcomponents, components, subsystems. Identify key **metrics, events, and outcomes** that demonstrate object performance and functionality, taken from the requirements and functional architecture. Develop **T&E events that verify each object**. Design **bottoms-up** integration activities. Determine event and activity requirements: skills, facilities, tools, time, support. |
| **2 Scheduling** | Estimate the duration of each activity and event. **Order the objects into collections** (bottoms-up). Define each activity and event **including success criteria**. Estimate time and cost. Schedule against resource availability: people, facilities, tools and equipment, funding. |
| **3 Execution** | Collect objects to be connected **in order**. Determine the **boundaries** of each object — physical, functional, behavioral. Specify the **interactions**: what is passed, function and performance of the interface, plan test events. **Connect** physically. **Test** the connections (physical, functional, behavioral). **Evaluate** the integration activity. |

Summary slide 14: *Planning:* architecture, metrics, requirements, events ·
*Scheduling:* order, time, cost, people, infrastructure · *Execution:* assemble,
connect, boundaries, interactions, T&E, V&V.

Slide 15 adds the integration framing list: **Integration Objectives ·
Input/Output · Infrastructure · Data Requirements · Order/Sequence · Overall
Management.**

#### Integration challenges (slide 16)

- Maintaining **requirements traceability to specific tests**
- Don't lose sight of verifying requirements **"along the way"** — finding a faulty
  component at component level is **considerably cheaper** than at system level
- Determining the **lowest level for meaningful integration** and test
- Minimizing the **integrate-test-correct…integrate-test-correct syndrome**
- A concrete plan for **isolating problems and rapid re-testing**
- For hardware, **strategically located and functionally oriented test points**
- Careful selection of interface points during architecture and design — **KISS**
- Maintaining **configuration control** — software, hardware, documentation
- Identifying, mitigating, managing **risk**

#### Lessons learned (slide 17)

- **More is better** on test points, hardware and software
- **Lower-level component tests along the way** is better
- **"Build-a-little, test-a-little"**
- The Systems Engineer guides the process through System Design Team leadership,
  the **SEMP** and a **System Integration Plan**
- Integration is a **team effort involving the user and all developers**, including
  subcontractors
- **The WBS is the framework for the SEMP, TEMP, and Integration Plan**
- Measurable and **mutually understood acceptance criteria** with customer and
  subcontractors minimizes future disconnects

### INCOSE integration (slides 19–23)

> The purpose of the **Integration** process is to **synthesize a set of system
> elements into a realized system that satisfies the system requirements**.

- Focus: combining system elements (**hardware, software, and operational
  resources**) and **verifying the correctness of the static and dynamic aspects of
  interfaces** between, and interaction among, the implemented elements.
- Includes **proactive activities early**: modeling, analysis, simulation,
  prototyping, early testing. Integration constraints and objectives are identified
  **during requirements, architecture and design definition**.
- Works **closely with and iterates with V&V**, including an assessment of the
  **integration maturity** of elements to be integrated.

**ICOM frame (slide 21):**

| | |
|---|---|
| Typical inputs | life cycle concepts; system architecture description and rationale; system design description and rationale; **system interface definition**; system element and its description; accepted system element; reused system element |
| Activities | **prepare for** integration; **perform** integration; **manage results of** integration |
| Typical outputs | integration strategy/approach; integration procedure; integrated system; **system interface definition**; constraints on solution; **requirements imposed on enabling systems**; **traceability mapping**; integration report; integration records/artifacts |

**Horizontal vs. vertical integration (slide 22):** horizontal is **across elements
at a common hierarchy level**; vertical ensures elements at a given level are
**consistent with and satisfy the expectations of the higher level**. His
illustration is a healthcare physical architecture view labeled **DoDAF SV-1/2/6**,
layered Patients → Sensing → Routing Decision → Local PAS → Complex PAS →
Application → Health Service Personnel.

**Eight integration techniques (slide 23)** — count them, this is quiz-shaped:

1. **Global (or Big Bang)** integration
2. **Bottom-up** integration
3. **Top-down** integration
4. **Incremental** integration
5. **Subset** integration
6. **Criterion-driven** integration
7. Integration **"with the stream"**
8. **Model-based** integration

### JHU test & evaluation (slides 25–35)

Four framing slides list what a T&E approach must cover:

| Slide | Items |
|---|---|
| 25 | Test/Assessment **Strategy · Planning · Transition to Test/Assessment · Focus Shift · System and Subsystem** |
| 26 | Test/Assessment **Objectives · Test Input/Output · Conduct, Participants, Stakeholders · Verification – Development Testing · Validation – Operational Testing · TEMP** |
| 27 | Test/Assessment **Infrastructure · Data Requirements · Modeling Elements · Performance Comparatives** |
| 28 | Test/Assessment **Requirements · Scope · Test Procedures · Test Scenarios · Infrastructure · Data Requirements** |

> **Note the equation on slide 26: Verification = development testing,
> Validation = operational testing.** That mapping is the module's core idea.

#### The progressive build, slides 29–34

Across six slides he grows the same picture against the lifecycle banner (Concept
Development | Engineering Development | Post-Development). Artifacts accumulate
left to right as the program matures:

| Slide | Stage | What exists by then |
|---|---|---|
| 29 | after **SRR** | NEEDS, FUNCT/PERFORM, CONOPS, **Design Reference Missions (scenarios)** |
| 30 | same | adds the **four verification methods** |
| 31 | Concept Definition | adds **Top-Level Functional Architecture**, **Top-Level Physical Architecture**, **Initial Test Plan** |
| 32 | Concept Definition | adds **A-Spec**, and the six-step check below |
| 33 | Advanced Development | adds **Prototypes**, **Baseline** Functional and Physical Architectures, **Preliminary Design**, **Initial Logistics & Support Plan** |
| 34 | Engineering Design → Integration | adds **B-Spec**, **Detailed Design**, **Articles**, **Final Test Plan**, **Logistics & Support Plan**, with **PDR, CDR, TRR** marked |

**"Backward looking" vs. "forward looking"** is the organizing idea: every artifact
is verified *backward* against needs, CONOPS and DRM scenarios, and *forward*
against the test plan that will eventually prove it.

**The six-step check (slide 32):**

1. Review with Stakeholders
2. Trace to Functional Requirements
3. Trace to Architecture
4. Verify Against CONOPS, DRM Scenarios
5. Identify Verification Techniques; Update Test Plan
6. Ensure Production & Support Techniques

**The four verification methods (slide 30)** — identical to INCOSE's list on
slide 38, so they are safe to use in either vocabulary:

| Method | His definition |
|---|---|
| **Inspection** | physical and visual examination |
| **Demonstration** | observing **qualitative** results of an operation or exercise |
| **Testing** | applying test procedures under specified conditions and analyzing results |
| **Analysis** | evaluation through mathematical models, simulation, algorithms, or calculations |

**Emerging T&E (slide 35).** Digital tools are essential: digital models and
simulations, **earlier virtual testing**, **digital thread continuity and
traceability**. Challenges: complexity of integrated systems, **data overload and
interpretation**, agile acquisition and rapid prototyping impacts, **cyber and AI
verification difficulties**. Best practices: **early T&E integration into design**,
**continuous verification and agile testing**, AI for anomaly detection and
automation, emphasis on **mission assurance and resilience**.

### INCOSE verification & validation (slides 37–43)

> The purpose of the **Verification** process is to provide **objective evidence
> that a system, system element, or artifact fulfils its specified requirements and
> characteristics**.

> The purpose of the **Validation** process is to provide **objective evidence that
> the system, when in use, fulfills its business or mission objectives and
> stakeholder needs and requirements, achieving its intended use in its intended
> operational environment**.

The distinction to memorize: **verification is against specified requirements;
validation is against stakeholder needs in the intended environment, in use.**

- Verification methods (slide 38): **Inspection, Analysis, Demonstration, Test.**
- What validation is measured against is **derived from** the mission statement,
  goals, objectives, critical measures, constraints, risks, and the **set of life
  cycle concepts** defined during Stakeholder Needs and System Requirements
  Definition.
- Life cycle concepts include **scenarios and use cases** performed in a specific
  operational environment by **intended users**, covering production, operation,
  support and retirement — and these are commonly **exercised during validation**.
- **Involve intended users/operators**, especially for walkthroughs. Validation
  often means going back to users for an **acceptance test under their own local
  operational conditions**.
- When validated at a supplier facility, the **acquirer will often want to repeat
  validation in their own environment with their own users**, and the stakeholders
  who defined the life cycle concepts **must be presented with the results**.
- Both processes have a **per-level** variant (slides 38, 43): verification and
  validation are run at each level of the hierarchy, not once at the end.

### INCOSE configuration management (slides 45–49)

> The purpose of the **Configuration Management (CM)** process is to **manage system
> and system element configurations over their life cycle**.

- CM establishes and maintains **consistency, integrity, traceability, and control**
  of a product's configuration.
- "CM provides **enduring truth, trust and traceability** across the full life cycle."
- **Inadequate CM increases risk to the product.**
- Dimensions listed (slide 46): Planning · Preparation · Input/Output · Actors ·
  Elements · Interfaces · Temporal · Special · Processes.

**The nine CM planning activities (slide 48):**

1. Identify the **context and environment** of the system
2. Apply adequate **resources** and assign **responsibility**
3. Establish **performance and status measurements**
4. Establish, implement and maintain **procedures**
5. Configuration management **training**
6. Assessing **compliance and effectiveness**
7. **Supplier** configuration management
8. **Product configuration information** processes establishment
9. Planning for the **five CM functions**: configuration **identification**,
   configuration **change management**, configuration **status accounting**,
   configuration **verification**, and **audit**

- Begin CM **at the beginning of the life cycle and continue until retirement**.
- **Tailoring** the CM approach is key to applying it across domains.

### Senge ch. 13 — Openness, the "Impetus" (slides 51–53)

Four headline items: **approaches to change · adaptive organizations · the future
of it · performance and happiness.**

- **Focus on openness** — learning organizations let people speak candidly without
  fear.
- **Overcoming political barriers** — traditional politics stifle honesty and
  produce a culture where "truth" is policed and suppressed.
- **Reflective vs. protective openness** — safe discussion is *protective*; real
  growth needs *reflective*, vulnerability-driven openness. (This is the same
  distinction flagged in the Module 7 deck.)
- **Broad responsibility, preserved control** — distributing decision-making
  without losing coordination or governance.
- **Respect, voice, and critique**; **leadership models openness** by admitting
  mistakes and inviting critique; **create reflective spaces** (meetings, retreats)
  for candid dialogue.
- **The learning paradox** — the more comfortable people get with candid dialogue,
  the more they learn; **discomfort is a sign that meaningful learning is
  happening**.
- Openness is the **impetus** for transformation, and requires **ongoing practice**.

### Take-aways (slide 54)

- Integration is a **critical step for system realization** (JHU/INCOSE)
- Integration requires **comprehensive strategic planning** (JHU/INCOSE)
- Test and assessment with V&V is **equally as complicated as system development**
- T&E and V&V require **early and upfront planning** for success
- **Configuration Management is the glue and unsung hero of systems engineering**
- **Organizational agility is critical** for system transition success

## Status

| Item | Status |
|---|---|
| Overview, objectives, to-do | ingested |
| Readings page | ingested |
| Slide deck (55 pp) | ingested |
| **The two M8 assignment prompts and rubrics** | **not supplied** |
| **INCOSE quiz #7** | **not supplied** |
| Lecture video list | not supplied (the Videos tab was not captured) |
| Senge ch. 13, Kossiakoff ch. 16–17 | not supplied |

## Carry-forward into Module 8

| Already produced | How it feeds an integration or T&E deliverable |
|---|---|
| **M5A1** physical architecture, 20 elements with IDs | the integration objects themselves — step 1 says start with the physical architecture objects |
| **M5A1** interface register I-1 … I-16, plus I-17 from M7A3 | the connections to be made and tested in step 3 |
| **M4A1** N² matrix | the interaction map that orders the bottoms-up collections |
| **M6A1** eight-step TRL prototyping build-up | already a bottoms-up integration sequence; extend it to full integration |
| **M3A1** operational requirements OR-1…OR-5 and six KPPs | what verification traces to, and what validation is measured against |
| **M7A1/A2/A3** fifteen requirements with verification methods named | the per-requirement verification column of a VCRM, once split per the grader feedback |
| **M5A2** risk register and burn-down | integration and test risks for the team final |
| **M2A1** WBS | the deck says outright: the WBS is the framework for the SEMP, TEMP and Integration Plan |

## Likely shape of the two assignments

Objectives 2 and 4 name "a remote care system" explicitly, and the deck gives a
three-step method for one and a four-slide checklist for the other. Expect:

- **M8A1** — an **integration approach/plan** for PD-RPM: planning, scheduling,
  execution; the bottoms-up order of objects; success criteria per event.
- **M8A2** — a **test and assessment approach** for PD-RPM: strategy, TEMP
  outline, verification (development testing) vs. validation (operational
  testing), the four methods, infrastructure and data requirements.

Both should be written as **atomic, focused items** per the Module 7 grader
feedback, not as dense paragraphs.
