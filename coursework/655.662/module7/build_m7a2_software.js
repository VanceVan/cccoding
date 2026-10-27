// M7A2 — Software Requirements for PD-RPM. Five "shall" statements, 1-2 pages.
const fs = require('fs');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*([^*]+)\*/g, '<em>$1</em>');

const TITLE = 'Software Requirements — Peritoneal Dialysis Remote Patient Monitoring (PD-RPM)';

const INTRO =
  'On the course taxonomy PD-RPM is a **software-intensive** system: sensors and communications hardware ' +
  'with more than 40 percent of its capability in software, modeled in SysML and UML. The five ' +
  'requirements below are therefore allocated to named software elements of the M5A1 physical ' +
  'architecture rather than to the system as a whole, and each is written at the level where software ' +
  'requirements are properly identified — detailed design, levels 5 and 6 — not at the top level, which ' +
  'stays implementation-free. Each states a single **shall**, is testable by a named method, and ' +
  'specifies software functionality, a constraint, or a performance criterion.';

// id, title, element, cls
const HDRS = [
  ['SR-1', 'Ultrafiltration trend computation', 'Analytics Engine (AE-1)', 'Functionality'],
  ['SR-2', 'Alert evaluation and suppression', 'Rules and Alert Engine (RE-1)', 'Performance'],
  ['SR-3', 'Payload validation and fault containment', 'Ingest and Normalization (IS-1)', 'Functionality'],
  ['SR-4', 'Access control and audit', 'Identity and Access Management (IM-1)', 'Constraint'],
  ['SR-5', 'Software lifecycle and release gate', 'All PD-RPM software items', 'Constraint'],
];

const REQS = [
  ['SR-1',
   'The Analytics Engine (AE-1) shall compute per-session net ultrafiltration for each of the trailing 14 ' +
   'validated treatment sessions and shall set a declining-trend flag when the 7-day mean falls more than ' +
   '20 percent below the trailing 30-day mean, completing the computation within 10 minutes of a session ' +
   'being persisted to the Data Store (DS-1), suppressing the flag when fewer than 8 of the trailing 14 ' +
   'sessions are present, and producing identical output for identical input.',
   'OR-1, derived from operational need ON-1',
   'Test by replay of 60 recorded patient-months against a reference implementation, including sparse, ' +
   'out-of-order, and duplicate-session cases'],

  ['SR-2',
   'The Rules and Alert Engine (RE-1) shall evaluate the complete active rule set against each newly ' +
   'persisted record within 60 seconds of persistence at a sustained load of 150 records per minute, ' +
   'shall dispatch each resulting critical alert to the Notification Gateway (NG-1) within a further 60 ' +
   'seconds, and shall emit no more than one alert per patient per rule in any rolling 24-hour period.',
   'OR-3; KPP Alert Latency (15 minutes end to end, of which this allocates 2); KPP False Alert Rate ' +
   '(≤ 1 non-actionable alert per patient per month)',
   'Test at 150 records per minute for 4 hours with timestamps captured at RE-1 and NG-1; suppression ' +
   'verified by injecting repeated trigger conditions'],

  ['SR-3',
   'The Ingest and Normalization service (IS-1) shall validate every inbound payload against the schema ' +
   'version declared in that payload’s header, shall convert all masses to kilograms and all volumes to ' +
   'milliliters before persistence, shall route any payload that fails validation or carries a value ' +
   'outside its configured physiological range to a dead-letter queue within 2 seconds of receipt, and ' +
   'shall not discard a payload or substitute a default value for any rejected field.',
   'OR-2; KPP Data Completeness (95 percent of sessions ingested within 24 hours)',
   'Test by schema fuzzing and boundary-value injection at each range limit, with dead-letter queue ' +
   'counts reconciled against the injected fault set'],

  ['SR-4',
   'The Identity and Access Management service (IM-1) shall authenticate every clinician session using ' +
   'multi-factor authentication, shall restrict each authenticated principal to the patient panel assigned ' +
   'to that principal’s role, shall terminate any session idle for more than 15 minutes, and shall write ' +
   'to append-only storage an audit record of every read or write of patient data containing the ' +
   'principal identifier, patient identifier, UTC timestamp, and action performed, retained for not less ' +
   'than 6 years.',
   'OR-4; HIPAA Security Rule access control and audit control standards (45 CFR §164.312)',
   'Test by penetration testing of role boundaries and session expiry, plus reconciliation of the audit ' +
   'log against a scripted access sequence of known length'],

  ['SR-5',
   'All PD-RPM software items shall be developed, maintained, and documented in accordance with IEC 62304 ' +
   'software safety Class B, and each release candidate shall carry a machine-readable software bill of ' +
   'materials in SPDX 2.3 or CycloneDX 1.5 format enumerating every third-party component and its ' +
   'version, and shall carry no unresolved static or dynamic analysis finding scored CVSS 7.0 or higher.',
   'IEC 62304; ANSI/AAMI SW96 and the FDA 2023 premarket cybersecurity guidance, which together convert ' +
   'the software lifecycle process into a Secure Product Development Framework',
   'Inspection of the IEC 62304 documentation set at CDR, and demonstration of the automated SBOM ' +
   'generation and SAST/DAST gate failing a build seeded with a known high-severity component'],
];

