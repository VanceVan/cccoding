// M8A2 shared content — PDF and any later DOCX build render from this.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const TITLE = 'Test and Assessment Approach — Peritoneal Dialysis Remote Patient Monitoring (PD-RPM)';

// ---------------------------------------------------------------- diagram ---
// id, title, l1, l2, tag, x, y, w, h
const LEFT = [
  ['D0', 'Stakeholder needs and CONOPS', 'ON-1 to ON-5', 'design reference missions', '', 18, 50, 150, 58],
  ['D1', 'Operational requirements', 'OR-1 to OR-5', 'six key performance parameters', '', 46, 120, 150, 58],
  ['D2', 'System requirements', 'A-spec', 'IR, SR and DR sets (Module 7)', '', 74, 190, 150, 58],
  ['D3', 'Component design', 'B-spec per configuration item', '', '', 102, 260, 150, 58],
];

const RIGHT = [
  ['L5', 'Operational validation', 'Stage S8 · gate G8', 'intended users, intended environment',
   'Demonstration · Scenario A and B', 392, 50, 150, 58],
  ['L4', 'System verification', 'Stages S6–S7 · gates G6–G7', 'full system, all interfaces live',
   'Test, Demonstration · Scenario A and B', 364, 120, 150, 58],
  ['L3', 'Subsystem and integration test', 'Stages S4–S5 · gates G4–G5', 'platform and transport',
   'Test, Analysis · Scenario A', 336, 190, 150, 58],
  ['L2', 'Component test', 'Stages S1–S3 · gates G1–G3', 'home segment assemblies',
   'Test, Inspection · Scenario A', 308, 260, 150, 58],
];

const LINK = [
  [168, 392, 79, 'validated by'],
  [196, 364, 149, 'verified by'],
  [224, 336, 219, 'verified by'],
  [252, 308, 289, 'verified by'],
];

const DNOTES = [
  'Left leg defines, right leg tests. Each horizontal pair is a test obligation: nothing on the left',
  'is accepted until the level facing it on the right has passed.',
  'L1 unit test sits inside implementation at the vertex and is the entry bar for every stage.',
  'L2 to L4 are verification — evidence against specified requirements. L5 alone is validation —',
  'evidence that the system in use meets stakeholder needs, with intended users, at home.',
  'Scenario A (nominal path) is run at every level, growing in fidelity. Scenario B (exceptional',
  'path) is a total-system fault injection and runs only at L4 and L5.',
  'Stage and gate identifiers refer to the M8A1 integration plan.',
];

const bx = ([id, title, l1, l2, tag, x, y, w, h], dbl) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff" stroke="#1a1a1a"
        stroke-width="${dbl ? 1.6 : 0.8}"/>
  ${dbl ? `<rect x="${x + 3}" y="${y + 17}" width="${w - 6}" height="${h - 20}" fill="none"
        stroke="#1a1a1a" stroke-width="0.5"/>` : ''}
  <rect x="${x}" y="${y}" width="${w}" height="14" fill="#e8e8e8" stroke="#1a1a1a"
        stroke-width="0.8"/>
  <text x="${x + 4}" y="${y + 10.4}" font-size="8" font-weight="bold">${esc(id)}</text>
  <text x="${x + 21}" y="${y + 10.4}" font-size="7.3">${esc(title)}</text>
  <text x="${x + 4}" y="${y + 26}" font-size="6.8">${esc(l1)}</text>
  ${l2 ? `<text x="${x + 4}" y="${y + 36}" font-size="6.8" fill="#333">${esc(l2)}</text>` : ''}
  ${tag ? `<text x="${x + w - 4}" y="${y + h - 5}" font-size="6.2" fill="#555"
        text-anchor="end">${esc(tag)}</text>` : ''}`;

const SVG = `<svg viewBox="0 0 560 520" width="86%"
  xmlns="http://www.w3.org/2000/svg" font-family="Arial, Helvetica, sans-serif">
<defs><marker id="b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5"
  orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" fill="#1a1a1a"/></marker></defs>

<text x="18" y="34" font-size="9" font-weight="bold">DEFINITION</text>
<text x="542" y="34" font-size="9" font-weight="bold" text-anchor="end">TEST AND ASSESSMENT</text>

${LEFT.map((b) => bx(b, false)).join('\n')}
${RIGHT.map((b) => bx(b, b[0] === 'L5')).join('\n')}

${LINK.map(([x1, x2, y, lab]) => `
  <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#1a1a1a" stroke-width="0.7"
        stroke-dasharray="3 2.5" marker-end="url(#b)"/>
  <text x="${(x1 + x2) / 2}" y="${y - 3.5}" font-size="6.4" fill="#333"
        text-anchor="middle">${esc(lab)}</text>`).join('\n')}

