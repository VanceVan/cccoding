// M9A2 — PDF build. Content from m9a2_content.js.
const fs = require('fs');
const C = require('./m9a2_content.js');
const esc = C.esc;
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*([^*]+)\*/g, '<em>$1</em>');

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter portrait; margin: 0.58in 0.75in; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Arial, Helvetica, "Liberation Sans", sans-serif;
         font-size: 10pt; margin: 0; color: #000; }
  .hdr { line-height: 1.2; font-size: 9.6pt; }
  .rule { border-bottom: 0.75pt solid #999; margin: 4pt 0 6pt; }
  h1 { font-size: 11.2pt; margin: 0 0 5pt; }
  p { text-align: left; margin: 0 0 4pt; line-height: 1.22; }
  table.s { width: 100%; border-collapse: collapse; font-size: 7.6pt; margin: 4pt 0 5pt; }
  table.s th, table.s td { border: 0.6pt solid #1a1a1a; padding: 2pt 3.6pt;
       vertical-align: top; line-height: 1.17; }
  table.s th { background: #e8e8e8; text-align: left; }
  td.a b { display: block; }
  td.a span { color: #444; font-size: 7pt; }
  .foot { font-size: 8.8pt; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b><br>
  655.662 — Introduction to Healthcare Systems Engineering<br>
  Module 9 | M9A2: Concurrent Engineering
</div>
<div class="rule"></div>

<h1>${esc(C.TITLE)}</h1>
<p>${md(C.INTRO)}</p>

<table class="s">
<colgroup><col style="width:19%"><col style="width:27%"><col style="width:30%">
<col style="width:24%"></colgroup>
<tr><th>Area, and who is at the table</th>
<th>Weighed concurrently: feasibility, manufacturability, cost</th>
<th>Risk retired early, and how the design is optimized for production</th>
<th>Documentation trail</th></tr>
${C.AREAS.map(([a, f, c, r, d], i) =>
  `<tr><td class="a"><b>${i + 1}. ${esc(a)}</b><span>${esc(f)}</span></td>` +
  `<td>${esc(c)}</td><td>${esc(r)}</td><td>${esc(d)}</td></tr>`).join('\n')}
</table>

<p class="foot">${md(C.CLOSE)}</p>
`;

fs.writeFileSync('m9a2.html', html);
console.log('html written —',
  [C.INTRO, ...C.AREAS.flatMap((a) => [a[2], a[3], a[4]]), C.CLOSE].join(' ').split(/\s+/).length,
  'words');
