# -*- coding: utf-8 -*-
import re
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn

doc=Document(); st=doc.styles['Normal']
st.font.name='Arial'; st.font.size=Pt(11)
st.element.rPr.rFonts.set(qn('w:ascii'),'Arial'); st.element.rPr.rFonts.set(qn('w:hAnsi'),'Arial')
st.paragraph_format.space_after=Pt(9); st.paragraph_format.line_spacing=1.10
for s in doc.sections:
    s.top_margin=s.bottom_margin=Inches(1.0); s.left_margin=s.right_margin=Inches(1.0)
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
def P(t,size=None,align=None,after=9,justify=True):
    p=doc.add_paragraph(); runs(p,t,size); p.paragraph_format.space_after=Pt(after)
    if justify and not align: p.alignment=WD_ALIGN_PARAGRAPH.JUSTIFY
    if align: p.alignment=align
    return p
def H(t,size=11.5,before=12):
    p=doc.add_paragraph(); p.paragraph_format.space_before=Pt(before); p.paragraph_format.space_after=Pt(5)
    p.paragraph_format.keep_with_next=True
    r=p.add_run(t); r.bold=True; r.font.size=Pt(size); r.font.name='Arial'; r.font.color.rgb=RGBColor(*NAVY)
    return p
C=WD_ALIGN_PARAGRAPH.CENTER

H('Assignment 5: Product Development Process',13,before=0)
P('585.617 Rehabilitation Engineering  |  [Your Name]  |  [Date]',size=10,align=C,after=13,justify=False)

H('Part 1 — Project Topic',before=4)
P('For my semester project I have selected the **yard tool interface** topic and refined its scope, since as '
  'listed it names an application domain rather than a problem. I narrowed it in three ways. The user population '
  'is manual wheelchair users with full upper-limb function: a powered chair already supplies much of the reaction '
  'mass and traction that make this problem difficult, and users with limited upper-limb function face a different '
  'governing problem, which is actuating the tool rather than reacting its forces. The task class is handheld '
  'powered tools — string trimmers, edgers, hedge trimmers and debris blowers — because ride-on equipment already '
  'has commercial adaptations and unpowered hand tools generate no meaningful reaction forces. The operating '
  'environment is residential turf, which is soft, uneven and frequently sloped. The resulting application space '
  'is **independent residential yard maintenance by manual wheelchair users with full upper-limb function, using '
  'handheld powered tools on unimproved ground.**')
P('My initial impression is that handheld powered yard tools are designed around an assumption that stays '
  'invisible until it fails: a standing operator. A standing user reacts tool torque through a two-handed stance '
  'and body weight, repositions by stepping, and changes working height by bending or kneeling. A seated manual '
  'wheelchair user loses all three at once. The chair becomes the only available reaction mass, and it is a mass '
  'with a defined and fairly narrow stability envelope — the manual wheelchair lecture made the point that pitch '
  'stability is governed by axle position relative to the centre of mass, and that moving the axle forward to '
  'reduce rolling resistance directly reduces how hard it is to tip. The sharper constraint is that manual '
  'propulsion is itself a two-handed, cyclic task, so holding a tool occupies exactly the limbs that mobility '
  'requires and the user cannot propel and work at the same time. Terrain compounds both problems, since manual '
  'chairs propel poorly on grass and small casters catch on soft ground. The problem is therefore the simultaneous '
  'management of reaction forces, working envelope and mobility, and I suspect it is the coupling among the three, '
  'rather than any one of them, that has kept it unsolved.')
P('I am deliberately not proposing a solution at this stage, since concept generation belongs in Phase 1 after '
  'needs are gathered. What I can identify are the areas where innovation is most likely to be required and where '
  'a prototype could be meaningfully tested. The first is the reaction-force path and the stability margin it '
  'leaves: how tool loads are routed into the chair without pushing the occupied system past its ISO 7176-1 static '
  'and ISO 7176-2 dynamic limits on a grade. The second is the seated reach and working envelope, which has to '
  'deliver a tool both to ground level and to a hedge at height from a fixed seated anthropometry. The third is '
  'mobility while equipped — how the tool is stowed or decoupled to return the hands to the handrims, and how it '
  'releases under fault. Each of these is mechanical, each is measurable, and each can be prototyped and tested in '
  'the spring using ramp tip-angle testing and instrumented load measurement. The scope is also bounded in the '
  'direction the Design Project Description asks for: this is an interface and mounting problem, not a new tool '
  'and not a new wheelchair.')

