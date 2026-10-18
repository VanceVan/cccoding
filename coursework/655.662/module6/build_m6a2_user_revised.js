// M6A2 — the user's own rewrite, with accuracy corrections and number styling only.
// Prose and voice are the user's; edits limited to factual/grammatical errors and numerals.
const fs = require('fs');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const P1 =
  'Senge defines a shared vision as the answer to one question — what do we want to create? — and ' +
  'insists it is not an idea but a force, drawing its power from common caring. It cannot be issued. It is ' +
  'assembled from the personal visions people already hold, which is why announcing a vision produces ' +
  'compliance while sharing one produces commitment. Chapter 10 ranks the possible responses: commitment, ' +
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
  'The vision, and why its wording matters. Read down the third column, and one sentence covers all of it: ' +
  'every patient who can dialyze at home does, and stays there. It is intentionally worded positively. The ' +
  'typical default for a monitoring program is a negative vision, do not miss a peritonitis episode, do not ' +
  'allow the completeness metric to drop, and according to Senge (a proponent of positive visions), these ' +
  'negative visions convey a message of helplessness and motivate action only while the danger is apparent. ' +
  'A program operated with “do not let us fail to detect something” generates reluctant compliance ' +
  'from the nurse closing out notifications to free up their queue, which is precisely the kind of behavior ' +
  'that will result in discontinuation of home dialysis.';

const P3 =
  'The four ways in which it supports the overall system. Firstly, it resolves conflicts over requirements ' +
  'which are not resolvable via data. There is no technical solution to the conflict between false ' +
  'notification rate and detection lead time; it has a solution based upon the vision, which says to ' +
  'protect the nurse’s focus, because if she leaves her queue unattended then she is losing the ' +
  'opportunity to have the patient continue with home dialysis as much as if she misses an infection. ' +
  'Secondly, it creates commitment to comply at the point of use, as opposed to compliance due to nagging. ' +
  'The patient completes the 60-second survey because they wish to continue doing home dialysis, not simply ' +
  'because an application is sending reminders. Thirdly, it is the only means of coordination possible when ' +
  'authority is absent. PD-RPM is an acknowledged system of systems, i.e., neither the manufacturer of the ' +
  'cycler nor the carrier nor the vendor of the EHR may be directed, only coordinated. Finally, when stress ' +
  'arises in engineering design, and in fact stress arises during engineering development as soon as ' +
  'pressure to meet a deadline increases, Senge identifies shared vision as the rudder that should steer ' +
  'the direction of the organization.';

const P4 =
  'An example: The week that the threshold for the alert was negotiated. During the integration readiness ' +
  'meeting, analytics recommended reducing the alert threshold for ultrafiltration decline from 20 percent ' +
  'to 12 percent, since it would identify more declining patients. However, the nurse lead protested: At ' +
  '150 patients and one full-time equivalent nurse, it would approximately triple the amount of queued ' +
  'activity. Without a shared vision this represents a standoff resolved by rank or by volume. When one ' +
  'party loses they will comply formally but cease participating. Since both parties were now advocating ' +
  'positions about the same outcome, the issue became answerable with respect to a shared vision, namely ' +
  'which threshold would keep more patients at home after 12 months? Neither side had those numbers, thus ' +
  'the review asked for them rather than making a decision. In turn, the interim threshold remained at 20 ' +
  'percent with a trend direction qualifier, proposed by the nurse lead who had come to oppose and departed ' +
  'having created the compromise. This is the transition from genuine compliance to enrollment and it ' +
  'generated a better standard than either initial proposal.';

const P5 =
  'The distance between the vision and the roughly one in eight patients who are currently engaged in home ' +
  'dialysis is large enough to be discouraging; this is Senge’s most frequent reason for a vision to ' +
  'expire. When held directly against current performance it represents creative tension, an ' +
  'energy-generating element rather than a justification to lower goals. This is why shared vision is ' +
  'relevant to this module. Advanced development is exactly where conflicting individual visions collide ' +
  'regarding what to create, and a program without anything to resolve these disputes will resolve them by ' +
  'seniority.';

const words = [P1, P2, P3, P4, P5].join(' ').split(/\s+/).length;

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter portrait; margin: 0.75in 0.95in; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Arial, Helvetica, "Liberation Sans", sans-serif;
         font-size: 11pt; margin: 0; color: #000; }
  .hdr { line-height: 1.2; }
  .rule { border-bottom: 0.75pt solid #999; margin: 6pt 0 8pt; }
  p { text-align: left; margin: 0 0 6pt; line-height: 1.36; }
  table.t { width: 100%; border-collapse: collapse; font-size: 8.6pt; margin: 6pt 0 7pt; }
  table.t th, table.t td { border: 0.6pt solid #1a1a1a; padding: 2.6pt 4pt;
       vertical-align: top; line-height: 1.24; }
  table.t th { background: #e8e8e8; text-align: left; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b><br>
  655.662 — Introduction to Healthcare Systems Engineering<br>
  Module 6 | M6A2: Shared Vision
</div>
<div class="rule"></div>

<p>${esc(P1)}</p>

<table class="t">
<tr><th>Stakeholder</th><th>Personal vision, in their own terms</th>
<th>What it contributes to the shared vision</th></tr>
${SH.map(([a, b, c]) =>
  `<tr><td>${esc(a)}</td><td>${esc(b)}</td><td>${esc(c)}</td></tr>`).join('')}
</table>

<p>${esc(P2)}</p>
<p>${esc(P3)}</p>
<p>${esc(P4)}</p>
<p>${esc(P5)}</p>
`;

fs.writeFileSync('m6a2_revised.html', html);
console.log('html written —', words, 'words');
