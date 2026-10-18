// M6A1 — Kossiakoff problem 13.2 applied to PD-RPM.
// Two pages, US Letter portrait, Arial 11pt.
const fs = require('fs');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*([^*]+)\*/g, '<em>$1</em>');

const OPEN =
  'Advanced development sits between a chosen concept and a committed design. Its purpose is not to build ' +
  'the system but to retire the uncertainty that would otherwise surface later, when correcting it is ' +
  'expensive. Six specific activities give the phase its other name, and the course materials state the ' +
  'objective plainly: the aim of prototyping and competition is **to reduce technical, cost and schedule ' +
  'risk**. Each activity below is paired with the class of risk it retires and an example from PD-RPM, the ' +
  'peritoneal dialysis remote patient monitoring system developed across this course.';

const ACT = [
  ['1. Identifying and ranking the high-risk elements.',
   'The phase opens by deciding where the risk actually is, so that effort goes to the few elements that ' +
   'need it rather than being spread evenly. This retires **programmatic risk** — the risk of spending ' +
   'the phase on the wrong things. *Example:* a technology readiness survey of PD-RPM’s twenty physical ' +
   'elements put most at TRL 9 — commercial cuffs, scales, workstations — and exactly one at TRL 6, ' +
   'the HG-1 home gateway with its cellular store-and-forward firmware. The companion risk, silent loss of ' +
   'home data delivery, scored 4 × 4 = 16. Advanced development was ' +
   'therefore scoped almost entirely around HG-1, and the commercial elements were left alone.'],

  ['2. Requirements analysis and flow-down to a validated specification.',
   'Operational requirements are restated as testable system requirements, each tagged to the sub-function ' +
   'it bounds. This retires **verification risk**: ambiguity is found on paper rather than at acceptance ' +
   'test. *Example:* the PD-RPM operational requirement to transfer each completed treatment record within ' +
   '30 minutes of session end flowed down to a pairing timeout of 10 seconds, a buffer write-confirm of 2 ' +
   'seconds, a 5-minute upload retry interval over twelve attempts, and an ingest-to-available latency of 90 ' +
   'seconds. Only once the budget was written out did it become visible that it left no allowance for a ' +
   'carrier re-registration, which routinely takes four minutes.'],

  ['3. Trade studies among component alternatives.',
   'Engineering trade studies are the primary tool of this phase. Scoring alternatives against weighted, ' +
   'requirement-traced criteria retires **cost and schedule risk**, because the losing options are eliminated ' +
   'before anything is procured. *Example:* the PD-RPM connectivity trade study evaluated four alternatives ' +
   'against four criteria. The smartphone-tethered option, cheaper than the others by a factor of four, was ' +
   'disqualified on the data-completeness key performance parameter at 91 percent against a 95 percent ' +
   'threshold. Disqualifying it on paper cost a week of analysis; discovering the same thing after fielding ' +
   '150 gateways would have cost a recall.'],

  ['4. Modeling and simulation.',
   'Measures of feasibility and performance are estimated before hardware exists, which retires **technical ' +
   'risk at low cost** and converts a design argument into a number. *Example:* a discrete-event simulation ' +
   'of a 150-patient fleet, driven by observed session sizes and measured carrier outage durations, was used ' +
   'to size the gateway buffer. The 72-hour buffer carried in the original concept lost data in roughly 8 ' +
   'percent of simulated months; a 14-day buffer held in all of them. The buffer requirement changed before ' +
   'a single enclosure was tooled.'],

  ['5. Prototype development of critical components.',
   'Explorative prototypes settle requirements with users; experimental prototypes determine whether the ' +
   'planned system will actually be adequate. Both retire **technical risk**, and the experimental prototype ' +
   'can stand in as a requirements specification. *Example:* an experimental HG-1 — a single-board ' +
   'gateway running production firmware and no enclosure — was run against ' +
   'twenty simulated cyclers on a carrier test network for six weeks, with deliberate SIM deactivations and ' +
   'forced firmware faults. It established that store-and-forward survived a nine-day outage and that the ' +
   'planned liveness heartbeat detected a dead link in under 35 minutes.'],

  ['6. Development test planning and the integration build-up.',
   'A test and evaluation plan and a staged integration sequence retire **integration risk**, the risk that ' +
   'the first time elements meet is also the first time anyone learns they do not fit. *Example:* the PD-RPM ' +
   'build-up runs HG-1 alone on the bench; HG-1 with the cycler data port; HG-1 with the Bluetooth ' +
   'peripherals; HG-1 end-to-end to the ingest service over a live carrier; the monitoring-center services ' +
   'against simulated feeds; the full chain with simulated patients; the full chain with clinicians in the ' +
   'loop; and a limited clinical evaluation with real patients last. Each step adds one element, so any ' +
   'defect is attributable to the thing just added.'],
];