H('Part 2 — Development Plan Based on the Product Development Process')
P('What I would bring to my boss is a request to begin Phase 0, not a request to approve a design. Before '
  'releasing Phase 0 resources I would expect to provide six things: a defensible estimate of the served '
  'population, which is manual wheelchair users who own or maintain a yard and is a much smaller number than the '
  'wheelchair population generally; evidence that the need is real and unmet, gathered from interviews with at '
  'least eight manual wheelchair users who currently do yard work or have given it up, together with two or three '
  'occupational therapists or assistive technology professionals; a competitive and patent landscape covering '
  'adaptive gardening tools, tool-holding arms and wheelchair-mounted accessories, with a preliminary '
  'freedom-to-operate view; a regulatory determination; a funding model; and a resourced schedule with stated kill '
  'criteria. The regulatory and funding pair matters most, because it sets the economics before any engineering '
  'begins. The product makes no medical claim, so it is not an FDA-regulated device and is governed instead by '
  'power-tool safety standards and by ISO 7176 where it meets the chair. By the same token it will not satisfy a '
  'medical-necessity test, so there is no reimbursement path and the product must be cash-pay or '
  'nonprofit-subsidised. That fixes a price ceiling before a concept exists, and the price ceiling constrains the '
  'bill of materials.')
P('**Phase 0, Planning**, is investigation, scoping and engineering assessment. Its deliverables are the validated '
  'needs list, the served-population estimate, the landscape report, the regulatory memo, a preliminary hazard '
  'list covering a powered cutting tool operated beside an occupied chair, and a resourced plan for Phase 1. The '
  'exit gate is an evidence gate, not a design gate: is the need demonstrated, is the population large enough to '
  'justify tooling, does a feasible stability envelope appear to exist, is there freedom to operate, and is the '
  'budget within tolerance. **Phase 1, Concept Development**, converts customer needs into a Product Design '
  'Specification and generates and screens concepts against it. The assistive-technology considerations from the '
  'lecture bear directly here — user-centred design, the accessibility ecosystem, and stigma and aesthetics — and '
  'the last of those deserves more weight than it would for a generic tool accessory, because a device that marks '
  'its user as needing help is a device that ends up left in the shed. Phase 1 exits with an approved PDS and a '
  'selected concept.')
P('**Phase 2, System-level Design**, fixes the architecture: how tool loads are routed into the chair frame, where '
  'the interface attaches, and how the assembly mounts and demounts. Ergonomics and anthropometrics, adaptability '
  'across chair geometries, and safety and reliability are the governing concerns, and prototyping begins here. '
  'For this project the critical early experiment is a ramp tip-angle test under a representative tool load, '
  'because if the stability envelope cannot be met then the architecture is wrong and it is far cheaper to '
  'discover that in Phase 2 than later. **Phase 3, Detail Design**, resolves components, materials and tolerances, '
  'and is where compliance and standards, materials and hygiene, and the tension between customisation and '
  'scalability get settled. That tension is real for this product: wheelchairs vary enough in frame geometry that '
  'a single universal mount may not exist, and choosing between a family of fittings and one adjustable fitting is '
  'a Phase 3 decision with large manufacturing consequences.')
P('**Phase 4, Testing and Refinement**, verifies the design against the PDS and validates it with users. Trials '
  'with the target population and long-term reliability testing are both necessary, but I would argue for '
  'extending the phase past conventional verification, because the endpoint that actually matters for assistive '
  'technology is continued voluntary use: a device can meet every specification and still be abandoned. **Phase '
  '5, Production Ramp-up**, is small-batch manufacture rather than mass production at this volume, with user '
  'training and a support and spares channel treated as deliverables rather than afterthoughts, since a user whose '
  'device fails has no substitute. Overall I would propose Phase 0 at roughly eight weeks of part-time effort with '
  'a formal gate before any Phase 1 money is committed. The argument for that discipline comes from the design '
  'reading: by the close of conceptual design the great majority of total product cost is already committed even '
  'though almost none of it has been spent, so a well-evidenced decision to stop is inexpensive now and very '
  'expensive later.')

H('References')
for r in ['Dieter, G. E. and Schmid, L. C. *Engineering Design*, 5th ed. New York: McGraw-Hill, 2013. Chapter 2, Sections 2.1–2.4 and 2.6.',
          '585.617 Rehabilitation Engineering, Module 5 lecture materials: "Product Development Process Overview" and "Considerations Specific to Assistive Technologies." Johns Hopkins University.',
          'International Organization for Standardization. ISO 7176 series, *Wheelchairs* — Part 1 (determination of static stability) and Part 2 (determination of dynamic stability of electric wheelchairs). Geneva: ISO.']:
    p=P(r,size=9.5,after=5,justify=False)
    p.paragraph_format.left_indent=Inches(0.35); p.paragraph_format.first_line_indent=Inches(-0.35)
doc.save('Module_05_Assignment_Topic_and_PDP_Plan.docx'); print('saved')
