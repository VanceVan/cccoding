// M5A2 — single risk, IF-THEN statement, risk cube and risk waterfall.
// Two pages, US Letter LANDSCAPE, Arial. Drafting style matches M5A1.
const fs = require('fs');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*([^*]+)\*/g, '<em>$1</em>');

// ------------------------------------------------------------------ data ----
const R = {
  id: 'R-1',
  title: 'Silent Loss of Home Data Delivery',
  ifthen:
    '<b>IF</b> the home gateway (HG-1) stops delivering completed treatment sessions to the monitoring ' +
    'center for more than 48 hours — through SIM deactivation, carrier outage, firmware fault, or ' +
    'exhaustion of the store-and-forward buffer — <b>THEN</b> no alert is raised for that patient, the ' +
    'care team reads continued silence as clinical stability, and a declining-ultrafiltration or early ' +
    'peritonitis trend progresses undetected until the next scheduled clinic contact.',
  desc:
    'PD-RPM infers patient status from a continuous stream of nightly cycler sessions and daily patient ' +
    'entries. The architecture carries no positive indication that a quiet patient is a connected patient: ' +
    'RE-1 evaluates the records it receives and is silent when it receives none. A healthy patient and a dead ' +
    'link produce the same thing on the triage queue — nothing. This is the one failure mode the system ' +
    'is structurally unequipped to see, because every other failure announces itself as an alert.',
  L: 4, C: 4,
  lbasis:
    'Across a 150-patient home census, carrier outages, SIM provisioning errors and firmware faults are ' +
    'routine rather than exceptional; the program should expect several silent gateways per month.',
  cbasis:
    'Loss of detection lead time, which is the clinical value the system exists to deliver. KPP-1 (alert ' +
    'latency ≤ 15 min) and KPP-3 (data completeness ≥ 95% within 24 h) are both void for the ' +
    'affected patient. A missed early-peritonitis window converts an outpatient antibiotic course into an ' +
    'admission and, in a meaningful fraction of cases, a permanent transfer to in-center hemodialysis.',
};

// id, activity, lever, owner, when, L, C
const MIT = [
  ['M-1',
   'Liveness heartbeat and completeness watchdog. HG-1 emits a keep-alive every 15 min over I-5, independent ' +
   'of session traffic. RE-1 raises a Device Silent condition at two missed heartbeats or 24 h without a ' +
   'session, routed to the home-program queue rather than the clinical triage queue.',
   'Consequence', 'Systems Engineering', 'Integration & test, +3 mo', 4, 3],
  ['M-2',
   'Dual-profile SIM with automatic carrier failover on HG-1, provisioned against two networks, so a single ' +
   'carrier outage or a provisioning error on one profile no longer silences the gateway.',
   'Likelihood', 'Hardware / Supply', '+5 mo', 3, 3],
  ['M-3',
   'Store-and-forward buffer extended from 72 h to 14 days; last-upload status shown on PT-1; 48-hour ' +
   'phone-contact fallback written into the home-program SOP, giving a second detection path through the patient.',
   'Consequence', 'SE and Home Program', '+7 mo', 3, 2],
  ['M-4',
   'Staged firmware deployment from DM-1: no more than 10% of the fleet per wave, with automatic rollback if ' +
   'fleet delivery rate falls below 97% during a wave.',
   'Likelihood', 'Device Management', '+9 mo', 2, 2],
];

const SHORT = ['Heartbeat watchdog', 'Dual-SIM failover', 'Extended buffer + SOP', 'Staged firmware'];
const band = (rf) => (rf <= 4 ? 'Low' : rf <= 12 ? 'Moderate' : 'High');
const BF = { Low: '#cfe0cb', Moderate: '#f0e4b4', High: '#eac7c1' };
const STEPS = [['0', 'Initial assessment', R.L, R.C]]
  .concat(MIT.map((m, i) => [String(i + 1), 'After ' + m[0] + (i === MIT.length - 1 ? ' (residual)' : ''),
    m[5], m[6]]));

// ------------------------------------------------------------- risk cube ----
const CS = 78, OX = 150, OY = 40;
const cx_ = (c) => OX + (c - 1) * CS, cy_ = (l) => OY + (5 - l) * CS;

let cube = '';
for (let l = 1; l <= 5; l++) for (let c = 1; c <= 5; c++) {
  const rf = l * c;
  cube += `<rect x="${cx_(c)}" y="${cy_(l)}" width="${CS}" height="${CS}" fill="${BF[band(rf)]}" ` +
          `stroke="#1a1a1a" stroke-width="0.9"/>` +
          `<text x="${cx_(c) + CS / 2}" y="${cy_(l) + CS / 2 + 6}" text-anchor="middle" font-size="17" ` +
          `fill="#3a3a3a">${rf}</text>`;
}
for (let l = 1; l <= 5; l++)
  cube += `<text x="${OX - 12}" y="${cy_(l) + CS / 2 + 6}" text-anchor="end" font-size="16" ` +
          `fill="#000">${l}</text>`;
