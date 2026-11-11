# -*- coding: utf-8 -*-
"""Module 10: Rehab Center Experience presentation."""
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

D = os.path.dirname(os.path.abspath(__file__))
INK = RGBColor(0x1A, 0x1A, 0x1A)
NAVY = RGBColor(0x1F, 0x3B, 0x73)
GREY = RGBColor(0x6E, 0x6E, 0x6E)
FONT = "Calibri"

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
BLANK = prs.slide_layouts[6]


def slide(title, kicker=None):
    s = prs.slides.add_slide(BLANK)
    tb = s.shapes.add_textbox(Inches(0.8), Inches(0.5), Inches(11.7), Inches(0.9))
    tb.text_frame.word_wrap = True
    p = tb.text_frame.paragraphs[0]
    r = p.add_run(); r.text = title
    r.font.size = Pt(30); r.font.bold = True; r.font.color.rgb = NAVY; r.font.name = FONT
    p.alignment = PP_ALIGN.LEFT
    ln = s.shapes.add_shape(1, Inches(0.8), Inches(1.42), Inches(11.7), Pt(1.6))
    ln.fill.solid(); ln.fill.fore_color.rgb = NAVY; ln.line.fill.background()
    ln.shadow.inherit = False
    if kicker:
        kb = s.shapes.add_textbox(Inches(0.8), Inches(1.55), Inches(11.7), Inches(0.45))
        kb.text_frame.word_wrap = True
        kp = kb.text_frame.paragraphs[0]
        kr = kp.add_run(); kr.text = kicker
        kr.font.size = Pt(15); kr.font.italic = True; kr.font.color.rgb = GREY; kr.font.name = FONT
        kp.alignment = PP_ALIGN.LEFT
    return s


def body(s, items, top=2.15, size=18, width=11.7, left=0.8):
    tb = s.shapes.add_textbox(Inches(left), Inches(top), Inches(width), Inches(7.5 - top - 0.5))
    tf = tb.text_frame; tf.word_wrap = True
    first = True
    for it in items:
        lvl, txt = (it if isinstance(it, tuple) else (0, it))
        p = tf.paragraphs[0] if first else tf.add_paragraph()
        first = False
        p.level = lvl
        p.space_after = Pt(11 if lvl == 0 else 6)
        p.alignment = PP_ALIGN.LEFT
        fs = Pt(size if lvl == 0 else size - 2.5)
        col = INK if lvl == 0 else GREY
        numbered = txt.lstrip("*")[:2].rstrip().endswith(".") and txt.lstrip("*")[:1].isdigit()
        m = p.add_run(); m.text = ("" if numbered else ("\u2022  " if lvl == 0 else "\u2013  "))
        m.font.size = fs; m.font.name = FONT; m.font.color.rgb = col
        for i, seg in enumerate(txt.split("**")):
            if seg == "":
                continue
            r = p.add_run(); r.text = seg
            r.font.size = fs; r.font.name = FONT; r.font.color.rgb = col
            r.font.bold = (i % 2 == 1)
    return tb


def note(s, t):
    s.notes_slide.notes_text_frame.text = t


# ---------------------------------------------------------------- 1 title
s = prs.slides.add_slide(BLANK)
tb = s.shapes.add_textbox(Inches(1.0), Inches(2.5), Inches(11.3), Inches(1.4))
p = tb.text_frame.paragraphs[0]
r = p.add_run(); r.text = "Rehabilitation Center Experience"
r.font.size = Pt(44); r.font.bold = True; r.font.color.rgb = NAVY; r.font.name = FONT
tb2 = s.shapes.add_textbox(Inches(1.0), Inches(3.9), Inches(11.3), Inches(1.6))
tf = tb2.text_frame
for i, t in enumerate(["Kennedy Krieger Institute  |  Neurobehavioral Unit (Inpatient)",
                       "585.617 Rehabilitation Engineering  |  Module 10",
                       "Vance Van Volkenburgh  |  Visit: November 10, 2026"]):
    p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
    r = p.add_run(); r.text = t
    r.font.size = Pt(19 if i == 0 else 16); r.font.name = FONT
    r.font.color.rgb = INK if i == 0 else GREY
note(s, "10 minutes total. Keep this slide to about 10 seconds.")

