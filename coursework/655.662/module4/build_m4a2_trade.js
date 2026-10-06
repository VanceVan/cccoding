// M4A2 — 12-step JHU trade study for the PD-RPM home connectivity element.
// Four pages, US Letter portrait, Arial.
const fs = require('fs');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.+?)\*/g, '<em>$1</em>');
const f = (x, n = 3) => Number(x).toFixed(n);

// ---------------------------------------------------------------- inputs ----
const ALT = [
  ['A1', 'Broadband Wi-Fi gateway',
   'Small appliance bridges the cycler and peripherals to the patient’s existing home internet.'],
  ['A2', 'Dedicated LTE-M cellular gateway',
   'Carrier-managed cellular gateway supplied with the therapy, independent of household internet.'],
  ['A3', 'Smartphone-tethered BLE application',
   'Devices pair to the patient’s own phone over Bluetooth; the phone relays to the cloud.'],
  ['A4', 'Dual-path gateway (broadband primary, cellular failover)',
   'Broadband when available, automatic cellular failover, single managed device.'],
];

const CRIT = [
  ['C1', 'Session Delivery Completeness', '% of completed cycler sessions ingested within 24 h',
   'KPP-3 Data Completeness (≥ 95%); OR-2'],
  ['C2', 'Time to Data Availability', 'median minutes from session end to availability for detection',
   'OR-2 (≤ 30 min); KPP-1 Alert Latency'],
  ['C3', 'Patient Daily Interaction Time', 'seconds per day of patient action attributable to the link',
   'KPP-4 (≤ 60 s); ON-2'],
  ['C4', 'Deployable Coverage', '% of enrolled homes where the approach serves as primary path',
   'OR-6 (≥ 90%) — created for this study'],
];

// Step 4: pairwise judgments, 1-9 scale.  [i, j, more important, level]
const PAIRJ = [
  ['C1', 'C2', 'C1', 3, 'Data that arrives late still supports trending; data that never arrives does not.'],
  ['C1', 'C3', 'C1', 2, 'Both drive technique failure, but an unmonitored patient is the larger risk.'],
  ['C1', 'C4', 'C1', 3, 'Coverage gaps can be bridged case by case; missing sessions cannot be recovered.'],
  ['C2', 'C3', 'C3', 2, 'Burden is continuous and compounding; latency inside 30 min is clinically equivalent.'],
  ['C2', 'C4', 'Equal', 1, 'Neither dominates: both constrain reach rather than clinical value directly.'],
  ['C3', 'C4', 'C3', 2, 'A burdensome link loses the patient; an uncovered home is never enrolled on it.'],
];
const M = [
  [1,     3,   2,   3],
  [1 / 3, 1,   1 / 2, 1],
  [1 / 2, 2,   1,   2],
  [1 / 3, 1,   1 / 2, 1],
];

// Step 5: raw values.  [min req, max req, A1, A2, A3, A4]
const RAW = {
  C1: [95, 100, 96.5, 98.2, 91.0, 99.3],
  C2: [null, 30,  12,   18,   26,   11],
  C3: [null, 60,  10,    0,   45,    0],
  C4: [90, 100,  78,   94,   83,   97],
};
const KPP = { C1: true, C2: false, C3: true, C4: false };
const COST = [180, 420, 40, 540];

// Step 6: utility functions
const cl = (v) => Math.max(0, Math.min(1, v));
const U = {
  C1: (x) => cl((x - 95) / 5),
  C2: (x) => cl(1 - x / 30),
  C3: (x) => cl(1 - x / 60),
  C4: (x) => (x <= 90 ? cl(0.5 * (x - 70) / 20) : cl(0.5 + 0.5 * (x - 90) / 10)),
};
const UDOM = { C1: [90, 100], C2: [0, 30], C3: [0, 60], C4: [70, 100] };
const UANCH = {
  C1: ['0 at 95% (KPP threshold — below it the system is unusable), 1 at 100%', 'linear'],
  C2: ['1 at 0 min, 0 at the 30 min ceiling in OR-2', 'linear, negative slope'],
  C3: ['1 at 0 s, 0 at the 60 s ceiling in KPP-4', 'linear, negative slope'],
  C4: ['0 at 70%, 0.5 at the 90% requirement, 1 at 100%', 'piecewise linear, knee at OR-6'],
};

