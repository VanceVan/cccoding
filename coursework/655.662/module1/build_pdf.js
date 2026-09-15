// Renders the same content.js to HTML, matching the .docx metrics, for Chromium print-to-pdf.
const fs = require('fs');
const C = require('./content');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter; margin: 0.8in 0.9in; }
  html { -webkit-print-color-adjust: exact; }
  body { font-family: Calibri, Carlito, "Segoe UI", sans-serif; font-size: 10.5pt; line-height: 1.10; margin: 0; color: #000; }
  .name { font-weight: 700; }
  .meta { font-size: 9.5pt; }
  .rule { border-bottom: 0.75pt solid #aaa; padding-bottom: 7pt; margin-bottom: 7pt; }
  h1 { font-size: 11.5pt; font-weight: 700; text-align: center; margin: 0 0 7.5pt; line-height: 1.2; }
  h2 { font-size: 10.5pt; font-weight: 700; color: #1F3864; margin: 9.5pt 0 3.5pt; }
  p.b { text-align: justify; margin: 0 0 6.5pt; }
  h2 { page-break-after: avoid; }
  .refs-h { font-size: 9.5pt; font-weight: 700; margin: 10.5pt 0 3.5pt; }
  .ref { font-size: 8.5pt; line-height: 1.2; margin: 0 0 2.5pt; padding-left: 0.35in; text-indent: -0.35in; }
</style>
<div class="name">${esc(C.author)}</div>
<div class="meta">${esc(C.course)}</div>
<div class="meta rule">${esc(C.assignment)}</div>
<h1>${esc(C.title)}</h1>
${C.sections.map((s) => `<h2>${esc(s.heading)}</h2>\n<p class="b">${esc(s.body)}</p>`).join('\n')}
<div class="refs-h">References</div>
${C.references.map((r) => `<div class="ref">${esc(r)}</div>`).join('\n')}
`;

fs.writeFileSync('m1a1.html', html);
console.log('html written');
