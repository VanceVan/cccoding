# -*- coding: utf-8 -*-
"""Module 9 Assignment: Questions for Rehab Center Visit."""
import os
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt
from common import newdoc, mk

D = os.path.dirname(os.path.abspath(__file__))
doc = newdoc(margin=0.9, size=10.0)
doc.styles['Normal'].paragraph_format.space_after = Pt(4)
P, H, TABLE, FIG = mk(doc)
C = WD_ALIGN_PARAGRAPH.CENTER
EM = "—"; B1 = "〈"; B2 = "〉"
N = [0]


def blank(t):
    return B1 + t + B2


def Q(t):
    N[0] += 1
    p = P(str(N[0]) + ".  " + t, after=3)
    p.paragraph_format.left_indent = Pt(26)
    p.paragraph_format.first_line_indent = Pt(-26)
    return p


t = doc.add_paragraph(); t.alignment = C
r = t.add_run("Questions for Rehabilitation Center Visit"); r.bold = True; r.font.size = Pt(14)
P("585.617 Rehabilitation Engineering | " + blank("Your Name") + " | " + blank("Date"),
  size=10, align=C, after=10)

H("Visit Details", 11.5, before=2)
P("**Facility:** Kennedy Krieger Institute\n"
  "**Location:** Baltimore, Maryland\n"
  "**Planned date of visit:** November 10, 2026\n"
  "**Interviewee:** Daniel Dobin, Clinical Assistant II, Neurobehavioral Unit (Inpatient)",
  justify=False)

H("Project Context", 11.5, before=7)
P("My project is a **wheelchair-mounted interface for handheld powered yard tools** "
  "(string trimmers, edgers, hedge trimmers, blowers) for manual wheelchair users with full "
  "upper-limb function doing residential yard maintenance on unimproved ground. It is scoped "
  "as an interface and mounting problem rather than a new tool or a new chair. The governing "
  "difficulty appears to be that three constraints are coupled: the chair is the only "
  "available reaction mass for tool torque and has a limited stability envelope; the working "
  "envelope must reach both ground level and hedge height from a fixed seated anthropometry; "
  "and manual propulsion is itself a two-handed task, so holding a tool occupies the limbs "
  "mobility requires.")
P("I have deliberately not selected a design. The questions below ask for observations and "
  "experience rather than a verdict on a proposal, several are aimed at finding out whether my "
  "scoping is wrong, and the solution directions are kept broad enough to be rejected outright.")
P("I have also weighted the set toward what my interviewee sees daily. Mr. Dobin's role is "
  "direct patient care on an inpatient neurobehavioral unit, so I am asking him about how "
  "equipment actually behaves in use, what makes a patient engage with a device or abandon it, "
  "how much staff assistance a task consumes, and what the unit requires of anything brought "
  "onto it. Questions about prescription practice, reimbursement and seating biomechanics sit "
  "with other roles, and the last question asks whether I can reach one of them during the "
  "same visit.")

H("A. The Unit and the Current State of Practice", 11.5, before=7)
P("*Goal: understand what actually happens on the unit, what equipment is in play, and how it "
  "fails, so that I have something real to benchmark against.*", size=9.5)
Q("Could you walk me through a typical day on the unit? Where do physical activity, outdoor "
  "time, or independent-living practice fit into it?")
Q("For patients who use a wheelchair or other mobility equipment, which parts of the day take "
  "the most staff assistance, and which parts are they able to manage on their own?")
Q("What equipment or assistive devices do you handle most often, and which of them actually "
  "hold up over time?")
Q("When a device fails, how does it fail? Breakage, batteries, lost parts, too fiddly to set "
  "up, or patients simply stop engaging with it?")
Q("What do patients or families ask you for that you currently cannot provide?")

H("B. What Makes a Device Work in Practice", 11.5, before=7)
P("*Goal: determine the real needs and, more importantly, how they rank " + EM + " essential, "
  "important, or nice to have.*", size=9.5)