<rect x="190" y="330" width="180" height="48" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/>
<rect x="190" y="330" width="180" height="14" fill="#e8e8e8" stroke="#1a1a1a" stroke-width="0.8"/>
<text x="194" y="340.4" font-size="8" font-weight="bold">L1</text>
<text x="208" y="340.4" font-size="7.3">Implementation and unit test</text>
<text x="194" y="356" font-size="6.8">Code, firmware and hardware build</text>
<text x="366" y="373" font-size="6.2" fill="#555" text-anchor="end">Inspection, Test</text>
<line x1="177" y1="318" x2="228" y2="330" stroke="#1a1a1a" stroke-width="0.9"/>
<line x1="332" y1="330" x2="383" y2="318" stroke="#1a1a1a" stroke-width="0.9"
      marker-end="url(#b)"/>

<rect x="18" y="398" width="344" height="100" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
<rect x="18" y="398" width="344" height="13" fill="#e8e8e8" stroke="#1a1a1a" stroke-width="0.8"/>
<text x="22" y="408" font-size="7.4" font-weight="bold">NOTES</text>
${DNOTES.map((n, i) => `<text x="22" y="${422 + i * 9.2}" font-size="6.4">${esc(n)}</text>`).join('\n')}

<rect x="372" y="398" width="170" height="100" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
<rect x="372" y="398" width="170" height="13" fill="#e8e8e8" stroke="#1a1a1a" stroke-width="0.8"/>
<text x="376" y="408" font-size="7.4" font-weight="bold">FIGURE 1</text>
<text x="376" y="424" font-size="6.8">PD-RPM Test and Assessment</text>
<text x="376" y="434" font-size="6.8">V-Model with Scenario Coverage</text>
<text x="376" y="450" font-size="6.8">V. Vanvolkenburgh</text>
<text x="376" y="460" font-size="6.8">655.662 · Module 8 · M8A2</text>
<text x="376" y="470" font-size="6.8">Rev. A · Sheet 1 of 1</text>
</svg>`;

// ------------------------------------------------------------------ prose ---
const P1 =
  'The approach is organized on two axes. **By level**, testing is incremental: the same obligation is ' +
  'retested at five rising levels, each with more of the real system present. **By path**, the module’s ' +
  'own definition of integration demands that execution be checked on **all nominal and exceptional ' +
  'paths**, so two scenarios are carried end to end — one of each.';

const P2 =
  'Scenario A is the nominal path and is run at every level, growing in fidelity from a unit test on one ' +
  'function to a clinical pilot. Scenario B is the exceptional path and exists only as a total-system ' +
  'test, because the failure it reproduces cannot be staged in any smaller piece of the system.';

const P3 =
  'Both scenarios are assessed twice over: for **functionality**, meaning the system does what the ' +
  'specification says, and for **utility**, meaning a care team is measurably better off. A system can ' +
  'pass every functional test and still be useless, so the two are scored separately.';

const LVL = [
  ['L1', 'Unit', 'One function or module in isolation', 'Vertex of Figure 1 — entry bar for every stage',
   'Verification'],
  ['L2', 'Component', 'A configuration item against its B-spec', 'Stages S1–S3, gates G1–G3',
   'Verification'],
  ['L3', 'Subsystem', 'Platform services and the transport link', 'Stages S4–S5, gates G4–G5',
   'Verification'],
  ['L4', 'System', 'Every element integrated, all interfaces live', 'Stages S6–S7, gates G6–G7',
   'Verification'],
  ['L5', 'Operational', 'Intended users in the intended environment', 'Stage S8, gate G8',
   'Validation'],
];

const METH = [
  ['Inspection', 'Physical and visual examination',
   'Confirming the HG-1 diagnostic port and labeling match the B-spec'],
  ['Analysis', 'Mathematical models, simulation, algorithms, calculation',
   'Reliability block diagram showing the alerting path meets Aₒ ≥ 0.98'],
  ['Demonstration', 'Observing qualitative results of an operation',
   'A nurse working a triage queue end to end during the pilot'],
  ['Test', 'Test procedures under specified conditions, results analyzed',
   'Fault injection on the carrier link with record counts reconciled'],
];

const COV = [
  ['Requirement coverage', 'Every OR, KPP and Module 7 requirement appears in the verification ' +
   'cross-reference matrix with one owning test at one named level. Target 100 percent.'],
  ['Interface coverage', 'All 17 interfaces I-1 to I-17 are exercised at least once at L4.'],
  ['Path coverage', 'Nominal and exceptional paths both carried end to end — Scenarios A and B.'],
  ['Data coverage', 'Each bounded value tested at its limit and one step beyond: 500-record buffer, ' +
   '72-hour retention, 150 records per minute, 15-minute alert latency.'],
];

const SCA = [
  ['L1', 'AE-1 trend function alone',
   '14 synthetic sessions, 22 percent decline against the 30-day mean',
   'Flag set; both means computed to within 0.1 percent of the reference', 'Test'],
  ['L2', 'AE-1 joined to DS-1',
   'Records persisted through the production API', 'Flag raised within 10 minutes of persistence',
   'Test'],
  ['L3', 'Monitoring platform (S4)',
   'Injector replays 60 recorded patient-months', 'No more than one non-actionable alert per ' +
   'patient-month across the whole replay', 'Test, Analysis'],
  ['L4', 'Full system, cycler simulator at the home end',
   '14 consecutive sessions compressed into one night',
   'Flag reaches the CW-1 triage queue and the EH-1 summary within 15 minutes', 'Test'],
  ['L5', 'Clinical pilot, real patients',
   'Naturally occurring decline during the 60-day pilot',
   'Nurse opens the flagged patient, documents an action, nephrologist reviews before the next ' +
   'scheduled visit', 'Demonstration'],
];

const SCB = [
  ['1', 'Establish baseline', 'Full system live, 20 patients, 7 nights nominal',
   'Every session ingested; no open alerts'],
  ['2', 'Inject the fault', 'Mains removed from HG-1 at 21:00 for 8 hours on 3 consecutive Sundays',
   'HG-1 transfers to battery and notifies DM-1 within 60 seconds'],
  ['3', 'Observe during outage', 'Sessions continue while the uplink is down',
   'Carrier link declared unavailable after 3 failed attempts in 5 minutes; all sessions buffered'],
  ['4', 'Detect the silence', 'No data arrives from a patient who should be reporting nightly',
   'A device-silent alert reaches the monitoring queue within 2 hours of the first missed session'],
  ['5', 'Restore', 'Mains returned', 'Every buffered record delivered in chronological order within ' +
   '30 minutes; zero lost, zero duplicated'],
  ['6', 'Assess', 'Review with nurse, firmware lead and carrier engineer',
   'The care team learned of the gap from the system, not from the patient'],
];

const SCB_WHY =
  'Scenario B is not invented. It reproduces the phantom Sunday outage the Module 6 team-learning review ' +
  'uncovered, where eleven patients went silent for three consecutive Sunday nights and no team held ' +
  'enough evidence to see it. The decisive step is **step 4**: an alert on the *absence* of data. ' +
  'Nothing in the original failure detected that, and no test built only from the nominal path ever ' +
  'would.';

const FU = [
  ['A — declining ultrafiltration trend',
   'Is the 20 percent decline detected and delivered inside the 15-minute budget?',
   'Does the nurse act on it, and does the nephrologist change the prescription before the next ' +
   'scheduled visit?'],
  ['B — silent gateway across three nights',
   'Is every buffered record recovered in order, with no loss and no duplication?',
   'Does the care team learn of the gap from the system rather than from the patient?'],
];

const RISKC = [
  ['R-1 silent gateway (M5A2)',
   'Scenario B is the direct test of it, including the data-absence alert that did not exist before.'],
  ['False alerts exhausting the nurses',
   'Scenario A at L3 bounds the non-actionable alert rate across 60 patient-months before any ' +
   'clinician sees the system.'],
  ['External interfaces unavailable for test',
   'Scenario A runs at L1–L4 against a cycler simulator and the EHR vendor sandbox, so neither ' +
   'external party gates the test program.'],
  ['Late defects are expensive',
   'The same scenario repeats at every level, so a regression is caught at the lowest level that ' +
   'can expose it.'],
];

const AGILE =
  'Both scenarios are automated once they first pass, and then run as nightly regression for the rest ' +
  'of the program. That is what makes the incremental approach affordable: each increment re-runs the ' +
  'full scenario set overnight, and a failure is attributable to the increment that introduced it rather ' +
  'than hunted for at the end. Scenario A is re-run unchanged at every level, so the cost of re-testing ' +
  'falls as confidence rises.';

const CLOSE =
  'Coverage is honest about its limits. Two scenarios do not test a system; they demonstrate that the ' +
  'approach reaches end to end on both the nominal and the exceptional path. Everything else is covered ' +
  'by the per-gate tests in the integration plan and by the verification cross-reference matrix, which ' +
  'is the artifact that proves no requirement is left without an owning test. The pilot at L5 is the ' +
  'only point at which PD-RPM claims to work rather than to have been built as specified.';

module.exports = { esc, TITLE, SVG, P1, P2, P3, LVL, METH, COV, SCA, SCB, SCB_WHY,
                   FU, RISKC, AGILE, CLOSE };
