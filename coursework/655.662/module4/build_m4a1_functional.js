// M4A1 — Level 1 functional diagram + aligned N-squared diagram for PD-RPM.
// Two pages, US Letter portrait, Arial.
const fs = require('fs');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

// ------------------------------------------------- functions and flows ----
const FN = {
  F1: 'F1.0  Acquire Patient and Therapy Data',
  F2: 'F2.0  Buffer and Transport Data',
  F3: 'F3.0  Ingest and Normalize Data',
  F4: 'F4.0  Detect Clinically Significant Events',
  F5: 'F5.0  Present and Escalate for Action',
  F6: 'F6.0  Manage Configuration, Security, and System Health',
};

// id, from, to, content.  "EXT:x" marks an element outside the system boundary.
const FLOWS = [
  [1,  'Patient / Care Partner', 'F1.0', 'Weight, BP, symptom and exit-site entries'],
  [2,  'PD Cycler (external)',   'F1.0', 'Volumes, dwell times, net UF, alarms'],
  [3,  'EHR (external)',         'F3.0', 'Demographics, prescription of record'],
  [4,  'Care Team',              'F4.0', 'Prescription changes and clinical annotations'],
  [5,  'F1.0', 'F2.0', 'Timestamped observation set'],
  [6,  'F2.0', 'F3.0', 'Encrypted upload, 30 min of session end'],
  [7,  'F3.0', 'F2.0', 'Receipt acknowledgment; releases buffer'],
  [8,  'F3.0', 'F4.0', 'Normalized, unit-consistent time series'],
  [9,  'F4.0', 'F5.0', 'Flagged event, severity, supporting trend'],
  [10, 'F5.0', 'F4.0', 'Clinician disposition: actionable or not'],
  [11, 'F6.0', 'F1.0', 'Device configuration and acquisition schedule'],
  [12, 'F6.0', 'F2.0', 'Credentials, certificates, transport policy'],
  [13, 'F6.0', 'F3.0', 'Data model and mapping configuration'],
  [14, 'F6.0', 'F4.0', 'Threshold and detection rule parameters'],
  [15, 'F6.0', 'F5.0', 'Notification routing and on-call roster'],
  [16, 'F1.0', 'F6.0', 'Device health and connectivity status'],
  [17, 'F2.0', 'F6.0', 'Buffer depth and transfer latency'],
  [18, 'F3.0', 'F6.0', 'Ingest completeness and rejected-record log'],
  [19, 'F4.0', 'F6.0', 'Rule execution and detection performance log'],
  [20, 'F5.0', 'F6.0', 'Delivery confirmation and ack timing'],
  [21, 'F3.0', 'EHR (external)', 'Treatment summaries written back'],
  [22, 'F5.0', 'Care Team', 'Triage queue views, alerts, and pages'],
];

// ------------------------------------------------------------- diagram ----
const IN = { fill: '#eaf1fa', stroke: '#24405c', title: '#14233a', sub: '#33465e' };
const EX = { fill: '#f4f4f4', stroke: '#8a8a8a', title: '#444444', sub: '#555555' };

function box(x, y, w, h, title, subs = [], ext = false, ts = 18, ss = 15) {
  const c = ext ? EX : IN;
  const cx = x + w / 2;
  const lead = ss + 4;
  const ty = y + (h - (ts + subs.length * lead)) / 2 + ts * 0.8;
  let o = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${c.fill}" ` +
          `stroke="${c.stroke}" stroke-width="1.6"${ext ? ' stroke-dasharray="7 4"' : ''}/>`;
  o += `<text x="${cx}" y="${ty}" text-anchor="middle" font-size="${ts}" font-weight="bold" ` +
       `fill="${c.title}">${esc(title)}</text>`;
  subs.forEach((t, i) => {
    o += `<text x="${cx}" y="${ty + ts * 0.95 + i * lead}" text-anchor="middle" font-size="${ss}" ` +
         `fill="${c.sub}">${esc(t)}</text>`;
  });
  return o;
}

const arr = (pts) => `<polyline points="${pts}" fill="none" stroke="#24405c" stroke-width="1.7" ` +
                     `marker-end="url(#ah)"/>`;
const bdg = (x, y, n) =>
  `<circle cx="${x}" cy="${y}" r="10.5" fill="#24405c"/>` +
  `<text x="${x}" y="${y + 5.2}" text-anchor="middle" font-size="14" font-weight="bold" ` +
  `fill="#ffffff">${n}</text>`;

const F6ROWS = [[128, 11, 16], [214, 12, 17], [300, 13, 18], [386, 14, 19], [472, 15, 20]];

