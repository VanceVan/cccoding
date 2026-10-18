// M6A3 — the user's own rewrite, with accuracy corrections and number styling only.
const fs = require('fs');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const TITLE = 'How can “Team Learning” enable your remote care system?';

const P1 =
  'Senge defines “Team Learning” as the process of achieving alignment (not necessarily agreement) ' +
  'among the members of a team to develop the collective ability of the team to achieve the desired ' +
  'outcomes for all team members. As such, when a team is out of alignment, they waste energy: each member ' +
  'works hard at something but does not contribute to the success of the entire team. This represents a ' +
  'situation where individual efforts are like a light bulb radiating in multiple directions while a ' +
  'well-aligned team produces a laser-like effect. Senge identifies the three dimensions required for ' +
  'successful Team Learning as follows:';

const DIMS = [
  '1. Developing insightful thinking regarding complex problems. Teams need to collectively think more ' +
  'intelligently than any one person.',
  '2. Coordinated action through innovation. Rather than relying on instruction, trust-based operational ' +
  'processes are used.',
  '3. Obligations of a learning team include disseminating knowledge and best practices to additional teams.',
];

const H2 = 'Why PD-RPM requires Team Learning more than most other programs.';

const P2 =
  'The teams involved in PD-RPM do not share common physical or employment locations. Therefore, there are ' +
  'several different teams including those located at the dialysis facilities where patients receive ' +
  'treatment (home dialysis), engineering teams responsible for monitoring centers, the company providing ' +
  'cyclers (the equipment that performs the dialysis procedure), teams within carriers’ network ' +
  'operation departments, companies providing integration support for electronic health records, and ' +
  'patients and caregivers who manage the system daily. Most of these teams cannot be directed by the ' +
  'project due to the fact that PD-RPM is an acknowledged system of systems. Additionally, failure is a ' +
  'cross-boundary issue by design. For example, the “silent-gateway risk” listed in the risk ' +
  'register cannot be identified solely based upon data collected by a single team. Data associated with ' +
  'this risk includes logs maintained by the carrier’s network operations department, information ' +
  'contained in firmware related to the gateway device, information placed in queues by nurses, and ' +
  'conditions in patients’ homes. No one team maintains sufficient amounts of this data.';

const P3 =
  'Seven practices to establish it. Team Learning is a discipline, not simply a personality trait. ' +
  'Therefore, it must be embedded into how the program conducts itself.';

const PRAC = [
  ['Weekly silent-patient review',
   'Dialogue: suspend assumptions — no cause may be named in the first 10 minutes',
   'Nurse, firmware lead, carrier engineer',
   'A shared account of what happened, before anyone defends a position'],
  ['Rank left at the door', 'Dialogue: regard one another as colleagues', 'All participants',
   'The nurse’s observation weighs the same as the architect’s'],
  ['A named facilitator who does not decide', 'Dialogue: someone must hold the context', 'Systems engineer',
   'The conversation stays exploratory long enough to be useful'],
  ['Converge-and-assign close', 'Discussion: the team moves deliberately to decision', 'Same group',
   'One change, one owner, one date'],
  ['Shared timestamped evidence log', 'Surfaces defensive routines by removing ownership of the facts',
   'All parties, including the carrier', '“Whose fault” becomes “what happened”'],
  ['Patients and care partners seated in the review', 'Dimension one: many minds more intelligent than one',
   'Patient, care partner', 'Access to the half of the system no instrument observes'],
  ['Fleet replay sandbox', 'The practice field — a microworld to rehearse in',
   'Engineering and nursing together', 'Rehearsal of a failure without patient consequence'],
];

const P4 =
  'Senge describes two types of communication in a team environment. Discussion involves sharing ideas with ' +
  'others with the objective of finding the “winner.” While this method of communicating can ' +
  'result in a team reaching consensus quickly, it shares a root with “percussion,” where ideas ' +
  'are exchanged rapidly until one idea emerges as the winner. Dialogue, however, provides a free flowing ' +
  'exchange of meaning where participants observe their own thought patterns. Bohm’s three conditions ' +
  'provide the framework for creating dialogue: suspend assumptions, treat others as colleagues, and have ' +
  'someone maintain context. The first six practices previously identified establish Bohm’s three ' +
  'conditions. A learning team learns how to transition between discussion and dialogue. Defensive routines ' +
  '(i.e., habits designed to prevent embarrassment and preserve mediocrity) limit our ability to engage in ' +
  'dialogue. According to Argyris, defensive routines are predictable and attribution is the primary ' +
  'routine limiting PD-RPM’s ability to engage in dialogue. When the carrier states that the problem ' +
  'lies with the gateway, the firmware lead responds that the problem must lie with the carrier, and the ' +
  'nurse states that she believes that the system must have been down once again. All parties are ' +
  'protecting themselves from being determined as the source of the problem and the shared evidence log is ' +
  'intended to eliminate the need for this protection.';

