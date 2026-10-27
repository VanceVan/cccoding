// M7A3 — Design Requirements for PD-RPM. Five "shall" statements, 1-2 pages.
const fs = require('fs');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*([^*]+)\*/g, '<em>$1</em>');

const TITLE = 'Design Requirements — Peritoneal Dialysis Remote Patient Monitoring (PD-RPM)';

const INTRO =
  'Design requirements constrain how PD-RPM is **realized** rather than what it does. The five below are ' +
  'drawn from the design-element set the module names — reliability, availability, maintainability, ' +
  'producibility, human factors — and each one is assessed against the design itself at Preliminary and ' +
  'Critical Design Review, not against a running system. Each states a single **shall**, carries a ' +
  'numeric criterion, and names the review or qualification test that closes it. They are deliberately ' +
  'disjoint from M7A1, which defines what crosses the system boundary, and from M7A2, which defines what ' +
  'the software does with what it receives.';

// id, title, applies, cls
const HDRS = [
  ['DR-1', 'Availability and fault tolerance', 'Monitoring and alerting path, EG-1 through NG-1',
   'Performance'],
  ['DR-2', 'Home operating environment and installability', 'Home Gateway (HG-1)', 'Characteristic'],
  ['DR-3', 'Patient-facing use safety', 'Patient Tablet (PT-1), HG-1 indicators, patient materials',
   'Constraint'],
  ['DR-4', 'Field maintainability', 'Home Gateway (HG-1), Device Management Server (DM-1)',
   'Characteristic'],
  ['DR-5', 'Radio module partitioning', 'Home Gateway (HG-1)', 'Constraint'],
];

const REQS = [
  ['DR-1',
   'The monitoring and alerting path from the Edge Gateway (EG-1) through the Notification Gateway (NG-1) ' +
   'shall be designed to achieve an operational availability of not less than 0.98 measured over any ' +
   'rolling 90-day period, with no single hardware, service, or availability-zone failure capable of ' +
   'interrupting alert delivery for more than 5 minutes.',
   'KPP Operational Availability (Aₒ ≥ 0.98); KPP Alert Latency',
   'Analysis by reliability block diagram with MTBF and MTTR allocated to each element, reviewed at PDR; ' +
   'confirmed by fault-injection testing of each single point of failure before CDR'],

  ['DR-2',
   'The Home Gateway (HG-1) shall be designed for unattended operation in a domestic bedroom: enclosure ' +
   'rated to IP32, operating across 10 to 35 °C and 10 to 85 percent relative humidity non-condensing, ' +
   'cooled by convection with no moving parts, emitting no more than 30 dBA measured at 1 meter, and ' +
   'installable by the patient or care partner without tools in not more than 10 minutes.',
   'OR-2 (no operational burden beyond running the cycler); operational need ON-2',
   'Qualification test per IEC 60601-1-11 for the home healthcare environment, acoustic measurement in an ' +
   'anechoic chamber, and timed out-of-box installation by 10 untrained participants'],

  ['DR-3',
   'All patient-facing elements of PD-RPM shall be designed under an IEC 62366-1 usability engineering ' +
   'process, shall present text at not less than a 16-point equivalent with a contrast ratio of at least ' +
   '4.5 to 1, and shall be validated by a summative usability study with not fewer than 15 participants ' +
   'per distinct user group in which zero use errors lead to a hazardous situation.',
   'KPP Patient Daily Interaction Time (≤ 60 seconds); OR-3; the adult ESKD home population, which skews ' +
   'older and includes diabetic visual impairment',
   'Inspection of the usability engineering file at CDR, followed by the summative study executed on ' +
   'production-equivalent units'],

  ['DR-4',
   'The design shall permit firmware and configuration update of the Home Gateway (HG-1) from the Device ' +
   'Management Server (DM-1) without a home visit, applying no update during an active treatment session, ' +
   'reverting automatically to the previously known-good image after 2 consecutive failed boots, and ' +
   'achieving a fleet update success rate of not less than 98 percent within 30 days of release.',
   'KPP Operational Availability; risk R-1 (silent gateway) and mitigation M-3 from M5A2',
   'Demonstration on a 50-unit pilot fleet including deliberately corrupted packages and a mid-session ' +
   'update attempt, with rollback and session protection both observed'],

  ['DR-5',
   'The Home Gateway (HG-1) shall be designed with the cellular radio as a field-replaceable module on a ' +
   'documented internal interface, such that substituting a different certified radio requires changes to ' +
   'no element other than the radio abstraction layer, requires no change to the enclosure, power, or ' +
   'thermal design, and requires no re-certification of the host board.',
   'The re-trade trigger recorded in M4A2 step 12, against carrier sunset of LTE-M service',
   'Inspection of the module interface specification at PDR, and demonstration by fitting a second, ' +
   'different certified radio module to a production-equivalent host'],
];

const CLOSE1 =
  '**Where the tension sits.** DR-5 buys insurance against a carrier technology sunset and pays for it in ' +
  'unit cost: a socketed, separately certified radio is more expensive than one soldered to the host board, ' +
  'across every unit shipped. The M4A2 trade study selected the cellular gateway on the assumption that ' +
  'LTE-M remains available for the service life of the fleet, and recorded carrier sunset as the trigger ' +
  'to re-open that trade. DR-5 is the cheaper response to that trigger, but it is not free, and it should ' +
  'be re-examined at PDR against the bill-of-materials target rather than treated as settled.';

const CLOSE2 =
  'Two of these requirements govern things no amount of software can repair. DR-2 constrains a device that ' +
  'will sit in a bedroom beside a sleeping patient every night for years, where a cooling fan is a reason ' +
  'to unplug it. DR-3 constrains a user population that is older than average and frequently visually ' +
  'impaired by diabetes, where a 15-participant summative study is the regulatory floor rather than a ' +
  'generous sample. Both are design decisions in the strict sense: once the enclosure is tooled and the ' +
  'interaction model is fixed, neither is recoverable later in the program at acceptable cost.';

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
  table.s td:first-child { white-space: nowrap; }
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
  Module 7 | M7A3: Design Requirements
</div>
<div class="rule"></div>

<h1>${esc(TITLE)}</h1>
<p>${md(INTRO)}</p>

<table class="s">
<tr><th>Req</th><th>Design area</th><th>Applies to</th><th>Class</th></tr>
${HDRS.map(([id, t, ap, cls]) =>
  `<tr><td><b>${esc(id)}</b></td><td>${esc(t)}</td><td>${esc(ap)}</td><td>${esc(cls)}</td></tr>`).join('\n')}
</table>

${REQS.map(([id, shall, trace, verif]) => {
  const h = HDRS.find((x) => x[0] === id);
  return `<div class="req">
  <div class="bar"><b>${esc(id)} — ${esc(h[1])}</b> &nbsp;·&nbsp; ${esc(h[2])} &nbsp;·&nbsp;
    design ${esc(h[3].toLowerCase())}</div>
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

fs.writeFileSync('m7a3.html', html);
console.log('html written —', words, 'words');
