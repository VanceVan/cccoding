// M3A1 — Operational needs and requirements for the PD-RPM remote care system.
// Two pages, US Letter portrait, Arial 11pt.
const fs = require('fs');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

const NEEDS = [
  ['ON-1', 'Need for the home dialysis nurse to detect a declining ultrafiltration trend across successive ' +
           'treatments without waiting for the next monthly clinic visit.'],
  ['ON-2', 'Need for the patient and care partner to complete nightly therapy with no additional operational ' +
           'burden beyond running the cycler itself.'],
  ['ON-3', 'Need for the care team to recognize early peritonitis indicators — effluent cloudiness, abdominal ' +
           'pain, fever, exit-site change — within hours of onset rather than at the next scheduled contact.'],
  ['ON-4', 'Need for the nephrologist to evaluate whether a prescription change actually improved volume status, ' +
           'before the next scheduled visit rather than after it.'],
  ['ON-5', 'Need for the home program to anticipate a solution or consumable shortfall for a patient before that ' +
           'patient runs short.'],
];

const REQS = [
  ['OR-1', 'ON-1',
   'The system shall compute per-session net ultrafiltration for each of the trailing 14 treatments and shall ' +
   'flag a declining trend when the 7-day mean falls more than 20 percent below the trailing 30-day mean.'],
  ['OR-2', 'ON-2',
   'The system shall transfer each completed treatment record automatically within 30 minutes of session end, ' +
   'requiring no patient interaction beyond normal cycler operation.'],
  ['OR-3', 'ON-3',
   'The system shall present a structured daily symptom and exit-site check completable in under 60 seconds, ' +
   'and shall route any positive peritonitis screen to the on-call nurse within 15 minutes.'],
  ['OR-4', 'ON-4',
   'The system shall associate each prescription change with the subsequent 14 days of ultrafiltration, weight, ' +
   'and blood-pressure data and present that comparison to the nephrologist in a single view.'],
  ['OR-5', 'ON-5',
   'The system shall project days of supply remaining from observed consumption and shall notify the home ' +
   'program when projected supply for any patient falls below 14 days.'],
];

const KPPS = [
  ['Alert Latency', 'A critical alert shall reach the monitoring nurse within 15 minutes of the triggering data.'],
  ['Operational Availability (Aₒ)', 'The monitoring and alerting path shall maintain Aₒ of at least 0.98.'],
  ['Data Completeness', 'At least 95 percent of completed cycler sessions shall be ingested within 24 hours.'],
  ['Patient Daily Interaction Time', 'Daily patient interaction shall not exceed 60 seconds.'],
  ['Detection Lead Time', 'Median peritonitis flag shall precede patient-initiated contact by at least 24 hours.'],
  ['False Alert Rate', 'Non-actionable alerts shall not exceed one per patient per month.'],
];

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter portrait; margin: 0.85in 1in; }
  body { font-family: Arial, Helvetica, "Liberation Sans", sans-serif;
         font-size: 11pt; margin: 0; color: #000; }
  .hdr { line-height: 1.2; }
  .rule { border-bottom: 0.75pt solid #999; margin: 6pt 0 8pt; }
  h1 { font-size: 11pt; text-align: center; margin: 0 0 8pt; }
  h2 { font-size: 11pt; margin: 9pt 0 2pt; }
  p.intro { text-align: justify; margin: 0 0 4pt; line-height: 2.0; text-indent: 0.3in; }
  .item { text-align: justify; line-height: 2.0; padding-left: 0.55in;
          text-indent: -0.55in; margin: 0; }
  .kpp { line-height: 1.45; padding-left: 0.3in; text-indent: -0.3in; margin: 0 0 2pt;
         font-size: 10.5pt; }
  .trace { font-style: italic; color: #333; }
  .note { font-size: 10pt; font-style: italic; color: #333; line-height: 1.35;
          margin-top: 5pt; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b><br>
  655.662 — Introduction to Healthcare Systems Engineering<br>
  Module 3 | M3A1: Op Needs for RCS
</div>
<div class="rule"></div>

<h1>Operational Needs and Requirements — PD-RPM Remote Care System</h1>

<p class="intro">An operational need states a deficiency from the clinician's or patient's point of view and
names no solution; an operational requirement is the system's measurable answer to that need, written as a
"shall" statement. The needs below are the gaps; each requirement traces to one of them and is stated so that
it can be verified by test rather than by opinion.</p>

<h2>Operational Needs</h2>
${NEEDS.map(([id, t]) => `<p class="item"><b>${esc(id)}</b>&nbsp;&nbsp;${esc(t)}</p>`).join('\n')}

<h2>Operational Requirements</h2>
${REQS.map(([id, tr, t]) =>
  `<p class="item"><b>${esc(id)}</b>&nbsp;&nbsp;${esc(t)} <span class="trace">(satisfies ${esc(tr)})</span></p>`
).join('\n')}

<h2>KPP Candidates</h2>
${KPPS.map(([n, t]) => `<p class="kpp"><b>${esc(n)}</b> — ${esc(t)}</p>`).join('\n')}

<p class="note">Six candidates are proposed, at the upper bound of the five-to-six rule of thumb. Alert Latency,
Operational Availability, and Detection Lead Time measure whether the system delivers its clinical value;
Patient Daily Interaction Time and False Alert Rate protect the two users whose tolerance determines whether
the system is actually used. False Alert Rate is included deliberately: a monitoring system that meets every
other parameter still fails if the nurse stops reading its alerts.</p>
`;

fs.writeFileSync('m3a1.html', html);
const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
console.log('html written —', words, 'words');
