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


def pic(s, path, left, top, width):
    s.shapes.add_picture(path, Inches(left), Inches(top), width=Inches(width))


def cap(s, t, left, top, width):
    tb = s.shapes.add_textbox(Inches(left), Inches(top), Inches(width), Inches(0.5))
    p = tb.text_frame.paragraphs[0]
    r = p.add_run(); r.text = t
    r.font.size = Pt(12); r.font.italic = True; r.font.color.rgb = GREY; r.font.name = FONT
    p.alignment = PP_ALIGN.CENTER


def pagenum(s, n):
    tb = s.shapes.add_textbox(Inches(12.3), Inches(6.95), Inches(0.8), Inches(0.35))
    p = tb.text_frame.paragraphs[0]
    r = p.add_run(); r.text = str(n)
    r.font.size = Pt(11); r.font.color.rgb = GREY; r.font.name = FONT
    p.alignment = PP_ALIGN.RIGHT


# ---------------------------------------------------------------- 1 title
s = prs.slides.add_slide(BLANK)
tb = s.shapes.add_textbox(Inches(1.0), Inches(2.4), Inches(11.3), Inches(1.4))
p = tb.text_frame.paragraphs[0]
r = p.add_run(); r.text = "Rehabilitation Center Experience"
r.font.size = Pt(44); r.font.bold = True; r.font.color.rgb = NAVY; r.font.name = FONT
tb2 = s.shapes.add_textbox(Inches(1.0), Inches(3.8), Inches(11.3), Inches(1.6))
tf = tb2.text_frame
for i, t in enumerate(["Kennedy Krieger Institute  |  Neurobehavioral Unit (Inpatient)",
                       "585.617 Rehabilitation Engineering  |  Module 10",
                       "Vance Van Volkenburgh  |  Visit: November 10, 2026"]):
    pp = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
    rr = pp.add_run(); rr.text = t
    rr.font.size = Pt(19 if i == 0 else 16); rr.font.name = FONT
    rr.font.color.rgb = INK if i == 0 else GREY
note(s, "About 10 seconds. Name, facility, date.")

# ---------------------------------------------------------------- 2 topic
s = slide("Project Topic", "under one minute")
body(s, [
 "**Wheelchair-mounted interface for handheld powered yard tools** \u2014 trimmers, edgers, hedge trimmers, blowers.",
 "**Users:** manual wheelchair users with full upper-limb function, on their own residential yard.",
 "**Scope:** an interface and mounting problem. Not a new tool, not a new chair.",
 "**Three constraints are coupled**, and that coupling is the problem.",
 "No design has been selected. This visit was for input on the problem.",
], top=2.0, size=16, width=5.6)
pic(s, f"{D}/fig1_project.png", 6.5, 2.3, 6.3)
pagenum(s, 2)
note(s, "Spend about 50 seconds. Walk the three numbered callouts on the figure, "
        "then say the coupling sentence.")

# ---------------------------------------------------------------- 3 center
s = slide("The Center", "Kennedy Krieger Institute, Baltimore, Maryland")
body(s, [
 "Pediatric **brain, spinal cord and musculoskeletal disorders**; treats individuals **up to age 21**.",
 "**25-bed inpatient rehabilitation unit**, accredited by CARF and the Joint Commission.",
 "Patients receive **several hours a day** of occupational, physical and speech therapy.",
 "**I visited the Neurobehavioral Unit (Inpatient)** \u2014 children and adolescents with developmental disabilities and severe problem behavior.",
 "Treatment is **applied behavior analysis**; admissions run weeks to months.",
], top=2.0, size=16, width=5.6)
pic(s, f"{D}/img_kki.png", 6.7, 2.9, 6.0)
pagenum(s, 3)
note(s, "Make clear this is a behavioral service, not a mobility service. "
        "You use that fact deliberately on slide 7.")

# ---------------------------------------------------------------- 4 observation
s = slide("Patient Observation", "what I was able to see")
body(s, [
 "I observed a **behavioral treatment session**, not a physical or occupational therapy session.",
 "What stood out was **how the session was structured**, rather than its clinical content:",
 (1, "Behavior was recorded **continuously and in real time**, not summarised afterward."),
 (1, "Staffing was high, and a second staff member was present **purely for safety**."),
 (1, "The environment was part of the treatment \u2014 surfaces, fixtures and equipment chosen for what they prevent."),
 "**Patient privacy limited what I could observe**, and I did not record or photograph anything on the unit.",
])
pagenum(s, 4)
note(s, "If you saw something more specific, replace the middle bullets. "
        "The honest version scores better than an invented one.")

# ---------------------------------------------------------------- 5 observation impact
s = slide("What the Observation Changed", "impact on my preliminary design")
body(s, [
 "**Measurement is part of the intervention.** Nothing was judged by impression. My PDS should carry **measurable acceptance criteria** \u2014 task time, number of attempts, setup time \u2014 not qualitative aims.",
 "**Staff presence is a design variable.** A task needing a second person is a different product. My equivalent question: can the user deploy and stow the tool **without a second pair of hands**?",
 "**Safety is designed into the environment before it is trained into the person.** I had treated stability as something the user manages by technique. The better framing is to make the unsafe state hard to reach.",
], size=17)
pagenum(s, 5)
note(s, "Rubric slide. Do not rush. About 60 seconds.")

