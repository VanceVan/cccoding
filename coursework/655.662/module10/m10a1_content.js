module.exports = {
  sub: 'Module 10 | M10A1: Problem Set 18.1',
  title: 'Problem 18.1 — Make or Buy Criteria for PD-RPM',
  blocks: [
['p', 'Problem 18.1 asks which criteria decide whether a subsystem is produced in-house or procured ' +
  'outside. For PD-RPM the answer is not one decision but twenty, taken element by element against the ' +
  'M5A1 physical architecture. What follows is the criteria set, the resulting allocation, and the one ' +
  'element where the decision is genuinely contested.'],

['h2', '1. The criteria, and which way each one pushes'],
['table', { widths: [20, 42, 38], boldFirst: true,
  head: ['Criterion', 'What it asks of a candidate element', 'Which way it pushes for a monitoring system'],
  rows: [
  ['Core competence', 'Does this element carry the clinical claim, or is it a commodity beneath it?',
   'Make. Trend detection and alerting are the product; a cuff is not.'],
  ['Regulatory burden', 'Does an existing clearance cover this element, and do we inherit it?',
   'Buy, hard. An FDA-cleared blood pressure monitor brings its clearance; building one means acquiring it.'],
  ['Technical expertise', 'Do we hold the skills, and will we still hold them in five years?',
   'Buy for RF and silicon. Make for clinical algorithms and platform software.'],
  ['Manufacturability', 'Can the item be produced at our volume without inventing a process?',
   'Buy. Guideline 8 of the producibility set: design to the production method economical at the quantity forecast.'],
  ['Unit cost against NRE', 'Does the volume amortize tooling and non-recurring engineering?',
   'Buy at pilot volumes. A few thousand gateways cannot amortize a custom radio design.'],
  ['Supplier reliability and supply continuity', 'Second source, end-of-life notice, lead time',
   'Make, or buy only where a second source exists. A sole-sourced module is a single point of program failure.'],
  ['IP protection', 'Does the element encode something a competitor could copy?',
   'Make. The alert rules and the trend algorithm stay inside.'],
  ['Risk and control of change', 'Who controls the configuration once production starts?',
   'Make where the change rate is high. Firmware changes monthly; an enclosure does not.'],
  ['Quality assurance reach', 'Can we audit the supplier’s process, or only inspect their output?',
   'Buy only where incoming inspection can actually detect a defect that matters.'],
  ['Scalability', 'Does the choice still hold at ten times the fleet?',
   'Buy for anything whose cost is linear in units; make for anything whose cost is fixed.'],
]}],

['h2', '2. The resulting allocation across the PD-RPM architecture'],
['table', { widths: [26, 13, 61], boldFirst: true,
  head: ['Element', 'Decision', 'Governing criterion'],
  rows: [
  ['BP-1 blood pressure monitor, SC-1 weight scale', 'Buy',
   'Regulatory burden. Both are cleared devices with Bluetooth profiles. Building either means becoming a device manufacturer in a category we add no value to.'],
  ['PT-1 patient tablet hardware', 'Buy', 'Commodity with no clinical claim; unit cost and supply continuity both favor commercial hardware.'],
  ['PT-1 patient application', 'Make', 'Core competence and IP. The 60-second interaction budget and the usability file are ours to defend.'],
  ['HG-1 home gateway', 'Mixed', 'The contested case. Treated in section 3.'],
  ['CN-1 carrier network, IN-1 public internet', 'Buy (service)', 'Outside the boundary by the M2A2 decision; not a make-or-buy question but a contracting one.'],
  ['EG-1 through RE-1, the monitoring platform', 'Make', 'Core competence and IP. These implement the clinical claim and change most often.'],
  ['DS-1 data store', 'Buy (managed service)', 'Technical expertise and scalability. Operating a compliant time-series store is not a differentiator.'],
  ['IM-1 identity and access management', 'Buy', 'Quality assurance reach. A commercial identity provider is audited continuously; ours would not be.'],
  ['EI-1 EHR integration service', 'Make, on a bought engine', 'The HL7 and FHIR engine is commodity; the mapping to our own data model is not.'],
]}],

['h2', '3. The contested element: the home gateway'],
['p', 'HG-1 is the only element where the criteria disagree, which is what makes it the real worked ' +
  'example. Three options were considered.'],
['table', { widths: [24, 38, 38], boldFirst: true,
  head: ['Option', 'Argument for', 'Argument against'],
  rows: [
  ['Buy a white-label RPM gateway outright',
   'No NRE, no tooling, fastest to market, supplier carries the radio certification.',
   'We inherit their firmware release cycle and their end-of-life date, and DR-5 modularity becomes unenforceable. Change control passes to a vendor.'],
  ['Build everything including the radio',
   'Total control of configuration, no sole-source exposure.',
   'Fails on technical expertise, unit cost and manufacturability at once. RF design and certification are a program of their own at a volume that cannot amortize them.'],
  ['**Buy the certified radio module, make the firmware, contract-manufacture the rest**',
   'Certification rides on the module. Firmware, where the change rate is highest, stays ours. DR-5 keeps the module replaceable against a carrier sunset.',
   'Costs more per unit than a soldered radio, and adds a supplier relationship to manage.'],
]}],
['p', 'The third option is selected. It splits the decision along the line the criteria actually draw: ' +
  '**buy what carries a certification, make what carries the clinical claim, and contract out what is ' +
  'simply assembly**. It also preserves the re-trade trigger recorded in the M4A2 cellular gateway trade ' +
  'study, which named carrier sunset as the condition that reopens the choice.'],

['h2', '4. What this says about the criteria themselves'],
['p', 'For a regulated monitoring system the criteria do not carry equal weight. **Regulatory burden and ' +
  'supply continuity dominate unit cost**, which inverts the ordering that applies to most products. A ' +
  'cleared sensor bought at a premium is cheaper than an uncleared one built at cost, because the ' +
  'difference is a submission and a year. Everything else follows a single standing rule: if an element ' +
  'carries the clinical claim or changes often, make it; if it carries somebody else’s clearance, buy ' +
  'it; if it is only assembly, contract it out and keep the configuration.'],
]};