for (let c = 1; c <= 5; c++)
  cube += `<text x="${cx_(c) + CS / 2}" y="${OY + 5 * CS + 24}" text-anchor="middle" font-size="16" ` +
          `fill="#000">${c}</text>`;
cube += `<text x="${OX + 2.5 * CS}" y="${OY + 5 * CS + 50}" text-anchor="middle" font-size="16" ` +
        `font-weight="bold" fill="#000">Consequences</text>`;
cube += `<text x="${OX - 44}" y="${OY + 2.5 * CS}" text-anchor="middle" font-size="16" font-weight="bold" ` +
        `fill="#000" transform="rotate(-90 ${OX - 44} ${OY + 2.5 * CS})">Likelihood</text>`;

const pts = STEPS.map(([, , l, c]) => `${cx_(c) + CS / 2},${cy_(l) + CS / 2}`).join(' ');
cube += `<polyline points="${pts}" fill="none" stroke="#1a1a1a" stroke-width="1.6" ` +
        `stroke-dasharray="6 4" marker-end="url(#ah2)"/>`;
STEPS.forEach(([n, , l, c]) => {
  cube += `<circle cx="${cx_(c) + CS / 2}" cy="${cy_(l) + CS / 2}" r="13" fill="#ffffff" ` +
          `stroke="#1a1a1a" stroke-width="1.4"/>` +
          `<text x="${cx_(c) + CS / 2}" y="${cy_(l) + CS / 2 + 5.5}" text-anchor="middle" font-size="15" ` +
          `font-weight="bold" fill="#000">${n}</text>`;
});

const KEY = [
  ['High', 'RF 15–25 — unacceptable.', 'Different approach required.'],
  ['Moderate', 'RF 5–12 — some disruption.', 'Different approach may be required.'],
  ['Low', 'RF 1–4 — minimum impact.', 'Minimum oversight needed.'],
];
let key = `<text x="590" y="58" font-size="15" font-weight="bold" fill="#000">BAND KEY (RF = L × C)</text>`;
KEY.forEach(([b, t1, t2], i) => {
  const y = 76 + i * 46;
  key += `<rect x="590" y="${y}" width="22" height="15" fill="${BF[b]}" stroke="#1a1a1a" stroke-width="0.9"/>` +
         `<text x="620" y="${y + 12}" font-size="13.5" font-weight="bold" fill="#000">${esc(b)}</text>` +
         `<text x="700" y="${y + 12}" font-size="13.5" fill="#000">${esc(t1)}</text>` +
         `<text x="700" y="${y + 28}" font-size="13.5" fill="#000">${esc(t2)}</text>`;
});
key += `<text x="590" y="250" font-size="15" font-weight="bold" fill="#000">PLOTTED POINTS</text>`;
STEPS.forEach(([n, lbl, l, c], i) => {
  const y = 272 + i * 24;
  key += `<text x="594" y="${y}" font-size="13.5" font-weight="bold" fill="#000">${esc(n)}</text>` +
         `<text x="620" y="${y}" font-size="13.5" fill="#000">${esc(lbl)}</text>` +
         `<text x="960" y="${y}" text-anchor="end" font-size="13.5" fill="#000">L${l} × C${c} = ${l * c}` +
         `  (${band(l * c)})</text>`;
});

const svgCube = `<svg viewBox="0 0 980 520" width="100%" xmlns="http://www.w3.org/2000/svg"
  font-family="Arial, Helvetica, sans-serif">
<defs><marker id="ah2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6"
  orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#1a1a1a"/></marker></defs>
${cube}
${key}
</svg>`;

// --------------------------------------------------------- risk waterfall ----
const WX = [140, 340, 540, 740, 940], WEND = 1070;
const PY0 = 40, PY1 = 330, VMAX = 20;
const Y = (v) => PY1 - (v / VMAX) * (PY1 - PY0);
const RFs = STEPS.map(([, , l, c]) => l * c);