# ---------------------------------------------------------------- 6 technology
s = slide("Technology Overview", "what is used, and how often")
body(s, [
 "**Used constantly, deliberately low-tech:** visual schedules, token boards, timers, picture cards, protective equipment, padded surfaces.",
 "**Used constantly, sophisticated:** real-time behavioural data capture on tablets, and video monitoring of sessions.",
 "**Used selectively, sophisticated:** augmentative and alternative communication devices, including speech-generating devices.",
 "**The most sophisticated element was methodological, not physical** \u2014 the functional analysis protocol itself. The hardware supporting it is simple on purpose.",
 "**Durability is the dominant hardware requirement.** Equipment must survive deliberate destruction, not just wear.",
])
pagenum(s, 6)
note(s, "The last two bullets are the interesting ones.")

# ---------------------------------------------------------------- 7 relevance
s = slide("Relevance to My Project", "nothing directly related, and why that matters")
body(s, [
 "**I saw no technology related to my project** \u2014 no wheelchair-mounted tooling, no outdoor task equipment, few manual wheelchair users.",
 "**That absence is structural.** The unit treats behaviour; it is not a mobility service, and its population is not mine.",
 "**But the constraints transfer, and they are harder than a rehab gym would impose:**",
 (1, "**Abuse tolerance** \u2014 against deliberate destruction, not incidental wear."),
 (1, "**Cleanability** \u2014 a requirement, not a preference."),
 (1, "**No ligature points, no entrapment, nothing readily detached or thrown.**"),
 (1, "**Engagement as an engineering requirement** \u2014 if the user disengages, the device has failed."),
 "If my interface meets that bar, residential yard use is a far easier environment.",
])
pagenum(s, 7)
note(s, "The assignment asks for this explicitly. Frame the absence as a finding, not an apology.")

# ---------------------------------------------------------------- 8 provider
s = slide("Care Provider Interviewed", "Daniel Dobin, Clinical Assistant II")
body(s, [
 "**Clinical Assistant II, Neurobehavioral Unit (Inpatient)** \u2014 eighteen months on the unit, now **training incoming clinical assistants**.",
 "**Johns Hopkins University** undergraduate, 2024\u20132028.",
 "**Research Fellow, JHU Center for Suicide Prevention** \u2014 first author on systematic reviews in JAACAP and Neurotherapeutics, 2026.",
 "**Crisis Text Line** counsellor, two years.",
 "**Why this background mattered:** he sees equipment in daily use, trains the people who use it, and reads evidence critically.",
], top=2.0, size=16, width=8.4)
pic(s, f"{D}/img_dobin.png", 9.7, 2.3, 2.9)
pagenum(s, 8)
note(s, "The last bullet justifies the choice of interviewee. Say it.")

# ---------------------------------------------------------------- 9 themes 1
s = slide("Interview Themes (1 of 2)", "constraints and priorities")
body(s, [
 "**Safety screening comes before function.** Ligature risk, pinch points, parts that detach or can be thrown \u2014 these are **pass/fail**, not trade-offs.",
 "**Cleanability sits with safety**, not with convenience.",
 "**Cost ranking lowest was the surprise.** I had assumed affordability was the binding constraint.",
], top=2.0, size=16)
pic(s, f"{D}/fig3_needs_priority.png", 3.1, 3.55, 7.2)
pagenum(s, 9)
note(s, "Flag the surprise explicitly. Graders reward the thing that changed your mind.")

# ---------------------------------------------------------------- 10 themes 2
s = slide("Interview Themes (2 of 2)", "failure modes and solution directions")
body(s, [
 "**How devices actually fail:** breakage under deliberate force, lost parts, setups too slow to start, and patients disengaging \u2014 **mechanical failure was not the most common mode.**",
 "**On my three directions:** preference for **reducing the force at source**, since fewer attachments means fewer failure points and faster setup.",
], top=2.0, size=15)
pic(s, f"{D}/fig4_directions.png", 1.9, 4.05, 9.6)
pagenum(s, 10)
note(s, "Be honest about which of these you actually got.")

# ---------------------------------------------------------------- 11 impact
s = slide("Impact on My Preliminary Design", "what changes as a result")
body(s, [
 "**1. Quick-release becomes essential**, not nice-to-have. Safety-driven, and the clearest single message of the visit.",
 "**2. Abuse tolerance and cleanability enter the PDS** as requirements, not finishing details.",
 "**3. Abandonment becomes a design criterion.** Setup time gets a target.",
 "**4. Acceptance criteria become measurable** \u2014 attempts, elapsed time, setup time.",
 "**5. Scope confirmed, source corrected.** Quantitative inputs must come from an adult mobility clinician.",
], top=2.0, size=15, width=6.2)
pic(s, f"{D}/fig2_task_analysis.png", 6.75, 2.6, 6.3)
cap(s, "Where the design must act", 6.75, 5.2, 6.3)
pagenum(s, 11)
note(s, "This carries the rubric line about impact on preliminary design. About 90 seconds.")

# ---------------------------------------------------------------- 12 gaps
s = slide("What I Could Not Gather, and Next Steps", None)
body(s, [
 "**No client interview.** A pediatric inpatient behavioural unit; patient privacy and the clinical setting made a client conversation inappropriate. The user perspective is still missing.",
 "**No quantitative mobility data.** Tipping margins, propulsion penalties and reimbursement are outside a direct-care behavioural role.",
 "**Next steps:**",
 (1, "Follow up with a PT, OT or seating and mobility specialist for the quantitative inputs."),
 (1, "Interview adult manual wheelchair users \u2014 the population the project actually targets."),
 (1, "Carry the needs ranking into a Kano diagram for the Preliminary Design Review."),
 (1, "Use the safety and durability constraints as screening criteria in concept generation."),
])
pagenum(s, 12)
note(s, "End on next steps rather than on gaps.")

out = f"{D}/Module_10_Rehab_Center_Experience.pptx"
prs.save(out)
print("saved")