const H3 = 'A scenario: phantom Sunday outage.';

const P5 =
  'During the clinical pilot phase of the program, 11 patients logged silent-device events that were ' +
  'concentrated on Sunday evenings over a period of 3 consecutive weeks. The carrier reviewed its logs and ' +
  'stated that there was no outage recorded by its network operations department. Firmware telemetry ' +
  'indicated that there were no faults detected by the firmware related to the gateway device and a full ' +
  'battery history existed for the gateway battery. The nurse reported that patients stated that they ' +
  'experienced no problems with respect to using their device. Each team examined its own evidence and ' +
  'concluded that the problem lay with another team. The program almost wrote off the observed events as ' +
  'instrumentation-related noise -- the typical defensive response resulting from three separate analytical ' +
  'evaluations that add up to no learning. At this point, a dialogue session was scheduled for all three ' +
  'teams plus two patients participating in the pilot testing, with a rule requiring that no cause be named ' +
  'within 10 minutes of starting. After 9 minutes of dialogue, a patient provided information indicating ' +
  'that they turned off their power strip prior to going to sleep each Sunday evening because of visits ' +
  'from housekeepers during this timeframe. The gateway battery has a 6-hour life and Sunday night sessions ' +
  'typically continue longer than 6 hours. None of the participants would have individually discovered this ' +
  'information: the carrier had documented no outage, firmware had documented no errors, nurses had ' +
  'received no complaints from patients, and patients were unaware that turning off their power strip was ' +
  'relevant to maintaining proper function of their system. As a result, a 24-hour battery was added to ' +
  'future versions of the system, language was added to patient education materials instructing them to ' +
  'never turn off their power strips during use and all subsequent technique failure reviews included ' +
  'seating patients along with representatives from all applicable teams.';

const P6 =
  'The last outcome illustrates Senge’s third dimension at work: technique failure reviews conducted ' +
  'by home dialysis programs now employ the same format as those performed by PD-RPM and therefore this ' +
  'approach is spreading beyond PD-RPM to other teams. Why this is classified as advanced development ' +
  'versus post-fielding is that this marks the first time that these teams have ever had to generate output ' +
  'collaboratively. If teams fail to develop their ability to communicate effectively before integrating ' +
  'into a functioning system, they will certainly fail to develop this capability after they begin working ' +
  'together.';

const words = [P1, ...DIMS, H2, P2, P3, P4, H3, P5, P6].join(' ').split(/\s+/).length;

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter portrait; margin: 0.62in 0.85in; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Arial, Helvetica, "Liberation Sans", sans-serif;
         font-size: 11pt; margin: 0; color: #000; }
  .hdr { line-height: 1.2; }
  .rule { border-bottom: 0.75pt solid #999; margin: 6pt 0 8pt; }
  p { text-align: left; margin: 0 0 4.5pt; line-height: 1.24; }
  p.dim { margin: 0 0 3pt 0.25in; }
  table.t { width: 100%; border-collapse: collapse; font-size: 7.9pt; margin: 4.5pt 0 5pt; }
  table.t th, table.t td { border: 0.6pt solid #1a1a1a; padding: 2pt 4pt;
       vertical-align: top; line-height: 1.22; }
  table.t th { background: #e8e8e8; text-align: left; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b><br>
  655.662 — Introduction to Healthcare Systems Engineering<br>
  Module 6 | M6A3: Team Learning
</div>
<div class="rule"></div>

<p><b>${esc(TITLE)}</b></p>
<p>${esc(P1)}</p>
${DIMS.map((d) => `<p class="dim">${esc(d)}</p>`).join('\n')}
<p>${esc(H2)}</p>
<p>${esc(P2)}</p>
<p>${esc(P3)}</p>

<table class="t">
<tr><th>Collaborative practice</th><th>Chapter 11 principle it implements</th><th>Who takes part</th>
<th>What it produces</th></tr>
${PRAC.map(([a, b, c, d]) =>
  `<tr><td>${esc(a)}</td><td>${esc(b)}</td><td>${esc(c)}</td><td>${esc(d)}</td></tr>`).join('')}
</table>

<p>${esc(P4)}</p>
<p>${esc(H3)}</p>
<p>${esc(P5)}</p>
<p>${esc(P6)}</p>
`;

fs.writeFileSync('m6a3_revised.html', html);
console.log('html written —', words, 'words');
