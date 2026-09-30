# -*- coding: utf-8 -*-
import re
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

doc=Document(); st=doc.styles['Normal']
st.font.name='Arial'; st.font.size=Pt(10.5)
st.element.rPr.rFonts.set(qn('w:ascii'),'Arial'); st.element.rPr.rFonts.set(qn('w:hAnsi'),'Arial')
st.paragraph_format.space_after=Pt(5); st.paragraph_format.line_spacing=1.06
for s in doc.sections:
    s.top_margin=s.bottom_margin=Inches(0.8); s.left_margin=s.right_margin=Inches(0.85)
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
def P(t,size=None,align=None,after=5,justify=True):
    p=doc.add_paragraph(); runs(p,t,size); p.paragraph_format.space_after=Pt(after)
    if justify and not align: p.alignment=WD_ALIGN_PARAGRAPH.JUSTIFY
    if align: p.alignment=align
    return p
def H(t,size=11.5,before=10,color=NAVY,rule=False):
    p=doc.add_paragraph(); p.paragraph_format.space_before=Pt(before); p.paragraph_format.space_after=Pt(3)
    p.paragraph_format.keep_with_next=True
    r=p.add_run(t); r.bold=True; r.font.size=Pt(size); r.font.name='Arial'; r.font.color.rgb=RGBColor(*color)
    if rule:
        pPr=p._p.get_or_add_pPr(); b=OxmlElement('w:pBdr'); bt=OxmlElement('w:bottom')
        bt.set(qn('w:val'),'single'); bt.set(qn('w:sz'),'6'); bt.set(qn('w:space'),'1'); bt.set(qn('w:color'),'999999')
        b.append(bt); pPr.append(b)
    return p
def EQ(t):
    p=doc.add_paragraph(); r=p.add_run(t); r.font.name='Arial'; r.font.size=Pt(10.5); r.italic=True
    p.alignment=WD_ALIGN_PARAGRAPH.CENTER; p.paragraph_format.space_before=Pt(3); p.paragraph_format.space_after=Pt(5)
    return p
def shade(c,hx):
    tcPr=c._tc.get_or_add_tcPr(); sh=OxmlElement('w:shd'); sh.set(qn('w:val'),'clear'); sh.set(qn('w:fill'),hx); tcPr.append(sh)
AVAIL=6.80
def TABLE(hdr,rows,widths,fs=8.4):
    tot=sum(widths); widths=[w*AVAIL/tot for w in widths]
    t=doc.add_table(rows=1,cols=len(hdr)); t.style='Table Grid'; t.alignment=WD_TABLE_ALIGNMENT.CENTER; t.autofit=False
    tblPr=t._tbl.tblPr
    mar=OxmlElement('w:tblCellMar')
    for side,v in (('left','50'),('right','50'),('top','20'),('bottom','20')):
        e=OxmlElement('w:'+side); e.set(qn('w:w'),v); e.set(qn('w:type'),'dxa'); mar.append(e)
    tblPr.append(mar)
    lay=OxmlElement('w:tblLayout'); lay.set(qn('w:type'),'fixed'); tblPr.append(lay)
    g=t._tbl.find(qn('w:tblGrid'))
    if g is not None: t._tbl.remove(g)
    g=OxmlElement('w:tblGrid')
    for w in widths:
        gc=OxmlElement('w:gridCol'); gc.set(qn('w:w'),str(int(w*1440))); g.append(gc)
    tblPr.addnext(g)
    for i,hh in enumerate(hdr):
        c=t.rows[0].cells[i]; c.text=''; pp=c.paragraphs[0]; r=pp.add_run(hh); r.bold=True; r.font.size=Pt(fs); r.font.name='Arial'
        pp.paragraph_format.space_after=Pt(1); shade(c,'E8EAED')
    for row in rows:
        cs=t.add_row().cells
        for i,v in enumerate(row):
            c=cs[i]; c.text=''; pp=c.paragraphs[0]; runs(pp,v,fs); pp.paragraph_format.space_after=Pt(1)
    for r_ in t.rows:
        for i,w in enumerate(widths): r_.cells[i].width=Inches(w)
    trPr=t.rows[0]._tr.get_or_add_trPr(); th=OxmlElement('w:tblHeader'); th.set(qn('w:val'),'true'); trPr.append(th)
    return t
