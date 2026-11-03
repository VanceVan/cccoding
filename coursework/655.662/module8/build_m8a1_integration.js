// M8A1 — PDF build. All content comes from m8a1_content.js.
const fs = require('fs');
const { esc, TITLE, SVG, S1A, S1B, S1C, S2, GATE, TBL, RISK,
        DETECT, AGILE1, AGILE2, CLOSE } = require('./m8a1_content.js');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*([^*]+)\*/g, '<em>$1</em>');

const words = [S1A, S1B, S1C, ...S2.map((x) => x[1]), DETECT, AGILE1, AGILE2, CLOSE,
  ...RISK.map((r) => r[1])].join(' ').split(/\s+/).length;

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
  p.t { margin: 0 0 4pt; }
  table.s { width: 100%; border-collapse: collapse; font-size: 7.6pt; margin: 3.5pt 0 5pt; }
  table.s th, table.s td { border: 0.6pt solid #1a1a1a; padding: 1.8pt 3.6pt;
       vertical-align: top; line-height: 1.16; }
  table.s th { background: #e8e8e8; text-align: left; }
  table.s td:first-child { white-space: nowrap; font-weight: bold; }
  .brk { page-break-before: always; }
  .cap { font-size: 8.4pt; margin: 4pt 0 0; }
  .fig { margin: 0; text-align: center; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b><br>
  655.662 — Introduction to Healthcare Systems Engineering<br>
  Module 8 | M8A1: Integration Plan
</div>
<div class="rule"></div>

<h1>${esc(TITLE)}</h1>

<h2>1. Integration strategy</h2>
<p>${md(S1A)}</p>
<p>${md(S1B)}</p>
<p>${md(S1C)}</p>

<h2>2. Method</h2>
<table class="s">
<tr><th>Step</th><th>How it is applied to PD-RPM</th></tr>
${S2.map(([a, b]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join('\n')}
</table>

<h2>3. The gate rule — what opens and closes a stage</h2>
<p class="t">Every gate in Figure 1 applies the same seven criteria. They are the mechanism by which
the plan prevents error rather than discovering it late.</p>
<table class="s">
<tr><th>Type</th><th>Criterion</th></tr>
${GATE.map(([a, b]) => `<tr><td>${esc(a)}</td><td>${md(b)}</td></tr>`).join('\n')}
</table>

<div class="brk"></div>
<div class="fig">${SVG}</div>
<p class="cap"><b>Figure 1.</b> Integration build-up for PD-RPM. Two threads are built in parallel,
converge at S5, and the patient is added last. Gate G8 is validation; every gate before it is
verification.</p>

<div class="brk"></div>
<h2>4. Stage detail and exit criteria</h2>
<table class="s">
<tr><th>Stage</th><th>Objects added</th><th>Interfaces closed</th><th>V&amp;V method</th>
<th>Exit criterion</th></tr>
${TBL.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('\n')}
</table>

<h2>5. Risk reduction</h2>
<table class="s">
<tr><th>Risk the sequence is designed against</th><th>How the sequence reduces it</th></tr>
${RISK.map(([a, b]) => `<tr><td style="white-space:normal">${esc(a)}</td><td>${esc(b)}</td></tr>`).join('\n')}
</table>

<h2>6. Early error detection</h2>
<p>${md(DETECT)}</p>

<h2>7. Why the plan is agile, and what that buys</h2>
<p>${md(AGILE1)}</p>
<p>${md(AGILE2)}</p>

<h2>8. Verification, validation, and configuration control</h2>
<p>${md(CLOSE)}</p>
`;

fs.writeFileSync('m8a1.html', html);
console.log('html written —', words, 'words');
