// M6A2 — how Shared Vision (Senge ch. 10) enables PD-RPM.
// Two pages, US Letter portrait, Arial 11pt.
const fs = require('fs');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*([^*]+)\*/g, '<em>$1</em>');

const P1 =
  'Senge defines a shared vision as the answer to one question — *what do we want to create?* — and ' +
  'insists it is not an idea but a force, drawing its power from **common caring**. It cannot be issued. It is ' +
  'assembled from the personal visions people already hold, which is why announcing a vision produces ' +
  'compliance while sharing one produces **commitment**. Chapter 10 ranks the possible responses: commitment, ' +
  'enrollment, genuine compliance, formal compliance, grudging compliance, noncompliance, apathy. Only the ' +
  'first two create anything. The rest keep a program alive without advancing it, and most systems are ' +
  'delivered by people somewhere in the middle of that list.';

const SH = [
  ['Patient', 'Keep working, keep my evenings, not be a patient all day',
   'The therapy fits the life, not the reverse'],
  ['Care partner', 'Not be the one who missed something',
   'The system watches so the family does not have to'],
  ['Home dialysis nurse', 'Catch the problem early without drowning in alerts',
   'Attention is a finite clinical resource'],
  ['Nephrologist', 'Know whether the prescription change actually worked',
   'Decisions are judged against data, not memory'],
  ['Home program manager', 'Grow census without growing technique failure',
   'Retention, not enrollment, is the measure'],
  ['Dialysis organization', 'Shift the modality mix and have the economics hold',
   'Home is viable at scale, not just possible'],
  ['Cycler maker, carrier, EHR vendor', 'Protect our own roadmaps and release cycles',
   'Interfaces are negotiated, never dictated'],
  ['Payer (CMS)', 'Better outcomes for the same dollar',
   'The measure is the patient-year, not the treatment'],
  ['Engineering team', 'Build something that is actually used',
   'Adoption is the acceptance criterion'],
];

const P2 =
  '**The vision, and why its wording matters.** Read down that third column and one sentence covers all of ' +
  'it: *every patient who can dialyze at home does, and stays there.* It is deliberately **positive**. The ' +
  'default vision in a monitoring program is negative — do not miss a peritonitis, do not let the ' +
  'completeness parameter slip — and Senge’s objection to negative visions is that they carry a ' +
  'message of powerlessness and energize only while the threat is visible. A program run on *do not get ' +
  'caught missing something* earns grudging compliance from the nurse who closes alerts to clear a queue, ' +
  'which is precisely the behavior that ends home therapy.';

const P3 =
  '**Four mechanisms by which it enables the system.** First, it settles requirements conflicts that data ' +
  'cannot. The trade between false alert rate and detection lead time has no technical answer; it has a ' +
  'vision answer, and *stays there* says protect the nurse’s attention, because an unread queue ends ' +
  'home therapy as surely as a missed infection. Second, it converts compliance into commitment at the point ' +
  'of use: the patient completes the sixty-second check because they want to stay home, not because an app ' +
  'nags. Third, it is the only coordinating mechanism available where authority is not. PD-RPM is an ' +
  'acknowledged system of systems — the cycler manufacturer, the carrier and the EHR vendor cannot be ' +
  'directed, only aligned. Fourth, it is the rudder Senge describes for when stress develops, and in ' +
  'engineering development stress always develops as schedule pressure.';

const P4 =
  '**Scenario: the week the alert threshold was argued.** At the integration readiness review, analytics ' +
  'proposed tightening the ultrafiltration decline threshold from 20 percent to 12 percent, on the reasoning ' +
  'that it would catch more declining patients. The nurse lead objected: at 150 patients and one full-time ' +
  'equivalent, it would roughly triple queue volume. With no shared vision this is a stalemate settled by ' +
  'rank or by volume, and whoever loses complies formally and stops contributing. With *every patient who ' +
  'can dialyze at home does, and stays there* on the wall, the argument becomes answerable, because both ' +
  'positions are now claims about the same outcome: which threshold keeps more patients home at twelve ' +
  'months? Neither side had that number, so the review commissioned it rather than deciding. The interim ' +
  'setting stayed at 20 percent with a trend-direction qualifier — proposed by the nurse lead, who had ' +
  'arrived opposed and left having designed the compromise. That is the move from genuine compliance to ' +
  '**enrollment**, and it produced a better rule than either original position.';

const P5 =
  'The gap between the vision and the roughly one patient in eight currently dialyzing at home is large ' +
  'enough to be discouraging, which is Senge’s most common way for a vision to die. Held honestly ' +
  'against current reality it is **creative tension** instead: a source of energy rather than a reason to ' +
  'lower the target. That is what makes shared vision the right topic for this module. Advanced development ' +
  'is exactly where competing personal visions collide over what to build, and a program with nothing to ' +
  'arbitrate them resolves the collisions by seniority.';

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
  table.t { width: 100%; border-collapse: collapse; font-size: 8.3pt; margin: 6pt 0 7pt; }
  table.t th, table.t td { border: 0.6pt solid #1a1a1a; padding: 2.4pt 4pt;
       vertical-align: top; line-height: 1.24; }
  table.t th { background: #e4e4e4; text-align: left; }
  table.t td.s { font-weight: bold; width: 92pt; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b><br>
  655.662 — Introduction to Healthcare Systems Engineering<br>
  Module 6 | M6A2: Shared Vision
</div>
<div class="rule"></div>

<h1>How a Shared Vision Enables the PD-RPM Remote Care System</h1>
<p class="q">How can “Shared Vision” enable your remote care system?</p>

<p>${md(P1)}</p>

<table class="t">
<tr><th>Stakeholder</th><th>Personal vision, in their own terms</th>
<th>What it contributes to the shared vision</th></tr>
${SH.map(([a, b, c]) =>
  `<tr><td class="s">${esc(a)}</td><td>${esc(b)}</td><td>${esc(c)}</td></tr>`).join('')}
</table>

<p>${md(P2)}</p>
<p>${md(P3)}</p>
<p>${md(P4)}</p>
<p>${md(P5)}</p>
`;

fs.writeFileSync('m6a2.html', html);
console.log('html written —', words, 'words,', SH.length, 'stakeholders');
