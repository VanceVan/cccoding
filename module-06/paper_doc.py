# -*- coding: utf-8 -*-
exec(open('common.py').read())
from docx.enum.text import WD_ALIGN_PARAGRAPH
doc=newdoc(margin=1.0, size=11.0); P,H,TABLE,FIG=mk(doc); C=WD_ALIGN_PARAGRAPH.CENTER

H('Pressure Injuries: Aetiology and the State of the Art in Detection, Prevention and Treatment',13.5,before=0)
P('585.617 Rehabilitation Engineering  |  Module 6 Research Paper  |  [Your Name]  |  [Date]',size=10,align=C,after=11,justify=False)

H('I.  Introduction',12)
P('A pressure injury, still widely called a bedsore or pressure ulcer, is localised damage to skin and underlying '
  'soft tissue, usually over a bony prominence or beneath a medical device. The populations affected share one '
  'characteristic: an inability to relieve their own loading. These include older adults with reduced mobility, '
  'intensive-care and surgical patients, nursing-home residents, people with spinal cord injury, and full-time '
  'wheelchair users. The burden is large and concentrated. A Markov simulation of United States hospital-acquired '
  'pressure injuries estimated a national cost near $26.8 billion annually, approximately $10,708 per affected '
  'patient, with Stage III and IV full-thickness wounds accounting for roughly 58% of that total despite being a '
  'minority of cases [1].')
P('Why they arise has been substantially rewritten in the last two decades. The classical account was ischaemic: '
  'sustained pressure occludes capillary flow, tissue is starved, and necrosis follows. Contemporary consensus '
  'reverses the ordering. Gefen and colleagues describe a damage cascade in which **sustained mechanical '
  'deformation of cells is the primary insult**, inflammatory and oedema damage is secondary, and ischaemia is '
  'tertiary [2]. Cell death can begin within minutes of high deformation even when oxygen and glucose supply are '
  'normal, although hours of loading may pass before anything is clinically visible. The same review distinguishes '
  'superficial damage, driven mainly by shear, from deep injury, which arises from high pressure combined with '
  'shear over bony prominences or under stiff devices [2]. Deep tissue injury therefore initiates subcutaneously '
  'and propagates outward, so by the time it is visible at the skin, irreversible damage has already occurred.')
P('**That last fact organises this review.** The field’s reference standard — a visible change in the skin — is a '
  'lagging indicator of a mechanical event that happened earlier and deeper. Detection, prevention trials and '
  'staging all inherit that lag, and much of what follows is best understood as the clinical and engineering '
  'consequences of measuring an effect rather than its cause.')

H('II.  Detection Methods',12)
P('Standard practice remains visual and tactile skin assessment combined with a risk-stratification instrument '
  'such as the Braden Scale, with injuries then staged by depth according to international guideline criteria [3]. '
  'The approach is cheap, requires no equipment, and has two structural weaknesses.')
P('The first is timing. Non-blanchable erythema, the Stage 1 criterion, is by definition a surface observation, and '
  'for deep tissue injury the subcutaneous damage precedes it [2]. Assessment thus reliably identifies injuries at '
  'the point where prevention has already failed. The second is equity. Erythema and blanching response are colour '
  'phenomena, and both are substantially harder to observe in darkly pigmented skin; Stage 1 and deep tissue '
  'injuries are consequently under-detected and present later in patients with darker skin tones. Guideline '
  'recommendations to compare the site against adjacent skin and to palpate for temperature and firmness are '
  'partial mitigations for what is fundamentally a limitation of the measurand [3].')
