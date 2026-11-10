# -*- coding: utf-8 -*-
"""Rehabilitation center visit plan."""
import os
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt
from common import newdoc, mk

D = os.path.dirname(os.path.abspath(__file__))
doc = newdoc(margin=0.85, size=10.0)
doc.styles['Normal'].paragraph_format.space_after = Pt(4)
P, H, TABLE, FIG = mk(doc)
C = WD_ALIGN_PARAGRAPH.CENTER
EM = "—"; B = "•  "


def bullet(t, ind=14):
    p = P(B + t, after=2)
    p.paragraph_format.left_indent = Pt(ind + 12)
    p.paragraph_format.first_line_indent = Pt(-12)
    return p


t = doc.add_paragraph(); t.alignment = C
r = t.add_run("Rehabilitation Center Visit " + EM + " Plan"); r.bold = True; r.font.size = Pt(13.5)
P("Kennedy Krieger Institute, Baltimore MD | November 10, 2026 | "
  "Daniel Dobin, Clinical Assistant II, Neurobehavioral Unit (Inpatient)",
  size=9.5, align=C, after=10)

H("1.  What this visit has to produce", 11.5, before=2)
P("Four things are required downstream, so the visit is not finished until each has been "
  "captured. The first two are named explicitly in the project description.")
bullet("**Needs with a priority ranking.** The Preliminary Design Review requires a Kano "
       "diagram, and the description states that the clinical or client interview should guide "
       "the needs prioritization. A list of needs without a ranking does not satisfy this.")
bullet("**Reaction to solution directions.** The concept screening must include feedback from "
       "clinical contacts on the chosen concept. Whatever is said today about the three broad "
       "directions becomes the clinical input to the Pugh matrix later.")
bullet("**Benchmarking numbers.** Cost, service life, setup time, staff count per task, "
       "repair frequency. These populate the state-of-the-art section and the PDS.")
bullet("**Observation notes.** Written up the same day, while detail is still recoverable.")

H("2.  Running order (45" + EM + "60 minutes)", 11.5, before=9)
P("**Opening, 5 min.** Introduce yourself as a Hopkins engineering graduate student in a "
  "rehabilitation engineering course. State the project in two sentences. **Ask permission "
  "before taking any notes, sketches or photographs** " + EM + " this is a behavioral "
  "inpatient unit, patient privacy governs, and the answer on photography is likely no. "
  "Follow staff direction on where you may go without further discussion.")
P("**Tour and observation, 20 min.** The project description asks you to observe a patient in "
  "evaluation and treatment with members of the rehab team. Treat it as the Module 8 exercise: "
  "watch for the task sequence, not the diagnosis.")
bullet("Note the **step sequence** of whatever activity you see, in order. You are building a "
       "task analysis, so capture the steps even if the activity is unrelated to your project.")
bullet("Mark the steps that are **difficult**, and why " + EM + " hesitation, repeated effort, "
       "staff prompting, a pause before committing.")
bullet("Where possible, **count and time**: attempts, seconds for the hard step, seconds for "
       "an ordinary step beside it. The ratio is the useful number.")
bullet("Note **where staff assistance concentrates**. That is where the design opportunity is.")
bullet("Ask whether the **therapy garden** can be included. Its gravel, grass and cobblestone "
       "surfaces are the closest thing on site to your operating environment.")
P("**Hands on the equipment, 10 min.** The description asks you to experience assistive "
  "technology close to your project. Ask to handle anything that attaches to a chair.")
bullet("For each: **weight, how it attaches, how long setup takes, how it releases**, and "
       "whether you could do it one-handed.")
bullet("Note what it is **made of and how it is cleaned**. On this unit, cleanability is a "
       "requirement rather than a preference.")
P("**Interview, 20 min.** Work from the submitted question list. If time collapses, the six "
  "below are the ones to protect.")
P("**Close, 5 min.** Ask for the referral to a PT, OT or seating and mobility specialist "
  "(question 26). Ask whether you may follow up by email with anything you missed, and get an "
  "address. Thank him, and say what you will send back.")

H("3.  The six questions to protect if time runs short", 11.5, before=9)
bullet("**Q14 " + EM + " hard safety requirements for anything brought onto the unit**: "
       "cleanability, ligature risk, pinch points, parts that detach or can be thrown. Nobody "
       "else you meet will answer this as well, and these are real design constraints.")
bullet("**Q7 " + EM + " rank durability, setup speed, cleanability, safety with limited "
       "supervision, holding interest, and cost.** Push for essential / important / nice to "
       "have. This is the Kano input and it is required.")
bullet("**Q4 " + EM + " how devices fail**: breakage, batteries, lost parts, too fiddly, or "
       "patients simply disengage. Abandonment is more informative than adoption.")
bullet("**Q16 " + EM + " the three solution directions.** Carry the tool and its reaction "
       "force on the chair; carry the force into the ground separately; or change the task so "
       "a large force never arises. Record the reasoning, not just the preference.")
bullet("**Q12 " + EM + " staff count per activity, and what would reduce it to one.** A "
       "quantified metric you can design against.")
bullet("**Q26 " + EM + " the referral.** Everything about stability, propulsion and funding "
       "sits with a clinician you have not met yet.")

H("4.  Be upfront about two things", 11.5, before=9)
P("Both will come up, and both are better volunteered than discovered.")
bullet("**You have not converged on a design.** The project description frames this visit as "
       "gathering input on the problem *and* the proposed solution, but concept generation for "
       "this project has not happened yet. Say that the three directions are deliberately "
       "broad and that you would rather leave with a fourth you had not considered.")
bullet("**Your population is adults; this unit is pediatric and behavioral.** Rather than "
       "work around it, use question 25: what happens at the age-21 transition, how much "
       "planning covers independent living at home, and where patients source equipment after "
       "they age out. That turns the mismatch into the most interesting question you ask.")

H("5.  Within thirty minutes of leaving", 11.5, before=9)
P("Before anything else, sit down and write. Specifically:")
bullet("The **task sequence** you observed, in order, with the difficult steps marked " + EM +
       " this is the raw material for a task analysis diagram.")
bullet("Any **numbers** you heard, with units and the question they answered.")
bullet("The **needs ranking**, exactly as he ordered it, including anything he refused to rank.")
bullet("**Direct quotes.** Two or three sentences in his own words are worth more in the PDR "
       "than a page of paraphrase.")
bullet("**What surprised you.** The thing you did not expect is usually the finding.")
bullet("Anything you **could not get**, and who you would need to ask.")

out = f"{D}/Rehab_Center_Visit_Plan.docx"
doc.save(out); print("saved")
