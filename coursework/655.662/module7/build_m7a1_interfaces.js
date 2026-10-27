// M7A1 — Interface Requirements for PD-RPM. Five "shall" statements, 1-2 pages.
const fs = require('fs');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*([^*]+)\*/g, '<em>$1</em>');

const TITLE = 'Interface Requirements — Peritoneal Dialysis Remote Patient Monitoring (PD-RPM)';

const INTRO =
  'The five requirements below are allocated from the operational requirements and key performance ' +
  'parameters established in M3A1 and are written against the physical architecture and interface ' +
  'register of M5A1, so each one names an interface that already exists in the baseline. Each states a ' +
  'single **shall**, is verifiable by a named method, and identifies the interface explicitly: the two ' +
  'elements it joins, which side of the system boundary each sits on, the class of interface, and what ' +
  'crosses it. Three of the five govern interfaces whose far side is **outside** the PD-RPM boundary — ' +
  'the cycler, the carrier network, and the electronic health record — and those are stated as ' +
  'obligations on PD-RPM elements, never on parties the program does not control.';

// id, title, ifid, parties, cls, crossing
const HDRS = [
  ['IR-1', 'Cycler treatment-record acquisition', 'I-1',
   'PD Cycler (CY-1, external) → Home Gateway (HG-1)', 'Physical and data', 'Data'],
  ['IR-2', 'Store-and-forward across the cellular link', 'I-5',
   'Home Gateway (HG-1) ↔ LTE-M Carrier Network (CN-1, external)', 'Data (wireless)', 'Signals, data'],
  ['IR-3', 'Electronic health record exchange', 'I-16',
   'EHR Integration Service (EI-1) ↔ Electronic Health Record (EH-1, external)', 'Data (software)', 'Data'],
  ['IR-4', 'Clinician triage presentation', 'I-13',
   'Clinician Web Application (CW-1) → Clinician Workstation (CS-1)', 'User', 'Data, signals'],
  ['IR-5', 'Home electrical supply and ride-through', 'new (I-17)',
   'Household mains (external) → Home Gateway (HG-1)', 'Physical', 'Energy'],
];

const REQS = [
  ['IR-1',
   'The Home Gateway (HG-1) shall acquire the complete treatment record for each cycler session from the ' +
   'PD Cycler (CY-1) over a USB 2.0 full-speed (12 Mbit/s) Type-B data port within 5 minutes of session ' +
   'end, where a complete record comprises the fill volume, drain volume, dwell time, net ultrafiltration, ' +
   'and alarm codes for every cycle in that session, and shall reject and log any record failing its ' +
   'CRC-16 check without substituting a default value.',
   'OR-2; KPP Data Completeness (95% of sessions ingested within 24 hours)',
   'Test against a cycler simulator across all alarm codes, then demonstration against the production ' +
   'cycler on three consecutive overnight sessions'],

  ['IR-2',
   'The Home Gateway (HG-1) shall retain in non-volatile storage every treatment record, device ' +
   'measurement, and patient entry it has not successfully delivered to the LTE-M Carrier Network (CN-1), ' +
   'holding not fewer than 500 records or 72 hours of accumulated data, whichever is greater, shall ' +
   'declare the link unavailable after 3 consecutive failed transmission attempts within a 5-minute ' +
   'window, and shall deliver all retained items in chronological order within 30 minutes of link ' +
   'restoration.',
   'OR-2; KPP Operational Availability (Aₒ ≥ 0.98); risk R-1 (silent gateway) from M5A2',
   'Test by injected link outages of 1, 24, and 72 hours in an RF-shielded enclosure, with record counts ' +
   'and ordering reconciled at the Edge Gateway (EG-1)'],

  ['IR-3',
   'The EHR Integration Service (EI-1) shall exchange patient data with the Electronic Health Record ' +
   '(EH-1) using HL7 v2.5.1 ADT and ORU message types and FHIR R4 resources over TLS 1.3 with mutual ' +
   'certificate authentication, shall transmit each treatment summary within 15 minutes of clinician ' +
   'disposition, and shall retransmit any message for which an HL7 application acknowledgment is not ' +
   'received within 60 seconds, to a maximum of 3 attempts, before raising an integration fault to the ' +
   'monitoring center queue.',
   'OR-4; the M2A2 boundary decision placing the EHR outside PD-RPM',
   'Test against the EHR vendor conformance sandbox for every message type, including negative tests for ' +
   'withheld and malformed acknowledgments'],

  ['IR-4',
   'The Clinician Web Application (CW-1) shall render the complete triage queue on the Clinician ' +
   'Workstation (CS-1) within 3 seconds at the 95th percentile for a panel of up to 150 patients over a ' +
   '10 Mbit/s connection, displaying for each queued patient the alert category, the triggering value ' +
   'with its units, the time elapsed since the triggering measurement, and the acknowledgment state, ' +
   'with no queue entry requiring horizontal scrolling at a display width of 1366 pixels.',
   'OR-1 and OR-3; KPP Alert Latency (15 minutes to the monitoring nurse)',
   'Demonstration against a 150-patient synthetic panel with timing captured by instrumented browser ' +
   'telemetry over 100 page loads'],

  ['IR-5',
   'The Home Gateway (HG-1) shall operate from a 100–127 VAC, 60 Hz single-phase household supply drawing ' +
   'no more than 15 W, shall sustain acquisition, buffering, and transmission at full function for not ' +
   'less than 24 hours on internal battery following loss of that supply, and shall transmit a ' +
   'loss-of-mains notification to the Device Management Server (DM-1) within 60 seconds of transferring ' +
   'to battery.',
   'OR-2; KPP Operational Availability (Aₒ ≥ 0.98)',
   'Test by mains disconnection with the gateway under nominal session load, run to battery exhaustion, ' +
   'repeated at 15 °C and 30 °C ambient'],
];