def FIG(path,width,cap):
    doc.add_picture(path,width=Inches(width))
    doc.paragraphs[-1].alignment=WD_ALIGN_PARAGRAPH.CENTER
    doc.paragraphs[-1].paragraph_format.space_before=Pt(6)
    doc.paragraphs[-1].paragraph_format.keep_with_next=True
    p=P(cap,size=8.6,align=WD_ALIGN_PARAGRAPH.CENTER,after=9,justify=False)
    return p

C=WD_ALIGN_PARAGRAPH.CENTER
H('Application of Basic Anatomy and Biomechanics: High-Level Systems Design of a Transtibial Prosthesis',13,before=0,rule=False)
P('585.617 Rehabilitation Engineering  |  Module 4 Assignment  |  [Your Name]  |  [Date]',size=9.5,align=C,after=10,justify=False)

H('1.  Case Framing and Design Assumptions',11.5,before=2,rule=True)
P('The client sustained a bilateral **transtibial** (below-knee) amputation following meningitis. The critical '
  'consequence for this design is that **both knees are anatomically intact**. The prosthesis therefore replaces '
  'the ankle-foot complex only, and the single most important design constraint is to restore ankle-foot function '
  'without compromising the natural knees that remain [1]. Because the client is bilaterally affected, every design '
  'penalty is paid twice: mass, cost, maintenance burden, and failure exposure all double, and there is no sound '
  'limb to serve as a kinematic reference or to compensate during a fault. The baseline device is scoped for '
  '**everyday level walking**; sport-specific requirements are addressed in Part B.')
P('Quantitative analysis requires an anthropometric basis. The following values are stated as **design assumptions** '
  'rather than clinical data for this individual, and all results scale linearly with body weight.')
TABLE(['Parameter','Value','Basis'],
[['Body mass, *m* (incl. prostheses)','60 kg','Assumed; representative adult female athlete'],
 ['Body weight, *BW = mg*','588.6 N','*g* = 9.81 m/s²'],
 ['Prosthetic foot length, *L*','0.24 m','≈ 0.152 × stature for 1.65 m height'],
 ['Ankle joint height above ground, *h*','0.07 m','Standard transtibial build height'],
 ['Ankle-to-forefoot COP distance, *d*','0.13 m','COP under metatarsal heads at terminal stance'],
 ['Functional level','MFCL K3–K4','High-activity community ambulator'],
 ['Duty cycle','≈ 5,000 steps/day','Typical active user; drives fatigue sizing [3]']],
 [2.05,1.15,3.60])

H('2.  Part A — Technical Approach for Everyday Walking')
H('2.1  Joints Spanned and Replication Decisions',10.8,before=7)
P('The prosthesis physically spans the knee — the socket brim and suspension extend proximal to the joint line — '
  'but it must not *replicate* it. The decision for each joint is summarised below.')
TABLE(['Joint','Anatomical role','Replicate?','Rationale'],
[['Tibiofemoral (knee)','Sagittal flexion/extension; primary shock absorption and limb shortening in swing',
  '**No**','Intact. A retained biological knee preserves proprioception and gait economy no prosthetic knee can match. The socket trim line is the design issue: it must clear the hamstring tendons and permit ≥ 120° flexion for sitting and stairs.'],
 ['Talocrural (ankle)','Dorsiflexion / plantarflexion; the dominant sagittal power source at push-off',
  '**Yes**','Non-negotiable. Absent controlled plantarflexion at loading response and dorsiflexion through midstance, the user vaults over a rigid lever, producing the classic gait deviations and elevated socket pressures the module identifies [2], [5].'],
 ['Subtalar','Inversion / eversion; accommodates coronal-plane terrain variation',
  '**Partially**','Provide *compliance*, not a controlled degree of freedom. An elastomeric bushing gives ±6° of passive give at negligible mass and cost. A fully articulated subtalar joint adds mass, wear surfaces and alignment complexity for benefit confined to uneven ground.'],
 ['Transverse tarsal (Chopart)','Couples forefoot and rearfoot; midfoot stiffening for push-off',
  '**No (as a joint)**','Function is reproduced by the graded bending stiffness of a one-piece carbon keel. Discretising it would add joints without adding function.'],
 ['Metatarsophalangeal','Toe break; forefoot rocker at terminal stance','**Yes (passively)**',
  'Replicated by a split-toe keel geometry whose bending compliance reproduces the rocker. A hinged toe would be a wear item in the dirtiest, most highly loaded location on the device.'],
 ['Shank transverse rotation','±8–10° internal/external rotation during gait','**Optional**',
  'Omitted from the walking baseline. Torsional accommodation matters for turning and for court and board sports; a torsion adapter is a modular addition (Part B) rather than a baseline cost.']],
 [1.00,1.48,0.98,5.34])