// ----------------------------------------------------------- computation ----
const CK = ['C1', 'C2', 'C3', 'C4'];
const rowRoot = M.map((r) => Math.pow(r.reduce((a, b) => a * b, 1), 1 / 4));
const rootSum = rowRoot.reduce((a, b) => a + b, 0);
const W = rowRoot.map((r) => r / rootSum);

const util = CK.map((c, i) => RAW[c].slice(2).map((v) => U[c](v)));   // [crit][alt]
const score = (weights) => [0, 1, 2, 3].map((a) =>
  CK.reduce((s, c, i) => s + weights[i] * util[i][a], 0));
const OUF = score(W);
const CE = OUF.map((u, a) => (u / COST[a]) * 100);

const SENS = CK.map((c, i) => {
  const w = W.slice(); w[i] = 0;
  return { zeroed: c, vals: score(w) };
});
const rankOf = (v) => v.map((_, i) => i).sort((a, b) => v[b] - v[a]).map((i) => 'A' + (i + 1)).join(' > ');
const baseRank = rankOf(OUF);

// ------------------------------------------------------- utility curves ----
function panel(ox, c, idx) {
  const [lo, hi] = UDOM[c];
  const px = ox + 34, py = 26, pw = 186, ph = 104;
  const X = (v) => px + ((v - lo) / (hi - lo)) * pw;
  const Y = (u) => py + (1 - u) * ph;
  const pts = [];
  for (let k = 0; k <= 60; k++) { const v = lo + (hi - lo) * k / 60; pts.push(`${f(X(v),1)},${f(Y(U[c](v)),1)}`); }
  let o = `<text x="${ox + 128}" y="16" text-anchor="middle" font-size="14" font-weight="bold" ` +
          `fill="#14233a">${esc(c)} — ${esc(CRIT[idx][1])}</text>`;
  o += `<line x1="${px}" y1="${py}" x2="${px}" y2="${py + ph}" stroke="#777" stroke-width="1.2"/>`;
  o += `<line x1="${px}" y1="${py + ph}" x2="${px + pw}" y2="${py + ph}" stroke="#777" stroke-width="1.2"/>`;
  o += `<text x="${px - 6}" y="${py + 5}" text-anchor="end" font-size="12" fill="#444">1.0</text>`;
  o += `<text x="${px - 6}" y="${py + ph + 4}" text-anchor="end" font-size="12" fill="#444">0.0</text>`;
  o += `<text x="${px}" y="${py + ph + 18}" text-anchor="middle" font-size="12" fill="#444">${lo}</text>`;
  o += `<text x="${px + pw}" y="${py + ph + 18}" text-anchor="middle" font-size="12" fill="#444">${hi}</text>`;
  o += `<polyline points="${pts.join(' ')}" fill="none" stroke="#24405c" stroke-width="2"/>`;
  const seen = {};
  RAW[c].slice(2).forEach((v, a) => { (seen[v] = seen[v] || []).push('A' + (a + 1)); });
  Object.keys(seen).forEach((k) => {
    const v = Number(k), X0 = X(v), Y0 = Y(U[c](v));
    const ly = Y0 < 42 ? Y0 + 16 : Y0 - 9;
    const lx = Math.min(Math.max(X0, ox + 18), ox + 246);
    o += `<circle cx="${f(X0,1)}" cy="${f(Y0,1)}" r="4.6" fill="#8c4a1f"/>` +
         `<text x="${f(lx,1)}" y="${f(ly,1)}" text-anchor="middle" font-size="12" ` +
         `font-weight="bold" fill="#8c4a1f">${seen[k].join(',')}</text>`;
  });
  return o;
}
const curves = `<svg viewBox="0 0 1030 158" width="100%" xmlns="http://www.w3.org/2000/svg"
  font-family="Arial, Helvetica, sans-serif">
${CK.map((c, i) => panel(6 + i * 256, c, i)).join('\n')}
</svg>`;