const svg = `<svg viewBox="0 0 1000 585" width="100%" xmlns="http://www.w3.org/2000/svg"
  font-family="Arial, Helvetica, sans-serif">
<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7"
  orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#24405c"/></marker></defs>

<rect x="215" y="58" width="700" height="502" rx="8" fill="none" stroke="#24405c"
  stroke-width="2" stroke-dasharray="9 5"/>
<text x="226" y="80" font-size="16" font-weight="bold" fill="#24405c" letter-spacing="0.4">
  SYSTEM BOUNDARY — PD-RPM Remote Care System</text>

${box(14, 100, 175, 56, 'Patient /', ['Care Partner'], true)}
${box(14, 180, 175, 56, 'PD Cycler', ['(external device)'], true)}
${box(14, 272, 175, 56, 'EHR', ['(external)'], true)}
${box(14, 414, 175, 100, 'Care Team', ['nurse, nephrologist,', 'home program'], true)}

${box(238, 100, 400, 56, FN.F1)}
${box(238, 186, 400, 56, FN.F2)}
${box(238, 272, 400, 56, FN.F3)}
${box(238, 358, 400, 56, FN.F4)}
${box(238, 444, 400, 56, FN.F5)}
${box(705, 100, 170, 400, 'F6.0', ['Manage', 'Configuration,', 'Security, and', 'System Health'])}

${arr('330,156 330,184')}${bdg(304, 170, 5)}
${arr('330,242 330,270')}${bdg(304, 256, 6)}
${arr('330,328 330,356')}${bdg(304, 342, 8)}
${arr('330,414 330,442')}${bdg(304, 428, 9)}
${arr('540,270 540,244')}${bdg(566, 257, 7)}
${arr('540,442 540,416')}${bdg(566, 429, 10)}

${F6ROWS.map(([y, o, i]) =>
  `${arr(`703,${y - 13} 641,${y - 13}`)}${bdg(671, y - 13, o)}` +
  `${arr(`640,${y + 13} 702,${y + 13}`)}${bdg(671, y + 13, i)}`).join('\n')}

${arr('191,128 235,118')}${bdg(213, 123, 1)}
${arr('191,208 235,140')}${bdg(213, 174, 2)}
${arr('191,288 235,288')}${bdg(213, 288, 3)}
${arr('236,312 192,312')}${bdg(213, 312, 21)}
${arr('191,430 235,398')}${bdg(213, 414, 4)}
${arr('236,478 192,492')}${bdg(213, 485, 22)}
</svg>`;

// ------------------------------------------------------- N-squared grid ----
const C = ['F1.0', 'F2.0', 'F3.0', 'F4.0', 'F5.0', 'F6.0'];
const SHORT = {
  'F1.0': 'F1.0 Acquire Patient and Therapy Data',
  'F2.0': 'F2.0 Buffer and Transport Data',
  'F3.0': 'F3.0 Ingest and Normalize Data',
  'F4.0': 'F4.0 Detect Clinically Significant Events',
  'F5.0': 'F5.0 Present and Escalate for Action',
  'F6.0': 'F6.0 Manage Configuration, Security, System Health',
};
const CELL = {
  'F1.0>F2.0': '5 observation set',
  'F1.0>F6.0': '16 device health status',
  'F2.0>F3.0': '6 encrypted upload',
  'F2.0>F6.0': '17 buffer depth, latency',
  'F3.0>F2.0': '7 receipt acknowledgment',
  'F3.0>F4.0': '8 normalized time series',
  'F3.0>F6.0': '18 ingest completeness',
  'F4.0>F5.0': '9 flagged event + severity',
  'F4.0>F6.0': '19 rule execution log',
  'F5.0>F4.0': '10 clinician disposition',
  'F5.0>F6.0': '20 delivery confirmation',
  'F6.0>F1.0': '11 device configuration',
  'F6.0>F2.0': '12 credentials, policy',
  'F6.0>F3.0': '13 mapping configuration',
  'F6.0>F4.0': '14 threshold parameters',
  'F6.0>F5.0': '15 routing, on-call roster',
};
const EXTIN = {
  'F1.0': '1 vitals, symptom and exit-site entries (Patient / Care Partner)<br>' +
          '2 treatment records (PD Cycler)',
  'F3.0': '3 demographics, prescription of record (EHR)',
  'F4.0': '4 prescription changes, clinical annotations (Care Team)',
};
const EXTOUT = {
  'F3.0': '21 treatment summaries (EHR)',
  'F5.0': '22 queue views, alerts, pages (Care Team)',
};

const grid = `<table class="n2">
<tr><th class="ext">Inputs from outside<br>the boundary</th>
${C.map((c) => `<th>${esc(c)}</th>`).join('')}
<th class="ext">Outputs beyond<br>the boundary</th></tr>
${C.map((r) => `<tr>
  <td class="ext">${EXTIN[r] || ''}</td>
  ${C.map((c) => (r === c
    ? `<td class="diag">${esc(SHORT[r])}</td>`
    : `<td>${esc(CELL[r + '>' + c] || '')}</td>`)).join('')}
  <td class="ext">${EXTOUT[r] || ''}</td>
</tr>`).join('')}
</table>`;

