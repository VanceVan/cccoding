// M9A2 shared content. PDF and DOCX builders both render from this.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const TITLE = 'Five Areas of Concurrent Engineering — PD-RPM';

const INTRO =
  'Concurrent engineering means putting a decision in front of every function it affects while it is ' +
  'still cheap to change. The five areas below are the places in PD-RPM where that actually has to ' +
  'happen. Each names who is at the table, what is weighed at the same time rather than in sequence, ' +
  'the risk that is retired early, and the record it leaves behind.';

// area, functions, concurrent, risk, docs
const AREAS = [
  ['Gateway enclosure and thermal design',
   'Engineering, Production, Clinical',
   'Whether a sealed IP32 enclosure can cool by convection alone; whether it can be molded in a ' +
   'process the contract manufacturer already runs; what the tool costs at pilot volume.',
   'A fan would breach the 30 dBA bedroom limit in DR-2 and add a wear item, so the thermal case is ' +
   'closed before the tool is cut rather than after. Wall thickness is set once for stiffness, ' +
   'molding and heat path together.',
   'Producibility analysis recording material, process and geometry as one decision; thermal case ' +
   'traced to DR-2.'],

  ['Cellular radio module and its certification',
   'Engineering, Production, Administration, Logistics',
   'LTE-M coverage at the patient’s home; a socketed module against one soldered to the host ' +
   'board; the per-unit cost of making it field-replaceable; FCC and carrier certification lead time.',
   'Certification is the longest pole, so it starts while the board is still in layout. Keeping the ' +
   'module replaceable, per DR-5, means a carrier sunset re-trade does not reopen the enclosure.',
   'The M4A2 trade study, the module interface specification, and the certification test reports.'],

  ['Testability and the manufacturing test fixture',
   'Production, Engineering',
   'What must be proven on every unit; whether a fixture can physically reach it; fixture build cost ' +
   'against the cost of field returns.',
   'Test pads, fiducials and panelization are placed during layout, not negotiated afterwards. A unit ' +
   'that cannot be tested on the line is a unit that gets tested by the patient.',
   'Manufacturing Test Plan and Manufacturing Test Verification Plan; the fixture verification record ' +
   'accepted at the contract manufacturer.'],

  ['Firmware release and line provisioning',
   'Engineering, Administration, Production',
   'Whether a release can be rebuilt and audited; whether the line can flash images and provision ' +
   'identities and certificates at rate; a provisioning station against the cost of a recall.',
   'The IEC 62304 evidence and the SBOM are produced as the software is built rather than assembled ' +
   'in the weeks before the Manufacturing Readiness Review. The release gate and the line process are ' +
   'designed together.',
   'IEC 62304 documentation set, SBOM in SPDX or CycloneDX form, and the line provisioning procedure.'],

  ['Packaging, instructions and home installation',
   'Clinical, Logistics, Engineering, Administration',
   'Whether a patient can install the unit in under 10 minutes without tools; whether the packaging ' +
   'survives single-parcel shipment and can still be packed on the line; shipping and return cost per ' +
   'unit.',
   'Usability validation runs against production-equivalent units in real packaging, so a device that ' +
   'passes factory test but defeats an older patient is found before volume rather than in the field.',
   'Usability engineering file under IEC 62366-1, packaging design and drop-test record, and the ' +
   'instructions for use.'],
];

const CLOSE =
  '**What the concurrency buys.** The timeline condenses because certification, tooling and fixture ' +
  'development run alongside design instead of queueing behind it. Cost falls because the expensive ' +
  'surprises surface while they are still cheap: a recut tool, a failed certification, a recall for an ' +
  'image nobody can rebuild. Risk falls because each area closes a manufacturing question during ' +
  'design rather than at the Manufacturing Readiness Review. And because every area leaves a named ' +
  'record, the trade-offs behind the design are recoverable later instead of reconstructed from memory.';

module.exports = { esc, TITLE, INTRO, AREAS, CLOSE };