const CLOSE1 =
  '**On the Class B claim in SR-5.** IEC 62304 assigns a software safety class by the injury that software ' +
  'failure can contribute to. PD-RPM does not command therapy: the cycler sits outside the system boundary ' +
  'and the nephrologist holds clinical decision authority. A failure here therefore cannot directly injure ' +
  'a patient, but a missed or delayed peritonitis alert can contribute to non-serious or serious injury ' +
  'through delayed treatment, which places the software above Class A and below Class C. Stating the class ' +
  'and the reasoning for it is what makes SR-5 auditable rather than aspirational.';

const CLOSE2 =
  'Two boundaries are deliberate. These requirements say nothing about the interfaces between these ' +
  'elements, which M7A1 covers separately, because the course treats interface definition as its own ' +
  'layer with its own requirements. And none of them states a top-level system behavior: SR-1 through ' +
  'SR-4 are each traceable upward to an operational requirement or KPP from M3A1 that is itself ' +
  'implementation-free, which is the flow-down the module describes. The patient tablet application ' +
  'remains bounded only by OR-3 and the 60-second interaction KPP and has not yet had its software ' +
  'requirements written; that is the next tranche, not an omission from this set.';

const words = [INTRO, ...REQS.map((r) => r[1]), CLOSE1, CLOSE2].join(' ').split(/\s+/).length;

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter portrait; margin: 0.62in 0.8in; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Arial, Helvetica, "Liberation Sans", sans-serif;
         font-size: 10.2pt; margin: 0; color: #000; }
  .hdr { line-height: 1.2; font-size: 10pt; }
  .rule { border-bottom: 0.75pt solid #999; margin: 5pt 0 7pt; }
  h1 { font-size: 11.6pt; margin: 0 0 5pt; }
  p { text-align: left; margin: 0 0 5pt; line-height: 1.28; }
  table.s { width: 100%; border-collapse: collapse; font-size: 8.4pt; margin: 6pt 0 8pt; }
  table.s th, table.s td { border: 0.6pt solid #1a1a1a; padding: 2.2pt 4pt;
       vertical-align: top; line-height: 1.2; }
  table.s th { background: #e8e8e8; text-align: left; }
  .req { border: 0.6pt solid #1a1a1a; margin: 0 0 6pt; page-break-inside: avoid; }
  .req .bar { background: #e8e8e8; border-bottom: 0.6pt solid #1a1a1a;
       padding: 2.6pt 5pt; font-size: 9pt; }
  .req .body { padding: 4pt 5pt 3.5pt; }
  .req .body p.sh { margin: 0 0 3.5pt; line-height: 1.26; }
  .req .body p.mt { margin: 0; font-size: 8.3pt; line-height: 1.26; color: #222; }
  .foot { font-size: 8.6pt; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b><br>
  655.662 — Introduction to Healthcare Systems Engineering<br>
  Module 7 | M7A2: Software Requirements
</div>
<div class="rule"></div>

<h1>${esc(TITLE)}</h1>
<p>${md(INTRO)}</p>

<table class="s">
<tr><th>Req</th><th>Software element (M5A1)</th><th>Requirement class</th><th>What it governs</th></tr>
${HDRS.map(([id, t, el, cls]) =>
  `<tr><td><b>${esc(id)}</b></td><td>${esc(el)}</td><td>${esc(cls)}</td><td>${esc(t)}</td></tr>`).join('\n')}
</table>

${REQS.map(([id, shall, trace, verif]) => {
  const h = HDRS.find((x) => x[0] === id);
  return `<div class="req">
  <div class="bar"><b>${esc(id)} — ${esc(h[1])}</b> &nbsp;·&nbsp; ${esc(h[2])} &nbsp;·&nbsp;
    ${esc(h[3])} requirement</div>
  <div class="body">
    <p class="sh">${esc(shall)}</p>
    <p class="mt"><b>Allocated from:</b> ${esc(trace)}<br>
       <b>Verification:</b> ${esc(verif)}</p>
  </div>
</div>`;
}).join('\n')}

<p class="foot">${md(CLOSE1)}</p>
<p class="foot">${md(CLOSE2)}</p>
`;

fs.writeFileSync('m7a2.html', html);
console.log('html written —', words, 'words');
