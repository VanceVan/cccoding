// M4A1 — Level 1 functional diagram (JHU context-diagram overlay) + N-squared.
// Two pages, US Letter LANDSCAPE, Arial.
const fs = require('fs');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

// ------------------------------------------------- functions and flows ----
// n: [verb line, noun line, x, y]
const FB = {
  1:  ['1. Receive',   'Home Data',    180, 175],
  2:  ['2. Buffer',    'Home Data',    380, 175],
  3:  ['3. Set Up',    'Home Link',    180, 590],
  4:  ['4. Verify',    'Home Link',    380, 590],
  5:  ['5. Format',    'Home Data',    540, 290],
  6:  ['6. Transfer',  'Home Data',    710, 290],
  7:  ['7. Receive',   'Center Data',  880, 290],
  8:  ['8. Normalize', 'Center Data',  540, 445],
  9:  ['9. Trend',     'Center Data',  710, 445],
  10: ['10. Evaluate', 'Alert Rules',  880, 445],
  11: ['11. Display',  'Care Views',  1070, 290],
  12: ['12. Escalate', 'Care Alert',  1070, 445],
};
const BW = 160, BH = 58;

const IN_ENT  = ['Patient', 'PD Cycler', 'Care Partner'];
const OUT_ENT = ['Patient Therapy Trends', 'Monitoring System Status', 'Escalated Care Alert'];
const CTRL    = ['Health Policies', 'Health Laws', 'Infrastructure Regulations'];
const ENAB    = ['Infrastructure', 'Geography', 'Personnel'];

// from, to, noun.  'P'/'C'/'K' = Patient / PD Cycler / Care Partner; 'O#' = output n.
const FLOWS = [
  ['P',  '1',  'Patient Vitals and Symptoms'],
  ['C',  '1',  'Cycler Session Record'],
  ['K',  '3',  'Link Setup Actions'],
  ['1',  '2',  'Raw Home Data'],
  ['2',  '5',  'Buffered Home Data'],
  ['3',  '4',  'Configured Home Link'],
  ['4',  '5',  'Verified Home Link'],
  ['5',  '6',  'Packaged Home Data'],
  ['6',  '7',  'Transmitted Home Data'],
  ['7',  '8',  'Received Center Data'],
  ['8',  '9',  'Normalized Center Data'],
  ['9',  '10', 'Patient Trend Series'],
  ['10', '11', 'Flagged Event and Trend'],
  ['10', '12', 'Flagged Event and Trend'],
  ['11', 'O1', 'Patient Therapy Trends'],
  ['11', 'O2', 'Monitoring System Status'],
  ['12', 'O3', 'Escalated Care Alert'],
];

// ------------------------------------------------------------- diagram ----
const BX = 150, BY = 100, BW_ = 1110, BH_ = 620;   // boundary
const fbox = (n) => {
  const [v, o, x, y] = FB[n];
  return `<rect x="${x}" y="${y}" width="${BW}" height="${BH}" rx="4" fill="#eaf1fa" ` +
         `stroke="#24405c" stroke-width="1.7"/>` +
         `<text x="${x + BW / 2}" y="${y + 25}" text-anchor="middle" font-size="18" ` +
         `font-weight="bold" fill="#14233a">${esc(v)}</text>` +
         `<text x="${x + BW / 2}" y="${y + 45}" text-anchor="middle" font-size="18" ` +
         `font-weight="bold" fill="#14233a">${esc(o)}</text>`;
};
const ar = (pts, w) => `<polyline points="${pts}" fill="none" stroke="#24405c" ` +
  `stroke-width="${w || 1.7}" marker-end="url(#ah)"/>`;
const nl = (x, y, t, anchor) => `<text x="${x}" y="${y}" text-anchor="${anchor || 'middle'}" ` +
  `font-size="14.5" fill="#33465e">${esc(t)}</text>`;
const frameLbl = (x, y, t, anchor) => `<text x="${x}" y="${y}" text-anchor="${anchor || 'middle'}" ` +
  `font-size="17" font-weight="bold" fill="#41566b">${esc(t)}</text>`;