H('2.2  Range of Motion: Anatomical Envelope versus Gait Demand',10.8,before=8)
P('The governing design principle is that **a prosthesis should reproduce the range of motion that walking actually '
  'uses, not the full anatomical envelope**. The two differ by roughly a factor of two at the ankle, and every '
  'degree of unused range costs build height, mass and a potential instability mode.')
TABLE(['Joint / motion','Anatomical ROM','ROM used in level walking','Design target','Decision'],
[['Talocrural dorsiflexion','0–20°','≈ 10°','15°','Replicate with margin for ramps'],
 ['Talocrural plantarflexion','0–50°','≈ 20°','20°','Replicate; damped, not free'],
 ['Subtalar inversion','0–35°','≈ 4°','±6° combined','Compliance only'],
 ['Subtalar eversion','0–15°','≈ 2°','(as above)','Compliance only'],
 ['Transverse rotation','±10°','≈ ±8°','0° baseline','Deferred to sport module'],
 ['MTP extension','0–70°','30–60°','Passive keel bending','Geometric, not articulated'],
 ['Knee flexion (intact)','0–135°','0–60°','Unobstructed to 120°','Socket trim constraint']],
 [1.55,1.10,1.55,1.35,2.25])

H('2.3  Proposed Mechanisms',10.8,before=8)
P('The selected architecture is a **modular endoskeletal transtibial prosthesis**: a total-surface-bearing socket '
  'with a silicone liner and elevated vacuum suspension, a modular pylon, a hydraulically damped ankle carrying an '
  'elastomeric multiaxial bushing, and a one-piece energy-storing-and-returning (ESAR) carbon keel with a split toe. '
  'Figure 1 shows the arrangement.')
FIG('fig1_design.png',5.55,'**Figure 1.** Sagittal system layout of the proposed transtibial prosthesis. The knee is spanned by the socket but deliberately not replicated.')
TABLE(['Candidate mechanism','Function','Assessment'],
[['SACH foot (solid ankle, cushion heel)','Compliant heel wedge, rigid keel','**Rejected.** Lowest cost and mass, no moving parts, but returns almost no energy and cannot accommodate ramps. Inappropriate for a K3–K4 bilateral user.'],
 ['Single-axis ankle with bumpers','Sagittal rotation against elastomer stops','**Rejected as sole mechanism.** Gives plantarflexion at loading response but no velocity-dependent control and no energy return.'],
 ['ESAR carbon keel','Stores strain energy in midstance, returns it at push-off','**Selected.** Principal energy-return element; see §2.6 for sizing.'],
 ['Hydraulic ankle damper','Velocity-dependent resistance; hydrostatic ramp adaptation','**Selected.** Controls heel descent and sets dorsiflexion resistance. Particularly valuable bilaterally, where neither limb can borrow stability from a sound side.'],
 ['Elastomeric multiaxial bushing','Passive coronal and transverse compliance','**Selected.** Supplies the ±6° of subtalar give from §2.2 at minimal mass.'],
 ['Powered (motorised) ankle','Active net-positive push-off work','**Considered, deferred.** Restores physiological push-off power and is attractive bilaterally, but adds ≈ 2 kg, a charging regimen and a large cost increment. Retained as a growth path, not the baseline.'],
 ['Microprocessor control layer','Phase detection and adaptive damping','**Selected (optional module).** Control logic in Figure 3.']],
 [1.65,1.85,4.30])

