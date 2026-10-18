// M6A3 — how Team Learning (Senge ch. 11) enables PD-RPM.
// Two pages, US Letter portrait, Arial 11pt.
const fs = require('fs');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*([^*]+)\*/g, '<em>$1</em>');

const P1 =
  'Senge defines team learning as **the process of aligning and developing the capacity of a team to create ' +
  'the results its members truly desire**, and he is careful that alignment is not agreement. The ' +
  'unaligned team wastes energy: individuals may work extremely hard without that effort becoming team ' +
  'effort, like a light bulb scattering in every direction, where an aligned team is a laser. Alignment is ' +
  'the precondition — empowering individuals in an unaligned team only increases the scatter. He names ' +
  'three dimensions: thinking insightfully about **complex issues**, where many minds must be more ' +
  'intelligent than one; **innovative coordinated action**, which runs on operational trust rather than ' +
  'instruction; and the obligation of a learning team to **propagate the practice to other teams**.';

const P2 =
  '**Why PD-RPM needs this more than most programs.** Its teams are neither co-located nor co-employed: the ' +
  'home dialysis program, the monitoring-center engineers, the cycler manufacturer’s field service, the ' +
  'carrier’s network operations, the electronic health record vendor’s integration group, and the ' +
  'patients and care partners who operate the system nightly. The project cannot direct most of them — ' +
  'it is an acknowledged system of systems. More importantly, its failures are cross-boundary by ' +
  'construction. The silent-gateway risk carried in the risk register cannot be diagnosed by any single ' +
  'team, because the evidence is split across carrier logs, gateway firmware, the nurse’s queue and the ' +
  'patient’s kitchen. No one holds enough of it alone.';

const PRAC = [
  ['Weekly silent-patient review', 'Dialogue: suspend assumptions — no cause may be named in the first ten minutes',
   'Nurse, firmware lead, carrier engineer', 'A shared account of what happened, before anyone defends a position'],
  ['Rank left at the door', 'Dialogue: regard one another as colleagues',
   'All participants', 'The nurse’s observation weighs the same as the architect’s'],
  ['A named facilitator who does not decide', 'Dialogue: someone must hold the context',
   'Systems engineer', 'The conversation stays exploratory long enough to be useful'],
  ['Converge-and-assign close', 'Discussion: the team moves deliberately to decision',
   'Same group', 'One change, one owner, one date'],
  ['Shared timestamped evidence log', 'Surfaces defensive routines by removing ownership of the facts',
   'All parties, including the carrier', '“Whose fault” becomes “what happened”'],
  ['Patients and care partners seated in the review', 'Dimension one: many minds more intelligent than one',
   'Patient, care partner', 'Access to the half of the system no instrument observes'],
  ['Fleet replay sandbox', 'The practice field — a microworld to rehearse in',
   'Engineering and nursing together', 'Rehearsal of a failure without patient consequence'],
];

const P3 =
  '**Dialogue, discussion, and the routines that block both.** Senge separates two ways a team converses. ' +
  '*Discussion* shares a root with percussion and concussion: ideas are batted back and forth until one ' +
  'wins, which is how a team converges. *Dialogue* is a free flow of meaning in which people become ' +
  'observers of their own thinking, and Bohm’s three conditions — suspend assumptions, treat one ' +
  'another as colleagues, and have someone hold the context — are what the first six practices above ' +
  'implement. A learning team masters the movement between the two. What prevents it is what Argyris calls ' +
  '**defensive routines**, the habitual moves that protect us from embarrassment and seal in mediocrity. In ' +
  'this program the routine is predictable and it is attribution: the carrier says gateway, the firmware ' +
  'lead says carrier, the nurse says the system was down again. Each is defending against being the cause, ' +
  'and the shared evidence log exists to make that defense unnecessary.';

const P4 =
  '**Scenario: the phantom Sunday outage.** During the clinical pilot, eleven patients logged device-silent ' +
  'events clustered on Sunday nights across three weeks. The carrier found no outage in its logs. Firmware ' +
  'telemetry showed no faults and a clean battery history. The nurse reported that patients said everything ' +
  'was fine. Each team, examining its own evidence honestly, concluded the problem belonged to someone else, ' +
  'and the program came close to writing it off as instrumentation noise — the textbook defensive ' +
  'outcome, where three correct analyses sum to no learning. The first dialogue session seated all three ' +
  'teams plus two pilot patients, with the no-cause-for-ten-minutes rule in force. Nine minutes in, a ' +
  'patient mentioned switching off the power strip before bed on Sundays, after the cleaner came. The ' +
  'gateway battery holds six hours; Sunday sessions run long. No participant could have found this alone: ' +
  'the carrier had no outage, the firmware had no fault, the nurse had no complaint, and the patient did not ' +
  'know the power strip was part of the system. The outcome was a 24-hour battery, a line in the patient ' +
  'instructions, and a standing decision to seat patients in every review.';

const P5 =
  'That last outcome is Senge’s third dimension doing its work: the home program has since borrowed the ' +
  'same format for its technique-failure reviews, so the practice is propagating beyond the team that built ' +
  'it. The reason this belongs in advanced development rather than after fielding is that the phase is the ' +
  'first time these groups have to produce anything together. A team that has not learned to talk before ' +
  'integration will not learn during it.';

const words = [P1, P2, P3, P4, P5].join(' ').replace(/\*/g, '').split(/\s+/).length;

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
  .q { font-size: 10pt; font-style: italic; text-align: center; margin: 0 0 9pt; color: #333; }
  p { text-align: justify; margin: 0 0 4pt; line-height: 1.55; }
  p.lead { margin-top: 5pt; }
  table.t { width: 100%; border-collapse: collapse; font-size: 8pt; margin: 5pt 0 6pt; }
  table.t th, table.t td { border: 0.6pt solid #1a1a1a; padding: 2.3pt 4pt;
       vertical-align: top; line-height: 1.22; }
  table.t th { background: #e4e4e4; text-align: left; }
  table.t td.s { font-weight: bold; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b><br>
  655.662 — Introduction to Healthcare Systems Engineering<br>
  Module 6 | M6A3: Team Learning
</div>
<div class="rule"></div>

<h1>How Team Learning Enables the PD-RPM Remote Care System</h1>
<p class="q">How can “Team Learning” enable your remote care system?</p>

<p>${md(P1)}</p>
<p>${md(P2)}</p>

<p class="lead">${md('**Seven practices that make it operational.** Team learning is a discipline, not a ' +
  'disposition, so it has to be built into how the program meets.')}</p>
<table class="t">
<tr><th>Collaborative practice</th><th>Chapter 11 principle it implements</th><th>Who takes part</th>
<th>What it produces</th></tr>
${PRAC.map(([a, b, c, d]) =>
  `<tr><td class="s">${esc(a)}</td><td>${esc(b)}</td><td>${esc(c)}</td><td>${esc(d)}</td></tr>`).join('')}
</table>

<p>${md(P3)}</p>
<p>${md(P4)}</p>
<p>${md(P5)}</p>
`;

fs.writeFileSync('m6a3.html', html);
console.log('html written —', words, 'words,', PRAC.length, 'practices');
