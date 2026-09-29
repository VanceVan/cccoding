// M3A3 — one concept from Fifth Discipline ch. 4 as healthcare's major issue.
// Two pages, US Letter portrait, Arial 11pt.
const fs = require('fs');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.+?)\*/g, '<em>$1</em>');

const P = {};

P.a = '**The law, and the claim.** Of the eleven laws in Chapter 4, “Today’s problems come from ' +
  'yesterday’s solutions” best accounts for healthcare’s most stubborn failures. I apply it to a case I ' +
  'can specify precisely: the dominance of in-center hemodialysis in the United States, where roughly one ' +
  'dialysis patient in eight is treated at home. The in-center default is not a preference anyone holds but ' +
  'a structure an earlier and entirely defensible solution built, and the structure now sustains itself. In ' +
  'Senge’s vocabulary this is a **Shifting the Burden** archetype whose outward behavior reads as Fixes ' +
  'That Fail.';

P.b = '**The causal structure.** In 1972 Congress extended Medicare to end-stage renal disease. Before it, ' +
  'people who could not pay for dialysis died; after it, they did not. The mechanism chosen was payment for a ' +
  'treatment delivered in a facility, and it is that mechanism, not the entitlement, that propagated:';

const CLD = [
  ['B1 — symptomatic', 'incident patient → in-center chair → kidney failure treated (days)'],
  ['B2 — fundamental', 'incident patient → home training → home therapy → same result, plus preserved ' +
                       'residual function and lower cost (weeks to months)'],
  ['R1 — dependence', 'in-center volume → clinic capital, staffing ratios, referral habit, fellowship ' +
                      'exposure → in-center is the default and the fastest route → in-center volume'],
  ['Atrophy arm', 'R1 growth → home training capacity declines → B2 slower and riskier → B2 chosen less ' +
                  '→ R1 grows'],
];

P.c = 'B1 and B2 relieve the same symptom. B1 is faster, so under pressure it wins, and every win feeds R1. ' +
  'What makes this Shifting the Burden rather than ordinary competition is the atrophy arm: R1 does not merely crowd B2 out, it degrades B2’s capability, so the fundamental solution ' +
  'becomes genuinely harder to choose over time rather than merely less popular.';

P.d = '**Delays, which are why nobody sees it.** Three delays run at different scales. A placement decision ' +
  'resolves in days. Building home program capability takes months to years, since a home training nurse is ' +
  'not interchangeable with a floor nurse. The structural delay runs in decades: clinic leases, corporate ' +
  'footprints, fellowship curricula. Because the reinforcing loop’s delay is by far the longest, it was ' +
  'invisible to Congress in 1972 and is invisible to the nephrologist making a placement this afternoon. ' +
  'Cause and effect are separated here by roughly fifty years.';

P.e = '**Short term against long term.** In the short term the symptomatic path wins on every metric anyone ' +
  'is held to: time to first treatment, nursing hours per patient, chair utilization, revenue per ' +
  'patient-month. In the long term it yields higher total cost of care, faster loss of residual kidney ' +
  'function, transport burden carried by patients, and a workforce that can no longer deliver the ' +
  'alternative at scale. No short-term metric registers that last effect, which is why the trade is made ' +
  'repeatedly and never deliberately.';

P.f = '**Policy resistance.** Two real interventions show the structure pushing back. Requiring that patients ' +
  'be educated on all modalities raised awareness without touching the capability that binds, and home share ' +
  'barely moved. Payment models rewarding home starts produced home starts — and a meaningful share of those ' +
  'patients returned to in-center within the year, so the gain landed in the wrong measure. Each fix acted ' +
  'on an arm the structure could route around.';

P.g = '**Testable measures.** A real change would be distinguishable from a metric artifact by:';

const MEAS = [
  'home modality share at 90 and 365 days after incidence, never at start;',
  'home-to-center transfer rate within 12 months, risk-adjusted;',
  'home training nurse FTE per 100 home patients, and days a funded post sits vacant;',
  'median days from modality decision to first home treatment;',
  'residual kidney function at 12 months, stratified by modality;',
  'total cost of care per patient-year, transport included.',
];

