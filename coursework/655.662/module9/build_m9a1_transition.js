// M9A1 — PDF build. Content from m9a1_content.js.
const fs = require('fs');
const C = require('./m9a1_content.js');
const esc = C.esc;
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*([^*]+)\*/g, '<em>$1</em>');

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter portrait; margin: 0.6in 0.78in; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Arial, Helvetica, "Liberation Sans", sans-serif;
         font-size: 10.2pt; margin: 0; color: #000; }
  .hdr { line-height: 1.2; font-size: 10pt; }
  .rule { border-bottom: 0.75pt solid #999; margin: 5pt 0 7pt; }
  h1 { font-size: 11.6pt; margin: 0 0 6pt; }
  p { text-align: left; margin: 0 0 4.5pt; line-height: 1.23; }
  table.s { width: 100%; border-collapse: collapse; font-size: 8pt; margin: 5pt 0 6pt; }
  table.s th, table.s td { border: 0.6pt solid #1a1a1a; padding: 2.2pt 4pt;
       vertical-align: top; line-height: 1.19; }
  table.s th { background: #e8e8e8; text-align: left; }
  td.n { text-align: center; font-weight: bold; }
  td.it b { display: block; }
  td.it span { color: #444; font-size: 7.3pt; }
  .foot { font-size: 9.2pt; }
  .brk { page-break-before: always; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b><br>
  655.662 — Introduction to Healthcare Systems Engineering<br>
  Module 9 | M9A1: Production Transition
</div>
<div class="rule"></div>

<h1>${esc(C.TITLE)}</h1>
<p>${md(C.INTRO)}</p>

<table class="s">
<colgroup><col style="width:4%"><col style="width:30%"><col style="width:66%"></colgroup>
<tr><th>#</th><th>Critical item</th><th>What it requires of PD-RPM, and the risk it removes</th></tr>
${C.ITEMS.map(([n, t, c, x]) =>
  `<tr><td class="n">${n}</td><td class="it"><b>${esc(t)}</b><span>${esc(c)}</span></td>` +
  `<td>${esc(x)}</td></tr>`).join('\n')}
</table>

<div class="brk"></div>
<p>${md(C.GATE_LEAD)}</p>

<table class="s">
<colgroup><col style="width:4%"><col style="width:15%"><col style="width:19%"><col style="width:9%">
<col style="width:53%"></colgroup>
<tr><th>#</th><th>Lead function</th><th>Supporting</th><th>Closes at</th>
<th>Evidence that closes it</th></tr>
${C.GATE.map(([n, l, sup, r, e]) =>
  `<tr><td class="n">${n}</td><td>${esc(l)}</td><td>${esc(sup)}</td><td>${esc(r)}</td>` +
  `<td>${esc(e)}</td></tr>`).join('\n')}
</table>

<p class="foot">${md(C.WHO)}</p>
<p class="foot">${md(C.WEIGHT)}</p>
`;

fs.writeFileSync('m9a1.html', html);
console.log('html written —',
  [C.INTRO, ...C.ITEMS.map((i) => i[3]), C.WHO, C.WEIGHT].join(' ').split(/\s+/).length, 'words');
