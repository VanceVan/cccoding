# -*- coding: utf-8 -*-
"""Assignment 11: Critical Path Analysis for a knee CPM device."""
import os
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from common import newdoc, mk
from cpm import ACT, ES, LS, TF, T, CRIT

D = os.path.dirname(os.path.abspath(__file__))
doc = newdoc(margin=0.9, size=10.5)
doc.styles['Normal'].paragraph_format.space_after = Pt(5)
P, H, TABLE, FIG = mk(doc)
C = WD_ALIGN_PARAGRAPH.CENTER
EM = "—"; ARR = "→"


def shade_rows(table, idxs, hexfill="FDE8E6"):
    for i in idxs:
        for cell in table.rows[i].cells:
            tcPr = cell._tc.get_or_add_tcPr()
            sh = OxmlElement('w:shd'); sh.set(qn('w:val'), 'clear')
            sh.set(qn('w:fill'), hexfill); tcPr.append(sh)


def cap(t):
    return P(t, size=9, align=C, after=10, justify=False)


ORDER = sorted(ACT, key=lambda k: k)

t = doc.add_paragraph(); t.alignment = C
r = t.add_run("Assignment 11: Team Behavior and Tools"); r.bold = True; r.font.size = Pt(14)
P("Critical Path Analysis for a Continuous Passive Motion Device " + EM + " Knee",
  size=11.5, align=C, after=2)
P("585.617 Rehabilitation Engineering | " + "〈Your Name〉" + " | " + "〈Date〉",
  size=10, align=C, after=10)

H("1.  Device Selection", 12, before=2)
P("The device selected is a **continuous passive motion (CPM) device for the knee**. CPM "
  "devices move a joint through a prescribed arc without muscular effort from the patient, and "
  "the knee is the joint for which they are most widely prescribed " + EM + " typically "
  "following total knee arthroplasty, ligament reconstruction, or surgical release of a "
  "contracture.")
P("I chose the knee because I tore a knee ligament skiing last year and went through the "
  "rehabilitation that follows. That gave me a direct view of the task this device performs, "
  "and of the gap between the prescribed protocol and what a patient will actually tolerate "
  "and comply with at home. It also means the clinical constraints on range of motion are not "
  "abstract to me, which matters for the activities added in Section 2.")

H("2.  Activity List", 12, before=9)
P("Table 1 lists the thirteen activities given in the problem statement, together with **five "
  "activities added for this device**. The textbook network is weighted toward market and "
  "commercial activities and contains only one engineering activity (H). A CPM device is a "
  "powered medical device applied to a post-surgical joint, so the design process has to "
  "include hazard analysis, physical verification and a regulatory submission before it can be "
  "sold. The added activities (N through R) close that gap.")

rows = []
for k in ORDER:
    desc, dur, preds = ACT[k]
    rows.append([("**" + k + "**") if k in CRIT else k, desc, str(dur),
                 ", ".join(preds) if preds else EM])
tb = TABLE(["Act.", "Description", "Dur. (wk)", "Preceded by"], rows,
           [0.5, 3.9, 0.8, 1.1], fs=8.6)
shade_rows(tb, [ORDER.index(k) + 1 for k in CRIT])
cap("Table 1. Full activity list. Activities N through R were added for the knee CPM device. "
    "Shaded rows are on the critical path determined in Section 4.")

P("**N " + EM + " specify knee range-of-motion and torque safety limits (2 weeks, after A).** "
  "A knee CPM device must not drive the joint past the arc the surgeon has prescribed, and it "
  "must stall rather than force the limb if it meets resistance. These limits are a device "
  "specific requirement that falls straight out of the customer needs gathered in A, and every "
  "later safety activity depends on them.")
P("**O " + EM + " hazard analysis and risk management file (3 weeks, after D and N).** "
  "Required for a medical device under ISO 14971 [2]. It needs both the product specification "
  "from D and the motion limits from N, because the dominant hazards " + EM + " over-extension "
  "of the surgical repair, entrapment, and uncontrolled motion on a power loss " + EM + " are "
  "defined by those limits.")
P("**P " + EM + " fabricate and bench-test an engineering prototype (4 weeks, after H and O).** "
  "Physical hardware cannot be built until the design exists (H) and the risk controls that "
  "must be designed into it have been identified (O).")
P("**Q " + EM + " verification testing for electrical safety and usability (4 weeks, after "
  "P).** A mains-powered device applied to a patient must meet IEC 60601-1 [3], and the "
  "usability engineering process of IEC 62366-1 [4] applies because the device is operated by "
  "patients and nursing staff rather than by engineers. Both require hardware, so both wait on P.")
P("**R " + EM + " prepare and submit the 510(k) premarket notification (5 weeks, after Q).** "
  "A CPM device reaches the United States market through premarket notification against a "
  "predicate device, and the submission cannot be assembled until verification evidence from Q "
  "exists.")

