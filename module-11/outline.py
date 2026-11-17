# -*- coding: utf-8 -*-
"""Assignment 11 - outline and work split for the partner handoff."""
import os
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt
from common import newdoc, mk

D = os.path.dirname(os.path.abspath(__file__))
doc = newdoc(margin=0.9, size=10.5)
doc.styles['Normal'].paragraph_format.space_after = Pt(5)
P, H, TABLE, FIG = mk(doc)
C = WD_ALIGN_PARAGRAPH.CENTER
EM = "—"; ARR = "→"


def step(n, t):
    p = P("**Step " + str(n) + ".**  " + t, after=4)
    p.paragraph_format.left_indent = Pt(26); p.paragraph_format.first_line_indent = Pt(-26)
    return p


def bullet(t):
    p = P("•  " + t, after=3)
    p.paragraph_format.left_indent = Pt(26); p.paragraph_format.first_line_indent = Pt(-12)
    return p


t = doc.add_paragraph(); t.alignment = C
r = t.add_run("Assignment 11 " + EM + " Outline and Work Split")
r.bold = True; r.font.size = Pt(14)
P("585.617 Rehabilitation Engineering | Vance Van Volkenburgh and Katelyn Blackwood",
  size=10, align=C, after=2)
P("Device: continuous passive motion (CPM) device for the knee", size=10, align=C, after=10)

H("1.  What we have to hand in", 12, before=2)
P("One document. The assignment asks us to determine the critical path for the CPM product "
  "development process, and the rubric is specific about the form that takes:")
bullet("**10 points** " + EM + " appropriately identifies activities, timing and preceding "
       "activities pertinent to the selected topic, including at least three activities we add "
       "ourselves.")
bullet("**30 points** " + EM + " illustrates the determination of the critical path through "
       "(a) a CPM network diagram with the critical path highlighted, and (b) a table with "
       "columns for activity, description, duration, early start, late start and total float, "
       "with the critical rows highlighted.")
bullet("**10 points** " + EM + " organization and structure, informative subheadings, "
       "references used to support the content.")

H("2.  Outline of the final merged document", 12, before=9)
TABLE(["§", "Section", "Owner", "Status"],
      [["1", "Device selection and rationale", "Vance", "**Complete**"],
       ["2", "Activity list (Table 1) and justification of the five added activities", "Vance", "**Complete**"],
       ["3", "Method: how CPM is applied", "Vance", "**Complete**"],
       ["4", "Network diagram (Figure 1), critical path highlighted", "Katelyn", "To do"],
       ["5", "Critical path table (Table 2), critical rows highlighted", "Katelyn", "To do"],
       ["6", "Results and discussion", "Katelyn", "To do"],
       ["7", "References", "Vance started; add any you use", "Open"]],
      [0.4, 3.6, 1.2, 0.9], fs=8.8)
P("Table A. Section ownership. Sections 1 to 3 are attached as "
  "*Module_11_Part1_Completed*; they cover the 10-point activity item and most of the "
  "organization points.", size=9, align=C, after=10, justify=False)

H("3.  What Part 1 already gives you", 12, before=8)
P("Everything in Section 4 onward runs off the activity table in Part 1, so nothing in your "
  "half depends on a decision that is still open. Specifically you have: all **eighteen "
  "activities** (the thirteen given plus five added for this device), each with a "
  "**description**, a **duration in weeks**, and its **predecessors**; and a written "
  "justification for each added activity, so the discussion in Section 6 can refer back to "
  "why they are there rather than re-arguing it.")

H("4.  Part 2 " + EM + " the half still to do", 12, before=9)
step(1, "**Forward pass.** Work left to right. Early start of an activity is the largest early "
        "finish among its predecessors (zero if it has none); early finish is early start plus "
        "duration. The largest early finish anywhere in the network is the project duration.")
step(2, "**Backward pass.** Work right to left. Every activity with no successors takes late "
        "finish equal to the project duration. For the rest, late finish is the smallest late "
        "start among its successors; late start is late finish minus duration.")
step(3, "**Total float** for each activity is late start minus early start.")
step(4, "**Critical path** is every activity with zero total float, read start to finish. Note "
        "the project duration while you are there " + EM + " the discussion needs it.")
step(5, "**Network diagram (Figure 1).** Activity-on-node, left to right. Put the activity "
        "letter, duration and the computed times in each node, and highlight the critical "
        "nodes and the arrows between them.")
step(6, "**Table (Table 2).** Six columns, named exactly as the rubric does: activity, "
        "description, duration, early start, late start, total float. Shade the zero-float rows.")
step(7, "**Discussion (Section 6).** The project duration and what the critical path means; "
        "which activities carry the most float and could therefore give up resources; any "
        "branch that is close to critical; and which activities you would attack first if the "
        "schedule had to be compressed.")

H("5.  Four things worth knowing before you start", 12, before=9)
bullet("**The table asks for early start and late start, not early and late finish.** So total "
       "float is simply late start minus early start. No need to carry the finishes into the "
       "table, though you will compute them along the way.")
bullet("**Compute float for every activity rather than tracing the longest path by eye.** More "
       "than one chain can tie at the project duration, and spotting that only comes out of the "
       "float column.")
bullet("**Four activities have no successors: K, L, M and R.** All four take late finish equal "
       "to the project duration at the start of the backward pass. Missing one of them is the "
       "usual way this calculation goes wrong.")
bullet("**Two given precedences are already implied by longer chains** " + EM + " B" + ARR +
       "H (because B" + ARR + "D" + ARR + "H exists) and B" + ARR + "J (because B" + ARR + "E" +
       ARR + "J exists). They are real constraints and should appear, but they add nothing to "
       "the schedule. Drawing them dashed keeps the diagram readable.")

H("6.  Roles and merge plan", 12, before=9)
P("Dieter and Schmidt recommend that teams assign administrative roles distinct from the "
  "technical work [1]. For a two-person team the useful subset is:")
bullet("**Vance " + EM + " repository and report manager.** Holds the working files, assembles "
       "the two halves into one document, and owns the final formatting, numbering and "
       "reference list.")
bullet("**Katelyn " + EM + " analysis lead.** Owns the CPM computation and the two artefacts "
       "that carry the 30 points, and writes the discussion that interprets them.")
bullet("**Both** " + EM + " each reviews the other's half before submission. The single "
       "highest-value check is that Figure 1 and Table 2 agree with each other, and that both "
       "agree with the durations and predecessors in Table 1.")

H("7.  Suggested sequence", 12, before=9)
TABLE(["When", "What", "Who"],
      [["Now", "Part 1 handed over (attached)", "Vance " + ARR + " Katelyn"],
       ["Next", "Forward and backward passes, float column", "Katelyn"],
       ["Then", "Figure 1 and Table 2 drafted", "Katelyn"],
       ["Then", "Section 6 discussion written", "Katelyn"],
       ["Before submission", "Merge, cross-check figure against table, format, references", "Vance"],
       ["Before submission", "Both read the merged document end to end", "Both"]],
      [1.0, 3.9, 1.3], fs=8.8)

H("Reference", 12, before=9)
pp = P("[1] G. E. Dieter and L. C. Schmidt, *Engineering Design*, 5th ed. New York, NY, USA: "
       "McGraw-Hill, 2013, ch. 4.", size=9, after=2)
pp.paragraph_format.left_indent = Pt(22); pp.paragraph_format.first_line_indent = Pt(-22)

doc.save(f"{D}/Module_11_Outline_and_Work_Split.docx"); print("outline saved")
