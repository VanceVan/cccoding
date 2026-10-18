# -*- coding: utf-8 -*-
exec(open('common.py').read())
from docx.enum.text import WD_ALIGN_PARAGRAPH
doc=newdoc(margin=1.0, size=11.0)
doc.styles['Normal'].paragraph_format.space_after=Pt(5)
P,H,TABLE,FIG=mk(doc); C=WD_ALIGN_PARAGRAPH.CENTER

H('M6A1: Problem Set — Kossiakoff Chapter 13, Problem 13.2',13,before=0)
P('EN.655.662 Introduction to Healthcare Systems Engineering  |  [Your Name]  |  [Date]',size=10,align=C,after=8,justify=False)
P('*Problem 13.2 — What specific activities in the advanced development phase sometimes cause it to be referred to '
  'as a "risk reduction" phase? Give an example of each activity considering a real or hypothetical system.*',
  size=10,after=8)
P('**System used for the examples:** the remote cardiac care system — an implanted or worn cardiac device, a '
  'patient-home desk transceiver, a cellular transport link, a clinical computer stack, and a clinician-facing '
  'clinical station.',size=10,after=9)

P('Advanced development sits between concept definition and engineering design. Concept definition ends with a '
  'chosen concept; engineering design begins an expensive and largely irreversible commitment to a particular '
  'physical realization. Advanced development is the last interval in which the organization can still change its '
  'mind cheaply, and its product is therefore not a design but **evidence**. Seven activities produce that '
  'evidence, and each retires a distinct class of uncertainty. Together they are why the phase is called risk '
  'reduction.')

H('1.  Requirements Analysis and Flow-Down',11.5,before=8)
P('Operational requirements are decomposed into system and subsystem requirements that are measurable, verifiable '
  'and traced to the functions they serve. This retires **requirements risk** — the failure mode in which a '
  'requirement proves ambiguous or untestable only after a design has been built to satisfy it. *Example:* the '
  'operational requirement that the transponder have "a minimum communications range of 40 ft" is not directly '
  'testable as written. Flowing it down against the Set Up Cardiac Comms function yields requirements that are: '
  'power-up in no more than 5 s, an activation force of no more than 1 N, and power confirmation by a 55 dB, 2 Hz, '
  '200 ms audio chirp. The ambiguity is removed before anyone builds to it.')

H('2.  Technology Identification and Maturation',11.5,before=8)
P('Each element is assessed for maturity, conventionally by technology readiness level, and the immature elements '
  'are matured deliberately. This retires **technology risk** and, just as importantly, tells the programme where '
  'to spend. *Example:* the remote cardiac system is not uniformly mature. The clinical computer stack and the '
  'cellular transport are effectively commercial off-the-shelf at TRL-9; the desk transceiver and the clinical '
  'station sit near TRL-7; end-to-end operation with a live cardiac device and a patient is the least mature at '
  'roughly TRL-6. The assessment shows that risk is concentrated in the integration, not in any individual box, '
  'and redirects the prototyping budget accordingly.')

H('3.  Prototyping',11.5,before=8)
P('Prototypes are built to answer questions rather than to be the product — explorative prototypes surface '
  'requirements with users, experimental prototypes test whether the planned system will be adequate, and '
  'evolutionary prototypes are refined into the delivered system. This retires **feasibility and usability risk**. '
  '*Example:* a field prototype of the desk transceiver and its cellular link — a radio, an antenna and a data '
  'logger, with no enclosure — placed in a sample of real patient homes. It answers a question no amount of '
  'analysis can: whether coverage holds in a basement bedroom or a steel-framed building. Keeping it low fidelity '
  'matters, because a polished prototype consumes schedule and can quietly anchor the eventual design to its '
  'particular form.')

H('4.  Modeling, Simulation and Analysis',11.5,before=8)
P('Where a prototype is premature or expensive, an explicit model bounds behaviour analytically and supports early, '
  'iterative verification rather than deferring all of it downstream. This retires **performance risk**. '
  '*Example:* a link-budget and queueing model of the cellular transport, evaluated against the requirement that '
  'the data rate be twice that of the cardiac device. The model establishes that average throughput and latency '
  'satisfy the requirement comfortably — and, read honestly, also establishes what it cannot address, namely '
  'intermittent dropout in a specific home. That boundary is what justifies activity 3, and the pairing shows why '
  'modeling and prototyping are complements rather than substitutes.')

H('5.  Trade Studies',11.5,before=8)
P('Alternatives are identified and compared against measures of feasibility, performance, cost, schedule and risk, '
  'with the estimates drawn from modeling, prototyping or surrogates. This retires **selection risk**, the '
  'commitment to an architecture that turns out to be a dead end. *Example:* the transport architecture is not '
  'settled by assumption. Cellular, a home broadband gateway, and a Bluetooth link relayed through the patient’s '
  'smartphone are scored against coverage in the target population, recurring cost per patient, patient burden at '
  'setup, and dependence on equipment the patient owns and may replace. The smartphone option is cheapest and '
  'fails worst on an elderly cohort — a conclusion worth reaching on paper rather than after a fielded pilot.')

H('6.  Interface Definition and Developmental Test Planning',11.5,before=8)
P('Interfaces between elements are specified, and the test and evaluation master plan, test equipment and test '
  'software are developed. This retires **integration risk**, which dominates in a distributed system, and '
  '**verification risk**, the late discovery that a requirement cannot be tested as written. *Example:* the '
  'integration is sequenced so that each step introduces exactly one new unknown — confirm the desk transceiver '
  'alone; isolate the clinical computer stack; isolate the clinical station; combine station and stack; add the '
  'cellular link for a partial end-to-end test; run end-to-end without the cardiac device; then with it; then with '
  'a patient. When a test fails, the cause is unambiguous, because only one thing changed.')

H('7.  Baselining the Validated System Specification',11.5,before=8)
P('The phase exits by baselining a system specification that has been demonstrated to be achievable, so that '
  'engineering design proceeds against a stable target. This retires **baseline risk**. *Example:* the dropout '
  'behaviour discovered in activity 3 is resolved before baselining, by adding a store-and-forward buffer to the '
  'desk transceiver with a defined retention window and reconnection behaviour, and flowing the corresponding '
  'requirement down into the specification.')

H('Why These Activities Make It a "Risk Reduction" Phase',11.5,before=8)
P('Two arguments converge. The first is economic: by the close of advanced development the great majority of total '
  'product cost is already committed even though very little has been spent, so a change made here is cheap and '
  'the identical change made later is not. Had the cellular dropout of activity 3 instead surfaced after '
  'engineering design, the response would have been a hardware respin of a device already in production, a '
  'regulatory change assessment, and a clinical safety case built around the possibility that an arrhythmia event '
  'was never transmitted. The engineering work is much the same; the cost and the patient consequence differ by '
  'orders of magnitude. The second argument is epistemic: every other phase produces an artifact, while this one '
  'produces knowledge. A programme that skips advanced development has not avoided its uncertainty — it has only '
  'moved the discovery of that uncertainty into a phase where acting on it is expensive.')
doc.save('M6A1_Problem_Set_Advanced_Development.docx'); print('saved')
