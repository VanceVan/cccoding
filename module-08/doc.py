# -*- coding: utf-8 -*-
"""Module 8 Ethnography Assignment - working draft."""
import os
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt
from common import newdoc, mk

D = os.path.dirname(os.path.abspath(__file__))
doc = newdoc(margin=1.0, size=11.0)
doc.styles['Normal'].paragraph_format.space_after = Pt(6)
P, H, TABLE, FIG = mk(doc)
C = WD_ALIGN_PARAGRAPH.CENTER
EM = "—"; B1 = "〈"; B2 = "〉"


def blank(t):
    return B1 + t + B2


t = doc.add_paragraph(); t.alignment = C
r = t.add_run("Module 8 Ethnography Assignment"); r.bold = True; r.font.size = Pt(14)
P("585.617 Rehabilitation Engineering | " + blank("Your Name") + " | " + blank("Date"),
  size=10, align=C, after=12)

H("Video and Segment", 12, before=6)
P("**Video:** " + blank("paste the full URL here") + "\n"
  "**Segment of interest:** " + blank("mm:ss") + " to " + blank("mm:ss") + "\n"
  "**Setting observed:** " + blank("e.g. outpatient physical therapy gym, inpatient rehab unit") + "\n"
  "**Person observed:** " + blank("patient / therapist / both; any stated diagnosis or impairment"),
  justify=False)

H("Part 1 " + EM + " Task Analysis", 12, before=10)
P("Figure 1 is the workflow for the segment above. It uses the notation from the module "
  "lecture: an **oval** marks a delimiter, a **diamond** marks a decision point where the "
  "workflow can branch, a **plain box** marks an ordinary task, and a **red-outlined box** "
  "marks a task the person found difficult. Decisions are included wherever the observed "
  "workflow could have gone more than one way, because the branches are where a design "
  "intervention has somewhere to act.")
FIG(f"{D}/fig1_task_analysis.png", 6.4,
    "Figure 1. Task analysis of the observed segment. Red outlines mark the steps that were "
    "visibly difficult.")
P("The two steps outlined in red are " + blank("name the difficult steps") + ". They are "
  "marked difficult because " + blank("what you saw: hesitation, repeated effort, loss of "
  "balance, verbal cueing from the therapist, a pause before committing") + ".")

H("Part 2 " + EM + " The Selected Difficult Task", 12, before=10)
P("The task selected for detailed analysis is **" + blank("step name") + "**, which occurs at "
  + blank("mm:ss") + " in the video.")

qs = [
 ("What is the context of the task?",
  "Describe where the task sits in the larger workflow, who else is present, what the person "
  "is trying to accomplish, and what has just happened immediately before. Context is what "
  "separates an ethnographic note from a list of motions."),
 ("What hazards are present?",
  "Name what could go wrong, not only what did. For a transfer this usually includes a fall "
  "to the floor, shear across the skin at the point of contact, the chair rolling if the "
  "brakes are unlocked, and entrapment of a foot on a footplate."),
 ("What tools did the person use?",
  "List every object that carries load or information: the wheelchair and its brakes and "
  "armrests, a gait belt, a transfer board, parallel bars, the mat table, and the therapist's "
  "hands, which are a tool in this analysis."),
 ("What task was difficult to do?",
  "State the single step, as it appears in Figure 1."),
 ("What attitude did the person have towards doing the difficult task?",
  "Report what was observable rather than inferred feeling: facial expression, whether they "
  "initiated or waited to be prompted, whether they narrated or joked, whether they refused "
  "or renegotiated. Note when you are inferring."),
 ("How many attempts did it take to do the task?",
  "Count discrete attempts, and define what you counted as an attempt."),
 ("How long did it take to do the difficult task?",
  "Give elapsed time for the step, and for comparison the elapsed time of a neighbouring "
  "ordinary step. The ratio is more informative than the raw number."),
 ("What was difficult about the task?",
  "Separate the cause from the symptom: strength, range of motion, balance, pain, "
  "coordination, fear, the equipment, or the environment. This is the finding the design "
  "requirement will be written against."),
 ("What would make it easier?",
  "Give at least two options at different levels: a change to the environment or the "
  "equipment, and a change to the technique or the workflow. Keep them solution-neutral "
  "where you can."),
]
for q, guide in qs:
    P("**" + q + "** " + blank("answer") + "  *" + guide + "*")

H("Part 3 " + EM + " What This Means for Design Requirements", 12, before=10)
P("The observation above converts into design input in three ways. First, the difficult step "
  "identifies **where** the requirement applies, which is narrower and more useful than a "
  "requirement written against the whole activity. Second, the attempt count and elapsed "
  "time give a **baseline to measure against**, so a later design can be tested for whether "
  "it actually reduced either. Third, the hazards observed become **constraints** rather "
  "than features, because a device that makes the step easier while making a fall more "
  "likely has not improved anything.")
P("Carried into the final project, the specific items to take forward are "
  + blank("two or three requirements, stated as problem / population / outcome rather than "
          "as solutions") + ".")

out = f"{D}/Module_08_Ethnography_Assignment_DRAFT.docx"
doc.save(out); print("saved")
