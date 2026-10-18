# Module 6 — Advanced Development: Transitioning from Concept to Design

Dates: 10/13/26 – 10/19/26.

> This module will discuss the transition from early concept to engineering
> design… through the development of engineering requirements and specifications
> along with the development of prototype systems… requirements flow-down,
> modeling & simulation, interfaces, software, and engineering testing approaches…
> Finally, the systems thinking concepts of shared vision and team learning.

## Objectives

1. Describe the **importance of transition** from concept to advanced development.
2. Articulate **critical elements of transition**.
3. Enumerate the **benefits and risks of prototypes**.
4. Elaborate on the **shared vision** for systems development.
5. Explain the benefits of **team learning** for system development.
6. Define awareness level concepts of **design for system realization** (INCOSE).
7. Define awareness level concepts of **modeling and analysis** (INCOSE).
8. Define how systems engineering is applied (INCOSE).
9. Identify aspects of systems engineering in practice (INCOSE).

## Readings

- Senge, **ch. 10 & 11** — Shared Vision and Team Learning.
- Kossiakoff et al., **ch. 13** (Advanced Development).
- INCOSE SEH 5th ed., **§1.3** and **§3.2.1**, plus a word search on
  "modeling, simulation, and analysis".

## To-Do — the heaviest module so far, six items

1. Review the instructional materials and readings.
2. **Continue** working on the Final Team Project assignment.
3. **Participate in the Discussion.**
4. Complete the **three written assignments** (due Day 7).
5. Complete and submit **INCOSE quiz #5**.
6. Attend and participate in the synchronous session.

> Quiz numbering now settled: #1 Module 1, #2 Module 2, #3 Module 3, **#4 Module 5,
> #5 Module 6**. Module 4 had none. The course outline's quiz placement is wrong;
> the Canvas module pages are right.

## Assignments

### M6A1: Problem Set — 10 pts, 2 pages, file upload

> **Kossiakoff Book — Chapter 13: Problem 13.2** for your remote care system.

Rubric ladder:

| Pts | Level | Criteria |
|---|---|---|
| 0–3 | None | No identification of relevant activities in the advanced development phase; no example |
| 4–6 | Limited | One relevant activity, vague; example missing or generic; minimal connection to "risk reduction" |
| 7–8 | Fair | Multiple activities, partially explains their connection to risk reduction |
| 9 | Good | Clearly identifies multiple activities; explains how they reduce risk with a specific example; "strong but not exhaustive" |
| **10** | **Excellent** | "Fully explains **multiple** relevant activities… and **explicitly links them to the concept of risk reduction**. Provides a well-developed, **realistic** example from the remote care system… No significant omissions." |

Satisfies objectives 1–3.

> **The rubric reveals the question even though the problem text has not arrived.**
> Problem 13.2 asks what activities occur in the **advanced development phase** and
> **why that phase is called "risk reduction."** The discriminator between 9 and 10
> is *multiple* activities, each explicitly tied to risk, plus one realistic worked
> example from PD-RPM. Awaiting the exact wording before drafting.

### The other two written assignments — not yet supplied

The to-do says three. Only M6A1 is in hand.

## Deck content map (IHSE-Module6-INCOSE, 53 slides)

### The design process he teaches (slides 10–16)

1. **Recognize the need** → 2. **Define the problem** → 3. **Plan the design**,
applied recursively at **System → Subsystem → Component**.

Within each pass:

- Become knowledgeable about the context; review relevant existing designs;
  identify missing information.
- Identify solution options; understand how they work **within the design** and
  **within the operational context**.
- **Primary tool: engineering trade studies** (stated on three consecutive slides).
- Identify **measures of feasibility, performance, cost, schedule, risk**, and
  estimate them by **modeling and simulation, prototyping, or surrogates**.
- Fill in the details; create a formal record (**MBSE**); disseminate the design;
  perform reviews; reach consensus if possible.
- Then repeat at the same level, or construct the next level down.

### Requirements flow-down (slides 17–21)

**Needs → Requirements → Functions → …** His worked example decomposes function
*3. Set Up Cardiac Comms* into 3.1 Power Up Comms, 3.2 Setting for Comms,
3.3 Calibrate Comms, 3.4 Test Comms, then 3.1 into 3.1.1 Connect to Power Source,
3.1.2 Switch on Power, 3.1.3 Confirm Power On.

The payoff slide separates the two requirement levels, with the sub-function
number in parentheses on each system requirement:

| Operational requirements (MOE) | System requirements (MOP) |
|---|---|
| minimum comms range of 40 ft | power-up time no more than 5 seconds **(3.1)** |
| withstand 6 ft drop | voltage compatible with 120V/60Hz **(3.1.1)** |
| weigh no more than 1 lb | touch force no more than 1 Newton **(3.1.2)** |
| data rate 2× the cardiac device | audio cue of 55 dB, 2 Hz, 200 ms chirp **(3.1.3)** |

This is the same MOE/MOP split from Module 3, now shown as a **flow-down**: each
system requirement is tagged to the sub-function it bounds.

### Prototyping (slides 23–30) — the core of M6A1

> "**Prototyping is a Primary Risk Mitigation Strategy.**"

He quotes Vice Admiral David Architzel:

> "There have been too many examples recently of unnecessary technical uncertainty
> and risk being carried forward to the System Development and Demonstration Phase
> when the uncertainty and risk should have been addressed earlier, during
> technical development… **The objectives of prototyping and competition are to
> reduce technical, cost and schedule risk, increase program predictability and
> improve program stability.**"

**Three kinds of prototype:**

- **Explorative** — explores requirements with users; a communication medium
  between user and designer, like a mock-up.
- **Experimental** — closest to "first of its kind"; built to determine whether
  the planned system will be adequate and acceptable. Can serve as a requirements
  specification.
- **Evolutionary** — successive generations, each an early version worked on until
  it has evolved into the finished system.

**Prototypes appear throughout development**, not only in engineering: a
**CONOPS can be considered a prototype**, and so can models and simulations.

**Fidelity ladder, low to high:** paper sketches · storyboards · CAD layouts ·
slide-show or video models · computer-based scenario simulations · horizontal
simulations · vertical simulations · full-functionality simulations · first
article build.

| | Advantages | Disadvantages |
|---|---|---|
| **Low fidelity** | less time and cost; can evaluate multiple concepts; communication tool; good for UI | limited for usability tests; navigation and flow limits; facilitator-driven; poor for detailed specs |
| **High fidelity** | partial/complete functionality; interactive; user-driven; defines navigation; good for exploration and test; marketing tool | time-consuming; inefficient for proof-of-concept; may bind users to representation shortcomings; **management may think it is real** |

**Pitfalls he names:** not aligning the prototype with project constraints; going
high fidelity too early (a perfect prototype stifles the design process and may
limit the eventual design); wasting time on things that will change; detail that
draws the customer into glitz rather than function; and confusing a prototype as
an *information generator* with a prototype as an *early model of the final design*.

### TRL and the prototype test sequence (slides 31–34)

TRL came from NASA in 1974 "so that a project either wasn't ignored or wasn't
taken too seriously, too early." He tags each element of the cardiac system with
its TRL (9, 7, 9, 7, 6) and then asks **"What prototyping should be conducted?"**,
answering with an eight-step build-up:

1. Confirm and mature desk transceiver — test
2. Isolate clinical computer stack — test
3. Isolate clinical station — test
4. Combine clinical station / computer stack — test
5. Partial end-to-end with cell tower, with (4)
6. End-to-end without cardiac device — test
7. End-to-end with cardiac device — test
8. Complete end-to-end with patient — test

**This is the template to mirror for PD-RPM in M6A1** — the lowest-TRL element
gets prototyped first and alone, then integrated outward until the patient is the
last thing added. That ordering *is* the risk-reduction argument.

Supporting test infrastructure: facility development, developmental testing,
testing and analysis plans, test priorities, **TEMP**, test equipment, test
software, interface testing.

### INCOSE system concepts and MA&S (slides 36–48)

- **SoI, system environment, external systems**, with boundaries separating the
  SoI from **enabling, interoperating and interfacing systems**.
- **Modes and states**: a *state* is an observable, measurable attribute
  characterizing current configuration, status or condition (Wasson 2016); a *mode*
  is a distinct operating capability during which some or all functions may be
  performed to a full or limited degree (Buede & Miller 2016).
- **Attribute** = an observable characteristic. **Measurement** = the outcome of a
  process in which the SoI interacts with an observation system under specified
  conditions.
- **Black box / white box** (opaque / transparent): external view of attributes
  versus internal view of attributes *and structure*.
- Hierarchy within a system, from **ISO/IEC/IEEE 15288 (2023)**.
- **SE Vision 2035**: "the future of systems engineering is model-based."
- **MA&S terms are not interchangeable** — *modeling* is the conception, creation
  and refinement of models; *analysis* is systematic, reproducible examination to
  gain insight; *simulation* is using a model to predict and study behavior. The
  essential artifact is **an explicit model**.
- MA&S applies in Stakeholder Needs, Architecture Definition (concurrently with
  Design Definition, producing MOEs and MOPs), Implementation, and Operation.
- Model taxonomy: physical, digital, formal, informal, mixed.

### Senge (slides 50–51) and take-aways

**Shared Vision** and **Team Learning**. Take-aways: transition from concept to
advanced systems is critical; disciplined SE processes reduce risk; prototypes
with modeling and analysis help transition and mature all system areas; a shared
vision helps with system continuity; team learning facilitates comprehensive
system transition, design and testing.

## Status

| Item | Status |
|---|---|
| Overview, objectives, to-do | ingested |
| Readings page | ingested |
| Slide deck (53 pp) | ingested |
| M6A1 prompt and rubric | ingested |
| **Kossiakoff problem 13.2 text** | **user is sending next** |
| The other two written assignments | not supplied |
| The discussion prompt | not supplied |
| INCOSE quiz #5 | not supplied |
| Senge ch. 10–11, Kossiakoff ch. 13 | not supplied |

## Carry-forward for M6A1

| Already produced | Use in the advanced-development argument |
|---|---|
| M5A1 physical architecture, 20 elements with IDs | the things whose TRL differs and therefore whose prototyping order matters |
| M4A2 trade study (A2 cellular gateway selected) | a trade study is the "primary tool" of this phase; the decision is already made and documented |
| M5A2 risk R-1 and its four mitigations | M-1 through M-4 are literally advanced-development risk-reduction activities |
| M3A1 KPPs | what the prototypes have to demonstrate before the design is frozen |
| M4A1 functions 1–12 | the flow-down target for system requirements tagged by sub-function |
