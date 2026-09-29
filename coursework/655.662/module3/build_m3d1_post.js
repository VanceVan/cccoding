// M3D1 — initial discussion post: one concept from Fifth Discipline ch. 4.
// One page, US Letter portrait, Arial 11pt.
const fs = require('fs');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.+?)\*/g, '<em>$1</em>');

const PARAS = [
  'Of the eleven laws in Chapter 4, the one that best describes the major issue in healthcare is ' +
  '**\u201cToday\u2019s problems come from yesterday\u2019s solutions.\u201d** A problem that seems to arrive ' +
  'from nowhere is usually the downstream effect of a fix made earlier, elsewhere in the system, for reasons ' +
  'that were entirely sound at the time; because the fix and the consequence are separated by years and by ' +
  'organizational distance, nobody connects them. Dialysis is the clearest case I know. In 1972 Congress ' +
  'extended Medicare to cover end-stage renal disease, solving an urgent problem \u2014 people were dying ' +
  'because they could not pay \u2014 by paying per treatment delivered in a facility. Fifty years on, the ' +
  'United States has a large, capital-intensive in-center hemodialysis industry, the great majority of ' +
  'patients start in a center, and home modalities remain the minority path even though they cost less and ' +
  'better preserve residual kidney function. The clinic real estate, the staffing ratios, the training ' +
  'pipeline, and the referral habits all grew up around that payment structure. None of it was anyone\u2019s ' +
  'intent, and that is precisely why exhortation fails: telling nephrologists to offer home therapy treats ' +
  'the symptom, the structure pushes back, and the home census drifts down again once the initiative\u2019s ' +
  'funding ends.',

  '**The remedies therefore have to act on the structure.** Change what is paid for rather than what is asked ' +
  'for \u2014 a per-patient, per-month payment neutral across modality removes the revenue penalty a program ' +
  'absorbs when a patient goes home. Measure the right interval, modality at ninety days and at twelve months ' +
  'rather than at start, so the metric rewards keeping patients home instead of merely enrolling them. ' +
  'Relieve the constraint that actually binds, which is the supply of home training nurses rather than ' +
  'patient interest. And, most in the spirit of the chapter, make the question part of every decision: before ' +
  'adopting a fix, write down what structure it will create that someone will have to undo in twenty years. ' +
  'Yesterday\u2019s solutions were not stupid; they were just never asked that question.',
];

const words = PARAS.join(' ').replace(/\*\*?/g, '').split(/\s+/).length;

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter portrait; margin: 1in; }
  body { font-family: Arial, Helvetica, "Liberation Sans", sans-serif;
         font-size: 11pt; margin: 0; color: #000; }
  .hdr { line-height: 1.2; }
  .rule { border-bottom: 0.75pt solid #999; margin: 6pt 0 9pt; }
  h1 { font-size: 11pt; text-align: center; margin: 0 0 9pt; }
  p { text-align: justify; margin: 0 0 8pt; line-height: 1.5; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b><br>
  655.662 — Introduction to Healthcare Systems Engineering<br>
  Module 3 | M3D1: Chapter 4, The Fifth Discipline — initial post
</div>
<div class="rule"></div>

<h1>Today’s Problems Come From Yesterday’s Solutions</h1>

${PARAS.map((t) => `<p>${md(t)}</p>`).join('\n')}
`;

fs.writeFileSync('m3d1.html', html);
console.log('html written —', words, 'words');