P('Sub-epidermal moisture (SEM) measurement is the most clinically mature alternative. The technique measures '
  'biocapacitance changes caused by localised oedema beneath intact skin. In a blinded, prospective, multi-site '
  'study of 182 patients across twelve acute and post-acute sites, SEM changes preceded a visually diagnosed '
  'pressure injury by a mean of 4.7 ± 2.4 days, with sensitivity of 87.5% but specificity of only 32.9% [4]. That '
  'specificity invites misreading. The comparator is a lagging standard, so a patient flagged by SEM who never '
  'develops a visible ulcer is scored as a false positive even when the flag was correct and prompted the '
  'intervention that prevented the wound; the authors note this confounding directly [4]. From an engineering '
  'standpoint the relevant claim is not diagnostic accuracy against visual assessment but lead time, and roughly '
  'five days of it is substantial. SEM also measures a tissue property rather than a colour, which in principle '
  'makes it independent of skin tone — an equity argument as much as a technical one. Thermography, ultrasound and '
  'interface pressure mapping are investigated on similar logic, with less clinical evidence behind them.')

H('III.  Prevention Methods',12)
P('Prevention rests on three pillars: redistributing load, managing the skin microclimate, and maintaining '
  'nutrition and tissue tolerance [3]. The striking feature of the evidence base is how little of it is certain.')
P('Manual repositioning, conventionally on a two-hourly schedule, is the oldest intervention and is examined in a '
  'Cochrane review of repositioning frequency and body position that was unable to establish the superiority of '
  'any particular regimen [5]. Support surfaces fare similarly: a Cochrane review of surfaces for prevention found '
  'the comparison between higher-specification constant-low-pressure and alternating-pressure surfaces unclear, '
  'although specialised foam outperformed the standard hospital mattress [6]. A later review restricted to '
  'alternating-pressure (active) air surfaces pooled four trials with 2,247 participants and reported a risk ratio '
  'of 0.63 (95% CI 0.34 to 1.17) against foam — a point estimate suggesting benefit, a confidence interval '
  'including no effect, and low-certainty evidence [7]. Prophylactic dressings and topical agents are similarly '
  'inconclusive as to which, if any, is most effective [8].')
P('It would be wrong to read this as evidence that prevention does not work; it is better read as evidence that '
  'the trials are heterogeneous, underpowered, and measuring the wrong endpoint. When the outcome is a visible '
  'ulcer, every trial is waiting for a late, relatively rare event, which is precisely the design that produces '
  'wide confidence intervals. A measurable subclinical endpoint of the kind SEM provides would let prevention '
  'trials detect differences long before a wound forms, and this methodological argument may matter more than any '
  'individual device comparison.')

H('IV.  Treatment Methods',12)
P('Once an injury forms, treatment is staged. Superficial injuries are managed by offloading, moisture balance and '
  'protective dressings; full-thickness wounds additionally require debridement of devitalised tissue, infection '
  'control, nutritional support and, for many Stage III and IV wounds, surgical flap closure [3]. Negative-pressure '
  'wound therapy is widely used as an adjunct for deep cavity wounds.')
P('Electrical stimulation is the adjunct with the most rehabilitation-specific evidence, and it illustrates the '
  'state of the literature well. A Cochrane review of electrical stimulation for treating pressure ulcers assessed '
  'the available trials and found the certainty of evidence limited [9]. A meta-analysis restricted to people with '
  'spinal cord injury concluded that stimulation appears to be an effective adjunct for accelerating closure, but '
  'the outcome measures across trials were so heterogeneous that the results could not be pooled into a single '
  'estimate [10]. A note of caution on the literature itself is warranted: a 2024 review of the reliability of '
  'evidence supporting electrical stimulation in this indication has since been retracted, which is a reminder '
  'that in a field with small trials and commercial interest, source quality must be assessed and not assumed.')
P('What is not in doubt is the asymmetry of cost. Stage III and IV wounds consume the majority of the national '
  'expenditure [1], heal slowly when they heal, and recur. Treatment is the expensive failure mode of prevention, '
  'which is the strongest available argument for investing upstream.')

H('V.  Discussion and Conclusion',12)
P('Read together, the four bodies of literature tell a single story. The aetiology has been re-established on '
  'mechanical rather than vascular foundations, with deformation primary and ischaemia tertiary [2]. Detection has '
  'not followed: routine practice still keys on a visible skin change that occurs after irreversible subcutaneous '
  'damage and that is systematically harder to observe in darkly pigmented skin [3], [4]. Prevention has '
  'accumulated decades of devices but mostly low-certainty evidence, in large part because trials are powered '
  'against that same late endpoint [5]–[8]. Treatment is costly, slow and incompletely evidenced [1], [9], [10].')
