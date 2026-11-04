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
  "**Interviewee:** " + blank("name and role, e.g. physical therapist, OT, seating and "
  "mobility ATP"), justify=False)

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

H("A. State of the Art and Current Practice", 11.5, before=7)
P("*Goal: understand what exists today, what it costs, and where it fails, so that I have "
  "something to benchmark against.*", size=9.5)
Q("When a patient tells you they want to get back to yard work or outdoor chores, what "
  "happens next? Is there an established pathway for that, or is it improvised case by case?")
Q("What options exist today that you prescribe, recommend, or see patients find on their own " +
  EM + " adaptive tools, tool holders, mounting arms, raised beds, hired help? Which of those "
  "actually get used six months later?")
Q("For any wheelchair-mounted accessory you do prescribe, such as trays, bags, or oxygen "
  "carriers: roughly what does it cost, who pays for it, and how long does it take to obtain?")
Q("Where do the current options fall down? If you had to name the single widest gap between "
  "what exists and what patients ask you for, what would it be?")
Q("Have you seen patients build or modify their own solutions for this? What did they make, "
  "and what eventually happened to it?")

H("B. User Needs and Their Relative Importance", 11.5, before=7)
P("*Goal: determine what the needs actually are and, more importantly, how they rank " +
  EM + " essential, important, or nice to have.*", size=9.5)
Q("Think of a patient who successfully returned to outdoor work. What had to be true for that "
  "to succeed? What was in place that is often missing?")
Q("Of the following, how would you rank importance for this population: weight added to the "
  "chair, cost, setup and takedown time, how safe it feels, how it looks, and whether it "
  "interferes with pushing? Which are essential, and which are merely nice to have?")
Q("What makes patients abandon equipment they were initially enthusiastic about? I expect "
  "that answer to be more useful than any list of desirable features.")
Q("How much setup time is too much? At what point does someone decide a piece of equipment is "
  "not worth getting out of the garage?")
Q("Does appearance change behaviour here? Would a visibly adapted chair affect whether "
  "someone works in a front yard versus a back yard, and is that something patients raise "
  "with you or something you infer?")

H("C. Design Metrics", 11.5, before=7)
P("*Goal: convert the needs above into quantities I can design and test against.*", size=9.5)
Q("How do you assess and teach a patient's tipping limit in a manual chair? Is there a number "
  "you work to, or is it a functional test? If a task applied a steady external force, what "
  "stability margin would you want preserved?")
Q("What is a realistic one-handed holding or lifting capacity for a manual chair user with "
  "full upper-limb function, sustained over several minutes rather than measured as a peak?")
Q("How much mass can be added to a manual chair before the user notices it in propulsion, and "
  "how much before they reject it outright?")
Q("What do patients actually pay out of pocket for equipment that insurance will not cover? "
  "Where is the line between a price they will pay and a price they will only think about?")
Q("Are there facility policies, liability concerns, or standards that would constrain "
  "anything attached to a patient's own chair? Is there a point at which a modification makes "
  "the chair something you would no longer sign off on?")

H("D. Solution Directions and Concept Feedback", 11.5, before=7)
P("*Goal: get reactions to broad directions without anchoring the conversation to a specific "
  "design, and surface directions I have not considered.*", size=9.5)
Q("At a high level the possibilities seem to be: carry the tool and its reaction force on the "
  "chair; carry the reaction force into the ground separately from the chair; or change the "
  "task so that a large reaction force never arises. Does any of those strike you as clearly "
  "more or less realistic, and is there a fourth I am not seeing?")
Q("If something is attached to a patient's chair, what would make you uneasy about it "
  "clinically? What would you want to be able to release or undo instantly?")
Q("Is there a different population, or a different task, where you would expect this same "
  "interface problem to matter more than it does for yard work?")
Q("If you had a budget and an engineer, what would you ask for that nobody currently makes?")

H("E. Additional Questions If I Can Speak With a Client", 11.5, before=7)
P("*Goal: hear the task described by the person doing it. Needs and priorities commonly "
  "differ between a client and a care provider, so these are deliberately narrative rather "
  "than evaluative.*", size=9.5)
Q("Tell me about the last time you tried to do something outdoors that did not work out. What "
  "happened, step by step?")
Q("What happens now instead? Did someone else take the task over, or did it simply stop "
  "getting done?")
Q("Is there anything you have tried and given up on? What made you stop using it?")
Q("If you could change one thing about how it goes, what would you change first?")

H("F. Specific to Kennedy Krieger Institute", 11.5, before=7)
P("*Goal: use what the facility already does. Two of its features bear directly on a problem "
  "of propelling and working on unimproved ground.*", size=9.5)
Q("The therapy garden is described as letting patients practise therapy goals on different "
  "ground surfaces, including gravel, grass and cobblestone. What do patients find hardest "
  "about moving between those surfaces, and is manual propulsion over turf something you "
  "train deliberately or something patients learn to work around?")
Q("The institute treats individuals up to age 21. For patients approaching that transition, "
  "how much of the planning covers independent living tasks at home, including outdoor and "
  "yard work? And where do those patients go for equipment once they age out of your care?")
Q("The aquatic center solves a barrier with facility infrastructure " + EM + " floors on "
  "lifts giving barrier-free entry " + EM + " rather than with a device the patient owns. "
  "When both routes are open, how do you weigh a fix built into the environment against one "
  "the patient has to carry, set up and maintain themselves?")

out = f"{D}/Module_09_Assignment_Rehab_Center_Questions.docx"
doc.save(out); print("saved", N[0], "questions")
