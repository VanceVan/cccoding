# Module 2 — Systems, Types, and Management (9/15–9/21)

## Objectives (1–13)

1. Articulate Systems Management.
2. Explain the relationship between systems management and systems engineering.
3. Delineate the three main systems types.
4. Describe system type attributes and characteristics.
5. Demonstrate the challenges and opportunities with holistic problem solving.
6. Define awareness level concepts of acquisition and supply (INCOSE).
7. Define awareness level concepts of business and enterprise integration (INCOSE).
8. Define awareness level concepts of planning (INCOSE).
9. Define awareness level concepts of monitoring and control (INCOSE).
10. Define awareness level concepts of decision management (INCOSE).
11. Define how systems engineering is applied (INCOSE).
12. Define the complexities of a System of Systems (INCOSE).
13. Identify aspects of systems engineering in practice (INCOSE).

## To-Do

| # | Item | Status |
|---|---|---|
| 1 | Review instructional materials and readings | transcripts ingested; readings not supplied |
| 2 | Respond to peers on M1D2 (HC Organizations) | 3 replies drafted, ready to post |
| 3 | **Three written assignments** (due Day 7) | **prompts not yet received** |
| 4 | INCOSE quiz #2 | answered |
| 5 | Synchronous session (Tue 6–7pm ET) | — |

## Readings

- Senge ch. 3 (the Beer Game / "Prisoners of the System")
- Kossiakoff et al. ch. 4, 20, 21
- INCOSE SEH 5th ed. §§2.3.2.1, 2.3.2.2, 2.3.3.1, 2.3.3.3, 2.3.4.1, 2.3.4.2, 4.3.6

## Content map (from the five lecture transcripts)

**Part 1 — JHU systems management.** Project planning/control (budget, schedule,
resources, finance) vs. technical leadership (SE), with deliberate overlap on task
definition, risk, and the customer interface. The SE sits in the middle of the
activity, not off to the side. **Work breakdown structure**: parse into work
packages; include non-physical packages (test & integration, risk management);
scope out what you are not building (his cell-tower example) while still defining
the interface to it.

**Part 2 — INCOSE systems management processes.** Every template uses the same
five-part frame: **Inputs → Activities → Outputs**, bounded by **Controls**
(laws, policies, guidelines you must obey) and **Enablers** (specialists,
reviewers, resources you can draw on). Processes walked: Acquisition, Supply,
Life Cycle Model Management, Portfolio Management, Project Planning, Project
Assessment & Control, Decision Management. Recurring themes: tailor rather than
one-size-fits-all; monitor rather than one-and-done; document for audit; capture
lessons learned.

**Part 3 — system types.**

| Type | Definition | Test | Healthcare example |
|---|---|---|---|
| Complex system | Interrelated components toward a common objective (Kossiakoff) | Remove a part and it does nothing alone | Ventilator |
| System of systems | A set of complex systems connected for greater capability (Maier) | Remove one — capability degrades, both still function | ICU; satellite constellation |
| Enterprise system | SoS plus people, processes, workflow, decisions (Rebovich & White) | Adds common goal and human decision-making | ICU with staff and workflow |

Maier's five SoS attributes: operational independence, managerial independence,
geographic distribution, emergent behavior, evolutionary development.
SoS governance types: **directed, acknowledged, collaborative, virtual.**
INCOSE covers SoS but not enterprise systems.

**Part 4 (Biemer) — integrated systems impacts.** Senge's Beer Game: retailer →
wholesaler → distributor → factory, with delays in both information and product
flow. Local optimization produces oscillation nobody intended; COVID PPE is the
modern analogue. Applied to remote healthcare: specify upstream data types,
rates, and interfaces so what the sensor produces is what the clinician needs.

**Diagram tutorial.** Physical block diagram (boxes = physical elements, arrows =
interfaces, text = what transfers, unfilled box = outside your control), then the
same structure relabeled as a functional block diagram using verb-noun functions.
PowerPoint minimum; hand-drawn diagrams will not be accepted.

## PD-RPM classification (expected to be asked)

Most defensibly an **enterprise system**: multiple complex systems (cycler, home
devices, clinical dashboards) plus clinical staff, care partners, workflow, and
prescription decision-making. Montoya reaches the same conclusion about his own
remote cardiac example in Part 3.
