# -*- coding: utf-8 -*-
"""Assignment 11, Part 1 - completed first half (activity definition and method)."""
import os
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt
from common import newdoc, mk
from cpm import ACT

D = os.path.dirname(os.path.abspath(__file__))
doc = newdoc(margin=0.9, size=10.5)
doc.styles['Normal'].paragraph_format.space_after = Pt(5)
P, H, TABLE, FIG = mk(doc)
C = WD_ALIGN_PARAGRAPH.CENTER
EM = "—"
ORDER = sorted(ACT)

t = doc.add_paragraph(); t.alignment = C
r = t.add_run("Assignment 11: Team Behavior and Tools"); r.bold = True; r.font.size = Pt(14)
P("Part 1 " + EM + " Device Selection, Activity Definition and Method", size=11.5,
  align=C, after=2)
P("585.617 Rehabilitation Engineering | Vance Van Volkenburgh and Katelyn Blackwood",
  size=10, align=C, after=2)
P("Part 1 prepared by Vance Van Volkenburgh", size=9.5, align=C, after=10)

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
  "sold. The added activities (N through R) close that gap, and each one is attached to the "
  "existing network rather than appended to the end, so that it interacts with the schedule.")

rows = [[k, ACT[k][0], str(ACT[k][1]), ", ".join(ACT[k][2]) if ACT[k][2] else EM]
        for k in ORDER]
TABLE(["Act.", "Description", "Dur. (wk)", "Preceded by"], rows,
      [0.5, 3.9, 0.8, 1.1], fs=8.6)
P("Table 1. Full activity list. Activities A through M are given in the problem statement; "
  "N through R were added for the knee CPM device.", size=9, align=C, after=10, justify=False)

H("2.1  Justification for the added activities", 11.5, before=8)
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
P("The critical path will be found by the Critical Path Method as described in Dieter and "
  "Schmidt [1]. A **forward pass** through the network sets each activity's early start to the "
  "latest early finish among its predecessors, and its early finish to the early start plus "
  "the duration; the largest early finish in the network is the project duration. A "
  "**backward pass** then sets each activity's late finish to the earliest late start among "
  "its successors, working back from the project duration, and the late start to the late "
  "finish minus the duration. **Total float** is the late start minus the early start: the "
  "time an activity can slip without delaying the project. Activities with zero total float "
  "form the critical path.")

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

doc.save(f"{D}/Module_11_Part1_Completed.docx"); print("part1 saved")
