// M3D1 — initial discussion post: one concept from Fifth Discipline ch. 4.
// One page, US Letter portrait, Arial 11pt.
const fs = require('fs');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.+?)\*/g, '<em>$1</em>');

const PARAS = [
  'Of the eleven laws in Chapter 4, the one that best describes the major issue in healthcare is ' +
  '**“Today’s problems come from yesterday’s solutions.”** Senge’s point is that a problem which appears to ' +
  'arrive from nowhere is usually the downstream effect of a fix made earlier, somewhere else in the system, ' +
  'for reasons that were entirely sound at the time. Because the fix and its consequence are separated by ' +
  'years and by organizational distance, nobody connects the two, and the people now living with the problem ' +
  'are rarely the people who created it.',

  'Dialysis is the clearest case I know. In 1972 Congress extended Medicare to cover end-stage renal disease, ' +
  'which solved an urgent and real problem: people were dying because they could not pay for treatment. The ' +
  'solution paid per treatment delivered in a facility. Fifty years on, the United States has a large, ' +
  'capital-intensive in-center hemodialysis industry; the great majority of patients start in a center, and ' +
  'home modalities — cheaper, better at preserving residual kidney function, and what a substantial share of ' +
  'patients say they would prefer — remain the minority path. The clinic real estate, the staffing ratios, the ' +
  'training pipeline, and the referral habits all grew up around the 1972 payment structure. None of that was ' +
  'anyone’s intent. It is yesterday’s solution producing today’s problem.',

  'The law earns its place because it predicts how the obvious fixes will fail. Exhorting nephrologists to ' +
  'offer home therapy, or bolting a home-education requirement onto the intake visit, treats the symptom and ' +
  'leaves the structure untouched; the structure pushes back, and the home census drifts down again once the ' +
  'initiative’s funding ends.',

  '**What I would suggest.** First, change what is paid for rather than what is asked for: a per-patient, ' +
  'per-month payment that is neutral across modality removes the revenue penalty a program absorbs when a ' +
  'patient goes home. Second, measure the right interval — modality at ninety days and at twelve months, not ' +
  'modality at start — so the metric rewards keeping patients home rather than enrolling them. Third, relieve ' +
  'the constraint that actually binds, which is the supply of home training nurses, not patient interest; ' +
  'funding and credentialing that workforce is unglamorous and is where the leverage sits. Fourth, and most ' +
  'in the spirit of the chapter, make the question part of the decision: before adopting any fix, write down ' +
  'what structure it will create that someone will have to undo in twenty years. Yesterday’s solutions were ' +
  'not stupid. They were just never asked that question.',
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
