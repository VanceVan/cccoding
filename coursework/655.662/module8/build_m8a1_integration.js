// M8A1 — Integration Plan for PD-RPM. 3 pages, diagram + plan.
const fs = require('fs');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*([^*]+)\*/g, '<em>$1</em>');

// ------------------------------------------------------------------ diagram --
// id, title, objects, interfaces, gate, hv, x, y, w, h
const BOX = [
  ['S0A', 'Element qualification — home segment',
   'CY-1 simulator, BP-1, SC-1, PT-1, HG-1',
   'Entry bar: every configuration item verified against its B-spec',
   'G0', '', 20, 44, 235, 62],
  ['S1', 'Home sensing cluster',
   'BP-1, SC-1, PT-1 joined to HG-1',
   'Closes I-2, I-3, I-4, I-17', 'G1', 'horizontal', 20, 124, 235, 62],
  ['S2', 'Cycler data interface',
   'CY-1 to HG-1 — simulator first, production cycler second',
   'Closes I-1', 'G2', 'horizontal', 20, 204, 235, 62],
  ['S3', 'Home segment, uplink withheld',
   'S1 + S2 operating as one node',
   'Store-and-forward proven before the network can be blamed',
   'G3', 'vertical', 20, 284, 235, 62],

  ['S0B', 'Element qualification — platform',
   'EG-1, IS-1, DS-1, AE-1, RE-1, NG-1, CW-1, IM-1, DM-1, EI-1',
   'Entry bar: every service verified against its B-spec',
   'G0', '', 285, 44, 235, 62],
  ['S4', 'Monitoring platform',
   'Nine services integrated at one hierarchy level',
   'Closes I-8 to I-12; injector substitutes for the home segment',
   'G4', 'horizontal', 285, 124, 235, 142],

  ['S5', 'Transport link — the two threads converge',
   'HG-1 ↔ CN-1 ↔ IN-1 ↔ EG-1',
   'Closes I-5, I-6, I-7', 'G5', 'vertical', 20, 380, 500, 62],
  ['S6', 'Care-team delivery',
   'CW-1 → CS-1, NG-1 → MD-1, DM-1 → HG-1',
   'Closes I-13, I-14, I-15', 'G6', 'horizontal', 20, 460, 500, 62],
  ['S7', 'EHR exchange',
   'EI-1 ↔ EH-1 — vendor conformance sandbox, then health-system test instance',
   'Closes I-16', 'G7', 'horizontal', 20, 540, 500, 62],
  ['S8', 'Clinical pilot — VALIDATION, not verification',
   'Full system with intended users in the intended environment',
   '20 patients, 60 days, every interface live', 'G8', 'vertical', 20, 620, 500, 62],
];

const NOTES = [
  'Strategy: bottom-up, incremental, criterion-driven. No stage opens until every element it',
  'contains has passed G0, and no stage closes until its exit criteria are met in full.',
  'Threads A and B are built in parallel by separate teams and converge at S5.',
  'G0 through G7 are verification against specified requirements. G8 alone is validation.',
  'A fixed golden record set is replayed at every gate, so a defect first seen at Sn is',
  'attributable to the objects or interfaces added at Sn.',
  'Each gate freezes a configuration baseline before the next stage opens.',
  'Increment 1 = S0–S3 · Increment 2 = S4–S6 · Increment 3 = S7–S8.',
];

