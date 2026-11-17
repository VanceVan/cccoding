# Module 11 — Team Behavior and Tools (Critical Path Method)

EN.585.617.81.FA26 Rehabilitation Engineering

## Deliverable
`Module_11_Assignment_CPM_Knee.docx` / `.pdf` — 4 pages. Built by `doc.py`,
which imports the solved schedule from `cpm.py`.

**Device:** continuous passive motion device for the **knee**.
**Result:** critical path **B → D → H → P → Q → R**, project duration
**23 weeks**.

## Added activities (the 10-point rubric item)
Five activities were added to the textbook's thirteen, all specific to a
powered medical device applied to a post-surgical joint:

| | Activity | Dur. | After |
|---|---|---|---|
| N | Specify knee ROM and torque safety limits | 2 | A |
| O | Hazard analysis and risk management file (ISO 14971) | 3 | D, N |
| P | Fabricate and bench-test engineering prototype | 4 | H, O |
| Q | Verification: electrical safety and usability (IEC 60601-1, 62366-1) | 4 | P |
| R | Prepare and submit 510(k) premarket notification | 5 | Q |

They were deliberately chained into the existing network at A, D and H so
they interact with the schedule rather than dangling off it.

## Findings worth defending
- **Baseline check.** With only the original thirteen activities the network
  finishes in **13 weeks** and has **two** critical paths of equal length
  (B→D→H→M and B→D→G→J→M). Adding the device activities pushes it to 23 weeks
  and makes the critical path unique. Both results were computed
  independently by `cpm.py`.
- **Near-critical branch.** A, N and O carry only **one week** of float. The
  A→N→O→P chain reaches P at week 9 against P's early start of 10, so a slip
  of more than a week in specifying the ROM and torque limits makes that
  branch critical. Those limits depend on clinical input, so it is a genuine
  risk.
- **P→Q→R is 13 of the 23 weeks.** The regulatory and verification chain is
  more than half the programme — the substantive point of adding them.
- **M was critical and no longer is**, now carrying 10 weeks of float.

## Build
```
python3.13 cpm.py     # solves the schedule, writes fig1_cpm_network.png
python3.13 doc.py     # builds the document from the solved values
soffice --headless --convert-to pdf Module_11_Assignment_CPM_Knee.docx
```
`cpm.py` holds the activity table in one dict and does the forward and
backward passes, so changing a duration or a predecessor updates the figure,
both tables and the discussion numbers together.

## Note
The assignment asks for groups of 2–3. This was completed individually at the
student's choice, so no team-role material from the Ch. 4 readings is cited.
