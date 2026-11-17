module.exports = {
  sub: 'Module 10 | M10A3: Problem Set 18.3',
  title: 'Problem 18.3 — Four Configuration Management Areas Critical to the Production Transition',
  blocks: [
['p', 'Problem 18.3 asks for four areas where configuration management is crucial as a system moves from ' +
  'development into production, and why. The transition is where CM stops being an engineering ' +
  'convenience and becomes the mechanism that lets production build the right thing: before it, the ' +
  'design is still moving and the people changing it are the people who wrote it; after it, a contract ' +
  'manufacturer, a regulator and a clinical organization all act on the design, and none of them was in ' +
  'the room. The four areas below map onto four of the five CM functions — identification, change ' +
  'management, status accounting and verification — applied to PD-RPM.'],

['h2', 'Area 1 — Configuration identification: the released product baseline'],
['table', { widths: [22, 78], boldFirst: true, head: ['', ''],
  rows: [
  ['What it covers', 'The exact set of artifacts released to production at Critical Design Review: the B-specs, the hierarchical bill of materials, enclosure and board drawings, the firmware image and its build hash, the acceptance test definition, and the packaging design. Each carries a version and a release date.'],
  ['Why it is crucial here', 'Production builds what the baseline says, not what engineering remembers. Until the transition, "the design" could reasonably live in the heads of the people making it. The moment a contract manufacturer quotes and tools against it, the baseline is the only shared statement of what the product is.'],
  ['What breaks without it', 'The contract manufacturer quotes against one revision and builds against another. For PD-RPM the sharpest case is the firmware: without an image bound to a build hash, nobody can say which software the pilot lot actually shipped with, and SR-5’s reproducible build and SBOM obligations cannot be met.'],
]}],

['h2', 'Area 2 — Change management: control of the design once tooling exists'],
['table', { widths: [22, 78], boldFirst: true, head: ['', ''],
  rows: [
  ['What it covers', 'A change control board with production, regulatory and clinical representation, change classification by impact, and a rule for which changes may proceed without re-opening a review.'],
  ['Why it is crucial here', 'Before the transition a change costs a drawing revision. After it, the same change may cost a cut tool, a re-certification, or a re-flash of a fielded fleet. The cost of change rises by orders of magnitude across this boundary, which is exactly why the authority to approve one has to move at the same point.'],
  ['What breaks without it', 'For PD-RPM, two classes of change are dangerous in different ways. An enclosure change after the tool is cut is expensive but visible. A firmware change is cheap to make and invisible, so it is the one that escapes control: an unreviewed change to validation logic alters clinical behavior without anyone treating it as a design change.'],
]}],

['h2', 'Area 3 — Interface control: the three interfaces the program does not own'],
['table', { widths: [22, 78], boldFirst: true, head: ['', ''],
  rows: [
  ['What it covers', 'Controlled interface documents for every external interface, with named versions and a notification obligation on both parties. PD-RPM has three: the cycler data port, the carrier network under the private APN, and the health system’s HL7 and FHIR interface.'],
  ['Why it is crucial here', 'These interfaces are the only part of the configuration a counterparty can change unilaterally. Internal interfaces are protected by the baseline; external ones are protected only by agreement.'],
  ['What breaks without it', 'A cycler firmware revision that alters the record schema, or an EHR upgrade that changes acceptance semantics, invalidates the acceptance test while every unit still passes it. The failure appears in the field as missing data, which is precisely the condition PD-RPM exists to detect, so it degrades the clinical claim rather than announcing itself.'],
]}],

['h2', 'Area 4 — Status accounting and traceability: requirement to test to unit'],
['table', { widths: [22, 78], boldFirst: true, head: ['', ''],
  rows: [
  ['What it covers', 'A live record of what configuration exists where: the trace from operational requirements and KPPs through the B-specs to the acceptance test that proves each one, and from the acceptance test to the per-unit device history record.'],
  ['Why it is crucial here', 'This is what converts a working unit into a releasable one. It is also what makes a failure diagnosable: without the trace, a failed acceptance test tells you a unit is bad but not which requirement it violates.'],
  ['What breaks without it', 'Units that function cannot be released, because release evidence is assembled at the Manufacturing Readiness Review and cannot be reconstructed afterwards. A recall becomes unbounded for the same reason: without unit-level configuration records there is no way to identify which gateways carry an affected firmware version, so the only safe answer is all of them.'],
]}],

['h2', 'Why these four and not others'],
['p', 'The four are chosen because each one guards a different failure mode at this specific boundary. ' +
  'Identification guards against **building the wrong thing**. Change management guards against **the ' +
  'right thing quietly becoming the wrong thing**. Interface control guards against **somebody else ' +
  'changing it**. Status accounting guards against **being unable to prove which thing you built**. ' +
  'Configuration audit, the fifth CM function, is not a separate area so much as the activity that ' +
  'confirms the other four are actually working, and it is performed at the Manufacturing Readiness ' +
  'Review.'],
['p', 'The common thread is that all four fail silently. None of them produces a defective unit on the ' +
  'line; they produce units that work but cannot be trusted, released, or reproduced. That is why the ' +
  'module calls configuration management the glue of systems engineering, and why the discipline has to ' +
  'be in place **before** the transition rather than imposed after the first problem appears.'],
]};
