// M9A3 — PDF build. Content from m9a3_content.js.
const fs = require('fs');
const C = require('./m9a3_content.js');
const esc = C.esc;
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*([^*]+)\*/g, '<em>$1</em>');

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter portrait; margin: 0.6in 0.85in; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Arial, Helvetica, "Liberation Sans", sans-serif;
         font-size: 9.9pt; margin: 0; color: #000; }
  .hdr { line-height: 1.2; font-size: 9.6pt; }
  .rule { border-bottom: 0.75pt solid #999; margin: 4pt 0 6pt; }
  h1 { font-size: 11pt; margin: 0 0 5pt; }
  h2 { font-size: 9.9pt; margin: 6pt 0 2.5pt; }
  p { text-align: left; margin: 0 0 4pt; line-height: 1.22; }
  ul { margin: 2pt 0 4pt; padding-left: 15pt; }
  li { margin: 0 0 2.5pt; line-height: 1.22; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b><br>
  655.662 — Introduction to Healthcare Systems Engineering<br>
  Module 9 | M9A3: Team Success
</div>
<div class="rule"></div>

<h1>${esc(C.TITLE)}</h1>

${C.SECS.map(([h, t]) => `<h2>${esc(h)}</h2>\n<p>${md(t)}</p>`).join('\n')}

<h2>What it changes at transition</h2>
<ul>
${C.PRACTICES.map(([p]) => `<li>${md(p)}</li>`).join('\n')}
</ul>

<h2>Why it lowers risk and sustains learning</h2>
<p>${md(C.WHY)}</p>
<p>${md(C.RISK)}</p>
<p>${md(C.CLOSE)}</p>
`;

fs.writeFileSync('m9a3.html', html);
console.log('html written —',
  [...C.SECS.map((s) => s[1]), ...C.PRACTICES.map((p) => p[0]), C.WHY, C.RISK, C.CLOSE]
    .join(' ').split(/\s+/).length, 'words');