const TBL = [
  ['1', 'Identify and rank high-risk elements', 'Programmatic',
   'HG-1 isolated at TRL 6 as the one element needing the phase'],
  ['2', 'Requirements flow-down', 'Verification',
   '30-minute transfer budget shown to omit carrier re-registration'],
  ['3', 'Trade studies', 'Cost and schedule',
   'Cheapest alternative disqualified on a KPP before procurement'],
  ['4', 'Modeling and simulation', 'Technical',
   'Buffer resized from 72 hours to 14 days before tooling'],
  ['5', 'Prototype development', 'Technical',
   'Store-and-forward verified across a nine-day outage'],
  ['6', 'Development test planning', 'Integration',
   'Eight-step build-up isolating each defect to one element'],
];

const CLOSE =
  'The common thread is that each activity replaces a belief with a measurement while the cost of being ' +
  'wrong is still small. The phase is called risk reduction precisely because nothing in it is meant to ' +
  'ship: the prototype has no enclosure, the simulation has no patients, the build-up stops short of ' +
  'production. What it delivers is a design the program can commit to and a record of the uncertainties ' +
  'that no longer have to be carried forward.';

const words = [OPEN, CLOSE].concat(ACT.map((a) => a.join(' ')))
  .join(' ').replace(/\*/g, '').split(/\s+/).length;

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter portrait; margin: 0.8in 1in; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Arial, Helvetica, "Liberation Sans", sans-serif;
         font-size: 11pt; margin: 0; color: #000; }
  .hdr { line-height: 1.2; }
  .rule { border-bottom: 0.75pt solid #999; margin: 6pt 0 8pt; }
  h1 { font-size: 11pt; text-align: center; margin: 0 0 3pt; }
  .q { font-size: 10pt; font-style: italic; text-align: center; margin: 0 0 9pt;
       line-height: 1.3; color: #333; }
  p { text-align: justify; margin: 0 0 4pt; line-height: 1.55; }
  table.t { width: 100%; border-collapse: collapse; font-size: 8.4pt; margin: 6pt 0 6pt; }
  table.t th, table.t td { border: 0.6pt solid #1a1a1a; padding: 2.6pt 4pt;
       vertical-align: top; line-height: 1.26; }
  table.t th { background: #e4e4e4; text-align: left; }
  table.t td.n { text-align: center; width: 14pt; font-weight: bold; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b><br>
  655.662 — Introduction to Healthcare Systems Engineering<br>
  Module 6 | M6A1: Problem Set — Kossiakoff Problem 13.2
</div>
<div class="rule"></div>

<h1>Risk Reduction in the Advanced Development Phase</h1>
<p class="q">13.2 — What specific activities in the advanced development phase sometimes cause it to be
referred to as a “risk reduction” phase? Give an example of each activity considering a real or
hypothetical system.</p>

<p>${md(OPEN)}</p>
${ACT.map(([h, b]) => `<p><b>${esc(h)}</b> ${md(b)}</p>`).join('\n')}

<table class="t">
<tr><th></th><th>Activity</th><th>Risk class retired</th><th>What it produced for PD-RPM</th></tr>
${TBL.map(([n, a, r, p]) =>
  `<tr><td class="n">${n}</td><td>${esc(a)}</td><td>${esc(r)}</td><td>${esc(p)}</td></tr>`).join('')}
</table>

<p>${md(CLOSE)}</p>
`;

fs.writeFileSync('m6a1.html', html);
console.log('html written —', words, 'words,', ACT.length, 'activities');