// ----------------------------------------------------------------- page ----
const INTRO =
  'A function is something the system must **do**, stated without naming the thing that does it, so that ' +
  'alternatives can be traded against the same requirement later. The six Level 1 functions below are the ' +
  'complete top-level decomposition of PD-RPM. The boundary is the one fixed earlier in the semester: the ' +
  'PD cycler, the EHR, and clinical decision authority sit outside it. Every flow is numbered; Table 1 ' +
  'gives its content and the N² diagram on page 2 places that same number in its interface cell.';

const N2INTRO =
  'The N² diagram below carries the same six functions on its diagonal. **Outputs leave a function ' +
  'horizontally along its row; inputs enter a function vertically down its column**, so the cell at row ' +
  'F3.0 and column F4.0 holds what F3.0 delivers to F4.0. A blank cell means no interface exists between ' +
  'that ordered pair. External interfaces are carried in the flanking columns rather than omitted, since ' +
  'the boundary crossings are where this system is most likely to fail.';

const ALIGN =
  '**Alignment check.** All twenty-two numbered flows in Figure 1 appear exactly once in the matrix: ' +
  'flows 1–4 in the left column, 5–20 in the sixteen populated off-diagonal cells, and 21–22 ' +
  'in the right column. Fourteen of the thirty off-diagonal pairs are empty, which is itself a result — ' +
  'it says acquisition never talks to detection directly, and that every path to a clinician passes ' +
  'through F5.0.';

const half = Math.ceil(FLOWS.length / 2);
const flowRows = (a, b) => FLOWS.slice(a, b).map(([n, f, t, c]) =>
  `<tr><td class="n">${n}</td><td class="ft">${esc(f)} → ${esc(t)}</td><td>${esc(c)}</td></tr>`
).join('');

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter portrait; margin: 0.7in 0.75in; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Arial, Helvetica, "Liberation Sans", sans-serif;
         font-size: 11pt; margin: 0; color: #000; }
  .hdr { line-height: 1.2; font-size: 10.5pt; }
  .rule { border-bottom: 0.75pt solid #999; margin: 5pt 0 7pt; }
  h1 { font-size: 11pt; text-align: center; margin: 0 0 7pt; }
  h2 { font-size: 10.5pt; margin: 0 0 5pt; }
  p { text-align: justify; margin: 0 0 6pt; line-height: 1.42; }
  .fig { margin: 6pt 0 3pt; text-align: center; }
  .fig svg { width: 87%; }
  .cap { font-size: 9pt; text-align: center; margin: 0 0 7pt; line-height: 1.3; }
  table.fl { width: 100%; border-collapse: collapse; font-size: 7.3pt; }
  table.fl td { vertical-align: top; padding: 0.6pt 2.5pt; line-height: 1.16; }
  table.fl td.n { width: 12pt; font-weight: bold; color: #24405c; text-align: right; }
  table.fl td.ft { width: 72pt; color: #24405c; }
  .two { display: flex; gap: 14pt; }
  .two > div { flex: 1; }
  table.n2 { width: 100%; border-collapse: collapse; font-size: 7.1pt;
             table-layout: fixed; }
  table.n2 th, table.n2 td { border: 0.5pt solid #9aa7b4; padding: 3pt 2.5pt;
             vertical-align: top; line-height: 1.2; }
  table.n2 th { background: #24405c; color: #fff; font-size: 7.4pt; text-align: center; }
  table.n2 th.ext, table.n2 td.ext { background: #f1f1f1; color: #222; width: 13.5%; }
  table.n2 th.ext { background: #5c6b7a; color: #fff; }
  table.n2 td.diag { background: #dce7f5; font-weight: bold; color: #14233a; }
  .brk { page-break-before: always; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b><br>
  655.662 — Introduction to Healthcare Systems Engineering<br>
  Module 4 | M4A1: Functional Diagrams
</div>
<div class="rule"></div>

<h1>Level 1 Functional Diagram and N&sup2; Diagram — PD-RPM Remote Care System</h1>

<p>${md(INTRO)}</p>

<div class="fig">${svg}</div>
<p class="cap"><b>Figure 1.</b> Level 1 functional diagram. Boxes inside the dashed boundary are functions
the system performs; gray dashed boxes are external elements it interfaces with but does not perform.
Numbered circles key to Table 1.</p>

<h2>Table 1. Flow legend</h2>
<div class="two">
  <div><table class="fl">${flowRows(0, half)}</table></div>
  <div><table class="fl">${flowRows(half, FLOWS.length)}</table></div>
</div>

<div class="brk"></div>
<h1>N&sup2; Diagram — PD-RPM Remote Care System</h1>
<p>${md(N2INTRO)}</p>
${grid}
<p style="margin-top:7pt">${md(ALIGN)}</p>
`;

fs.writeFileSync('m4a1.html', html);
const words = [INTRO, N2INTRO, ALIGN].join(' ').replace(/\*\*/g, '').split(/\s+/).length;
console.log('html written —', words, 'words of prose,', FLOWS.length, 'flows');