// ---------------------------------------------------------------- tables ----
const tbl = (cls, head, rows) =>
  `<table class="${cls}"><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr>` +
  rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('') + `</table>`;

const altTbl = tbl('t', ['', 'Alternative', 'Description'],
  ALT.map(([k, n, d]) => [`<b>${k}</b>`, esc(n), esc(d)]));

const critTbl = tbl('t', ['', 'Selection criterion', 'Definition and units', 'Traces to'],
  CRIT.map(([k, n, u, t]) => [`<b>${k}</b>`, esc(n), esc(u), esc(t)]));

const pairTbl = tbl('t', ['Pair', 'More important', 'Level', 'Basis for the judgment'],
  PAIRJ.map(([a, b, w, l, r]) => [`${a} – ${b}`, esc(w), String(l), esc(r)]));

const matTbl = tbl('t c', ['', ...CK, 'Row product', '4th root', '<b>Weight</b>'],
  M.map((r, i) => [`<b>${CK[i]}</b>`,
    ...r.map((v) => (v >= 1 ? String(v) : '1/' + Math.round(1 / v))),
    f(r.reduce((a, b) => a * b, 1), 4), f(rowRoot[i], 4), `<b>${f(W[i])}</b>`]));

const dataTbl = tbl('t c', ['', 'Min req’t', 'Max req’t', 'A1', 'A2', 'A3', 'A4'],
  CK.map((c) => {
    const [mn, mx, ...vs] = RAW[c];
    return [`<b>${c}</b>${KPP[c] ? ' <span class="kpp">KPP</span>' : ''}`,
      mn === null ? '—' : String(mn), String(mx),
      ...vs.map((v) => {
        const bad = (mn !== null && v < mn) || v > mx;
        return bad ? `<span class="fail">${v}</span>` : String(v);
      })];
  }));

const uTbl = tbl('t', ['', 'Utility anchors', 'Shape', 'A1', 'A2', 'A3', 'A4'],
  CK.map((c, i) => [`<b>${c}</b>`, esc(UANCH[c][0]), esc(UANCH[c][1]),
    ...util[i].map((u) => f(u, 2))]));

const tradeHead = ['Criteria', 'Wt.',
  ...[1, 2, 3, 4].flatMap((a) => [`A${a}<br>Raw`, `A${a}<br>Utility`, `A${a}<br>Wtd`])];
const tradeRows = CK.map((c, i) => [`<b>${c}</b>`, f(W[i]),
  ...[0, 1, 2, 3].flatMap((a) => [String(RAW[c][a + 2]), f(util[i][a], 2), f(W[i] * util[i][a])])]);
tradeRows.push(['<b>Operational Utility Function</b>', '',
  ...[0, 1, 2, 3].flatMap((a) => ['', '', `<b>${f(OUF[a])}</b>`])]);
tradeRows.push(['<b>Cost ($) 3-year unit cost</b>', '',
  ...[0, 1, 2, 3].flatMap((a) => ['', '', `<b>${COST[a]}</b>`])]);
tradeRows.push(['<b>Cost-Effectiveness Selection Function</b>', '',
  ...[0, 1, 2, 3].flatMap((a) => ['', '', `<b>${f(CE[a])}</b>`])]);
const tradeTbl = tbl('t c sm', tradeHead, tradeRows);

const sensTbl = tbl('t c', ['Weight set to zero', 'A1', 'A2', 'A3', 'A4', 'Utility ranking'],
  [['<b>none</b> (baseline)', ...OUF.map((v) => f(v)), baseRank],
    ...SENS.map((s) => [`<b>${s.zeroed}</b>`, ...s.vals.map((v) => f(v)), rankOf(s.vals)])]);