P('Three implications follow for anyone designing in this space. First, **measure the precursor, not the '
  'consequence**: a device that senses tissue change days before the skin does is not an incremental improvement '
  'on visual assessment but a different measurement entirely, and it should be evaluated on lead time rather than '
  'on agreement with a lagging standard. Second, **design against all three damage contributors**. A support '
  'surface that redistributes interface pressure addresses deformation magnitude alone; it does not address shear, '
  'which drives superficial damage, nor microclimate, which lowers the deformation a tissue can tolerate. A '
  'product specified only in millimetres of mercury is specified against one third of the mechanism. Third, '
  '**treat skin-tone independence as a requirement rather than a feature**. If a detection method’s performance '
  'depends on observing colour change, its accuracy varies with the patient’s skin, and a measurement that is '
  'physically independent of pigmentation removes a documented disparity by construction.')
P('The problem is therefore less a gap in treatment than a gap in observation. The most useful contribution an '
  'engineer can make is not another mattress but a reliable, inexpensive and unbiased way to see the injury while '
  'it is still preventable — which would, in turn, finally give prevention research an endpoint worth measuring.')

H('References',12,before=12)
refs=[
 '[1] W. V. Padula and B. A. Delarmente, "The national cost of hospital-acquired pressure injuries in the United States," *International Wound Journal*, vol. 16, no. 3, pp. 634–640, 2019.',
 '[2] A. Gefen, D. M. Brienza, J. Cuddigan, E. Haesler, and J. Kottner, "Our contemporary understanding of the aetiology of pressure ulcers/pressure injuries," *International Wound Journal*, vol. 19, no. 3, pp. 692–704, 2022.',
 '[3] European Pressure Ulcer Advisory Panel, National Pressure Injury Advisory Panel, and Pan Pacific Pressure Injury Alliance, *Prevention and Treatment of Pressure Ulcers/Injuries: Clinical Practice Guideline*, 3rd ed., E. Haesler, Ed. EPUAP/NPIAP/PPPIA, 2019.',
 '[4] H. Okonkwo, R. Bryant, J. Milne, D. Molyneaux, J. Sanders, G. Cunningham, et al., "A blinded clinical study using a subepidermal moisture biocapacitance measurement device for early detection of pressure injuries," *Wound Repair and Regeneration*, vol. 28, no. 3, pp. 364–374, 2020.',
 '[5] B. M. Gillespie et al., "Repositioning for pressure injury prevention in adults," *Cochrane Database of Systematic Reviews*, no. 6, Art. no. CD009958, 2020.',
 '[6] E. McInnes et al., "Support surfaces for pressure ulcer prevention," *Cochrane Database of Systematic Reviews*, no. 9, Art. no. CD001735, 2015.',
 '[7] C. Shi et al., "Alternating pressure (active) air surfaces for preventing pressure ulcers," *Cochrane Database of Systematic Reviews*, no. 5, Art. no. CD013620, 2021.',
 '[8] Z. E. H. Moore and J. Webster, "Dressings and topical agents for preventing pressure ulcers," *Cochrane Database of Systematic Reviews*, no. 12, Art. no. CD009362, 2018.',
 '[9] M. Arora et al., "Electrical stimulation for treating pressure ulcers," *Cochrane Database of Systematic Reviews*, no. 1, Art. no. CD012196, 2020.',
 '[10] D. Lala et al., "Electrical stimulation therapy for the treatment of pressure ulcers in individuals with spinal cord injury: A systematic review and meta-analysis," *International Wound Journal*, vol. 13, no. 6, pp. 1214–1226, 2016.',
]
for r in refs:
    p=P(r,size=10,after=6,justify=False)
    p.paragraph_format.left_indent=Inches(0.35); p.paragraph_format.first_line_indent=Inches(-0.35)
doc.save('Module_06_Research_Paper_Pressure_Injuries.docx'); print('saved paper')