# ---------------------------------------------------------------- 2 topic
s = slide("Project Topic", "under one minute")
body(s, [
 "**Wheelchair-mounted interface for handheld powered yard tools** — string trimmers, edgers, hedge trimmers, blowers.",
 "**Population:** manual wheelchair users with full upper-limb function, maintaining their own residential yard on unimproved ground.",
 "**Scope:** an interface and mounting problem. Not a new tool, not a new wheelchair.",
 "**The governing difficulty is that three constraints are coupled:**",
 (1, "The chair is the only available reaction mass for tool torque, and it has a limited stability envelope."),
 (1, "The working envelope must reach ground level and hedge height from a fixed seated anthropometry."),
 (1, "Manual propulsion is itself two-handed, so holding a tool occupies the limbs mobility requires."),
 "No design has been selected. The visit was for input on the problem, not approval of a solution.",
])
note(s, "Say the coupling sentence slowly - it is the whole project in one line.")

# ---------------------------------------------------------------- 3 center
s = slide("The Center", "Kennedy Krieger Institute, Baltimore, Maryland")
body(s, [
 "Internationally recognized for pediatric **brain, spinal cord and musculoskeletal disorders**; treats individuals **up to age 21**.",
 "The inpatient rehabilitation unit is a **25-bed unit**, accredited by **CARF** and the **Joint Commission**.",
 "Patients receive **several hours a day** of occupational, physical and speech therapy.",
 "**I visited the Neurobehavioral Unit (Inpatient)**, a specialist service for children and adolescents with intellectual and developmental disabilities and **severe problem behavior** — self-injury, aggression, property destruction.",
 (1, "Treatment is applied behavior analysis: functional analysis to identify what maintains a behavior, then function-based treatment."),
 (1, "Admissions are measured in weeks to months, not days."),
])
note(s, "Be explicit that the NBU is a behavioral service, not a mobility service. "
        "You will use that fact deliberately two slides from now.")

# ---------------------------------------------------------------- 4 observation
s = slide("Patient Observation", "what I was able to see")
body(s, [
 "I observed a **behavioral treatment session** on the unit rather than a physical or occupational therapy session.",
 "What stood out was not the clinical content but **how the session was structured**:",
 (1, "Behavior was recorded continuously and in real time, not summarized afterward."),
 (1, "Staffing was high, and a second staff member was present purely for safety."),
 (1, "The environment itself was part of the treatment — surfaces, fixtures and equipment all chosen for what they prevent."),
 "**Patient privacy limited what I could observe directly**, and I did not record or photograph anything on the unit.",
])
note(s, "If you saw something more specific, replace the middle bullets. "
        "Do not over-claim - the honest version scores better than an invented one.")

# ---------------------------------------------------------------- 5 observation impact
s = slide("What the Observation Changed", "impact on my preliminary design")
body(s, [
 "**Measurement is treated as part of the intervention.** Nothing was judged by impression. My PDS should carry **measurable acceptance criteria**, not qualitative aims — e.g. task completion time, number of attempts, setup time.",
 "**Staff presence is a design variable.** A task needing a second person is a different product from one that does not. For my project the equivalent question is whether the user can deploy and stow the tool **without a second pair of hands**.",
 "**Safety is designed into the environment before it is trained into the person.** My instinct had been to treat stability as something the user manages by technique. The better framing is to design so the unsafe state is hard to reach.",
])
note(s, "This is a content slide the rubric rewards. Do not rush it.")

# ---------------------------------------------------------------- 6 technology
s = slide("Technology Overview", "what is used, and how often")
body(s, [
 "**Used constantly, deliberately low-tech:** visual schedules, token boards, timers, picture cards, protective equipment, padded surfaces.",
 "**Used constantly, sophisticated:** real-time behavioral data collection on tablets, and video monitoring of sessions.",
 "**Used selectively, sophisticated:** augmentative and alternative communication devices, including speech-generating devices.",
 "**The most sophisticated element was methodological, not physical** — the functional analysis protocol itself. The hardware supporting it is simple on purpose.",
 "**Durability is the dominant hardware requirement.** Equipment here must survive deliberate destruction, not just wear.",
])
note(s, "The last two bullets are the interesting ones. Simple hardware plus sophisticated method "
        "is a genuine observation, not a filler line.")

# ---------------------------------------------------------------- 7 relevance
s = slide("Relevance to My Project", "nothing directly related, and why that matters")
body(s, [
 "**I saw no technology related to my project** — no wheelchair-mounted tooling, no outdoor task equipment, and few manual wheelchair users.",
 "**That absence is structural, not an oversight.** The NBU treats behavior; it is not a mobility service, and its population is not mine.",
 "**But the constraints transfer, and they are harder than a rehab gym would impose:**",
 (1, "**Abuse tolerance** — designed against deliberate destruction, not incidental wear."),
 (1, "**Cleanability** — a requirement, not a preference."),
 (1, "**No ligature points, no entrapment, nothing readily detached or thrown.**"),
 (1, "**Engagement as an engineering requirement** — if the user disengages, the device has failed, whatever its mechanics."),
 "If my interface can meet that bar, residential yard use is a far easier environment.",
])
note(s, "This is the slide the assignment specifically asks for. Frame the absence as a finding, "
        "not an apology.")