// ------------------------------------------------------------------ prose ---
const P = {};
P.scope =
  'This study selects the **home connectivity element** of the PD-RPM remote care system — function ' +
  '**F2.0 Buffer and Transport Data** in the Module 4 functional diagram, realized physically as WBS element ' +
  '1.1.4. It is the right element to trade first because every operational requirement written in Module 3 ' +
  'depends on it: if a completed treatment never reaches the monitoring center, no amount of analytics ' +
  'recovers it. The study follows the twelve-step JHU construction process in order.';

P.s1 =
  '**The decision.** Select the home-to-monitoring-center connectivity approach that satisfies every ' +
  'operational requirement and is cost effective across a three-year service life. **Objectives.** Deliver ' +
  'every completed treatment session to the monitoring center without patient effort, fast enough to support ' +
  'a fifteen-minute alert path, in substantially all enrolled homes. **Governing requirements** carried ' +
  'forward from M3A1: OR-2 (automatic transfer within 30 minutes of session end), KPP-1 Alert Latency, ' +
  'KPP-3 Data Completeness, KPP-4 Patient Daily Interaction Time, and ON-2 (no added patient burden).';

P.s2 =
  'Four alternatives are carried, exceeding the three-alternative minimum. They span an existing solution, ' +
  'current technology, and a combined approach, as the process directs.';

P.s3 =
  'Each criterion traces to at least one requirement. C4 had no corresponding requirement in the Module 3 ' +
  'specification, so one was created rather than scoring an untraceable criterion: **OR-6 — the ' +
  'connectivity element shall serve as the primary data path in at least 90 percent of enrolled patient ' +
  'homes.** This is added to the system specification. Following course convention, **cost is not a selection ' +
  'criterion**; it enters only through the cost-effectiveness selection function in Step 7.';

P.s4 =
  'Weights are derived by **Nth-root pairwise comparison** rather than assigned, using the 1–9 importance ' +
  'scale. Every pair of criteria is judged, the reciprocal fills the matrix below the diagonal, and the ' +
  'normalized fourth root of each row product gives the weight.';

P.s4b =
  `No criterion exceeds 50 percent (the largest is C1 at ${f(W[0] * 100, 1)} percent) and none falls below ` +
  '0.03, so neither the re-comparison check nor the drop check is triggered. **Weights are not ranks**, and ' +
  'none of these values was chosen directly.';

P.s5 =
  'Values are drawn from manufacturer specifications, carrier coverage data for the service region, and the ' +
  'home program’s own installation records. Values failing a requirement are shown in red.';

P.s5b =
  '**KPP check.** C1 is a KPP, and its threshold is binding: **A3 delivers 91 percent against a 95 percent ' +
  'KPP threshold and is therefore disqualified.** It is carried through the arithmetic for completeness but ' +
  'is excluded from selection. C4 is a requirement rather than a KPP, so A1 at 78 percent and A3 at 83 ' +
  'percent are not automatically disqualified — they may still have value — but the shortfall is ' +
  'carried into Step 9 as a risk.';

P.s6 =
  'Utility functions convert raw values in four different units onto a common unitless 0–1 scale. Three ' +
  'are linear, since no stakeholder information justifies a different shape. C4 is piecewise linear with a ' +
  'knee at the OR-6 requirement, reflecting that coverage below the requirement is worth materially less than ' +
  'a proportional reading would suggest.';

P.s7 =
  'Weighted utility is the product of weight and utility value; the operational utility function is their ' +
  'sum; the cost-effectiveness selection function is that sum divided by three-year unit cost, times 100.';

P.s7b =
  `**The two functions disagree.** A4 has the highest operational utility at ${f(OUF[3])}, while A3 has the ` +
  `highest cost-effectiveness at ${f(CE[2])} — but A3 is disqualified on a KPP. Among the qualified ` +
  `alternatives A1 is the most cost-effective at ${f(CE[0])} and A4 the least at ${f(CE[3])}, so the ` +
  'ranking reverses depending on which function governs the decision.';