const svg1 = `<svg viewBox="0 0 1565 850" width="100%" xmlns="http://www.w3.org/2000/svg"
  font-family="Arial, Helvetica, sans-serif">
<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7"
  orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#24405c"/></marker></defs>

<rect x="${BX}" y="${BY}" width="${BW_}" height="${BH_}" rx="8" fill="none" stroke="#24405c"
  stroke-width="2.2" stroke-dasharray="10 6"/>
<text x="${BX + 14}" y="${BY + 26}" font-size="16" font-weight="bold" fill="#24405c"
  letter-spacing="0.4">SYSTEM BOUNDARY — PD-RPM Remote Care System</text>

<!-- controls across the top -->
${CTRL.map((t, i) => {
  const x = BX + 230 + i * 330;
  return frameLbl(x, 36, t) + ar(`${x},48 ${x},${BY - 4}`);
}).join('\n')}

<!-- enablers across the bottom -->
${ENAB.map((t, i) => {
  const x = BX + 230 + i * 330;
  return frameLbl(x, 806, t) + ar(`${x},788 ${x},${BY + BH_ + 4}`);
}).join('\n')}

<!-- inputs on the left -->
${frameLbl(136, 202, 'Patient', 'end')}
${frameLbl(136, 287, 'PD Cycler', 'end')}
${frameLbl(136, 624, 'Care Partner', 'end')}
${ar('142,197 178,197')}
${ar('142,282 178,225')}
${ar('142,619 178,619')}
${nl(285, 152, 'Patient Vitals and Symptoms')}
${nl(300, 302, 'Cycler Session Record')}
${nl(300, 672, 'Link Setup Actions')}

<!-- outputs on the right -->
${ar('1232,300 1292,300')}
${ar('1232,340 1292,340')}
${ar('1232,474 1292,474')}
${frameLbl(1300, 296, 'Patient Therapy', 'start')}
${frameLbl(1300, 316, 'Trends', 'start')}
${frameLbl(1300, 336, 'Monitoring System', 'start')}
${frameLbl(1300, 356, 'Status', 'start')}
${frameLbl(1300, 470, 'Escalated Care', 'start')}
${frameLbl(1300, 490, 'Alert', 'start')}

${[1,2,3,4,5,6,7,8,9,10,11,12].map(fbox).join('\n')}

<!-- flows, each labeled with the noun that passes -->
${ar('340,204 378,204')}${nl(359, 252, 'Raw Home Data')}
${ar('460,235 460,256 620,256 620,286')}${nl(648, 248, 'Buffered Home Data', 'start')}
${ar('340,619 378,619')}${nl(359, 582, 'Configured Home Link')}
${ar('505,588 505,312 536,312')}${nl(497, 470, 'Verified Home Link', 'end')}
${ar('700,319 708,319')}${nl(704, 280, 'Packaged Home Data')}
${ar('870,319 878,319')}${nl(878, 280, 'Transmitted Home Data')}
${ar('960,348 960,390 620,390 620,441')}${nl(700, 382, 'Received Center Data')}
${ar('700,474 708,474')}${nl(704, 435, 'Normalized Center Data')}
${ar('870,474 878,474')}${nl(878, 435, 'Patient Trend Series')}
${ar('1042,460 1055,460 1055,318 1066,318')}${nl(1046, 395, 'Flagged Event', 'end')}
${nl(1046, 413, 'and Trend', 'end')}
${ar('1042,485 1066,485')}${nl(1054, 527, 'Flagged Event and Trend')}
</svg>`;

// ---------------------------------------------------------- N-squared ----
const NS = [1,2,3,4,5,6,7,8,9,10,11,12];
const cellOf = {};
FLOWS.forEach(([a, b, n]) => {
  if (/^\d+$/.test(a) && /^\d+$/.test(b)) cellOf[a + '>' + b] = n;
});
const EXTIN = {
  1: 'Patient Vitals and Symptoms <i>(Patient)</i><br>Cycler Session Record <i>(PD Cycler)</i>',
  3: 'Link Setup Actions <i>(Care Partner)</i>',
};
const EXTOUT = {
  11: 'Patient Therapy Trends<br>Monitoring System Status',
  12: 'Escalated Care Alert',
};
const n2 = `<table class="n2">
<tr><th class="ext">External inputs</th>${NS.map((c) => `<th>${c}</th>`).join('')}
<th class="ext">External outputs</th></tr>
${NS.map((r) => `<tr>
<td class="ext">${EXTIN[r] || ''}</td>
${NS.map((c) => (r === c
  ? `<td class="diag">${esc(FB[r][0])}<br>${esc(FB[r][1])}</td>`
  : `<td>${esc(cellOf[r + '>' + c] || '')}</td>`)).join('')}