H('2.4  Control Logic',10.8,before=8)
P('Because a microprocessor-controlled hydraulic ankle is included, its control logic is specified. The controller '
  'samples an inertial measurement unit and a pylon-mounted load cell, classifies the gait phase, and modulates '
  'valve orifice area accordingly. A slope-estimation branch shifts the neutral ankle angle on grades — the single '
  'highest-value adaptive behaviour for a bilateral user, who cannot compensate for a ramp with a sound ankle.')
FIG('fig3_logic.png',4.35,'**Figure 3.** Control logic for the microprocessor-regulated hydraulic ankle.')

H('2.5  Ground Reaction Forces and Joint Reaction Forces',10.8,before=8)
P('Vertical ground reaction force in level walking follows the characteristic double-humped profile, peaking near '
  '1.1 BW at loading response and 1.2 BW at terminal stance with a midstance trough near 0.8 BW; anteroposterior '
  'shear reaches roughly ±0.2 BW, braking in early stance and propulsive in late stance [6]. Terminal stance governs '
  'the ankle, because the centre of pressure has advanced to the metatarsal heads and the moment arm about the ankle '
  'is greatest. Figure 2 gives the loading profile and the foot-segment free-body diagram.')
FIG('fig2_walkfbd.png',6.30,'**Figure 2.** (a) Walking ground reaction force profile for the 60 kg design case. (b) Foot-segment free-body diagram at terminal stance.')
P('Taking the prosthetic foot as a free body and neglecting its weight (≈ 4 N, under 1% of the applied load), static '
  'equilibrium gives:')
EQ('ΣFy = 0 :   Rv = Fv = 1.2 (588.6) = 706 N')
EQ('ΣFx = 0 :   Rh = Fap = 0.2 (588.6) = 118 N')
EQ('ΣMankle = 0 :   Ma = Fv d − Fap h = 706 (0.13) − 118 (0.07) = 83.6 N·m')
EQ('R = √(Rv² + Rh²) = √(706² + 118²) = 716 N  =  1.22 BW')
P('**Sanity check.** The computed ankle moment normalises to 83.6 / 60 = **1.39 N·m/kg**, against a literature norm '
  'for peak plantarflexor moment in walking of roughly 1.4–1.6 N·m/kg [6]. The model is therefore slightly '
  'conservative in the right direction and the geometry assumptions are sound.')

H('2.6  Structural Sizing and Material Selection',10.8,before=8)
P('**Pylon.** Taking a 30 mm outside diameter tube with 2 mm wall: *A* = 175.9 mm², *I* = 17,329 mm⁴, '
  '*Z* = *I*/*c* = 1,155 mm³. The ankle moment is transmitted up the pylon, so combined axial and bending stress is:')
EQ('σ = P/A + Ma/Z = 706/175.9 + 83,600/1,155 = 4.0 + 72.3 = 76.4 MPa')
P('**Keel.** The forefoot keel is treated as a cantilever of width *b* = 60 mm and thickness *t*, loaded at *d* = '
  '0.13 m, with *Z* = *bt*²/6. Setting an allowable of 350 MPa (safety factor 2 on a 700 MPa unidirectional carbon '
  'flexural strength) gives *t* = 5.13 mm, and with *E* ≈ 120 GPa the tip deflection is 6.4 mm, storing '
  '½*Fδ* ≈ 2.3 J per step. Thinning the keel to 4.5 mm raises stress to 453 MPa (safety factor 1.5) but increases '
  'deflection to 9.5 mm and stored energy to 3.3 J. **Keel thickness is therefore a direct trade between energy '
  'return and structural margin** — a 12% reduction in thickness buys 46% more returned energy at the cost of a '
  'third of the safety factor. This is the central tuning parameter of the design and should be set per patient '
  'against measured cadence and body mass.')
