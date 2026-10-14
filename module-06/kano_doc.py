# -*- coding: utf-8 -*-
exec(open('common.py').read())
from docx.enum.text import WD_ALIGN_PARAGRAPH
doc=newdoc(margin=0.9); P,H,TABLE,FIG=mk(doc); C=WD_ALIGN_PARAGRAPH.CENTER

H('Module 6 Kano Diagram Assignment',14,before=0)
P('585.617 Rehabilitation Engineering  |  [Your Name]  |  [Date]',size=10,align=C,after=10,justify=False)

H('Product and Customer Definition',11.5,before=4)
P('The product considered is a **pressure-injury prevention system for a hospital or long-term-care bed** — a '
  'support surface integrated with skin and tissue monitoring. Following the assignment guidance, the customer is '
  'treated as **all three stakeholders**: the patient who lies on the surface, the nurse who operates and documents '
  'it, and the physician who is accountable for the outcome. Several requirements below are satisfying to one '
  'stakeholder and invisible to another, which is itself a reason the Kano categories differ by audience.')
P('**A note on where the Unspokens sit.** Dieter’s Figure 3.5 draws three curves and an indifferent region, while '
  'the four-level breakdown names Expecters, Spokens, Unspokens and Exciters. Unspokens are plotted here on a '
  'dashed curve just below the threshold/basic curve because they produce the *same satisfaction response* as '
  'basics — their absence causes dissatisfaction and their presence earns no credit — but they differ in how they '
  'are elicited. A nurse will not ask for shear management at the cover layer; they will only report that patients '
  '"keep sliding down the bed." Unspokens are therefore found by observation and product dissection rather than by '
  'interview or survey, which is exactly the distinction the module lecture draws.')

FIG('kano_diagram.png',6.4,'**Figure 1.** Kano diagram in the format of Dieter Fig. 3.5, with requirements placed on the curve matching their satisfaction response. Dashed arrows link the same feature at a low-investment and a high-investment level of implementation (E4a→E4b, X1a→X1b).')

H('Requirement Listing',11.5)
TABLE(['ID','Requirement','Customer','Why it sits where it does'],
[['**E1**','Redistributes interface pressure at the sacrum and heels below the tissue-damage threshold','Patient, physician','The entire reason the product exists. Absent, the product is worthless; present, nobody praises it.'],
 ['**E2**','Cover is fluid-resistant, cleanable and disinfectable to facility infection-control protocol','Nurse','A surface that cannot be cleaned between patients cannot be used at all. Pure threshold.'],
 ['**E3**','Rapid CPR deflate with a clearly marked manual override','Nurse, physician','Safety basics are invisible until the one moment they are needed, then their absence is catastrophic.'],
 ['**E4a**','Supports the standard adult weight range without bottoming out','All','Basic capability at minimum implementation — meets the threshold and no more.'],
 ['**E4b**','Supports the full bariatric range with the same immersion performance','All','Same feature, higher investment. Still a basic — it saturates rather than delights, which is why E4b sits further right on the *same* curve.'],
 ['**S1**','Measured peak interface pressure (mmHg) at the sacrum','Physician','Classic one-dimensional attribute: lower is better, continuously, and clinicians ask for the number.'],
 ['**S2**','Pump noise at the bedside (dB at 1 m)','Patient, nurse','Patients and night staff complain about it explicitly; every decibel removed adds satisfaction.'],
 ['**S3**','Setup and transfer time (minutes from delivery to patient on surface)','Nurse','Directly requested, linearly valued — time is the currency of a nursing shift.'],
 ['**S4**','Battery autonomy during intra-hospital transport (hours)','Nurse','Spoken, and more is straightforwardly better up to the length of a transport.'],
 ['**U1**','Microclimate control — skin temperature and humidity at the support interface','Patient','Nobody requests it, but moisture and heat drive maceration and lower the tissue tolerance to deformation. Absence shows up as a wound, not a complaint.'],
 ['**U2**','Shear and friction management in the cover and slip layers','Patient, nurse','Shear is a primary etiological contributor yet is never named by users, who instead report that patients slide down the bed.'],
 ['**U3**','Low false-alarm rate on any monitoring function','Nurse','Never specified in advance; if violated it produces alarm fatigue and the feature is switched off, which is a silent product failure.'],
 ['**U4**','Preserves the patient’s own ability to shift position','Patient','An over-immobilising surface removes the micro-movements patients make for themselves. Articulated by nobody, felt by everybody.'],
 ['**X1a**','Early tissue-damage detection — handheld spot-check at the sacrum and heels','Nurse, physician','A delighter at low investment: it reveals damage before it is visible, but requires staff to remember to scan.'],
 ['**X1b**','Early tissue-damage detection — continuous embedded sensing with per-patient trending','Nurse, physician','Same feature fully implemented. Removes the compliance dependency entirely, so it sits far right on the exciter curve.'],
 ['**X2**','Detection performance independent of patient skin tone','Patient, physician','Visual assessment systematically under-detects early injury in darkly pigmented skin. A measurement that does not depend on seeing colour change is a genuine differentiator.'],
 ['**X3**','Automated lateral turn assist that repositions without manual lifting','Patient, nurse','Removes the single most injury-prone task from the nursing workload. Unexpected, and delightful when present.'],
 ['**X4**','Repositioning interval set by measured tissue response rather than a fixed two-hour clock','Physician','Replaces a convention of unclear evidentiary basis with a per-patient measurement. Nobody asks for it because nobody believes it is possible.'],
 ['**I1**','Choice of cover colour','—','Indifferent: implementing it well or badly moves satisfaction essentially not at all. Included to complete the Dieter format.']],
 [0.45,2.05,0.85,3.35])

H('On Levels of Implementation',11.5)
P('Two requirements are shown at two investment levels, as the assignment invites. **E4a→E4b** stays on the basic '
  'curve: extending weight capacity is expensive but it never becomes a delighter, because capacity is something a '
  'buyer assumes rather than admires — the extra investment buys the right to be considered, not enthusiasm. '
  '**X1a→X1b** behaves differently: a handheld spot-check device already surprises clinicians, but it inherits the '
  'compliance problem of anything that must be remembered. Making the same function continuous and automatic moves '
  'it far to the right on the exciter curve, where the satisfaction return on additional investment is steepest. '
  'The contrast is the practical lesson of the diagram: **the same incremental dollar buys very different '
  'satisfaction depending on which curve the feature lives on**, and a programme that spends its margin perfecting '
  'basics while leaving exciters at minimum implementation will produce a product that offends nobody and '
  'attracts nobody.')
doc.save('Module_06_Kano_Diagram_Assignment.docx'); print('saved kano')