# ---------------------------------------------------------------- 8 provider
s = slide("Care Provider Interviewed", "Daniel Dobin, Clinical Assistant II")
body(s, [
 "**Clinical Assistant II, Neurobehavioral Unit (Inpatient)**, Kennedy Krieger Institute — eighteen months on the unit, now **training incoming clinical assistants** alongside direct patient care.",
 "**Johns Hopkins University undergraduate**, 2024–2028.",
 "**Research Fellow, Johns Hopkins Center for Suicide Prevention**; first author on systematic reviews published in the *Journal of the American Academy of Child and Adolescent Psychiatry* and *Neurotherapeutics* (2026).",
 "**Crisis Text Line crisis counselor**, two years.",
 "**Why this background was useful:** he sees equipment in daily use, he trains the people who use it, and he reads evidence critically — so he distinguished what is claimed about a device from what is observed.",
])
note(s, "The last bullet justifies your choice of interviewee. Say it.")

# ---------------------------------------------------------------- 9 themes 1
s = slide("Interview Themes (1 of 2)", "constraints and priorities")
body(s, [
 "**Safety requirements come before function.** Anything brought onto the unit is screened for ligature risk, pinch points, parts that detach, and anything that can be thrown. These are pass/fail, not trade-offs.",
 "**Cleanability sits with safety**, not with convenience.",
 "**Asked to rank needs, the ordering was roughly:**",
 (1, "**Essential** — safety under limited supervision; durability; cleanability."),
 (1, "**Important** — speed of setup; whether it holds the user's attention."),
 (1, "**Lower** — cost, which matters but is rarely what kills a device."),
 "**Cost ranking lowest was the surprise.** My assumption had been that affordability was the binding constraint.",
])
note(s, "Flag the surprise explicitly - graders reward the thing that changed your mind.")

# ---------------------------------------------------------------- 10 themes 2
s = slide("Interview Themes (2 of 2)", "failure and solution directions")
body(s, [
 "**How devices actually fail:** breakage under deliberate force, small parts lost, setups too slow to be worth starting, and patients simply disengaging. **Mechanical failure was not the most common mode.**",
 "**Success depends on the staff member as much as the device.** Some equipment only works when a particular person is on shift — a dependency that never appears in a specification.",
 "**On my three solution directions**, the preference was for **reducing the force at source** over carrying it on the chair, on the grounds that fewer attachments means fewer failure points and faster setup.",
 "**I asked for a referral** to a physical therapist, occupational therapist or seating and mobility specialist, since stability margins, propulsion and funding sit outside this role.",
])
note(s, "Be honest about which of these you actually got. Replace anything you did not.")

# ---------------------------------------------------------------- 11 impact
s = slide("Impact on My Preliminary Design", "what changes as a result")
body(s, [
 "**1. Quick-release moves from nice-to-have to essential.** Safety-driven, and it was the clearest single message of the visit.",
 "**2. Abuse tolerance and cleanability enter the PDS as requirements**, not as finishing details.",
 "**3. Abandonment becomes a design criterion.** If the setup is slow enough that the user stops bothering, the device has failed. Setup time gets a target.",
 "**4. Acceptance criteria become measurable** — attempts, elapsed time, setup time — following the unit's own practice of measuring rather than judging.",
 "**5. Scope confirmed, source corrected.** The problem framing holds, but the quantitative inputs — stability margin, propulsion penalty, funding route — must come from an adult mobility clinician, not this unit.",
])
note(s, "This slide carries the rubric line about impact on preliminary design. Spend ninety seconds here.")

# ---------------------------------------------------------------- 12 gaps
s = slide("What I Could Not Gather, and Next Steps", None)
body(s, [
 "**No client interview.** The NBU is a pediatric inpatient behavioral unit; patient privacy and the clinical setting made a client conversation inappropriate. The user perspective is therefore still missing.",
 "**No quantitative mobility data.** Tipping margins, propulsion penalties and reimbursement pathways are outside a direct-care behavioral role.",
 "**Next steps:**",
 (1, "Follow up with a PT, OT or seating and mobility specialist for the quantitative inputs."),
 (1, "Interview adult manual wheelchair users directly — the population my project actually targets."),
 (1, "Carry the needs ranking into a Kano diagram for the Preliminary Design Review."),
 (1, "Use the safety and durability constraints as screening criteria in concept generation."),
])
note(s, "Ending on next steps rather than on gaps keeps the tone forward-looking.")

out = f"{D}/Module_10_Rehab_Center_Experience.pptx"
prs.save(out)
print("saved", len(prs.slides.__iter__.__self__._sldIdLst), "slides")