TABLE(['Component','Material','Yield / strength','Computed stress','SF','Justification'],
[['Pylon','6061-T6 aluminium','276 MPa','76.4 MPa','**3.6**','Adequate for walking. Aluminium has no true fatigue endurance limit, so ISO 10328 cyclic qualification over millions of cycles governs, not the static number [3].'],
 ['Pylon (alt.)','Ti-6Al-4V','880 MPa','76.4 MPa','11.5','Large static margin and superior fatigue behaviour; 64% denser, so mass penalty is doubled bilaterally. Selected only if Part B loading applies.'],
 ['Forefoot keel','Unidirectional carbon/epoxy','≈ 700 MPa flexural','349 MPa','2.0','High specific stiffness and excellent fatigue behaviour make it the only practical energy-return material.'],
 ['Socket','Carbon/epoxy laminate','≈ 600 MPa','Distributed','—','Stiffness governs, not strength; the design driver is pressure distribution over the residual limb, not fracture.'],
 ['Liner','Medical-grade silicone','—','≤ 30 kPa interface','—','Pressure redistribution and shear management over bony prominences; directly addresses the pressure problems noted in the module [2].'],
 ['Ankle bushing','Polyurethane elastomer','Shore 80–95A','—','—','Durometer sets the ±6° compliance of §2.2; selected against operating temperature.']],
 [1.18,1.45,1.05,0.95,0.42,4.70])
P('Qualification would follow **ISO 10328** for the structural assembly — static proof and ultimate tests '
  'representing worst-case loading, plus cyclic testing representing normal walking — and **ISO 22675** for the '
  'ankle-foot device specifically [3], [8].')

H('3.  Part B — Adapting the Design for Snowboarding')
P('Snowboarding is selected because it loads the prosthesis in a plane the walking design barely sees. Walking is '
  'an essentially sagittal, cyclic, low-amplitude activity. A carved turn is a **sustained frontal-plane** event, and '
  'landing is a high-magnitude transient. These are different design problems, not a scaled version of the same one.')
H('3.1  Carved-Turn Analysis',10.8,before=7)
P('In a steady carved turn the rider is in equilibrium under gravity and the centripetal force required by the turn '
  'radius. For a representative turn at *v* = 12 m/s (43 km/h) and radius *r* = 15 m:')
EQ('ac = v²/r = 12²/15 = 9.6 m/s²        Fc = m ac = 60 (9.6) = 576 N')
EQ('R = √((mg)² + Fc²) = √(588.6² + 576²) = 824 N = 1.40 BW')
EQ('θ = arctan(ac /g) = arctan(9.6/9.81) = 44.4° from vertical')
FIG('fig4_snowfbd.png',6.30,'**Figure 4.** (a) Whole-body force balance in a steady carved turn. (b) Frontal-plane free-body diagram at the prosthetic ankle.')
P('The resultant is only 1.40 BW — modest against the 6 BW landing case below — but it acts **continuously through '
  'the turn and in the frontal plane**. With the ankle offset *e* = 0.13 m from the engaged edge (half the board '
  'width), and conservatively assuming the prosthetic ankle and pylon react the full moment rather than sharing it '
  'with the boot cuff and binding highback:')
EQ('Mc = R e = 824 (0.13) = 107 N·m        σ = Mc /Z + R/A = 92.6 + 4.7 = 97.4 MPa   (SF 2.8 on 6061-T6)')
H('3.2  Landing Case',10.8,before=7)
P('The governing structural case is landing. Taking a 0.5 m drop decelerated over 0.10 m of combined limb and '
  'suspension travel:')
EQ('v = √(2gh) = 3.13 m/s        a = v²/2s = 49.0 m/s²        F = m(g + a) = 3,532 N = 6.0 BW')
P('Applied at the same 0.13 m offset this produces *M* = 459 N·m and a pylon stress of **417 MPa**. Against 6061-T6 '
  'at 276 MPa the safety factor is **0.66 — the aluminium pylon yields**. This single calculation is the decisive '
  'result of Part B: the walking design is not merely under-optimised for snowboarding, it is **structurally '
  'inadequate**. Switching to Ti-6Al-4V restores a safety factor of 2.1; upsizing the aluminium section to 34 mm × '
  '3 mm reaches only 1.19, which is insufficient margin for an impact load with this much scatter.')