Q("Thinking of any device that has genuinely succeeded on your unit, what did the successful "
  "ones have in common?")
Q("How would you rank these for something used on your unit: durability, speed of setup, ease "
  "of cleaning, how safe it is with limited supervision, how well it holds a patient's "
  "interest, and cost? Which of those are essential and which are merely nice to have?")
Q("How long does a patient typically stay engaged with a new activity before attention drops "
  "off? Does that change what a device has to accomplish in the first minute?")
Q("What makes you personally reluctant to hand a patient a particular piece of equipment?")
Q("How much of a device's success depends on the patient, and how much on the staff member "
  "setting it up? Is there equipment that only works when a specific person is on shift?")

H("C. Quantities I Can Design Against", 11.5, before=7)
P("*Goal: convert the needs above into numbers. These are aimed at what a direct-care role can "
  "observe and measure rather than at clinical prescription values.*", size=9.5)
Q("For a task a patient does with assistance, roughly how long does it take? How long would "
  "the same task take without help, where that is possible at all?")
Q("How many staff are typically needed for an activity involving equipment, and what would "
  "have to be true for that to drop to one?")
Q("How often does equipment on the unit need repair or replacement? Is there a service life "
  "you would consider acceptable, and one you would consider a failure?")
Q("What are the hard safety requirements for anything brought onto the unit " + EM + " "
  "cleanability, ligature risk, pinch points, parts that can be detached or thrown? I would "
  "rather design to those from the start than discover them later.")
Q("Is there a weight or a stored size above which something becomes impractical for staff to "
  "move, store, or get through a doorway?")

H("D. Solution Directions and Concept Feedback", 11.5, before=7)
P("*Goal: get reactions to broad directions without anchoring the conversation to a specific "
  "design, and surface directions I have not considered.*", size=9.5)
Q("At a high level the possibilities seem to be: carry the tool and its reaction force on the "
  "chair; carry the reaction force into the ground separately from the chair; or change the "
  "task so that a large reaction force never arises. Does any of those strike you as more or "
  "less workable, and is there a fourth I am not seeing?")
Q("If something were attached to a patient's chair, what would make you uneasy about it? What "
  "would you want to be able to release or remove instantly?")
Q("Is there a different task on your unit where the same underlying problem shows up " + EM +
  " holding or operating something while staying stable and still being able to move?")
Q("If you had an engineer for a week, what would you ask them to build?")

H("E. Additional Questions If I Can Speak With a Patient or Family Member", 11.5, before=7)
P("*Goal: hear the task described by the person doing it. Needs and priorities commonly differ "
  "between a client and a care provider, so these are narrative rather than evaluative.*",
  size=9.5)
Q("Tell me about the last time you tried to do something that did not work out. What happened, "
  "step by step?")
Q("What happens now instead? Did someone else take the task over, or did it simply stop "
  "getting done?")
Q("Is there anything you have tried and given up on? What made you stop using it?")
Q("If you could change one thing about how it goes, what would you change first?")

H("F. Specific to Kennedy Krieger Institute", 11.5, before=7)
P("*Goal: use what the facility already does, and reach the right person for the questions "
  "outside my interviewee's area.*", size=9.5)
Q("The therapy garden is described as letting patients practise therapy goals on different "
  "ground surfaces, including gravel, grass and cobblestone. Do patients from your unit use "
  "it, and what do you see them struggle with as they move between those surfaces?")
Q("The institute treats individuals up to age 21. For patients approaching that transition, "
  "how much of the planning covers independent living tasks at home, including outdoor work? "
  "Where do those patients go for equipment once they age out of your care?")
Q("Would it be possible to also speak briefly with a physical therapist, occupational "
  "therapist, or a seating and mobility specialist during my visit? Several of my questions "
  "concern wheelchair stability, propulsion and equipment funding, and I would like to put "
  "those to the right person rather than guess at the answers.")

out = f"{D}/Module_09_Assignment_Rehab_Center_Questions.docx"
doc.save(out); print("saved", N[0], "questions")
