# -*- coding: utf-8 -*-
import re
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

doc=Document(); st=doc.styles['Normal']
st.font.name='Arial'; st.font.size=Pt(10.5)
st.element.rPr.rFonts.set(qn('w:ascii'),'Arial'); st.element.rPr.rFonts.set(qn('w:hAnsi'),'Arial')
st.paragraph_format.space_after=Pt(7); st.paragraph_format.line_spacing=1.08
for s in doc.sections:
    s.top_margin=s.bottom_margin=Inches(0.85); s.left_margin=s.right_margin=Inches(0.9)
NAVY=(0x1F,0x3B,0x73)
def runs(p,t,size=None):
    for tok in re.split(r'(\*\*[^*]+\*\*|\*[^*]+\*)',t):
        if not tok: continue
        if tok.startswith('**'): r=p.add_run(tok[2:-2]); r.bold=True
        elif tok.startswith('*'): r=p.add_run(tok[1:-1]); r.italic=True
        else: r=p.add_run(tok)
        r.font.name='Arial'
        if size: r.font.size=Pt(size)
        r._element.rPr.rFonts.set(qn('w:ascii'),'Arial'); r._element.rPr.rFonts.set(qn('w:hAnsi'),'Arial')
    return p
def P(t,size=None,align=None,after=7,justify=True):
    p=doc.add_paragraph(); runs(p,t,size); p.paragraph_format.space_after=Pt(after)
    if justify and not align: p.alignment=WD_ALIGN_PARAGRAPH.JUSTIFY
    if align: p.alignment=align
    return p
def H(t,size=11.5,before=11,rule=True):
    p=doc.add_paragraph(); p.paragraph_format.space_before=Pt(before); p.paragraph_format.space_after=Pt(4)
    p.paragraph_format.keep_with_next=True
    r=p.add_run(t); r.bold=True; r.font.size=Pt(size); r.font.name='Arial'; r.font.color.rgb=RGBColor(*NAVY)
    if rule:
        pPr=p._p.get_or_add_pPr(); b=OxmlElement('w:pBdr'); bt=OxmlElement('w:bottom')
        bt.set(qn('w:val'),'single'); bt.set(qn('w:sz'),'6'); bt.set(qn('w:space'),'1'); bt.set(qn('w:color'),'999999')
        b.append(bt); pPr.append(b)
    return p
def FIG(path,width,cap):
    doc.add_picture(path,width=Inches(width))
    doc.paragraphs[-1].alignment=WD_ALIGN_PARAGRAPH.CENTER
    doc.paragraphs[-1].paragraph_format.space_before=Pt(7)
    doc.paragraphs[-1].paragraph_format.keep_with_next=True
    return P(cap,size=8.6,align=WD_ALIGN_PARAGRAPH.CENTER,after=11,justify=False)
C=WD_ALIGN_PARAGRAPH.CENTER

H('Assignment 5: Product Development Process',13,before=0,rule=False)
P('585.617 Rehabilitation Engineering  |  Module 5 Assignment  |  [Your Name]  |  [Date]',size=9.5,align=C,after=11,justify=False)

H('Part 1 — Project Topic Selection')
P('I have selected the **yard tool interface** topic from the provided list and refined it, since as written it '
  'names an application domain rather than a problem. Figure 1 records the narrowing. I excluded power wheelchair '
  'users, because a powered base already supplies much of the reaction mass and traction that make this problem '
  'hard; I excluded users with limited upper-limb function, because for them the governing difficulty is actuating '
  'the tool rather than reacting its forces, which is a genuinely different design problem; and I excluded ride-on '
  'equipment and unpowered hand tools, the first because commercial adaptations already exist and the second '
  'because there is no reaction-force problem to solve. What remains is the scoped application space: '
  '**independent residential yard maintenance by manual wheelchair users with full upper-limb function, for tasks '
  'that require a handheld powered tool — string trimming, edging, hedge trimming, debris blowing — performed on '
  'soft, uneven and frequently sloped turf.**')
FIG('fig1_scope.png',6.2,'**Figure 1.** Narrowing the listed topic into a scoped application space. Greyed branches are excluded, with the reason for exclusion stated.')
P('The problem is that handheld powered yard tools are built around an assumption that stays invisible until it '
  'fails: a standing operator. A standing user reacts tool torque through a two-handed stance and body weight, '
  'repositions by stepping, and changes working height by bending or kneeling. A seated manual wheelchair user '
  'loses all three at once. The chair becomes the only available reaction mass, and it is a mass with a defined '
  'and fairly narrow stability envelope — the manual wheelchair lecture made the point that pitch stability is set '
  'by axle position relative to the centre of mass, and that moving the axle forward to cut rolling resistance '
  'buys that reduction at the direct cost of making the chair easier to tip. More fundamentally, manual '
  'propulsion is itself a two-handed cyclic task, so holding a tool consumes exactly the limbs that mobility '
  'requires: the user cannot drive and work at the same time. Layer on the terrain — manual chairs propel poorly '
  'on grass and small casters catch on soft ground — and the problem resolves into the simultaneous management of '
  'reaction forces, workspace and mobility. That combination is why I think there is real engineering in it rather '
  'than a purchasing decision.')
