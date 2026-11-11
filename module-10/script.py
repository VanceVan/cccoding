# -*- coding: utf-8 -*-
"""Module 10 presentation script."""
import os
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt, RGBColor
from common import newdoc, mk

D = os.path.dirname(os.path.abspath(__file__))
doc = newdoc(margin=0.9, size=10.5)
doc.styles['Normal'].paragraph_format.space_after = Pt(5)
P, H, TABLE, FIG = mk(doc)
C = WD_ALIGN_PARAGRAPH.CENTER
EM = "—"


def cue(t):
    p = P("[ " + t + " ]", size=9, after=4, justify=False)
    for r in p.runs:
        r.italic = True; r.font.color.rgb = RGBColor(0x70, 0x70, 0x70)
    p.paragraph_format.left_indent = Pt(10)
    return p


def line(t):
    p = P(t, size=10.5, after=6)
    p.paragraph_format.left_indent = Pt(10)
    return p


t = doc.add_paragraph(); t.alignment = C
r = t.add_run("Rehab Center Experience " + EM + " Presentation Script")
r.bold = True; r.font.size = Pt(14)
P("585.617 Rehabilitation Engineering | Module 10 | target 9:45, hard limit 10:00",
  size=9.5, align=C, after=10)

H("Timing", 11.5, before=2)
TABLE(["Slide", "Segment", "Start", "Length"],
      [["1", "Title", "0:00", "0:15"],
       ["2", "Project topic", "0:15", "1:00"],
       ["3", "The center", "1:15", "0:45"],
       ["4", "Patient observation", "2:00", "0:40"],
       ["5", "What the observation changed", "2:40", "1:00"],
       ["6", "Technology overview", "3:40", "0:40"],
       ["7", "Relevance to my project", "4:20", "0:55"],
       ["8", "Care provider", "5:15", "0:35"],
       ["9", "Interview themes 1", "5:50", "0:45"],
       ["10", "Interview themes 2", "6:35", "0:50"],
       ["11", "Impact on preliminary design", "7:25", "1:10"],
       ["12", "Gaps and next steps", "8:35", "0:40"]],
      [0.6, 3.4, 0.9, 0.9], fs=9)
P("About 1,270 spoken words. At a measured 140 words a minute that finishes near **9:15**, "
  "which leaves 45 seconds of margin. If you overrun, cut the third point on slide 5 and the "
  "last sentence on slide 7 rather than rushing slide 11.", size=9.5, after=10)

H("Slide 1 " + EM + " Title  (0:00)", 11.5, before=8)
line("Hi, I'm Vance Van Volkenburgh. This is my Module 10 rehab center experience. I visited "
     "the Kennedy Krieger Institute in Baltimore on November tenth, and spent my time on their "
     "inpatient Neurobehavioral Unit.")

H("Slide 2 " + EM + " Project Topic  (0:15)", 11.5, before=8)
line("Thirty seconds on the project first, so the rest makes sense.")
line("I'm designing an interface that lets a manual wheelchair user operate handheld powered "
     "yard tools " + EM + " trimmers, edgers, hedge trimmers, blowers " + EM + " on their own "
     "yard. It's scoped as an interface and mounting problem. Not a new tool, not a new "
     "wheelchair.")
cue("point at the figure and walk the three numbered callouts")
line("What makes it hard is on the right. Three constraints are coupled. One: the tool pushes "
     "back, and the chair is the only thing available to react that force, so tool torque eats "
     "into a stability envelope that's already narrow. Two: the working envelope runs from "
     "ground level to hedge height, from a seat that doesn't move. Three: propelling a manual "
     "chair is two-handed, so holding a tool occupies the limbs mobility needs.")
line("Any one is solvable. The coupling isn't. I went in with no design selected, on purpose.")

H("Slide 3 " + EM + " The Center  (1:15)", 11.5, before=8)
line("Kennedy Krieger is a pediatric institute in Baltimore " + EM + " brain, spinal cord and "
     "musculoskeletal disorders, up to age twenty-one. The inpatient rehab unit is twenty-five "
     "beds, CARF and Joint Commission accredited, with several hours a day of occupational, "
     "physical and speech therapy.")
