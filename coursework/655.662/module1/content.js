// Single source of truth for M1A1 so the .docx and .pdf can never diverge.

module.exports = {
  author: 'Vance Vanvolkenburgh',
  course: '655.662 — Introduction to Healthcare Systems Engineering',
  assignment: 'Module 1 | M1A1: Systems Viewpoint',
  title: 'How Is the Systems Engineering Viewpoint Different from My Current Working View?',

  sections: [
    {
      heading: 'My Current Working Viewpoint',
      body:
        'My current working view is a hybrid of two roles, and neither is clinical. As team leader on a biomedical engineering ' +
        'design team building a minimally invasive bladder stone removal device, I think in terms of an artifact: geometry, ' +
        'material selection, force transmission, bench performance, and whether the prototype can be carried through patent ' +
        'filing toward a commercial path. As a strategy and M&A analyst — at Stanford Medicine, at the NATO Centre of Excellence ' +
        'for Military Medicine, and at Churchill Capital — I think in terms of a decision: gather evidence, run a root cause ' +
        'analysis, and converge on a recommendation a stakeholder can act on inside a defined engagement window. Both lenses are ' +
        'productive, and both are narrower than they feel from the inside. The device lens optimizes a part. The analyst lens ' +
        'optimizes an answer. Systems engineering optimizes neither. It optimizes the capability that emerges when parts and ' +
        'answers are assembled into something that must function in a real environment, over a long life, for people whose ' +
        'incentives do not align.',
    },
    {
      heading: 'What Counts as “the System”',
      body:
        'Kossiakoff’s definition — a set of interrelated components working together toward some common objective — reframes my ' +
        'device work immediately. The bladder stone device is not the system. It is one component of a system that also includes ' +
        'the urologist’s technique, the cystoscope it must interface with, the operating room’s sterilization and reprocessing ' +
        'loop, the training a first-time user receives, the disposal pathway for single-use elements, the reimbursement code that ' +
        'determines whether a hospital will buy it, and the patient’s post-operative course. My team has been optimizing the black ' +
        'box while treating everything outside it as someone else’s problem. The context diagram introduced in this module enforces ' +
        'the opposite discipline: define the boundary first, enumerate everything that crosses it — inputs, outputs, infrastructure, ' +
        'personnel, laws and regulations — and only then design inside. Those externalities do not disappear because we deferred ' +
        'them. They arrive late, when accommodating them costs the most.',
    },
    {
      heading: 'Needs First, Not Solutions First',
      body:
        'The sharpest difference is sequencing. Montoya’s warning that healthcare’s characteristic failure is to meet a problem and ' +
        'immediately buy the device or the widget describes much of what analytical work rewards. My NATO engagement asked me to ' +
        'identify and prioritize five AI-enabled solutions for forward medical support operations. The deliverable was denominated ' +
        'in solution units from the outset. The systems engineering method inverts that order: identify operational needs in ' +
        'contested environments, translate those needs into quantified requirements, decompose the requirements into the activities ' +
        'a capability must perform, and only then allocate physical solutions — hardware, software, or a person in the loop — against ' +
        'those activities. “Deploy AI-assisted triage” is a solution wearing the costume of a need. “Sort N casualties by ' +
        'survivability within M minutes, at a stated accuracy, without reliable communications reachback” is a requirement, and a ' +
        'requirement can be verified. The second formulation would have made my recommendations testable rather than merely persuasive.',
    },
    {
      heading: 'How Long the System Lives',
      body:
        'My working view is bounded by engagements: a ten-week externship, a semester design cycle, the interval between deal ' +
        'announcement and close. The systems engineering lifecycle is bounded instead by the system’s existence. INCOSE’s six stages ' +
        '— concept, development, production, utilization, support, and retirement — place most of a system’s life after the point at ' +
        'which my current work would already have declared victory. For the bladder stone device, “prototype to market” is my present ' +
        'end state; in lifecycle terms, market entry is roughly where utilization begins. The questions that actually determine whether ' +
        'the device helps anyone — integrated logistics support, maintenance, obsolescence of a supplier’s component, and eventual ' +
        'retirement and disposal — sit entirely downstream of my horizon. Kossiakoff makes the same argument in fewer words: ' +
        'post-development is a stage, not an afterthought.',
    },
    {
      heading: 'Whose Viewpoint Counts',
      body:
        'I have handled stakeholder plurality intuitively — iterating with NATO representatives through feedback sessions, presenting ' +
        'cross-functionally to Stanford Medicine stakeholders — but intuition is not method. The blind-men-and-the-elephant image from ' +
        'this module makes an epistemic claim, not a claim about manners: the surgeon, the sterile processing technician, the biomedical ' +
        'equipment technician, the hospital’s value analysis committee, and the patient each describe a real part of the same object, and ' +
        'none of them is wrong. Senge’s “I am my position” explains why the fragmentation persists, since each stakeholder’s incentives are ' +
        'local and rational. Pronovost makes the same observation at industry scale when he argues that American health systems have bought ' +
        'or built the parts without aligning them around a goal — precisely a system failing the definition of a system. My current view ' +
        'treats conflicting stakeholder input as noise to be reconciled near the end of a project. Systems engineering treats it as the ' +
        'primary source of requirements, elicited at the beginning.',
    },
    {
      heading: 'What “Done” Means',
      body:
        'A consulting engagement ends when the deck is delivered; a design sprint ends when the prototype performs on the bench. Systems ' +
        'engineering accepts neither as closure. The method terminates in verification and validation — did we build the thing right, and ' +
        'did we build the right thing — with traceability running from each verified result back to the originating need. The INCOSE handbook ' +
        'argues that this traceability is much of the value systems engineering delivers in government and defense contexts, which bears ' +
        'directly on the NATO work: a recommendation carrying an audit trail from operational need to requirement to test outcome survives ' +
        'scrutiny in a way that a well-argued slide does not. The same contrast governs how I handle failure. My use of root cause analysis ' +
        'is retrospective — something broke, so I diagnose it. Systems engineering risk management is prospective and runs the length of the ' +
        'lifecycle, asking what could fail and what the mitigation is before anything has.',
    },
    {
      heading: 'What I Intend to Change',
      body:
        'Three shifts follow. First, I will build a context diagram for the bladder stone device before the next design review and treat ' +
        'every flow crossing the boundary as a source of requirements rather than as background environment. Second, I will stop accepting ' +
        'solution-shaped problem statements; when a stakeholder hands me one, I will work backward to the underlying need and write the ' +
        'requirement any candidate solution would have to satisfy. Third, I will extend my horizon past the deliverable, so that for any ' +
        'recommendation I can name who supports it, who maintains it, and how it ends. Senge supplies the constraint on all three: none of ' +
        'this survives contact with an organization unless it can be shared. A systems view held only in my own head is a private mental ' +
        'model, not a capability. Making that model explicit and legible to the clinicians, technicians, and executives who each see a ' +
        'different part of the elephant is what converts the viewpoint from a way of thinking into work an organization will adopt.',
    },
  ],

  references: [
    'INCOSE. (2023). Systems engineering handbook: A guide for system life cycle processes and activities (5th ed.). INCOSE-TP-2003-002-05.',
    'Kossiakoff, A., Biemer, S. M., Seymour, S. J., & Flanigan, D. A. (2020). Systems engineering principles and practice (3rd ed.). Wiley.',
    'Montoya, M. (n.d.). Module 1: Framework, context, and motivation [Course lecture]. 655.662 Introduction to Healthcare Systems Engineering, Johns Hopkins University.',
    'Pronovost, P. (2019). New narratives for health care [Address]. The City Club of Cleveland.',
    'Senge, P. M. (2006). The fifth discipline: The art and practice of the learning organization. Doubleday/Currency.',
  ],
};