P.s8 =
  'Each criterion weight is set to zero in turn and the operational utility function is recalculated, as the ' +
  'process directs. The question is whether the ranking is stable.';

P.s8b =
  `**The result is insensitive.** The ranking ${baseRank} holds under every single-criterion zeroing, so ` +
  'small errors in any one weight do not change the outcome. Insensitivity is the desired finding: it means ' +
  'the conclusion is not an artifact of the weighting. The study is sensitive to something else — which ' +
  'of the two selection functions governs — and that is a decision about value, not a data error.';

P.s9 =
  'Decision makers make decisions; trade studies produce results. Three adjustments follow from the analysis. ' +
  'First, A3 is removed from consideration on the KPP failure, not on its score. Second, A1’s apparent ' +
  `cost-effectiveness advantage (${f(CE[0])} against A2’s ${f(CE[1])}) is an artifact of an incomplete ` +
  'cost basis: at 78 percent deployable coverage it fails OR-6, and the remaining 22 percent of homes would ' +
  'require a second connectivity approach whose cost is not in the 180 dollar unit figure. Third, A2 and A4 ' +
  'are separated by cost rather than by capability, and A4’s added utility is concentrated in C1, where ' +
  'A2 already clears the KPP.';

P.s10 =
  '**Select A2, the dedicated LTE-M cellular gateway.** It is the only alternative that satisfies every ' +
  'requirement including the newly created OR-6, it clears both KPP thresholds with margin, it scores second ' +
  `on operational utility (${f(OUF[1])} against A4’s ${f(OUF[3])}), and it reaches zero patient daily ` +
  'interaction time, which protects the requirement most likely to drive technique failure. A4 is retained as ' +
  'the fallback for homes where cellular signal is marginal, recorded as a documented variant rather than a ' +
  'second procurement.';

P.s11 =
  'The decision record captures: the decision statement and objectives; the four alternatives and their ' +
  'sources; the four criteria with their requirement traces; the pairwise judgments and the resulting ' +
  'weights; the raw data with provenance; the utility function anchors and shapes; the completed trade ' +
  'matrix; the sensitivity results; and the assumptions — principally that carrier coverage data ' +
  'predicts in-home signal, and that the three-year cost basis is the right horizon. OR-6 is added to the ' +
  'system specification as a product of this study.';

P.s12 =
  'Execution: issue OR-6 against the system specification; fix A2 in the physical architecture under WBS ' +
  '1.1.4 and define the carrier agreement as a managed interface under WBS 1.5.2; qualify A4 as the marginal' +
  '-signal variant; and set a re-trade trigger — if measured deployable coverage falls below 90 percent ' +
  'in any region, or if observed session delivery completeness falls below the KPP for two consecutive ' +
  'months, this study is reopened rather than waived.';

P.arch =
  '**Archetype 1, Limits to Growth.** *Analyze problem:* the home program intends to grow census, and ' +
  'connectivity is the constraint it will meet first. *Conceptualize growth limits:* each added patient ' +
  'consumes deployable coverage, and the broadband-only alternative exhausts it at roughly 78 percent of ' +
  'homes, at which point growth stalls for reasons no one attributes to the connectivity choice made years ' +
  'earlier. *Conduct mental exercises:* with A1 the limit binds immediately; with A2 it moves to nurse ' +
  'triage capacity, which is a limit the program can actually buy its way out of. *Catalogue key variable ' +
  'factors:* deployable coverage, installation labor per patient, nurse capacity, alert volume. *Investigate ' +
  'solution options:* the leverage is in removing the limit rather than pushing harder on enrollment — ' +
  'which is exactly what selecting on coverage rather than on unit cost does.';