line("But I want to be precise about where I was, because it shapes everything after. I was on "
     "the Neurobehavioral Unit " + EM + " a specialist service for children and adolescents "
     "with developmental disabilities and severe problem behavior. The model is applied "
     "behavior analysis, and admissions run weeks to months.")
cue("pause here")
line("So: not a mobility service. I'll come back to that.")

H("Slide 4 " + EM + " Patient Observation  (2:00)", 11.5, before=8)
line("I observed a behavioral treatment session, not a physical or occupational therapy "
     "session.")
line("What stuck with me wasn't the clinical content. It was how the session was built.")
line("Behavior was recorded continuously, in real time, as it happened. Staffing was high, and "
     "one person was there purely for safety. And the environment was part of the treatment " +
     EM + " surfaces, fixtures and equipment all chosen for what they prevent.")
line("Patient privacy limited what I could see, and I didn't record or photograph anything.")

H("Slide 5 " + EM + " What the Observation Changed  (2:40)", 11.5, before=8)
line("Three things went straight into my design thinking.")
line("First, measurement is part of the intervention, not paperwork. Nothing was judged by "
     "impression. That's a direct criticism of my PDS " + EM + " I've been writing aims like "
     "\u201creduce effort.\u201d It needs measurable acceptance criteria instead: task time, "
     "number of attempts, setup time.")
line("Second, staff presence is a design variable. A task needing a second person is a "
     "different product. My version is whether the user can deploy and stow the tool without a "
     "second pair of hands, and I hadn't treated that as a requirement.")
line("Third, and this changed my mind: safety is designed into the environment before it's "
     "trained into the person. I'd been treating stability as something the user manages by "
     "technique. Better to design so the unsafe state is hard to reach.")

H("Slide 6 " + EM + " Technology Overview  (3:40)", 11.5, before=8)
line("On technology there's a clear split.")
line("Used constantly, and deliberately low-tech: visual schedules, token boards, timers, "
     "picture cards, protective equipment, padded surfaces.")
line("Also constant but sophisticated: real-time behavioral data capture on tablets, and video "
     "monitoring. Used selectively: communication devices, including speech-generating ones.")
line("What I didn't expect is that the most sophisticated element isn't hardware. It's the "
     "functional analysis protocol itself " + EM + " the hardware supporting it is simple on "
     "purpose. And durability dominates: equipment has to survive deliberate destruction, not "
     "just wear.")

H("Slide 7 " + EM + " Relevance to My Project  (4:20)", 11.5, before=8)
line("Now the honest part. I saw nothing related to my project. No wheelchair-mounted tooling, "
     "no outdoor task equipment, very few manual wheelchair users.")
cue("pause here")
line("That absence is structural. The unit treats behavior. It isn't a mobility service, and "
     "its population isn't mine.")
line("But the constraints transfer, and they're harder than a rehab gym would impose. Abuse "
     "tolerance against deliberate destruction, not incidental wear. Cleanability as a "
     "requirement. No ligature points, no entrapment, nothing that detaches or gets thrown. And "
     "engagement as an engineering requirement " + EM + " if the user disengages, the device "
     "has failed, however good the mechanics.")
line("If my interface can meet that bar, residential yard use is a far easier environment. "
     "These constraints aren't from my domain, but they're stricter than it.")

H("Slide 8 " + EM + " Care Provider  (5:15)", 11.5, before=8)
line("I interviewed Daniel Dobin, a Clinical Assistant Two on the Neurobehavioral Unit. "
     "Eighteen months on the unit, and he now trains incoming clinical assistants alongside "
     "direct patient care.")
line("I chose that role deliberately. He works with the equipment daily rather than prescribing "
     "it. He trains the people who use it, so he knows which parts of a protocol survive a real "
     "unit. And he sees the same devices across many patients.")
cue("say this plainly and move on")
line("He asked that his photograph not be used, so there isn't one.")