const CLOSE1 =
  '**Why the 24-hour figure in IR-5.** The module 6 team-learning review traced a cluster of silent-device ' +
  'events to patients switching off a power strip overnight. A 6-hour gateway battery could not outlast a ' +
  'night-long session, and no single team held enough evidence to see it. IR-5 converts that finding into a ' +
  'bounded, testable obligation on the one element PD-RPM controls.';

const CLOSE2 =
  'Three of these interfaces cross the system boundary and therefore cannot be closed by requirement alone. ' +
  'IR-1 depends on a signed Interface Agreement Document with the cycler manufacturer covering the port, the ' +
  'record schema, and notice of firmware changes; IR-2 depends on a carrier service agreement stating the ' +
  'LTE-M coverage and availability committed under the private APN; IR-3 depends on an Interface Control ' +
  'Document with the health system naming the HL7 message set, the FHIR profile version, and the ' +
  'acknowledgment semantics. Absent those three artifacts, the first risk on the module 7 interface risk ' +
  'list — lack of external interface commitments — is open against this design, and the requirements above ' +
  'are unverifiable in the field however precisely they are written.';

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
  table.s { width: 100%; border-collapse: collapse; font-size: 8.2pt; margin: 6pt 0 8pt; }
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
  Module 7 | M7A1: Interface Requirements
</div>
<div class="rule"></div>

<h1>${esc(TITLE)}</h1>
<p>${md(INTRO)}</p>

<table class="s">
<tr><th>Req</th><th>Interface</th><th>Elements joined (M5A1 IDs)</th><th>Class</th>
<th>What crosses</th></tr>
${HDRS.map(([id, t, ifid, parties, cls, cross]) =>
  `<tr><td><b>${esc(id)}</b></td><td>${esc(t)}</td><td>${esc(ifid)} — ${esc(parties)}</td>` +
  `<td>${esc(cls)}</td><td>${esc(cross)}</td></tr>`).join('\n')}
</table>

${REQS.map(([id, shall, trace, verif]) => {
  const h = HDRS.find((x) => x[0] === id);
  return `<div class="req">
  <div class="bar"><b>${esc(id)} — ${esc(h[1])}</b> &nbsp;·&nbsp; interface ${esc(h[2])} &nbsp;·&nbsp;
    ${esc(h[4])} interface &nbsp;·&nbsp; ${esc(h[3])}</div>
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

fs.writeFileSync('m7a1.html', html);
console.log('html written —', words, 'words');