P.h = '**The high-leverage intervention, and where it acts.** Pay for home training *capacity* rather than ' +
  'for training events: a per-FTE payment for credentialed home training nurses, accounted separately from ' +
  'treatment revenue and tied to twelve-month home retention rather than to home starts. It acts on the ' +
  'atrophy arm — the link that makes B2 slow and risky — not on the symptomatic loop, which is why it ' +
  'requires no clinician to decide differently. It is also the least obvious lever available; the obvious ' +
  'ones, patient education and per-start payment, both act on inputs to B1.';

P.i = '**Anticipated second-order effects.** Favorably, shortening B2’s delay makes home the fast path as ' +
  'well as the cheap one, inverting the pressure that now favors B1, and trainees rotating through ' +
  'functioning home programs reverse the skill atrophy a fellowship generation later. Unfavorably, a per-FTE ' +
  'payment invites staffing to the payment rather than to demand, and retention-linked payment creates an ' +
  'incentive to select lower-risk patients into home therapy — improving the measure while worsening equity. ' +
  'The second is the serious one, mitigated rather than solved by risk-adjusting retention and publishing ' +
  'case mix.';

P.j = '**Assumptions, stated so they can be attacked.** That the gap is supply-side, meaning home therapy is ' +
  'suited to materially more patients than receive it; if preference or housing is the binding constraint, ' +
  'this intervention will not move the outcome. That training capacity rather than nephrologist willingness ' +
  'is what binds — suggestive, not settled. That payers can observe twelve-month retention reliably enough ' +
  'to pay against it. And that in-center capital resists for at least a decade, so an intervention judged on ' +
  'a three-year horizon will be called a failure before the structure has moved.';

P.k = 'Senge’s law does not say the 1972 solution was wrong. It says solutions propagate structure, and ' +
  'structure outlives the problem it was built for. Chapter 4’s discipline is to name the structure before ' +
  'adding one more fix to it.';

const ORDER = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
const words = ORDER.map((k) => P[k]).concat(CLD.map((c) => c.join(' ')), MEAS)
  .join(' ').replace(/\*\*?/g, '').split(/\s+/).length;

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter portrait; margin: 0.72in 0.9in; }
  body { font-family: Arial, Helvetica, "Liberation Sans", sans-serif;
         font-size: 11pt; margin: 0; color: #000; }
  .hdr { line-height: 1.2; }
  .rule { border-bottom: 0.75pt solid #999; margin: 6pt 0 8pt; }
  h1 { font-size: 11pt; text-align: center; margin: 0 0 8pt; }
  p { text-align: justify; margin: 0; line-height: 1.72; text-indent: 0.3in; }
  .cld { margin: 3pt 0 3pt 0.3in; }
  .cld p { font-size: 10pt; line-height: 1.26; margin: 0 0 2pt; text-indent: -0.25in;
           padding-left: 0.25in; text-align: left; }
  .meas { margin: 2pt 0 3pt 0.3in; }
  .meas p { font-size: 10pt; line-height: 1.26; margin: 0; text-indent: -0.18in;
            padding-left: 0.18in; text-align: left; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b><br>
  655.662 — Introduction to Healthcare Systems Engineering<br>
  Module 3 | M3A3: Chapter 4 Concept
</div>
<div class="rule"></div>

<h1>Yesterday’s Solution, Today’s Structure: Why Dialysis Stays In-Center</h1>

<p>${md(P.a)}</p>
<p>${md(P.b)}</p>
<div class="cld">
${CLD.map(([n, t]) => `  <p><b>${esc(n)}:</b> ${esc(t)}</p>`).join('\n')}
</div>
<p>${md(P.c)}</p>
<p>${md(P.d)}</p>
<p>${md(P.e)}</p>
<p>${md(P.f)}</p>
<p>${md(P.g)}</p>
<div class="meas">
${MEAS.map((t) => `  <p>— ${esc(t)}</p>`).join('\n')}
</div>
<p>${md(P.h)}</p>
<p>${md(P.i)}</p>
<p>${md(P.j)}</p>
<p>${md(P.k)}</p>
`;

fs.writeFileSync('m3a3.html', html);
console.log('html written —', words, 'words');
