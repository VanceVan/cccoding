// Shared renderer for the Module 10 problem sets. Content modules supply
// { title, sub, blocks } and this emits both the print HTML and the .docx.
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  ShadingType, BorderStyle, HeadingLevel,
} = require('docx');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*([^*]+)\*/g, '<em>$1</em>');

// ------------------------------------------------------------------- HTML --
const html = (C) => `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: letter portrait; margin: 0.62in 0.8in; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Arial, Helvetica, "Liberation Sans", sans-serif;
         font-size: 10.2pt; margin: 0; color: #000; }
  .hdr { line-height: 1.2; font-size: 10pt; }
  .rule { border-bottom: 0.75pt solid #999; margin: 5pt 0 7pt; }
  h1 { font-size: 11.6pt; margin: 0 0 6pt; }
  h2 { font-size: 10.4pt; margin: 8pt 0 3pt; }
  p { text-align: left; margin: 0 0 4.5pt; line-height: 1.25; }
  table.s { width: 100%; border-collapse: collapse; font-size: 7.9pt; margin: 4pt 0 6pt; }
  table.s th, table.s td { border: 0.6pt solid #1a1a1a; padding: 2pt 3.8pt;
       vertical-align: top; line-height: 1.18; }
  table.s th { background: #e8e8e8; text-align: left; }
  table.s td.k { font-weight: bold; }
</style>

<div class="hdr">
  <b>Vance Vanvolkenburgh</b><br>
  655.662 — Introduction to Healthcare Systems Engineering<br>
  ${esc(C.sub)}
</div>
<div class="rule"></div>

<h1>${esc(C.title)}</h1>
${C.blocks.map((b) => {
  if (b[0] === 'p') return `<p>${md(b[1])}</p>`;
  if (b[0] === 'h2') return `<h2>${esc(b[1])}</h2>`;
  const t = b[1];
  return `<table class="s">
  ${t.widths ? `<colgroup>${t.widths.map((w) => `<col style="width:${w}%">`).join('')}</colgroup>` : ''}
  ${t.head.some((h) => h) ? `<tr>${t.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr>` : ''}
  ${t.rows.map((r) => `<tr>${r.map((c, i) =>
    `<td${t.boldFirst && i === 0 ? ' class="k"' : ''}>${md(c)}</td>`).join('')}</tr>`).join('\n')}
  </table>`;
}).join('\n')}
`;

// ------------------------------------------------------------------- DOCX --
const FONT = 'Arial';
const runs = (s, opt = {}) => {
  const out = []; const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g; let last = 0, m;
  while ((m = re.exec(s)) !== null) {
    if (m.index > last) out.push(new TextRun({ text: s.slice(last, m.index), ...opt }));
    const t = m[0];
    if (t.startsWith('**')) out.push(new TextRun({ text: t.slice(2, -2), bold: true, ...opt }));
    else out.push(new TextRun({ text: t.slice(1, -1), italics: true, ...opt }));
    last = m.index + t.length;
  }
  if (last < s.length) out.push(new TextRun({ text: s.slice(last), ...opt }));
  return out;
};

const docx = (C) => {
  const DXA = 1440, MT = Math.round(0.62 * DXA), MS = Math.round(0.8 * DXA);
  const W = 12240 - 2 * MS;
  const borders = ['top', 'bottom', 'left', 'right', 'insideHorizontal', 'insideVertical']
    .reduce((a, k) => (a[k] = { style: BorderStyle.SINGLE, size: 4, color: '1A1A1A' }, a), {});
  const pct = (arr) => {
    const w = arr.map((p) => Math.round(W * p / 100));
    w[w.length - 1] = W - w.slice(0, -1).reduce((a, b) => a + b, 0);
    return w;
  };
  const cell = (text, width, o = {}) => new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: o.head ? { type: ShadingType.CLEAR, fill: 'E8E8E8' } : undefined,
    margins: { top: 22, bottom: 22, left: 60, right: 60 },
    children: [new Paragraph({
      children: runs(text, { font: FONT, size: 15, bold: o.head || o.bold }),
      spacing: { after: 0, line: 210 },
    })],
  });

  const body = [];
  C.blocks.forEach((b) => {
    if (b[0] === 'p') {
      body.push(new Paragraph({ children: runs(b[1], { font: FONT, size: 20 }),
        spacing: { after: 90, line: 250 } }));
    } else if (b[0] === 'h2') {
      body.push(new Paragraph({
        children: [new TextRun({ text: b[1], bold: true, font: FONT, size: 21, color: '000000' })],
        heading: HeadingLevel.HEADING_2, spacing: { before: 140, after: 50 } }));
    } else {
      const t = b[1];
      const w = pct(t.widths || t.head.map(() => 100 / t.head.length));
      body.push(new Table({
        columnWidths: w, width: { size: W, type: WidthType.DXA }, borders,
        rows: [
          ...(t.head.some((h) => h) ? [new TableRow({ tableHeader: true,
            children: t.head.map((h, i) => cell(h, w[i], { head: true })) })] : []),
          ...t.rows.map((r) => new TableRow({
            children: r.map((c, i) => cell(c, w[i], { bold: t.boldFirst && i === 0 })) })),
        ],
      }));
      body.push(new Paragraph({ children: [], spacing: { after: 60 } }));
    }
  });

  return new Document({
    styles: { default: { document: { run: { font: FONT, size: 20 } } } },
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 },
        margin: { top: MT, bottom: MT, left: MS, right: MS } } },
      children: [
        new Paragraph({ children: [new TextRun({ text: 'Vance Vanvolkenburgh', bold: true, font: FONT, size: 20 })],
          spacing: { after: 0, line: 240 } }),
        new Paragraph({ children: [new TextRun({ text: '655.662 — Introduction to Healthcare Systems Engineering', font: FONT, size: 20 })],
          spacing: { after: 0, line: 240 } }),
        new Paragraph({ children: [new TextRun({ text: C.sub, font: FONT, size: 20 })],
          spacing: { after: 140, line: 240 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '999999', space: 6 } } }),
        new Paragraph({ children: [new TextRun({ text: C.title, bold: true, font: FONT, size: 23 })],
          spacing: { after: 110, line: 264 } }),
        ...body,
      ],
    }],
  });
};

// -------------------------------------------------------------------- CLI --
const mod = process.argv[2], base = process.argv[3];
const C = require(path.resolve(__dirname, mod));
fs.writeFileSync(path.join(__dirname, base + '.html'), html(C));
Packer.toBuffer(docx(C)).then((b) => {
  fs.writeFileSync(path.join(__dirname, base + '.docx'), b);
  const words = C.blocks.filter((x) => x[0] === 'p').map((x) => x[1]).join(' ').split(/\s+/).length;
  console.log(base, '— html + docx written,', words, 'words of prose');
});
