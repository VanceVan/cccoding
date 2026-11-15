# Team Gold — Final Project: Heart Failure Remote Monitoring System (HFRMS)

Ingested 2026-11-15 from the team's `General` share (34 files).

> **This is a different system from PD-RPM.** The individual coursework is peritoneal
> dialysis remote monitoring. The team project is **chronic heart failure** remote
> monitoring. Method transfers; content does not. Never paste PD-RPM artifacts in.

## The team and the machinery

- **Members:** Vance Vanvolkenburgh, William Ryan, Elisa Penetar, Mai Dang, Yuhao Hu,
  Rebecca Napier, Caitlin Costello.
- **Meetings:** Sundays 1:00 pm Mountain, Teams. Work due **24 h before** (Sat 1:00 pm).
- **Format:** .docx, APA 7, naming `Plan ID - Name`, filed under *Individual Artifacts*.
- **Tools:** draw.io for diagrams, VoiceThread for the narrated deck.
- **Roles:** PM Will · Systems integration Rebecca/Mai · **Documentation integration
  Vance/Yuhao** · Presentation Caitlin/Elisa.
- **Milestones:** requirements freeze **Nov 8** · substantive work complete **Nov 29** ·
  submit **Dec 16**.
- **Final deliverables:** written report **PDF, 30 pages minimum**; narrated PowerPoint
  **.mp4, 20 slides minimum**; one Canvas submission naming the whole team.

## Vance's assignments

| ID | Item | Due | Status in the plan |
|---|---|---|---|
| **2.3.2** | **Functional architecture 2 — one top-level function decomposed to level 2** | **Nov 15** | **initial draft not checked** |
| 5.1.1 | Full report draft (with Yuhao) | Dec 6 | not started |
| — | Documentation integration, all sprints (with Yuhao) | ongoing | ongoing |

## The system as the team has defined it

Home-based multisensor monitoring plus a centralized clinical platform. Collects
**weight, blood pressure, heart rate, SpO2 and patient-reported symptoms**, transmits
securely, validates, stores, trends, and surfaces findings to a care team. **Clinicians
retain all diagnostic and prescribing authority** — stated explicitly in the CONOPS.

- **Target:** adults with chronic HF in outpatient care, home setting.
- **Out of scope:** new PA-pressure sensors (settled at the Nov 1 meeting), autonomous
  diagnosis or prescribing, emergency/inpatient operations, unrelated conditions.
- **Boundary:** inside — provided devices, adapters and home gateway, monitoring
  platform, storage and analytics, alert rules, clinician dashboard, reports and audit.
  Outside — patients and caregivers, clinical staff, EHR, public cellular/internet,
  vendors, hospital operations, regulators and payers.
- **WBS level 1:** 1.1 Physiological Monitoring · 1.2 Patient Interface ·
  1.3 Communications · 1.4 Data Management · 1.5 Clinical Monitoring ·
  1.6 Integration and Security.

### Level 1 functional architecture (Will, 2.3.1 — complete)

Thirteen functions, drawn in draw.io with an ICOM frame:

| | Function | | Function |
|---|---|---|---|
| F1 | Activate Sensors | F8 | Store Data |
| F2 | Verify Sensor Comms | F9 | Generate Patient Identifier |
| F3 | Record Clinical Data | F10 | Apply Review Criteria |
| F4 | Record Manual Symptoms | F11 | Display Clinical Data |
| F5 | Compile Patient Data | F12 | Receive Clinical Input |
| F6 | Display Patient Data | F13 | Display System Data |
| F7 | Validate Data | | |

- **Controls (top):** Privacy & Security Regulations · Infrastructure Regulations ·
  Clinical Governance. **(bottom):** Geography · System Configuration.
- **External inputs:** Patient Interaction, Physiologic Data, Patient-reported Data.
  **Outputs:** Clinical Team Interactions, Clinical Status, System Status, Analytics
  Data, Patient Notifications.
- Arrows carry noun labels (Encoded Sensor Data, Validated Patient Data, Criteria Match
  Data, and so on). An N-squared matrix and an RTM accompany it.
