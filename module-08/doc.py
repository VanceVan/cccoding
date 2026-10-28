# -*- coding: utf-8 -*-
"""Module 8 Ethnography Assignment."""
import os
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt
from common import newdoc, mk

D = os.path.dirname(os.path.abspath(__file__))
doc = newdoc(margin=1.0, size=11.0)
doc.styles['Normal'].paragraph_format.space_after = Pt(6)
P, H, TABLE, FIG = mk(doc)
C = WD_ALIGN_PARAGRAPH.CENTER
EM = "—"; DASH = "–"; B1 = "〈"; B2 = "〉"


def blank(t):
    return B1 + t + B2


def Q(q, body):
    return P("**" + q + "**  " + body)


t = doc.add_paragraph(); t.alignment = C
r = t.add_run("Module 8 Ethnography Assignment"); r.bold = True; r.font.size = Pt(14)
P("585.617 Rehabilitation Engineering | " + blank("Your Name") + " | " + blank("Date"),
  size=10, align=C, after=12)

H("Video and Segment", 12, before=4)
P("**Video:** *Inpatient Rehabilitation Unit | Kennedy Krieger Institute*, "
  "https://www.youtube.com/watch?v=GABVP6ktGeY", justify=False)
P("**Segment of interest:** 3:01 " + DASH + " 3:17, the aquatic therapy center.", justify=False)
P("**Setting:** the inpatient pediatric rehabilitation unit on the third floor of Kennedy "
  "Krieger Institute, a 25-bed unit accredited by CARF and the Joint Commission, treating "
  "individuals up to age 21 with brain and spinal cord injuries and disorders, pain "
  "disorders, complex medical conditions and orthopedic conditions.")

H("Part 1 " + EM + " Task Analysis", 12, before=10)
P("Figure 1 is the workflow for entering the aquatic therapy pool, which is the activity the "
  "narration describes across this segment. The notation follows the module lecture: an "
  "**oval** is a delimiter, a **diamond** is a decision point where the workflow can branch, "
  "a **plain box** is an ordinary task, and a **red-outlined box** is a task that was "
  "difficult to perform.")
P("Two decision points are included because the narration establishes that the pool floors "
  "operate on lifts, which means floor height is set rather than fixed, and a set value can "
  "be wrong twice: once at deck level for entry, and again at therapy depth for standing. "
  "Both branches loop rather than terminate, which is characteristic of this workflow " + EM +
  " nothing fails outright, it just repeats until it is right, and the cost of being wrong is "
  "paid in time and in patient fatigue rather than in an abandoned session.")
FIG(f"{D}/fig1_task_analysis.png", 6.4,
    "Figure 1. Task analysis of pool entry for a wheelchair user, 3:01" + DASH + "3:17.")
P("The two steps outlined in red are **rolling the chair onto the pool floor** and **standing "
  "up in water**. These are the two points in the sequence where the patient, rather than the "
  "equipment or the therapist, has to supply the critical effort, and they are the two steps "
  "that can be repeated without the workflow advancing. The step carried forward for detailed "
  "analysis is " + blank("name whichever of the two the patient in the segment visibly "
  "struggled with") + ".")

H("Part 2 " + EM + " Summary of the Difficult Task", 12, before=10)

Q("What is the context of the task?",
  "The task opens an aquatic physical therapy session. The narration states that each patient "
  "receives intensive occupational, physical and speech therapies for several hours a day, "
  "and that the aquatic therapy center features two pools offering different aquatic "
  "environments, including built-in treadmills, video monitoring systems, multiple jets for "
  "resistance, and floors that operate on lifts for barrier-free entry and exit for patients "
  "in wheelchairs. The step therefore sits at the front of the session, before any "
  "therapeutic exercise has happened. That position is what makes it worth analysing: it is "
  "a gate. Nothing in the session can begin until it succeeds, it is performed by a child "
  "whose impairment is the reason for admission, and any time or energy spent here is "
  "subtracted from the therapy itself.")

Q("What hazards are present?",
  "Submersion if balance is lost during or after the stand. Slipping, on a wet deck, on wet "
  "tires and on a wet pool floor. Entrapment or pinching at the moving edge of the floor "
  "lift, which is a powered platform carrying a person. Shear and skin injury during the "
  "stand, which matters in a population at elevated risk of pressure injury. The chair "
  "rolling if the brakes are not locked before the floor begins to move. Water temperature. "
  "Fatigue, given several hours of therapy a day. And once on the treadmill, loss of footing "
  "against the resistance jets.")