let wf = '';
[['High', 12, VMAX], ['Moderate', 4, 12], ['Low', 0, 4]].forEach(([b, lo, hi]) => {
  wf += `<rect x="110" y="${Y(hi)}" width="${WEND - 110}" height="${Y(lo) - Y(hi)}" fill="${BF[b]}"/>`;
});
[0, 4, 8, 12, 16, 20].forEach((v) => {
  wf += `<line x1="110" y1="${Y(v)}" x2="${WEND}" y2="${Y(v)}" stroke="#9a9a9a" stroke-width="0.6"/>` +
        `<text x="102" y="${Y(v) + 5}" text-anchor="end" font-size="14" fill="#000">${v}</text>`;
});
wf += `<line x1="110" y1="${PY0}" x2="110" y2="${PY1}" stroke="#1a1a1a" stroke-width="1.2"/>` +
      `<line x1="110" y1="${PY1}" x2="${WEND}" y2="${PY1}" stroke="#1a1a1a" stroke-width="1.2"/>`;
wf += `<text x="58" y="${(PY0 + PY1) / 2}" text-anchor="middle" font-size="15" font-weight="bold" ` +
      `fill="#000" transform="rotate(-90 58 ${(PY0 + PY1) / 2})">Risk Factor (RF = L × C)</text>`;

let path = `${WX[0]},${Y(RFs[0])}`;
for (let i = 1; i < RFs.length; i++) path += ` ${WX[i]},${Y(RFs[i - 1])} ${WX[i]},${Y(RFs[i])}`;
path += ` ${WEND},${Y(RFs[RFs.length - 1])}`;
wf += `<polyline points="${path}" fill="none" stroke="#1a1a1a" stroke-width="2.2"/>`;

const TICKS = ['now', '+3 mo', '+5 mo', '+7 mo', '+9 mo'];
RFs.forEach((v, i) => {
  wf += `<circle cx="${WX[i]}" cy="${Y(v)}" r="5" fill="#1a1a1a"/>` +
        `<rect x="${WX[i] - 18}" y="${Y(v) - 28}" width="36" height="16" fill="#ffffff"/>` +
        `<text x="${WX[i]}" y="${Y(v) - 16}" text-anchor="middle" font-size="14.5" font-weight="bold" ` +
        `fill="#000">${v}</text>` +
        `<line x1="${WX[i]}" y1="${PY1}" x2="${WX[i]}" y2="${PY1 + 6}" stroke="#1a1a1a" stroke-width="1"/>` +
        `<text x="${WX[i]}" y="${PY1 + 24}" text-anchor="middle" font-size="14" fill="#000">${TICKS[i]}</text>`;
});
MIT.forEach((m, i) => {
  const x = WX[i + 1];
  wf += `<text x="${x}" y="${PY1 + 46}" text-anchor="middle" font-size="14" font-weight="bold" ` +
        `fill="#000">${esc(m[0])}</text>`;
  wf += `<text x="${x}" y="${PY1 + 63}" text-anchor="middle" font-size="13" ` +
        `fill="#000">${esc(SHORT[i])}</text>`;
});
wf += `<text x="${WX[0]}" y="${PY1 + 46}" text-anchor="middle" font-size="14" font-weight="bold" ` +
      `fill="#000">Initial</text>`;

const svgWF = `<svg viewBox="0 0 1120 420" width="100%" xmlns="http://www.w3.org/2000/svg"
  font-family="Arial, Helvetica, sans-serif">${wf}</svg>`;

// ---------------------------------------------------------------- tables ----
const regTbl = `<table class="t">
<tr><td class="k">Risk ID / title</td><td colspan="3"><b>${esc(R.id)} — ${esc(R.title)}</b></td></tr>
<tr><td class="k">Risk statement</td><td colspan="3">${R.ifthen}</td></tr>
<tr><td class="k">Description</td><td colspan="3">${esc(R.desc)}</td></tr>
<tr><td class="k">Initial assessment</td>
    <td class="n">Likelihood<br><b>${R.L}</b></td>
    <td>${esc(R.lbasis)}</td><td class="bandcell" style="background:${BF[band(R.L * R.C)]}">
    RF = ${R.L} × ${R.C} = <b>${R.L * R.C}</b><br>${band(R.L * R.C)}</td></tr>
<tr><td class="k">Consequences if realized</td>
    <td class="n">Consequence<br><b>${R.C}</b></td>
    <td colspan="2">${esc(R.cbasis)}</td></tr>
<tr><td class="k">Handling strategy</td><td colspan="3"><b>Control / mitigation</b>, with <b>monitor</b> on the
    residual. Avoidance would mean relaxing the requirement the program exists to meet. Transference moves
    carrier uptime to an SLA but leaves the clinical consequence with the provider. Acceptance is not available
    at RF 16, which the JHU ownership model places on the Risk Mitigation Execution List under continuous
    executive attention.</td></tr>
</table>`;

