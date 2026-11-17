module.exports = {
  sub: 'Module 10 | M10A2: Problem Set 18.2',
  title: 'Problem 18.2 — Why Production and Acceptance Test Knowledge Protects the Schedule',
  blocks: [
['p', 'Problem 18.2 asks why a systems engineer working on a manufactured system must understand factory ' +
  'production and acceptance test, and for two examples showing what that knowledge buys in on-time ' +
  'delivery. The underlying reason is simple: **a design decision made without knowing what the factory ' +
  'can build and what the line can test becomes a schedule problem months later, at the point where ' +
  'schedule is least recoverable.** Both examples below are drawn from PD-RPM’s home gateway, HG-1, ' +
  'the one element the program manufactures in volume.'],

['h2', 'Example 1 — Designing a function the line cannot test'],
['table', { widths: [24, 76], boldFirst: true,
  head: ['', 'Example 1: cellular radio test access'],
  rows: [
  ['The design decision', 'HG-1 carries a cellular radio module that must meet IR-2, the store-and-forward requirement, and OR8, the mutually authenticated encrypted path. The engineer specifies both and moves on.'],
  ['What the factory actually does', 'The contract manufacturer’s standard acceptance test is an in-circuit bed-of-nails fixture. It verifies continuity, power rails and component presence electrically. It does not transmit. The line has no shielded enclosure and no RF coupler.'],
  ['What happens without the knowledge', 'The radio is never exercised at rated power on any unit. The gap is found at First Article Inspection, when the first production units are checked against the drawing package before full rate begins.'],
  ['The cost in schedule', 'Adding RF test access after the board is laid out is a respin: new layout, new fabrication, new assembly, new first article. Eight to ten weeks, landing between the Pilot Production Readiness Review and the Manufacturing Readiness Review, which is exactly when there is no float left.'],
  ['What the knowledge changes', 'An engineer who knows the fixture’s coverage places an RF coupler pad and a firmware test mode on the board **during layout**, and writes the acceptance test requirement so every unit transmits at rated power into a known load. The cost during design is one pad and one firmware branch.'],
]}],

['h2', 'Example 2 — Producing units that cannot be released'],
['table', { widths: [24, 76], boldFirst: true,
  head: ['', 'Example 2: per-unit records and line provisioning'],
  rows: [
  ['The design decision', 'Each gateway needs a unique identity and certificate to satisfy OR8 and to let DM-1 manage it in the field. The engineer treats provisioning as a software concern and specifies it in the firmware.'],
  ['What the factory actually does', 'Provisioning happens on the line, not at a developer’s bench. It needs a secure station holding key material, a serial number bound to each unit, and an acceptance test record retained per unit as device history.'],
  ['What happens without the knowledge', 'The pilot lot is built and passes functional test, but the units carry no bound serial number and the test results are not retained per unit. There is no device history record, so the lot cannot be released even though every unit works.'],
  ['The cost in schedule', 'The hold surfaces at the Manufacturing Readiness Review, where release evidence is assembled. Recovering it means re-provisioning the lot and reconstructing records that were never captured, and the regulatory package slips with it. Rework of documentation is slower than rework of hardware because the evidence has to be created, not corrected.'],
  ['What the knowledge changes', 'An engineer who knows that acceptance test data is regulatory evidence specifies the fixture to log serial-linked results from the first pilot unit, and treats the provisioning station as a production item with its own lead time. Nothing is reconstructed later because nothing was missed.'],
]}],

['h2', 'What a systems engineer actually has to know'],
['p', 'Both examples trace to the same six areas. None of them requires the engineer to be a ' +
  'manufacturing engineer; each requires knowing enough to ask the right question before the design ' +
  'is frozen.'],
['table', { widths: [26, 36, 38], boldFirst: true,
  head: ['Knowledge area', 'The question it lets you ask', 'The delay it prevents'],
  rows: [
  ['Line and fixture capability', 'What can the acceptance test actually exercise on every unit?',
   'A board respin to add test access, found at first article.'],
  ['Batch and cure steps', 'Which process steps run overnight rather than inline?',
   'A build schedule planned at takt time that is wrong by the cure cycle on every lot.'],
  ['First article and lot acceptance', 'When is the design first checked against the drawing package?',
   'Discovering a drawing-to-build mismatch after tooling is cut rather than before.'],
  ['Yield and rework loops', 'What yield does this tolerance give at rate, and what happens to the failures?',
   'A marginal design that passes pilot and then consumes the schedule in rework at full rate.'],
  ['Records and traceability', 'What evidence must exist per unit for the lot to be released?',
   'Working units held at the Manufacturing Readiness Review for want of a device history record.'],
  ['Production equipment lead time', 'What has to be bought or built before the first unit can be made?',
   'A provisioning station or test fixture ordered too late to support the pilot build.'],
]}],
['p', 'The phasing makes the asymmetry concrete. Material procurement and production engineering sit ' +
  'before low rate production, and low rate sits before full production. A question asked during ' +
  'production engineering costs a conversation. The same question asked after low rate has begun costs ' +
  'a tool, a respin, or a lot.'],

['h2', 'What the two examples have in common'],
['p', 'Neither failure is a design error. In both cases the gateway works exactly as specified. What ' +
  'fails is the **match between the design and the production system that has to build and prove it**, ' +
  'and that match is invisible from the engineering bench. Both are caught cheaply at Critical Design ' +
  'Review and expensively at First Article or Manufacturing Readiness Review, which is the asymmetry ' +
  'that makes the knowledge worth having.'],
['p', 'This is also why the producibility guidelines put **teamwork with manufacturing personnel** among ' +
  'them, and why concurrent engineering seats a contract manufacturer process engineer in design reviews ' +
  'from CDR rather than from the Pilot Production Readiness Review. The engineer does not need to be a ' +
  'manufacturing engineer. They need to know enough to ask two questions before the design is frozen: ' +
  '**can you build this at rate, and can you prove on every unit that it works.**'],
]};