- Allocation rules for the controls are stated explicitly — geography on the
  transmitting side of physically separated interfaces, infrastructure regulations on
  regulated network interfaces, privacy/security on external I/O and storage, clinical
  governance on human-in-the-loop functions, system configuration on functions set by
  non-clinical staff. **Reuse these rules verbatim in the level 2 decomposition.**

### Operational needs, requirements and KPPs (Rebecca, 1.4–1.6 — complete)

- **ON1–ON10**: manageable home monitoring · longitudinal visibility · identification of
  deterioration · patient friction and adherence · notification and escalation · data
  accuracy and integrity · secure information management · monitoring status and
  completeness · continuity during comms disruption · EHR integration and longitudinal
  analysis.
- **OR1–OR24** (note: the plan asked for 20).
- **KPP1** clinical data availability 95/99% · **KPP2** alert timeliness 5 min for
  95/99% · **KPP3** data accuracy and integrity 99/99.9% · **KPP4** connectivity and
  data recovery 99/99.9% within 1 h, 7 days local buffering · **KPP5** EHR integration
  95/99%.

### Other artifacts in hand

- Three operational scenarios (routine monitoring · deterioration and escalation ·
  connectivity interruption and recovery).
- Physical architecture level 1 (Caitlin, 3.1.1): BP monitor, weight scale, pulse
  oximeter, home gateway, HFRMS platform, clinical dashboard, EHR, plus provider,
  patient and analyst actors.
- Cellular gateway trade study in progress (Will, 3.2.1), framed on the JHU 12 steps,
  mapped to OR1–OR4, OR5, OR7, OR8, OR16, OR17, OR19–OR21.
- Prior individual work from Rebecca Napier and Will Ryan (M3A1–M5A2) as style examples.
- Presentation .pptx exists but is effectively empty.

## Defects and open questions found on ingest

Ordered by how much they could cost.

1. **KPP3 traceability is wrong.** KPP3 (Data Accuracy and Integrity) traces to
   "OR13–OR15", which are review criteria, notification and disposition — the same ORs
   KPP2 traces to. Accuracy and integrity should trace to **OR6, OR7, OR9**.
2. **The trade study mis-states KPP4.** `3.2.1` lists "KPP4 – 99% of patients complete a
   symptom report in 2 minutes or less". KPP4 is **connectivity and data recovery**.
   The symptom-report figure belongs to OR5.
3. **Target population is still undecided** after the Nov 8 requirements freeze. The
   combined concept still says "Decide on whether the initial design should include all
   eligible patients or focus on a higher-risk subgroup." Frozen requirements over an
   open population is a contradiction a grader can see.
4. **RTM may be missing F13.** The header runs F1–F12 while the functional diagram and
   N-squared matrix both carry 13 functions.
5. **Requirement count.** Plan item 1.5 says 20 operational requirements; the document
   delivers 24. Fine in substance, but the plan and the report should agree.
6. **Typos that change meaning in OR21:** "transmit *buffere* observations" and "flag
   *uncovered* gaps" — ON9 and scenario 3 both say **unrecovered**. Also OR24
   "within 24 hours *ofacceptance*".
7. **No heart-rate device in the physical architecture.** OR3 requires HR measurements;
   the level 1 physical diagram shows BP monitor, scale and oximeter only. HR presumably
   derives from one of those, but it should be stated.
8. **WBS has no programmatic branches.** Sprint 4 (Nov 29) requires integration
   approach, testing approach and risks for design, integration, testing and operations.
   The WBS stops at six product branches with nothing for those to hang on.
9. **Trade study 2 is still unchosen** — the plan reads "NIBP, SpO2, manual symptom?",
   owner Yuhao, due Nov 22.

## Carry-forward from Vance's individual coursework

Method only, never content.

| Individual work | Reusable method for the team |
|---|---|
| M4A1 | the instructor's functional-diagram conventions and N-squared usage |
| M8A1 | bottom-up staged integration with entry/exit gates, feeds item 4.1 |
| M8A2 | V-model, verification vs validation, two scenarios, feeds item 4.2 |
| M5A2 | IF-THEN risk statements, 5x5 cube, burn-down, feeds items 4.3–4.6 |
| M9A1 / M9A2 | production transition and concurrent engineering, feeds item 4.7 |