const box = ([id, title, objs, ifs, gate, hv, x, y, w, h]) => {
  const dbl = id === 'S8';
  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff" stroke="#1a1a1a"
        stroke-width="${dbl ? 1.6 : 0.8}"/>
  ${dbl ? `<rect x="${x + 3}" y="${y + 3}" width="${w - 6}" height="${h - 6}" fill="none"
        stroke="#1a1a1a" stroke-width="0.5"/>` : ''}
  <rect x="${x}" y="${y}" width="${w}" height="15" fill="#e8e8e8" stroke="#1a1a1a"
        stroke-width="0.8"/>
  <text x="${x + 5}" y="${y + 11}" font-size="9" font-weight="bold">${esc(id)}</text>
  <text x="${x + 27}" y="${y + 11}" font-size="8.4">${esc(title)}</text>
  <text x="${x + w - 4}" y="${y + 11}" font-size="8.4" font-weight="bold"
        text-anchor="end">${esc(gate)}</text>
  <text x="${x + 5}" y="${y + 29}" font-size="7.6">${esc(objs)}</text>
  <text x="${x + 5}" y="${y + 41}" font-size="7.6" fill="#333">${esc(ifs)}</text>
  ${hv ? `<text x="${x + w - 4}" y="${y + h - 5}" font-size="6.8" fill="#555"
        text-anchor="end">${esc(hv)} integration</text>` : ''}`;
};

const arr = (pts) => `<polyline points="${pts}" fill="none" stroke="#1a1a1a"
   stroke-width="0.9" marker-end="url(#a)"/>`;

const SVG = `<svg viewBox="0 0 560 800" width="88%"
  xmlns="http://www.w3.org/2000/svg" font-family="Arial, Helvetica, sans-serif">
<defs><marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5.5"
  markerHeight="5.5" orient="auto-start-reverse">
  <path d="M0,1 L9,5 L0,9 z" fill="#1a1a1a"/></marker></defs>

<text x="20" y="16" font-size="9.5" font-weight="bold">THREAD A — HOME SEGMENT</text>
<text x="285" y="16" font-size="9.5" font-weight="bold">THREAD B — MONITORING PLATFORM</text>
<text x="20" y="372" font-size="9.5" font-weight="bold">CONVERGED SYSTEM THREAD</text>
<line x1="20" y1="22" x2="255" y2="22" stroke="#1a1a1a" stroke-width="0.6"/>
<line x1="285" y1="22" x2="520" y2="22" stroke="#1a1a1a" stroke-width="0.6"/>
<line x1="20" y1="376" x2="520" y2="376" stroke="#1a1a1a" stroke-width="0.6"/>

${BOX.map(box).join('\n')}

${arr('137,106 137,124')}
${arr('137,186 137,204')}
${arr('137,266 137,284')}
${arr('402,106 402,124')}
${arr('137,346 137,362 270,362 270,380')}
${arr('402,266 402,362 270,362 270,380')}
${arr('270,442 270,460')}
${arr('270,522 270,540')}
${arr('270,602 270,620')}

<rect x="20" y="698" width="330" height="90" fill="none" stroke="#1a1a1a"
   stroke-width="0.8"/>
<rect x="20" y="698" width="330" height="13" fill="#e8e8e8" stroke="#1a1a1a"
   stroke-width="0.8"/>
<text x="24" y="708" font-size="7.6" font-weight="bold">NOTES</text>
${NOTES.map((n, i) => `<text x="24" y="${722 + i * 8.4}" font-size="6.6">${esc(n)}</text>`).join('\n')}

<rect x="360" y="698" width="160" height="90" fill="none" stroke="#1a1a1a"
   stroke-width="0.8"/>
<rect x="360" y="698" width="160" height="13" fill="#e8e8e8" stroke="#1a1a1a"
   stroke-width="0.8"/>
<text x="364" y="708" font-size="7.6" font-weight="bold">FIGURE 1</text>
<text x="364" y="726" font-size="7">PD-RPM Integration Build-Up</text>
<text x="364" y="736" font-size="7">and Test Gate Sequence</text>
<text x="364" y="750" font-size="7">V. Vanvolkenburgh</text>
<text x="364" y="760" font-size="7">655.662 · Module 8 · M8A1</text>
<text x="364" y="770" font-size="7">Rev. A · Sheet 1 of 1</text>
</svg>`;

// -------------------------------------------------------------------- prose --
const S1A =
  'PD-RPM is integrated **bottom-up**, in **increments**, behind **criterion-driven** gates. Those ' +
  'are three of the eight techniques the module names, and they are chosen together for one reason: ' +
  'the system’s dominant failure mode is a fault that no single party can localize.';

const S1B =
  'Global (big bang) integration is rejected outright. The risk register’s top entry, R-1 silent ' +
  'gateway, is exactly the class of defect that big bang cannot isolate — a record that never arrives ' +
  'implicates the cycler, the gateway firmware, the carrier, and the ingest service equally. Every ' +
  'stage below therefore adds **one new class of object**, so that a defect appearing at stage *n* is ' +
  'attributable to what stage *n* introduced.';

const S1C =
  'Both **horizontal** and **vertical** integration are used, and Figure 1 labels which is which. ' +
  'S1, S4, S6 and S7 are horizontal: elements at a common hierarchy level joined to each other. S3, ' +
  'S5 and S8 are vertical: a completed level proved consistent with what the level above expects of it.';

const S2 = [
  ['Planning',
   'Objects are taken from the M5A1 physical architecture — 20 elements with identifiers — and the ' +
   'metrics from the M3A1 operational requirements and KPPs. Each object’s verification event is ' +
   'defined before any schedule exists.'],
  ['Scheduling',
   'Objects are ordered into the nine collections of Figure 1. Threads A and B run in parallel because ' +
   'they share no objects until S5, which removes the home-segment team from the platform team’s ' +
   'critical path. S7 is placed late because its date is set by the health system, not by this program.'],
  ['Execution',
   'At each stage the team fixes the physical, functional and behavioral boundary of every object, ' +
   'specifies what passes across it, connects, tests the connection at all three boundary types, then ' +
   'evaluates the activity itself before opening the next gate.'],
];

const GATE = [
  ['Entry', 'Every element in the stage has passed G0 against its B-spec.'],
  ['Entry', 'Every interface in the stage has an approved interface definition. For an external ' +
            'interface this means a signed agreement, not a draft.'],
  ['Entry', 'The test points, surrogates and instrumentation the stage needs are in place.'],
  ['Exit',  'Every interface added in the stage has been exercised on its nominal path **and** its ' +
            'exceptional paths.'],
  ['Exit',  'The golden record set replays with identical results to the prior stage.'],
  ['Exit',  'No defect above severity 2 remains open.'],
  ['Exit',  'The configuration baseline is frozen and recorded before the next stage opens.'],
];

// stage, objects, interfaces, method, exit criterion
const TBL = [
  ['S0', 'All 20 elements, individually', '—', 'Inspection, Test',
   'Each CI meets its B-spec; test points exposed and documented'],
  ['S1', 'BP-1, SC-1, PT-1 → HG-1', 'I-2, I-3, I-4, I-17', 'Test',
   'Every device pairs, reports, and survives a power cycle without data loss'],
  ['S2', 'CY-1 → HG-1', 'I-1', 'Test, Demonstration',
   'All alarm codes parsed from the simulator; three live overnight sessions captured'],
  ['S3', 'Home node, uplink withheld', '— (buffering)', 'Test',
   '72-hour buffer fills and drains in order; nothing discarded or defaulted'],
  ['S4', 'EG-1, IS-1, DS-1, AE-1, RE-1, NG-1, CW-1, IM-1, DM-1', 'I-8 to I-12', 'Test, Analysis',
   'Injected records produce correct trends and alerts at 150 records per minute'],
  ['S5', 'Home thread joined to platform thread', 'I-5, I-6, I-7', 'Test',
   'Records survive injected outages of 1, 24 and 72 hours with counts reconciled'],
  ['S6', 'CS-1, MD-1', 'I-13, I-14, I-15', 'Demonstration',
   'A triggering value reaches a nurse and an on-call phone inside the 15-minute KPP'],
  ['S7', 'EH-1 (external)', 'I-16', 'Test',
   'Every message type passes the vendor sandbox, including withheld acknowledgments'],
  ['S8', 'Patients, care partners, clinicians', 'all', 'Validation',
   'Intended users complete 60 days at home; stakeholder needs ON-1 to ON-5 demonstrated'],
];

const RISK = [
  ['R-1 silent gateway cannot be localized',
   'S3 proves store-and-forward with the uplink physically absent, so buffering is cleared before the ' +
   'carrier exists to blame.'],
  ['External interface commitments may not land',
   'S2 and S7 each open against a surrogate — a cycler simulator, a vendor sandbox — so neither the ' +
   'cycler manufacturer nor the health system sits on the critical path.'],
  ['Integrate-test-correct-integrate-test-correct',
   'The golden record set is replayed at every gate. A regression is attributed to the stage that ' +
   'introduced it rather than re-debugged from scratch.'],
  ['Defects found late cost more than defects found early',
   'G0 refuses any element into integration before unit verification, which is where the module says ' +
   'fault isolation is considerably cheaper.'],
  ['Configuration drift between threads',
   'Each gate freezes a baseline. Threads A and B can only converge at S5 on baselines recorded at ' +
   'G3 and G4.'],
];

const DETECT =
  'Four test points are designed in rather than retrofitted, because the module’s own lesson is ' +
  'that more is better: a diagnostic port on HG-1 exposing buffer depth and link state; a packet ' +
  'capture tap at EG-1; a synthetic record injector at IS-1; and the fleet replay sandbox built for ' +
  'the Module 6 team-learning review, which lets a failure be re-run without a patient.';

const AGILE1 =
  'The plan is incremental on purpose. Increment 1 delivers a home node that buffers, Increment 2 a ' +
  'platform that alerts, Increment 3 the external exchanges and the pilot. Each increment is a ' +
  'build-a-little, test-a-little cycle that ends in something demonstrable.';

const AGILE2 =
  'Three benefits follow. Nurses see a working triage queue at the end of Increment 2, while changing ' +
  'it is still cheap. Each increment boundary is a genuine re-planning point, so a carrier or EHR ' +
  'schedule slip re-orders the remaining work instead of stalling it. And the software elements run ' +
  'continuous integration — daily build, automated regression — inside stages whose hardware ' +
  'integrates at fixed gates, which is the hybrid cadence a software-intensive medical system needs.';

const CLOSE =
  'Verification and validation are kept distinct throughout. G0 to G7 are verification: objective ' +
  'evidence that an element or assembly meets its specified requirements, by inspection, analysis, ' +
  'demonstration or test. G8 is validation: objective evidence that the system in use meets ' +
  'stakeholder needs, with the intended users, in the intended operational environment. The patient ' +
  'is the last thing added, and nothing before G8 claims the system works — only that it is built ' +
  'the way it was specified.';

const words = [S1A, S1B, S1C, ...S2.map((x) => x[1]), DETECT, AGILE1, AGILE2, CLOSE,
  ...RISK.map((r) => r[1])].join(' ').split(/\s+/).length;

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter portrait; margin: 0.62in 0.8in; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Arial, Helvetica, "Liberation Sans", sans-serif;
         font-size: 10.2pt; margin: 0; color: #000; }
  .hdr { line-height: 1.2; font-size: 10pt; }
  .rule { border-bottom: 0.75pt solid #999; margin: 5pt 0 7pt; }
  h1 { font-size: 11.6pt; margin: 0 0 6pt; }
  h2 { font-size: 10.4pt; margin: 7pt 0 3pt; }
  p { text-align: left; margin: 0 0 4.5pt; line-height: 1.23; }
  p.t { margin: 0 0 4pt; }
  table.s { width: 100%; border-collapse: collapse; font-size: 7.6pt; margin: 3.5pt 0 5pt; }
  table.s th, table.s td { border: 0.6pt solid #1a1a1a; padding: 1.8pt 3.6pt;
       vertical-align: top; line-height: 1.16; }
  table.s th { background: #e8e8e8; text-align: left; }
  table.s td:first-child { white-space: nowrap; font-weight: bold; }
  .brk { page-break-before: always; }
  .cap { font-size: 8.4pt; margin: 4pt 0 0; }
  .fig { margin: 0; text-align: center; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b><br>
  655.662 — Introduction to Healthcare Systems Engineering<br>
  Module 8 | M8A1: Integration Plan
</div>
<div class="rule"></div>

<h1>Integration Plan — Peritoneal Dialysis Remote Patient Monitoring (PD-RPM)</h1>

<h2>1. Integration strategy</h2>
<p>${md(S1A)}</p>
<p>${md(S1B)}</p>
<p>${md(S1C)}</p>

<h2>2. Method</h2>
<table class="s">
<tr><th>Step</th><th>How it is applied to PD-RPM</th></tr>
${S2.map(([a, b]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join('\n')}
</table>

<h2>3. The gate rule — what opens and closes a stage</h2>
<p class="t">Every gate in Figure 1 applies the same seven criteria. They are the mechanism by which
the plan prevents error rather than discovering it late.</p>
<table class="s">
<tr><th>Type</th><th>Criterion</th></tr>
${GATE.map(([a, b]) => `<tr><td>${esc(a)}</td><td>${md(b)}</td></tr>`).join('\n')}
</table>

<div class="brk"></div>
<div class="fig">${SVG}</div>
<p class="cap"><b>Figure 1.</b> Integration build-up for PD-RPM. Two threads are built in parallel,
converge at S5, and the patient is added last. Gate G8 is validation; every gate before it is
verification.</p>

<div class="brk"></div>
<h2>4. Stage detail and exit criteria</h2>
<table class="s">
<tr><th>Stage</th><th>Objects added</th><th>Interfaces closed</th><th>V&amp;V method</th>
<th>Exit criterion</th></tr>
${TBL.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('\n')}
</table>

<h2>5. Risk reduction</h2>
<table class="s">
<tr><th>Risk the sequence is designed against</th><th>How the sequence reduces it</th></tr>
${RISK.map(([a, b]) => `<tr><td style="white-space:normal">${esc(a)}</td><td>${esc(b)}</td></tr>`).join('\n')}
</table>

<h2>6. Early error detection</h2>
<p>${md(DETECT)}</p>

<h2>7. Why the plan is agile, and what that buys</h2>
<p>${md(AGILE1)}</p>
<p>${md(AGILE2)}</p>

<h2>8. Verification, validation, and configuration control</h2>
<p>${md(CLOSE)}</p>
`;

fs.writeFileSync('m8a1.html', html);
console.log('html written —', words, 'words');
