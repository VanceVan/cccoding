// M8A2 — PDF build. All content comes from m8a2_content.js.
const fs = require('fs');
const C = require('./m8a2_content.js');
const esc = C.esc;
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*([^*]+)\*/g, '<em>$1</em>');
const tbl = (head, rows, widths) =>
  `<table class="s">${widths ? `<colgroup>${widths.map((w) =>
    `<col style="width:${w}">`).join('')}</colgroup>` : ''}
  <tr>${head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr>
  ${rows.map((r) => `<tr>${r.map((c) => `<td>${md(c)}</td>`).join('')}</tr>`).join('\n')}</table>`;

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter portrait; margin: 0.62in 0.8in; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Arial, Helvetica, "Liberation Sans", sans-serif;
         font-size: 10.2pt; margin: 0; color: #000; }
  .hdr { line-height: 1.2; font-size: 10pt; }
  .rule { border-bottom: 0.75pt solid #999; margin: 5pt 0 7pt; }
  h1 { font-size: 11.6pt; margin: 0 0 6pt; }
  h2 { font-size: 10.4pt; margin: 7pt 0 3pt; }
  p { text-align: left; margin: 0 0 4.5pt; line-height: 1.23; }
  table.s { width: 100%; border-collapse: collapse; font-size: 7.6pt; margin: 3.5pt 0 5pt; }
  table.s th, table.s td { border: 0.6pt solid #1a1a1a; padding: 1.8pt 3.6pt;
       vertical-align: top; line-height: 1.16; }
  table.s th { background: #e8e8e8; text-align: left; }
  table.s td:first-child { white-space: nowrap; font-weight: bold; }
  .brk { page-break-before: always; }
  .cap { font-size: 8.4pt; margin: 3pt 0 6pt; }
  .fig { margin: 0; text-align: center; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b><br>
  655.662 — Introduction to Healthcare Systems Engineering<br>
  Module 8 | M8A2: Test &amp; Assessment Approach
</div>
<div class="rule"></div>

<h1>${esc(C.TITLE)}</h1>

<h2>1. Approach</h2>
<p>${md(C.P1)}</p>
<p>${md(C.P2)}</p>
<p>${md(C.P3)}</p>

<h2>2. Test levels</h2>
${tbl(['Level', 'Name', 'What is under test', 'Where it happens', 'V&V class'], C.LVL,
      ['7%', '13%', '31%', '34%', '15%'])}

<h2>3. Assessment methods</h2>
${tbl(['Method', 'Definition', 'Worked example in PD-RPM'], C.METH, ['14%', '34%', '52%'])}

<h2>4. Coverage model</h2>
${tbl(['Dimension', 'What is required'], C.COV, ['22%', '78%'])}

<div class="brk"></div>
<div class="fig">${C.SVG}</div>
<p class="cap"><b>Figure 1.</b> Test and assessment V-model for PD-RPM. Each horizontal pair binds a
definition artifact to the level that tests it. Scenario A climbs every level; Scenario B exists only
at L4 and L5.</p>

<h2>5. Scenario A — declining ultrafiltration trend (nominal path, incremental)</h2>
<p>A patient’s net ultrafiltration falls steadily across 14 treatments. This is operational
requirement OR-1, the system’s primary clinical purpose, and it is retested at all five levels.</p>
${tbl(['Level', 'Configuration under test', 'Stimulus', 'Pass criterion', 'Method'], C.SCA,
      ['7%', '23%', '23%', '35%', '12%'])}

<div class="brk"></div>
<h2>6. Scenario B — silent gateway across three Sunday nights (exceptional path, total system)</h2>
${tbl(['Step', 'Action', 'Condition', 'Expected system response and pass criterion'], C.SCB,
      ['6%', '18%', '31%', '45%'])}
<p>${md(C.SCB_WHY)}</p>

<h2>7. Functionality and utility, scored separately</h2>
${tbl(['Scenario', 'Functionality — does it meet the specification?',
       'Utility — is the care team better off?'], C.FU, ['24%', '38%', '38%'])}

<h2>8. Risk mitigation through the test program</h2>
${tbl(['Risk', 'How the approach mitigates it'], C.RISKC, ['28%', '72%'])}

<h2>9. Why the approach is agile</h2>
<p>${md(C.AGILE)}</p>

<h2>10. Coverage, limits, and end-to-end assurance</h2>
<p>${md(C.CLOSE)}</p>
`;

fs.writeFileSync('m8a2.html', html);
const words = [C.P1, C.P2, C.P3, C.SCB_WHY, C.AGILE, C.CLOSE].join(' ').split(/\s+/).length;
console.log('html written —', words, 'words of prose');
