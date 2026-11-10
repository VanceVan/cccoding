// M9A1 shared content. PDF and DOCX builders both render from this.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const TITLE = 'Ten Critical Items for Production Transition — PD-RPM';

const INTRO =
  'PD-RPM manufactures very little: one home gateway, a patient tablet, and two commercial ' +
  'peripherals. The ten items below are ordered the way the transition actually runs, from design ' +
  'decisions that must be settled before Critical Design Review, through the fixtures and artifacts ' +
  'that make production repeatable, to the reviews that release it. Each item names what it requires ' +
  'of PD-RPM specifically and the risk it removes.';

// n, title, concept, text
const ITEMS = [
  [1, 'Minimize part count and fasteners in the gateway enclosure', 'DFA principle',
   'HG-1 is the only item PD-RPM builds in volume. Every screw removed is an assembly step, a torque ' +
   'specification and a failure mode removed. Target a two-piece shell with the board retained by ' +
   'molded bosses rather than fasteners.'],

  [2, 'Build the gateway around a base part, assembled top-down', 'DFA principle',
   'Locate the main board, the radio module and the battery onto a single base so each part drops ' +
   'vertically into place. Top-down assembly eliminates reorientation of the unit on the line, which ' +
   'is the DFA principle with the largest effect on cycle time.'],

  [3, 'Select materials and processes for the home environment, not the lab', 'DFM consideration',
   'Design requirement DR-2 fixes the envelope: IP32, 10 to 35 degrees Celsius, 10 to 85 percent ' +
   'humidity, convection cooled with no moving parts, no more than 30 dBA. Material and process ' +
   'selection must deliver that enclosure without a fan, and must be confirmed before CDR.'],

  [4, 'Match every process to the feature it produces, and invent none', 'DFM consideration',
   'If a geometry demands a process the contract manufacturer does not already run, cost and schedule ' +
   'rise sharply and the return on investment collapses. Any feature that forces a new process is a ' +
   'redesign candidate, not a tooling request.'],

  [5, 'Treat material, process and geometry as one decision rather than three',
   'Producibility interdependency',
   'A wall thickness chosen for stiffness constrains the molding process, which constrains the ' +
   'material, which changes the thermal behavior the enclosure needs for convection cooling. The ' +
   'three are mutually constraining, and fixing any one in isolation guarantees rework.'],

  [6, 'Design for the contract manufacturer’s automated assembly and functional test', 'Automation',
   'Automation has limits as well as capabilities. Connector placement, fiducials, test-pad access and ' +
   'panelization must suit the line that will actually build the unit, and the design documentation ' +
   'must reach the level of detail the automation requires.'],

  [7, 'Design, build, verify and install the manufacturing test fixtures at the CM',
   'Production artifact',
   'Every unit must prove its radio, its device interfaces, its battery charge path and its diagnostic ' +
   'port before it leaves the line. The fixture is a developed item in its own right, with hardware, ' +
   'software and a verification step, and it is accepted at the contract manufacturer rather than at ' +
   'the developer’s bench.'],

  [8, 'Produce the four manufacturing plans', 'Production artifact',
   'The Manufacturing Test Plan, Manufacturing Test Verification Plan, Manufacturing Readiness Test ' +
   'Plan and Manufacturing Work Plan are what make the transition auditable. Each answers one ' +
   'question: what is tested, how the test is proven, what readiness means, and who does the work.'],

  [9, 'Hold the staged reviews in order, each against entry evidence', 'Technical review',
   'Critical Design Review, then Pilot Production Readiness Review, then Manufacturing Readiness ' +
   'Review. Early planning is what lowers risk here, so each review opens against defined entry ' +
   'evidence rather than a calendar date, and none may be waived to protect a schedule.'],

  [10, 'Transition the firmware and platform software, not only the hardware', 'Software transition',
   'Provisioning identities, certificates and the initial firmware image happens on the production ' +
   'line. The release gated into production needs a reproducible build, an SBOM in SPDX or CycloneDX ' +
   'form, and the IEC 62304 documentation set required by software requirement SR-5.'],
];

const GATE_LEAD =
  'The same ten items, cut a second way. Objective three of this module is the team and review ' +
  'activity that lowers risk, and that is answered by naming who owns each item and which review ' +
  'closes it against what evidence. An item with no named owner and no closing review is not a ' +
  'transition activity, it is an intention.';

// n, lead, support, review, evidence
const GATE = [
  [1, 'Engineering', 'Production', 'CDR', 'Enclosure part and fastener count, with the assembly step count it implies'],
  [2, 'Engineering', 'Production', 'CDR', 'Assembly sequence drawing showing a single insertion axis'],
  [3, 'Engineering', 'Clinical, Production', 'CDR', 'Material and process selection record traced to DR-2, including the no-fan thermal case'],
  [4, 'Production', 'Engineering', 'CDR', 'Process capability statement from the contract manufacturer, with any new process flagged'],
  [5, 'Engineering', 'Production', 'CDR', 'Producibility analysis fixing material, process and geometry as one set'],
  [6, 'Production', 'Engineering', 'PPRR', 'Line capability assessment and the design documentation package the automation needs'],
  [7, 'Production', 'Engineering, Logistics', 'PPRR', 'Fixture verification record at the CM, plus the manufacturing test manual'],
  [8, 'Administration', 'Production, Logistics', 'PPRR', 'MTP, MTVP, MRTP and MWP approved, with packaging design coordinated'],
  [9, 'Administration', 'All five functions', 'MRR', 'Entry and exit records for each review, and the pilot production build result'],
  [10, 'Engineering', 'Administration, Logistics', 'MRR', 'Reproducible build, SBOM, IEC 62304 set, and the line provisioning procedure'],
];

const WHO =
  '**Who executes them.** None of these belongs to engineering alone. Concurrent engineering puts ' +
  'Engineering, Clinical, Logistics, Production and Administration on one team from CDR onward, which ' +
  'is what allows manufacturability and cost trade-offs to be evaluated at the same time as technical ' +
  'feasibility rather than after it. The three predictable obstacles are diverse perspectives, silo ' +
  'mentality and vague goals; the countermeasures are a shared common language, cross-functional ' +
  'training, and goals written as SMART criteria with KPIs. The manufacturing team is trained before ' +
  'the pilot build, not during it.';

const WEIGHT =
  '**Where the weight actually sits.** Items 1 to 6 are real but bounded, because PD-RPM’s ' +
  'mechanical content is a single enclosure. The producibility risk concentrates in items 7 to 10, ' +
  'which is where a software-intensive medical device is most likely to fail transition: a fixture ' +
  'that does not catch a marginal radio, a firmware image that cannot be rebuilt, a regulatory test ' +
  'package still incomplete at the Manufacturing Readiness Review. Producibility also has to stay ' +
  'balanced against the other qualities the design already commits to, notably operational ' +
  'availability of 0.98 and the 24-hour ride-through, neither of which may be traded away for ' +
  'assembly cost.';

module.exports = { esc, TITLE, INTRO, ITEMS, GATE_LEAD, GATE, WHO, WEIGHT };