H("3.  Method", 12, before=9)
P("The critical path was found by the Critical Path Method as described in Dieter and Schmidt "
  "[1]. A **forward pass** through the network sets each activity's early start to the latest "
  "early finish among its predecessors, and its early finish to the early start plus the "
  "duration. The largest early finish in the network is the project duration. A **backward "
  "pass** then sets each activity's late finish to the earliest late start among its "
  "successors, working back from the project duration, and the late start to the late finish "
  "minus the duration. **Total float** is the late start minus the early start: the time an "
  "activity can slip without delaying the project. Activities with zero total float form the "
  "critical path. The passes were carried out in a short Python script so that the arithmetic "
  "could be checked, and the results are reported in Table 2.")

H("4.  Network Diagram", 12, before=9)
FIG(f"{D}/fig1_cpm_network.png", 6.7,
    "Figure 1. Activity-on-node network for the knee CPM project. The critical path is shown "
    "in red. Dashed arrows mark precedences given in the problem statement that are already "
    "implied by a longer chain (B" + ARR + "D" + ARR + "H and B" + ARR + "E" + ARR + "J); they "
    "are drawn for completeness but place no additional constraint on the schedule.")

H("5.  Critical Path Table", 12, before=9)
rows2 = []
for k in ORDER:
    desc, dur, _ = ACT[k]
    crit = k in CRIT
    f = (lambda s: "**" + s + "**") if crit else (lambda s: s)
    rows2.append([f(k), desc, f(str(dur)), f(str(ES[k])), f(str(LS[k])), f(str(TF[k]))])
tb2 = TABLE(["Act.", "Description", "Duration", "Early start", "Late start", "Total float"],
            rows2, [0.5, 3.1, 0.75, 0.8, 0.8, 0.75], fs=8.6)
shade_rows(tb2, [ORDER.index(k) + 1 for k in CRIT])
cap("Table 2. Critical path analysis. All times are in weeks from project start. Shaded rows "
    "have zero total float and form the critical path.")

H("6.  Results and Discussion", 12, before=9)
P("**The critical path is B " + ARR + " D " + ARR + " H " + ARR + " P " + ARR + " Q " + ARR +
  " R, and the project duration is " + str(T) + " weeks.** Evaluating the competitor's product "
  "feeds the product specification, which feeds the design, which feeds the prototype, "
  "verification and submission. Every activity on that chain has zero float, so a one-week "
  "slip anywhere along it is a one-week slip to the whole project.")
P("The most useful result is what the added activities did to the schedule. Run with the "
  "thirteen original activities alone, the network completes in **13 weeks** and has **two** "
  "critical paths of equal length (B" + ARR + "D" + ARR + "H" + ARR + "M and B" + ARR + "D" +
  ARR + "G" + ARR + "J" + ARR + "M). Adding the five device-specific activities extends the "
  "project to 23 weeks and makes the critical path unique. The regulatory and verification "
  "chain P" + ARR + "Q" + ARR + "R alone accounts for 13 of those 23 weeks " + EM + " more "
  "than half the project. For a medical device that result is the point of the exercise: a "
  "schedule built only from the commercial activities would have promised the programme in 13 "
  "weeks when it actually needs 23.")
P("**The near-critical branch deserves management attention.** Activities A, N and O carry only "
  "**one week** of total float each. The chain A" + ARR + "N" + ARR + "O" + ARR + "P reaches P "
  "at week 9 against P's early start of week 10, so if specifying the range-of-motion and "
  "torque limits slips by more than one week it becomes critical and the project slips with "
  "it. Those limits depend on clinical input, which is outside the engineering team's control, "
  "so this is a real risk rather than a theoretical one.")
P("**The commercial branch is not a schedule risk.** Defining the market (C) carries 14 weeks "
  "of float, and the marketing chain F" + ARR + "I" + ARR + "K carries 13. Establishing product "
  "pricing (M) carries 10 weeks of float, despite having been critical before the device "
  "activities were added. Resources can be moved off these activities toward the critical "
  "chain without affecting the completion date.")
P("**If the schedule had to be compressed**, the places to attack are the long critical "
  "activities: design and test (H, 5 weeks), the 510(k) preparation (R, 5 weeks), and the two "
  "four-week activities P and Q. Shortening any non-critical activity would buy nothing. The "
  "usual caution applies " + EM + " crashing one chain can make another critical, and with A, "
  "N and O sitting at one week of float, the A" + ARR + "N" + ARR + "O branch would become "
  "critical after only a small reduction in the B" + ARR + "D" + ARR + "H leg.")

H("References", 12, before=9)
refs = [
 "[1] G. E. Dieter and L. C. Schmidt, *Engineering Design*, 5th ed. New York, NY, USA: McGraw-Hill, 2013.",
 "[2] *ISO 14971: Medical devices " + EM + " Application of risk management to medical devices*. Geneva, Switzerland: International Organization for Standardization, 2019.",
 "[3] *IEC 60601-1: Medical electrical equipment " + EM + " Part 1: General requirements for basic safety and essential performance*. Geneva, Switzerland: International Electrotechnical Commission.",
 "[4] *IEC 62366-1: Medical devices " + EM + " Part 1: Application of usability engineering to medical devices*. Geneva, Switzerland: International Electrotechnical Commission, 2015.",
]
for x in refs:
    pp = P(x, size=9, after=2)
    pp.paragraph_format.left_indent = Pt(22); pp.paragraph_format.first_line_indent = Pt(-22)

out = f"{D}/Module_11_Assignment_CPM_Knee.docx"
doc.save(out); print("saved")