Q("What tools did the person use?",
  "Named in the narration: the wheelchair, the pool floor on its lifts, the built-in "
  "treadmill, the resistance jets, and the video monitoring system. Also in use but to be "
  "confirmed against the footage: the chair's wheel locks, a gait belt, any handrail at the "
  "deck-to-floor transition, and the therapist's hands and body, which function here as a "
  "guarding tool and should be counted as one.")

Q("What task was difficult to do?",
  blank("state the single step, matching the red box in Figure 1"))

Q("What attitude did the person have towards doing the difficult task?",
  blank("report what was observable rather than inferred: facial expression, whether the "
        "patient initiated or waited to be prompted, whether they narrated, joked, hesitated "
        "or renegotiated, and where you are inferring rather than seeing"))

Q("How many attempts did it take to do the task?",
  blank("count, and state what you counted as one attempt"))

Q("How long did it take to do the difficult task?",
  blank("elapsed seconds, plus the elapsed time of a neighbouring ordinary step for "
        "comparison") + ". The segment runs 16 seconds in total, from 3:01 to 3:17, which "
  "bounds the measurement.")

Q("What was difficult about the task?",
  "The two candidate steps fail for different reasons, and the distinction matters because "
  "they point at different design requirements. **Rolling the chair onto the pool floor** is "
  "a threshold crossing: small front castors catch on any lip between deck and platform, wet "
  "tires lose traction on a wet surface, and a patient propelling with reduced grip or upper "
  "limb strength has to generate a force spike at exactly the moment the surface is least "
  "predictable. **Standing up in water** fails for the opposite reason. Buoyancy unloads the "
  "feet, so proprioceptive feedback is reduced precisely when balance is being demanded; "
  "water resistance slows every corrective movement the patient makes; the surface underfoot "
  "is slick; and the push-off geometry the patient has practised on land does not transfer. "
  "The difficulty is therefore " + blank("whichever applies") + ", and the cause is "
  + blank("strength, range of motion, balance, pain, coordination, fear, the equipment or "
          "the environment") + " rather than the symptom visible on the surface.")

Q("What would make it easier?",
  "At the level of the environment and the equipment: a genuinely zero-lip transition, with "
  "the floor indexing itself to deck level and confirming flush before entry is permitted, "
  "which removes the castor-catch failure entirely rather than asking the patient to "
  "overcome it; a continuous handrail carried across the deck-to-floor transition at a height "
  "usable both seated and standing; high-friction, low-glare surfacing on both sides of the "
  "transition. At the level of technique and workflow: staging the stand at a shallower depth "
  "and lowering the floor further only once the patient is upright and stable, so buoyancy "
  "assists the rise without compromising footing; and repurposing the video monitoring system "
  "the facility already owns to give the patient real-time feedback rather than serving only "
  "as staff supervision. The last of these is the cheapest, because the hardware is already "
  "installed.")

H("Part 3 " + EM + " Carrying This Into the Final Project", 12, before=10)
P("The observation converts into design input in three ways. First, isolating the difficult "
  "step says **where** a requirement applies, which is narrower and more useful than writing "
  "a requirement against the whole activity. Second, the attempt count and the elapsed time "
  "are a **baseline**: a later design can be tested against whether it actually reduced "
  "either, which a subjective claim of improvement cannot be. Third, the hazards become "
  "**constraints rather than features**, because a device that makes the step easier while "
  "making a submersion or a shear injury more likely has not improved anything.")
P("The more general lesson from this segment is that the facility has already solved the "
  "barrier it set out to solve. The floor lift removes the step that would otherwise exclude "
  "a wheelchair user from the pool altogether. What remains difficult is what the equipment "
  "does not reach: the threshold detail at its own edge, and the moment the patient has to "
  "supply the effort themselves. Ethnographic observation is what surfaces that second layer, "
  "because it is invisible in a specification and invisible in the narration " + EM + " the "
  "video describes the pools as offering barrier-free entry, and in the broad sense they do.")

out = f"{D}/Module_08_Ethnography_Assignment.docx"
doc.save(out); print("saved")