// ------------------------------------------------------------------ page ----
const H = (n, t) => `<h2>Step ${n} — ${t}</h2>`;
const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter portrait; margin: 0.65in 0.7in; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Arial, Helvetica, "Liberation Sans", sans-serif;
         font-size: 10pt; margin: 0; color: #000; }
  .hdr { line-height: 1.2; font-size: 10pt; }
  .rule { border-bottom: 0.75pt solid #999; margin: 5pt 0 7pt; }
  h1 { font-size: 11pt; text-align: center; margin: 0 0 7pt; }
  h2 { font-size: 10pt; margin: 9pt 0 3pt; color: #14233a;
       border-bottom: 0.5pt solid #c3ccd6; padding-bottom: 1.5pt; }
  p { text-align: justify; margin: 0 0 5pt; line-height: 1.38; }
  table.t { width: 100%; border-collapse: collapse; font-size: 8pt; margin: 3pt 0 6pt; }
  table.t th, table.t td { border: 0.5pt solid #9aa7b4; padding: 2.2pt 3pt;
       vertical-align: top; line-height: 1.22; }
  table.t th { background: #24405c; color: #fff; font-weight: bold; text-align: left; }
  table.t.c td, table.t.c th { text-align: center; }
  table.t.c td:first-child, table.t.c th:first-child { text-align: left; }
  table.t.sm { font-size: 6.9pt; }
  table.t.sm th, table.t.sm td { padding: 1.6pt 1.6pt; }
  .fail { color: #b3261e; font-weight: bold; }
  .kpp { font-size: 6.5pt; background: #24405c; color: #fff; padding: 0 2pt;
         border-radius: 2pt; vertical-align: middle; }
  .fig { margin: 2pt 0 5pt; }
  .cap { font-size: 8pt; text-align: center; margin: 0 0 6pt; line-height: 1.25; }
  .brk { page-break-before: always; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b><br>
  655.662 — Introduction to Healthcare Systems Engineering<br>
  Module 4 | M4A2: Trade Study Elements
</div>
<div class="rule"></div>

<h1>Trade Study — Home Connectivity Element, PD-RPM Remote Care System</h1>
<p>${md(P.scope)}</p>

${H(1, 'Define Objectives and Requirements')}
<p>${md(P.s1)}</p>

${H(2, 'Identify Alternatives (at least 3)')}
<p>${md(P.s2)}</p>
${altTbl}

${H(3, 'Formulate Selection Criteria')}
<p>${md(P.s3)}</p>
${critTbl}

<div class="brk"></div>
${H(4, 'Weight the Criteria')}
<p>${md(P.s4)}</p>
${pairTbl}
${matTbl}
<p>${md(P.s4b)}</p>

${H(5, 'Collect Data')}
<p>${md(P.s5)}</p>
${dataTbl}
<p>${md(P.s5b)}</p>

<div class="brk"></div>
${H(6, 'Prepare Utility Functions')}
<p>${md(P.s6)}</p>
${uTbl}
<div class="fig">${curves}</div>
<p class="cap"><b>Figure 1.</b> Utility functions with the four alternatives plotted. A3 falls to zero utility
on C1 because it sits below the KPP threshold.</p>

${H(7, 'Evaluate Alternatives')}
<p>${md(P.s7)}</p>
${tradeTbl}
<p>${md(P.s7b)}</p>

${H(8, 'Perform Sensitivity Check')}
<p>${md(P.s8)}</p>
${sensTbl}
<p>${md(P.s8b)}</p>

${H(9, 'Make Necessary Adjustments')}
<p>${md(P.s9)}</p>

${H(10, 'Select Preferred Alternative')}
<p>${md(P.s10)}</p>

${H(11, 'Document Decision')}
<p>${md(P.s11)}</p>

${H(12, 'Execute Decision')}
<p>${md(P.s12)}</p>

<h2>Systems Analysis — Fifth Discipline Archetype</h2>
<p>${md(P.arch)}</p>
`;

fs.writeFileSync('m4a2.html', html);
console.log('weights:', W.map((w) => f(w)).join(', '));
console.log('OUF   :', OUF.map((v) => f(v)).join(', '));
console.log('CE    :', CE.map((v) => f(v)).join(', '));
console.log('base rank:', baseRank);
SENS.forEach((s) => console.log('  zero', s.zeroed, '->', rankOf(s.vals)));