const mitTbl = `<table class="t m">
<tr><th>ID</th><th>Mitigation activity</th><th>Acts on</th><th>Owner</th><th>Complete by</th>
<th>L</th><th>C</th><th>RF</th><th>Band</th></tr>` +
  MIT.map(([id, a, lev, own, when, l, c]) =>
    `<tr><td class="id">${esc(id)}</td><td>${esc(a)}</td><td>${esc(lev)}</td><td>${esc(own)}</td>` +
    `<td>${esc(when)}</td><td class="n">${l}</td><td class="n">${c}</td><td class="n"><b>${l * c}</b></td>` +
    `<td class="n" style="background:${BF[band(l * c)]}">${band(l * c)}</td></tr>`).join('') + `</table>`;

// ----------------------------------------------------------------- prose ----
const RES =
  '**Residual risk and verification.** After M-4 the risk stands at L2 × C2 = 4, Low. It is not closed: ' +
  'it moves off the Risk Mitigation Execution List onto the **Risk Watch List** under continuous monitoring, ' +
  'because both remaining drivers — carrier behaviour and firmware — sit outside this program’s ' +
  'control. Verification is the monthly fleet delivery-rate report measured against KPP-3; if any month falls ' +
  'below 95 percent, or if any single patient records two Device Silent conditions in a quarter, the risk is ' +
  'reopened at its original level rather than re-scored downward.';

const MM =
  '**On mental models.** The hard part of this risk was seeing it at all. Every other PD-RPM failure ' +
  'announces itself as an alert; this one is indistinguishable from success from inside the triage queue, and ' +
  'the dashboard actively reinforces the model that produces it — *no alerts means no problem*. M-1 is ' +
  'placed first in the sequence for that reason. It buys the smallest reduction in raw risk factor of the ' +
  'four activities, but it is the only one that makes the faulty model false by construction: after it, ' +
  'silence is itself an alert.';

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter landscape; margin: 0.45in 0.5in; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Arial, Helvetica, "Liberation Sans", sans-serif;
         font-size: 10pt; margin: 0; color: #000; }
  .hdr { font-size: 9.5pt; line-height: 1.2; }
  .rule { border-bottom: 0.75pt solid #999; margin: 4pt 0 5pt; }
  h1 { font-size: 10.5pt; text-align: center; margin: 0 0 5pt; }
  h2 { font-size: 9.5pt; margin: 6pt 0 2pt; }
  p { text-align: justify; margin: 0 0 4pt; line-height: 1.33; font-size: 9pt; }
  table.t { width: 100%; border-collapse: collapse; font-size: 8pt; margin: 2pt 0 5pt; }
  table.t th, table.t td { border: 0.6pt solid #1a1a1a; padding: 2.4pt 4pt;
       vertical-align: top; line-height: 1.26; }
  table.t th { background: #e4e4e4; font-weight: bold; text-align: left; }
  table.t td.k { width: 92pt; font-weight: bold; background: #f3f3f3; }
  table.t td.n { text-align: center; }
  table.t td.bandcell { width: 74pt; text-align: center; }
  table.t.m { font-size: 7.6pt; }
  table.t.m td.id { font-weight: bold; width: 18pt; }
  .fig { margin: 2pt 0 1pt; text-align: center; }
  .cube svg { width: 76%; }
  .wf svg { width: 86%; }
  .cap { font-size: 8.5pt; text-align: center; margin: 0 0 4pt; line-height: 1.25; }
  .brk { page-break-before: always; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b> &nbsp;|&nbsp; 655.662 — Introduction to Healthcare Systems Engineering
  &nbsp;|&nbsp; Module 5 | M5A2: Risk Mitigation
</div>
<div class="rule"></div>
<h1>Risk R-1 — Silent Loss of Home Data Delivery, PD-RPM Remote Care System</h1>
${regTbl}
<div class="fig cube">${svgCube}</div>
<p class="cap"><b>Figure 1. Risk cube.</b> Initial assessment and the position after each mitigation activity.
Color is the third dimension of the cube; the dashed path is the planned migration from High to Low.</p>

<div class="brk"></div>
<h1>Mitigation Activities and Risk Waterfall — R-1</h1>
${mitTbl}
<div class="fig wf">${svgWF}</div>
<p class="cap"><b>Figure 2. Risk waterfall.</b> Risk factor against time. Each step down is taken only when the
activity beneath it is verified complete, so the risk is held at its current level until then.</p>
<p>${md(RES)}</p>
<p>${md(MM)}</p>
`;

fs.writeFileSync('m5a2.html', html);
console.log('RF path:', RFs.join(' → '), '| bands:', RFs.map(band).join(', '));