H("Slide 9 " + EM + " Interview Themes, One of Two  (5:50)", 11.5, before=8)
line("Two themes. First, constraints and priorities.")
line("Safety screening comes before function. Ligature risk, pinch points, parts that detach or "
     "can be thrown " + EM + " pass or fail, not trade-offs. Cleanability sits with safety, not "
     "convenience.")
cue("point at the ranking chart")
line("Asked to rank needs, this is what came out. Essential: safe with limited supervision, "
     "durability, cleanability. Important: setup speed, and holding the user's attention. "
     "Lower: cost.")
cue("pause here")
line("Cost ranking lowest was the surprise. I'd assumed affordability was the binding "
     "constraint. It isn't. That ranking is what I carry into the Kano diagram for the "
     "Preliminary Design Review.")

H("Slide 10 " + EM + " Interview Themes, Two of Two  (6:35)", 11.5, before=8)
line("Second theme: how things fail, and what he made of my directions.")
line("Devices fail by breakage under deliberate force, lost parts, setups too slow to be worth "
     "starting, and patients disengaging. Mechanical failure wasn't the most common mode " +
     EM + " not where I'd have put my money.")
cue("point at the three panels")
line("I showed him the three directions. Carry the tool and its reaction on the chair. Route "
     "the force into the ground. Or reduce the force at source. He preferred the third: fewer "
     "attachments means fewer failure points and faster setup.")
line("I also asked for a referral to a therapist or seating specialist, since stability and "
     "funding sit outside his role.")

H("Slide 11 " + EM + " Impact on My Preliminary Design  (7:25)", 11.5, before=8)
cue("slow down - this is the slide the rubric names")
line("So what actually changes.")
line("One: quick-release moves from nice-to-have to essential. Clearest single message of the "
     "visit, and it's safety-driven.")
line("Two: abuse tolerance and cleanability enter the PDS as requirements, not finishing "
     "details.")
line("Three: abandonment becomes a design criterion. If setup is slow enough that the user "
     "stops bothering, the device has failed. Setup time gets a number.")
line("Four: acceptance criteria become measurable " + EM + " attempts, elapsed time, setup "
     "time.")
line("Five: scope confirmed, source corrected. The framing holds, but the quantitative inputs "
     "have to come from an adult mobility clinician, not this unit.")
cue("point at the task analysis")
line("The diagram is where that lands " + EM + " a task analysis of trimming a lawn edge from a "
     "manual chair, using the Module 8 method. Three steps are red: propelling over turf, "
     "deploying the tool from stow, and holding it against the reaction force. That's where my "
     "design has to act, and the visit is why deploying from stow is on the list at all.")

H("Slide 12 " + EM + " Gaps and Next Steps  (8:35)", 11.5, before=8)
line("Two things I couldn't get. No client interview " + EM + " a pediatric inpatient "
     "behavioral unit, where privacy and the clinical setting made it inappropriate, so the "
     "user voice is still missing. And no quantitative mobility numbers; tipping margins and "
     "reimbursement sit outside a direct-care behavioral role.")
line("Next steps. A therapist or seating specialist for the numbers. Interview adult manual "
     "wheelchair users, the population I'm designing for. Carry the needs ranking into a Kano "
     "diagram. And use the safety and durability constraints to screen concepts.")
line("Thank you.")

H("Delivery notes", 11.5, before=10)
P("**Pace.** About 1,270 spoken words. At 140 words a minute that lands near 9:15. If you speak "
  "quickly when nervous, slow down deliberately on slides 5, 7 and 11 " + EM + " those three "
  "carry the content grade.")
P("**Do not read the slides.** The rubric penalises it by name. The slides carry the headline; "
  "the script carries the reasoning. Where a bullet and a sentence overlap, say the sentence.")
P("**Three places to pause.** After “not a mobility service” on slide 3. After “I "
  "saw nothing related to my project” on slide 7. And after “cost ranking lowest was "
  "the surprise” on slide 9. Each one lands better with a beat after it.")
P("**Rehearse once against a clock before recording.** If you overrun, cut the third point on "
  "slide 5 and the final sentence on slide 7 rather than rushing slide 11.")

out = f"{D}/Module_10_Presentation_Script.docx"
doc.save(out); print("saved")