H('3.3  Comparison of Demands',10.8,before=7)
TABLE(['Design parameter','Level walking','Snowboarding','Consequence for the design'],
[['Peak resultant force','716 N (1.22 BW)','824 N sustained (1.40 BW); 3,532 N landing (6.0 BW)','Impact case governs structure, not the steady case'],
 ['Dominant loading plane','Sagittal','Frontal, plus sagittal and torsional','Biaxial bending; pylon can no longer be sized on one plane'],
 ['Peak ankle moment','83.6 N·m sagittal','107 N·m frontal; 459 N·m on landing','Ankle unit must react moments it was never sized for'],
 ['Dorsiflexion required','≈ 10°','25–30°, sustained in a flexed stance','Greater range and a shifted neutral angle'],
 ['Inversion/eversion','≈ 6° accommodation','±15°, actively used for edge control','Compliance is no longer sufficient; range is functional'],
 ['Transverse rotation','≈ ±8°, not replicated','±15°, needed for rotation and to shed torsional shock','Torsion adapter becomes mandatory'],
 ['Load character','Cyclic, ≈ 5,000/day','Sustained turns plus high-energy transients','Both fatigue and ultimate strength govern'],
 ['Ambient temperature','15–25 °C','−10 to 0 °C','Elastomer stiffening; material selection by glass transition'],
 ['Pylon stress (30 × 2 mm, 6061-T6)','76.4 MPa (SF 3.6)','417 MPa (SF 0.66 — fails)','Material change to titanium required']],
 [1.35,1.25,2.05,3.15])
H('3.4  Required Design Modifications',10.8,before=7)
P('**1. Pylon material and section.** Substitute Ti-6Al-4V (SF 2.1 against the landing case). This is a direct '
  'consequence of the §3.2 calculation, not a preference.')
P('**2. Torsion and shock adapter.** Add a modular torsion unit providing ±15° of transverse compliance with an '
  'axial shock element. This both supplies the rotation the activity demands and attenuates the landing transient, '
  'reducing the peak the pylon must carry.')
P('**3. Frontal-plane articulation.** Replace the passive ±6° bushing with a multiaxial unit giving ±15° of '
  'controlled inversion/eversion. Edge control is an *active* frontal-plane task; passive give is not equivalent.')
P('**4. Reconsider the keel.** The board is itself the lever. A split-toe forefoot keel contributes little and '
  'introduces an unwanted compliance in the frontal plane. A stiffer, laterally symmetric keel — or a dedicated '
  'board-specific foot with no toe break — is the better alternative, and is the approach several sport prostheses '
  'already take.')
P('**5. Cold-temperature material selection.** Polyurethane elastomers stiffen sharply as temperature approaches '
  'their glass transition, so a bushing tuned at room temperature will not behave as designed at −10 °C. Specify a '
  'low-glass-transition silicone, and verify damper fluid viscosity across the operating range.')
P('**6. Suspension and interface.** Impact loading argues for a mechanical backup to vacuum suspension (pin-lock or '
  'lanyard), and for a dedicated sport socket rather than reusing the walking socket, whose trim lines are cut for a '
  'different stance.')

H('References',11.5,before=10,rule=True)
for r in ['[1] Nordin, M. and Frankel, V. H. *Basic Biomechanics of the Musculoskeletal System*, 3rd ed. Baltimore, MD: Lippincott Williams & Wilkins, 2001. Chapters 7 and 9.',
          '[2] Cooper, R. A. *Introduction to Rehabilitation Engineering*, Chapter 18. Boca Raton, FL: Taylor & Francis.',
          '[3] International Organization for Standardization. *ISO 10328:2016 — Prosthetics: Structural testing of lower-limb prostheses — Requirements and test methods*. Geneva: ISO, 2016.',
          '[4] OpenStax College Physics. "Forces and Torques in Muscles and Joints." BCcampus Open Textbooks.',
          '[5] Physiopedia. "Biomechanics in Prosthetic Rehabilitation."',
          '[6] Winter, D. A. *Biomechanics and Motor Control of Human Movement*, 4th ed. Hoboken, NJ: Wiley, 2009.',
          '[7] ASM International. *ASM Handbook, Volume 2: Properties and Selection — Nonferrous Alloys and Special-Purpose Materials*. Materials Park, OH: ASM International.',
          '[8] International Organization for Standardization. *ISO 22675 — Prosthetics: Testing of ankle-foot devices and foot units — Requirements and test methods*. Geneva: ISO.']:
    p=P(r,size=9.2,after=3,justify=False)
    p.paragraph_format.left_indent=Inches(0.32); p.paragraph_format.first_line_indent=Inches(-0.32)

doc.save('Module_04_Assignment_Transtibial_Prosthesis.docx'); print('saved')