<td class="ext">${EXTOUT[r] || ''}</td></tr>`).join('')}
</table>`;

// ---------------------------------------------------------------- prose ---
const INTRO =
  'A function is **what the system does**, not what it is, and is written verb-noun so that the physical ' +
  'solution stays open for the trade study. Figure 1 places the twelve Level 1 functions of the PD-RPM ' +
  'remote care system inside the context diagram established earlier in the semester: inputs enter from the ' +
  'left, outputs leave to the right, controls act from above, and enablers support from below. Each arrow is ' +
  'labeled with the **noun** that passes between functions, and the output of one function is the input of ' +
  'the next.';

const N2NOTE =
  'The N² diagram carries the same twelve functions on its diagonal and the same nouns in its cells. ' +
  '**Outputs leave a function horizontally along its row; inputs enter vertically down its column**, so the ' +
  'cell at row 8 and column 9 holds what function 8 delivers to function 9. External inputs and outputs are ' +
  'carried in the flanking columns.';

const ALIGN =
  `**Alignment check.** All ${Object.keys(cellOf).length} internal flows in Figure 1 appear once in the ` +
  'matrix, and the three external inputs and three external outputs appear in the flanking columns. The ' +
  'empty cells are a result ' +
  'in their own right: the matrix is almost strictly upper-triangular, which says the system is a one-way ' +
  'pipeline with no function feeding anything upstream of itself — every loop in this system closes ' +
  'through a clinician, outside the boundary. Controls and enablers act on all twelve functions and are shown ' +
  'in the frame of Figure 1 rather than repeated in every row.';

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
  p { text-align: justify; margin: 0 0 4pt; line-height: 1.32; font-size: 9.5pt; }
  .fig { margin: 3pt 0 2pt; text-align: center; }
  .fig svg { width: 97%; }
  .cap { font-size: 8.5pt; text-align: center; margin: 0; line-height: 1.25; }
  table.n2 { width: 100%; border-collapse: collapse; font-size: 6.1pt;
             table-layout: fixed; margin: 4pt 0 5pt; }
  table.n2 th, table.n2 td { border: 0.5pt solid #9aa7b4; padding: 2pt 1.6pt;
             vertical-align: top; line-height: 1.16; height: 30pt; }
  table.n2 th { background: #24405c; color: #fff; text-align: center; font-size: 7pt;
             height: auto; }
  table.n2 th.ext, table.n2 td.ext { width: 9.2%; }
  table.n2 th.ext { background: #5c6b7a; }
  table.n2 td.ext { background: #f1f1f1; font-size: 6pt; }
  table.n2 td.diag { background: #dce7f5; font-weight: bold; color: #14233a;
             text-align: center; font-size: 6.4pt; }
  .brk { page-break-before: always; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b> &nbsp;|&nbsp; 655.662 — Introduction to Healthcare Systems Engineering
  &nbsp;|&nbsp; Module 4 | M4A1: Functional Diagrams
</div>
<div class="rule"></div>
<h1>Level 1 Functional Diagram — PD-RPM Remote Care System</h1>
<p>${md(INTRO)}</p>
<div class="fig">${svg1}</div>
<p class="cap"><b>Figure 1.</b> Level 1 functional diagram, drawn as a functional overlay on the PD-RPM
context diagram. Twelve verb-noun functions; every flow labeled with the noun that passes.</p>

<div class="brk"></div>
<h1>N&sup2; Diagram — PD-RPM Remote Care System</h1>
<p>${md(N2NOTE)}</p>
${n2}
<p>${md(ALIGN)}</p>
`;

fs.writeFileSync('m4a1.html', html);
console.log('ok —', FLOWS.length, 'flows,', Object.keys(cellOf).length, 'internal cells');