P('I am deliberately **not** proposing a solution at this stage; the concept belongs in Phase 1, after needs are '
  'gathered. What I can identify now are the three parameters where innovation is most likely to be required and '
  'where a prototype could be meaningfully tested. **P1, the reaction-force path and stability margin**: how tool '
  'loads are routed into the chair frame without pushing the occupied system past its ISO 7176-1 static and '
  'ISO 7176-2 dynamic limits on a grade [4]. **P2, the seated reach and workspace envelope**: delivering a tool to '
  'ground level and to a hedge at height from a fixed seated anthropometry. **P3, mobility while equipped**: how '
  'the tool is stowed or decoupled to return the hands to the handrims, and how it releases under fault. Each is '
  'mechanical, each is measurable, and each is testable in the spring with instrumented load measurement and '
  'tip-angle testing on a ramp. The scope is bounded in the direction the Design Project Description asks for — '
  'this is an interface and mounting problem, not a new tool and not a new wheelchair — which keeps it clear of '
  'topics too complex to prototype inside a two-semester course.')

H('Part 2 — High-Level Plan for Phase 0 Approval')
P('The request I would put to my boss is not approval of a design. It is approval to spend Phase 0 resources '
  'establishing whether a design is worth attempting at all. Following the six-phase product development process '
  'from the module lecture — Planning, Concept Development, System-level Design, Detail Design, Testing and '
  'Refinement, Production Ramp-up — Phase 0 is where investigation, scoping and engineering assessment happen, and '
  'Phase 1 is where customer needs are converted into a Product Design Specification [1], [2], [5]. The '
  'information a sponsor needs before releasing Phase 0 funds therefore concerns need, market, risk and resources, '
  'and deliberately excludes a concept. Presenting a concept at this point would be the specific failure mode the '
  'module overview warns about: beginning by generating ideas and building, rather than establishing that the '
  'right problem has been identified.')
P('The first block of information is the user and the market. I would bring a defensible estimate of the served '
  'population — manual wheelchair users who own or maintain a yard, which is a far smaller number than the '
  'wheelchair-user population and needs to be stated honestly rather than inflated — together with a validation '
  'plan: structured interviews with at least eight manual wheelchair users who currently do yard work or have '
  'given it up, plus two or three occupational therapists or assistive technology professionals, and at least two '
  'observational visits to see what people actually do and what workarounds already exist. Alongside this I would '
  'bring a competitive and intellectual-property landscape covering existing adaptive gardening tools, tool-holding '
  'arms and wheelchair-mounted accessories, with a preliminary freedom-to-operate assessment. The deliverable from '
  'this block is a decision, not a product: whether the need is real, unmet, and attributable to the specific '
  'population I have scoped.')
P('The second block is the determination with the largest downstream consequence, and it is a business and '
  'regulatory question rather than a technical one. Figure 2 sets out the logic. My working assumption is the '
  'left-hand path: the product makes no medical claim, so it is not an FDA-regulated device, and it is governed '
  'instead by power-tool safety standards and by ISO 7176 where it interfaces with the chair, carrying '
  'product-liability rather than regulatory exposure. The corollary concerns funding. Yard maintenance will not '
  'satisfy a medical-necessity test — the wheelchair coverage policy discussed earlier in the course restricts '
  'reimbursement to mobility-related activities of daily living in customary locations within the home — so there '
  'is no third-party reimbursement path, and the product must be cash-pay, nonprofit-subsidised or open-source. '
  'That establishes a price ceiling before any concept exists, which in turn constrains the bill of materials. '
  'This is precisely the class of business consideration that has to surface before Phase 0, not be discovered in '
  'Phase 3 when the cost is already committed [3].')
FIG('fig2_regulatory.png',6.2,'**Figure 2.** Regulatory and funding pathway determination. The branch taken here fixes the governing standards, the liability posture, and the achievable target price.')
P('The third block is resources and the exit criteria. I would propose Phase 0 at roughly eight weeks of part-time '
  'effort, with deliverables comprising a validated needs list, a served-population estimate, the landscape and '
  'freedom-to-operate report, a regulatory determination memo, a preliminary hazard list covering a powered '
  'cutting tool operated near an occupied chair, and a resourced Phase 1 plan. Critically, I would state the exit '
  'gate in advance rather than negotiating it afterwards. Figure 3 gives the gate logic; all five questions are '
  'evidence questions, and none of them asks what the device will look like. I would also state the kill criteria '
  'explicitly, because the most valuable outcome of Phase 0 can be a well-evidenced decision not to proceed. The '
  'cost-committed curve from the engineering design material makes the argument for me: by the close of conceptual '
  'design roughly three-quarters of total product cost is already locked in while almost none of it has been '
  'spent, so a disciplined stop at the Phase 0 gate is cheap, and the same decision taken in Phase 3 is not [3].')
FIG('fig3_gate.png',5.85,'**Figure 3.** Phase 0 exit gate. Each branch is an evidence question with a defined failure action; no concept is selected at this gate.')

H('References',11.5,before=10)
for r in ['[1] Dieter, G. E. and Schmid, L. C. *Engineering Design*, 5th ed. New York: McGraw-Hill, 2013. Chapter 2, Sections 2.1–2.4 and 2.6.',
          '[2] Ulrich, K. T. and Eppinger, S. D. *Product Design and Development*. New York: McGraw-Hill.',
          '[3] Ullman, D. G. *The Mechanical Design Process*, 4th ed. New York: McGraw-Hill, 2010.',
          '[4] International Organization for Standardization. ISO 7176 series, *Wheelchairs* — Part 1 (determination of static stability) and Part 2 (determination of dynamic stability of electric wheelchairs). Geneva: ISO.',
          '[5] 585.617 Rehabilitation Engineering, Module 5 lecture materials: "Product Development Process Overview" and "Considerations Specific to Assistive Technologies." Johns Hopkins University.']:
    p=P(r,size=9.2,after=4,justify=False)
    p.paragraph_format.left_indent=Inches(0.32); p.paragraph_format.first_line_indent=Inches(-0.32)
doc.save('Module_05_Assignment_Topic_and_PDP_Plan.docx'); print('saved')
